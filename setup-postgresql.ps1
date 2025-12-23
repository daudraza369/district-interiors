# PostgreSQL Setup Script for Strapi
# This script helps set up PostgreSQL after installation

Write-Host "PostgreSQL Setup for Strapi" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Cyan

$pgPaths = @(
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe"
)

$psqlPath = $null
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        $psqlPath = $path
        $pgBin = Split-Path $path
        Write-Host "Found PostgreSQL at: $pgBin" -ForegroundColor Green
        break
    }
}

if (-not $psqlPath) {
    Write-Host "PostgreSQL not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "2. Install PostgreSQL 15 or 16" -ForegroundColor White
    Write-Host "3. Set password for 'postgres' user (remember it!)" -ForegroundColor White
    Write-Host "4. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "See INSTALL_POSTGRESQL.md for detailed instructions" -ForegroundColor Cyan
    exit 1
}

# Add to PATH for this session
$env:Path += ";$pgBin"

Write-Host ""
Write-Host "PostgreSQL is installed!" -ForegroundColor Green
Write-Host ""

# Get password
Write-Host "Enter PostgreSQL password for 'postgres' user:" -ForegroundColor Yellow
$securePassword = Read-Host -AsSecureString
$password = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
)

Write-Host ""
Write-Host "Testing connection..." -ForegroundColor Cyan

# Test connection
$env:PGPASSWORD = $password
$testResult = & "$psqlPath" -U postgres -d postgres -c "SELECT version();" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Connection failed!" -ForegroundColor Red
    Write-Host "Error: $testResult" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "1. PostgreSQL service is running" -ForegroundColor White
    Write-Host "2. Password is correct" -ForegroundColor White
    Write-Host "3. Try: Get-Service -Name '*postgres*'" -ForegroundColor White
    $env:PGPASSWORD = ""
    exit 1
}

Write-Host "Connection successful!" -ForegroundColor Green
Write-Host ""

# Check if database exists
Write-Host "Checking if database exists..." -ForegroundColor Cyan
$dbCheck = & "$psqlPath" -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname='district_interiors_cms';" 2>&1

if ($dbCheck -match "1 row") {
    Write-Host "Database 'district_interiors_cms' already exists" -ForegroundColor Green
} else {
    Write-Host "Creating database 'district_interiors_cms'..." -ForegroundColor Yellow
    $createResult = & "$psqlPath" -U postgres -d postgres -c "CREATE DATABASE district_interiors_cms;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database created successfully!" -ForegroundColor Green
    } else {
        Write-Host "Failed to create database" -ForegroundColor Red
        Write-Host "Error: $createResult" -ForegroundColor Red
        $env:PGPASSWORD = ""
        exit 1
    }
}

$env:PGPASSWORD = ""

Write-Host ""
Write-Host "Updating .env file..." -ForegroundColor Cyan

# Update .env file
$envFile = "apps\cms\.env"
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    $content = $content -replace "DATABASE_PASSWORD=.*", "DATABASE_PASSWORD=$password"
    Set-Content -Path $envFile -Value $content -NoNewline
    Write-Host ".env file updated with password" -ForegroundColor Green
} else {
    Write-Host "Warning: .env file not found at $envFile" -ForegroundColor Yellow
    Write-Host "Please manually update DATABASE_PASSWORD=$password" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start Strapi: cd apps\cms && npm run develop" -ForegroundColor White
Write-Host "2. Access admin: http://localhost:1337/admin" -ForegroundColor White
Write-Host ""
















