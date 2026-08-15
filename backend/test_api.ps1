$headers = @{
  'Content-Type' = 'application/json'
  'Accept' = 'application/json'
}

Write-Host "1. Testing Spas API:" -ForegroundColor Cyan
$spas = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/spas" -Headers $headers
Write-Host "Success! Found $($spas.data.Count) spas." -ForegroundColor Green

Write-Host "2. Testing Bookings API:" -ForegroundColor Cyan
$bookings = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/bookings" -Headers $headers
Write-Host "Success! Found $($bookings.data.Count) bookings." -ForegroundColor Green

Write-Host "3. Testing AI Medical Translation:" -ForegroundColor Cyan
$aiBody = '{"text":"Severe shoulder knot tension, allergic to peanut oil, firm pressure please"}'
$aiRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/translate-medical" -Method POST -Headers $headers -Body $aiBody
Write-Host "Success! Indonesian output: $($aiRes.data.indonesian_text)" -ForegroundColor Green

Write-Host "4. Testing Admin Dashboard Metrics:" -ForegroundColor Cyan
$admin = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/admin/dashboard-metrics" -Headers $headers
Write-Host "Success! GMV: SGD $($admin.data.total_gmv_sgd)" -ForegroundColor Green

Write-Host "5. Testing Auth Quick-Login:" -ForegroundColor Cyan
$loginBody = '{"role":"tourist"}'
$authRes = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/quick-login" -Method POST -Headers $headers -Body $loginBody
Write-Host "Success! Logged in as: $($authRes.data.user.name)" -ForegroundColor Green
