export const MOCK_ADMIN_METRICS = {
  totalGmvIdr: 428500000,
  totalGmvSgd: 36800,
  monthlyGrowthPercent: 24.8,
  activeMerchantsCount: 48,
  pendingVerificationMerchants: 5,
  totalTouristsRegistered: 3420,
  totalAiTranslationsMonth: 18450,
  aiSafetyFilterTriggers: 142, // e.g. Allergy flags detected
  avgTranslationLatencyMs: 185,
  totalPlatformCommissionIdr: 51420000
};

export const MOCK_ADMIN_MERCHANTS = [
  {
    id: 'merch-1',
    name: 'Martha Tilaar Spa Grand Batam',
    ownerName: 'Ibu Ratna Dewi',
    region: 'batam',
    city: 'Batam City, Kepri',
    email: 'ratna@marthabatam.co.id',
    phone: '+62 812-7788-9901',
    joinedDate: '2026-01-15',
    status: 'active', // active, pending, suspended
    hygieneScore: 98,
    commissionRate: 12,
    totalBookings: 324,
    revenueIdr: 129600000,
    kycDocumentsVerified: true,
    rating: 4.9
  },
  {
    id: 'merch-2',
    name: 'Eska Wellness Spa Harbour Bay',
    ownerName: 'David Santoso',
    region: 'batam',
    city: 'Harbour Bay, Batam',
    email: 'david@eskawellness.com',
    phone: '+62 813-6455-1122',
    joinedDate: '2026-02-01',
    status: 'active',
    hygieneScore: 96,
    commissionRate: 12,
    totalBookings: 288,
    revenueIdr: 98400000,
    kycDocumentsVerified: true,
    rating: 4.8
  },
  {
    id: 'merch-3',
    name: 'Nongsa Pura Coastal Botanical Spa',
    ownerName: 'Ibu Wayan',
    region: 'batam_nongsa',
    city: 'Nongsa Coast, Batam',
    email: 'contact@nongsaspa.id',
    phone: '+62 811-9876-5432',
    joinedDate: '2026-02-18',
    status: 'active',
    hygieneScore: 99,
    commissionRate: 15,
    totalBookings: 195,
    revenueIdr: 156000000,
    kycDocumentsVerified: true,
    rating: 4.95
  },
  {
    id: 'merch-4',
    name: 'Nagoya Hill Reflexology Express',
    ownerName: 'Hendra Wijaya',
    region: 'batam',
    city: 'Nagoya, Batam',
    email: 'hendra@nagoyaspa.com',
    phone: '+62 812-3344-5566',
    joinedDate: '2026-03-02',
    status: 'pending',
    hygieneScore: 92,
    commissionRate: 10,
    totalBookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: false,
    rating: 4.7
  },
  {
    id: 'merch-5',
    name: 'Batam Centre Serenity Lounge',
    ownerName: 'Jonathan Tan',
    region: 'batam_centre',
    city: 'Batam Centre Promenade',
    email: 'jonathan@batamcentrespa.id',
    phone: '+62 813-8899-0011',
    joinedDate: '2026-03-05',
    status: 'pending',
    hygieneScore: 95,
    commissionRate: 12,
    totalBookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: true,
    rating: 4.85
  }
];

export const MOCK_ADMIN_USERS = [
  {
    id: 'usr-101',
    name: 'Alexandre Tan',
    email: 'alex.tan@sgtravel.com',
    role: 'tourist',
    country: 'Singapore',
    totalSpentSgd: 480,
    status: 'active',
    lastActive: '2 mins ago'
  },
  {
    id: 'usr-102',
    name: 'Chloe Zhang',
    email: 'chloe.zhang@gmail.com',
    role: 'tourist',
    country: 'Singapore',
    totalSpentSgd: 310,
    status: 'active',
    lastActive: '15 mins ago'
  },
  {
    id: 'usr-103',
    name: 'Ratna Dewi (Merchant)',
    email: 'partner@heritage-spa.id',
    role: 'merchant',
    country: 'Indonesia',
    totalSpentSgd: 0,
    status: 'active',
    lastActive: 'Online now'
  },
  {
    id: 'usr-104',
    name: 'Marcus Brody',
    email: 'marcus@auspacific.com.au',
    role: 'tourist',
    country: 'Australia',
    totalSpentSgd: 215,
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 'usr-105',
    name: 'Spam Bot Account',
    email: 'test_auto99@tempmail.com',
    role: 'tourist',
    country: 'Unknown',
    totalSpentSgd: 0,
    status: 'banned',
    lastActive: '3 days ago'
  }
];

