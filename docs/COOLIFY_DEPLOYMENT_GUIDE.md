# 🚀 Deploy to Coolify - Docker Compose Guide

## Overview

This project uses a **single Docker Compose stack** that runs:
- **PostgreSQL** (database)
- **Strapi CMS** (backend)
- **Next.js** (frontend)

All services run in one Coolify deployment, making it easier to manage and deploy.

---

## Step 1: Prepare GitHub Repository

✅ **Already done!** Your code is at: `https://github.com/daudraza369/district-interiors`

---

## Step 2: Deploy in Coolify

### 2.1 Create New Compose Application

1. **In Coolify Dashboard:**
   - Go to your project/server
   - Click "New Resource" → "Docker Compose" (or "Compose")
   - Name: `district-interiors`

2. **Connect GitHub:**
   - Select "GitHub Repository"
   - Connect your GitHub account (if not already)
   - Select repository: `daudraza369/district-interiors`
   - Branch: `main`
   - Root Directory: `/` (root of repo)

3. **Configure Compose:**
   - Compose File: `docker-compose.yml` (should auto-detect)
   - Coolify will automatically detect the compose file

### 2.2 Set Environment Variables

In Coolify's environment variables section, set:

**PostgreSQL:**
```env
POSTGRES_PASSWORD=your_strong_password_here
```

**Strapi Secrets** (generate using: `node scripts/generate-strapi-keys.js`):
```env
APP_KEYS=base64key1,base64key2,base64key3,base64key4
API_TOKEN_SALT=base64_salt_here
ADMIN_JWT_SECRET=base64_secret_here
TRANSFER_TOKEN_SALT=base64_salt_here
JWT_SECRET=base64_secret_here
```

**Strapi URLs:**
```env
STRAPI_URL=https://strapi.yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

**Next.js:**
```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_STRAPI_URL=https://strapi.yourdomain.com
```

**Strapi API Token** (create after first deploy):
```env
STRAPI_API_TOKEN=your_strapi_api_token
```

**Stripe:**
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2.3 Configure Ports & Domains

1. **Map Public Port:**
   - Coolify will automatically map port `3000` (web service) to public traffic
   - You can configure this in Coolify's port settings

2. **Add Domains:**
   - **Main Site:** Add your domain → `yourdomain.com` → points to `web:3000`
   - **Strapi Admin (Optional):** Add subdomain → `strapi.yourdomain.com` → points to `cms:1337`
   - Coolify will auto-configure SSL (Let's Encrypt)

### 2.4 Deploy

1. Click "Deploy" or "Save & Deploy"
2. Coolify will:
   - Clone your repo
   - Build Docker images for `cms` and `web`
   - Pull PostgreSQL image
   - Start all services
   - Wait for health checks

3. **Monitor Logs:**
   - Watch the build logs in Coolify
   - Check each service's logs if issues occur

---

## Step 3: Initial Setup

### 3.1 Access Strapi Admin

1. **First Time:**
   - If you exposed Strapi: `https://strapi.yourdomain.com/admin`
   - Or use Coolify's port forwarding: `http://your-server-ip:1337/admin`
   - Create your admin account

2. **Create API Token:**
   - Go to Settings → API Tokens → Create new API Token
   - Name: `Next.js Server`
   - Token type: `Full access` (or custom with read + create Orders)
   - Copy the token

3. **Update Environment:**
   - Add `STRAPI_API_TOKEN` to Coolify environment variables
   - Redeploy `web` service (or restart)

### 3.2 Configure Strapi Permissions

1. **Go to Strapi Admin:** Settings → Users & Permissions Plugin → Roles → Public
2. **Enable permissions:**
   - ✅ Product: `find`, `findOne`
   - ✅ Category: `find`, `findOne`
   - ✅ Service: `find`, `findOne`
   - ✅ Project: `find`, `findOne`
   - ✅ Testimonial: `find`, `findOne`
   - ✅ ClientLogo: `find`, `findOne`
   - ✅ Stat: `find`, `findOne`
   - ✅ PageSection: `find`, `findOne`
   - ✅ ShippingOption: `find`, `findOne`
   - ❌ Order: No permissions (server-only)
   - ❌ Discount: No permissions (server-only)

**OR** - Your bootstrap script should handle this automatically on first start.

### 3.3 Configure Stripe Webhook

