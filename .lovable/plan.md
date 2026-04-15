
# Aplikasi Ride On-Demand & Shuttle Booking

## Ringkasan
Aplikasi transportasi dengan 3 portal: **Customer**, **Admin**, dan **Driver**. Desain bersih Cloud White (#fafbfc, #e8ecf1, #94a3b8, #3b82f6) dengan peta interaktif menggunakan Leaflet (gratis, tanpa API key). Fokus UI & flow dulu.

---

## 1. Struktur & Navigasi

- **Landing Page** — Pilih masuk sebagai Customer, Admin, atau Driver
- **Customer App** — Bottom navigation mobile-first (Home, Riwayat, Profil)
- **Admin Dashboard** — Sidebar layout (Kelola Rute, Harga, Pesanan, Kendaraan)
- **Driver App** — Tampilan pesanan masuk & status

---

## 2. Customer — Ride On-Demand Flow

1. **Halaman utama** — Peta Leaflet fullscreen + input "Mau kemana?"
2. **Pilih titik jemput** — Pin di peta atau ketik alamat
3. **Pilih tujuan** — Pin di peta atau ketik alamat
4. **Estimasi** — Tampilkan rute di peta, estimasi waktu & harga
5. **Konfirmasi & Pesan** — Ringkasan pesanan, tombol "Pesan Sekarang"
6. **Status Perjalanan** — Tracking sederhana (menunggu driver, dalam perjalanan, selesai)

## 3. Customer — Shuttle Flow

1. **Pilih Rayon** — Daftar rayon/rute tersedia (misal: Jakarta-Bandung)
2. **Pilih Titik Jemput** — Titik jemput dalam rayon tersebut
3. **Pilih Service** — Reguler, Executive, VIP (dengan deskripsi & harga)
4. **Pilih Kendaraan** — HiAce, SUV, MiniCar (foto & kapasitas)
5. **Pilih Seat** — Layout kursi visual, pilih tempat duduk
6. **Konfirmasi** — Ringkasan lengkap pesanan
7. **Tiket** — Tampilkan tiket digital + tombol Print/Download (PDF)

## 4. Admin Dashboard

- **Kelola Rayon & Rute** — CRUD rayon, titik jemput, tujuan
- **Kelola Harga** — Set harga per service, kendaraan, rute
- **Kelola Kendaraan** — Daftar kendaraan, kapasitas, status
- **Pesanan Masuk** — Daftar pesanan ride & shuttle, filter & status
- **Statistik** — Ringkasan jumlah pesanan, pendapatan (chart sederhana)

## 5. Driver App

- **Pesanan Masuk** — Daftar request dari customer
- **Detail Pesanan** — Info jemput, tujuan, penumpang
- **Update Status** — Terima/tolak, mulai perjalanan, selesai
- **Peta Navigasi** — Tampilkan rute di peta

## 6. Fitur Pendukung

- **Seat Picker** — Komponen visual layout kursi untuk HiAce/SUV/MiniCar
- **Tiket PDF** — Generate & download tiket shuttle
- **Peta Leaflet** — Pin lokasi, tampilkan rute, geocoding
- **Responsive** — Mobile-first untuk customer & driver, desktop untuk admin

## 7. Teknologi

- **Leaflet + React-Leaflet** untuk peta interaktif
- **jsPDF** untuk generate tiket PDF
- **Lucide icons** untuk ikon
- **shadcn/ui** untuk komponen UI
- **Data dummy** (mock data) untuk semua flow — siap diganti backend nanti
