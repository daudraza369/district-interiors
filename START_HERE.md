# 🚀 Start Here - PostgreSQL Setup for Strapi

## You Need PostgreSQL to Run Strapi Locally

Since you don't have PostgreSQL installed, here are your options:

## ✅ EASIEST: Install PostgreSQL (5 minutes)

### Quick Steps:

1. **Download PostgreSQL:**
   - Visit: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Click "Download" for **PostgreSQL 15.x** (Windows x86-64)
   - File size: ~200MB

2. **Install:**
   - Run the installer
   - Click Next → Next → Next
   - **When asked for password:** Enter `postgres` (or remember what you set)
   - Click Next → Next → Finish

3. **Run Setup Script:**
   ```powershell
   cd d:\district-interiors-bloom-main
   .\setup-postgresql.ps1
   ```
   - Enter the password you set (or `postgres` if you used that)

4. **Start Strapi:**
   ```powershell
   cd apps\cms
   npm run develop
   ```

5. **Open Browser:**
   - Go to: http://localhost:1337/admin
   - Create your admin account

## 🐳 ALTERNATIVE: Use Docker (If You Have Docker Desktop)

If Docker Desktop is installed and running:

```powershell
# Start PostgreSQL container
docker run --name district-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=district_interiors_cms -p 5432:5432 -d postgres:15

# Update .env
cd apps\cms
(Get-Content .env) -replace 'DATABASE_PASSWORD=.*', 'DATABASE_PASSWORD=postgres' | Set-Content .env

# Start Strapi
npm run develop
```

## 📋 What's Already Done

✅ `public/uploads` directory created  
✅ Dependencies installed  
✅ Node.js ready  
✅ .env file configured  
✅ All code fixes applied  

## ⚠️ What You Need to Do

1. **Install PostgreSQL** (see steps above)
2. **Run setup script** to create database
3. **Start Strapi**

## 📚 Detailed Guides

- **Full Installation Guide:** See `INSTALL_POSTGRESQL.md`
- **Quick Setup:** See `QUICK_POSTGRES_SETUP.md`
- **Troubleshooting:** See `LOCAL_FIX_SUMMARY.md`

## 🎯 After Setup

Once PostgreSQL is installed and database is created:

```powershell
cd apps\cms
npm run develop
```

Then open: **http://localhost:1337/admin**

---

**Need Help?** Check the troubleshooting sections in the guides above.
















