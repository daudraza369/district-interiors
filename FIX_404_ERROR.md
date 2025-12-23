# 🔧 Fix 404 Error - Hero Section API Not Accessible

## The Problem

You're getting **404 errors** when the frontend tries to access:
- `/api/hero-section?populate=heroImage&publicationState=live`
- `/api/page-sections?filters[page][$eq]=home&sort=displayOrder:asc`

Even though:
- ✅ Content is published in Strapi
- ✅ Hero Section exists in Content Manager
- ✅ You can edit and publish content

## Root Cause

The **Public role** doesn't have permission to access Hero Section via the REST API.

## 🔧 Fix This NOW

### Option 1: Restart Strapi (Easiest)

The `bootstrap.ts` file should automatically set permissions, but it only runs on startup:

1. **Stop Strapi** (Ctrl+C)
2. **Start Strapi again:**
   ```powershell
   cd apps\cms
   npm run develop
   ```
3. **Wait for bootstrap to complete** - you should see:
   ```
   ✅ Enabled 'find' for api::hero-section.hero-section
   ✅ Enabled 'findOne' for api::hero-section.hero-section
   ✅ Permissions setup complete!
   ```

### Option 2: Manual Fix in Admin

1. Go to `http://localhost:1337/admin`
2. **Settings** → **Users & Permissions Plugin** → **Roles**
3. Click **"Public"** role
4. Scroll down to **Permissions**
5. Find **"Hero Section"** (or search for it)
6. Enable:
   - ✅ **find**
   - ✅ **findOne**
7. Click **"Save"** (top right)

### Option 3: Test and Verify

Run this to test:
```powershell
node apps\cms\scripts\fix-permissions.js
```

This will tell you if the API is accessible.

## ✅ After Fixing

1. **Test the API directly:**
   - Open browser: `http://localhost:1337/api/hero-section`
   - Should return JSON (not 404)

2. **Restart frontend:**
   ```powershell
   cd apps\web
   # Stop (Ctrl+C)
   npm run dev
   ```

3. **Check frontend logs:**
   - Should see: `✅ Hero Section fetched from Strapi: [title]`
   - No more 404 errors!

## 🎯 Why This Happens

- Strapi v4 requires explicit permissions for each content type
- The `bootstrap.ts` sets permissions automatically, but only on startup
- If Hero Section was created after Strapi started, permissions weren't set
- **Solution:** Restart Strapi or set permissions manually

---

**Most likely fix: Just restart Strapi!**
















