# ✅ Hero Section Fix - Complete Solution

## 🔍 Issues Found

I tested the API and found **TWO issues**:

1. ❌ **Public Role Permissions** - Hero Section is not accessible publicly (403 Forbidden)
2. ⚠️ **Content Not Published** - Hero Section content exists but is not published

## 🔧 Fix #1: Set Public Permissions (REQUIRED)

The frontend uses `strapiPublicFetch` which requires public access. You MUST enable permissions:

### Manual Fix (Recommended):

1. **Go to Strapi Admin:**
   - Visit: https://admin.districtflowers.com/admin

2. **Navigate to Permissions:**
   - Click **Settings** (bottom left)
   - Click **Users & Permissions Plugin**
   - Click **Roles**
   - Click **Public** (the public role)

3. **Enable Hero Section Permissions:**
   - Scroll down to find **"Hero Section"** in the permissions list
   - If you don't see it, use the search box to find it
   - Enable these permissions:
     - ✅ **find** (allows fetching the hero section)
     - ✅ **findOne** (allows fetching a single hero section)

4. **Save:**
   - Click **"Save"** button at the top right
   - Wait for confirmation

5. **Optional - Restart Strapi:**
   - In Coolify, restart the Strapi service to ensure permissions take effect

## 🔧 Fix #2: Publish Content in Strapi

Even with permissions fixed, the content must be **published** (not just saved):

1. **Go to Content Manager:**
   - In Strapi Admin, click **Content Manager**
   - Click **Hero Section** (under Single Types)

2. **Check Publication Status:**
   - If you see a **"Publish"** button, the content is NOT published
   - If you see **"Unpublish"**, the content IS published

3. **Publish the Content:**
   - Click **"Publish"** button (top right)
   - Wait for confirmation

## ✅ Verify It Works

After fixing both issues:

1. **Test Public API:**
   - Visit: `https://admin.districtflowers.com/api/hero-section?publicationState=live`
   - Should return JSON (not 403 error)

2. **Check Frontend:**
   - Visit: https://web.districtflowers.com/interiors
   - Hero section should display content from Strapi
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📝 Code Changes Already Made

✅ **Already fixed in code:**
- Changed `getHeroSection()` to use `strapiPublicFetch` (instead of `strapiFetch`)
- Added `publicationState=live` parameter
- Matches the pattern used by other working sections

**File:** `apps/web/lib/cms.ts` (line 473)

## 🚀 Next Steps

1. ✅ **Code is fixed** - Already done
2. ⚠️ **Set Public Permissions** - Do this manually in Strapi Admin (see above)
3. ⚠️ **Publish Content** - Make sure Hero Section is published in Strapi
4. ⚠️ **Deploy Frontend** - Deploy the code changes to Coolify (if not already deployed)
5. ✅ **Test** - Verify changes appear on frontend

## 🐛 If Still Not Working

**Check these:**

1. **Permissions:**
   - Verify "find" and "findOne" are enabled for Hero Section in Public role
   - Try restarting Strapi in Coolify

2. **Content:**
   - Verify Hero Section is published (not draft)
   - Try editing and republishing

3. **Frontend Deployment:**
   - Verify the code changes are deployed
   - Check deployment logs for errors

4. **Environment Variables:**
   - In Coolify, verify `NEXT_PUBLIC_STRAPI_URL` is set to `https://admin.districtflowers.com`

5. **Browser Cache:**
   - Hard refresh the page
   - Try incognito/private mode

---

**Summary:** The main issue is **Public Role Permissions** need to be enabled manually in Strapi Admin. Once that's done and content is published, it should work!

