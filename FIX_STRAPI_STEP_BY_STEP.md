# Fix Strapi AllowedHosts - Step by Step

## Step 1: Find Strapi Container
Run this command:

```bash
docker ps | grep strapi
```

This will show you the Strapi container name/ID. Copy the container ID or name (first column).

---

## Step 2: Check Admin Directory Structure
Replace `<CONTAINER_ID>` with the ID from Step 1:

```bash
docker exec <CONTAINER_ID> ls -la /app
```

Look for either `/app/src/admin` or `/app/admin` directory.

---

## Step 3: Check if vite.config.js already exists
```bash
docker exec <CONTAINER_ID> ls -la /app/src/admin/vite.config.js 2>/dev/null || echo "File does not exist"
```

---

## Step 4: Create vite.config.js file
```bash
docker exec <CONTAINER_ID> sh -c 'cat > /app/src/admin/vite.config.js << "EOF"
const { mergeConfig } = require("vite");

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ["admin.districtflowers.com", "localhost"],
      host: "0.0.0.0",
    },
  });
};
EOF'
```

---

## Step 5: Verify file was created
```bash
docker exec <CONTAINER_ID> cat /app/src/admin/vite.config.js
```

You should see the vite config content printed.

---

## Step 6: Restart Strapi container
```bash
docker restart <CONTAINER_ID>
```

Or restart via Coolify dashboard (recommended).

---

## After Restart
1. Wait 30-60 seconds for Strapi to start
2. Check if container is running: `docker ps | grep strapi`
3. Try accessing: https://admin.districtflowers.com
4. The error should be gone!




