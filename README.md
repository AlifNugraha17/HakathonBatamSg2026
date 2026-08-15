# Zentura — Singapore ⇄ Batam Cross-Border Wellness Platform

An integrated cross-border operations & management ecosystem connecting Singapore maritime ferry travelers with vetted Indonesian wellness centers in Batam.

---

## 📁 Repository Structure

```
zentura/
├── frontend/               # Vue 3.5 + Vite SPA (Client Portal, Merchant Hub, Admin Console)
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── components/     # UI components with SVG icons
│   │   ├── composables/    # Reactive stores (useAuth, useLanguage, useAdminStore, useZenturaStore)
│   │   ├── data/           # Mock data for Singapore-Batam corridor
│   │   └── views/          # Landing, Auth, Admin, Merchant, Tourist views
│   └── vite.config.js
│
└── backend/                # Laravel 11 RESTful API Backend Architecture
    ├── app/
    │   ├── Http/Controllers/Api/   # Auth, Admin, Merchant, Spa, FlashSlot, AiTranslation, Finance
    │   ├── Http/Middleware/        # RoleMiddleware, CorsMiddleware
    │   ├── Models/                 # User, Spa, Service, Therapist, FlashSlot, Booking, Transaction
    │   └── Services/               # AiTranslationService, BiFastPayoutService, WhatsAppCloudService
    ├── config/                     # zentura.php, cors.php
    ├── database/                   # Migrations & Seeders
    ├── routes/api.php              # RESTful API Endpoints
    └── composer.json
```

---

## 🚀 How to Run Locally

### 1. Frontend (Vue 3 + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open: `http://localhost:5173`

### 2. Backend (Laravel 11 API)
```bash
cd backend
composer install
php artisan serve
```
Open API Health: `http://localhost:8000/api/v1/health`

---

## 🌟 Key Platform Innovations

1. **Micro-Moment Gap Matcher**: Pairs 45–90 min ferry transit windows at Harbour Bay / Batam Centre / Nongsa with empty massage chairs at dynamic promo rates.
2. **AI Medical Translation Bridge (`Zentura-MedNLP-v3`)**: Converts Singaporean tourist health complaints and allergy alerts into structured Indonesian brief cards.
3. **Cross-Border Treasury Rails**: PayNow SGD / Card to automated BI-FAST IDR bank payouts for local Batam MSME partners.
4. **Bilingual Localization (`EN 🇬🇧 / ID 🇮🇩`)**: Seamless language switching with instant reactivity.
5. **Unified Multi-Role Console**: Super Admin HQ, Merchant Partner Hub, and Tourist Concierge.
