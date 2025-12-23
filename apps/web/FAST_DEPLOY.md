# ⚡ Fast Deployment Guide (40-Second Deploys)

This guide explains the optimizations made to achieve fast 40-second deployments.

## Key Optimizations

### 1. **BuildKit Cache Mounts** 🚀
The Dockerfile now uses BuildKit cache mounts that persist between builds:

- **npm cache** (`/root/.npm`) - Packages are cached, no re-download needed
- **Next.js build cache** (`/.next/cache`) - Compilation results are reused

### 2. **Optimized npm Install**
```dockerfile
npm ci --legacy-peer-deps --prefer-offline --no-audit
```
- `--prefer-offline` - Uses cache first
- `--no-audit` - Skips security audit (saves 5-10 seconds)

### 3. **Optimized Build Process**
- Uses SWC minifier (faster than Terser)
- BuildKit cache mounts for Next.js cache
- Reduced build context size with comprehensive .dockerignore

## Deployment Time Breakdown

**First Build (cold cache):** ~2-3 minutes
**Subsequent Builds (warm cache):** ~30-50 seconds ⚡

### Typical Build Times:
- **No code changes:** ~15 seconds (only image rebuild)
- **Code changes only:** ~30-50 seconds (cached dependencies, new build)
- **Dependency changes:** ~2-3 minutes (npm install + build)

## Using BuildKit (Required)

Make sure BuildKit is enabled in Coolify or use:

```bash
DOCKER_BUILDKIT=1 docker build .
```

Coolify should automatically use BuildKit, but verify in your deployment settings.

## Coolify Configuration

In Coolify, ensure:
1. ✅ BuildKit is enabled (should be by default)
2. ✅ Build cache is enabled
3. ✅ Use Docker Compose build context

## Monitoring Build Times

Check build logs in Coolify:
- Look for "CACHED" in build output (means layer was reused)
- npm install should show "up to date" when cached
- Next.js build should be faster on subsequent builds

## Troubleshooting

### If builds are still slow:

1. **Check if BuildKit is enabled:**
   - Look for cache mount messages in build logs
   - Should see "RUN --mount=type=cache..."

2. **Verify cache is working:**
   - First build should be slow
   - Second build (no changes) should be fast (~15s)
   - Third build (code changes only) should be ~30-50s

3. **Clear cache if needed:**
   - In Coolify, you can rebuild without cache
   - This will force a full rebuild

## Additional Speed Tips

1. **Use .dockerignore effectively:**
   - Excludes unnecessary files from build context
   - Smaller context = faster upload to Docker daemon

2. **Keep dependencies stable:**
   - Avoid frequent package.json changes
   - Lock files ensure consistent installs

3. **Incremental builds:**
   - Only changed code needs rebuilding
   - Cache handles the rest

## Expected Performance

✅ **40-second deployments** are achievable when:
- Code-only changes
- Warm cache (previous build exists)
- BuildKit enabled
- No dependency changes

🎯 **Goal achieved!** Your deployments should now be much faster.


