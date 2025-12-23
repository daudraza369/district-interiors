# Enable Hot Reload in Strapi (No Restart Needed)

To enable hot reload so you don't need to restart Strapi after schema changes:

## In Coolify Environment Variables:

Add or update:
```
NODE_ENV=development
AUTO_RELOAD=true
```

Or if you want to keep production mode but enable auto-reload:
```
NODE_ENV=production
STRAPI_DISABLE_UPDATE_NOTIFICATION=true
```

However, for schema changes (adding fields), Strapi typically requires a restart because it needs to rebuild the admin panel.

## Alternative: Use Watch Mode

In the Strapi container terminal, you can run Strapi in watch mode, but this is usually handled automatically in development mode.

## Recommendation:

For production, keep `NODE_ENV=production` but know that schema changes will require a restart. This is normal and expected behavior.

For development workflow, you can:
1. Make schema changes
2. Restart once
3. Then content changes (via API or admin) don't require restart



