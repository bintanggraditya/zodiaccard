# Kartu Zodiak

Website sederhana: pengunjung mengisi **nama, asal, dan tanggal lahir**, lalu website otomatis menentukan zodiaknya, menampilkan **kartu lanskap** dengan warna sesuai zodiak, dan kartu bisa diunduh sebagai **PNG**. Data isian dicatat ke **Google Sheets**.

Semua gratis: GitHub Pages (hosting) + Google Apps Script (penghubung ke Sheets).

## Isi repositori

| File | Fungsi |
|---|---|
| `index.html` | Halaman formulir dan tempat kartu |
| `style.css` | Tampilan halaman dan desain kartu |
| `script.js` | Logika zodiak, render kartu, unduh PNG, kirim data ke Sheets |
| `apps-script.gs` | Kode untuk Google Apps Script (ditempel di Google, **bukan** dijalankan dari GitHub) |

---

## Langkah 1: Siapkan Google Sheets dan Apps Script

1. Buka spreadsheet Anda di Google Sheets.
2. Klik menu **Ekstensi → Apps Script**.
3. Hapus kode bawaan, lalu tempel seluruh isi file `apps-script.gs`.
4. Klik ikon simpan (atau `Ctrl + S`). Beri nama proyek bebas, misalnya "Kartu Zodiak".
5. Klik **Deploy → Deployment baru**.
6. Klik ikon roda gigi di samping "Pilih jenis" lalu pilih **Aplikasi web**.
7. Isi pengaturan:
   - **Deskripsi:** bebas, misalnya "v1"
   - **Jalankan sebagai:** **Saya** (akun Anda)
   - **Siapa yang memiliki akses:** **Siapa saja**
8. Klik **Deploy**. Google akan meminta otorisasi:
   - Klik **Otorisasi akses**, pilih akun Anda.
   - Jika muncul peringatan "Google belum memverifikasi aplikasi ini", klik **Lanjutan → Buka (nama proyek) (tidak aman)**. Ini normal karena skrip dibuat oleh Anda sendiri.
   - Klik **Izinkan**.
9. Salin **URL aplikasi web** yang berakhiran `/exec`.

> Tab bernama **Data Zodiak** akan dibuat otomatis saat data pertama masuk, lengkap dengan judul kolom: Waktu, Nama, Asal, Tanggal Lahir, Zodiak. Anda bisa mengganti nama tab di baris `NAMA_SHEET` pada kode.

## Langkah 2: Pasang URL ke website

Buka `script.js`, cari baris ini di bagian atas:

```js
const SHEET_URL = 'GANTI_DENGAN_URL_WEB_APP_ANDA';
```

Ganti dengan URL `/exec` yang tadi disalin:

```js
const SHEET_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
```

## Langkah 3: Upload ke GitHub dan aktifkan GitHub Pages

1. Buat akun di [github.com](https://github.com) jika belum punya.
2. Klik **New repository**, beri nama (misalnya `kartu-zodiak`), pilih **Public**, lalu **Create repository**.
3. Klik **uploading an existing file**, tarik `index.html`, `style.css`, `script.js`, dan `README.md` ke halaman itu, lalu klik **Commit changes**.
   (`apps-script.gs` boleh ikut diunggah sebagai arsip, tetapi tidak wajib.)
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, lalu **Save**.
6. Tunggu 1-2 menit. Website Anda aktif di:
   `https://NAMA-GITHUB-ANDA.github.io/kartu-zodiak/`

## Langkah 4: Uji coba

1. Buka website, isi nama, asal, dan tanggal lahir, lalu klik **Buat Kartu**.
2. Kartu muncul. Klik **Unduh Kartu (PNG)** untuk memastikan unduhan berjalan.
3. Buka Google Sheets: satu baris baru harus muncul.

Untuk mencoba di komputer sebelum diunggah, cukup klik dua kali `index.html`. Selama `SHEET_URL` belum diisi, website berjalan dalam mode uji coba (kartu tetap jadi, hanya data yang belum dicatat).

---

## Jika mengubah `apps-script.gs` di kemudian hari

Setelah kode diubah, URL lama tidak otomatis memakai kode baru. Lakukan **Deploy → Kelola deployment → ikon pensil → Versi: Versi baru → Deploy**. URL tetap sama.

## Rentang tanggal zodiak yang dipakai

| Zodiak | Rentang |
|---|---|
| Capricorn | 22 Des - 19 Jan |
| Aquarius | 20 Jan - 18 Feb |
| Pisces | 19 Feb - 20 Mar |
| Aries | 21 Mar - 19 Apr |
| Taurus | 20 Apr - 20 Mei |
| Gemini | 21 Mei - 20 Jun |
| Cancer | 21 Jun - 22 Jul |
| Leo | 23 Jul - 22 Ags |
| Virgo | 23 Ags - 22 Sep |
| Libra | 23 Sep - 22 Okt |
| Scorpio | 23 Okt - 21 Nov |
| Sagitarius | 22 Nov - 21 Des |

Rentang bisa berbeda sehari di beberapa sumber. Untuk menyesuaikan, ubah daftar `BATAS` di `script.js`.

## Catatan keamanan

- URL Web App terlihat di kode website, sehingga siapa pun bisa mengirim data ke sheet Anda. Kode Apps Script sudah membatasi panjang teks, memvalidasi format, dan mencegah formula injection.
- Jangan membagikan akses edit spreadsheet Anda kepada pengunjung. Website hanya menulis lewat Apps Script.
- Data pengunjung (nama, asal, tanggal lahir) adalah data pribadi. Sebaiknya beri tahu pengunjung bahwa data dicatat.
