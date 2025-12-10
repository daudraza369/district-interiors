# 🚀 Deploy to Coolify - Complete Guide

## Best Approach: Deploy Your Custom Strapi from GitHub

**Why not use Coolify's Strapi template?**
- You have **11 custom content types** already configured
- You have **custom bootstrap scripts** for permissions
- You have **custom components** and configurations
- Using the template would require rebuilding everything

**Better approach:** Deploy your existing Strapi from GitHub repo.

---

## Step 1: Prepare GitHub Repository

### 1.1 Update .gitignore

Make sure `.gitignore` includes:
```
# Environment files
.env
.env.local
.env.*.local

# Strapi
apps/cms/.env
apps/cms/.tmp
apps/cms/build
apps/cms/dist
apps/cms/.cache

# Next.js
apps/web/.env.local
apps/web/.next
apps/web/out
```

### 1.2 Create .env.example Files

**Create `apps/cms/.env.example`:**
```env
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=token-salt
ADMIN_JWT_SECRET=admin-secret
TRANSFER_TOKEN_SALT=transfer-salt
JWT_SECRET=jwt-secret

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
DATABASE_SSL=false

CORS_ORIGIN=http://localhost:3000
```

**Create `apps/web/.env.example`:**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 1.3 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: District Interiors monorepo"
git branch -M main
git remote add origin https://github.com/yourusername/district-interiors.git
git push -u origin main
```

---

## Step 2: Deploy PostgreSQL in Coolify

1. **In Coolify Dashboard:**
   - Go to your project
   - Click "New Resource" → "PostgreSQL"
   - Version: **14+** (recommended)
   - Resource name: `district-interiors-db`
   - Database name: `district_interiors_cms`
   - Username: `postgres` (or custom)
   - Password: **Set a strong password** (save this!)
   - Click "Deploy"

2. **Wait for PostgreSQL to start**
   - Note the **internal service name** (usually `postgres` or your resource name)
   - Note the **connection details**

---

## Step 3: Deploy Strapi CMS in Coolify

### Option A: Deploy from GitHub (Recommended)

1. **In Coolify:**
   - Click "New Resource" → "GitHub Repository"
   - Connect your GitHub account
   - Select repository: `district-interiors`
   - Branch: `main`

2. **Configure Build:**
   - **Build Pack:** Node.js
   - **Root Directory:** `apps/cms`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Port:** `1337`

3. **Set Environment Variables:**
   ```env
   HOST=0.0.0.0
   PORT=1337
   PUBLIC_URL=https://strapi.yourdomain.com
   
   APP_KEYS=generate-4-random-keys
   API_TOKEN_SALT=generate-random-salt
   ADMIN_JWT_SECRET=generate-random-secret
   TRANSFER_TOKEN_SALT=generate-random-salt
   JWT_SECRET=generate-random-secret
   
   DATABASE_CLIENT=postgres
   DATABASE_HOST=district-interiors-db
   DATABASE_PORT=5432
   DATABASE_NAME=district_interiors_cms
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_postgres_password_from_step2
   DATABASE_SSL=false
   
   CORS_ORIGIN=https://your-nextjs-domain.com
   ```

4. **Generate Secure Keys:**
   Use this command to generate keys:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   Run 4 times for APP_KEYS, and once each for the salts/secrets.

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Access: `https://strapi.yourdomain.com/admin`
   - **First time:** Create admin account

### Option B: Use Coolify's Strapi Template (Not Recommended)

If you use the template, you'll need to:
1. Manually recreate all 11 content types
2. Recreate custom components
3. Reconfigure permissions
4. Recreate bootstrap scripts

**Not worth it** - use Option A instead.

---

## Step 4: Deploy Next.js App in Coolify

1. **In Coolify:**
   - Click "New Resource" → "GitHub Repository"
   - Select same repository: `district-interiors`
   - Branch: `main`

