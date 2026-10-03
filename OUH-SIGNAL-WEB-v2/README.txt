# OUH SIGNAL — Website

Website statis untuk layanan order OUH SIGNAL (Android & iOS).

## File utama
- `index.html` — struktur halaman.
- `style.css` — desain hacker/premium.
- `script.js` — pilihan paket + generator order WhatsApp.
- `config.js` — tempat termudah untuk mengganti nomor WA, Instagram, harga, paket, dan estimasi.
- `assets/qris-payment.jpg` — QRIS yang diberikan.
- `assets/imei-example.jpg` — contoh identitas IMEI yang diberikan.

## Cara menjalankan
Buka `index.html` di browser. Tidak membutuhkan server untuk demo/front-end.

## Cara update harga/nomor
Edit `config.js`, bagian `whatsapp` dan `plans`.

## Catatan penting tentang upload otomatis
Link WhatsApp biasa (`wa.me`) tidak punya izin browser untuk mengambil file dari input upload lalu mengirimkannya otomatis sebagai lampiran. Website ini membawa nama file ke pesan WhatsApp dan meminta pelanggan melampirkan 2 file secara manual di chat.

Jika ingin benar-benar otomatis: upload file -> tersimpan di server/cloud -> data + URL file dikirim otomatis ke admin, perlu backend/form service dan kredensial WhatsApp Business API. Jangan menaruh token/API secret di HTML/JS publik.

## Canva
Canva Website tidak berfungsi seperti hosting HTML/JS biasa. Paket ini bisa dipakai sebagai website mandiri. Jika ingin domain Canva, konten visualnya dapat dipindahkan ke Canva, tetapi fungsi custom JavaScript dan upload-to-WhatsApp otomatis tidak akan berjalan hanya dengan memasukkan HTML biasa ke Canva.
