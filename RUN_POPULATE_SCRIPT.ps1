# Script to populate Strapi content
# Run this from the PROJECT ROOT directory (d:\district-interiors-bloom-main)

Write-Host "`n🚀 Populating Strapi Content..." -ForegroundColor Green
Write-Host "📍 Make sure Coolify has finished redeploying the CMS service first!`n" -ForegroundColor Yellow

# Set Strapi URL
$env:STRAPI_URL = "https://admin.districtflowers.com"

# Set API Token
$env:API_TOKEN = "d387609ba8c2412056ed9fd4b3b3bac1ee50bc56811c2aa19db129bee62fe5fa0ff24c8ff174a2f9af4e9f0336e1c51a8dca30d1f17b47fac7e20cc8480ce6818afef2234fcfea1defaf16d3702d0e56d55247efeadb0fb9b1190527148462f647371797243b22dbf10f1bd7732caa1d02b0755bc0a826021a2f06b06bfec2c7"
$env:STRAPI_API_TOKEN = $env:API_TOKEN

Write-Host "📍 Strapi URL: $env:STRAPI_URL" -ForegroundColor Cyan
Write-Host "`n"

# Navigate to CMS directory and run the script
cd apps\cms
node scripts\populate-all-content.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Content population completed successfully!" -ForegroundColor Green
    Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://admin.districtflowers.com/admin" -ForegroundColor White
    Write-Host "2. Check Content Manager - all content should be populated" -ForegroundColor White
    Write-Host "3. Publish each entry if needed" -ForegroundColor White
    Write-Host "4. Upload images where needed`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Content population failed. Check the errors above." -ForegroundColor Red
    Write-Host "`n⚠️  Make sure:" -ForegroundColor Yellow
    Write-Host "   - Coolify has finished redeploying the CMS service" -ForegroundColor White
    Write-Host "   - The CMS service is running and healthy" -ForegroundColor White
    Write-Host "   - The API token is correct`n" -ForegroundColor White
    exit 1
}
