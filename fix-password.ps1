# Quick script to update database password in .env

Write-Host "Update Database Password" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""

$envFile = "apps\cms\.env"

if (-not (Test-Path $envFile)) {
    Write-Host "Error: .env file not found at $envFile" -ForegroundColor Red
    exit 1
}

Write-Host "Enter the PostgreSQL password you set during installation:" -ForegroundColor Yellow
$password = Read-Host "Password"

if (-not $password) {
    Write-Host "No password entered. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Updating .env file..." -ForegroundColor Cyan

$content = Get-Content $envFile -Raw
$content = $content -replace "DATABASE_PASSWORD=.*", "DATABASE_PASSWORD=$password"
Set-Content -Path $envFile -Value $content -NoNewline

Write-Host "Password updated in .env file!" -ForegroundColor Green
Write-Host ""
Write-Host "Now you can start Strapi:" -ForegroundColor Cyan
Write-Host "  cd apps\cms" -ForegroundColor White
Write-Host "  npm run develop" -ForegroundColor White
Write-Host ""
















