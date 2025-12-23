# Quick script to upload all media to Strapi
# This runs the Node.js script which handles uploads better

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  UPLOADING ALL MEDIA TO STRAPI" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js script exists
$scriptPath = "apps\cms\scripts\upload-media-to-strapi.js"

if (-not (Test-Path $scriptPath)) {
    Write-Host "[ERROR] Upload script not found: $scriptPath" -ForegroundColor Red
    exit 1
}

# Check if Strapi is running
Write-Host "Checking if Strapi is running..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:1337/admin" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
    Write-Host "[OK] Strapi is running" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Strapi might not be running on http://localhost:1337" -ForegroundColor Yellow
    Write-Host "   Make sure Strapi is started before uploading media" -ForegroundColor Yellow
    Write-Host ""
}

# Check and install dependencies
Write-Host "Checking dependencies..." -ForegroundColor Cyan
Set-Location apps\cms

$formDataCheck = npm list form-data 2>&1 | Out-String
if ($formDataCheck -match "form-data@") {
    Write-Host "[OK] form-data is installed" -ForegroundColor Green
} else {
    Write-Host "Installing form-data and axios..." -ForegroundColor Yellow
    npm install form-data axios --save-dev
}

$axiosCheck = npm list axios 2>&1 | Out-String
if ($axiosCheck -match "axios@") {
    Write-Host "[OK] axios is installed" -ForegroundColor Green
} else {
    Write-Host "Installing axios..." -ForegroundColor Yellow
    npm install axios --save-dev
}

Set-Location ..\..

Write-Host ""
Write-Host "Running upload script..." -ForegroundColor Cyan
Write-Host ""

# Run the Node.js script
node $scriptPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Upload complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to http://localhost:1337/admin" -ForegroundColor White
    Write-Host "2. Click 'Media Library' to see all uploaded images" -ForegroundColor White
    Write-Host "3. Link images to content types (Hero Section, Products, etc.)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Upload failed. Check errors above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "- Make sure Strapi is running" -ForegroundColor White
    Write-Host "- Check API token is correct" -ForegroundColor White
    Write-Host "- Try uploading manually via Strapi admin UI" -ForegroundColor White
    Write-Host ""
}
















