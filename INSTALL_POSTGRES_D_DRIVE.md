# Install PostgreSQL to Drive D

## Option 1: Install to D Drive with Custom Location

Run this command from PowerShell (any folder):

```powershell
winget install PostgreSQL.PostgreSQL.15 --location "D:\PostgreSQL\15"
```

**OR** if that doesn't work, use:

```powershell
winget install PostgreSQL.PostgreSQL.15 --override "/INSTALLDIR=D:\PostgreSQL\15"
```

## Option 2: Manual Installation to D Drive

If winget doesn't support custom path, download and install manually:

1. **Download PostgreSQL:**
   - Go to: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Download PostgreSQL 15.x for Windows x86-64

2. **Run Installer:**
   - Double-click the downloaded file
   - When asked for **Installation Directory**, change it to:
     ```
     D:\PostgreSQL\15
     ```
   - **Password:** Set to `postgres`
   - Click Next → Next → Finish

3. **After Installation:**
   - PostgreSQL will be at: `D:\PostgreSQL\15`
   - Bin folder: `D:\PostgreSQL\15\bin`

## Option 3: Portable PostgreSQL (Easiest for D Drive)

Download portable version and extract to D drive:

1. **Create folder:**
   ```powershell
   mkdir D:\PostgreSQL
   ```

2. **Download portable PostgreSQL** (if available) or use regular installer with custom path

## After Installation

Once installed to D drive, I'll help you:
1. Create the database
2. Update .env file
3. Start Strapi

**Tell me when installation is done!**
















