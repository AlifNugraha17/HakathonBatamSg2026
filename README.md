# 🌿 Zentura — Singapore ⇄ Batam Cross-Border Maritime Wellness Platform

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://zentura-app-eight.vercel.app/)
[![Vue 3.5](https://img.shields.io/badge/Vue.js-3.5%20SPA-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Laravel 11](https://img.shields.io/badge/Laravel-11%20REST%20API-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Cloud%20Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Live Production Platform URL:**  
> 🔗 **[https://zentura-app-eight.vercel.app/](https://zentura-app-eight.vercel.app/)**

---

## 📌 Executive Summary & Regional Impact

**Zentura** is an integrated cross-border operations and commerce ecosystem connecting Singapore maritime ferry travelers with vetted Indonesian micro-SME wellness centers in Batam. 

Every day, thousands of travelers commute across the 45-minute Singapore Strait corridor between HarbourFront / Tanah Merah and Batam (Harbour Bay, Batam Centre, Nongsa Pura). Zentura eliminates cross-border wellness friction by solving:
1. **Unmonetized Micro-Moments**: Turning 45–90 minute ferry transit wait times into high-yield, discounted bookings for empty massage chairs.
2. **Language & Medical Health Gaps**: Eliminating miscommunication of acute muscle complaints and allergen hazards (e.g., lemongrass, nut oils) between English-speaking tourists and Indonesian therapists.
3. **Cross-Border Payout Friction**: Bridging tourist PayNow SGD / Card payments into automated BI-FAST IDR bank payouts for local Batam MSME partners.

---

## 🌟 Key Platform Innovations

```
                                  ┌────────────────────────┐
                                  │   Singapore Tourist    │
                                  │  (HarbourFront/TMerah) │
                                  └───────────┬────────────┘
                                              │
                       ┌──────────────────────┴──────────────────────┐
                       │                                             │
                       ▼                                             ▼
       ┌───────────────────────────────┐             ┌───────────────────────────────┐
       │   Micro-Moment Gap Matcher    │             │   Zentura-MedNLP-v3 Bridge    │
       │  45–90 min ferry transit slot │             │  Translates symptoms & alerts │
       │  Dynamic promo rate algorithm │             │  Structured ID therapist card │
       └───────────────┬───────────────┘             └───────────────┬───────────────┘
                       │                                             │
                       └──────────────────────┬──────────────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │  1-Click WhatsApp Concierge  │
                               │  & Cross-Border Treasury     │
                               └──────────────┬───────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │    Vetted Batam MSME Spas    │
                               │  (Harbour Bay / Batam Centre)│
                               └──────────────────────────────┘
```

### 1. ⏱️ Dynamic Micro-Moment Gap Matcher
- Matches transit windows (30, 45, 60, 90 mins) based on ferry departure schedules.
- Dynamically discounts vacant therapist chairs up to 35% during lull hours to maximize merchant yield.

### 2. 🤖 AI Medical & Allergen Translation Bridge (`Zentura-MedNLP-v3`)
- Converts English symptom notes into structured Indonesian therapist cards.
- **Safety Flags**: Detects allergen hazards (lemongrass, eucalyptus, nut oils) and flags them in high-visibility red alerts.
- **AI Voice Synthesis**: Built-in Indonesian Text-to-Speech (TTS) audio synthesizer to verbally brief the therapist.

### 3. 💳 Cross-Border Treasury & BI-FAST Payout Rails
- Accepts multi-currency bookings (PayNow SGD, Cards).
- Automatically calculates 12% platform commissions and simulates automated BI-FAST bank transfers to local Indonesian bank accounts (BCA, Mandiri, BRI, BNI).

### 4. 🧭 Unified Multi-Role Dashboard with Vue Router Deep Linking
- **Super Admin HQ Console**: GMV aggregation, merchant KYC review, AI latency monitoring, and treasury batch payout execution.
- **Merchant Partner Hub**: Live shift appointments, incoming order queue, therapist management, and chair availability.
- **Tourist Concierge**: Micro-moment matcher, curated salon discovery, AI translation bridge, and saved bookmarks.

---

## 🗺️ Live Navigation Routes & Deep Links

| Portal Role | URL Path | Key Capabilities |
| :--- | :--- | :--- |
| 🌐 **Public Landing** | [`/`](https://zentura-app-eight.vercel.app/) | Hero Showcase, Live Interactive Gap Matcher Preview, Regional Impact |
| 🚪 **Auth Console** | [`/login`](https://zentura-app-eight.vercel.app/login) | 1-Click Quick Demo Sign In, Email/Password Login, User Registration |
| 👑 **Super Admin HQ** | [`/admin`](https://zentura-app-eight.vercel.app/admin) | Sub-tabs: `?tab=overview`, `merchants`, `users`, `ai`, `finance`, `settings` |
| 💆‍♀️ **Merchant Hub** | [`/merchant`](https://zentura-app-eight.vercel.app/merchant) | Sub-tabs: `?tab=overview`, `orders`, `slots`, `therapists`, `profile` |
| 🛳️ **Tourist Concierge** | [`/tourist`](https://zentura-app-eight.vercel.app/tourist) | Sub-tabs: `?tab=discover`, `matcher`, `translator`, `bookings`, `saved` |

---

## 📁 Repository Structure

```
zentura/
├── frontend/                     # Vue 3.5 + Vite Single Page Application (SPA)
│   ├── api/handler.js            # Vercel Serverless Cloud API Gateway
│   ├── index.html                # HTML5 entry with modern typography
│   ├── package.json              # Vue Router 4, Lucide Icons, Canvas Confetti
│   ├── vercel.json               # Serverless API rewrite rules
│   ├── src/
│   │   ├── components/           # Common, Admin, Merchant, Tourist UI components
│   │   ├── composables/          # Reactive stores (useAuth, useLanguage, useZenturaStore, etc.)
│   │   ├── data/                 # Seed data & fallback translations
│   │   ├── router/index.js       # Vue Router 4 client routing configuration
│   │   ├── services/api.js       # Unified Axios/Fetch API client
│   │   └── views/                # Landing, Auth, Admin, Merchant, Tourist views
│   └── vite.config.js
│
├── backend/                      # Laravel 11 RESTful API Backend Architecture
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Auth, Admin, Merchant, Spa, FlashSlot, AiTranslation, Payout
│   │   ├── Models/               # Spa, Service, Therapist, FlashSlot, Booking, Transaction, User
│   │   └── Services/             # AiTranslationService, BiFastPayoutService
│   ├── database/
│   │   ├── migrations/           # 3NF normalized database schema
│   │   └── seeders/              # Authentic Singapore-Batam corridor seed dataset
│   ├── Dockerfile                # High-performance Alpine container for cloud deployment
│   ├── routes/api.php            # RESTful API routing
│   └── composer.json             # Laravel 11 dependencies
│
├── test_blackbox_suite.cjs       # Automated End-to-End Functional Test Suite (31 Tests)
└── README.md                     # Comprehensive Project Documentation
```

---

## 🔌 Complete RESTful API Reference

All endpoints are available both on local development (`http://127.0.0.1:8000/api/v1`) and live serverless cloud (`https://zentura-app-eight.vercel.app/api/v1`).

### 1. System & Health
- `GET /api/v1/health` — Maritime corridor status and registered ferry ports.

### 2. Authentication & RBAC
- `POST /api/v1/auth/quick-login` — 1-Click login for `admin`, `merchant`, or `tourist`.
- `POST /api/v1/auth/login` — Standard credentials authentication.
- `POST /api/v1/auth/register` — Self-registration for tourists and merchant partners.
- `GET /api/v1/auth/me` — Current authenticated session profile.

### 3. Spas & Catalog
- `GET /api/v1/spas` — Retrieve all verified wellness centers with 3NF relational data.
- `GET /api/v1/spas/{id}` — Single spa detailed profile, certified therapists, and menu catalog.

### 4. Micro-Moment Gap Matcher
- `GET /api/v1/matcher/find-gaps?duration_minutes={mins}` — Real-time empty chair matching.

### 5. AI Medical Translation
- `GET /api/v1/ai/presets` — Pre-configured health complaint and allergen selection tags.
- `POST /api/v1/ai/translate-medical` — Convert English complaints into structured Indonesian therapist brief cards.

### 6. Bookings & Reservations
- `GET /api/v1/bookings` — List recorded reservations.
- `POST /api/v1/bookings` — Create a new confirmed booking with AI brief and WhatsApp deep link.

### 7. Super Admin & Treasury
- `GET /api/v1/admin/dashboard-metrics` — GMV aggregation, active spas count, and regional breakdown.
- `GET /api/v1/admin/users` — User directory audit.
- `POST /api/v1/admin/payouts/execute-bi-fast` — Execute simulated BI-FAST batch payouts.

---

## 🧪 Functional Blackbox Automated Test Suite

The project includes an automated test runner (`test_blackbox_suite.cjs`) verifying 31 distinct functional assertions across frontend routing, API contracts, AI inference, and database persistence.

### Run Tests:
```bash
node test_blackbox_suite.cjs
```

### Test Scorecard:
```
======================================================================
                      FINAL TEST SCORECARD                            
======================================================================
  Total Functional Tests Executed: 31
  Passed Tests:                    31 ✅
  Failed Tests:                    0 🎉
  Success Rate:                    100.0%
======================================================================
```

---

## 💻 Local Development Setup

### Prerequisites:
- **Node.js**: v18+ or v20+
- **PHP**: 8.2+ with `pdo_pgsql` / `pdo_sqlite` extensions
- **Composer**: 2.x

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
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```
Open Health API: `http://127.0.0.1:8000/api/v1/health`

---

## 🚢 Cloud Deployment (100% Free Tier)

### 1. Vercel Serverless (Recommended)
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Deploy! The frontend and serverless API handlers in `api/handler.js` will deploy automatically.

### 2. Docker Container Deployment
Use the included `backend/Dockerfile` for deployment on **Render**, **Koyeb**, or **Fly.io**:
```bash
docker build -t zentura-backend ./backend
docker run -p 8000:8000 zentura-backend
```

---

## 👥 Demo Evaluation Accounts

| Role | Email | Password | Pre-configured Access |
| :--- | :--- | :--- | :--- |
| **Super Admin HQ** | `admin@zentura.com` | `password123` | Master Console, Treasury, KYC, AI Monitoring |
| **Merchant Partner** | `partner@heritage-spa.id` | `password123` | Shift Overview, Orders, Slot Management |
| **Tourist / Customer** | `traveler@singapore.sg` | `password123` | Micro-Moment Matcher, AI Translator, Bookings |

---

## 📄 License
This project is licensed under the **MIT License** — see the LICENSE file for details.
