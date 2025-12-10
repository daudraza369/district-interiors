# Development Setup Guide

This guide will help you set up the District Interiors monorepo for local development.

## Prerequisites

- Node.js 18.x or 20.x
- PostgreSQL 14+ (for Strapi)
- npm or yarn
- Stripe account (for payment testing)

## Project Structure

```
district-interiors-bloom-main/
├── apps/
│   ├── web/          # Next.js frontend
│   └── cms/          # Strapi CMS backend
└── docs/             # Documentation
```

## Step 1: Set Up Strapi CMS

### 1.1 Install Dependencies

```bash
cd apps/cms
npm install
```

### 1.2 Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure:

- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` - Your PostgreSQL connection details
- `APP_KEYS` - Generate 4 random strings (use `openssl rand -base64 32` for each)
- `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT` - Generate random strings
- `CORS_ORIGIN` - Set to `http://localhost:3000` for local dev

### 1.3 Create Database

Create a PostgreSQL database:

```sql
CREATE DATABASE district_interiors_cms;
```

### 1.4 Start Strapi

```bash
npm run develop
```

Strapi will:
- Create database tables automatically
- Start on `http://localhost:1337`
- Open admin panel at `http://localhost:1337/admin`

### 1.5 Initial Setup

1. Create your first admin user in the Strapi admin panel
2. Go to Settings → Roles → Public
3. Configure permissions:
   - **Allow**: `find`, `findOne` for: Product, Category, Service, Project, Testimonial, ClientLogo, Stat, PageSection, ShippingOption
   - **Deny**: All other operations for Public role
   - **Deny**: All access to Order and Discount for Public role

4. Go to Settings → API Tokens
5. Create a new API token:
   - Name: "Next.js Server Token"
   - Token type: "Full access" (or "Custom" with only Orders create permission)
   - Copy the token (you'll need it for Next.js `.env`)

## Step 2: Set Up Next.js Frontend

### 2.1 Install Dependencies

```bash
cd apps/web
npm install
```

### 2.2 Configure Environment

Create `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_from_step_1.5

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2.3 Copy Fonts

Copy fonts from the original project:

```bash
# From project root
cp -r public/fonts apps/web/public/fonts
cp public/district-logo.png apps/web/public/
```

### 2.4 Start Next.js

```bash
npm run dev
```

Next.js will start on `http://localhost:3000`

## Step 3: Set Up Stripe Webhooks (Local Development)

For local webhook testing, use Stripe CLI:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
4. Copy the webhook secret (starts with `whsec_`) to your `.env.local`

## Step 4: Seed Test Data (Optional)

In Strapi admin panel, manually create:

1. **Categories**: Trees, Flowers, Leaves/Foliage, Green Walls, Trunks & Branches, Planters
2. **Products**: A few test products with `purchasable=true` and `stripePriceId` set
3. **Services**: Office & F&B Plantscaping, Tree Customization, etc.
4. **Projects**: Sample portfolio projects
5. **Testimonials**: Sample client testimonials
6. **Client Logos**: Sample client logos
7. **Stats**: Company statistics
8. **Page Sections**: Homepage sections (hero, services, etc.)
9. **Shipping Options**: Standard shipping, Express shipping
10. **Discounts**: Test discount codes (optional)

## Running Both Apps

### Option 1: Separate Terminals

Terminal 1 (Strapi):
```bash
cd apps/cms
npm run develop
```

Terminal 2 (Next.js):
```bash
cd apps/web
npm run dev
```

### Option 2: Using a Process Manager

Install `concurrently`:

```bash
npm install -g concurrently
```

From project root:

```bash
concurrently "cd apps/cms && npm run develop" "cd apps/web && npm run dev"
```

## Troubleshooting

### Strapi won't start

- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database exists
- Check port 1337 is not in use

### Next.js can't connect to Strapi

- Verify `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
- Check Strapi is running on port 1337
- Verify CORS settings in Strapi `config/middlewares.ts`

### Stripe webhook fails

- Verify webhook secret matches Stripe CLI output
- Check webhook endpoint is accessible
- Ensure `STRIPE_SECRET_KEY` is correct

### Database connection errors

- Verify PostgreSQL is running: `pg_isready`
- Check database exists: `psql -l`
- Test connection: `psql -h localhost -U postgres -d district_interiors_cms`

## Next Steps

1. Review `docs/SECURITY_NOTES.md` for security considerations
2. Migrate existing components from `src/` to `apps/web/components/`
3. Connect pages to Strapi data
4. Test cart and checkout flow
5. Set up production environment variables

