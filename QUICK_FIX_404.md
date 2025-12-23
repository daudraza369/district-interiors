# ⚡ QUICK FIX - 404 Error

## The Problem

Frontend can't access Hero Section API:
- `GET /api/hero-section` returns **404**
- Changes in Strapi don't show on frontend

## 🔧 Fix (2 Steps)

### Step 1: Restart Strapi

**This is CRITICAL** - API routes are only registered when Strapi starts:

1. **Stop Strapi** (Ctrl+C in terminal)
2. **Start again:**
   ```powershell
   cd apps\cms
   npm run develop
   ```
3. **Wait for:**
   ```
   ✅ Enabled 'find' for api::hero-section.hero-section
   ✅ Enabled 'findOne' for api::hero-section.hero-section
   ✅ Permissions setup complete!
   ```

### Step 2: Test API

Open in browser: `http://localhost:1337/api/hero-section`

- ✅ **If you see JSON** → API works! Restart frontend
- ❌ **If you see 404** → Check Strapi logs, might need manual permission setup

## ✅ After Restart

1. **Restart frontend:**
   ```powershell
   cd apps\web
   # Stop (Ctrl+C)
   npm run dev
   ```

2. **Test:**
   - Edit Hero Section in Strapi
   - Click **Publish**
   - Refresh frontend → Changes should appear!

## 🎯 Why This Happens

- Strapi registers API routes on startup
- If Hero Section was created while Strapi was running, routes weren't registered
- **Solution:** Restart Strapi to register routes

---

**Just restart Strapi - that's it!** 🚀
















