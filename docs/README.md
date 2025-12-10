# District Interiors - Migration Documentation

This repository contains the migrated District Interiors website from React/Vite + Supabase to Next.js + Strapi + Stripe.

## Architecture

- **Frontend:** Next.js 14 (App Router) with TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **CMS:** Strapi 4 (headless CMS with PostgreSQL)
- **Payments:** Stripe Checkout + Webhooks
- **Hosting:** Designed for Coolify on KVM VPS

## Project Structure

```
district-interiors-bloom-main/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App Router pages and API routes
│   │   ├── components/   # React components (migrated from src/)
│   │   ├── lib/          # Utilities (Strapi client, cart, etc.)
│   │   └── public/       # Static assets
│   └── cms/              # Strapi CMS
│       ├── config/       # Strapi configuration
│       ├── src/
│       │   ├── api/      # Content types
│       │   └── components/ # Shared components
│       └── database/     # Database migrations (auto-generated)
└── docs/                 # Documentation
```

## Quick Start

See [DEV_SETUP.md](./DEV_SETUP.md) for detailed setup instructions.

**TL;DR:**
1. Set up PostgreSQL database
2. Configure Strapi (`.env` in `apps/cms`)
3. Start Strapi: `cd apps/cms && npm run develop`
4. Configure Next.js (`.env.local` in `apps/web`)
5. Start Next.js: `cd apps/web && npm run dev`

## Key Features

### Security

- **Server-side validation:** All prices, discounts, and totals validated server-side
- **Secure cart:** HTTP-only cookies, no prices stored client-side
- **Webhook verification:** Stripe webhook signature verification
- **Rate limiting:** Basic rate limiting on API routes
- **CORS:** Restricted to known origins

See [SECURITY_NOTES.md](./SECURITY_NOTES.md) for detailed security documentation.

### Content Management

- **Strapi CMS:** Full headless CMS with draft/publish workflow
- **Content Types:** Products, Categories, Services, Projects, Testimonials, Client Logos, Stats, Page Sections
- **Media Library:** Built-in media management in Strapi
- **Role-based Access:** Admin and Editor roles

### E-commerce

- **Cart System:** Cookie-based cart (secure, server-validated)
- **Stripe Checkout:** Secure payment processing
- **Order Management:** Orders stored in Strapi after payment
- **Discount Codes:** Server-validated discount system
- **Shipping Options:** Configurable shipping in Strapi

## Migration Status

### ✅ Completed

- [x] Monorepo structure
- [x] Strapi setup with all content types
- [x] Next.js App Router structure
- [x] Design system migration (Tailwind, fonts, animations)
- [x] Secure cart system
- [x] Stripe checkout integration
- [x] Webhook handler for order creation
- [x] Security documentation

### 🚧 In Progress / TODO

- [ ] Migrate all React components from `src/` to `apps/web/components/`
- [ ] Connect pages to Strapi data (currently using placeholder components)
- [ ] Implement contact form API route
- [ ] Add product detail pages
- [ ] Add service detail pages
- [ ] Add project detail pages
- [ ] Implement cart page UI
- [ ] Implement checkout page UI
- [ ] Add success page
- [ ] Set up image optimization
- [ ] Add SEO metadata
- [ ] Production deployment configuration

## Design Preservation

**Critical:** The design must remain identical to the original React/Vite version.

- All Tailwind classes preserved
- All animations (Framer Motion) preserved
- All component structures preserved
- All spacing, typography, colors preserved

Only changes:
- Import paths (Next.js App Router)
- Data fetching (Strapi instead of Supabase)
- Routing (Next.js instead of React Router)

## Environment Variables

### Next.js (`apps/web/.env.local`)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Strapi (`apps/cms/.env`)

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=district_interiors_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:3000
```

## Development Workflow

1. **Content Management:** Use Strapi admin panel (`http://localhost:1337/admin`)
2. **Frontend Development:** Edit files in `apps/web/`
3. **CMS Development:** Edit content types in `apps/cms/src/api/`
4. **Testing:** Test cart and checkout with Stripe test mode

## Production Deployment

### Coolify Setup

1. **Strapi Service:**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Environment: Set all `.env` variables
   - Database: Connect to PostgreSQL service

2. **Next.js Service:**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Environment: Set all `.env.local` variables
   - Domain: Configure your domain

3. **PostgreSQL Service:**
   - Create database for Strapi
   - Set up backups

4. **Stripe Webhook:**
   - Configure webhook endpoint in Stripe dashboard
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`

## Support

For issues or questions:
1. Check [DEV_SETUP.md](./DEV_SETUP.md) for setup issues
2. Check [SECURITY_NOTES.md](./SECURITY_NOTES.md) for security questions
3. Review code comments for implementation details

## License

MIT

