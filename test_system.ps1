Write-Host "=== 1. TESTING USER REGISTRATION & DATABASE PERSISTENCE ==="
$rand = Get-Random -Minimum 1000 -Maximum 9999
$regBody = @{
    name = "Dr. Rachel Green $rand"
    email = "rachel$rand@singapore.sg"
    password = "password123"
    role = "tourist"
    country = "Singapore"
    phone = "+65 9876 $rand"
} | ConvertTo-Json

$regRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/register" -Method Post -Body $regBody -ContentType "application/json"
Write-Host "Registration Status: $($regRes.success) | User ID: $($regRes.data.user.id) | Email: $($regRes.data.user.email)"

Write-Host "`n=== 2. TESTING AUTH LOGIN ==="
$loginBody = @{
    email = "rachel$rand@singapore.sg"
    password = "password123"
} | ConvertTo-Json

$loginRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
Write-Host "Login Status: $($loginRes.success) | User: $($loginRes.data.user.name)"

Write-Host "`n=== 3. TESTING AI ITINERARY GENERATOR ==="
$itinBody = @{
    duration = "2"
    interest = "medical"
    budget = "standard"
} | ConvertTo-Json
$itinRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/generate-itinerary" -Method Post -Body $itinBody -ContentType "application/json"
Write-Host "AI Itinerary Status: $($itinRes.success) | Title: $($itinRes.data.title) | Est Savings: $($itinRes.data.savings_percentage)%"

Write-Host "`n=== 4. TESTING AI TOURIST CHAT ADVISOR ==="
$chatBody = @{
    message = "How do I take the ferry from HarbourFront SG to RS Awal Bros Batam for an MRI scan?"
} | ConvertTo-Json
$chatRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/tourist-chat" -Method Post -Body $chatBody -ContentType "application/json"
Write-Host "AI Advisor Status: $($chatRes.success) | Response: $($chatRes.data.reply.Substring(0,80))..."

Write-Host "`n=== 5. TESTING AI MEDICAL CONSULTATION TRANSLATOR ==="
$medBody = @{
    text = "Experiencing chest tightness and palpitations, allergic to penicillin, need consultation with Dr Bambang"
} | ConvertTo-Json
$medRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/translate-medical" -Method Post -Body $medBody -ContentType "application/json"
Write-Host "AI Med Translator Status: $($medRes.success) | Allergy: $($medRes.data.allergy) | Specialist: $($medRes.data.specialist_recommended)"

Write-Host "`n=== 6. TESTING APPOINTMENT BOOKING & DATABASE PERSISTENCE ==="
$bookBody = @{
    place_id = 1
    place_name = "RS Awal Bros Batam"
    guest_name = "Dr. Rachel Green $rand"
    guest_email = "rachel$rand@singapore.sg"
    guest_phone = "+65 9876 $rand"
    service_name = "Executive Medical Screening + 1.5T MRI"
    booking_date = "2026-08-25"
    booking_time = "09:30"
    pax = 1
    price_sgd = 280
    price_idr = 3890000
    notes = "Allergic to penicillin. Request English speaking doctor."
} | ConvertTo-Json
$bookRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/bookings" -Method Post -Body $bookBody -ContentType "application/json"
Write-Host "Booking Status: $($bookRes.success) | Code: $($bookRes.data.booking_code) | Service: $($bookRes.data.service_name)"
