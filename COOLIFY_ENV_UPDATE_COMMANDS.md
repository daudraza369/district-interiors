# 🔧 Coolify Environment Variables Update Commands

## Project Info
- **Name:** District Interior site
- **Repo:** daudraza369/district-interiors:main-boo888sc4oo4gc8g44gcs8g8

---

## Method 1: Via Coolify Database (SSH)

### Step 1: Connect to Server
```bash
ssh your-username@your-server-ip
```

### Step 2: Access Coolify Database
```bash
sudo -u postgres psql coolify
```

### Step 3: Find Your Project ID
```sql
SELECT id, name FROM projects WHERE name LIKE '%District Interior%';
```
**Copy the ID number!**

### Step 4: Check Current Environment Variables
```sql
SELECT key, value FROM project_environment_variables WHERE project_id = YOUR_PROJECT_ID;
```
(Replace YOUR_PROJECT_ID with the ID from Step 3)

### Step 5: Generate PAYLOAD_SECRET
```bash
# Exit PostgreSQL first (if still in it)
\q

# Generate secret
openssl rand -hex 32
```
**Copy this secret value!**

### Step 6: Remove Strapi Variables
```sql
-- Back in PostgreSQL
DELETE FROM project_environment_variables WHERE project_id = YOUR_PROJECT_ID AND key = 'STRAPI_API_TOKEN';
DELETE FROM project_environment_variables WHERE project_id = YOUR_PROJECT_ID AND key = 'NEXT_PUBLIC_STRAPI_URL';
DELETE FROM project_environment_variables WHERE project_id = YOUR_PROJECT_ID AND key = 'STRAPI_URL';
```

### Step 7: Add PAYLOAD_SECRET
```sql
-- Replace YOUR_SECRET with the value from Step 5
INSERT INTO project_environment_variables (project_id, key, value, created_at, updated_at)
VALUES (YOUR_PROJECT_ID, 'PAYLOAD_SECRET', 'YOUR_SECRET', NOW(), NOW())
ON CONFLICT (project_id, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
```

### Step 8: Verify Changes
```sql
SELECT key, value FROM project_environment_variables WHERE project_id = YOUR_PROJECT_ID ORDER BY key;
```

### Step 9: Exit PostgreSQL
```sql
\q
```

### Step 10: Restart/Redeploy Service
```bash
# Find your container
docker ps | grep district

# Restart it (replace CONTAINER_ID)
docker restart CONTAINER_ID

# OR better - trigger redeploy via Coolify
# (Do this in Coolify UI after env var changes)
```

---

## Method 2: Quick Commands (All in One)

```bash
# 1. Connect to server
ssh your-username@your-server-ip

# 2. Generate PAYLOAD_SECRET
PAYLOAD_SECRET=$(openssl rand -hex 32)
echo "Generated PAYLOAD_SECRET: $PAYLOAD_SECRET"

# 3. Access database and update (replace PROJECT_ID)
sudo -u postgres psql coolify -c "
  DELETE FROM project_environment_variables 
  WHERE project_id = PROJECT_ID AND key IN ('STRAPI_API_TOKEN', 'NEXT_PUBLIC_STRAPI_URL', 'STRAPI_URL');
  
  INSERT INTO project_environment_variables (project_id, key, value, created_at, updated_at)
  VALUES (PROJECT_ID, 'PAYLOAD_SECRET', '$PAYLOAD_SECRET', NOW(), NOW())
  ON CONFLICT (project_id, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
"

# 4. Restart container
docker ps | grep district | awk '{print $1}' | xargs docker restart
```

---

## ⚠️ Important Notes

1. **Replace PROJECT_ID** - Get it from Step 3 first!
2. **Replace YOUR_SECRET** - Use the generated value
3. **Better to use Coolify UI** - More reliable and persists better

---

## ✅ RECOMMENDED: Use Coolify UI

**Much easier and safer:**

1. Login to Coolify dashboard
2. Go to "District Interior site" project
3. Click "Environment Variables" or "Settings"
4. Remove:
   - `STRAPI_API_TOKEN`
   - `NEXT_PUBLIC_STRAPI_URL`
   - `STRAPI_URL`
5. Add:
   - `PAYLOAD_SECRET` = (paste generated secret)
6. Click "Save"
7. Click "Redeploy"

**This is the recommended method!**

