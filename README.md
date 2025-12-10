# District Interiors Bloom - Next.js + Strapi Migration

This is the migrated version of District Interiors website, rebuilt with:
- **Next.js 14** (App Router) for the frontend
- **Strapi 4** as headless CMS
- **Stripe** for secure payments

## 🚀 Quick Start

See [docs/DEV_SETUP.md](./docs/DEV_SETUP.md) for complete setup instructions.

**Prerequisites:**
- Node.js 18+
- PostgreSQL 14+
- Stripe account

**Quick setup:**
```bash
# 1. Set up Strapi
cd apps/cms
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run develop

# 2. Set up Next.js (in another terminal)
cd apps/web
npm install
cp .env.example .env.local
# Edit .env.local with Strapi API token and Stripe keys
npm run dev
```

## 📁 Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   └── cms/          # Strapi CMS (port 1337)
└── docs/             # Documentation
```

## 🔒 Security

This implementation follows security best practices:
- Server-side price validation
- Secure cart (HTTP-only cookies)
- Webhook signature verification
- Rate limiting
- CORS restrictions

See [docs/SECURITY_NOTES.md](./docs/SECURITY_NOTES.md) for details.

## 📚 Documentation

- [Development Setup](./docs/DEV_SETUP.md) - Complete setup guide
- [Security Notes](./docs/SECURITY_NOTES.md) - Security architecture
- [Project README](./docs/README.md) - Detailed project documentation

## ✨ Features

- ✅ Secure e-commerce with Stripe
- ✅ Headless CMS with Strapi
- ✅ Server-side validation
- ✅ ISR (Incremental Static Regeneration)
- ✅ Design preserved from original
- ✅ TypeScript throughout
- ✅ Responsive design

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **CMS:** Strapi 4, PostgreSQL
- **Payments:** Stripe Checkout
- **UI:** shadcn/ui components

## 📝 Migration Status

Core infrastructure is complete. Remaining work:
- Component migration from `src/` to `apps/web/components/`
- Page data integration with Strapi
- UI polish and testing

## 🔐 Environment Variables

See `.env.example` files in each app directory for required variables.

## 📖 Original Project

This is a migration of the original React/Vite + Supabase project. The design and UX remain identical.

---

For detailed information, see the [docs](./docs/) directory.
