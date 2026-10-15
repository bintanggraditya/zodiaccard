'use strict';

/* =====================================================================
   PENGATURAN
   Ganti nilai di bawah dengan URL Web App Google Apps Script Anda
   (berakhiran /exec). Lihat README.md untuk langkah lengkapnya.
   ===================================================================== */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxQNF_leAQYQUWpjoTu0SweQQsWgtnIwPaWVhLoc9chybd-gQbmBy__u5uHXf5Jn3o/exec';

/* ---------------------------------------------------------------------
   Data zodiak
   --------------------------------------------------------------------- */
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const ZODIAK = {
  capricorn: {
    nama: 'Capricorn', simbol: '\u2651', rentang: '22 Des \u2013 19 Jan', unsur: 'Tanah',
    warna: ['#1c1917', '#44403c', '#a8a29e'], aksen: '#fcd34d',
    sifat: ['Disiplin', 'Ambisius', 'Bertanggung jawab'],
    deskripsi: 'Pekerja keras yang sabar mendaki, selangkah demi selangkah, sampai puncak tujuan tercapai.'
  },
  aquarius: {
    nama: 'Aquarius', simbol: '\u2652', rentang: '20 Jan \u2013 18 Feb', unsur: 'Udara',
    warna: ['#083344', '#0891b2', '#67e8f9'], aksen: '#cffafe',
    sifat: ['Orisinal', 'Mandiri', 'Humanis'],
    deskripsi: 'Pemikir bebas dengan ide-ide segar yang selalu melangkah lebih dulu dari zamannya.'
  },
  pisces: {
    nama: 'Pisces', simbol: '\u2653', rentang: '19 Feb \u2013 20 Mar', unsur: 'Air',
    warna: ['#1e1b4b', '#4f46e5', '#a5b4fc'], aksen: '#e0e7ff',
    sifat: ['Imajinatif', 'Empatik', 'Intuitif'],
    deskripsi: 'Jiwa lembut yang peka terhadap perasaan sekitar dan kaya akan imajinasi.'
  },
  aries: {
    nama: 'Aries', simbol: '\u2648', rentang: '21 Mar \u2013 19 Apr', unsur: 'Api',
    warna: ['#7f1d1d', '#dc2626', '#f97316'], aksen: '#fde68a',
    sifat: ['Berani', 'Energik', 'Pemimpin'],
    deskripsi: 'Pemberani yang selalu maju lebih dulu, penuh semangat dan tak takut memulai hal baru.'
  },
  taurus: {
    nama: 'Taurus', simbol: '\u2649', rentang: '20 Apr \u2013 20 Mei', unsur: 'Tanah',
    warna: ['#14532d', '#15803d', '#86efac'], aksen: '#fef08a',
    sifat: ['Setia', 'Tenang', 'Pekerja keras'],
    deskripsi: 'Teguh dan dapat diandalkan, menghargai kenyamanan, keindahan, dan hal-hal yang tahan lama.'
  },
  gemini: {
    nama: 'Gemini', simbol: '\u264A', rentang: '21 Mei \u2013 20 Jun', unsur: 'Udara',
    warna: ['#713f12', '#ca8a04', '#fde047'], aksen: '#fffbeb',
    sifat: ['Luwes', 'Cerdas', 'Komunikatif'],
    deskripsi: 'Rasa ingin tahunya besar, pandai bergaul, dan selalu punya cerita untuk dibagikan.'
  },
  cancer: {
    nama: 'Cancer', simbol: '\u264B', rentang: '21 Jun \u2013 22 Jul', unsur: 'Air',
    warna: ['#1e293b', '#475569', '#cbd5e1'], aksen: '#e2e8f0',
    sifat: ['Penyayang', 'Protektif', 'Perasa'],
    deskripsi: 'Hangat dan penuh perhatian, menjadikan keluarga dan orang terdekat sebagai rumah hatinya.'
  },
  leo: {
    nama: 'Leo', simbol: '\u264C', rentang: '23 Jul \u2013 22 Ags', unsur: 'Api',
    warna: ['#78350f', '#d97706', '#fbbf24'], aksen: '#fef3c7',
    sifat: ['Percaya diri', 'Dermawan', 'Karismatik'],
    deskripsi: 'Bersinar di mana pun berada, murah hati, dan punya kehadiran yang sulit diabaikan.'
  },
  virgo: {
    nama: 'Virgo', simbol: '\u264D', rentang: '23 Ags \u2013 22 Sep', unsur: 'Tanah',
    warna: ['#3f4a2b', '#6b7f3f', '#d9e4b0'], aksen: '#ecfccb',
    sifat: ['Teliti', 'Analitis', 'Membantu'],
    deskripsi: 'Memperhatikan detail yang terlewat orang lain, rapi, dan selalu siap membantu.'
  },
  libra: {
    nama: 'Libra', simbol: '\u264E', rentang: '23 Sep \u2013 22 Okt', unsur: 'Udara',
    warna: ['#831843', '#db2777', '#fbcfe8'], aksen: '#fce7f3',
    sifat: ['Adil', 'Diplomatis', 'Estetis'],
    deskripsi: 'Pencari keseimbangan yang mencintai harmoni, keadilan, dan keindahan dalam segala hal.'
  },
  scorpio: {
    nama: 'Scorpio', simbol: '\u264F', rentang: '23 Okt \u2013 21 Nov', unsur: 'Air',
    warna: ['#2e0a1f', '#7f1d3f', '#be123c'], aksen: '#fda4af',
    sifat: ['Gigih', 'Misterius', 'Loyal'],
    deskripsi: 'Intens dan penuh tekad, menyimpan kedalaman perasaan yang hanya dibuka untuk orang tepercaya.'
  },
  sagitarius: {
    nama: 'Sagitarius', simbol: '\u2650', rentang: '22 Nov \u2013 21 Des', unsur: 'Api',
    warna: ['#3b0764', '#7e22ce', '#c084fc'], aksen: '#f5d0fe',
    sifat: ['Optimis', 'Petualang', 'Jujur'],
    deskripsi: 'Jiwa petualang yang haus pengetahuan, selalu optimis, dan blak-blakan apa adanya.'
  }
};

