export const MOCK_ADMIN_METRICS = {
  totalGmvIdr: 335000,
  totalGmvSgd: 28.27,
  monthlyGrowthPercent: 24.8,
  activeMerchantsCount: 4,
  pendingVerificationMerchants: 0,
  totalBookings: 1,
  totalUsers: 3,
  totalTouristsRegistered: 1,
  totalAiTranslationsMonth: 0,
  aiSafetyFilterTriggers: 0,
  avgTranslationLatencyMs: 165,
  totalPlatformCommissionIdr: 40200
};

export const MOCK_ADMIN_MERCHANTS = [
  {
    id: 'merch-1',
    db_id: 1,
    name: 'Martha Heritage Herbal Spa Grand Batam',
    ownerName: 'Ratna Dewi',
    owner_name: 'Ratna Dewi',
    region: 'batam',
    city: '3 mins walk from Harbour Bay Ferry Terminal',
    email: 'partner@heritage-spa.id',
    phone: '+6281270088990',
    joinedDate: '2026-08-15',
    status: 'active',
    hygieneScore: 99,
    hygiene_score: 99,
    commissionRate: 12,
    commission_rate: 12,
    totalBookings: 1,
    total_bookings: 1,
    revenueIdr: 335000,
    kycDocumentsVerified: true,
    kyc_verified: true,
    rating: 4.90
  },
  {
    id: 'merch-2',
    db_id: 2,
    name: 'Eska Wellness & Reflexology Harbour Bay',
    ownerName: 'David Santoso',
    owner_name: 'David Santoso',
    region: 'batam',
    city: 'Directly linked to Harbour Bay Ferry Terminal Walkway',
    email: 'david@eskawellness.com',
    phone: '+6281364551122',
    joinedDate: '2026-08-15',
    status: 'active',
    hygieneScore: 98,
    hygiene_score: 98,
    commissionRate: 12,
    commission_rate: 12,
    totalBookings: 0,
    total_bookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: true,
    kyc_verified: true,
    rating: 4.85
  },
  {
    id: 'merch-3',
    db_id: 3,
    name: 'Nagoya Hill Reflexology & Aromatherapy Sanctuary',
    ownerName: 'Hendra Wijaya',
    owner_name: 'Hendra Wijaya',
    region: 'batam_centre',
    city: '5 mins from Batam Centre Ferry Terminal',
    email: 'contact@nagoyaspa.id',
    phone: '+6281233445566',
    joinedDate: '2026-08-15',
    status: 'active',
    hygieneScore: 96,
    hygiene_score: 96,
    commissionRate: 12,
    commission_rate: 12,
    totalBookings: 0,
    total_bookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: true,
    kyc_verified: true,
    rating: 4.78
  },
  {
    id: 'merch-4',
    db_id: 4,
    name: 'Nongsa Pura Coastal Botanical Spa',
    ownerName: 'Ibu Wayan',
    owner_name: 'Ibu Wayan',
    region: 'batam_nongsa',
    city: '2 mins walk from Nongsa Pura Ferry Terminal',
    email: 'contact@nongsaspa.id',
    phone: '+6281198765432',
    joinedDate: '2026-08-15',
    status: 'active',
    hygieneScore: 99,
    hygiene_score: 99,
    commissionRate: 12,
    commission_rate: 12,
    totalBookings: 0,
    total_bookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: true,
    kyc_verified: true,
    rating: 4.95
  }
];

export const MOCK_ADMIN_USERS = [
  {
    id: 'usr-1',
    db_id: 1,
    name: 'Super Admin HQ',
    email: 'admin@zentura.com',
    role: 'admin',
    country: 'Singapore',
    phone: '+65 8123 9900',
    totalSpentSgd: 0,
    status: 'active',
    lastActive: 'Online now'
  },
  {
    id: 'usr-2',
    db_id: 2,
    name: 'Ratna Dewi (Merchant)',
    email: 'partner@heritage-spa.id',
    role: 'merchant',
    country: 'Indonesia',
    phone: '+62 812 7008 8990',
    totalSpentSgd: 0,
    status: 'active',
    lastActive: 'Online now'
  },
  {
    id: 'usr-3',
    db_id: 3,
    name: 'Alexandre Tan',
    email: 'traveler@singapore.sg',
    role: 'tourist',
    country: 'Singapore',
    phone: '+65 9123 4567',
    totalSpentSgd: 28.27,
    status: 'active',
    lastActive: 'Online now'
  }
];

export const MOCK_AI_LOGS = [];

export const MOCK_FINANCE_TRANSACTIONS = [
  {
    id: 'TXN-8841',
    date: '2026-08-15 14:30',
    customer: 'Marcus Lim (SG)',
    merchant: 'Martha Heritage Herbal Spa Grand Batam',
    service: 'Balinese Herbal Oil Deep Relief (45m)',
    amountOriginal: 'SGD 23.63',
    amountIdr: 280000,
    platformFeeIdr: 33600,
    merchantPayoutIdr: 246400,
    payoutStatus: 'settled',
    paymentMethod: 'PayNow SGD (Instant BI-FAST)'
  }
];

export const MOCK_REVENUE_CHART_DAYS = [
  { day: 'Mon', idr: 0, bookings: 0 },
  { day: 'Tue', idr: 0, bookings: 0 },
  { day: 'Wed', idr: 0, bookings: 0 },
  { day: 'Thu', idr: 0, bookings: 0 },
  { day: 'Fri', idr: 0, bookings: 0 },
  { day: 'Sat', idr: 335000, bookings: 1 },
  { day: 'Sun', idr: 0, bookings: 0 }
];

export const SYSTEM_CONFIG = {
  exchangeRates: {
    SGD_TO_IDR: 11850,
    MYR_TO_IDR: 3550,
    USD_TO_IDR: 16200
  },
  platformCommissionPercent: 12.0,
  enableWhatsAppBridge: true,
  aiModel: 'Zentura-MedNLP-v3.2'
};
