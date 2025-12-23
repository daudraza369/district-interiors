# 🔧 Fix Client Logos Section Issues

## ❌ Problems Found

1. **`row2Logos` field is MISSING** - You only created `row1Logos`, but need both fields
2. **`row1Logos` is empty** - No logos have been added yet
3. **Populate query failing** - Because `row2Logos` doesn't exist

## ✅ Code Fix Applied

I've updated the fetch function to:
- Use `populate=*` instead of specific populate (works even if fields are missing)
- Handle missing `row2Logos` gracefully
- Code is now more resilient

## 🛠️ What You Need to Do in Strapi

### Fix #1: Add the Missing `row2Logos` Field

1. Go to **Strapi Admin**: https://admin.districtflowers.com/admin
2. Click **Content-Type Builder** (left sidebar)
3. Click **Single Types** tab
4. Find **"Client Logos Section"** and click on it
5. Click **"Add another field"** button
6. Select **"Component"** type
7. Fill in:
   - **Name:** `row2Logos`
   - **Component:** Select **"Client Logo Item"** (same component as row1Logos)
   - **Repeatable:** ✅ Yes (enable this!)
8. Click **"Finish"**
9. Click **"Save"** (top right)
10. **Wait for Strapi to restart** (1-2 minutes)

### Fix #2: Add Logos to Both Rows

After Strapi restarts:

1. Go to **Content Manager** → **Single Types** → **Client Logos Section**
2. Click to edit the entry

3. **Add Logos to Row 1:**
   - Find the `row1Logos` section
   - Click **"Add an entry"** button
   - Fill in:
     - **Client Name:** `PepsiCo` (or any client)
     - **Logo:** Click "Select an asset" → Upload or select a logo image
     - **Website URL:** (optional) `https://pepsico.com`
     - **Display Order:** `0`
   - Click **"Finish"**
   - Repeat to add 3-6 logos to Row 1

4. **Add Logos to Row 2:**
   - Find the `row2Logos` section (should exist now)
   - Click **"Add an entry"** button
   - Fill in the same way as Row 1
   - Add 3-6 different logos to Row 2

5. Click **"Save"** then **"Publish"**

---

## ✅ After Fixing

1. **Test the API:**
   ```
   https://admin.districtflowers.com/api/client-logos-section?populate=*&publicationState=live
   ```
   Should return data with both `row1Logos` and `row2Logos` arrays

2. **Verify in Frontend:**
   - Visit: https://web.districtflowers.com/interiors
   - Client Logos section should show both rows scrolling

3. **Check Browser Console:**
   - Should see: `[getClientLogos] Successfully fetched client logos section`

---

## 🎯 Quick Checklist

- [ ] Added `row2Logos` field in Content-Type Builder
- [ ] Saved content type (Strapi restarted)
- [ ] Added logos to `row1Logos` (3-6 logos)
- [ ] Added logos to `row2Logos` (3-6 logos)
- [ ] Published the content
- [ ] Tested API endpoint
- [ ] Verified on frontend

---

**Once you add the `row2Logos` field and populate both rows with logos, it should work!** 🎉

