# 🚀 Deployment Fixes Applied for Coolify

## Issues Fixed

### 1. ✅ Docker Compose Configuration
- **Removed explicit port mapping** for `web` service - Coolify handles port mapping automatically
- **Added `expose` directive** instead of `ports` for internal service communication
- **Added healthcheck** for web service to monitor service health
- **Improved healthcheck** for CMS service with better fallback

### 2. ✅ Next.js Dockerfile Improvements
- **Fixed dependency installation** - Now uses `npm ci` when `package-lock.json` exists (faster, more reliable)
- **Removed verbose error handling** in build step that could mask real issues
- **Standalone output** already configured correctly

### 3. ✅ Strapi Dockerfile Improvements
- **Fixed dependency installation** - Now uses `npm ci` when `package-lock.json` exists
- **Proper error handling** in build process
- **Startup script** properly configured with database wait logic

### 4. ✅ Health Check Endpoint
- **Created `/api/health` endpoint** in Next.js for Docker health checks
- **Updated healthcheck** in docker-compose to use the new endpoint with fallback

## Key Changes Made

### `docker-compose.yml`
```yaml
# Changed from:
ports:
  - "3000:3000"

# To:
expose:
  - "3000"
# Port mapping removed - Coolify handles port mapping automatically
```

### `apps/web/Dockerfile`
```dockerfile
# Improved dependency installation
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi
```

### `apps/cms/Dockerfile`
```dockerfile
# Improved dependency installation
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi
```

### New File: `apps/web/app/api/health/route.ts`
- Simple health check endpoint returning `{ status: 'ok', timestamp: ... }`

## Deployment Checklist

Before deploying to Coolify, ensure:

- [ ] **Environment Variables Set:**
  - `POSTGRES_PASSWORD` - Strong password for PostgreSQL
  - `DATABASE_PASSWORD` - Must match `POSTGRES_PASSWORD`
  - `APP_KEYS` - Comma-separated list of 4 base64 keys
  - `API_TOKEN_SALT` - Random base64 string
  - `ADMIN_JWT_SECRET` - Random base64 string
  - `JWT_SECRET` - Random base64 string
  - `TRANSFER_TOKEN_SALT` - Random base64 string
  - `STRAPI_URL` - Public URL for Strapi (e.g., `https://strapi.yourdomain.com`)
  - `CORS_ORIGIN` - Comma-separated list of allowed origins
  - `NEXT_PUBLIC_APP_URL` - Public URL for Next.js app
  - `NEXT_PUBLIC_STRAPI_URL` - Public URL for Strapi API
  - `STRAPI_API_TOKEN` - Created after first deploy in Strapi admin
  - Stripe keys (if using Stripe)

- [ ] **Generate Strapi Secrets:**
  ```bash
  node scripts/generate-strapi-keys.js
  ```
  Copy the output to Coolify environment variables.

- [ ] **Database Configuration:**
  - Ensure `DATABASE_PASSWORD` and `POSTGRES_PASSWORD` match exactly
  - Database name: `district_interiors_cms`
  - Database user: `postgres`
  - Database host: `postgres` (service name in docker-compose)

- [ ] **Coolify Configuration:**
  - Use Docker Compose deployment type
  - Root directory: `/` (root of repository)
  - Compose file: `docker-compose.yml`
  - Coolify will automatically detect services

## Common Deployment Issues & Solutions

### Issue: Build fails with "npm ci" error
**Solution:** Ensure `package-lock.json` files are committed to git. The Dockerfile will fall back to `npm install` if lock file is missing.

### Issue: Services won't start
**Solution:** 
1. Check environment variables are all set
2. Verify `DATABASE_PASSWORD` matches `POSTGRES_PASSWORD`
3. Check logs in Coolify for specific errors

### Issue: Health checks failing
**Solution:**
- Web service: Check `/api/health` endpoint is accessible
- CMS service: Check Strapi is starting properly (may take 2-5 minutes on first start)

### Issue: Port conflicts
**Solution:** Coolify handles port mapping automatically. Don't manually map ports in docker-compose.

### Issue: Database connection errors
**Solution:**
- Verify `DATABASE_HOST=postgres` (service name, not `localhost`)
- Ensure `DATABASE_PASSWORD` matches `POSTGRES_PASSWORD`
- Check PostgreSQL container is healthy before CMS starts

## Post-Deployment Steps

1. **Access Strapi Admin:**
   - Go to your Strapi URL (configured in `STRAPI_URL`)
   - Create admin account on first access
   - Go to Settings → API Tokens → Create new token
   - Copy token and add to Coolify as `STRAPI_API_TOKEN`
   - Redeploy web service

2. **Configure Strapi Permissions:**
   - Settings → Users & Permissions → Roles → Public
   - Enable `find` and `findOne` for all content types
   - Or use the bootstrap script (should run automatically)

3. **Test the Application:**
   - Visit your Next.js app URL
   - Check that data loads from Strapi
   - Test API endpoints

## Environment Variables Reference

See `COOLIFY_ENV_VARS.txt` for a complete list of required environment variables with example values.

## Next Steps

After successful deployment:
1. ✅ Test all functionality
2. ✅ Configure Strapi content types and populate data
3. ✅ Set up Stripe webhooks (if using payments)
4. ✅ Configure custom domains in Coolify
5. ✅ Set up SSL certificates (Coolify handles this automatically)

---

**All deployment fixes have been applied. The project is now ready for Coolify deployment!** 🎉