2. **Configure Build:**
   - **Build Pack:** Node.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Port:** `3000`

3. **Set Environment Variables:**
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://strapi.yourdomain.com
   STRAPI_API_TOKEN=your-strapi-api-token
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

4. **Get Strapi API Token:**
   - Go to Strapi admin: `https://strapi.yourdomain.com/admin`
   - Settings → API Tokens → Create new API Token
   - Name: `Next.js Server`
   - Token type: `Full access` (or custom with read + create Orders)
   - Copy the token to Next.js env vars

5. **Deploy:**
   - Click "Deploy"
   - Wait for build
   - Access: `https://yourdomain.com`

---

## Step 5: Configure Strapi Permissions

After Strapi is deployed:

1. **Go to Strapi Admin:** `https://strapi.yourdomain.com/admin`
2. **Settings → Users & Permissions Plugin → Roles → Public**
3. **Enable permissions:**
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

---

## Step 6: Configure Stripe Webhook

1. **In Stripe Dashboard:**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`
   - Copy webhook signing secret

2. **Update Next.js Environment:**
   - Add `STRIPE_WEBHOOK_SECRET` to Coolify env vars
   - Redeploy Next.js app

---

## Step 7: Set Up Domain & SSL

1. **In Coolify:**
   - For Strapi: Add domain → `strapi.yourdomain.com`
   - For Next.js: Add domain → `yourdomain.com`
   - Coolify will auto-configure SSL (Let's Encrypt)

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           Coolify Server                 │
│                                           │
│  ┌──────────────┐    ┌──────────────┐   │
│  │   Next.js    │    │    Strapi    │   │
│  │   (Port 3000)│    │  (Port 1337) │   │
│  └──────┬───────┘    └──────┬───────┘   │
│         │                   │           │
│         │                   │           │
│         └──────────┬────────┘           │
│                    │                     │
│              ┌─────▼─────┐               │
│              │ PostgreSQL│               │
│              │  Database │               │
│              └───────────┘               │
│                                           │
└─────────────────────────────────────────┘
```

---

## Quick Checklist

- [ ] Push code to GitHub
- [ ] Create `.env.example` files
- [ ] Deploy PostgreSQL in Coolify
- [ ] Deploy Strapi from GitHub
- [ ] Set Strapi environment variables
- [ ] Create Strapi admin account
- [ ] Configure Strapi permissions (or verify bootstrap)
- [ ] Create Strapi API token
- [ ] Deploy Next.js from GitHub
- [ ] Set Next.js environment variables
- [ ] Configure Stripe webhook
- [ ] Add domains and SSL
- [ ] Test the full flow

---

## Troubleshooting

**Strapi won't start:**
- Check database connection (internal service name)
- Verify all env vars are set
- Check Strapi logs in Coolify

**Next.js can't connect to Strapi:**
- Verify `NEXT_PUBLIC_STRAPI_URL` is correct
- Check CORS settings in Strapi
- Verify API token is valid

**Database connection fails:**
- Use internal service name for `DATABASE_HOST`
- Verify password is correct
- Check PostgreSQL is running

**Build fails:**
- Check Node.js version (18.x or 20.x)
- Verify all dependencies in package.json
- Check build logs in Coolify

---

## Security Notes

1. **Never commit `.env` files** - use Coolify's env editor
2. **Use strong passwords** for PostgreSQL
3. **Generate secure keys** for Strapi (use crypto.randomBytes)
4. **Enable SSL** for all services
5. **Restrict API tokens** - only give necessary permissions
6. **Keep dependencies updated**

---

## Cost Optimization

- **Single VPS:** Run everything on one Coolify instance
- **Shared Database:** Both apps use same PostgreSQL
- **Auto-scaling:** Coolify can scale based on traffic
- **Backups:** Set up automated PostgreSQL backups

---

**Ready to deploy?** Follow the steps above and you'll have a production-ready setup! 🚀

