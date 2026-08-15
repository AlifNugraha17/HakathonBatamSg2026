// Vercel Serverless Backend Handler for Zentura (Singapore - Batam Maritime Gateway)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rcbxfhyodnudmeishbdj.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vvgnnzxPfov0YR0pqLhO4g_e9Rpda-s';

async function supabaseFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation'
      },
      ...options
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[Supabase REST] Connection check:', e.message);
  }
  return null;
}
const SPAS = [
  {
    id: 'salon-1',
    name: 'Martha Heritage Herbal Spa Grand Batam',
    tagline: 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
    region: 'batam',
    landmark: '3 mins walk from Harbour Bay Ferry Terminal',
    distanceMinutes: 3,
    rating: 4.9,
    reviewCount: 248,
    hygieneScore: 99,
    hygieneBadges: [
      'Single-Use Organic Bed Linens',
      'UV Sanitized Tools (Hospital Grade)',
      '100% Certified Master Therapists',
      'Individual Fresh Herbal Infusion'
    ],
    phone: '+6281270088990',
    address: 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    categories: ['massage', 'spa', 'reflexology'],
    pricingMinSgd: 24,
    pricingMinIdr: 280000,
    flashSlots: [
      {
        id: 'slot-101',
        serviceName: 'Balinese Herbal Oil Deep Relief (45m)',
        therapistName: 'Ibu Ratna Dewi (Master Practitioner)',
        therapistRating: 4.95,
        therapistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        chair: 'Suite VIP 02',
        time: '14:30 - 15:15 WIB',
        durationMinutes: 45,
        originalPriceSgd: 40,
        originalPriceIdr: 450000,
        priceSgd: 24,
        priceIdr: 280000,
        discountPercent: 38,
        isFlashActive: true,
        reason: 'Ferry Schedule Gap (Next Singapore Departure 16:30)'
      },
      {
        id: 'slot-102',
        serviceName: 'Quick Revive Foot Reflexology (30m)',
        therapistName: 'Pak Hendra (Reflexology Lead)',
        therapistRating: 4.88,
        therapistAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        chair: 'Recliner Chair #04',
        time: '15:00 - 15:30 WIB',
        durationMinutes: 30,
        originalPriceSgd: 25,
        originalPriceIdr: 280000,
        priceSgd: 16,
        priceIdr: 185000,
        discountPercent: 34,
        isFlashActive: true,
        reason: 'Client finished early, 30 min open slot'
      }
    ],
    services: [
      { id: 'srv-1', name: 'Balinese Deep Bodywork', durationMinutes: 60, priceSgd: 32, priceIdr: 375000, description: 'Traditional thumb and palm pressure technique targeting deep muscle fatigue.' },
      { id: 'srv-2', name: 'Herbal Warm Compress Ritual', durationMinutes: 90, priceSgd: 48, priceIdr: 560000, description: 'Steamed lemongrass, ginger & turmeric compresses applied along energy meridians.' },
      { id: 'srv-3', name: 'Maritime Express Foot Reflex', durationMinutes: 45, priceSgd: 22, priceIdr: 255000, description: 'Acupressure foot reflexology ideal for day-trippers waiting for afternoon ferries.' }
    ],
    therapists: [
      { id: 'th-1', name: 'Ibu Ratna Dewi', role: 'Senior Master Therapist', experienceYears: 12, rating: 4.95, completedSessions: 1420, specialties: ['Deep Tissue', 'Jamu Herbal Compress', 'Pregnancy Safe'] },
      { id: 'th-2', name: 'Pak Hendra', role: 'Reflexology Specialist', experienceYears: 8, rating: 4.88, completedSessions: 980, specialties: ['Acupressure Foot Reflex', 'Neck & Shoulder Knots'] }
    ]
  },
  {
    id: 'salon-2',
    name: 'Eska Wellness Spa Harbour Bay',
    tagline: 'Modern Oceanfront Hydrotherapy & Aromatherapy',
    region: 'batam',
    landmark: '5 mins from Harbour Bay Terminal',
    distanceMinutes: 5,
    rating: 4.8,
    reviewCount: 195,
    hygieneScore: 98,
    hygieneBadges: ['Hospital Grade Sanitization', 'Single-Use Linens', 'Certified Specialists'],
    phone: '+6281364551122',
    address: 'Harbour Bay Downtown Block R-12, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    categories: ['massage', 'spa', 'headspa'],
    pricingMinSgd: 28,
    pricingMinIdr: 320000,
    flashSlots: [
      {
        id: 'slot-201',
        serviceName: 'Aromatherapy Back Relief (45m)',
        therapistName: 'Siti Rahma',
        therapistRating: 4.9,
        chair: 'Room 3',
        time: '14:45 - 15:30 WIB',
        durationMinutes: 45,
        originalPriceSgd: 42,
        originalPriceIdr: 480000,
        priceSgd: 28,
        priceIdr: 320000,
        discountPercent: 33,
        isFlashActive: true,
        reason: 'Midday vacancy window'
      }
    ],
    services: [
      { id: 'srv-4', name: 'Hydrotherapy & Ocean Body Scrub', durationMinutes: 75, priceSgd: 45, priceIdr: 520000, description: 'Sea salt mineral exfoliation followed by gentle essential oil massage.' }
    ],
    therapists: [
      { id: 'th-3', name: 'Siti Rahma', role: 'Aromatherapy Specialist', experienceYears: 7, rating: 4.9, completedSessions: 810, specialties: ['Head Spa', 'Aroma Bodywork'] }
    ]
  }
];

