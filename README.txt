UNDANGAN ALVIYAN & DINDA — ROMANTIC EDITION

PERUBAHAN UTAMA
1. Cover depan memakai gambar terbaru yang Anda kirim.
2. Setelah klik BUKA UNDANGAN, website masuk ke tema romantis ivory + powder blue + soft gold.
3. Gambar undangan versi sebelumnya dipakai pada bagian "Undangan Pernikahan" dan Galeri.
4. Ada background romantis custom (romantic-bg.svg) berupa cahaya lembut, bokeh, lengkungan emas dan nuansa powder blue.
5. Ada animasi kelopak/bunga, glass card, frame emas, countdown, acara, lokasi, RSVP dan tombol musik.

FILE
- index.html
- styles.css
- script.js
- cover-depan.png          = cover terbaru
- undangan-dalam.png       = gambar undangan sebelumnya
- romantic-bg.svg          = background dekoratif

MUSIK
Website siap memainkan file bernama:
river-flows-in-you.mp3
setelah tombol BUKA UNDANGAN diklik.
File rekaman lagu tidak disertakan karena hak cipta. Jika Anda mempunyai file yang sah/berlisensi, letakkan MP3 tersebut di root repository dengan nama persis:
river-flows-in-you.mp3

GITHUB
Upload semua file ke root repository, replace file lama, Commit changes, lalu tunggu GitHub Pages selesai build.

RSVP
RSVP saat ini disimpan di browser pengunjung. Untuk RSVP terpusat ke Google Sheets, dapat ditambahkan pada versi berikutnya.


VERSI VIDEO
Video tampil di bagian MEMORIES sebelum gambar undangan. Video memiliki:
- poster cover
- kontrol play/pause, volume, fullscreen
- tampilan responsif HP/laptop
- frame dan ornamen emas yang mengikuti tema website

CATATAN GITHUB
File MP4 bisa berukuran besar. GitHub memiliki batas ukuran file dan repository. Jika upload ditolak karena ukuran video, gunakan Git LFS atau lebih baik host video di layanan video/storage lalu embed ke website.


VERSI YOUTUBE
Video Memories sekarang menggunakan YouTube:
https://www.youtube-nocookie.com/embed/JJhMCCnzaU4?rel=0&modestbranding=1

File MP4 lokal sudah dihapus dari website agar repository GitHub tetap ringan.
Video ditampilkan dengan YouTube embed dan tetap berada di dalam frame Memories bertema ivory, powder blue, dan soft gold.

PENTING
Agar video dapat diputar dari website:
- YouTube "Tidak Publik / Unlisted" = bisa di-embed.
- YouTube "Publik" = bisa di-embed.
- YouTube "Pribadi / Private" = tidak dapat diputar oleh pengunjung umum.

Jika nanti Anda mengubah video atau link YouTube, cukup ubah bagian src iframe di index.html.


UPDATE
Gambar undangan setelah video YouTube pada bagian MEMORIES sudah dihapus.
Bagian Memories sekarang hanya menampilkan video YouTube, kemudian dilanjutkan ke bagian berikutnya.


RSVP GOOGLE SHEETS
Endpoint Apps Script: https://script.google.com/macros/s/AKfycbyy7_xqPgOE0Hf5Xk3GaxZ2ucL5iVrG1ydolPnheoj39Qu316GrC8vJkQxmoKGGeNY_VQ/exec
Pastikan deployment: Execute as Me; Who has access Anyone.


YOUTUBE UPDATE
Video ID: JJhMCCnzaU4
Privacy Enhanced Mode embed:
https://www.youtube-nocookie.com/embed/JJhMCCnzaU4?rel=0&modestbranding=1

RSVP Google Sheets dari versi sebelumnya dipertahankan.
