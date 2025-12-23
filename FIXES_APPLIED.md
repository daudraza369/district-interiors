# Fixes Applied for Coolify Deployment

## Issues Identified

1. **Healthcheck was too simple** - Only checked if port was open, not if Strapi was actually responding
2. **Database connection** - No connection retry logic or proper timeout handling
3. **Startup errors** - Bootstrap errors could crash Strapi without proper error handling
4. **No startup validation** - Missing environment variable validation and database readiness checks

## Fixes Applied

### 1. Improved Healthcheck (`docker-compose.yml`)
- Changed from simple port check to HTTP endpoint check
- Now checks if Strapi API is actually responding
- Falls back to port check if HTTP check fails
- Increased timeout to 10s for slower responses

**Before:**
```yaml
test: ["CMD-SHELL", "nc -z localhost 1337 || exit 1"]
```

**After:**
```yaml
test: ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:1337/api || nc -z localhost 1337 || exit 1"]
```

### 2. Enhanced Database Configuration (`apps/cms/config/database.ts`)
- Added connection pool timeouts
- Added acquire connection timeout
- Better connection retry logic

**Added:**
- `acquireTimeoutMillis: 30000`
- `createTimeoutMillis: 30000`
- `idleTimeoutMillis: 30000`
- `acquireConnectionTimeout: 60000`

### 3. Improved Bootstrap Error Handling (`apps/cms/src/index.ts`)
- Added 2-second delay before bootstrap to ensure database is ready
- Added better logging for startup process
- Ensured bootstrap errors don't crash Strapi

### 4. Added Startup Script (`apps/cms/start.sh`)
- Validates required environment variables before starting
- Waits for database to be ready
- Provides clear error messages if something is wrong
- Better logging throughout startup process

### 5. Updated Dockerfile (`apps/cms/Dockerfile`)
- Added startup script to Dockerfile
- Made script executable
- Ensures proper permissions

## Testing Locally

### Quick Test

1. **Run the test script:**
   ```powershell
   .\test-local.ps1
   ```

2. **Or manually:**
   ```bash
   docker compose down -v
   docker compose build
   docker compose up -d
   docker compose logs -f cms
   ```

### What to Check

1. **All services are healthy:**
   ```bash
   docker compose ps
   ```
   Should show "healthy" for postgres and cms

2. **CMS is responding:**
   ```bash
   curl http://localhost:1337/api
   ```
   Should return a response (even if it's an error, it means Strapi is running)

3. **Check logs for errors:**
   ```bash
   docker compose logs cms --tail=100
   ```
   Look for:
   - ✅ "Database is ready"
   - ✅ "Environment variables validated"
   - ✅ "Starting Strapi..."
   - ❌ Any error messages

### Expected Behavior

1. **First Run:**
   - PostgreSQL starts and becomes healthy
   - CMS waits for database
   - CMS validates environment variables
   - CMS starts Strapi
   - Strapi creates database tables (if first run)
   - CMS becomes healthy
   - Web starts

2. **Subsequent Runs:**
   - Faster startup (no table creation)
   - Same validation steps

## Deployment to Coolify

Once local testing passes:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Fix: Improve CMS healthcheck and startup reliability"
   git push
   ```

2. **In Coolify:**
   - The deployment will automatically use the new code
   - Monitor the deployment logs
   - Check that CMS becomes healthy

## Troubleshooting

### CMS Still Unhealthy

1. **Check logs in Coolify:**
   - Look for error messages
   - Check if database connection is working
   - Verify environment variables are set

2. **Common Issues:**
   - **Database password mismatch**: Ensure `POSTGRES_PASSWORD` and `DATABASE_PASSWORD` match
   - **Missing environment variables**: Check that all required vars are set in Coolify
   - **Database not ready**: CMS now waits for database, but if it times out, check PostgreSQL logs

### Database Connection Errors

The startup script now waits for the database, but if you see connection errors:

1. **Verify PostgreSQL is running:**
   ```bash
   docker compose ps postgres
   ```

2. **Check database credentials:**
   - Ensure `DATABASE_PASSWORD` matches `POSTGRES_PASSWORD`
   - Verify `DATABASE_HOST` is correct (should be `postgres` in docker-compose)

3. **Reset database (WARNING: Deletes data):**
   ```bash
   docker compose down -v
   docker compose up -d
   ```

## Files Changed

1. `docker-compose.yml` - Improved healthcheck
2. `apps/cms/config/database.ts` - Better connection settings
3. `apps/cms/src/index.ts` - Improved error handling
4. `apps/cms/Dockerfile` - Added startup script
5. `apps/cms/start.sh` - New startup script with validation
6. `test-local.ps1` - New local testing script
7. `LOCAL_TESTING.md` - New testing guide

## Next Steps

1. ✅ Test locally using `test-local.ps1`
2. ✅ Verify all services start and become healthy
3. ✅ Test CMS admin panel at http://localhost:1337/admin
4. ✅ Test web app at http://localhost:3000
5. ✅ Commit and push changes
6. ✅ Redeploy in Coolify
7. ✅ Monitor deployment logs
















