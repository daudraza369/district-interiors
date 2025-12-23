# 🔍 Root Cause Analysis & Fix

## ✅ ROOT CAUSE IDENTIFIED

**Issue:** Type mismatch between interface definition and actual Strapi v5 data structure

### The Problem:

1. **Interface Expected (v4 format):**
   ```typescript
   backgroundImage?: { data: StrapiEntity<{ url: string }> }
   ```

2. **Strapi v5 Actually Returns:**
   ```typescript
   backgroundImage: { url: string, ... }  // Direct object, not wrapped in data
   ```

3. **Result:** Type mismatch causing potential runtime issues

## ✅ FIXES APPLIED

### Fix #1: Updated HeroSection Interface
**File:** `apps/web/lib/cms.ts`

Changed media field types to match Strapi v5 format:
```typescript
// BEFORE (v4 format - WRONG):
backgroundImage?: { data: StrapiEntity<{ url: string }> };

// AFTER (v5 format - CORRECT):
backgroundImage?: { url: string; alternativeText?: string; mime?: string; [key: string]: any };
```

This matches what Strapi v5 actually returns and what `getImageUrl()` expects.

### Fix #2: Already Fixed Previously
- ✅ Changed `getHeroSection()` to use `strapiPublicFetch`
- ✅ Added normalization to `strapiPublicFetch`
- ✅ Public permissions enabled in Strapi

## 📋 VERIFICATION

### API Tests Show:
- ✅ API returns 200 OK
- ✅ Data structure is correct
- ✅ Normalization works correctly
- ✅ Media fields have correct structure
- ✅ `getImageUrl()` can extract URLs correctly

### What Works:
1. ✅ Strapi API endpoint: Working
2. ✅ Permissions: Public access enabled
3. ✅ Data normalization: Working correctly
4. ✅ Image URL extraction: Should work (handles both formats)

## 🚀 NEXT STEPS

### 1. Deploy the Fixed Code

The code changes need to be deployed to Coolify:

**Files Changed:**
- `apps/web/lib/cms.ts` - Updated HeroSection interface
- `apps/web/lib/cms.ts` - Already using `strapiPublicFetch`
- `apps/web/lib/strapi.ts` - Already has normalization

**Deployment Steps:**
1. Commit changes (if using git)
2. Deploy frontend service in Coolify
3. Wait for deployment to complete

### 2. Verify Environment Variables

In Coolify, ensure frontend service has:
- `NEXT_PUBLIC_STRAPI_URL` = `https://admin.districtflowers.com`

### 3. Test After Deployment

1. Visit: https://web.districtflowers.com/interiors
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check browser console (F12) for:
   - `[getHeroSection] Successfully fetched hero section`
   - `Hero Section Data:` log with title

### 4. Test Editing in Strapi

1. Edit Hero Section in Strapi Admin
2. Change title to something like "TEST - New Title"
3. Save and Publish
4. Check frontend - should update immediately (no redeploy needed)

## 🐛 IF STILL NOT WORKING AFTER DEPLOY

### Check Browser Console (F12 → Console)
Look for:
- Errors
- `[getHeroSection]` log messages
- `Hero Section Data:` log

### Check Network Tab (F12 → Network)
- Filter by "hero-section"
- Check if request is made
- Check response (should be 200)
- Check response data

### Check Server Logs
In Coolify, check frontend service logs for:
- `[getHeroSection]` messages
- Any errors

## 📝 SUMMARY

**Root Cause:** Type mismatch in interface definition (expected v4 format, getting v5 format)

**Status:**
- ✅ Root cause identified
- ✅ Interface fixed to match v5 format
- ✅ All other code already fixed
- ⚠️ **Need to deploy the changes**

**After deployment, it should work!**

