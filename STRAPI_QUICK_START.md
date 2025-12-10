# ⚡ Strapi Quick Start - Everything is Already Configured!

You're right! Everything is already set up. Here's the **super simple** setup:

## 🚀 3-Step Setup

### Step 1: Install & Configure

```bash
cd apps/cms
npm install
```

Create `.env` file (or run `.\setup-strapi.ps1` from project root):

```env
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

# Generate with: openssl rand -base64 32 (run 4 times for APP_KEYS)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_secret

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_SSL=false

CORS_ORIGIN=http://localhost:3000
```

### Step 2: Create Database

```bash
psql -U postgres -c "CREATE DATABASE district_interiors_cms;"
```

### Step 3: Start Strapi

```bash
npm run develop
```

## ✅ What's Already Done

- ✅ **All 11 content types** created (Product, Category, Service, Project, etc.)
- ✅ **CORS configured** for Next.js
- ✅ **Database config** ready
- ✅ **Permissions bootstrap** - Automatically sets permissions on first run!
- ✅ **Draft/Publish** enabled on all content types
- ✅ **Relations** configured (Product → Category, etc.)

## 🎯 What Happens on First Run

1. Strapi creates all database tables automatically
2. **Permissions are set automatically** via bootstrap script:
   - ✅ Public can `find` and `findOne` on: Product, Category, Service, Project, Testimonial, ClientLogo, Stat, PageSection, ShippingOption
   - ❌ Public CANNOT access: Order, Discount
   - ❌ Public CANNOT create/update/delete anything
3. You create admin user in browser
4. Done! 🎉

## 📝 After First Run

1. **Create API Token:**
   - Settings → API Tokens → Create "Next.js Server Token"
   - Copy token to `apps/web/.env.local` as `STRAPI_API_TOKEN`

2. **Add Content:**
   - Go to Content Manager
   - Create products, services, projects, etc.
   - **Important:** Click "Publish" (not just Save) for content to be visible

## 🎉 That's It!

No manual permission configuration needed - it's all automated! The bootstrap script runs every time Strapi starts and ensures permissions are correct.

---

**Note:** The bootstrap script only runs in development mode. For production, set permissions manually in admin panel or run the script once.

