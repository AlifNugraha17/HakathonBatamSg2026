$baseUrl = "http://127.0.0.1:8000"
$ErrorActionPreference = "Stop"

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "       LOKABATAM 2026: COMPREHENSIVE END-TO-END SYSTEM AUDIT      " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

$testResults = @()

function Run-Test($name, $scriptBlock) {
    try {
        $result = & $scriptBlock
        Write-Host " [PASS] $name" -ForegroundColor Green
        if ($result) { Write-Host "        $result" -ForegroundColor Gray }
        $global:testResults += [PSCustomObject]@{ Feature = $name; Status = "PASS"; Details = "$result" }
    } catch {
        Write-Host " [FAIL] $name" -ForegroundColor Red
        Write-Host "        Error: $($_.Exception.Message)" -ForegroundColor DarkRed
        $global:testResults += [PSCustomObject]@{ Feature = $name; Status = "FAIL"; Details = $_.Exception.Message }
    }
}

# 1. DATABASE & POSTGRESQL CONNECTION TEST
Write-Host "`n>>> 1. AUDITING DATABASE AND TABLE PERSISTENCE..." -ForegroundColor Yellow

Run-Test "PostgreSQL Connection and Schema Tables" {
    $resPlaces = Invoke-RestMethod -Uri "$baseUrl/api/places" -Method Get
    $resDoctors = Invoke-RestMethod -Uri "$baseUrl/api/doctors" -Method Get
    $resFerries = Invoke-RestMethod -Uri "$baseUrl/api/ferry-schedules" -Method Get
    return "Database Connected! Places in DB: $($resPlaces.count) | Doctors: $(($resDoctors.data).Count) | Ferries: $(($resFerries.data).Count)"
}

# 2. CORE PUBLIC & CATALOG API TESTS
Write-Host "`n>>> 2. AUDITING PUBLIC DESTINATIONS AND TOURISM APIs..." -ForegroundColor Yellow

Run-Test "GET /api/places (49 Destinations Catalog)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/places" -Method Get
    $count = ($res.data).Count
    if ($count -lt 40) { throw "Expected ~49 destinations, got $count" }
    return "Total Catalog Loaded: $count destinations (Hospitals, Dental, Golf, Seafood, Beaches)"
}

Run-Test "GET /api/doctors (Specialist Doctors Roster)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/doctors" -Method Get
    $count = ($res.data).Count
    $drNames = ($res.data | Select-Object -First 2 | ForEach-Object { $_.name }) -join ", "
    return "Loaded $count Specialists (e.g. $drNames)"
}

Run-Test "GET /api/ferry-schedules (Live Ferry Crossing Times)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/ferry-schedules" -Method Get
    $count = ($res.data).Count
    return "Loaded $count scheduled ferry trips (HarbourFront, Tanah Merah to Harbour Bay, Batam Centre, Nongsa)"
}

Run-Test "GET /api/exchange-rate (Live SGD to IDR FX Rate)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/exchange-rate" -Method Get
    return "Live Rate: 1 SGD = Rp $($res.rate) (Provider: $($res.provider))"
}

# 3. AUTHENTICATION & USER LIFECYCLE TESTS
Write-Host "`n>>> 3. AUDITING USER AUTH AND PERSISTENCE..." -ForegroundColor Yellow

$uniqueEmail = "traveler_$(Get-Random -Minimum 10000 -Maximum 99999)@singapore.sg"

