# Install and Setup PostgreSQL for Strapi

## Quick Installation Guide

### Step 1: Download PostgreSQL

1. Go to: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download PostgreSQL 15 or 16 (latest stable version)

### Step 2: Install PostgreSQL

1. **Run the installer** (postgresql-x.x.x-windows-x64.exe)
2. **Installation Directory:** Keep default (usually `C:\Program Files\PostgreSQL\15`)
3. **Select Components:** Keep all checked (especially "Command Line Tools")
4. **Data Directory:** Keep default
5. **Password:** Set a password for the `postgres` superuser
   - **IMPORTANT:** Remember this password! You'll need it for Strapi
   - **Recommended:** Use `postgres` for simplicity (or choose your own)
6. **Port:** Keep default (5432)
7. **Advanced Options:** Keep default locale
8. **Pre Installation Summary:** Click Next
9. **Ready to Install:** Click Next
10. **Completing the Setup:** 
    - Uncheck "Launch Stack Builder" (we don't need it)
    - Click Finish

### Step 3: Verify Installation

1. **Open PowerShell** (as Administrator)
2. **Add PostgreSQL to PATH** (if not already added):
   ```powershell
   $env:Path += ";C:\Program Files\PostgreSQL\15\bin"
   ```
3. **Test connection:**
   ```powershell
   psql -U postgres
   ```
   - Enter the password you set during installation
   - You should see: `postgres=#`
   - Type `\q` to quit

### Step 4: Create Database for Strapi

1. **Connect to PostgreSQL:**
   ```powershell
   psql -U postgres
   ```
   (Enter your password)

2. **Create the database:**
   ```sql
   CREATE DATABASE district_interiors_cms;
   ```

3. **Verify it was created:**
   ```sql
   \l
   ```
   (You should see `district_interiors_cms` in the list)

4. **Exit:**
   ```sql
   \q
   ```

### Step 5: Update Strapi .env File

1. **Open:** `apps/cms/.env`
2. **Update the password:**
   ```
   DATABASE_PASSWORD=your_postgres_password_here
   ```
   (Replace with the password you set during installation)

### Step 6: Test Strapi

```powershell
cd apps\cms
npm run develop
```

## Alternative: Use Chocolatey (Faster)

If you have Chocolatey installed:

```powershell
choco install postgresql15 --params '/Password:postgres'
```

This installs PostgreSQL 15 with password set to `postgres`.

## Troubleshooting

### PostgreSQL Service Not Running

```powershell
# Check service status
Get-Service -Name "*postgres*"

# Start service if stopped
Start-Service postgresql-x64-15
```

### Can't Find psql Command

Add PostgreSQL to your PATH permanently:

1. **Open System Properties:**
   - Press `Win + R`
   - Type: `sysdm.cpl`
   - Click "Environment Variables"

2. **Edit Path:**
   - Under "System variables", find "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\PostgreSQL\15\bin`
   - Click OK on all dialogs

3. **Restart PowerShell**

### Forgot Password

If you forgot the password, you can reset it:

1. **Stop PostgreSQL service:**
   ```powershell
   Stop-Service postgresql-x64-15
   ```

2. **Edit pg_hba.conf:**
   - Location: `C:\Program Files\PostgreSQL\15\data\pg_hba.conf`
   - Find line: `host all all 127.0.0.1/32 md5`
   - Change `md5` to `trust`
   - Save file

3. **Start PostgreSQL:**
   ```powershell
   Start-Service postgresql-x64-15
   ```

4. **Connect without password:**
   ```powershell
   psql -U postgres
   ```

5. **Change password:**
   ```sql
   ALTER USER postgres WITH PASSWORD 'postgres';
   \q
   ```

6. **Revert pg_hba.conf:**
   - Change `trust` back to `md5`
   - Restart PostgreSQL service

## Next Steps

After PostgreSQL is installed and database is created:

1. ✅ Update `apps/cms/.env` with correct password
2. ✅ Start Strapi: `cd apps\cms && npm run develop`
3. ✅ Access admin: http://localhost:1337/admin
















