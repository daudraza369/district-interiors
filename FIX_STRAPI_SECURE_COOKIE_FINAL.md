# Final Fix for Strapi Secure Cookie Issue

## Problem
"Cannot send secure cookie over unencrypted connection" error when trying to login to Strapi admin panel behind Coolify reverse proxy.

## Solution: Add PUBLIC_URL Environment Variable in Coolify

The server.js we modified reads `PUBLIC_URL` from environment variables. We need to add it in Coolify.

### Steps:

1. **Go to Coolify Dashboard**
   - Navigate to your Strapi service
   - Go to Configuration → Environment Variables

2. **Add these environment variables:**
   - `PUBLIC_URL` = `https://admin.districtflowers.com`
   
3. **Restart the service**

This will tell Strapi its public HTTPS URL, allowing it to set secure cookies properly.

## Alternative: Modify admin.js to disable secure cookies (Not recommended for production)

If the above doesn't work, we can temporarily disable secure cookies in development mode.




