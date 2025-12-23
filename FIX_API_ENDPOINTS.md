# 🔧 Fixing API Endpoint Issues

The 405 errors mean the API endpoints are wrong. Here's what's happening and how to fix it.

## 🐛 The Problem

- **405 Method Not Allowed** = Wrong HTTP method or endpoint structure
- Strapi v4 has specific API endpoint formats

## ✅ Correct API Endpoints

### Single Types (Hero Section):
- **Endpoint:** `PUT /api/hero-section` (no ID needed)
- **Body:** `{ data: { ...fields } }`

### Collection Types (Page Sections):
- **Create:** `POST /api/page-sections`
- **Update:** `PUT /api/page-sections/:id`
- **Body:** `{ data: { ...fields } }`

## 🔍 Check What's Wrong

The script is trying to use the correct endpoints, but there might be:
1. **Permission issues** - API token might not have write access
2. **Content type not created** - Hero Section might not exist yet
3. **Wrong API ID** - The endpoint name might be different

## 🚀 Quick Fix

Run this to check and fix:

```powershell
cd apps\cms
node scripts\complete-integration.js
```

If it still fails, the content types might need to be created first in Strapi admin panel.
















