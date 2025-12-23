# Local Development Setup

## Quick Start

1. **Navigate to the web directory:**
   ```powershell
   cd apps/web
   ```

2. **Install dependencies (if not already done):**
   ```powershell
   npm install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```

4. **Open your browser:**
   - Go to: http://localhost:3001/interiors
   - The app will connect to Strapi on Coolify automatically

## Environment Variables

The `.env.local` file is already created with:
- `NEXT_PUBLIC_STRAPI_URL=https://admin.districtflowers.com`
- `STRAPI_API_TOKEN` (your token)
- `NEXT_PUBLIC_APP_URL=http://localhost:3001`

## How It Works

- ✅ **Local frontend** runs on `http://localhost:3001`
- ✅ **Connects to Strapi** on Coolify (`https://admin.districtflowers.com`)
- ✅ **Hot reload** - Changes appear instantly (no rebuild needed)
- ✅ **Same codebase** - When ready, just push and deploy to Coolify

## Benefits

- ⚡ **Instant updates** - See changes in ~100ms
- 🔄 **No Docker builds** - Just save and refresh
- 🧪 **Fast testing** - Test changes immediately
- 🚀 **Easy deployment** - When ready, push to GitHub and deploy on Coolify

## Workflow

1. **Development**: Work locally with `npm run dev`
2. **Testing**: Test against Coolify Strapi
3. **Production**: When ready, push to GitHub and deploy on Coolify

## Troubleshooting

- The dev server is configured to use port 3001 (to avoid conflict with Chatwoot on 3000)
- Check `.env.local` exists and has correct values
- Make sure dependencies are installed: `npm install`

