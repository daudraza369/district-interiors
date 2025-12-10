# 🚀 Quick Start Strapi

## Step 1: Create Database

**Option A: Using pgAdmin (Easiest)**
1. Open pgAdmin
2. Right-click "Databases" → "Create" → "Database"
3. Name: `district_interiors_cms`
4. Click "Save"

**Option B: Using Command Line**
```bash
# Find your PostgreSQL bin folder (usually: C:\Program Files\PostgreSQL\17\bin)
# Then run:
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "CREATE DATABASE district_interiors_cms;"
```

## Step 2: Update .env Password (if needed)

If your PostgreSQL password is NOT "postgres", edit `apps/cms/.env` and change:
```
DATABASE_PASSWORD=your_actual_password
```

## Step 3: Start Strapi

```bash
cd apps/cms
npm run develop
```

Wait 30-60 seconds, then open: **http://localhost:1337/admin**

## Step 4: Create Admin Account

First time only - create your admin username and password.

---

**If you get errors:**
- Make sure PostgreSQL is running (check Services)
- Make sure database `district_interiors_cms` exists
- Check that password in `.env` matches your PostgreSQL password

