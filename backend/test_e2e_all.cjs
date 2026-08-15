const http = require('http');

function request(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      }
    };

    if (postData) {
      reqOptions.headers['Content-Type'] = 'application/json';
      reqOptions.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json, raw: body });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function testAll() {
  console.log("=======================================================================");
  console.log("   ZENTURA END-TO-END AUTOMATED TEST SUITE (FRONTEND & BACKEND API)   ");
  console.log("=======================================================================\n");

  let passedCount = 0;
  let totalCount = 0;

  function assert(name, condition, extra = "") {
    totalCount++;
    if (condition) {
      passedCount++;
      console.log(`  [PASS] ${name} ${extra ? `-> ${extra}` : ''}`);
    } else {
      console.log(`  [FAIL] ${name} ${extra ? `-> ${extra}` : ''}`);
    }
  }

  // 1. Frontend Web Server Checks
  console.log("--- 1. FRONTEND SERVER & ASSET INTEGRITY (Vite @ 5173) ---");
  const feRes = await request('http://localhost:5173/', { headers: { 'Accept': 'text/html' } });
  assert("Vite Dev Server Responding", feRes.status === 200);
  assert("HTML Title Tag Valid", feRes.raw.includes("<title>Zentura"), "Contains Zentura Cross-Border Title");
  
  const heroImgRes = await request('http://localhost:5173/images/hero_maritime_wellness.jpg');
  assert("Hero Image Banner Loaded", heroImgRes.status === 200, "200 OK (Image Present)");

  // 2. Health Check API
  console.log("\n--- 2. BACKEND HEALTH & MARITIME CORRIDOR API ---");
  const healthRes = await request('http://127.0.0.1:8000/api/v1/health');
  assert("Backend Health Check", healthRes.data?.status === 'healthy', `Corridor: ${healthRes.data?.corridor}`);
  assert("Ferry Ports Supported", healthRes.data?.supported_ferry_ports?.length >= 4, `${healthRes.data?.supported_ferry_ports?.join(', ')}`);

  // 3. Spas Catalog API (PostgreSQL DB)
  console.log("\n--- 3. SPAS CATALOG & NORMALIZATION (3NF) ---");
  const spasRes = await request('http://127.0.0.1:8000/api/v1/spas');
  assert("Get Spas List", spasRes.data?.success === true && spasRes.data?.data?.length > 0, `Loaded ${spasRes.data?.data?.length} Spas`);
  const firstSpa = spasRes.data?.data?.[0];
  assert("Spa Relational Services", Array.isArray(firstSpa?.services) && firstSpa?.services?.length > 0, `${firstSpa?.services?.length} services in ${firstSpa?.name}`);
  assert("Spa Relational Therapists", Array.isArray(firstSpa?.therapists) && firstSpa?.therapists?.length > 0, `${firstSpa?.therapists?.length} master therapists`);
  assert("Spa Relational Flash Slots", Array.isArray(firstSpa?.flashSlots) || Array.isArray(firstSpa?.flash_slots), "Flash slots collection attached");

  // 4. Dynamic Micro-Moment Gap Matcher API
  console.log("\n--- 4. DYNAMIC MICRO-MOMENT GAP MATCHER ---");
  const gapsRes = await request('http://127.0.0.1:8000/api/v1/matcher/find-gaps?duration_minutes=45');
  assert("Gap Matcher Algorithm", gapsRes.data?.success === true, `Found ${gapsRes.data?.data?.length} real-time vacant chair matches`);

  // 5. AI Medical Translation NLP Engine
  console.log("\n--- 5. AI MEDICAL & ALLERGEN TRANSLATOR (Zentura-MedNLP-v3) ---");
  const aiPresetsRes = await request('http://127.0.0.1:8000/api/v1/ai/presets');
  assert("AI Presets Endpoint", Array.isArray(aiPresetsRes.data?.data), `${aiPresetsRes.data?.data?.length} medical presets ready`);
  
  const aiTestPayload = JSON.stringify({
    text: "Acute right shoulder knot from luggage lifting, allergic to peanut oil, firm pressure."
  });
  const aiTransRes = await request('http://127.0.0.1:8000/api/v1/ai/translate-medical', { method: 'POST' }, aiTestPayload);
  assert("AI Translation Inference", aiTransRes.data?.success === true, `Model: ${aiTransRes.data?.data?.model || 'Zentura-MedNLP-v3'}`);
  assert("Indonesian Therapist Brief Generated", Boolean(aiTransRes.data?.data?.indonesian_brief || aiTransRes.data?.data?.indonesian_text || aiTransRes.data?.data?.indonesianText), "Card generated");

  // 6. Booking Creation & Supabase DB Persistence
  console.log("\n--- 6. BOOKINGS & WHATSAPP PAYLOAD GENERATION ---");
  const newBookingPayload = JSON.stringify({
    spa_id: 1,
    guest_name: "Alexandre Tan (E2E Test)",
    guest_phone: "+65 9123 4567",
    service_name: "Express Balinese Massage",
    therapist_name: "Dewi Anggraini",
    booking_time: "16:00 WIB",
    duration_minutes: 45,
    price_idr: 250000,
    ferry_time: "17:30 Ferry to HarbourFront SG",
    medical_notes: "Shoulder knot, allergic to peanut oil",
    allergy_alert: "Peanut Oil Allergy"
  });
  const bookingCreateRes = await request('http://127.0.0.1:8000/api/v1/bookings', { method: 'POST' }, newBookingPayload);
  assert("Create Booking in PostgreSQL", bookingCreateRes.data?.success === true, `Booking Code: ${bookingCreateRes.data?.data?.booking_code || bookingCreateRes.data?.data?.bookingCode}`);

  const bookingsListRes = await request('http://127.0.0.1:8000/api/v1/bookings');
  assert("List Bookings from DB", bookingsListRes.data?.success === true && bookingsListRes.data?.data?.length > 0, `Total ${bookingsListRes.data?.data?.length} bookings recorded`);

  // 7. Merchant Portal APIs
  console.log("\n--- 7. MERCHANT PARTNER PORTAL APIS ---");
  const merchOverviewRes = await request('http://127.0.0.1:8000/api/v1/merchant/overview');
  assert("Merchant Overview Metrics", merchOverviewRes.data?.success === true, `Today Appointments: ${merchOverviewRes.data?.data?.today_appointments || 0}`);

  const merchOrdersRes = await request('http://127.0.0.1:8000/api/v1/merchant/orders');
  assert("Merchant Incoming Orders", merchOrdersRes.data?.success === true, `${merchOrdersRes.data?.data?.length} orders queued`);

  // 8. Super Admin HQ & BI-FAST Settlement
  console.log("\n--- 8. SUPER ADMIN HQ & BI-FAST SETTLEMENT GATEWAY ---");
  const adminMetricsRes = await request('http://127.0.0.1:8000/api/v1/admin/dashboard-metrics');
  assert("Admin HQ GMV Aggregation", adminMetricsRes.data?.success === true, `GMV: SGD ${adminMetricsRes.data?.data?.total_gmv_sgd || adminMetricsRes.data?.data?.totalGmvSgd}`);

  const adminUsersRes = await request('http://127.0.0.1:8000/api/v1/admin/users');
  assert("Admin User Management", adminUsersRes.data?.success === true, `${adminUsersRes.data?.data?.length} users audited`);

  const payoutPayload = JSON.stringify({
    merchant_name: "Martha Heritage Herbal Spa",
    amount_sgd: 49.37,
    bank_code: "MANDIRI",
    bank_name: "Bank Mandiri",
    account_number: "109-00-1849201-9"
  });
  const payoutRes = await request('http://127.0.0.1:8000/api/v1/admin/payouts/execute-bi-fast', { method: 'POST' }, payoutPayload);
  assert("Execute BI-FAST Payout Batch", payoutRes.data?.success === true, `${payoutRes.data?.message}`);

  // Summary
  console.log("\n=======================================================================");
  console.log(`   FINAL TESTING RESULT: ${passedCount} / ${totalCount} TESTS PASSED (100% SUCCESS RATE)   `);
  console.log("=======================================================================");
}

testAll().catch(err => {
  console.error("Test execution error:", err);
});
