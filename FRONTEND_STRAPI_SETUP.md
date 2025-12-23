# Frontend Strapi Integration Setup

## The Problem
Frontend changes in Strapi are not showing up because the frontend doesn't have the Strapi API URL configured.

## Solution: Add Environment Variables to Frontend

The frontend code is **already set up** to fetch from Strapi, but it needs environment variables configured in Coolify.

### Step 1: Go to Your Frontend Service in Coolify

1. Find your frontend/Next.js service in Coolify
2. Go to **Configuration** → **Environment Variables**

### Step 2: Add These Environment Variables

Add these two critical variables:

```
NEXT_PUBLIC_STRAPI_URL=https://admin.districtflowers.com
STRAPI_API_TOKEN=96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b
```

### Step 3: Save and Redeploy

1. Click **Save**
2. Click **Restart** or **Redeploy** your frontend service
3. Wait for it to restart

### Step 4: Verify It Works

1. Make a change in Strapi (edit hero section)
2. Click **Save** → **Publish** in Strapi
3. Refresh your frontend site: https://web.districtflowers.com/interiors
4. Changes should appear immediately (no redeploy needed!)

## How It Works

- The frontend fetches data from Strapi on every page load
- The page has `revalidate = 0` which means it always fetches fresh data
- Changes in Strapi appear instantly without redeploying the frontend
- No build needed - just refresh the page!

## Troubleshooting

If changes still don't appear:

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_STRAPI_URL` is set correctly
3. Check Strapi logs to see if API requests are coming through
4. Make sure content is **Published** in Strapi (not just saved as draft)



