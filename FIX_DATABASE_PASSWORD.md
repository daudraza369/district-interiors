# Fix Database Password Authentication Error

## The Problem
PostgreSQL was created with a different password than what's in your environment variables.

## Solution: Reset PostgreSQL Volume

**⚠️ WARNING: This will DELETE all database data. Only do this if you don't have important data yet.**

### Option 1: Delete PostgreSQL Volume (Fresh Start)

Run these commands on your server:

```bash
# Stop all containers
docker compose -f /path/to/docker-compose.yml down

# Find and remove the PostgreSQL volume
docker volume ls | grep postgres
docker volume rm <volume-name>

# Or remove all volumes for this project
docker volume prune -f
```

Then redeploy in Coolify - PostgreSQL will be recreated with the correct password.

### Option 2: Change Password in PostgreSQL (Keep Data)

If you have data you want to keep:

```bash
# Connect to PostgreSQL container
docker exec -it $(docker ps -a | grep postgres | head -1 | awk '{print $1}') psql -U postgres

# Inside PostgreSQL, change the password:
ALTER USER postgres WITH PASSWORD 'ChangeThis_DB_!94';
\q
```

### Option 3: Update Environment Variables to Match Existing Password

If PostgreSQL already has a password set, update your Coolify environment variables to match it.

## Quick Fix (Recommended for Fresh Setup)

Since this is a new deployment, the easiest fix is:

1. **In Coolify:** Stop the deployment
2. **On Server:** Run:
   ```bash
   docker volume ls | grep postgres
   docker volume rm <postgres-volume-name>
   ```
3. **In Coolify:** Redeploy - PostgreSQL will be created fresh with the correct password

