# Tutorial-QC RyotaQC

Website panduan QC & Maintenance Laptop berbasis materi Running Test, Battery QC, Maintenance 4 langkah, dan link driver resmi OEM.

## Isi utama

- SOP Running Test Jam Video + kalkulator normalisasi hasil
- Keputusan lolos/tidak lolos battery (BH, FCC, durasi test)
- Maintenance dan problem solving langkah 1-4
- Link direct ke support resmi Lenovo, Dell, HP, ASUS, Toshiba/Dynabook, Fujitsu
- Ringkasan integrasi tools `RyotaQC V4`
- File PDF panduan: `output/Tutorial-QC-RyotaQC.pdf`

## Jalankan lokal

Buka file `index.html` langsung di browser, atau jalankan server statis sederhana:

```powershell
python -m http.server 8080
```

Lalu akses `http://localhost:8080`.

## Struktur

- `index.html` - halaman utama
- `styles.css` - styling + efek visual/scroll
- `script.js` - kalkulator SOP + animasi reveal/parallax
- `assets/images` - gambar ilustrasi
- `docs/sumber-gambar.md` - kredit gambar dan referensi resmi
- `output/Tutorial-QC-RyotaQC.pdf` - file PDF

## Kredit

Dokumen dibuat oleh **RyotaQC** sebagai panduan QC & Maintenance Laptop.
