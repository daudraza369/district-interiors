# 🐘 Connecting Strapi to PostgreSQL in Coolify

Yes! You can absolutely run PostgreSQL in Coolify and connect your Strapi CMS to it.

## Step 1: Install PostgreSQL in Coolify

1. **In Coolify Dashboard:**
   - Go to your project/server
   - Click "New Resource" or "Add Service"
   - Select "PostgreSQL" (or "Database" → "PostgreSQL")
   - Choose PostgreSQL version (14+ recommended)
   - Set resource name: `district-interiors-db` (or any name)

2. **Configure PostgreSQL:**
   - **Database Name:** `district_interiors_cms` (or let Coolify create it)
   - **Username:** `postgres` (or custom)
   - **Password:** Set a strong password (save this!)
   - **Port:** Usually `5432` (Coolify will assign if needed)

3. **Deploy/Start PostgreSQL:**
   - Click "Deploy" or "Start"
   - Wait for PostgreSQL to be running
   - Note the **internal connection details** (for services in same Coolify network)

## Step 2: Get Connection Details from Coolify

After PostgreSQL is running, you'll see:

**For services in the same Coolify network (internal):**
- **Host:** `district-interiors-db` (service name) or `postgres` (if using default)
- **Port:** `5432` (usually)
- **Database:** `district_interiors_cms`
- **Username:** `postgres` (or what you set)
- **Password:** (the one you set)

**For external connections (from your local machine):**
- **Host:** Your Coolify server IP or domain
- **Port:** The exposed port (if you exposed it)
- **Database:** `district_interiors_cms`
- **Username:** `postgres`
- **Password:** (the one you set)

## Step 3: Update Strapi .env File

Edit `apps/cms/.env` and update the database section:

```env
# Database Configuration (Coolify PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-coolify-server-ip-or-domain
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_coolify_postgres_password
DATABASE_SSL=true
```

**Important Notes:**
- If connecting from **local machine** to Coolify: Use external IP/domain
- If connecting from **Strapi in Coolify** to PostgreSQL in Coolify: Use internal service name
- Set `DATABASE_SSL=true` for secure connections
- Make sure the port is accessible (Coolify may expose it differently)

## Step 4: Test Connection

1. **Start Strapi locally:**
   ```bash
   cd apps/cms
   npm run develop
   ```

2. **Check for errors:**
   - If connection fails, verify:
     - PostgreSQL is running in Coolify
     - Port is accessible from your network
     - Password is correct
     - Database exists

## Step 5: Deploy Strapi to Coolify (Optional)

If you want to run Strapi in Coolify too:

1. **Create Strapi Service in Coolify:**
   - Add new service → "Docker Compose" or "Node.js"
   - Point to your `apps/cms` directory
   - Set environment variables (use Coolify's env editor)

2. **Use Internal Connection:**
   ```env
   DATABASE_HOST=district-interiors-db  # Internal service name
   DATABASE_PORT=5432
   DATABASE_NAME=district_interiors_cms
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_SSL=false  # Internal connections usually don't need SSL
   ```

3. **Set Other Strapi Env Vars:**
   ```env
   HOST=0.0.0.0
   PORT=1337
   PUBLIC_URL=https://your-strapi-domain.com
   APP_KEYS=key1,key2,key3,key4
   API_TOKEN_SALT=...
   ADMIN_JWT_SECRET=...
   TRANSFER_TOKEN_SALT=...
   JWT_SECRET=...
   CORS_ORIGIN=https://your-nextjs-domain.com
   ```

## Troubleshooting

**Connection Refused:**
- Check if PostgreSQL port is exposed in Coolify
- Verify firewall rules
- Try internal service name if both in Coolify

**Authentication Failed:**
- Double-check username and password
- Verify database exists
- Check PostgreSQL logs in Coolify

**SSL Error:**
- Set `DATABASE_SSL=false` for internal connections
- Set `DATABASE_SSL=true` for external connections
- May need to configure SSL certificates in Coolify

## Security Best Practices

1. **Use Strong Passwords:** Generate a secure password for PostgreSQL
2. **Limit Access:** Only expose PostgreSQL port if needed externally
3. **Use SSL:** Enable SSL for external connections
4. **Network Isolation:** Keep database in private network if possible
5. **Backup:** Set up regular backups in Coolify

## Quick Reference

**Local Strapi → Coolify PostgreSQL:**
```env
DATABASE_HOST=your-coolify-ip
DATABASE_PORT=5432
DATABASE_SSL=true
```

**Coolify Strapi → Coolify PostgreSQL (Internal):**
```env
DATABASE_HOST=postgres-service-name
DATABASE_PORT=5432
DATABASE_SSL=false
```

---

**Need Help?**
- Check Coolify logs for PostgreSQL service
- Verify network connectivity
- Test connection with `psql` or database client
- Check Strapi logs for connection errors

