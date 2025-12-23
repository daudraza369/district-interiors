# 🔧 Build Error Fixed

## Issue
Build was failing with:
```
Module not found: Package path ./config is not exported from package /app/node_modules/payload
```

## Fix
Changed import in `payload.config.ts`:
- ❌ `import { buildConfig } from 'payload/config';`
- ✅ `import { buildConfig } from 'payload';`

## Next Steps
1. ✅ Fix committed and pushed
2. **Redeploy in Coolify** - The fix is now in the code
3. Build should succeed now

## Note
The build logs show old Strapi env vars are still being passed. Make sure you've updated environment variables in Coolify UI to remove Strapi vars and add PAYLOAD_SECRET.

