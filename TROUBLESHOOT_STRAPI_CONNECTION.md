# Troubleshooting Strapi Connection Issue

## Quick Debug Steps

### Step 1: Check Debug Endpoint
After rebuild, visit: **https://web.districtflowers.com/api/debug-strapi**

This will show:
- ✅ If `NEXT_PUBLIC_STRAPI_URL` is set
- ✅ If `STRAPI_API_TOKEN` is set  
- ✅ Test API connection result
- ✅ Any error messages

### Step 2: Check Coolify Logs
1. Go to Coolify Dashboard
2. Find your **Frontend/Web service**
3. Click **Logs**
4. Look for lines with `[strapiFetch]`
5. Copy any error messages you see

### Step 3: Verify Environment Variables
In Coolify → Frontend Service → Environment Variables, verify these are EXACTLY set:

```
NEXT_PUBLIC_STRAPI_URL=https://admin.districtflowers.com
STRAPI_API_TOKEN=96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b
```

**IMPORTANT:**
- No trailing spaces
- No quotes around values
- URL must start with `https://`
- Token must be the full long string

### Step 4: Test Strapi API Directly
From your server or locally, test if Strapi API works:

```bash
curl -H "Authorization: Bearer 96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b" \
  "https://admin.districtflowers.com/api/hero-section?populate=*"
```

If this works, Strapi is fine. If it doesn't, the issue is with Strapi.

### Step 5: Force Rebuild
1. In Coolify → Frontend Service
2. Click **Redeploy** or **Restart**
3. Wait 3-5 minutes for rebuild
4. Check logs again

## Common Issues

### Issue: Environment variables not set
**Symptom:** Debug endpoint shows `NOT SET`
**Fix:** Add environment variables in Coolify and rebuild

### Issue: API Token invalid
**Symptom:** Debug endpoint shows `401 Unauthorized`
**Fix:** Regenerate API token in Strapi admin and update in Coolify

### Issue: URL incorrect
**Symptom:** Debug endpoint shows connection timeout
**Fix:** Verify `NEXT_PUBLIC_STRAPI_URL` is exactly `https://admin.districtflowers.com`

### Issue: Build didn't pick up env vars
**Symptom:** Variables set but still showing `NOT SET`
**Fix:** 
1. Ensure variables are set BEFORE building
2. Force a rebuild in Coolify
3. Check if Coolify passes build args correctly

## What the Logs Will Tell You

Look for these patterns in logs:

✅ **Good:** `[strapiFetch] Successfully fetched /hero-section`
✅ **Good:** `hasToken: true`

❌ **Bad:** `hasToken: false` → Token not set
❌ **Bad:** `ECONNREFUSED` → URL wrong or Strapi down
❌ **Bad:** `401 Unauthorized` → Token invalid
❌ **Bad:** `404 Not Found` → Endpoint doesn't exist

## Next Steps After Debug

Once you have the debug output, share:
1. What the `/api/debug-strapi` endpoint shows
2. Any `[strapiFetch]` errors from Coolify logs
3. Result of the curl test above

This will help identify the exact issue.



