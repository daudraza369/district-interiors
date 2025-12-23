# Quick fix script - populates content correctly

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QUICK FIX - Populating Content" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: Make sure Strapi is running!" -ForegroundColor Yellow
Write-Host "If you just created Hero Section, RESTART Strapi first!" -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Is Strapi running? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host "Please start Strapi first: cd apps\cms && npm run develop" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Populating Hero Section..." -ForegroundColor Cyan

# Install dependencies if needed
Set-Location apps\cms
$axiosCheck = npm list axios 2>&1 | Out-String
if ($axiosCheck -notmatch "axios@") {
    Write-Host "Installing axios..." -ForegroundColor Yellow
    npm install axios --save-dev 2>&1 | Out-Null
}
Set-Location ..\..

# Run the simple populate script
node apps\cms\scripts\populate-content-simple.js

Write-Host ""
Write-Host "Check Strapi admin: http://localhost:1337/admin" -ForegroundColor Green
Write-Host "Content Manager → Hero Section" -ForegroundColor Green
Write-Host ""
















