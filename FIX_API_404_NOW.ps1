# Fix 404 Error - Hero Section API Not Accessible

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FIXING 404 ERROR" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "The 404 error means Hero Section API endpoint isn't registered." -ForegroundColor Yellow
Write-Host ""
Write-Host "SOLUTION: Restart Strapi to register API routes" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Stop Strapi" -ForegroundColor White
Write-Host "   → Press Ctrl+C in the Strapi terminal" -ForegroundColor Gray
Write-Host ""
Write-Host "STEP 2: Start Strapi again" -ForegroundColor White
Write-Host "   → cd apps\cms" -ForegroundColor Gray
Write-Host "   → npm run develop" -ForegroundColor Gray
Write-Host ""
Write-Host "STEP 3: Wait for bootstrap to complete" -ForegroundColor White
Write-Host "   → Look for: '✅ Enabled find for api::hero-section.hero-section'" -ForegroundColor Gray
Write-Host "   → Look for: '✅ Permissions setup complete!'" -ForegroundColor Gray
Write-Host ""
Write-Host "STEP 4: Test API" -ForegroundColor White
Write-Host "   → Open browser: http://localhost:1337/api/hero-section" -ForegroundColor Gray
Write-Host "   → Should return JSON (not 404)" -ForegroundColor Gray
Write-Host ""
Write-Host "STEP 5: Restart Frontend" -ForegroundColor White
Write-Host "   → cd apps\web" -ForegroundColor Gray
Write-Host "   → Stop (Ctrl+C) and run: npm run dev" -ForegroundColor Gray
Write-Host ""

$response = Read-Host "Have you restarted Strapi? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host ""
    Write-Host "Please restart Strapi first!" -ForegroundColor Red
    Write-Host "The API routes are only registered when Strapi starts." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Testing API access..." -ForegroundColor Cyan
Write-Host ""

# Install axios if needed
Set-Location apps\cms
$axiosCheck = npm list axios 2>&1 | Out-String
if ($axiosCheck -notmatch "axios@") {
    Write-Host "Installing axios..." -ForegroundColor Yellow
    npm install axios --save-dev 2>&1 | Out-Null
}
Set-Location ..\..

# Test API
node apps\cms\scripts\fix-permissions.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If API test passed:" -ForegroundColor White
Write-Host "1. Restart frontend: cd apps\web && npm run dev" -ForegroundColor White
Write-Host "2. Visit http://localhost:3001" -ForegroundColor White
Write-Host "3. Changes from Strapi should appear!" -ForegroundColor White
Write-Host ""
Write-Host "If API test still fails:" -ForegroundColor White
Write-Host "→ Check Strapi logs for errors" -ForegroundColor White
Write-Host "→ Make sure Hero Section is published" -ForegroundColor White
Write-Host "→ Manually set permissions in Strapi admin" -ForegroundColor White
Write-Host ""
















