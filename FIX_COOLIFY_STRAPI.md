# 🔧 Fix Strapi Database Issue on Coolify

## The Problem
The PostgreSQL database volume was created with different credentials, causing `FATAL: role "postgres" does not exist` error.

## ✅ Solution: Reset PostgreSQL Volume in Coolify

### Step 1: Stop the Deployment
1. Go to your Coolify dashboard
2. Navigate to your "District Interior site" deployment
3. Click **"Stop"** to stop all services

### Step 2: Delete PostgreSQL Volume (via Coolify Terminal)
1. In Coolify, go to your deployment
2. Click **"Terminal"** tab
3. Run these commands:

```bash
# List all volumes
docker volume ls | grep postgres

# Find the correct volume name (should be something like jggwgwcw4w4gkkkwocokcog8_postgres_data)
# Then delete it:
docker volume rm <volume-name>

# OR delete all postgres volumes for safety:
docker volume prune -f
```

**OR** via Coolify UI:
- Go to your deployment → **"Volumes"** or **"Advanced"**
- Delete the `postgres_data` volume if visible

### Step 3: Ensure Environment Variables Match
In Coolify, verify these match:
- `DATABASE_USERNAME=postgres`
- `DATABASE_PASSWORD=postgres` (or your chosen password)
- `POSTGRES_PASSWORD=postgres` (must match DATABASE_PASSWORD)

### Step 4: Redeploy
1. Click **"Redeploy"** in Coolify
2. PostgreSQL will now initialize fresh with the correct user

## ✅ Alternative: Split Strapi into Separate Deployment

If the monorepo is too complex, you can deploy Strapi separately:

### Step 1: Create New Strapi Deployment in Coolify
1. **New Resource** → **Docker Compose** (or **Source** if you want to deploy from Git)
2. Point to your repo's `apps/cms` directory OR create a separate repo
3. Use `apps/cms/Dockerfile` as the build context
4. Set all Strapi environment variables

### Step 2: Get Strapi URL and API Token
- Strapi URL: `https://your-strapi-domain.com`
- Create API token in Strapi Admin → Settings → API Tokens

### Step 3: Update Frontend Deployment
In your Next.js deployment environment variables:
- `NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com`
- `STRAPI_API_TOKEN=your-api-token-here`

### Pros of Separate Deployment:
✅ Easier to debug (each service independent)
✅ Can scale separately
✅ Simpler Docker setup

### Cons of Separate Deployment:
❌ Two deployments to manage
❌ Need to sync environment variables manually
❌ More complex networking/CORS setup

## 🎯 Recommended: Try Option 1 First

The monorepo approach is actually simpler once working. The issue is just the PostgreSQL volume. Reset it and redeploy - it should work.





