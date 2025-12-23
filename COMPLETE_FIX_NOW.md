# 🚨 COMPLETE FIX - Why Content is Missing

## The Problem

Looking at your screenshot:
- ✅ Hero Section exists
- ❌ **Subtitle is empty**
- ❌ **Description is empty**  
- ❌ **Hero image is not linked**
- ❌ **Page Sections might not have content**
- ❌ **405 API errors** = API token doesn't have write permissions

## 🔧 Fix This in 3 Steps

### Step 1: Fix API Token Permissions (CRITICAL!)

The 405 error means your API token can't write to Strapi.

1. Go to `http://localhost:1337/admin`
2. Click **Settings** (bottom left, gear icon)
3. Click **API Tokens**
4. Find your token (or create a new one)
5. Click **Edit** (pencil icon)
6. Set **Token type** to **"Full access"**
7. Click **Save**
8. **Copy the new token** (if you created a new one)

### Step 2: Populate Content via Script

After fixing permissions, run:

```powershell
.\FIX_PERMISSIONS_AND_POPULATE.ps1
```

Or test first:

```powershell
node apps\cms\scripts\test-and-populate.js
```

### Step 3: Manual Fill (If Script Still Fails)

If the script still doesn't work, fill manually:

#### Hero Section:
1. Go to **Content Manager** → **Hero Section**
2. Fill in:
   - **Subtitle:** `Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.`
   - **Description:** `District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.`
3. **Link Image:**
   - Click `heroImage` field
   - Click "Select an asset"
   - Find `hero-interior.jpg`
   - Click "Finish"
4. Click **"Publish"** (top right)

#### Page Sections:
1. Go to **Content Manager** → **Page Section**
2. You should see 12 entries
3. Edit each one and add content (or create new ones if missing)
4. Make sure each has:
   - **Page:** `home`
   - **Section Key:** (e.g., `why-choose-us`, `services`, etc.)
   - **Content:** (JSON structure with the actual content)

## ✅ Success Checklist

After fixing:
- [ ] API token set to "Full access"
- [ ] Hero Section has subtitle
- [ ] Hero Section has description
- [ ] Hero image is linked
- [ ] Hero Section is **Published** (not draft)
- [ ] Page Sections have content
- [ ] All sections are Published

## 🎯 Quick Test

After populating, test the frontend:

```powershell
cd apps\web
npm run dev
```

Visit `http://localhost:3000` - you should see:
- Hero section with all text
- Hero image displayed
- All other sections showing content

---

**The key issue: API token needs "Full access" permissions!**
















