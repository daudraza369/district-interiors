# Test API endpoints after Strapi restart

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTING API ENDPOINTS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Make sure Strapi is running!" -ForegroundColor Yellow
Write-Host ""

# Test endpoints
$endpoints = @(
    "http://localhost:1337/api",
    "http://localhost:1337/api/hero-section",
    "http://localhost:1337/api/page-sections"
)

foreach ($endpoint in $endpoints) {
    Write-Host "Testing: $endpoint" -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri $endpoint -Method GET -ErrorAction Stop
        Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Green
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  [SUCCESS] Endpoint is working!" -ForegroundColor Green
        } elseif ($response.StatusCode -eq 403) {
            Write-Host "  [INFO] Endpoint exists but needs permissions" -ForegroundColor Yellow
            Write-Host "  → Go to Strapi admin → Settings → Roles → Public" -ForegroundColor Gray
            Write-Host "  → Enable find/findOne for Hero Section and Page Section" -ForegroundColor Gray
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "  [ERROR] 404 - Endpoint not found" -ForegroundColor Red
            Write-Host "  → Routes might not be registered" -ForegroundColor Gray
            Write-Host "  → Check Strapi logs for errors" -ForegroundColor Gray
        } else {
            Write-Host "  [ERROR] $statusCode - $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
















