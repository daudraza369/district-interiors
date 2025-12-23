# Setup Hot Reload / No Restart for Strapi

## For Content Changes (No Restart Needed):

Strapi **already supports** hot reload for content changes:
- ✅ Adding/editing content via API → No restart needed
- ✅ Adding/editing content via Admin Panel → No restart needed
- ✅ Uploading media → No restart needed

## For Schema Changes (Restart Required):

Schema changes (adding/editing fields) require a restart because:
- Strapi needs to rebuild the admin panel
- Database schema needs to be updated
- This is **normal and expected** behavior

## Recommendation:

1. **One-time setup**: Add all content types and fields you need
2. **Restart once** after adding fields
3. **Then work normally**: All content changes work without restart

## Current Status:

✅ Hero Section fields are added
✅ Hero Section content is populated
🔄 Now upload images (no restart needed for images!)

## To Upload Images:

**Option 1: Manual (Easiest)**
1. Go to Strapi Admin → Media Library
2. Click "Upload files"
3. Upload `hero-interior.jpg` (from `apps/web/public/`)
4. Go to Content Manager → Hero Section
5. Click on backgroundImage field → Select uploaded image
6. Repeat for heroImage, beforeImage, afterImage
7. Click Save → Publish

**Option 2: Via API (Automated)**
- Run the upload script (requires images to be accessible from where script runs)



