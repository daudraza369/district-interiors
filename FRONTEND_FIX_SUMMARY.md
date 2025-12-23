# Frontend Strapi Connection Fix

## Problem Found:
The frontend was using `strapiPublicFetch` which requires public API permissions, but those aren't set in Strapi.

## Solution Applied:
✅ Changed `getHeroSection()` to use `strapiFetch` instead (server-side with API token)

## What You Need to Do:

1. **The code has been fixed** in `apps/web/lib/cms.ts`
2. **You need to commit and push this change:**
   ```bash
   git add apps/web/lib/cms.ts
   git commit -m "Fix hero section to use server-side API token"
   git push
   ```

3. **Or if you want to test first**, check the change in `apps/web/lib/cms.ts`:
   - Line 418: Changed from `strapiPublicFetch` to `strapiFetch`
   - Line 419: Changed populate syntax to `populate=*`

4. **After pushing, redeploy your frontend in Coolify**

## Alternative: Set Public Permissions in Strapi

If you prefer to use public API (no token needed):
1. Go to Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public
2. Find "Hero Section"
3. Enable: ✅ **find** and ✅ **findOne**
4. Save

But using server-side with token is more secure and is already fixed in the code.