1. **In Stripe Dashboard:**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`
   - Copy webhook signing secret

2. **Update Environment:**
   - Add `STRIPE_WEBHOOK_SECRET` to Coolify env vars
   - Redeploy `web` service

---

## Architecture

```
┌─────────────────────────────────────────┐
│      Coolify Docker Compose Stack       │
│                                           │
│  ┌──────────────┐    ┌──────────────┐   │
│  │   Next.js    │    │    Strapi    │   │
│  │   (web)      │    │    (cms)     │   │
│  │   Port 3000  │    │   Port 1337  │   │
│  └──────┬───────┘    └──────┬───────┘   │
│         │                   │           │
│         │                   │           │
│         └──────────┬────────┘           │
│                    │                     │
│              ┌─────▼─────┐              │
│              │ PostgreSQL│              │
│              │ (postgres)│              │
│              │ Port 5432 │              │
│              └───────────┘              │
│                                           │
│  Volumes:                                 │
│  - postgres_data (persistent)            │
│  - strapi_uploads (media files)          │
│  - strapi_data (temp files)              │
│                                           │
└─────────────────────────────────────────┘
```

**Service Communication:**
- `web` → `cms:1337` (internal network)
- `cms` → `postgres:5432` (internal network)
- Public traffic → `web:3000` (exposed port)

---

## Environment Variables Reference

### Required for Production

```env
# PostgreSQL
POSTGRES_PASSWORD=strong_password

# Strapi Secrets (generate secure keys)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=salt
ADMIN_JWT_SECRET=secret
TRANSFER_TOKEN_SALT=salt
JWT_SECRET=secret

# URLs
STRAPI_URL=https://strapi.yourdomain.com
CORS_ORIGIN=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_STRAPI_URL=https://strapi.yourdomain.com

# Strapi API Token (create in admin)
STRAPI_API_TOKEN=token

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Optional

```env
# Override defaults
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
```

---

## Troubleshooting

### Services Won't Start

1. **Check Logs:**
   - View logs for each service in Coolify
   - Look for connection errors, missing env vars, build failures

2. **Database Connection:**
   - Verify `POSTGRES_PASSWORD` is set
   - Check `cms` service can reach `postgres:5432`
   - Ensure PostgreSQL health check passed

3. **Build Failures:**
   - Check Node.js version (should be 20)
   - Verify all dependencies in package.json
   - Check build logs for specific errors

### Strapi Can't Connect to Database

- Verify `DATABASE_HOST=postgres` (service name, not localhost)
- Check `DATABASE_PASSWORD` matches `POSTGRES_PASSWORD`
- Ensure PostgreSQL container is healthy

### Next.js Can't Connect to Strapi

- Verify `NEXT_PUBLIC_STRAPI_URL` (use `http://cms:1337` for internal, public URL for browser)
- Check CORS settings in Strapi
- Verify API token is valid

### Port Conflicts

- Ensure port 3000 is available for `web` service
- Port 1337 for `cms` is internal only (not exposed to host)
- Port 5432 for `postgres` is internal only

---

## Updating & Redeploying

1. **Push Changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update..."
   git push
   ```

2. **In Coolify:**
   - Click "Redeploy" or "Deploy"
   - Coolify will pull latest code and rebuild

3. **Environment Changes:**
   - Update env vars in Coolify
   - Restart affected services

---

## Backup & Restore

### Backup PostgreSQL

```bash
# In Coolify, use port forwarding or exec into container
docker exec district-interiors-postgres pg_dump -U postgres district_interiors_cms > backup.sql
```

### Backup Strapi Uploads

```bash
# Copy volume data
docker cp district-interiors-cms:/app/public/uploads ./backup/uploads
```

### Restore

```bash
# Restore database
docker exec -i district-interiors-postgres psql -U postgres district_interiors_cms < backup.sql

# Restore uploads
docker cp ./backup/uploads district-interiors-cms:/app/public/uploads
```

---

## Security Best Practices

1. **Use Strong Passwords:** Generate secure `POSTGRES_PASSWORD`
2. **Generate Secure Keys:** Use `node scripts/generate-strapi-keys.js` for Strapi secrets
3. **Enable SSL:** Coolify auto-configures SSL for domains
4. **Restrict API Tokens:** Only give necessary permissions to Strapi API tokens
5. **Keep Updated:** Regularly update dependencies and rebuild
6. **Monitor Logs:** Check logs for suspicious activity

---

## Cost Optimization

- **Single Stack:** All services run in one Coolify deployment
- **Shared Network:** Services communicate internally (no external API calls)
- **Persistent Volumes:** Data survives container restarts
- **Resource Limits:** Set CPU/memory limits in Coolify if needed

---

## Quick Checklist

- [ ] Repository pushed to GitHub
- [ ] Coolify Compose app created
- [ ] Environment variables set
- [ ] Deployed successfully
- [ ] Strapi admin account created
- [ ] Strapi API token created and added to env
- [ ] Strapi permissions configured
- [ ] Stripe webhook configured
- [ ] Domains added and SSL enabled
- [ ] Tested full flow (cart → checkout → webhook)

---

**Ready to deploy?** Follow the steps above and you'll have a production-ready stack running in Coolify! 🚀
