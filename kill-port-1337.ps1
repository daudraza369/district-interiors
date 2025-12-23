# Script to find and kill process using port 1337

Write-Host "Finding process using port 1337..." -ForegroundColor Cyan

# Find process using port 1337
$process = Get-NetTCPConnection -LocalPort 1337 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process ID: $process" -ForegroundColor Yellow
    
    # Get process details
    $processInfo = Get-Process -Id $process -ErrorAction SilentlyContinue
    if ($processInfo) {
        Write-Host "Process name: $($processInfo.ProcessName)" -ForegroundColor Yellow
        Write-Host "Process path: $($processInfo.Path)" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Killing process..." -ForegroundColor Red
    Stop-Process -Id $process -Force
    Write-Host "[OK] Process killed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: .\fix-strapi-admin.ps1" -ForegroundColor Green
} else {
    Write-Host "[INFO] No process found using port 1337" -ForegroundColor Yellow
    Write-Host "Port 1337 is free. You can start Strapi now." -ForegroundColor Green
}
















