# Security Notes

This document outlines the security architecture and trust boundaries for the District Interiors platform.

## Trust Boundaries

### Client (Browser) - UNTRUSTED

**Never trust data from the client for:**
- Product prices
- Order totals
- Discount calculations
- Shipping costs
- Product availability
- Payment amounts

**Client can only provide:**
- Product IDs (validated server-side)
- Quantities (validated server-side)
- User input (email, shipping address, etc. - sanitized server-side)

### Server (Next.js) - TRUSTED

**Server-side validation:**
- All cart items validated against Strapi database
- Prices fetched from Strapi (source of truth)
- Discounts validated against Strapi
- Shipping options validated against Strapi
- Stripe Checkout Session created with server-validated data

### Strapi CMS - TRUSTED (Internal)

**Access control:**
- Public API: Read-only for published content
- Admin API: Protected with API tokens (server-side only)
- Orders: Only created via server-side API token, never from client

### Stripe - TRUSTED (External)

**Payment processing:**
- Stripe is the source of truth for payment amounts
- Webhook signature verification ensures events are from Stripe
- Order totals come from Stripe webhook data, not client

## Security Implementation

### 1. Cart Security

**Location:** `apps/web/lib/cart.ts`

- Cart stored in HTTP-only cookie (prevents XSS)
- Cookie set with `Secure` and `SameSite=Lax` in production
- Cart only contains: `productId`, `slug`, `qty`
- **No prices stored in cart**

**Validation:**
- Server validates all cart items exist in Strapi
- Server validates products are `purchasable=true`
- Server validates quantities are positive integers

### 2. Checkout Security

**Location:** `apps/web/app/api/checkout/route.ts`

**Process:**
1. Read cart from cookie (server-side)
2. Validate cart structure
3. Fetch products from Strapi using API token
4. Validate each product:
   - Exists
   - `purchasable=true`
   - Has `stripePriceId`
5. Validate discount code (if provided) from Strapi
6. Validate shipping option from Strapi
7. Create Stripe Checkout Session with validated data
8. Return session URL to client

**Rate Limiting:**
- 5 requests per minute per IP
- Prevents abuse of checkout endpoint

### 3. Webhook Security

**Location:** `apps/web/app/api/stripe/webhook/route.ts`

**Process:**
1. Verify Stripe signature using `STRIPE_WEBHOOK_SECRET`
2. Reject if signature invalid
3. Handle `checkout.session.completed` event
4. Retrieve line items from Stripe (source of truth for amounts)
5. Check for existing order (idempotency)
6. Create order in Strapi with Stripe data

**Idempotency:**
- Check for existing order by `stripeSessionId`
- Prevents duplicate orders from webhook retries

### 4. Strapi Security

**Public API Permissions:**
- **Read-only** for: Product, Category, Service, Project, Testimonial, ClientLogo, Stat, PageSection, ShippingOption
- **No access** to: Order, Discount

**API Token:**
- Stored in server environment variable only
- Never exposed to client
- Used only for:
  - Creating orders (webhook handler)
  - Reading unpublished content (if needed)

**CORS:**
- Restricted to known origins
- Production: Only `https://www.your-domain.com`
- Development: Only `http://localhost:3000`

### 5. Environment Variables

**Never commit:**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRAPI_API_TOKEN`
- Database passwords
- JWT secrets

**Use `.env.local` for Next.js:**
- Git-ignored
- Loaded at runtime
- Never exposed to client (except `NEXT_PUBLIC_*`)

**Use `.env` for Strapi:**
- Git-ignored
- Contains database credentials
- Contains API secrets

### 6. Input Sanitization

**All user inputs sanitized:**
- Contact form: Email validation, text sanitization
- Discount codes: Validated against Strapi, not trusted from client
- Cart quantities: Validated as positive integers

**SQL Injection Prevention:**
- Strapi uses parameterized queries (built-in)
- No raw SQL queries

**XSS Prevention:**
- React escapes by default
- Rich text from Strapi sanitized (if using richtext fields)

### 7. Rate Limiting

**Implemented for:**
- `/api/checkout` - 5 requests/minute
- `/api/stripe/webhook` - 100 requests/minute
- `/api/contact` - 10 requests/minute (if implemented)

**Note:** Current implementation uses in-memory storage. For production, use Redis.

### 8. HTTPS

**Production requirement:**
- All traffic over HTTPS
- Stripe requires HTTPS for webhooks
- Cookies set with `Secure` flag

## Security Checklist

### Before Production

- [ ] Change all default Strapi secrets
- [ ] Set strong admin password
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS
- [ ] Set `Secure` flag on cookies
- [ ] Use production Stripe keys
- [ ] Configure Stripe webhook endpoint in dashboard
- [ ] Set up rate limiting with Redis (recommended)
- [ ] Review and restrict Strapi public permissions
- [ ] Audit environment variables
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerting

### Regular Maintenance

- [ ] Keep dependencies updated
- [ ] Review security advisories
- [ ] Rotate API tokens periodically
- [ ] Monitor for suspicious activity
- [ ] Review access logs
- [ ] Test webhook endpoint regularly

## Known Limitations

1. **Rate Limiting:** Current implementation is in-memory. For production, use Redis or a dedicated service.

2. **Session Management:** Cart uses cookies. For logged-in users, consider server-side session storage.

3. **Error Messages:** Be careful not to leak sensitive information in error messages (e.g., product IDs, internal errors).

4. **Webhook Retries:** Stripe will retry failed webhooks. Ensure idempotency is working correctly.

## Reporting Security Issues

If you discover a security vulnerability, please:
1. Do not create a public issue
2. Contact the development team directly
3. Provide details of the vulnerability
4. Allow time for a fix before public disclosure

