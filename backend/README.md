# Zentura Backend API (Laravel 11)

RESTful API backend for the **Zentura Cross-Border Maritime Wellness Platform (Singapore ⇄ Batam)**.

---

## 🏗️ Architecture Overview

- **Framework**: Laravel 11.x
- **Corridor**: Singapore ⇄ Batam Maritime Transit (HarbourFront / Tanah Merah to Harbour Bay / Batam Centre / Nongsa Pura)
- **API Spec**: Version 1.0 (`/api/v1/...`)
- **Key Modules**:
  - `AuthController`: Dynamic email-based role classification (Admin, Merchant, Tourist)
  - `SpaController`: Vetted 95+ hygiene spa catalog
  - `FlashSlotController`: Dynamic Micro-Moment Gap Matcher for ferry transit windows
  - `AiTranslationController`: `Zentura-MedNLP-v3` medical complaint parser & allergy alert system
  - `BookingController`: Booking lifecycle & WhatsApp Cloud formatted payload generator
  - `FinanceController`: Cross-border PayNow SGD to automated BI-FAST IDR treasury settlement

---

## 🚀 Getting Started

### Prerequisites:
- PHP >= 8.2
- Composer

### Installation & Run:
```bash
# 1. Install dependencies
composer install

# 2. Copy environment configuration
cp .env.example .env

# 3. Start local development server
php artisan serve
```
The API server will run at: `http://localhost:8000`

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Dynamic email-based role login |
| `GET` | `/api/v1/spas` | Vetted Batam spas directory |
| `GET` | `/api/v1/matcher/find-gaps` | Ferry window gap matcher |
| `POST` | `/api/v1/ai/translate-medical` | Multi-lingual NLP medical translation |
| `POST` | `/api/v1/bookings` | Create tourist booking |
| `POST` | `/api/v1/merchant/slots/broadcast`| Broadcast dynamic vacant chair slot |
| `GET` | `/api/v1/admin/dashboard-metrics` | Executive GMV & occupancy metrics |
| `POST` | `/api/v1/admin/payouts/execute-bi-fast` | Trigger cross-border BI-FAST payout |
