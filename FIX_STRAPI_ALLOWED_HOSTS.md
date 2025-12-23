# Fix Strapi AllowedHosts Error

## Problem
Strapi admin panel shows: "Blocked request. This host ("admin.districtflowers.com") is not allowed."

## Solution

### Option 1: Add Environment Variable (Recommended - No Container Access Needed)

In Coolify, add this environment variable to your Strapi service:

```
HOST=0.0.0.0
```

If that doesn't work, try:

```
ADMIN_URL=https://admin.districtflowers.com
```

Then restart the Strapi service in Coolify.

---

### Option 2: Create Vite Config via Container Access

If Option 1 doesn't work, SSH into your server and run these commands:

#### Step 1: Find the Strapi container name

```bash
docker ps | grep strapi
```

This will show something like: `strapi-hckkwgs40ogsccsgks8sow80` or similar.

#### Step 2: Access the container

```bash
docker exec -it <container-name> sh
```

Replace `<container-name>` with the actual container name from Step 1.

#### Step 3: Navigate to admin directory and check structure

```bash
cd /app
ls -la
```

Look for `src/admin` or `admin` directory. Then:

```bash
cd src/admin  # or just 'cd admin' depending on structure
ls -la
```

#### Step 4: Create vite.config.js file

```bash
cat > vite.config.js << 'EOF'
const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['admin.districtflowers.com', 'localhost'],
      host: '0.0.0.0',
    },
  });
};
EOF
```

#### Step 5: Exit and restart container

```bash
exit
```

Then restart the Strapi service in Coolify dashboard.

---

### Option 3: Use Environment Variable in Coolify (Alternative)

Add these environment variables to your Strapi service in Coolify:

```
PUBLIC_URL=https://admin.districtflowers.com
HOST=0.0.0.0
```

---

### Option 4: Switch to Production Mode (Best for Production)

If you're in production, you should use the production Strapi image instead of development:

In Coolify, change the Strapi image from:
- `elestio/strapi-development:latest`

To:
- `elestio/strapi:latest` (or `strapi/strapi:latest`)

Production mode doesn't use Vite dev server, so this error won't occur.

---

## Quick Fix Commands (Run on Server)

```bash
# 1. Find container
CONTAINER=$(docker ps | grep strapi | awk '{print $1}')

# 2. Create vite config
docker exec $CONTAINER sh -c "cat > /app/src/admin/vite.config.js << 'EOF'
const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['admin.districtflowers.com', 'localhost'],
      host: '0.0.0.0',
    },
  });
};
EOF"

# 3. Restart via Coolify or:
docker restart $CONTAINER
```

---

## Verify Fix

1. Restart Strapi service in Coolify
2. Wait for it to become healthy
3. Access `https://admin.districtflowers.com`
4. The error should be gone




