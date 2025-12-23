# 🔧 Manual Route Creation - Fix 404 Errors

## The Problem

Even after restarting, ALL API endpoints return 404. This means Strapi's auto-generated routes aren't working.

## The Solution

I've created **manual routes and controllers** to force the API to work:

### Files Created:

1. **`apps/cms/src/api/hero-section/routes/hero-section.ts`**
   - Defines GET, PUT, and publish routes

2. **`apps/cms/src/api/hero-section/controllers/hero-section.ts`**
   - Implements find, update, and publish handlers

3. **`apps/cms/src/api/page-section/routes/page-section.ts`**
   - Defines GET, GET/:id, POST, PUT routes

4. **`apps/cms/src/api/page-section/controllers/page-section.ts`**
   - Implements find, findOne, create, update handlers

## 🔧 Next Steps

### Step 1: Restart Strapi

The routes will be registered when Strapi starts:

```powershell
cd apps\cms
# Stop Strapi (Ctrl+C if running)
npm run develop
```

### Step 2: Test API

After restart, test:

```powershell
# Should NOT return 404 anymore
curl http://localhost:1337/api/hero-section
curl http://localhost:1337/api/page-sections
```

### Step 3: Set Permissions

Even with routes working, you need permissions:

1. Go to `http://localhost:1337/admin`
2. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Enable **find** and **findOne** for:
   - Hero Section
   - Page Section

### Step 4: Test Frontend

```powershell
cd apps\web
npm run dev
```

Visit `http://localhost:3001` - should now fetch from Strapi!

## ✅ Expected Result

- ✅ `/api/hero-section` returns JSON (or 403 if no permissions)
- ✅ `/api/page-sections` returns JSON (or 403 if no permissions)
- ✅ Frontend can fetch data
- ✅ Changes in Strapi appear on frontend

---

**Routes are now manually created - restart Strapi to register them!**
