const ADMIN_METRICS = {
  totalGmvIdr: 428500000,
  totalGmvSgd: 36800,
  monthlyGrowthPercent: 24.8,
  activeMerchantsCount: 48,
  pendingVerificationMerchants: 3,
  totalTouristsRegistered: 3420,
  totalAiTranslationsMonth: 18450,
  aiSafetyFilterTriggers: 142,
  avgTranslationLatencyMs: 165,
  totalPlatformCommissionIdr: 51420000
};

const AI_LOGS = [
  {
    id: 'ai-log-1',
    timestamp: 'Just now',
    sourceLang: 'EN',
    inputSnippet: 'Tight lower back and right shoulder, allergic to peanut oil, medium pressure.',
    outputSnippet: 'Tolong hindari minyak kacang (gunakan VCO). Fokus area pinggang bawah dan bahu kanan dengan tekanan sedang.',
    detectedAllergy: 'Peanut Oil Allergy',
    latencyMs: 145,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'ALLERGY_ALERT'
  },
  {
    id: 'ai-log-2',
    timestamp: '5 mins ago',
    sourceLang: 'ZH',
    inputSnippet: '肩颈酸痛，力度要中等，不要按脊椎骨。',
    outputSnippet: 'Bahu dan leher tegang. Tekanan sedang. Hindari penekanan langsung pada ruas tulang belakang.',
    detectedAllergy: 'None',
    latencyMs: 160,
    model: 'Zentura-MedNLP v3.2',
    safetyFlag: 'NORMAL'
  }
];

