# Quick Database Setup - Manual Version
# This script helps set up the database if PostgreSQL is installed but not found by the auto-script

Write-Host "Quick Database Setup" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host ""

# Try to find PostgreSQL in common locations
$pgPaths = @(
    "C:\Program Files\PostgreSQL\17\bin\psql.exe",
    "C:\Program Files\PostgreSQL\18\bin\psql.exe",
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe"
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
    Write-Host "PostgreSQL not found in standard locations." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide:" -ForegroundColor Cyan
    Write-Host "1. PostgreSQL installation path (e.g., C:\Program Files\PostgreSQL\17\bin)" -ForegroundColor White
    Write-Host "2. PostgreSQL password for 'postgres' user" -ForegroundColor White
    Write-Host ""
    Write-Host "Or we can try to set up the .env file manually if you know the password." -ForegroundColor Yellow
    Write-Host ""
    
    $manualPath = Read-Host "Enter PostgreSQL bin path (or press Enter to skip)"
    if ($manualPath -and (Test-Path (Join-Path $manualPath "psql.exe"))) {
        $psqlPath = Join-Path $manualPath "psql.exe"
        $pgBin = $manualPath
        Write-Host "Using: $psqlPath" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Skipping PostgreSQL setup. You can manually:" -ForegroundColor Yellow
        Write-Host "1. Create database: CREATE DATABASE district_interiors_cms;" -ForegroundColor White
        Write-Host "2. Update apps\cms\.env with correct DATABASE_PASSWORD" -ForegroundColor White
        Write-Host ""
        
        $password = Read-Host "Enter PostgreSQL password (or press Enter to skip)"
        if ($password) {
            $envFile = "apps\cms\.env"
            if (Test-Path $envFile) {
                $content = Get-Content $envFile -Raw
                $content = $content -replace "DATABASE_PASSWORD=.*", "DATABASE_PASSWORD=$password"
                Set-Content -Path $envFile -Value $content -NoNewline
                Write-Host ".env file updated!" -ForegroundColor Green
            }
        }
        exit 0
    }
}

# Add to PATH
$env:Path += ";$pgBin"

Write-Host ""
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
    Write-Host "Updating .env file anyway..." -ForegroundColor Yellow
    $envFile = "apps\cms\.env"
    if (Test-Path $envFile) {
        $content = Get-Content $envFile -Raw
        $content = $content -replace "DATABASE_PASSWORD=.*", "DATABASE_PASSWORD=$password"
        Set-Content -Path $envFile -Value $content -NoNewline
        Write-Host ".env file updated with password" -ForegroundColor Green
    }
    $env:PGPASSWORD = ""
    exit 1
}

Write-Host "Connection successful!" -ForegroundColor Green
Write-Host ""

# Create database
Write-Host "Creating database..." -ForegroundColor Cyan
$createResult = & "$psqlPath" -U postgres -d postgres -c "CREATE DATABASE district_interiors_cms;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created successfully!" -ForegroundColor Green
} else {
    if ($createResult -match "already exists") {
        Write-Host "Database already exists - that's fine!" -ForegroundColor Green
    } else {
        Write-Host "Warning: $createResult" -ForegroundColor Yellow
    }
}

$env:PGPASSWORD = ""

# Update .env
Write-Host ""
Write-Host "Updating .env file..." -ForegroundColor Cyan
$envFile = "apps\cms\.env"
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    $content = $content -replace "DATABASE_PASSWORD=.*", "DATABASE_PASSWORD=$password"
    Set-Content -Path $envFile -Value $content -NoNewline
    Write-Host ".env file updated!" -ForegroundColor Green
} else {
    Write-Host "Warning: .env file not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now start Strapi:" -ForegroundColor Cyan
Write-Host "  cd apps\cms" -ForegroundColor White
Write-Host "  npm run develop" -ForegroundColor White
Write-Host ""
















