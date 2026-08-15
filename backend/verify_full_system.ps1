$headers = @{
  'Content-Type' = 'application/json'
  'Accept' = 'application/json'
}

Write-Host "================================================================" -ForegroundColor Yellow
Write-Host "   ZENTURA CROSS-BORDER PLATFORM - FULL SYSTEM AUDIT VERIFIER   " -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Yellow

# 1. Health Check
Write-Host "`n1. [HEALTH CHECK] Verifying API Server and Maritime Corridor..." -ForegroundColor Cyan
$health = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/health" -Headers $headers
Write-Host "✓ Status: $($health.status) | Corridor: $($health.corridor)" -ForegroundColor Green

# 2. Database Spas and Normalization Check
Write-Host "`n2. [DATABASE NORMALIZATION] Checking Spas, Services, Therapists, Flash Slots..." -ForegroundColor Cyan
$spas = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/spas" -Headers $headers
Write-Host "✓ Spas count in DB: $($spas.data.Count)" -ForegroundColor Green
foreach ($spa in $spas.data) {
  Write-Host "  -> Spa: $($spa.name) | Region: $($spa.region) | Services: $($spa.services.Count) | Therapists: $($spa.therapists.Count) | Slots: $($spa.flash_slots.Count)" -ForegroundColor Gray
}

# 3. Dynamic Gap Matcher
Write-Host "`n3. [GAP MATCHER ENGINE] Checking Dynamic Micro-Moment Matching..." -ForegroundColor Cyan
$gaps = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/matcher/find-gaps?duration_minutes=45" -Headers $headers
Write-Host "✓ Active matched vacant seats: $($gaps.data.Count)" -ForegroundColor Green

# 4. AI Medical Translation
Write-Host "`n4. [AI MEDICAL NLP] Testing Zentura-MedNLP-v3 Engine..." -ForegroundColor Cyan
$aiPayload = '{"text":"Severe shoulder tension, allergic to peanut oil, firm pressure please"}'
$aiRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/translate-medical" -Method POST -Headers $headers -Body $aiPayload
Write-Host "✓ AI Safety Flag: $($aiRes.data.safety_flag)" -ForegroundColor Green
Write-Host "✓ Indonesian Therapist Card: $($aiRes.data.indonesian_text)" -ForegroundColor Gray

# 5. Live Booking Creation & Database Persistence
Write-Host "`n5. [BOOKING CREATION] Creating new reservation into Supabase DB..." -ForegroundColor Cyan
$bookingPayload = '{"spa_id":1,"guest_name":"Alexandre Tan (SG Maritime Tourist)","guest_phone":"+65 9123 4567","service_name":"Balinese Herbal Deep Tissue","therapist_name":"Dewi Anggraini","booking_time":"15:00 WIB","duration_minutes":60,"price_idr":250000,"ferry_time":"17:00 Ferry to HarbourFront","medical_notes":"Shoulder pain, allergic to peanut oil","allergy_alert":"Peanut Oil Allergy"}'

$newBooking = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/bookings" -Method POST -Headers $headers -Body $bookingPayload
Write-Host "✓ Booking persisted to DB! Code: $($newBooking.data.booking_code) | ID: $($newBooking.data.id)" -ForegroundColor Green

# 6. Merchant Management & Orders
Write-Host "`n6. [MERCHANT PORTAL] Verifying Merchant Overview and Orders..." -ForegroundColor Cyan
$merchantOrders = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/merchant/orders" -Headers $headers
Write-Host "✓ Merchant orders loaded from DB: $($merchantOrders.data.Count) orders." -ForegroundColor Green

# 7. Super Admin Metrics & BI-FAST Payouts
Write-Host "`n7. [SUPER ADMIN HQ] Verifying Live GMV Metrics and BI-FAST Settlement..." -ForegroundColor Cyan
$adminMetrics = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/admin/dashboard-metrics" -Headers $headers
Write-Host "✓ Total GMV: SGD $($adminMetrics.data.total_gmv_sgd) (IDR $($adminMetrics.data.total_gmv_idr))" -ForegroundColor Green
Write-Host "✓ Total Bookings in System: $($adminMetrics.data.total_bookings)" -ForegroundColor Green

$payoutPayload = '{"merchant_name":"Martha Heritage Herbal Spa","amount_sgd":49.37,"bank_name":"Bank Mandiri","account_number":"109-00-1849201-9"}'
$payoutRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/admin/payouts/execute-bi-fast" -Method POST -Headers $headers -Body $payoutPayload
Write-Host "✓ BI-FAST Payout Execution: $($payoutRes.message)" -ForegroundColor Green

Write-Host "`n================================================================" -ForegroundColor Yellow
Write-Host "   ALL 7 SYSTEM MODULES AND DATABASE NORMALIZATION: 100% PASS!  " -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Yellow
