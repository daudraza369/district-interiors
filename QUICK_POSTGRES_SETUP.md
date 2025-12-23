# Quick PostgreSQL Setup for Strapi

## Option 1: Install PostgreSQL (Recommended for Local Development)

### Step-by-Step Installation

1. **Download PostgreSQL:**
   - Go to: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Download **PostgreSQL 15.x** for Windows x86-64
   - File: `postgresql-15.x-windows-x64.exe` (about 200MB)

2. **Run Installer:**
   - Double-click the downloaded file
   - Click "Next" through the welcome screen
   - **Installation Directory:** Keep default (`C:\Program Files\PostgreSQL\15`)
   - **Select Components:** Keep all checked ✅
   - **Data Directory:** Keep default
   - **Password:** ⚠️ **IMPORTANT** - Set password to: `postgres` (or remember what you set)
   - **Port:** Keep default (5432)
   - **Advanced Options:** Keep default
   - Click "Next" → "Next" → "Next" → "Finish"

3. **After Installation:**
   - Run the setup script:
     ```powershell
     cd d:\district-interiors-bloom-main
     .\setup-postgresql.ps1
     ```
   - Enter the password you set during installation
   - The script will create the database and update your .env file

4. **Start Strapi:**
   ```powershell
   cd apps\cms
   npm run develop
   ```

## Option 2: Use Docker (Easier, No Installation Needed)

If you have Docker Desktop installed, you can use Docker instead:

```powershell
# Start PostgreSQL in Docker
docker run --name district-postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=district_interiors_cms `
  -p 5432:5432 `
  -d postgres:15

# Wait a few seconds for it to start
Start-Sleep -Seconds 5

# Update .env file
cd apps\cms
(Get-Content .env) -replace 'DATABASE_PASSWORD=.*', 'DATABASE_PASSWORD=postgres' | Set-Content .env

# Start Strapi
npm run develop
```

## Option 3: Use SQLite (Simplest, No Installation)

If you want to avoid PostgreSQL entirely, you can use SQLite for local development:

1. **Install SQLite driver:**
   ```powershell
   cd apps\cms
   npm install better-sqlite3
   ```

2. **Update database config** (`apps/cms/config/database.ts`):
   ```typescript
   export default ({ env }) => ({
     connection: {
       client: 'sqlite',
       connection: {
         filename: env('DATABASE_FILENAME', '.tmp/data.db'),
       },
       useNullAsDefault: true,
     },
   });
   ```

3. **Update .env** (`apps/cms/.env`):
   ```
   DATABASE_CLIENT=sqlite
   # Remove DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD
   ```

4. **Start Strapi:**
   ```powershell
   npm run develop
   ```

## Recommended: Option 1 (PostgreSQL)

For production-like local development, use PostgreSQL:

1. **Download and install** (see steps above)
2. **Run setup script:**
   ```powershell
   .\setup-postgresql.ps1
   ```
3. **Start Strapi:**
   ```powershell
   cd apps\cms
   npm run develop
   ```

## Troubleshooting

### PostgreSQL Service Not Running
```powershell
# Check status
Get-Service -Name "*postgres*"

# Start if stopped
Start-Service postgresql-x64-15
```

### Can't Connect
- Make sure PostgreSQL service is running
- Check password is correct
- Try: `psql -U postgres` (enter password when prompted)

### Port 5432 Already in Use
- Another PostgreSQL instance might be running
- Stop it or change the port in PostgreSQL config

## Next Steps

After PostgreSQL is set up:
1. ✅ Database created: `district_interiors_cms`
2. ✅ .env file updated with password
3. ✅ Start Strapi: `cd apps\cms && npm run develop`
4. ✅ Access: http://localhost:1337/admin
















