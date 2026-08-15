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
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'reflexology', 'spa'],
    openNow: true,
    operatingHours: '09:00 - 22:00 (WIB)',
    therapists: [
      { name: 'Ibu Ratna', experience: '12 yrs exp', specialty: 'Balinese Pressure & Acupressure', rating: 4.9 },
      { name: 'Mas Budi', experience: '8 yrs exp', specialty: 'Reflexology & Sciatica Release', rating: 4.8 },
      { name: 'Mbak Dewi', experience: '6 yrs exp', specialty: 'Aroma Therapy & Head Spa', rating: 4.9 }
    ],
    flashSlots: [
      {
        id: 'slot-101',
        time: '14:15 - 15:15',
        durationMinutes: 60,
        therapistName: 'Ibu Ratna',
        discountPercent: 20,
        chair: 'Private VIP Room 1',
        serviceName: 'Balinese Herbal Oil Deep Tissue',
        priceIdr: 200000,
        originalPriceIdr: 250000,
        isFlashActive: true,
        expiresInMinutes: 12
      },
      {
        id: 'slot-102',
        time: '15:30 - 16:15',
        durationMinutes: 45,
        therapistName: 'Mas Budi',
        discountPercent: 25,
        chair: 'Reflexology Recliner 3',
        serviceName: 'Express Travel Foot & Calf Revival',
        priceIdr: 135000,
        originalPriceIdr: 180000,
        isFlashActive: true,
        expiresInMinutes: 28
      }
    ],
    services: [
      {
        id: 'srv-101',
        name: 'Balinese Herbal Oil Deep Tissue',
        durationMinutes: 60,
        priceIdr: 250000,
        category: 'massage',
        popular: true,
        desc: 'Traditional Indonesian palm kneading, skin rolling, and warm infused ginger-clove oil targeting tight lower back and shoulder knots.'
      },
      {
        id: 'srv-102',
        name: 'Express Travel Foot & Calf Revival',
        durationMinutes: 45,
        priceIdr: 180000,
        category: 'reflexology',
        popular: true,
        desc: 'Specialized foot pressure-point relief designed to restore circulation after maritime ferry transit and duty-free shopping.'
      },
      {
        id: 'srv-103',
        name: 'Royal Javanese Lulur & Body Polish',
        durationMinutes: 90,
        priceIdr: 380000,
        category: 'spa',
        popular: false,
        desc: 'Full body botanical scrub with turmeric, rice powder, jasmine essence followed by yoghurt skin hydration.'
      }
    ]
  },
  {
    id: 'salon-2',
    name: 'Eska Wellness & Reflexology Harbour Bay',
    tagline: 'Modern Hydrotherapy & Rapid Pre-Ferry Decompression',
    region: 'batam',
    landmark: 'Directly linked to Harbour Bay Ferry Terminal Walkway',
    distanceMinutes: 2,
    rating: 4.85,
    reviewCount: 312,
    hygieneScore: 98,
    hygieneBadges: [
      'Medical Grade Sanitization',
      'Disposable Slippers & Underwear',
      'BNSP Licensed Senior Practitioners',
      'Allergy Free Natural Carrier Oils'
    ],
    phone: '+6281364551122',
    address: 'Bayfront Promenade Block C-12, Harbour Bay, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'reflexology', 'headspa'],
    openNow: true,
    operatingHours: '09:00 - 22:30 (WIB)',
    therapists: [
      { name: 'Kak Sarah', experience: '9 yrs exp', specialty: 'Upper Trapezius & Migraine Relief', rating: 4.9 },
      { name: 'Pak Agus', experience: '14 yrs exp', specialty: 'Deep Shiatsu & Spinal Alignment', rating: 4.8 }
    ],
    flashSlots: [
      {
        id: 'slot-201',
        time: '14:30 - 15:00',
        durationMinutes: 30,
        therapistName: 'Kak Sarah',
        discountPercent: 15,
        chair: 'Chair 4 (Fast Track)',
        serviceName: 'Express 30-Min Head, Neck & Shoulder Blitz',
        priceIdr: 120000,
        originalPriceIdr: 140000,
        isFlashActive: true,
        expiresInMinutes: 8
      }
    ],
    services: [
      {
        id: 'srv-201',
        name: 'Express 30-Min Head, Neck & Shoulder Blitz',
        durationMinutes: 30,
        priceIdr: 140000,
        category: 'massage',
        popular: true,
        desc: 'Quick targeted relief for passengers with less than 45 minutes before ferry boarding calls.'
      },
      {
        id: 'srv-202',
        name: 'Japanese Scalp Waterfall & Herbal Head Spa',
        durationMinutes: 60,
        priceIdr: 320000,
        category: 'headspa',
        popular: true,
        desc: 'Warm water circulator ring, volcanic clay scalp detox, and therapeutic temple acupressure.'
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'Nagoya Hill Reflexology & Aromatherapy Sanctuary',
    tagline: 'Premium Thai Acupressure & Reflexology Center',
    region: 'batam_centre',
    landmark: '5 mins from Batam Centre Ferry Terminal',
    distanceMinutes: 5,
    rating: 4.78,
    reviewCount: 194,
    hygieneScore: 96,
    hygieneBadges: [
      'Fresh Laundered Sheets Every Guest',
      'UV Sterilized Hot Towel Cabinets',
      'Non-Greasy Aromatherapy Formulas'
    ],
    phone: '+6281233445566',
    address: 'Nagoya City Walk Complex Blok A No. 1-3, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['reflexology', 'massage'],
    openNow: true,
    operatingHours: '10:00 - 22:00 (WIB)',
    therapists: [
      { name: 'Ibu Maya', experience: '7 yrs exp', specialty: 'Reflexology & Lymphatic Drainage', rating: 4.8 },
      { name: 'Mas Dian', experience: '10 yrs exp', specialty: 'Deep Tissue Shiatsu', rating: 4.7 }
    ],
    flashSlots: [
      {
        id: 'slot-301',
        time: '15:00 - 15:45',
        durationMinutes: 45,
        therapistName: 'Ibu Maya',
        discountPercent: 18,
        chair: 'Recliner Suite 2',
        serviceName: 'Acupressure Foot & Arm Restoration',
        priceIdr: 145000,
        originalPriceIdr: 175000,
        isFlashActive: true,
        expiresInMinutes: 20
      }
    ],
    services: [
      {
        id: 'srv-301',
        name: 'Acupressure Foot & Arm Restoration',
        durationMinutes: 45,
        priceIdr: 175000,
        category: 'reflexology',
        popular: true,
        desc: 'Concentrated pressure points targeting feet, calves, palms, and forearms with warming ginger balm.'
      }
    ]
  },
  {
    id: 'salon-4',
    name: 'Nongsa Pura Coastal Botanical Spa',
    tagline: 'Seaside Pavilion Relaxation by the Marina',
    region: 'batam_nongsa',
    landmark: '2 mins walk from Nongsa Pura Ferry Terminal',
    distanceMinutes: 2,
    rating: 4.95,
    reviewCount: 180,
    hygieneScore: 99,
    hygieneBadges: [
      'Private Oceanfront Suites',
      'Single-Use Organic Bed Linens',
      'Hospital Grade Autoclave Tools',
      'Hypoallergenic Virgin Coconut Oils'
    ],
    phone: '+6281198765432',
    address: 'Nongsa Marina Promenade, Nongsa, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'spa', 'reflexology'],
    openNow: true,
    operatingHours: '09:00 - 21:00 (WIB)',
    therapists: [
      { name: 'Ibu Wayan', experience: '15 yrs exp', specialty: 'Coastal Warm Stone Deep Therapy', rating: 5.0 },
      { name: 'Mbak Cindy', experience: '8 yrs exp', specialty: 'Organic Herbal Jamu Compress', rating: 4.9 }
    ],
    flashSlots: [
      {
        id: 'slot-401',
        time: '16:00 - 17:00',
        durationMinutes: 60,
        therapistName: 'Ibu Wayan',
        discountPercent: 20,
        chair: 'Oceanfront Pavilion 1',
        serviceName: 'Nongsa Ocean Breeze Herbal Massage',
        priceIdr: 280000,
        originalPriceIdr: 350000,
        isFlashActive: true,
        expiresInMinutes: 15
      }
    ],
    services: [
      {
        id: 'srv-401',
        name: 'Nongsa Ocean Breeze Herbal Massage',
        durationMinutes: 60,
        priceIdr: 350000,
        category: 'massage',
        popular: true,
        desc: 'Deep thumb pressure along meridian lines combined with palm kneading and organic virgin coconut massage oil overlooking the Singapore strait.'
      }
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