/* Tanggal mulai tiap zodiak: [bulan, hari, kunci]. Urut dari Januari. */
const BATAS = [
  [1, 20, 'aquarius'],
  [2, 19, 'pisces'],
  [3, 21, 'aries'],
  [4, 20, 'taurus'],
  [5, 21, 'gemini'],
  [6, 21, 'cancer'],
  [7, 23, 'leo'],
  [8, 23, 'virgo'],
  [9, 23, 'libra'],
  [10, 23, 'scorpio'],
  [11, 22, 'sagitarius'],
  [12, 22, 'capricorn']
];

function cariZodiak(bulan, hari) {
  let hasil = 'capricorn'; // 1 Jan sampai 19 Jan
  for (const [b, h, kunci] of BATAS) {
    if (bulan > b || (bulan === b && hari >= h)) hasil = kunci;
  }
  return hasil;
}

/* ---------------------------------------------------------------------
   Elemen halaman
   --------------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const form = $('zodiac-form');
const errorBox = $('form-error');
const submitBtn = $('submit-btn');
const resultBox = $('result');
const card = $('card');
const cardWrap = $('card-wrap');
const cardScaler = $('card-scaler');
const statusBox = $('save-status');

let namaFileTerakhir = 'kartu-zodiak';

/* ---------------------------------------------------------------------
   Utilitas
   --------------------------------------------------------------------- */
function tampilkanError(pesan) {
  errorBox.textContent = pesan;
  errorBox.hidden = !pesan;
}

function formatTanggal(iso) {
  const [t, b, h] = iso.split('-').map(Number);
  return `${h} ${BULAN[b - 1]} ${t}`;
}

function slug(teks) {
  return teks
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'kartu';
}

