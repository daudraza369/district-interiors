# Install PostgreSQL to D Drive

Write-Host "Installing PostgreSQL to D Drive" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Create directory on D drive
$installPath = "D:\PostgreSQL\15"
Write-Host "Creating directory: $installPath" -ForegroundColor Cyan
New-Item -ItemType Directory -Path $installPath -Force | Out-Null

Write-Host ""
Write-Host "Installing PostgreSQL..." -ForegroundColor Yellow
Write-Host ""

# Try to install with custom location
try {
    winget install PostgreSQL.PostgreSQL.15 --location $installPath
    Write-Host ""
    Write-Host "Installation command sent!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: During installation:" -ForegroundColor Yellow
    Write-Host "1. If asked for installation path, set it to: $installPath" -ForegroundColor White
    Write-Host "2. When asked for password, set it to: postgres" -ForegroundColor White
    Write-Host ""
    Write-Host "Wait for installation to complete..." -ForegroundColor Cyan
} catch {
    Write-Host "Winget installation failed. Please install manually:" -ForegroundColor Red
    Write-Host ""
    Write-Host "1. Download from: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads" -ForegroundColor White
    Write-Host "2. Run installer" -ForegroundColor White
    Write-Host "3. Set installation path to: $installPath" -ForegroundColor White
    Write-Host "4. Set password to: postgres" -ForegroundColor White
}
















