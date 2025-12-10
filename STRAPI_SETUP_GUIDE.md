# 🚀 Strapi Setup Guide - Step by Step

This guide will walk you through setting up Strapi CMS for District Interiors.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18.x or 20.x installed
- ✅ PostgreSQL 14+ installed and running
- ✅ npm or yarn package manager

## Step 1: Install Dependencies

```bash
cd apps/cms
npm install
```

This will install all Strapi dependencies including PostgreSQL driver.

## Step 2: Set Up PostgreSQL Database

### Option A: Using psql (Command Line)

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE district_interiors_cms;

# Exit psql
\q
```

### Option B: Using pgAdmin (GUI)

1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Name: `district_interiors_cms`
5. Click "Save"

### Option C: Using SQL File

Create a file `create_db.sql`:
```sql
CREATE DATABASE district_interiors_cms;
```

Then run:
```bash
psql -U postgres -f create_db.sql
```

## Step 3: Create Environment File

Create a `.env` file in `apps/cms/`:

```bash
cd apps/cms
# On Windows PowerShell
New-Item -ItemType File -Path .env

# On Linux/Mac
touch .env
```

## Step 4: Generate Secret Keys

You need to generate several secret keys. Here are commands to generate them:

### On Windows (PowerShell):

```powershell
# Generate APP_KEYS (you need 4 of these)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Generate API_TOKEN_SALT
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Generate ADMIN_JWT_SECRET
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Generate TRANSFER_TOKEN_SALT
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Generate JWT_SECRET
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### On Linux/Mac:

```bash
# Generate APP_KEYS (you need 4 of these)
openssl rand -base64 32

# Generate API_TOKEN_SALT
openssl rand -base64 32

# Generate ADMIN_JWT_SECRET
openssl rand -base64 32

# Generate TRANSFER_TOKEN_SALT
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

## Step 5: Configure .env File

Edit `apps/cms/.env` and add the following:

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

# App Keys (generate 4 random strings, comma-separated)
APP_KEYS=your_key_1,your_key_2,your_key_3,your_key_4

# API Token Salt
API_TOKEN_SALT=your_generated_salt_here

# Admin JWT Secret
ADMIN_JWT_SECRET=your_generated_secret_here

# Transfer Token Salt
TRANSFER_TOKEN_SALT=your_generated_salt_here

# JWT Secret
JWT_SECRET=your_generated_secret_here

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_postgres_password
DATABASE_SSL=false

# CORS (for Next.js frontend)
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace:
- `your_key_1,your_key_2,your_key_3,your_key_4` with 4 generated keys
- `your_generated_salt_here` with generated salts
- `your_generated_secret_here` with generated secrets
- `your_postgres_password` with your actual PostgreSQL password

## Step 6: Start Strapi

```bash
cd apps/cms
npm run develop
```

**First time running?** Strapi will:
1. Create all database tables automatically
2. Start the server on `http://localhost:1337`
3. Open the admin panel at `http://localhost:1337/admin`

## Step 7: Create Admin User

When Strapi opens in your browser:

1. **Fill in the registration form:**
   - First Name: Your first name
   - Last Name: Your last name
   - Email: Your email
   - Password: Choose a strong password
   - Confirm Password: Repeat password

2. Click **"Let's start"**

3. You'll be logged into the Strapi admin panel! 🎉

## Step 8: Configure Permissions

### 8.1 Set Public Role Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, configure:

   **Allow these permissions:**
   - ✅ **Category**: `find`, `findOne`
   - ✅ **Product**: `find`, `findOne`
   - ✅ **Service**: `find`, `findOne`
   - ✅ **Project**: `find`, `findOne`
   - ✅ **Testimonial**: `find`, `findOne`
   - ✅ **Client Logo**: `find`, `findOne`
   - ✅ **Stat**: `find`, `findOne`
   - ✅ **Page Section**: `find`, `findOne`
   - ✅ **Shipping Option**: `find`, `findOne`

   **Deny all other permissions** (especially create, update, delete)

   **Important:** 
   - ❌ **Order**: Deny ALL permissions (not accessible to public)
   - ❌ **Discount**: Deny ALL permissions (not accessible to public)

