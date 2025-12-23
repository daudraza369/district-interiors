# Fix Strapi Login Issue - Secure Cookie Problem

## Problem
Strapi shows: "Cannot send secure cookie over unencrypted connection" and login fails.

## Root Cause
Strapi is behind a reverse proxy (Coolify) that handles HTTPS, but Strapi doesn't know it's receiving HTTPS requests.

## Solution: Configure Strapi Server Config

We need to tell Strapi to trust the proxy and use HTTPS. This requires modifying the server configuration file.

### Step 1: Find the server config file

```bash
docker exec d4737258e037 find /opt/app -name "server.js" -o -name "server.ts" | head -5
```

### Step 2: Check if config/server.js exists

```bash
docker exec d4737258e037 ls -la /opt/app/config/server.js
```

If it exists, we'll modify it. If not, we'll create it.

### Step 3: Create or modify server.js

The config needs to:
1. Set `url` to the HTTPS URL
2. Configure proxy trust
3. Enable secure cookies

```bash
docker exec d4737258e037 cat /opt/app/config/server.js 2>/dev/null || echo "File does not exist"
```

If file doesn't exist, we'll create it. If it exists, we'll modify it.

## Alternative: Environment Variable Approach

If modifying config doesn't work, we can try setting environment variables via Coolify:

1. `PUBLIC_URL=https://admin.districtflowers.com`
2. `HOST=0.0.0.0`
3. `PORT=1337`

Then restart.




