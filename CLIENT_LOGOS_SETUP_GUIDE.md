# ✅ Client Logos Section Setup Guide

## 📋 Summary

The code is already fixed:
- ✅ `getClientLogos()` now uses `strapiPublicFetch` (like hero section)
- ✅ Interface updated for Strapi v5 format
- ✅ Component is ready to receive data
- ✅ Page.tsx already calls it

**What's Missing:** The content type needs to be created in Strapi Admin.

---

## 🛠️ Setup Steps in Strapi Admin

### Step 1: Create the Component (Client Logo Item)

1. Go to **Strapi Admin**: https://admin.districtflowers.com/admin
2. Click **Content-Type Builder** (left sidebar)
3. Click **Components** tab
4. Click **"Create new component"**
5. Fill in:
   - **Display name:** `Client Logo Item`
   - **Category:** Create new category `shared` or use existing
6. Add these fields (click "Add another field" for each):

   **Field 1: clientName**
   - Type: **Text**
   - Name: `clientName`
   - Required: ✅ Yes
   - Click **"Finish"**

   **Field 2: logo**
   - Type: **Media**
   - Name: `logo`
   - Allowed types: **Images only**
   - Multiple: ❌ No (Single)
   - Click **"Finish"**

   **Field 3: websiteUrl**
   - Type: **Text**
   - Name: `websiteUrl`
   - Required: ❌ No
   - Click **"Finish"**

   **Field 4: displayOrder**
   - Type: **Number**
   - Name: `displayOrder`
   - Type: **Integer**
   - Default value: `0`
   - Click **"Finish"**

7. Click **"Save"** (top right)

---

### Step 2: Create the Single Type (Client Logos Section)

1. In **Content-Type Builder**, click **Single Types** tab
2. Click **"Create new single type"**
3. Fill in:
   - **Display name:** `Client Logos Section`
   - **API ID (singular):** `client-logos-section`
   - **API ID (plural):** `client-logos-sections` (not used for single types, but required)
4. Click **"Continue"**

5. Add these fields:

   **Field 1: title**
   - Type: **Text**
   - Name: `title`
   - Required: ✅ Yes
   - Default value: `Trusted By Leading Brands`
   - Click **"Finish"**

   **Field 2: subtitle**
   - Type: **Long text**
   - Name: `subtitle`
   - Required: ❌ No
   - Click **"Finish"**

   **Field 3: showRow1**
   - Type: **Boolean**
   - Name: `showRow1`
   - Default value: `true`
   - Click **"Finish"**

   **Field 4: showRow2**
   - Type: **Boolean**
   - Name: `showRow2`
   - Default value: `true`
   - Click **"Finish"**

   **Field 5: row1Logos**
   - Type: **Component**
   - Name: `row1Logos`
   - Component: Select **"Client Logo Item"** (the component you created in Step 1)
   - Repeatable: ✅ Yes
   - Click **"Finish"**

   **Field 6: row2Logos**
   - Type: **Component**
   - Name: `row2Logos`
   - Component: Select **"Client Logo Item"** (same component)
   - Repeatable: ✅ Yes
   - Click **"Finish"**

6. Click **"Save"** (top right)
7. **Strapi will restart** - wait 1-2 minutes

---

### Step 3: Set Public Permissions

1. After Strapi restarts, go to **Settings** (bottom left)
2. Click **Users & Permissions Plugin**
3. Click **Roles**
4. Click **Public** (the public role)
5. Scroll down to find **"Client Logos Section"**
6. Enable:
   - ✅ **find**
   - ✅ **findOne**
7. Click **"Save"** (top right)

---

### Step 4: Create and Publish Content

1. Go to **Content Manager** (left sidebar)
2. Click **Single Types** → **Client Logos Section**
3. Click **"Create new entry"** (or edit existing)
4. Fill in:
   - **Title:** `Trusted By Leading Brands`
   - **Subtitle:** `Proud collaborations with top names in hospitality and design.`
   - **Show Row1:** ✅ true
   - **Show Row2:** ✅ true

5. **Add Logos to Row 1:**
   - Click **"Add an entry"** under `row1Logos`
   - Fill in:
     - **Client Name:** `PepsiCo` (or any client name)
     - **Logo:** Click "Select an asset" → Upload or select an image
     - **Website URL:** (optional) `https://pepsico.com`
     - **Display Order:** `0`
   - Click **"Finish"**
   - Repeat for more logos (e.g., 3-6 logos)

6. **Add Logos to Row 2:**
   - Same process as Row 1
   - Add 3-6 different client logos

7. Click **"Save"** (top right)
8. Click **"Publish"** (top right) - **IMPORTANT!**

---

## ✅ After Setup

1. **Test the API:**
   - Visit: `https://admin.districtflowers.com/api/client-logos-section?publicationState=live&populate[row1Logos][populate]=*&populate[row2Logos][populate]=*`
   - Should return JSON with your data

2. **Test the Frontend:**
   - Visit: https://web.districtflowers.com/interiors
   - The Client Logos section should display your logos in a marquee

3. **Verify:**
   - Check browser console (F12) for `[getClientLogos]` logs
   - Should see "Successfully fetched client logos section"

---

## 🐛 Troubleshooting

### If API returns 404:
- Content type not created correctly
- Check Content-Type Builder for `client-logos-section`

### If API returns 403:
- Permissions not set
- Go back to Step 3 and enable find/findOne

### If no logos show:
- Content not published
- Go to Content Manager → Client Logos Section → Click "Publish"

### If logos show but images are broken:
- Image URLs need full Strapi URL
- The `getImageUrl()` helper should handle this automatically
- Check browser console for image errors

---

**Ready to test!** After completing these steps, the Client Logos section should work! 🎉

