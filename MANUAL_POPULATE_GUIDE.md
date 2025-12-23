# 📝 Manual Population Guide

Since the API is giving 405 errors, here's how to populate everything manually in Strapi:

## 🎯 Hero Section (Single Type)

1. Go to `http://localhost:1337/admin`
2. Click **Content Manager** → **Hero Section**
3. Fill in the missing fields:

   **Subtitle:**
   ```
   Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.
   ```

   **Description:**
   ```
   District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.
   ```

4. **Link the Hero Image:**
   - Click on the `heroImage` field
   - Click "Select an asset"
   - Find and select `hero-interior.jpg`
   - Click "Finish"

5. Click **"Publish"** (not just Save!)

## 📄 Page Sections (Collection Type)

1. Go to **Content Manager** → **Page Section**
2. You should see 12 entries (or create new ones)

### Create/Edit Each Section:

#### 1. Why Choose Us
- **Page:** `home`
- **Section Key:** `why-choose-us`
- **Content:** (JSON structure - see below)

#### 2. Collection Preview
- **Page:** `home`
- **Section Key:** `collection-preview`
- **Content:** (JSON structure)

#### 3. About Snapshot
- **Page:** `home`
- **Section Key:** `about-snapshot`
- **Content:** (JSON structure)

#### 4. Services
- **Page:** `home`
- **Section Key:** `services`
- **Content:** (JSON structure)

#### 5. Stats
- **Page:** `home`
- **Section Key:** `stats`
- **Content:** (JSON structure)

#### 6. Portfolio
- **Page:** `home`
- **Section Key:** `portfolio`
- **Content:** (JSON structure)

## 🔧 Alternative: Use the Script After Fixing Permissions

1. Fix API token permissions (Settings → API Tokens → Edit → Full access)
2. Run: `.\FIX_PERMISSIONS_AND_POPULATE.ps1`
3. The script will populate everything automatically

## 📋 Content Structure Examples

The Page Section content field uses JSON. Here's an example structure:

```json
{
  "title": "Why Choose Us",
  "items": [
    {
      "title": "Premium Quality",
      "description": "We use only the finest materials"
    }
  ]
}
```

For exact content structures, check the frontend components to see what data they expect.
















