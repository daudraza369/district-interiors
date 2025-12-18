# PowerShell script to populate Strapi content
# Usage: .\populate-strapi-content.ps1

$STRAPI_URL = $env:STRAPI_URL
if (-not $STRAPI_URL) {
    Write-Host "Please set STRAPI_URL environment variable" -ForegroundColor Red
    Write-Host "Example: `$env:STRAPI_URL='https://your-strapi-url.com'" -ForegroundColor Yellow
    exit 1
}

$API_TOKEN = "d387609ba8c2412056ed9fd4b3b3bac1ee50bc56811c2aa19db129bee62fe5fa0ff24c8ff174a2f9af4e9f0336e1c51a8dca30d1f17b47fac7e20cc8480ce6818afef2234fcfea1defaf16d3702d0e56d55247efeadb0fb9b1190527148462f647371797243b22dbf10f1bd7732caa1d02b0755bc0a826021a2f06b06bfec2c7"

Write-Host "`n🚀 Populating Strapi Content..." -ForegroundColor Green
Write-Host "📍 Strapi URL: $STRAPI_URL" -ForegroundColor Cyan
Write-Host "`n"

# Set environment variables and run the script
$env:API_TOKEN = $API_TOKEN
$env:STRAPI_API_TOKEN = $API_TOKEN

cd apps/cms
node scripts/populate-all-content.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Content population completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Content population failed. Check the errors above." -ForegroundColor Red
    exit 1
}
