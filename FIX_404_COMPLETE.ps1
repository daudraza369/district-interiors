# Complete Fix for 404 API Routes

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COMPLETE FIX FOR 404 API ROUTES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will:" -ForegroundColor Yellow
Write-Host "  1. Stop Strapi (if running)" -ForegroundColor White
Write-Host "  2. Clear all caches" -ForegroundColor White
Write-Host "  3. Verify route files exist" -ForegroundColor White
Write-Host "  4. Start Strapi" -ForegroundColor White
Write-Host "  5. Test API endpoints" -ForegroundColor White
Write-Host ""

Write-Host "STEP 1: Stopping Strapi..." -ForegroundColor Cyan
Write-Host "   → Press Ctrl+C in the Strapi terminal if it's running" -ForegroundColor Gray
Write-Host ""

$response = Read-Host "Have you stopped Strapi? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host ""
    Write-Host "Please stop Strapi first!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "STEP 2: Verifying route files..." -ForegroundColor Cyan

$routeFiles = @(
    "apps\cms\src\api\hero-section\routes\hero-section.ts",
    "apps\cms\src\api\hero-section\controllers\hero-section.ts",
    "apps\cms\src\api\page-section\routes\page-section.ts",
    "apps\cms\src\api\page-section\controllers\page-section.ts"
)

$allExist = $true
foreach ($file in $routeFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allExist = $false
    }
}

if (-not $allExist) {
    Write-Host ""
    Write-Host "Some route files are missing! Cannot continue." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "STEP 3: Clearing Strapi cache..." -ForegroundColor Cyan
Write-Host ""

Set-Location apps\cms

# Clear all caches
$cacheDirs = @(".cache", "dist", "build")
foreach ($dir in $cacheDirs) {
    if (Test-Path $dir) {
        Remove-Item -Recurse -Force $dir
        Write-Host "  [OK] Cleared $dir" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] No $dir folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "[OK] Cache cleared!" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 4: Starting Strapi..." -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Watch the logs for:" -ForegroundColor Yellow
Write-Host "  → TypeScript compilation (should succeed)" -ForegroundColor Gray
Write-Host "  → Routes being registered" -ForegroundColor Gray
Write-Host "  → Any errors (especially route-related)" -ForegroundColor Gray
Write-Host ""
Write-Host "If you see errors, note them down!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Starting Strapi now..." -ForegroundColor Cyan
Write-Host ""

# Start Strapi
npm run develop

Set-Location ..\..
















