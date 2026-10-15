/**
 * Kode ini DITEMPEL di Google Apps Script (bukan di GitHub).
 * Fungsinya: menerima data dari website dan menulis satu baris baru ke Google Sheets.
 *
 * Langkah lengkap ada di README.md.
 */

// Nama tab (sheet) tujuan. Jika belum ada, akan dibuat otomatis.
const NAMA_SHEET = 'Data Zodiak';

const HEADER = ['Waktu', 'Nama', 'Asal', 'Tanggal Lahir', 'Zodiak'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = JSON.parse(e.postData.contents);

    const nama = bersihkan(data.nama, 40);
    const asal = bersihkan(data.asal, 40);
    const tanggalLahir = bersihkan(data.tanggalLahir, 10);
    const zodiak = bersihkan(data.zodiak, 20);

    if (!nama || !asal || !/^\d{4}-\d{2}-\d{2}$/.test(tanggalLahir)) {
      return balas({ status: 'error', pesan: 'Data tidak valid' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(NAMA_SHEET) || ss.insertSheet(NAMA_SHEET);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADER);
      sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const baris = sheet.getLastRow() + 1;
    const range = sheet.getRange(baris, 1, 1, HEADER.length);
    // Kolom B-E disimpan sebagai teks agar tanggal tidak berubah format otomatis
    range.setNumberFormats([['dd/mm/yyyy hh:mm:ss', '@', '@', '@', '@']]);
    range.setValues([[new Date(), nama, asal, tanggalLahir, zodiak]]);

    return balas({ status: 'ok' });
  } catch (err) {
    return balas({ status: 'error', pesan: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Membuka URL Web App langsung di browser (GET) hanya menampilkan status.
function doGet() {
  return balas({ status: 'ok', pesan: 'Web App aktif' });
}

// Membatasi panjang teks dan mencegah "formula injection" (=, +, -, @ di awal teks)
function bersihkan(nilai, maks) {
  let teks = String(nilai == null ? '' : nilai).trim().substring(0, maks);
  if (/^[=+\-@]/.test(teks)) teks = "'" + teks;
  return teks;
}

function balas(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
