# Local Test Script for District Interiors
# This script helps test the application locally before deploying

Write-Host "🚀 Starting Local Test for District Interiors" -ForegroundColor Green
Write-Host ""

# Check if Docker is running
Write-Host "📋 Checking Docker..." -ForegroundColor Yellow
$dockerRunning = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker is running" -ForegroundColor Green
Write-Host ""

# Stop any existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker compose down -v 2>&1 | Out-Null
Write-Host "✅ Containers stopped" -ForegroundColor Green
Write-Host ""

# Build images
Write-Host "🔨 Building Docker images..." -ForegroundColor Yellow
docker compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed" -ForegroundColor Green
Write-Host ""

# Start services
Write-Host "🚀 Starting services..." -ForegroundColor Yellow
docker compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start services!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Services started" -ForegroundColor Green
Write-Host ""

# Wait for services to be healthy
Write-Host "⏳ Waiting for services to be healthy..." -ForegroundColor Yellow
$maxWait = 300 # 5 minutes
$elapsed = 0
$interval = 5

while ($elapsed -lt $maxWait) {
    Start-Sleep -Seconds $interval
    $elapsed += $interval
    
    $postgresHealth = docker inspect --format='{{.State.Health.Status}}' district-interiors-postgres 2>&1
    $cmsHealth = docker inspect --format='{{.State.Health.Status}}' district-interiors-cms 2>&1
    
    Write-Host "  PostgreSQL: $postgresHealth | CMS: $cmsHealth (${elapsed}s)" -ForegroundColor Cyan
    
    if ($postgresHealth -eq "healthy" -and $cmsHealth -eq "healthy") {
        Write-Host "✅ All services are healthy!" -ForegroundColor Green
        break
    }
}

if ($elapsed -ge $maxWait) {
    Write-Host "⚠️  Services did not become healthy within timeout" -ForegroundColor Yellow
    Write-Host "📋 Checking logs..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "=== CMS Logs ===" -ForegroundColor Cyan
    docker compose logs cms --tail=50
    Write-Host ""
    Write-Host "=== PostgreSQL Logs ===" -ForegroundColor Cyan
    docker compose logs postgres --tail=20
    exit 1
}

Write-Host ""
Write-Host "🎉 All services are running!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Service URLs:" -ForegroundColor Cyan
Write-Host "  - CMS: http://localhost:1337" -ForegroundColor White
Write-Host "  - Web: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📋 To view logs:" -ForegroundColor Cyan
Write-Host "  docker compose logs -f cms" -ForegroundColor White
Write-Host "  docker compose logs -f web" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop services:" -ForegroundColor Cyan
Write-Host "  docker compose down" -ForegroundColor White
Write-Host ""
















