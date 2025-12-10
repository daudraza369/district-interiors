# Strapi Quick Setup Script for Windows PowerShell
# Run this from the project root: .\setup-strapi.ps1

Write-Host "🚀 Setting up Strapi CMS..." -ForegroundColor Green

# Step 1: Navigate to CMS directory
Set-Location apps\cms

# Step 2: Check if .env exists
if (Test-Path .env) {
    Write-Host "⚠️  .env file already exists. Skipping creation." -ForegroundColor Yellow
    Write-Host "   If you want to recreate it, delete .env first." -ForegroundColor Yellow
} else {
    Write-Host "📝 Creating .env file..." -ForegroundColor Cyan
    
    # Generate random keys
    function Generate-Key {
        $bytes = New-Object byte[] 32
        [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
        return [Convert]::ToBase64String($bytes)
    }
    
    $key1 = Generate-Key
    $key2 = Generate-Key
    $key3 = Generate-Key
    $key4 = Generate-Key
    $apiTokenSalt = Generate-Key
    $adminJwtSecret = Generate-Key
    $transferTokenSalt = Generate-Key
    $jwtSecret = Generate-Key
    
    $envContent = @"
# Server Configuration
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

# App Keys (auto-generated)
APP_KEYS=$key1,$key2,$key3,$key4

# API Token Salt (auto-generated)
API_TOKEN_SALT=$apiTokenSalt

# Admin JWT Secret (auto-generated)
ADMIN_JWT_SECRET=$adminJwtSecret

# Transfer Token Salt (auto-generated)
TRANSFER_TOKEN_SALT=$transferTokenSalt

# JWT Secret (auto-generated)
JWT_SECRET=$jwtSecret

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=CHANGE_THIS_TO_YOUR_POSTGRES_PASSWORD
DATABASE_SSL=false

# CORS (for Next.js frontend)
CORS_ORIGIN=http://localhost:3000
"@
    
    $envContent | Out-File -FilePath .env -Encoding utf8
    Write-Host "✅ .env file created!" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANT: Edit .env and set your DATABASE_PASSWORD!" -ForegroundColor Yellow
}

# Step 3: Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Cyan
if (Test-Path node_modules) {
    Write-Host "   node_modules exists, skipping install..." -ForegroundColor Yellow
} else {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install failed!" -ForegroundColor Red
        Set-Location ..\..
        exit 1
    }
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
}

# Step 4: Check PostgreSQL
Write-Host "`n🔍 Checking PostgreSQL..." -ForegroundColor Cyan
$pgCheck = Get-Command psql -ErrorAction SilentlyContinue
if (-not $pgCheck) {
    Write-Host "⚠️  PostgreSQL not found in PATH. Make sure it's installed." -ForegroundColor Yellow
} else {
    Write-Host "✅ PostgreSQL found!" -ForegroundColor Green
}

# Step 5: Instructions
Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit apps\cms\.env and set your DATABASE_PASSWORD" -ForegroundColor White
Write-Host "2. Make sure PostgreSQL is running" -ForegroundColor White
Write-Host "3. Create database: CREATE DATABASE district_interiors_cms;" -ForegroundColor White
Write-Host "4. Run: cd apps\cms && npm run develop" -ForegroundColor White
Write-Host "5. Create admin user in browser at http://localhost:1337/admin" -ForegroundColor White
Write-Host "6. Configure permissions (see STRAPI_SETUP_GUIDE.md)" -ForegroundColor White
Write-Host "7. Create API token in Strapi admin" -ForegroundColor White

Write-Host "`n✅ Setup script complete!" -ForegroundColor Green
Write-Host "📚 For detailed instructions, see: STRAPI_SETUP_GUIDE.md" -ForegroundColor Cyan

Set-Location ..\..

