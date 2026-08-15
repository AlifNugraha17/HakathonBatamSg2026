// Vercel Serverless Backend Handler for LokaBatam (Singapore - Batam Maritime Gateway)
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

let SPAS = [
  {
    id: 'salon-1',
    db_id: 1,
    name: 'Martha Heritage Herbal Spa Grand Batam',
    tagline: 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
    region: 'batam',
    landmark: '3 mins walk from Harbour Bay Ferry Terminal',
    distanceMinutes: 3,
    address: 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
    phone: '+6281270088990',
    rating: 4.90,
    reviewCount: 248,
    hygieneScore: 99,
    hygieneBadges: ['Single-Use Linens', 'UV Sanitized', '100% BNSP Master Therapists'],
    categories: ['massage', 'reflexology', 'spa'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    status: 'active',
    services: [
      { id: 'srv-1', name: 'Balinese Herbal Oil Deep Tissue', durationMinutes: 60, priceIdr: 250000, category: 'massage', popular: true },
      { id: 'srv-2', name: 'Express Travel Foot & Calf Revival', durationMinutes: 45, priceIdr: 180000, category: 'reflexology', popular: true }
    ],
    therapists: [
      { id: 'th-1', name: 'Ibu Ratna', specialty: 'Balinese Pressure & Acupressure', rating: 4.9, bnspCertified: true, status: 'available' },
      { id: 'th-2', name: 'Mas Budi', specialty: 'Reflexology & Sciatica Release', rating: 4.8, bnspCertified: true, status: 'available' }
    ],
    flashSlots: [
      { id: 'slot-1', therapistName: 'Ibu Ratna', serviceName: 'Balinese Herbal Oil Deep Tissue', chair: 'VIP Suite 1', time: '14:15 - 15:15', durationMinutes: 60, discountPercent: 20, priceIdr: 200000, originalPriceIdr: 250000, isFlashActive: true }
    ]
  }
];

let liveBookings = [
  {
    id: 'LOKA-SG-8812',
    booking_code: 'LOKA-SG-8812',
    bookingCode: 'LOKA-SG-8812',
    spa_id: 'salon-1',
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa Grand Batam',
    guest_name: 'Alexandre Tan',
    guestName: 'Alexandre Tan',
    guest_phone: '+65 9123 4567',
    guestPhone: '+65 9123 4567',
    touristCountry: 'Singapore',
    service_name: 'Balinese Herbal Oil Deep Tissue',
    serviceName: 'Balinese Herbal Oil Deep Tissue',
    therapist_name: 'Ibu Ratna',
    therapistName: 'Ibu Ratna',
    booking_time: '14:15 - 15:15',
    timeSlot: '14:15 - 15:15',
    time: '14:15 - 15:15',
    duration_minutes: 60,
    durationMinutes: 60,
    price_idr: 200000,
    priceIdr: 200000,
    price_sgd: 16.88,
    status: 'confirmed',
    ferry_time: '16:30 Ferry (HarbourFront SG)',
    medical_notes: 'Pegal bahu & leher. Alergi minyak kacang.',
    allergy_alert: 'Alergi minyak kacang (Gunakan VCO)',
    createdAt: 'Today, 14:10'
  },
  {
    id: 'LOKA-SG-8813',
    booking_code: 'LOKA-SG-8813',
    bookingCode: 'LOKA-SG-8813',
    spa_id: 'salon-1',
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa Grand Batam',
    guest_name: 'Grace Lim',
    guestName: 'Grace Lim',
    guest_phone: '+65 8234 5678',
    guestPhone: '+65 8234 5678',
    touristCountry: 'Singapore',
    service_name: 'Express Travel Foot & Calf Revival',
    serviceName: 'Express Travel Foot & Calf Revival',
    therapist_name: 'Mas Budi',
    therapistName: 'Mas Budi',
    booking_time: '15:30 - 16:15',
    timeSlot: '15:30 - 16:15',
    time: '15:30 - 16:15',
    duration_minutes: 45,
    durationMinutes: 45,
    price_idr: 135000,
    priceIdr: 135000,
    price_sgd: 11.39,
    status: 'pending',
    ferry_time: '17:45 Ferry (HarbourFront SG)',
    medical_notes: 'Pegal telapak kaki setelah belanja mall.',
    createdAt: 'Today, 14:25'
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

  // 1. HEALTH CHECK
  if (cleanPath === '/health') {
    return send(200, {
      corridor: 'Singapore - Batam',
      status: 'operational',
      ports: ['HarbourFront', 'Tanah Merah', 'Harbour Bay', 'Batam Centre', 'Nongsa Pura']
    });
  }

  // 2. AUTH ROUTES
  if (cleanPath === '/auth/quick-login') {
    const role = (req.body && req.body.role) || 'tourist';
    const users = {
      admin: { id: 1, name: 'Super Admin HQ', email: 'admin@lokabatam.com', role: 'admin', country: 'Singapore' },
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
    const newUser = {
      id: Date.now(),
      name: b.name || 'User',
      email: b.email,
      role: b.role || 'tourist',
      country: b.country || 'Singapore'
    };

    await supabaseFetch('users', {
      method: 'POST',
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        country: newUser.country
      })
    });

    return send(201, {
      user: newUser,
      token: 'demo-jwt-token-new',
      role: b.role || 'tourist'
    });
  }

  if (cleanPath === '/auth/me') {
    return send(200, { user: { id: 1, name: 'Super Admin HQ', email: 'admin@lokabatam.com', role: 'admin' } });
  }

  // 3. MERCHANT ORDER ACCEPT / DECLINE / STATUS UPDATE ROUTE (CRITICAL FIX)
  const merchantOrderStatusMatch = cleanPath.match(/^\/merchant\/orders\/(.+)\/status$/);
  if (merchantOrderStatusMatch && req.method === 'POST') {
    const orderId = merchantOrderStatusMatch[1];
    const newStatus = req.body?.status || 'confirmed';

    // 1. Update in Database Supabase
    await supabaseFetch(`bookings?id=eq.${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    });
    await supabaseFetch(`bookings?booking_code=eq.${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    });

    // 2. Update in In-Memory Cache
    const target = liveBookings.find(b => 
      String(b.id) === String(orderId) || 
      String(b.booking_code) === String(orderId) || 
      String(b.bookingCode) === String(orderId)
    );
    if (target) {
      target.status = newStatus;
    }

    return send(200, { id: orderId, status: newStatus, success: true }, `Order #${orderId} status updated to ${newStatus}`);
  }

  // 4. MERCHANT ORDERS & OVERVIEW
  if (cleanPath === '/merchant/orders') {
    const fromDb = await supabaseFetch('bookings?select=*&order=created_at.desc');
    const ordersList = (fromDb && Array.isArray(fromDb) && fromDb.length > 0) ? fromDb : liveBookings;
    return send(200, ordersList);
  }

  if (cleanPath === '/merchant/overview') {
    const fromDb = await supabaseFetch('bookings?select=*');
    const sourceBookings = (fromDb && Array.isArray(fromDb)) ? fromDb : liveBookings;
    const confirmedOrders = sourceBookings.filter(b => b.status === 'confirmed');
    const totalRev = confirmedOrders.reduce((sum, b) => sum + (Number(b.price_idr || b.priceIdr) || 0), 0);

    return send(200, {
      activeChairs: 4,
      totalChairs: 6,
      todayRevenueIdr: totalRev || 450000,
      todayRevenueSgd: Number(((totalRev || 450000) / 11850).toFixed(2)),
      activeTherapists: 3,
      totalTherapists: 4,
      pendingOrdersCount: sourceBookings.filter(b => b.status === 'pending').length,
      confirmedOrdersCount: confirmedOrders.length,
      upcomingAppointments: sourceBookings.slice(0, 5)
    });
  }

  if (cleanPath === '/merchant/therapists') {
    return send(200, [
      { id: 'th-1', name: 'Dewi Anggraini', title: 'Senior Balinese Master Therapist', experienceYears: 7, specialty: 'Balinese Pressure', rating: 4.9, bnspCertified: true, status: 'ready' },
      { id: 'th-2', name: 'Siti Rahma', title: 'Herbal Specialist', experienceYears: 10, specialty: 'Reflexology & Sciatica', rating: 4.8, bnspCertified: true, status: 'busy' },
      { id: 'th-3', name: 'Bayu Pratama', title: 'Sports Bodywork', experienceYears: 5, specialty: 'Aroma Therapy & Head Spa', rating: 4.9, bnspCertified: true, status: 'ready' }
    ]);
  }

  // Therapist Status Toggle Route
  const therapistStatusMatch = cleanPath.match(/^\/merchant\/therapists\/(.+)\/status$/);
  if (therapistStatusMatch && req.method === 'POST') {
    const thId = therapistStatusMatch[1];
    const newStatus = req.body?.status || 'ready';
    return send(200, { id: thId, status: newStatus, success: true }, `Therapist #${thId} status updated to ${newStatus}`);
  }

  // Slot Toggle Route
  const slotToggleMatch = cleanPath.match(/^\/slots\/(.+)\/toggle$/);
  if (slotToggleMatch && req.method === 'POST') {
    const slotId = slotToggleMatch[1];
    return send(200, { id: slotId, toggled: true, success: true }, `Slot #${slotId} toggled successfully`);
  }

  // Slot Broadcast Route
  if (cleanPath === '/slots' && req.method === 'POST') {
    const b = req.body || {};
    const newSlot = {
      id: `slot-${Date.now()}`,
      therapist_name: b.therapist_name || 'Ibu Ratna',
      service_name: b.service_name || 'Flash Massage',
      chair: b.chair || 'Chair 1',
      price_idr: Number(b.price_idr || 150000),
      original_price_idr: Number(b.original_price_idr || 200000),
      discount_percent: Number(b.discount_percent || 20),
      duration_minutes: Number(b.duration_minutes || 45),
      time_window: b.time_window || '15:00 - 15:45',
      is_flash_active: true
    };
    return send(201, newSlot, 'Flash slot broadcast successfully');
  }

  // Admin Approve Merchant Route
  const adminApproveMatch = cleanPath.match(/^\/admin\/merchants\/(.+)\/approve$/);
  if (adminApproveMatch && req.method === 'POST') {
    const mId = adminApproveMatch[1];
    const target = SPAS.find(s => String(s.id) === String(mId) || `merch-${s.id}` === String(mId));
    if (target) {
      target.status = 'active';
      target.kyc_verified = true;
    }
    return send(200, { id: mId, status: 'active', kyc_verified: true, success: true }, 'Merchant KYC approved');
  }

  // Admin Suspend Merchant Route
  const adminSuspendMatch = cleanPath.match(/^\/admin\/merchants\/(.+)\/suspend$/);
  if (adminSuspendMatch && req.method === 'POST') {
    const mId = adminSuspendMatch[1];
    const target = SPAS.find(s => String(s.id) === String(mId) || `merch-${s.id}` === String(mId));
    if (target) {
      target.status = 'suspended';
    }
    return send(200, { id: mId, status: 'suspended', success: true }, 'Merchant suspended');
  }

  // 4.5 CROSS-BORDER 49 PLACES & EXCHANGE RATE (MERGED API)
  if (cleanPath === '/places') {
    return send(200, [
      { id: 1, name: 'RS Awal Bros Batam — Executive Health Centre', category: 'medical', nearestTerminal: 'Batam Centre Terminal (7 mins)', priceSgd: 280, savingsPercent: 68, rating: 4.9, lat: 1.1278, lng: 104.0412 },
      { id: 2, name: 'RS BP Batam — Cardiovascular & Hyperbaric', category: 'medical', nearestTerminal: 'Sekupang Terminal (4 mins)', priceSgd: 220, savingsPercent: 72, rating: 4.8, lat: 1.1215, lng: 103.9310 },
      { id: 11, name: 'Nagoya Dental Wellness Centre', category: 'dental', nearestTerminal: 'Harbour Bay Terminal (5 mins)', priceSgd: 180, savingsPercent: 72, rating: 4.8, lat: 1.1445, lng: 104.0112 },
      { id: 14, name: 'Mount Elizabeth Hospital Orchard (Singapore)', category: 'medical', nearestTerminal: 'HarbourFront Terminal SG (15 mins)', priceSgd: 880, savingsPercent: 0, rating: 4.9, lat: 1.3048, lng: 103.8354 },
      { id: 45, name: 'Royal Heritage Spa & Wellness Resort', category: 'spa', nearestTerminal: 'Harbour Bay Terminal (8 mins)', priceSgd: 45, savingsPercent: 70, rating: 4.9, lat: 1.1512, lng: 104.0090 },
      { id: 47, name: 'Palm Springs Golf & Beach Resort Nongsa', category: 'golf', nearestTerminal: 'Nongsa Pura Terminal (10 mins)', priceSgd: 130, savingsPercent: 60, rating: 4.9, lat: 1.1920, lng: 104.1080 }
    ]);
  }

  if (cleanPath === '/exchange-rate') {
    return send(200, {
      base: 'SGD',
      target: 'IDR',
      rate: 13920,
      timestamp: new Date().toISOString(),
      source: 'Bank Indonesia & MAS Market Interbank'
    });
  }

  // 5. SPAS & CATALOG
  if (cleanPath === '/spas') {
    if (req.method === 'POST') {
      const b = req.body || {};
      const newSpa = {
        id: `salon-${Date.now()}`,
        name: b.name || 'New Spa Partner',
        tagline: b.tagline || 'Wellness Retreat',
        region: b.region || 'batam',
        landmark: b.landmark || 'Batam Hub',
        distanceMinutes: b.distanceMinutes || 5,
        rating: b.rating || 5.0,
        reviewCount: 0,
        hygieneScore: b.hygieneScore || 99,
        hygieneBadges: b.hygieneBadges || ['Verified Clean'],
        phone: b.phone || '+6281200000000',
        address: b.address || 'Batam, Indonesia',
        imageUrl: b.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
        categories: b.categories || ['massage', 'spa'],
        openNow: true,
        operatingHours: '09:00 - 22:00 (WIB)',
        therapists: b.therapists || [],
        flashSlots: b.flashSlots || [],
        services: b.services || []
      };

      await supabaseFetch('spas', {
        method: 'POST',
        body: JSON.stringify(newSpa)
      });

      SPAS.unshift(newSpa);
      return send(201, newSpa, 'Spa created successfully');
    }

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
    const spa = SPAS.find(s => s.id === id || String(s.id) === String(id)) || SPAS[0];
    return send(200, spa);
  }

  // 6. FLASH MATCHER
  if (cleanPath === '/matcher/find-gaps') {
    const fromDb = await supabaseFetch('spas?select=*');
    const sourceSpas = (fromDb && Array.isArray(fromDb) && fromDb.length > 0) ? fromDb : SPAS;
    const gaps = [];
    sourceSpas.forEach(s => {
      s.flashSlots?.forEach(slot => {
        gaps.push({ ...slot, salonName: s.name, salonId: s.id, landmark: s.landmark, distanceMinutes: s.distanceMinutes });
      });
    });
    return send(200, gaps);
  }

  // 7. AI TRANSLATION
  if (cleanPath === '/ai/presets') {
    return send(200, {
      complaints: ['Lower back pain', 'Stiff neck & shoulders', 'Foot fatigue', 'Tension headache'],
      allergies: ['Nut oils', 'Lemongrass / Citronella', 'Eucalyptus', 'Strong fragrances'],
      preferences: ['Firm pressure', 'Gentle pressure', 'Focus on neck', 'Silent treatment']
    });
  }

  if (cleanPath === '/ai/translate-medical') {
    const text = req.body?.text || 'Standard relaxation treatment';
    const isNutAllergy = text.toLowerCase().includes('peanut') || text.toLowerCase().includes('nut') || text.toLowerCase().includes('kacang');
    const isLemongrassAllergy = text.toLowerCase().includes('lemongrass') || text.toLowerCase().includes('serai');
    
    let allergyAlert = null;
    if (isNutAllergy) allergyAlert = 'DILARANG MINYAK KACANG (Gunakan VCO / Minyak Kelapa Murni)';
    else if (isLemongrassAllergy) allergyAlert = 'DILARANG MINYAK SERAI (Gunakan Minyak Lavender / Netral)';

    return send(200, {
      indonesian_brief: `📋 KARTU INSTRUKSI TERAPIS (LokaBatam AI):\n• Permintaan Tamu: "${text}"\n• Rekomendasi: Pijat relaksasi berfokus pada area bahu dan tengkuk dengan ritme lembut.\n• Keamanan: ${allergyAlert || 'Aman tanpa alergi tercatat.'}`,
      pressure: text.toLowerCase().includes('hard') || text.toLowerCase().includes('strong') ? 'Kuat (Firm)' : 'Sedang (Medium)',
      focus: text.toLowerCase().includes('foot') || text.toLowerCase().includes('leg') ? 'Telapak Kaki & Betis' : 'Bahu, Tengkuk, Pinggang',
      allergy: allergyAlert,
      model: 'LokaBatam-MedNLP-v3 (Vercel Edge Gateway)',
      latency_ms: 142
    });
  }

  // 8. BOOKINGS
  if (cleanPath === '/bookings') {
    if (req.method === 'POST') {
      const b = req.body || {};
      const newB = {
        id: `LOKA-SG-${Math.floor(1000 + Math.random() * 9000)}`,
        booking_code: `LOKA-SG-${Math.floor(1000 + Math.random() * 9000)}`,
        bookingCode: `LOKA-SG-${Math.floor(1000 + Math.random() * 9000)}`,
        spa_id: b.spa_id || 'salon-1',
        salonId: b.spa_id || 'salon-1',
        salonName: b.salonName || b.salon_name || 'Martha Heritage Herbal Spa',
        service_name: b.service_name || b.serviceName || 'Balinese Herbal Oil Deep Tissue',
        serviceName: b.service_name || b.serviceName || 'Balinese Herbal Oil Deep Tissue',
        guest_name: b.guest_name || b.guestName || 'Alexandre Tan',
        guestName: b.guest_name || b.guestName || 'Alexandre Tan',
        guest_phone: b.guest_phone || b.guestPhone || '+65 9123 4567',
        guestPhone: b.guest_phone || b.guestPhone || '+65 9123 4567',
        touristCountry: 'Singapore',
        therapist_name: b.therapist_name || b.therapistName || 'Ibu Ratna',
        therapistName: b.therapist_name || b.therapistName || 'Ibu Ratna',
        booking_time: b.booking_time || b.time || '15:00 - 16:00',
        timeSlot: b.booking_time || b.time || '15:00 - 16:00',
        time: b.booking_time || b.time || '15:00 - 16:00',
        duration_minutes: Number(b.duration_minutes || b.durationMinutes || 60),
        durationMinutes: Number(b.duration_minutes || b.durationMinutes || 60),
        price_idr: Number(b.price_idr || b.priceIdr || 200000),
        priceIdr: Number(b.price_idr || b.priceIdr || 200000),
        price_sgd: Number((Number(b.price_idr || b.priceIdr || 200000) / 11850).toFixed(2)),
        status: 'pending',
        medical_notes: b.medical_notes || b.medicalNotes || b.touristNotes || '',
        allergy_alert: b.allergy_alert || b.allergyAlert || '',
        createdAt: 'Just now'
      };

      await supabaseFetch('bookings', {
        method: 'POST',
        body: JSON.stringify(newB)
      });

      liveBookings.unshift(newB);
      return send(201, newB, 'Booking created successfully');
    }

    const fromDb = await supabaseFetch('bookings?select=*&order=created_at.desc');
    if (fromDb && Array.isArray(fromDb) && fromDb.length > 0) {
      return send(200, fromDb);
    }
    return send(200, liveBookings);
  }

  // 9. SUPER ADMIN HQ
  if (cleanPath === '/admin/dashboard-metrics') {
    const fromSpas = await supabaseFetch('spas?select=*');
    const fromBookings = await supabaseFetch('bookings?select=*');
    const sourceSpas = (fromSpas && Array.isArray(fromSpas) && fromSpas.length > 0) ? fromSpas : SPAS;
    const sourceBookings = (fromBookings && Array.isArray(fromBookings) && fromBookings.length > 0) ? fromBookings : liveBookings;

    const totalIdr = sourceBookings.reduce((sum, b) => sum + (Number(b.price_idr || b.priceIdr) || 0), 0);
    const totalSgd = totalIdr > 0 ? Number((totalIdr / 11850).toFixed(2)) : 0;
    const feeIdr = Math.round(totalIdr * 0.12);

    return send(200, {
      totalGmvIdr: totalIdr,
      totalGmvSgd: totalSgd,
      total_gmv_idr: totalIdr,
      total_gmv_sgd: totalSgd,
      activeMerchantsCount: sourceSpas.length,
      active_partners_count: sourceSpas.length,
      total_merchants: sourceSpas.length,
      pendingVerificationMerchants: 0,
      pending_kyc_count: 0,
      totalBookings: sourceBookings.length,
      total_bookings: sourceBookings.length,
      totalUsers: 4,
      total_users: 4,
      totalAiTranslationsMonth: 124,
      total_ai_queries: 124,
      aiSafetyFilterTriggers: 18,
      avgTranslationLatencyMs: 142,
      avg_edge_latency_ms: 142,
      totalPlatformCommissionIdr: feeIdr,
      total_platform_commission_idr: feeIdr,
      regional_distribution: [
        { zone: 'Batam Harbour Bay (HarbourFront SG)', share: 50 },
        { zone: 'Batam Centre (Tanah Merah SG)', share: 30 },
        { zone: 'Nongsa Pura Coast (Tanah Merah SG)', share: 20 },
      ]
    });
  }

  if (cleanPath === '/admin/merchants') {
    const fromSpas = await supabaseFetch('spas?select=*');
    const sourceSpas = (fromSpas && Array.isArray(fromSpas) && fromSpas.length > 0) ? fromSpas : SPAS;
    return send(200, sourceSpas.map(s => ({
      id: 'merch-' + s.id,
      db_id: s.id,
      name: s.name,
      owner_name: s.owner_name || s.ownerName || 'Ratna Dewi',
      ownerName: s.owner_name || s.ownerName || 'Ratna Dewi',
      region: s.region || 'batam',
      city: s.landmark || s.city || 'Harbour Bay Zone',
      rating: s.rating || 4.90,
      hygiene_score: s.hygiene_score || s.hygieneScore || 99,
      hygieneScore: s.hygiene_score || s.hygieneScore || 99,
      kyc_verified: true,
      kycDocumentsVerified: true,
      status: s.status || 'active',
      total_bookings: s.total_bookings || 14,
      totalBookings: s.total_bookings || 14,
      revenueIdr: 3500000,
      commission_rate: 12,
      commissionRate: 12,
      created_at: '2026-08-15'
    })));
  }

  if (cleanPath === '/admin/users') {
    return send(200, [
      { id: 'usr-1', db_id: 1, name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin', country: 'Singapore', phone: '+65 8123 9900', totalSpentSgd: 0, status: 'active', lastActive: 'Online now' },
      { id: 'usr-2', db_id: 2, name: 'Ratna Dewi (Merchant)', email: 'partner@heritage-spa.id', role: 'merchant', country: 'Indonesia', phone: '+62 812 7008 8990', totalSpentSgd: 0, status: 'active', lastActive: 'Online now' },
      { id: 'usr-3', db_id: 3, name: 'Alexandre Tan', email: 'traveler@singapore.sg', role: 'tourist', country: 'Singapore', phone: '+65 9123 4567', totalSpentSgd: 16.88, status: 'active', lastActive: 'Online now' }
    ]);
  }

  if (cleanPath === '/admin/payouts/execute-bi-fast') {
    return send(200, {
      success: true,
      payout_ref: `BIF-${Date.now()}`,
      status: 'settled',
      settlement_channel: 'BI-FAST (Bank Indonesia Real-time Rails)',
      timestamp: new Date().toISOString()
    }, 'BI-FAST Payout settled successfully');
  }

  // Fallback default
  return send(200, { ok: true, timestamp: new Date().toISOString() });
}
