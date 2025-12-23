# Fix All API Routes - Complete Reset

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIXING ALL API ROUTES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "DIAGNOSIS: All API endpoints return 404" -ForegroundColor Yellow
Write-Host "This means REST API routes aren't registered." -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 1: Stop Strapi" -ForegroundColor Cyan
Write-Host "   → Press Ctrl+C in the Strapi terminal" -ForegroundColor Gray
Write-Host ""

$response = Read-Host "Have you stopped Strapi? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host ""
    Write-Host "Please stop Strapi first!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "STEP 2: Clearing Strapi cache..." -ForegroundColor Cyan
Write-Host ""

Set-Location apps\cms

# Clear all caches
if (Test-Path .cache) {
    Remove-Item -Recurse -Force .cache
    Write-Host "[OK] Cleared .cache" -ForegroundColor Green
} else {
    Write-Host "[INFO] No .cache folder" -ForegroundColor Gray
}

if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
    Write-Host "[OK] Cleared dist" -ForegroundColor Green
} else {
    Write-Host "[INFO] No dist folder" -ForegroundColor Gray
}

if (Test-Path build) {
    Remove-Item -Recurse -Force build
    Write-Host "[OK] Cleared build" -ForegroundColor Green
} else {
    Write-Host "[INFO] No build folder" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[OK] Cache cleared!" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 3: Starting Strapi..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Watch for these in the logs:" -ForegroundColor Yellow
Write-Host "   → Content types being loaded" -ForegroundColor Gray
Write-Host "   → Routes being registered" -ForegroundColor Gray
Write-Host "   → '✅ Enabled find for api::hero-section.hero-section'" -ForegroundColor Gray
Write-Host "   → '✅ Permissions setup complete!'" -ForegroundColor Gray
Write-Host ""
Write-Host "Starting Strapi now..." -ForegroundColor Cyan
Write-Host ""

# Start Strapi
npm run develop

Set-Location ..\..
