/* Pembangkit angka acak tetap, supaya bintang di kartu konsisten per orang */
function hashTeks(teks) {
  let h = 1779033703 ^ teks.length;
  for (let i = 0; i < teks.length; i++) {
    h = Math.imul(h ^ teks.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function acak(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buatBintang(seedTeks) {
  const wadah = $('stars');
  wadah.innerHTML = '';
  const rnd = acak(hashTeks(seedTeks));
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    const ukuran = 1 + rnd() * 3;
    s.className = 'star';
    s.style.width = s.style.height = ukuran + 'px';
    s.style.left = rnd() * 100 + '%';
    s.style.top = rnd() * 100 + '%';
    s.style.opacity = (0.25 + rnd() * 0.65).toFixed(2);
    wadah.appendChild(s);
  }
}

/* ---------------------------------------------------------------------
   Render kartu
   --------------------------------------------------------------------- */
function renderKartu(data, z) {
  const [c1, c2, c3] = z.warna;
  card.style.setProperty('--c1', c1);
  card.style.setProperty('--c2', c2);
  card.style.setProperty('--c3', c3);
  card.style.setProperty('--aksen', z.aksen);

  $('c-simbol').textContent = z.simbol + '\uFE0E';
  $('c-zodiak').textContent = z.nama;
  $('c-rentang').textContent = z.rentang;
  $('c-nama').textContent = data.nama;
  $('c-asal').textContent = data.asal;
  $('c-tanggal').textContent = formatTanggal(data.tanggal);
  $('c-unsur').textContent = 'Unsur ' + z.unsur;
  $('c-deskripsi').textContent = z.deskripsi;

  const sifat = $('c-sifat');
  sifat.innerHTML = '';
  z.sifat.forEach((s) => {
    const el = document.createElement('span');
    el.textContent = s;
    sifat.appendChild(el);
  });

  // Perkecil huruf nama jika panjang
  const panjang = data.nama.length;
  $('c-nama').style.fontSize = panjang > 30 ? '24px' : panjang > 20 ? '32px' : '42px';

  buatBintang(data.nama + z.nama);
}

function sesuaikanUkuran() {
  const skala = Math.min(1, cardWrap.clientWidth / 900);
  cardScaler.style.transform = `scale(${skala})`;
  cardWrap.style.height = 500 * skala + 'px';
}
window.addEventListener('resize', sesuaikanUkuran);

/* ---------------------------------------------------------------------
   Kirim ke Google Sheets
   --------------------------------------------------------------------- */
async function kirimKeSheet(payload) {
  if (!SHEET_URL || SHEET_URL.startsWith('GANTI_')) {
    statusBox.textContent = 'Mode uji coba: URL spreadsheet belum diisi, data belum dicatat.';
    return;
  }
  statusBox.textContent = 'Mencatat data ke spreadsheet\u2026';
  try {
    // text/plain dipakai agar browser tidak mengirim preflight CORS ke Apps Script
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    statusBox.textContent = 'Data berhasil dikirim ke spreadsheet.';
  } catch (err) {
    console.error(err);
    statusBox.textContent = 'Kartu sudah jadi, tetapi data gagal dikirim ke spreadsheet.';
  }
}

/* ---------------------------------------------------------------------
   Submit formulir
   --------------------------------------------------------------------- */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  tampilkanError('');

  const nama = $('nama').value.trim().replace(/\s+/g, ' ');
  const asal = $('asal').value.trim().replace(/\s+/g, ' ');
  const tanggal = $('tanggal').value; // format YYYY-MM-DD

  if (!nama) return tampilkanError('Nama wajib diisi.');
  if (!asal) return tampilkanError('Asal wajib diisi.');
  if (!tanggal) return tampilkanError('Tanggal lahir wajib diisi.');

  const [t, b, h] = tanggal.split('-').map(Number);
  const cek = new Date(t, b - 1, h);
  const valid = cek.getFullYear() === t && cek.getMonth() === b - 1 && cek.getDate() === h;
  if (!valid || t < 1900) return tampilkanError('Tanggal lahir tidak valid.');
  if (cek > new Date()) return tampilkanError('Tanggal lahir tidak boleh di masa depan.');

  const kunci = cariZodiak(b, h);
  const z = ZODIAK[kunci];
  const data = { nama, asal, tanggal };

  renderKartu(data, z);
  resultBox.hidden = false;
  sesuaikanUkuran();
  namaFileTerakhir = 'kartu-zodiak-' + slug(nama);
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });

  submitBtn.disabled = true;
  await kirimKeSheet({ nama, asal, tanggalLahir: tanggal, zodiak: z.nama });
  submitBtn.disabled = false;
});

/* ---------------------------------------------------------------------
   Unduh kartu sebagai PNG
   --------------------------------------------------------------------- */
$('download-btn').addEventListener('click', async () => {
  const tombol = $('download-btn');
  if (typeof html2canvas !== 'function') {
    statusBox.textContent = 'Pustaka pembuat gambar belum termuat. Periksa koneksi internet lalu muat ulang.';
    return;
  }
  tombol.disabled = true;
  const teksAsli = tombol.textContent;
  tombol.textContent = 'Menyiapkan\u2026';
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      onclone: (doc) => {
        const scaler = doc.getElementById('card-scaler');
        const wrap = doc.getElementById('card-wrap');
        if (scaler) scaler.style.transform = 'none';
        if (wrap) wrap.style.height = 'auto';
      }
    });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = namaFileTerakhir + '.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  } catch (err) {
    console.error(err);
    statusBox.textContent = 'Gagal membuat gambar kartu. Coba lagi.';
  } finally {
    tombol.disabled = false;
    tombol.textContent = teksAsli;
  }
});

/* ---------------------------------------------------------------------
   Buat kartu lain
   --------------------------------------------------------------------- */
$('reset-btn').addEventListener('click', () => {
  form.reset();
  resultBox.hidden = true;
  statusBox.textContent = '';
  tampilkanError('');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('nama').focus();
});

// Batas maksimal tanggal lahir = hari ini
(function () {
  const n = new Date();
  const p = (x) => String(x).padStart(2, '0');
  $('tanggal').max = `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
})();
