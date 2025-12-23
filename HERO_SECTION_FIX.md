# Hero Section Fix - Strapi Changes Not Showing

## 🔧 What Was Fixed

The `getHeroSection()` function was updated to explicitly fetch **published** content using `publicationState=live` instead of relying on the default preview mode.

## ⚠️ IMPORTANT: Publishing Content in Strapi

**For changes to show on the frontend, you MUST PUBLISH the content in Strapi, not just save it.**

### Steps to Make Changes Visible:

1. **Edit content in Strapi Admin:**
   - Go to https://admin.districtflowers.com/admin
   - Navigate to Content Manager → Hero Section
   - Make your edits
   - Click **"Save"** (this saves as draft)

2. **PUBLISH the changes:**
   - After saving, click the **"Publish"** button (top right)
   - Only published content will appear on the frontend

3. **Verify on frontend:**
   - Go to https://web.districtflowers.com/interiors
   - Changes should appear immediately (no redeploy needed)

## 🔍 Technical Details

### Before the Fix:
- Used `publicationState=preview` (default from `strapiFetch`)
- This could fetch draft content, but may not show latest published changes reliably

### After the Fix:
- Now explicitly uses `publicationState=live`
- Fetches only published content (production-ready)
- Ensures consistency with what's published in Strapi

### Caching:
- The page has `export const revalidate = 0` which disables caching
- The fetch uses `cache: 'no-store'` to ensure fresh data
- Changes should appear immediately after publishing in Strapi

## 🐛 If Changes Still Don't Show:

1. **Check if content is published:**
   - In Strapi, check if the Hero Section shows "Published" status
   - If it shows "Draft", you need to publish it

2. **Check browser cache:**
   - Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private mode

3. **Check server logs:**
   - Look for `[getHeroSection]` logs in your deployment logs
   - Should show successful fetch with title

4. **Test the API directly:**
   - Visit: `https://admin.districtflowers.com/api/hero-section?publicationState=live`
   - Should return JSON with your published content

5. **Verify environment variables:**
   - Ensure `NEXT_PUBLIC_STRAPI_URL` is set correctly in Coolify
   - Ensure `STRAPI_API_TOKEN` is set (for server-side fetching)

## 📝 Code Changes Made

**File:** `apps/web/lib/cms.ts`

**Change:**
```typescript
// Before:
const { data } = await strapiFetch<StrapiEntity<HeroSection>>(
  '/hero-section?populate=*'
);

// After:
const { data } = await strapiFetch<StrapiEntity<HeroSection>>(
  '/hero-section?populate=*&publicationState=live'
);
```

This explicitly requests published content, ensuring that only published changes from Strapi appear on the frontend.

