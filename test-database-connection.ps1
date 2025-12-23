# Test PostgreSQL Connection Script
# This helps identify the correct database password

Write-Host "Testing PostgreSQL Connection..." -ForegroundColor Cyan
Write-Host ""

# Check if psql is available
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "PostgreSQL client (psql) not found in PATH" -ForegroundColor Red
    Write-Host "Please add PostgreSQL bin directory to your PATH" -ForegroundColor Yellow
    Write-Host "Usually: C:\Program Files\PostgreSQL\15\bin" -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL client found" -ForegroundColor Green
Write-Host ""

# Common passwords to try
$passwords = @("postgres", "", "admin", "root", "password")

Write-Host "Testing common passwords..." -ForegroundColor Yellow
Write-Host ""

foreach ($pwd in $passwords) {
    $displayPwd = if ($pwd -eq "") { "(empty)" } else { "'$pwd'" }
    Write-Host "Trying password: $displayPwd..." -ForegroundColor Cyan
    
    # Try to connect
    $env:PGPASSWORD = $pwd
    $null = & psql -U postgres -d postgres -c "SELECT version();" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS! Password is: $displayPwd" -ForegroundColor Green
        Write-Host ""
        Write-Host "Update apps\cms\.env with:" -ForegroundColor Yellow
        Write-Host "DATABASE_PASSWORD=$pwd" -ForegroundColor White
        Write-Host ""
        
        # Check if database exists
        $dbCheck = & psql -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname='district_interiors_cms';" 2>&1
        if ($dbCheck -match "1 row") {
            Write-Host "Database 'district_interiors_cms' exists" -ForegroundColor Green
        } else {
            Write-Host "Database 'district_interiors_cms' does not exist" -ForegroundColor Yellow
            Write-Host "Creating database..." -ForegroundColor Yellow
            $null = & psql -U postgres -d postgres -c "CREATE DATABASE district_interiors_cms;" 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Database created!" -ForegroundColor Green
            } else {
                Write-Host "Failed to create database" -ForegroundColor Red
            }
        }
        
        $env:PGPASSWORD = ""
        exit 0
    }
    
    $env:PGPASSWORD = ""
}

Write-Host ""
Write-Host "None of the common passwords worked" -ForegroundColor Red
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Find your PostgreSQL password (check your installation notes)" -ForegroundColor White
Write-Host "2. Or reset it using pgAdmin or command line" -ForegroundColor White
Write-Host "3. Update apps\cms\.env with the correct password" -ForegroundColor White
Write-Host ""
Write-Host "To reset password:" -ForegroundColor Cyan
Write-Host "   - Open pgAdmin" -ForegroundColor White
Write-Host "   - Right-click on postgres user, Properties, Change password" -ForegroundColor White
Write-Host ""
















