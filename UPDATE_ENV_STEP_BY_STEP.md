# 📝 Step-by-Step: Update Environment Variables

## Quick Answer: Use Coolify UI (Easiest)

**If you have access to Coolify dashboard:**
1. Login → Select Project → Environment Variables
2. Remove Strapi vars, add Payload vars
3. Save → Redeploy

**If you MUST use SSH, follow commands below:**

---

## SSH Commands (One by One)

### 1. Connect to Server
```bash
ssh your-username@your-server-ip
```

### 2. Find Project Location
```bash
find /data -name "*district*" -type d 2>/dev/null | head -5
```

### 3. Navigate to Project
```bash
cd /data/coolify/projects/YOUR_PROJECT_ID
# OR wherever your project is located
```

### 4. Check Current Env Vars
```bash
cat .env 2>/dev/null || echo "No .env file found"
```

### 5. Generate PAYLOAD_SECRET
```bash
openssl rand -hex 32
```
**Copy this value - you'll need it!**

### 6. Backup Current .env
```bash
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
```

### 7. Remove Strapi Variables
```bash
sed -i '/STRAPI_API_TOKEN/d' .env
sed -i '/NEXT_PUBLIC_STRAPI_URL/d' .env
sed -i '/STRAPI_URL/d' .env
```

### 8. Add Payload Variables
```bash
# Replace YOUR_SECRET with the value from step 5
echo "PAYLOAD_SECRET=YOUR_SECRET" >> .env

# Add DATABASE_URL if not exists (or use individual DB vars)
# Check if DATABASE_URL exists first
grep -q "DATABASE_URL" .env || echo "DATABASE_URL=postgresql://user:pass@host:5432/dbname" >> .env
```

### 9. Verify Changes
```bash
cat .env | grep -E "(PAYLOAD|STRAPI|DATABASE)"
```

### 10. Restart Service
```bash
# If using docker-compose
docker-compose restart web

# OR trigger Coolify redeploy
# (Better to do this via Coolify UI)
```

---

## ⚠️ Important Notes

1. **Coolify might overwrite** manual .env changes
2. **Better to use Coolify UI** - changes persist
3. **After changes, redeploy** in Coolify dashboard

---

## ✅ Recommended: Coolify UI Method

1. Login to Coolify
2. Go to your project
3. Click "Environment Variables"
4. Remove: `STRAPI_API_TOKEN`, `NEXT_PUBLIC_STRAPI_URL`, `STRAPI_URL`
5. Add: `PAYLOAD_SECRET` (use generated value)
6. Save
7. Click "Redeploy"

**This is the safest and recommended method!**

