# Quick script to verify Hero Section was created and restart Strapi

Write-Host "Verifying Hero Section content type..." -ForegroundColor Green
Write-Host ""

$schemaPath = "apps\cms\src\api\hero-section\content-types\hero-section\schema.json"

if (Test-Path $schemaPath) {
    Write-Host "[OK] Hero Section schema file exists!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Restart Strapi (if it's running, press Ctrl+C)" -ForegroundColor Cyan
    Write-Host "   2. Run: cd apps\cms && npm run develop" -ForegroundColor Cyan
    Write-Host "   3. Go to http://localhost:1337/admin" -ForegroundColor Cyan
    Write-Host "   4. You should see 'Hero Section' under Single Types!" -ForegroundColor Cyan
    Write-Host "   5. Go to Content Manager → Hero Section to add content" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or run the fix script which will restart Strapi:" -ForegroundColor Yellow
    Write-Host "   .\fix-strapi-admin.ps1" -ForegroundColor Cyan
} else {
    Write-Host "[ERROR] Hero Section schema file not found!" -ForegroundColor Red
    Write-Host "Path: $schemaPath" -ForegroundColor Red
}
















