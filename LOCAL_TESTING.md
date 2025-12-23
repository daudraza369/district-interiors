# Local Testing Guide

This guide helps you test the District Interiors application locally before deploying to Coolify.

## Prerequisites

- Docker Desktop installed and running
- PowerShell (Windows) or Bash (Linux/Mac)

## Quick Start

### Windows (PowerShell)

```powershell
.\test-local.ps1
```

### Linux/Mac (Bash)

```bash
# Stop existing containers
docker compose down -v

# Build and start
docker compose build
docker compose up -d

# Check health
docker compose ps

# View logs
docker compose logs -f cms
docker compose logs -f web
```

## Manual Testing Steps

1. **Start Services**
   ```bash
   docker compose up -d
   ```

2. **Check Service Health**
   ```bash
   docker compose ps
   ```
   Wait until all services show "healthy" status.

3. **View Logs**
   ```bash
   # CMS logs
   docker compose logs -f cms
   
   # Web logs
   docker compose logs -f web
   
   # PostgreSQL logs
   docker compose logs -f postgres
   ```

4. **Access Services**
   - CMS Admin: http://localhost:1337/admin
   - Web App: http://localhost:3000
   - API: http://localhost:1337/api

5. **Stop Services**
   ```bash
   docker compose down
   ```

## Troubleshooting

### Services Not Starting

1. **Check Docker is running**
   ```bash
   docker info
   ```

2. **Check for port conflicts**
   - Port 1337 (CMS)
   - Port 3000 (Web)
   - Port 5432 (PostgreSQL)

3. **View detailed logs**
   ```bash
   docker compose logs cms --tail=100
   ```

### Database Connection Issues

If you see database connection errors:

1. **Check PostgreSQL is healthy**
   ```bash
   docker compose ps postgres
   ```

2. **Verify database credentials**
   - Check `.env` file or environment variables
   - Default password: `change_me_in_production`

3. **Reset database (WARNING: Deletes all data)**
   ```bash
   docker compose down -v
   docker compose up -d
   ```

### CMS Not Responding

1. **Check CMS health**
   ```bash
   docker inspect district-interiors-cms | grep -A 10 Health
   ```

2. **Test CMS endpoint**
   ```bash
   curl http://localhost:1337/api
   ```

3. **Check if Strapi is running**
   ```bash
   docker exec district-interiors-cms ps aux | grep node
   ```

## Environment Variables

Create a `.env` file in the root directory with:

```env
POSTGRES_PASSWORD=change_me_in_production
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## First Time Setup

On first run, Strapi will:
1. Connect to PostgreSQL
2. Create database tables
3. Set up default admin user (you'll need to create this via the admin panel)

## Next Steps

Once local testing passes:
1. Commit your changes
2. Push to GitHub
3. Redeploy in Coolify
















