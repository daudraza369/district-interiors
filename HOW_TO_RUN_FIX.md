# 🚀 How to Run the Strapi Admin Fix

## Quick Method (PowerShell Script)

### Step 1: Open PowerShell
Open PowerShell in the project root directory:
```
d:\district-interiors-bloom-main
```

### Step 2: Run the Script
```powershell
.\fix-strapi-admin.ps1
```

### If You Get Execution Policy Error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run the script again.

---

## Manual Method (If Script Doesn't Work)

### Step 1: Open PowerShell/Terminal
Navigate to the project root:
```powershell
cd d:\district-interiors-bloom-main
```

### Step 2: Navigate to CMS Directory
```powershell
cd apps\cms
```

### Step 3: Clear Cache
```powershell
Remove-Item -Recurse -Force .cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
```

### Step 4: Start Strapi
```powershell
npm run develop
```

---

## What Happens Next

1. **Wait for Strapi to Start**
   - You'll see: `🔍 Verifying admin permissions...`
   - Then: `✅ Admin permissions verified!`
   - Finally: `Server started on http://localhost:1337`

2. **Open Browser**
   - Go to: `http://localhost:1337/admin`
   - Clear browser cache (Ctrl+Shift+Delete) or use Incognito mode

3. **Log In**
   - If first time: Create admin user
   - If already created: Log in with your credentials

4. **Verify**
   - You should see all 11 content types in the sidebar:
     - Category, Product, Service, Project, Testimonial
     - Client Logo, Stat, Page Section, Shipping Option
     - Order, Discount

---

## Troubleshooting

### Script Won't Run
- Make sure you're in the project root directory
- Check PowerShell execution policy (see above)
- Try running manually (see Manual Method)

### Strapi Won't Start
- Check if PostgreSQL is running
- Verify `.env` file exists in `apps/cms/` with correct database credentials
- Check if port 1337 is already in use

### Still Can't See Content Types
- Clear browser cache completely
- Try Incognito/Private mode
- Check console for errors
- See `FIX_STRAPI_ADMIN_ACCESS.md` for detailed troubleshooting

---

## Quick Reference

```powershell
# From project root:
.\fix-strapi-admin.ps1

# Or manually:
cd apps\cms
Remove-Item -Recurse -Force .cache, build, dist -ErrorAction SilentlyContinue
npm run develop
```
