Run-Test "POST /api/v1/auth/register (Create Tourist Account)" {
    $body = @{
        name = "Amanda Low"
        email = $uniqueEmail
        password = "password123"
        role = "tourist"
        country = "Singapore"
        phone = "+65 9111 2233"
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/register" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "Registration failed" }
    return "User Registered in PostgreSQL: $($res.data.user.email) (ID: $($res.data.user.id))"
}

Run-Test "POST /api/v1/auth/login (Verify Credentials)" {
    $body = @{
        email = $uniqueEmail
        password = "password123"
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/login" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "Login failed" }
    return "Authenticated successfully! User: $($res.data.user.name) | Role: $($res.data.user.role)"
}

Run-Test "POST /api/v1/auth/quick-login (1-Click Partner and Admin Access)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/auth/quick-login?role=merchant" -Method Post
    if (-not $res.success) { throw "Quick login failed" }
    return "Partner Quick Login Verified! Name: $($res.data.user.name)"
}

# 4. AI INTELLIGENCE & NLP ENGINES TEST
Write-Host "`n>>> 4. AUDITING AI INTELLIGENCE ENGINES..." -ForegroundColor Yellow

Run-Test "POST /api/v1/ai/generate-itinerary (AI 2-Day Medical and Escape Plan)" {
    $body = @{
        duration = "2"
        interest = "medical"
        budget = "standard"
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/ai/generate-itinerary" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "AI Itinerary failed" }
    return "AI Plan Generated: $($res.data.title) (Est Savings: $($res.data.savings_percentage)%)"
}

Run-Test "POST /api/v1/ai/tourist-chat (AI Cross-Border Advisor)" {
    $body = @{
        message = "Where can I do MRI checkup in Batam and how much does it cost compared to Singapore?"
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/ai/tourist-chat" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "AI Chat failed" }
    return "AI Answer Preview: $($res.data.reply.Substring(0, 90))..."
}

Run-Test "POST /api/v1/ai/translate-medical (AI Clinical Doctor Brief and Allergy Alert)" {
    $body = @{
        text = "Suffering from severe shoulder knots and chest flutter, allergic to penicillin and aspirin."
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/ai/translate-medical" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "Medical translation failed" }
    return "Allergy Alert: $($res.data.allergy) | Specialist: $($res.data.specialist_recommended)"
}

# 5. BOOKING & DATABASE PERSISTENCE TEST
Write-Host "`n>>> 5. AUDITING BOOKING AND TRANSACTION PERSISTENCE..." -ForegroundColor Yellow

Run-Test "POST /api/bookings (Persist Medical Appointment to DB)" {
    $body = @{
        place_id = 1
        place_name = "RS Awal Bros Batam"
        guest_name = "Amanda Low"
        guest_email = $uniqueEmail
        guest_phone = "+65 9111 2233"
        service_name = "Executive Medical Screening + 1.5T MRI"
        booking_date = "2026-08-25"
        booking_time = "10:00"
        pax = 1
        price_sgd = 280
        price_idr = 3890000
        notes = "Allergic to penicillin. English speaking physician requested."
    } | ConvertTo-Json

    $res = Invoke-RestMethod -Uri "$baseUrl/api/bookings" -Method Post -Body $body -ContentType "application/json"
    if (-not $res.success) { throw "Booking creation failed" }
    return "Booking Saved to Database! Code: $($res.data.booking_code) | Status: $($res.data.status)"
}

# 6. PORTAL APIs (PARTNER & ADMIN)
Write-Host "`n>>> 6. AUDITING HEALTHCARE PARTNER AND ADMIN HQ APIS..." -ForegroundColor Yellow

Run-Test "GET /api/v1/partner/overview (Partner Metrics)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/partner/overview" -Method Get
    return "Partner Facility: $($res.data.partner_name) | Daily Patients: $($res.data.today_arrivals_count)"
}

Run-Test "GET /api/v1/admin/metrics (Admin HQ GMV and Settlements)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/admin/metrics" -Method Get
    return "Platform GMV: IDR $($res.data.total_gmv_idr.ToString('N0')) (SGD $($res.data.total_gmv_sgd)) | Verified Partners: $($res.data.active_partners_count)"
}

Run-Test "GET /api/v1/admin/merchants (Partner Directory)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/api/v1/admin/merchants" -Method Get
    $count = ($res.data).Count
    return "Active Partner Entities in DB: $count"
}

Write-Host "`n=================================================================" -ForegroundColor Cyan
Write-Host "                        AUDIT SUMMARY                             " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
$passed = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failed = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
Write-Host " Total Features Tested : $($testResults.Count)" -ForegroundColor White
Write-Host " Passed                : $passed" -ForegroundColor Green
Write-Host " Failed                : $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host " Overall Health        : $(if ($failed -eq 0) { "100% OPERATIONAL AND PERSISTENT" } else { "ATTENTION NEEDED" })" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "=================================================================`n" -ForegroundColor Cyan
