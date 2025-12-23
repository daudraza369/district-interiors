# Hero Section Setup Guide

## API Token (Keep Secure!)
```
497ed3f9b308f1aa478862578e2276377486270c940b18292c311a8243528453b5f11f1b7224f2c022813977c83a0e5062d9eed4a18733d63d311ce2bcbc7fd34c34e1960405c2abdf40aa7b5c684ed68b11502047cbf97c2adf492db115b8c9704e76f1b3f33c04d27ae39d1c79330d55bb48c8a28037408f5b82b10b1a209d
```

## Step 1: Create Hero Section Content Type in Strapi

1. Go to **Content-Type Builder** in Strapi admin panel
2. Click **"+ Create new single type"** (under SINGLE TYPES section)
3. Enter:
   - **Display name:** `Hero Section`
   - **API ID (singular):** `hero-section`
   - **API ID (plural):** `hero-sections` (not used for single types, but required)
4. Click **"Continue"**

## Step 2: Add Fields

Add these fields one by one:

### Text Fields:
1. **title** (Text, Required) - Default: `Where Design Takes Root`
2. **subtitle** (Long text) - Subtitle text
3. **description** (Long text) - Description text
4. **primaryButtonText** (Text) - Default: `Explore Our Work`
5. **secondaryButtonText** (Text) - Default: `Request a Consultation`
6. **primaryButtonLink** (Text) - Optional, for link action
7. **secondaryButtonLink** (Text) - Optional, for link action
8. **primaryButtonScrollTarget** (Text) - Default: `portfolio`
9. **secondaryButtonScrollTarget** (Text) - Default: `contact`

### Enumeration Fields:
10. **primaryButtonAction** (Enumeration)
    - Values: `scroll`, `link`
    - Default: `scroll`

11. **secondaryButtonAction** (Enumeration)
    - Values: `scroll`, `link`
    - Default: `scroll`

### Media Fields:
12. **backgroundImage** (Media, Single) - Background image
13. **heroImage** (Media, Multiple) - Hero images/videos
14. **beforeImage** (Media, Single) - Before image for slider
15. **afterImage** (Media, Single) - After image for slider

## Step 3: Save and Publish

1. Click **"Save"** at the top right
2. Go to **Content Manager** → **Hero Section**
3. Click **"Create new entry"**
4. Fill in your content
5. Upload images to Media Library first, then select them
6. Click **"Save"** then **"Publish"**

## Step 4: Configure Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Hero Section**, enable:
   - ✅ **find** (read)
   - ✅ **findOne** (read)
3. **Save**

## Step 5: Add API Token to Frontend

In Coolify, add to your frontend service environment variables:
- **Key:** `STRAPI_API_TOKEN`
- **Value:** `497ed3f9b308f1aa478862578e2276377486270c940b18292c311a8243528453b5f11f1b7224f2c022813977c83a0e5062d9eed4a18733d63d311ce2bcbc7fd34c34e1960405c2abdf40aa7b5c684ed68b11502047cbf97c2adf492db115b8c9704e76f1b3f33c04d27ae39d1c79330d55bb48c8a28037408f5b82b10b1a209d`

Also ensure:
- **Key:** `NEXT_PUBLIC_STRAPI_URL`
- **Value:** `https://admin.districtflowers.com`