let liveBookings = [
  {
    id: 'ZEN-7821',
    booking_code: 'ZEN-7821',
    spa_id: 'salon-1',
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa Grand Batam',
    service_name: 'Balinese Herbal Oil Deep Relief (45m)',
    serviceName: 'Balinese Herbal Oil Deep Relief (45m)',
    guest_name: 'Marcus Lim',
    guestName: 'Marcus Lim',
    guest_phone: '+65 9123 4567',
    guestPhone: '+65 9123 4567',
    therapist_name: 'Ibu Ratna Dewi',
    therapistName: 'Ibu Ratna Dewi',
    booking_time: '14:30 WIB',
    time: '14:30 WIB',
    duration_minutes: 45,
    durationMinutes: 45,
    price_idr: 280000,
    priceIdr: 280000,
    ferry_time: '17:30 Batam Fast Ferry',
    ferryTime: '17:30 Batam Fast Ferry',
    status: 'confirmed',
    payment_method: 'PayNow SGD (Instant BI-FAST)'
  }
];

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse path
  const url = req.url || '';
  const cleanPath = url.replace(/^\/api\/v1/, '').split('?')[0];

  // Helper JSON Response
  const send = (status, data, message = 'Success') => {
    res.status(status).json({
      status: status >= 200 && status < 300 ? 'success' : 'error',
      message,
      data
    });
  };

  // 1. AUTH ROUTES
  if (cleanPath === '/auth/quick-login') {
    const role = (req.body && req.body.role) || 'tourist';
    const users = {
      admin: { id: 1, name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin', country: 'Singapore' },
      merchant: { id: 2, name: 'Ratna Dewi', email: 'partner@heritage-spa.id', role: 'merchant', country: 'Indonesia' },
      tourist: { id: 3, name: 'Alexandre Tan', email: 'traveler@singapore.sg', role: 'tourist', country: 'Singapore' }
    };
    const user = users[role] || users.tourist;
    return send(200, { user, token: 'demo-jwt-token-xyz', role: user.role });
  }

  if (cleanPath === '/auth/login') {
    const { email, password } = req.body || {};
    let role = 'tourist';
    let name = 'Demo User';
    if (email?.includes('admin')) { role = 'admin'; name = 'Super Admin HQ'; }
    else if (email?.includes('partner') || email?.includes('merchant')) { role = 'merchant'; name = 'Ratna Dewi'; }
    else { role = 'tourist'; name = email?.split('@')[0] || 'Alexandre Tan'; }

    return send(200, {
      user: { id: Date.now(), name, email: email || 'user@zentura.com', role, country: role === 'merchant' ? 'Indonesia' : 'Singapore' },
      token: 'demo-jwt-token-xyz',
      role
    });
  }

  if (cleanPath === '/auth/register') {
    const b = req.body || {};
    return send(201, {
      user: { id: Date.now(), name: b.name || 'User', email: b.email, role: b.role || 'tourist', country: b.country || 'Singapore' },
      token: 'demo-jwt-token-new',
      role: b.role || 'tourist'
    });
  }

  if (cleanPath === '/auth/me') {
    return send(200, { user: { id: 1, name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin' } });
  }

  // 2. SPAS & CATALOG
  if (cleanPath === '/spas') {
    const fromDb = await supabaseFetch('spas?select=*');
    if (fromDb && Array.isArray(fromDb) && fromDb.length > 0) {
      return send(200, fromDb);
    }
    return send(200, SPAS);
  }

  if (cleanPath.startsWith('/spas/')) {
    const id = cleanPath.split('/')[2];
    const fromDb = await supabaseFetch(`spas?id=eq.${id}&select=*`);
    if (fromDb && Array.isArray(fromDb) && fromDb.length > 0) {
      return send(200, fromDb[0]);
    }
    const spa = SPAS.find(s => s.id === id) || SPAS[0];
    return send(200, spa);
  }

  // 3. FLASH MATCHER
  if (cleanPath === '/matcher/find-gaps') {
    const gaps = [];
    SPAS.forEach(s => {
      s.flashSlots?.forEach(slot => {
        gaps.push({ ...slot, salonName: s.name, salonId: s.id, landmark: s.landmark, distanceMinutes: s.distanceMinutes });
      });
    });
    return send(200, gaps);
  }

  // 4. AI TRANSLATION
  if (cleanPath === '/ai/translate-medical') {
    const text = req.body?.text || 'Standard relaxation treatment';
    return send(200, {
      indonesian_brief: `Pijat relaksasi seimbang. Catatan tamu: "${text}". Utamakan area leher & bahu.`,
      pressure: 'Sedang (Medium)',
      focus: 'Bahu, Tengkuk, Pinggang',
      allergy: text.toLowerCase().includes('peanut') ? 'DILARANG MINYAK KACANG' : null,
      model: 'Zentura-MedNLP v3.2 (Vercel Edge)',
      latency_ms: 142
    });
  }

  // 5. BOOKINGS
  if (cleanPath === '/bookings') {
    if (req.method === 'POST') {
      const b = req.body || {};
      const newB = {
        booking_code: `ZEN-${Math.floor(1000 + Math.random() * 9000)}`,
        spa_id: b.spa_id || 'salon-1',
        salonId: b.spa_id || 'salon-1',
        salonName: 'Martha Heritage Herbal Spa Grand Batam',
        service_name: b.service_name || 'Balinese Traditional Massage',
        serviceName: b.service_name || 'Balinese Traditional Massage',
        guest_name: b.guest_name || 'Marcus Lim',
        guestName: b.guest_name || 'Marcus Lim',
        guest_phone: b.guest_phone || '+65 9123 4567',
        therapist_name: b.therapist_name || 'Ibu Ratna Dewi',
        booking_time: b.booking_time || '14:30 WIB',
        price_idr: b.price_idr || 280000,
        status: 'confirmed'
      };

      const saved = await supabaseFetch('bookings', {
        method: 'POST',
        body: JSON.stringify(newB)
      });

      const responseItem = (saved && saved[0]) ? { ...newB, ...saved[0], id: saved[0].id } : { ...newB, id: newB.booking_code };
      liveBookings.unshift(responseItem);
      return send(201, responseItem, 'Booking created successfully');
    }

    const fromDb = await supabaseFetch('bookings?select=*&order=created_at.desc');
    if (fromDb && Array.isArray(fromDb) && fromDb.length > 0) {
      return send(200, fromDb);
    }
    return send(200, liveBookings);
  }

  // 6. ADMIN
  if (cleanPath === '/admin/dashboard-metrics') {
    return send(200, ADMIN_METRICS);
  }

  if (cleanPath === '/admin/merchants') {
    return send(200, SPAS.map(s => ({
      id: s.id,
      name: s.name,
      ownerName: 'Ibu Ratna Dewi',
      region: s.region,
      status: 'active',
      hygieneScore: s.hygieneScore,
      rating: s.rating,
      totalBookings: 324,
      revenueIdr: 129600000
    })));
  }

  if (cleanPath === '/admin/users') {
    return send(200, [
      { id: 'usr-1', name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin', status: 'active' },
      { id: 'usr-2', name: 'Ratna Dewi (Merchant)', email: 'partner@heritage-spa.id', role: 'merchant', status: 'active' },
      { id: 'usr-3', name: 'Alexandre Tan (Tourist)', email: 'traveler@singapore.sg', role: 'tourist', status: 'active' }
    ]);
  }

  if (cleanPath === '/admin/ai-logs') {
    return send(200, AI_LOGS);
  }

  if (cleanPath === '/admin/treasury-summary') {
    return send(200, {
      total_vault_idr: 850000000,
      sgd_pool: 72000,
      fx_rate: 11850,
      recent_payouts: [
        { id: 'TXN-8841', merchantName: 'Martha Tilaar Spa', amountSgd: 32, payoutStatus: 'settled', date: 'Just now' }
      ]
    });
  }

  if (cleanPath === '/admin/settings') {
    return send(200, {
      corridor: 'Singapore - Batam Maritime Wellness Network',
      sgd_to_idr_exchange_rate: 11850,
      platform_commission_percent: 12.0,
      bi_fast_mode: 'active_simulation',
      nlp_model: 'Zentura-MedNLP-v3'
    });
  }

  // Fallback default
  return send(200, { ok: true, timestamp: new Date().toISOString() });
}
