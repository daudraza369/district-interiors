# Deployment Process for Coolify

## Current Setup

- **Repository:** GitHub (daudraza369/district-interiors)
- **Deployment Platform:** Coolify
- **Auto-Deploy:** NOT enabled (manual deployment required)

## Manual Deployment Process

Since Coolify does not auto-rebuild, you need to manually trigger deployments:

### Step 1: Make Code Changes

Make your changes locally and commit them:

```bash
git add .
git commit -m "Your commit message"
git push
```

### Step 2: Deploy in Coolify

1. Go to your Coolify dashboard
2. Navigate to your frontend service
3. Click **"Deploy"** or **"Redeploy"** button
4. Wait for the build to complete (usually 3-5 minutes)

### Step 3: Verify Deployment

1. Check build logs in Coolify
2. Verify the service is running
3. Test the frontend URL

## Notes

- Changes are NOT automatically deployed when you push to GitHub
- You must manually trigger deployment in Coolify after each push
- Consider enabling auto-deploy if you want automatic deployments (see below)

## Optional: Enable Auto-Deploy (Future)

If you want automatic deployments, you can set up:

1. **GitHub App Integration** (Recommended):
   - Integrate Coolify with GitHub via GitHub App
   - Enables automatic deployments on push
   - See: https://next.coolify.io/docs/applications/ci-cd/github/setup-app

2. **Webhook Configuration**:
   - Set up webhook in GitHub pointing to Coolify
   - Configure auto-deploy in Coolify settings
   - See: https://next.coolify.io/docs/applications/ci-cd/github/auto-deploy

