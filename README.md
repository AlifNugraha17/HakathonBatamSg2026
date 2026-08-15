# 🚢 LokaBatam — SG ⇄ Batam Cross-Border Medical & Tourism Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lokabatam.surge.sh-teal?style=for-the-badge&logo=surge)](https://lokabatam.surge.sh/)
[![Vue 3](https://img.shields.io/badge/Frontend-Vue%203%20%2B%20Vite-42b883?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20PostGIS-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Hackathon](https://img.shields.io/badge/Event-Hakathon%20Batam%20SG%202026-orange?style=for-the-badge)](https://github.com/AlifNugraha17/HakathonBatamSg2026)

**LokaBatam** is an integrated cross-border medical, wellness, and leisure tourism platform connecting **Singapore** and **Batam Island**. Designed specifically for Singaporean travelers and international tourists, LokaBatam streamlines access to high-quality healthcare, luxury traditional spas, championship golf getaways, and culinary spots with up to **70% cost savings** compared to Singapore benchmark rates.

---

## 🌐 Live Deployment
- **Official Live Website:** [https://lokabatam.surge.sh/](https://lokabatam.surge.sh/)
- **GitHub Repository:** [https://github.com/AlifNugraha17/HakathonBatamSg2026](https://github.com/AlifNugraha17/HakathonBatamSg2026)
- **Primary Branch:** `main`

---

## ✨ Key Features

### 1. 🏥 49 Dual-Country Integrated Catalog
- **29 Curated Batam Spots:** Awal Bros Hospital, RSBP Batam (KEK Kesehatan), Budi Kemuliaan, Royal Batam Dental, Spa Secret, Palm Springs Golf, and viral cafes.
- **20 Singapore Referral Benchmarks:** Mount Elizabeth, Parkway East, Raffles Hospital, Singapore General Hospital (SGH), etc.

### 2. 💱 Real-Time Currency Converter & Price Comparison
- Dynamic **SGD ⇄ IDR** live exchange rate integration.
- Instant price transparency displaying side-by-side cost comparisons and estimated savings percentage (up to 70%).

### 3. 🧾 Smart Medical OCR Receipt Scanner
- Powered by client-side **Tesseract.js OCR engine**.
- Allows Singapore patients to scan their medical bills or prescription receipts to calculate equivalent procedure costs in Batam with zero manual data entry.

### 4. 🗺️ Interactive Spatial Navigation & Ferry Routes
- Interactive map highlighting international ferry terminals (**HarbourFront SG**, **Tanah Merah SG**, **Harbour Bay**, **Batam Centre**, **Nongsa Pura**, and **Sekupang**).
- Real-time route estimates (45-minute high-speed ferry ride).

### 5. 🌐 Full Bilingual Experience (English & Bahasa Indonesia)
- 1-click instantaneous language switcher covering all headers, badges, listings, modals, reviews, and search filters.

### 6. ⭐ Verified SG Traveler Reviews & Testimonials
- Authentic testimonials from Singaporean visitors categorized by treatment type, cost savings achieved, and service satisfaction ratings.

### 7. 📲 Automated WhatsApp & Instant Booking Concierge
- Direct reservation system integrated with official WhatsApp hotline gateway (`+6285261516767`) for seamless appointment scheduling and VIP private port pickup.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Vue 3 (Composition API), Vite, Tailwind CSS, Lucide Icons |
| **OCR & AI** | Tesseract.js (Client-side Machine Learning OCR) |
| **Mapping & GIS** | Leaflet / PostGIS spatial coordinates |
| **Backend API** | PHP REST API, Serverless Architecture |
| **Database** | PostgreSQL + PostGIS (Supabase SG Region Cloud) / SQLite Fallback |
| **Deployment** | Surge.sh (Global CDN, Automated SSL, SPA Routing) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **pnpm**
- **PHP 8.x** (optional, for backend development)

### 1. Clone Repository
```bash
git clone https://github.com/AlifNugraha17/HakathonBatamSg2026.git
cd HakathonBatamSg2026
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```

---
- **Team Repository:** [AlifNugraha17/HakathonBatamSg2026](https://github.com/AlifNugraha17/HakathonBatamSg2026)
- **Event:** Hakathon Batam SG 2026
