# 🔧 Fix Strapi Admin Panel - See All Content Types

This guide will help you fix issues with seeing all content types in the Strapi admin panel at `http://localhost:1337/admin/`.

## 🚨 Common Issues

1. **Content types not visible in sidebar** - Admin permissions not set
2. **Can't access Content-Type Builder** - Role permissions issue
3. **Empty collections** - Content types exist but aren't accessible

## ✅ Quick Fix Steps

### Step 1: Stop Strapi (if running)
Press `Ctrl+C` in the terminal where Strapi is running.

### Step 2: Clear Strapi Cache
```powershell
cd apps\cms
Remove-Item -Recurse -Force .cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
```

### Step 3: Restart Strapi
```powershell
npm run develop
```

Wait for Strapi to fully start. You should see:
- `✅ Admin permissions verified!`
- `✅ Permissions setup complete!`
- `Server started on http://localhost:1337`

### Step 4: Clear Browser Cache
1. Open `http://localhost:1337/admin/` in your browser
2. Press `Ctrl+Shift+Delete` (Chrome/Edge) or `Ctrl+F5` to hard refresh
3. Or open in Incognito/Private mode

### Step 5: Log In as Admin
1. If you see the login page, log in with your admin credentials
2. If this is first run, create an admin user

## 📋 What You Should See

After logging in, you should see in the left sidebar:

### Collection Types:
- ✅ **Category** - Product categories
- ✅ **Product** - Products catalog
- ✅ **Service** - Services offered
- ✅ **Project** - Project portfolio
- ✅ **Testimonial** - Customer testimonials
- ✅ **Client Logo** - Client logos
- ✅ **Stat** - Statistics/numbers
- ✅ **Page Section** - Dynamic page sections
- ✅ **Shipping Option** - Shipping options
- ✅ **Order** - Customer orders (admin only)
- ✅ **Discount** - Discount codes (admin only)

### Single Types:
- Should show any single types you've created (like Hero Section)

### Settings:
- ✅ **Content-Type Builder** - Create new content types
- ✅ **Roles** - Manage permissions
- ✅ **API Tokens** - Create API tokens

## 🔍 If Content Types Still Don't Appear

### Option 1: Run the Fix Script (Recommended)
```powershell
cd apps\cms
node scripts/fix-admin-permissions.js
```

Then restart Strapi:
```powershell
npm run develop
```

### Option 2: Manual Fix via Admin Panel

1. Go to **Settings** → **Roles** → **Super Admin**
2. Click **Permissions** tab
3. Expand each content type section
4. Enable all permissions (Create, Read, Update, Delete, Publish)
5. Click **Save**

### Option 3: Check Database Connection

Make sure your `.env` file has correct database credentials:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

Test connection:
```powershell
cd apps\cms
npm run strapi -- admin:create-user
```

## 🎯 Creating Hero Section (from QUICK_FIX_STEPS.md)

Once you can see all content types:

1. Click **Content-Type Builder** in left sidebar
2. Click **"+ Create new single type"**
3. Enter:
   - **Display name:** `Hero Section`
   - **API ID (singular):** `hero-section`
   - **API ID (plural):** `hero-sections`
4. Add all 12 fields as described in `QUICK_FIX_STEPS.md`
5. Click **Save**
6. Strapi will reload
7. You should see **Hero Section** in the sidebar under **Single Types**

## 🐛 Troubleshooting

### Issue: "Permission denied" errors
**Solution:** Make sure you're logged in as a Super Admin user, not a regular user.

### Issue: Content types exist but show 0 items
**Solution:** This is normal for new content types. Click on the content type and click **"Create new entry"**.

### Issue: Bootstrap script errors
**Solution:** Check database connection. The bootstrap script runs automatically on startup and sets permissions.

### Issue: Strapi won't start
**Solution:** 
1. Check database is running: `pg_isready -U postgres`
2. Check `.env` file exists and has all required variables
3. Check port 1337 is not in use: `netstat -ano | findstr :1337`

## 📞 Still Having Issues?

1. Check Strapi logs for errors
2. Verify database connection
3. Ensure all environment variables are set
4. Try deleting `.cache` and `build` folders and restarting

## ✅ Success Checklist

- [ ] Strapi starts without errors
- [ ] Can access `http://localhost:1337/admin/`
- [ ] Can log in as admin
- [ ] See all 11 content types in sidebar
- [ ] Can access Content-Type Builder
- [ ] Can create/edit entries in content types
- [ ] Bootstrap script runs successfully (check console)

---

**Last Updated:** Based on QUICK_FIX_STEPS.md requirements
**Strapi Version:** v4.x
