4. Click **"Save"** at the top right

### 8.2 Create API Token (for Next.js)

1. Go to **Settings** → **API Tokens**
2. Click **"Create new API Token"**
3. Fill in:
   - **Name**: `Next.js Server Token`
   - **Token type**: `Full access` (or `Custom` with only Orders create permission)
   - **Token duration**: `Unlimited` (or set expiration)
4. Click **"Save"**
5. **IMPORTANT:** Copy the token immediately (you can't see it again!)
6. Add it to `apps/web/.env.local` as `STRAPI_API_TOKEN`

## Step 9: Verify Content Types

All content types should already be created. Verify by going to **Content Manager**:

You should see:
- ✅ Category
- ✅ Product
- ✅ Service
- ✅ Project
- ✅ Testimonial
- ✅ Client Logo
- ✅ Stat
- ✅ Page Section
- ✅ Discount
- ✅ Shipping Option
- ✅ Order

## Step 10: Add Test Data (Optional but Recommended)

### 10.1 Create a Category

1. Go to **Content Manager** → **Category**
2. Click **"Create new entry"**
3. Fill in:
   - **Name**: `Trees`
   - **Slug**: `trees` (auto-generated)
   - **Description**: `Premium artificial trees`
   - **Display Order**: `1`
4. Click **"Save"** then **"Publish"**

### 10.2 Create a Product

1. Go to **Content Manager** → **Product**
2. Click **"Create new entry"**
3. Fill in:
   - **Name**: `Premium Olive Tree`
   - **Slug**: `premium-olive-tree`
   - **Category**: Select "Trees"
   - **Short Description**: `Beautiful artificial olive tree`
   - **Price**: `5000`
   - **Currency**: `SAR`
   - **Price On Request**: `false`
   - **Purchasable**: `true`
   - **Stripe Price ID**: `price_xxxxx` (get from Stripe)
   - **Display Order**: `1`
4. Upload an image
5. Click **"Save"** then **"Publish"**

### 10.3 Create a Shipping Option

1. Go to **Content Manager** → **Shipping Option**
2. Click **"Create new entry"**
3. Fill in:
   - **Name**: `Standard Shipping`
   - **Description**: `5-7 business days`
   - **Price**: `100`
   - **Currency**: `SAR`
   - **Estimated Days**: `5`
   - **Region**: `saudi`
   - **Active**: `true`
4. Click **"Save"**

## Step 11: Test the API

Open your browser and test:

```
http://localhost:1337/api/products
```

You should see JSON data (empty array if no products yet).

## ✅ Setup Complete!

Your Strapi is now ready! 

### Quick Commands:

```bash
# Start Strapi (development)
cd apps/cms
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

### Next Steps:

1. ✅ Add more test data (products, services, projects)
2. ✅ Configure Next.js to connect to Strapi
3. ✅ Test the frontend with Strapi data

## 🐛 Troubleshooting

### "Cannot connect to database"

**Solution:**
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep district_interiors_cms`
- Check credentials in `.env`
- Test connection: `psql -h localhost -U postgres -d district_interiors_cms`

### "Port 1337 already in use"

**Solution:**
- Change `PORT=1337` to another port in `.env`
- Or kill the process using port 1337

### "APP_KEYS must be provided"

**Solution:**
- Make sure `.env` file exists
- Verify `APP_KEYS` has 4 comma-separated values
- Restart Strapi after adding keys

### "Permission denied" errors

**Solution:**
- Check Public role permissions (Step 8.1)
- Make sure content is **Published** (not just saved)
- Verify API token is correct in Next.js `.env.local`

### Strapi won't start

**Solution:**
- Check Node.js version: `node --version` (should be 18.x or 20.x)
- Delete `node_modules` and `.cache` folder, then `npm install` again
- Check for errors in terminal output

## 📚 Useful Links

- Strapi Documentation: https://docs.strapi.io
- Strapi Admin Panel: http://localhost:1337/admin
- Strapi API: http://localhost:1337/api

---

**Need help?** Check the main `docs/DEV_SETUP.md` for more details!

