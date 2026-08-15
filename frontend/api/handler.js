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

let SPAS = [];
let liveBookings = [];

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
    const newUser = {
      id: Date.now(),
      name: b.name || 'User',
      email: b.email,
      role: b.role || 'tourist',
      country: b.country || 'Singapore'
    };

    // Save to Supabase if available
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
    return send(200, { user: { id: 1, name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin' } });
  }

  // 2. SPAS & CATALOG
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
    if (fromDb && Array.isArray(fromDb)) {
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
    const spa = SPAS.find(s => s.id === id || String(s.id) === String(id)) || null;
    return send(200, spa);
  }

  // 3. FLASH MATCHER
  if (cleanPath === '/matcher/find-gaps') {
    const fromDb = await supabaseFetch('spas?select=*');
    const sourceSpas = (fromDb && Array.isArray(fromDb)) ? fromDb : SPAS;
    const gaps = [];
    sourceSpas.forEach(s => {
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
        salonName: b.salonName || b.salon_name || 'Spa Partner Facility',
        service_name: b.service_name || b.serviceName || 'Wellness Treatment',
        serviceName: b.service_name || b.serviceName || 'Wellness Treatment',
        guest_name: b.guest_name || b.guestName || 'Guest User',
        guestName: b.guest_name || b.guestName || 'Guest User',
        guest_phone: b.guest_phone || b.guestPhone || '+65 9123 4567',
        therapist_name: b.therapist_name || b.therapistName || 'Assigned Therapist',
        booking_time: b.booking_time || b.time || '14:30 WIB',
        price_idr: Number(b.price_idr || b.priceIdr || 200000),
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
    if (fromDb && Array.isArray(fromDb)) {
      return send(200, fromDb);
    }
    return send(200, liveBookings);
  }

  // 6. ADMIN
  if (cleanPath === '/admin/dashboard-metrics') {
    const fromSpas = await supabaseFetch('spas?select=*');
    const fromBookings = await supabaseFetch('bookings?select=*');
    const sourceSpas = (fromSpas && Array.isArray(fromSpas)) ? fromSpas : SPAS;
    const sourceBookings = (fromBookings && Array.isArray(fromBookings)) ? fromBookings : liveBookings;

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
      totalUsers: 3,
      total_users: 3,
      totalAiTranslationsMonth: 0,
      total_ai_queries: 0,
      aiSafetyFilterTriggers: 0,
      avgTranslationLatencyMs: 165,
      avg_edge_latency_ms: 165,
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
    const sourceSpas = (fromSpas && Array.isArray(fromSpas)) ? fromSpas : SPAS;
    return send(200, sourceSpas.map(s => ({
      id: 'merch-' + s.id,
      db_id: s.id,
      name: s.name,
      owner_name: s.owner_name || s.ownerName || 'Spa Partner Director',
      ownerName: s.owner_name || s.ownerName || 'Spa Partner Director',
      region: s.region || 'batam',
      city: s.landmark || s.city || 'Batam Ferry Zone',
      rating: s.rating || 5.0,
      hygiene_score: s.hygiene_score || s.hygieneScore || 99,
      hygieneScore: s.hygiene_score || s.hygieneScore || 99,
      kyc_verified: true,
      kycDocumentsVerified: true,
      status: s.status || 'active',
      total_bookings: s.total_bookings || 0,
      totalBookings: s.total_bookings || 0,
      revenueIdr: s.revenueIdr || 0,
      commission_rate: 12,
      commissionRate: 12,
      created_at: s.created_at || '2026-08-15'
    })));
  }

  if (cleanPath === '/admin/users') {
    const fromUsers = await supabaseFetch('users?select=*');
    if (fromUsers && Array.isArray(fromUsers) && fromUsers.length > 0) {
      return send(200, fromUsers);
    }
    return send(200, [
      { id: 'usr-1', db_id: 1, name: 'Super Admin HQ', email: 'admin@zentura.com', role: 'admin', country: 'Singapore', phone: '+65 8123 9900', totalSpentSgd: 0, status: 'active', lastActive: 'Online now' },
      { id: 'usr-2', db_id: 2, name: 'Ratna Dewi (Merchant)', email: 'partner@heritage-spa.id', role: 'merchant', country: 'Indonesia', phone: '+62 812 7008 8990', totalSpentSgd: 0, status: 'active', lastActive: 'Online now' },
      { id: 'usr-3', db_id: 3, name: 'Alexandre Tan', email: 'traveler@singapore.sg', role: 'tourist', country: 'Singapore', phone: '+65 9123 4567', totalSpentSgd: 0, status: 'active', lastActive: 'Online now' }
    ]);
  }

  if (cleanPath === '/admin/ai-logs') {
    return send(200, []);
  }

  if (cleanPath === '/admin/treasury-summary') {
    return send(200, {
      total_vault_idr: 0,
      sgd_pool: 0,
      fx_rate: 11850,
      recent_payouts: []
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
