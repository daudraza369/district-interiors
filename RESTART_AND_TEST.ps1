# Restart Strapi and test API routes

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESTARTING STRAPI WITH MANUAL ROUTES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "I've created manual routes and controllers for:" -ForegroundColor Yellow
Write-Host "  → Hero Section (single type)" -ForegroundColor White
Write-Host "  → Page Section (collection type)" -ForegroundColor White
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
Write-Host "STEP 2: Starting Strapi..." -ForegroundColor Cyan
Write-Host ""
Write-Host "The manual routes will be registered on startup." -ForegroundColor Yellow
Write-Host "Watch for any errors in the logs." -ForegroundColor Yellow
Write-Host ""

Set-Location apps\cms
npm run develop

Set-Location ..\..
















