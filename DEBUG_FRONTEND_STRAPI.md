# Debug Frontend-Strapi Connection

## Quick Checks Before SSH:

### 1. Check Environment Variables in Coolify

Go to your frontend service in Coolify:
- Configuration → Environment Variables
- Verify these are set:
  - `NEXT_PUBLIC_STRAPI_URL=https://admin.districtflowers.com`
  - `STRAPI_API_TOKEN=96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b`

### 2. Check Frontend Logs in Coolify

- Go to your frontend service → Logs
- Look for errors related to:
  - "Strapi"
  - "hero-section"
  - "fetch failed"
  - "403" or "401" errors

### 3. Check Browser Console

- Open https://web.districtflowers.com/interiors
- Press F12 → Console tab
- Look for errors or warnings

## If You Want to Give SSH Access:

I can help debug via SSH. You would need to:

1. **In Coolify Terminal tab:**
   - Go to your frontend service
   - Click "Terminal" tab
   - Share the commands/output with me

2. **Or SSH to your server:**
   - SSH into your server
   - Find the frontend container: `docker ps | grep web`
   - Access container: `docker exec -it <container_id> sh`
   - Then we can check environment variables and test the connection

## What I'll Check:

1. Verify environment variables are set correctly
2. Test if the container can reach Strapi API
3. Check if the code was actually deployed
4. Test the API connection from inside the container
5. Check Next.js build logs

Let me know if you want to proceed with SSH access, or share the logs/errors you're seeing!