export const MOCK_AI_LOGS = [
  {
    id: 'ai-log-101',
    timestamp: '13:42:10',
    sourceLang: 'English (SG)',
    inputSnippet: 'Lower back stiffness and shoulder knots, strictly NO peanut oil (allergy), firm pressure.',
    outputSnippet: 'Tolong hindari minyak kacang (gunakan VCO murni). Fokus pijat pinggang bawah dan leher dengan tekanan kuat.',
    detectedAllergy: 'Peanut Oil Allergy',
    latencyMs: 182,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'ALLERGY_ALERT'
  },
  {
    id: 'ai-log-102',
    timestamp: '13:28:44',
    sourceLang: 'Mandarin (CN)',
    inputSnippet: '肩颈酸痛，力度要中等，不要按脊椎骨，房间请安静。',
    outputSnippet: 'Bahu dan leher tegang. Tekanan sedang. Hindari penekanan langsung pada ruas tulang belakang. Sesi hening/tenang.',
    detectedAllergy: 'None',
    latencyMs: 168,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'NORMAL'
  },
  {
    id: 'ai-log-103',
    timestamp: '13:15:02',
    sourceLang: 'Korean (KR)',
    inputSnippet: '발 마사지 위주로 해주세요. 임신 4개월 차입니다.',
    outputSnippet: 'Tamu hamil 4 bulan! PENTING: Hindari titik akupresur Sanyinjiao & Kunlun di pergelangan kaki. Pijat sangat lembut.',
    detectedAllergy: 'Pregnancy 16 Weeks',
    latencyMs: 195,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'PREGNANCY_SAFETY_ALERT'
  },
  {
    id: 'ai-log-104',
    timestamp: '12:59:18',
    sourceLang: 'English (US)',
    inputSnippet: 'Just an express 30 min foot reflexology before my 3:30 ferry to Tanah Merah.',
    outputSnippet: 'Refleksi kaki kilat 30 menit. Target selesai sebelum kapal jam 15:30.',
    detectedAllergy: 'None',
    latencyMs: 140,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'NORMAL'
  }
];

export const MOCK_FINANCE_TRANSACTIONS = [
  {
    id: 'TXN-8841',
    date: '2026-08-15 13:15',
    customer: 'Alexandre Tan (SG)',
    merchant: 'Martha Tilaar Spa',
    service: 'Express Neck & Back Relief (45m)',
    amountOriginal: 'SGD 32.00',
    amountIdr: 375000,
    platformFeeIdr: 45000,
    merchantPayoutIdr: 330000,
    payoutStatus: 'settled',
    paymentMethod: 'PayNow SG / QRIS'
  },
  {
    id: 'TXN-8840',
    date: '2026-08-15 12:40',
    customer: 'Sarah Lim (SG)',
    merchant: 'Eska Wellness Spa',
    service: 'Balinese Heritage Massage (60m)',
    amountOriginal: 'SGD 45.00',
    amountIdr: 520000,
    platformFeeIdr: 62400,
    merchantPayoutIdr: 457600,
    payoutStatus: 'settled',
    paymentMethod: 'Credit Card (Stripe)'
  },
  {
    id: 'TXN-8839',
    date: '2026-08-15 11:20',
    customer: 'David Wong (MY)',
    merchant: 'Lagoi Royal Rainforest',
    service: 'Royal Herbal Scrub (90m)',
    amountOriginal: 'MYR 220.00',
    amountIdr: 780000,
    platformFeeIdr: 117000,
    merchantPayoutIdr: 663000,
    payoutStatus: 'pending_payout',
    paymentMethod: 'DuitNow MY / QRIS'
  }
];

export const MOCK_REVENUE_CHART_DAYS = [
  { day: 'Mon', idr: 42000000, bookings: 38 },
  { day: 'Tue', idr: 38000000, bookings: 32 },
  { day: 'Wed', idr: 46500000, bookings: 44 },
  { day: 'Thu', idr: 55000000, bookings: 51 },
  { day: 'Fri', idr: 78000000, bookings: 79 },
  { day: 'Sat', idr: 112000000, bookings: 118 },
  { day: 'Sun', idr: 97000000, bookings: 98 }
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
