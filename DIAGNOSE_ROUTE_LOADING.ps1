# Diagnose why routes aren't loading

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIAGNOSING ROUTE LOADING ISSUE" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking route files..." -ForegroundColor Cyan

# Check if route files exist
$routeFiles = @(
    "apps\cms\src\api\hero-section\routes\hero-section.ts",
    "apps\cms\src\api\hero-section\controllers\hero-section.ts",
    "apps\cms\src\api\page-section\routes\page-section.ts",
    "apps\cms\src\api\page-section\controllers\page-section.ts"
)

foreach ($file in $routeFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        Write-Host "  [OK] $file" -ForegroundColor Green
        Write-Host "      Size: $($content.Length) chars" -ForegroundColor Gray
        
        # Check for syntax issues
        if ($content -match "export default") {
            Write-Host "      [OK] Has 'export default'" -ForegroundColor Green
        } else {
            Write-Host "      [WARN] Missing 'export default'" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [ERROR] $file - NOT FOUND" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Checking for compiled .js files..." -ForegroundColor Cyan

$jsFiles = @(
    "apps\cms\src\api\hero-section\routes\hero-section.js",
    "apps\cms\src\api\hero-section\controllers\hero-section.js",
    "apps\cms\src\api\page-section\routes\page-section.js",
    "apps\cms\src\api\page-section\controllers\page-section.js"
)

foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        Write-Host "  [INFO] $file exists (compiled)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Checking Strapi configuration..." -ForegroundColor Cyan

$configFiles = @(
    "apps\cms\config\api.ts",
    "apps\cms\config\plugins.ts",
    "apps\cms\config\middlewares.ts"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file exists" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] $file missing" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start Strapi and watch the logs:" -ForegroundColor White
Write-Host "   cd apps\cms" -ForegroundColor Gray
Write-Host "   npm run develop" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Look for these in the logs:" -ForegroundColor White
Write-Host "   - TypeScript compilation errors" -ForegroundColor Gray
Write-Host "   - Route registration messages" -ForegroundColor Gray
Write-Host "   - Content type loading errors" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Copy the startup logs and share them" -ForegroundColor White
Write-Host ""
















