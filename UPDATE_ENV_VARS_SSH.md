# 🔧 Update Environment Variables via SSH

## ⚠️ Important Note

**Recommended:** Use Coolify UI (Settings → Environment Variables) - it's safer and persistent.

**SSH Method:** Only if you can't access Coolify UI. Changes might be overwritten on next deployment.

---

## Method 1: Via Coolify UI (RECOMMENDED)

1. Go to your Coolify dashboard
2. Select your frontend project
3. Go to "Environment Variables" or "Settings"
4. Remove Strapi vars, add Payload vars
5. Save and redeploy

---

## Method 2: Via SSH (If UI not available)

### Step 1: Connect to your server
```bash
ssh your-username@your-server-ip
```

### Step 2: Find your Coolify project directory
```bash
# Coolify usually stores projects in /data/coolify or similar
ls -la /data/coolify/projects/
# OR
find /data -name "district-interiors" -type d 2>/dev/null
```

### Step 3: Check current environment variables
```bash
# Navigate to your project directory
cd /path/to/your/project

# Check if there's a .env file
cat .env

# Or check Docker Compose file
cat docker-compose.yml | grep -A 20 "environment:"
```

### Step 4: Update environment variables

**Option A: If using .env file**
```bash
# Backup first
cp .env .env.backup

# Remove Strapi vars
sed -i '/STRAPI_API_TOKEN/d' .env
sed -i '/NEXT_PUBLIC_STRAPI_URL/d' .env
sed -i '/STRAPI_URL/d' .env

# Add Payload vars (replace with your actual values)
echo "PAYLOAD_SECRET=your-generated-secret-here" >> .env
echo "DATABASE_URL=postgresql://username:password@host:port/database" >> .env
```

**Option B: If using Coolify's database**
```bash
# Coolify stores env vars in PostgreSQL
# Connect to Coolify's database
sudo -u postgres psql coolify

# Then run SQL commands (get project ID first)
SELECT id, name FROM projects WHERE name LIKE '%district%';

# Update environment variables (replace PROJECT_ID with actual ID)
UPDATE project_environment_variables 
SET value = 'your-payload-secret' 
WHERE project_id = PROJECT_ID AND key = 'PAYLOAD_SECRET';

# Exit PostgreSQL
\q
```

### Step 5: Generate PAYLOAD_SECRET
```bash
# Generate secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# OR if node not available:
openssl rand -hex 32
```

### Step 6: Restart the service
```bash
# If using Docker Compose directly
cd /path/to/project
docker-compose down
docker-compose up -d

# OR if managed by Coolify, trigger redeploy via API or UI
```

---

## ⚠️ Warnings

1. **Coolify might overwrite** manual changes on next deployment
2. **Backup first** before making changes
3. **Test after changes** to ensure everything works

---

## ✅ Recommended: Use Coolify UI

The safest way is through Coolify's web interface:
1. Login to Coolify
2. Select your project
3. Go to Environment Variables
4. Add/Remove variables
5. Save and redeploy

This ensures changes persist and are version-controlled by Coolify.

