# Simplified script to upload media to Strapi using curl-like approach
# This uses a simpler method that works better with PowerShell

$STRAPI_URL = "http://localhost:1337"
$API_TOKEN = "f0d470a53d09e452c2a8eed0eb19fe2eb7c5b7055bdac1ab132a8c7bc9f97b5feb8d23cb6557e4a83bb506256ed0f4cf5038b569d3e617a67c7638ddc0bd9ec1fddf536d3fe11ac75cdfa8ed1efff412364df3312aa7cad3531bf038259186cc779c45a9202c21a27b6dcc85ee41e2e17578bffac4d36e193b2d5832891d7453"
$PUBLIC_DIR = "apps\web\public"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  UPLOADING ALL MEDIA TO STRAPI" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if public directory exists
if (-not (Test-Path $PUBLIC_DIR)) {
    Write-Host "[ERROR] Public directory not found: $PUBLIC_DIR" -ForegroundColor Red
    exit 1
}

# Get all image files
$imageFiles = Get-ChildItem -Path $PUBLIC_DIR -Include *.jpg,*.jpeg,*.png,*.gif,*.svg,*.webp -File

if ($imageFiles.Count -eq 0) {
    Write-Host "[WARNING] No image files found in $PUBLIC_DIR" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($imageFiles.Count) image files to upload..." -ForegroundColor Cyan
Write-Host ""

$uploadedCount = 0
$failedCount = 0

foreach ($file in $imageFiles) {
    $fileName = $file.Name
    $filePath = $file.FullName
    
    Write-Host "Uploading: $fileName..." -ForegroundColor Yellow -NoNewline
    
    try {
        # Use Invoke-WebRequest for file upload
        $form = @{
            files = Get-Item -Path $filePath
        }
        
        $response = Invoke-RestMethod -Uri "$STRAPI_URL/api/upload" `
            -Method POST `
            -Headers @{
                "Authorization" = "Bearer $API_TOKEN"
            } `
            -Form $form `
            -ErrorAction Stop
        
        $uploadedCount++
        Write-Host " [OK]" -ForegroundColor Green
        
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        
        if ($statusCode -eq 409) {
            Write-Host " [SKIPPED - Already exists]" -ForegroundColor Yellow
        } else {
            $failedCount++
            Write-Host " [FAILED]" -ForegroundColor Red
            Write-Host "   Status: $statusCode" -ForegroundColor Red
            Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
            
            # Try to get error details
            if ($_.Exception.Response) {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $responseBody = $reader.ReadToEnd()
                Write-Host "   Details: $responseBody" -ForegroundColor Red
            }
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  UPLOAD SUMMARY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Uploaded: $uploadedCount" -ForegroundColor Green
Write-Host "Failed:   $failedCount" -ForegroundColor Red
Write-Host ""

if ($uploadedCount -gt 0) {
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to http://localhost:1337/admin" -ForegroundColor White
    Write-Host "2. Click 'Media Library' in left sidebar" -ForegroundColor White
    Write-Host "3. You should see all uploaded images!" -ForegroundColor White
    Write-Host "4. Link images to content types:" -ForegroundColor White
    Write-Host "   - Hero Section → heroImage → Select hero-interior.jpg" -ForegroundColor White
    Write-Host "   - Products → images → Select product images" -ForegroundColor White
    Write-Host "   - Projects → heroImage/gallery → Select portfolio images" -ForegroundColor White
    Write-Host ""
    Write-Host "All images are now in Strapi Media Library!" -ForegroundColor Green
    Write-Host ""
}
















