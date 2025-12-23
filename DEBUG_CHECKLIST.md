# Debug Checklist - Why Frontend Can't Connect to Strapi

## What We Know Works:
✅ API connection from container works (we tested it)
✅ Environment variables are set in Coolify
✅ Code changes are in repo (using strapiFetch)
✅ Strapi API is accessible and returning data

## Potential Issues:

### 1. Next.js Environment Variable Loading
- `NEXT_PUBLIC_*` vars are embedded at BUILD time, not runtime
- If env vars were added AFTER the build, they won't be in the bundle
- Need to verify if vars are available at runtime

### 2. Build Time vs Runtime
- Next.js standalone builds embed env vars at build time
- Changes to env vars require a rebuild
- Even though we triggered rebuild, maybe it didn't pick up the vars?

### 3. Server-side vs Client-side
- strapiFetch runs server-side (in getServerSideProps or Server Components)
- STRAPI_API_TOKEN should be available server-side
- But NEXT_PUBLIC_STRAPI_URL is for client-side

Let me check the actual code to see what's happening.



