# Quick Fix: Set Client Logos API Permissions

The 405 error means API permissions aren't set yet. Follow these steps:

## Step 1: Set API Permissions in Strapi Admin

1. Go to: https://admin.districtflowers.com/admin
2. Navigate to: **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Scroll down and find: **Client Logos Section** (or look for "client-logos-section")
4. Enable these permissions:
   - ✅ **find** (GET)
   - ✅ **findOne** (GET by ID)
   - ✅ **create** (POST)
   - ✅ **update** (PUT)
5. Click **Save**

## Step 2: Also Set Permissions for API Token (if using one)

1. Go to: **Settings** → **API Tokens**
2. Find your API token (the one you're using in the script)
3. Edit it
4. Under **Token Permissions**, make sure **Client Logos Section** has:
   - ✅ **find**
   - ✅ **findOne**
   - ✅ **create**
   - ✅ **update**
5. Save

## Step 3: Run the Populate Script Again

After setting permissions, run:
```bash
node populate-client-logos.js
```

## Alternative: Create Content Manually

If you prefer to create it manually:

1. Go to: **Content Manager** → **Single Types** → **Client Logos Section**
2. Click **Create new entry**
3. Fill in:
   - Title: "Trusted By Leading Brands"
   - Subtitle: (optional)
   - Show Row 1: ✅
   - Show Row 2: ✅
4. Click **Save**, then **Publish**
5. Later, add logos by editing this entry and adding items to Row 1 Logos and Row 2 Logos


