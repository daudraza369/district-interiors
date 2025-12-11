# Coolify Debug Guide

## ⚠️ IMPORTANT: Docker commands don't work in Coolify Terminal
Coolify's terminal doesn't have direct Docker access. Use the UI instead.

## ✅ How to Check CMS Logs in Coolify UI

### Method 1: Via Logs Tab (Easiest - RECOMMENDED)
1. Go to your deployment in Coolify
2. Click on **"Logs"** tab (at the top, next to Configuration, Deployments, etc.)
3. You'll see a dropdown to select which container's logs to view
4. Select **"cms"** or **"cms-jggwgwcw4w4gkkkwocokcog8-..."** from the dropdown
5. You'll see real-time logs with all errors

### Method 2: Via Deployment Logs
1. Go to your deployment
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Scroll down to see container logs

### Method 3: If you have SSH access to the Coolify server
If you can SSH into the Coolify server itself (not the terminal in UI), then you can use:
```bash
# SSH into your Coolify server first, then:
docker ps -a | grep cms
docker logs <cms-container-name> --tail 100
```

## 🔍 What to Look For in the Logs

Look for these common errors:

### Database Connection Issues
- `ECONNREFUSED`
- `password authentication failed`
- `database "district_interiors_cms" does not exist`
- `Connection terminated unexpectedly`
- `relation "strapi_migrations" does not exist`

### Missing Environment Variables
- `APP_KEYS is required`
- `JWT_SECRET is required`
- `API_TOKEN_SALT is required`
- `ADMIN_JWT_SECRET is required`

### Schema/Relation Errors
- `inversedBy attribute not found`
- `Error on attribute`
- `mappedBy attribute not found`

### Port/Startup Issues
- `EADDRINUSE` (port already in use)
- `Cannot bind to port 1337`
- `Server wasn't able to start properly`
- `⛔️ Server wasn't able to start properly`

## 📋 Quick Checklist

When checking logs, look for:
1. ✅ Does Strapi start? (Look for "Server started" or "Your admin panel is ready")
2. ✅ Database connection? (Look for connection errors)
3. ✅ Environment variables? (Look for "required" errors)
4. ✅ Schema errors? (Look for "inversedBy" or "mappedBy" errors)

## 🎯 Most Common Issues & Solutions

### Issue: "password authentication failed"
**Solution:** Check that `DATABASE_PASSWORD` and `POSTGRES_PASSWORD` match in environment variables

### Issue: "APP_KEYS is required"
**Solution:** Make sure `APP_KEYS` is set in environment variables (comma-separated, 4 values)

### Issue: "inversedBy attribute not found"
**Solution:** This is a schema error - should be fixed already, but check if there are other relations with the same issue

### Issue: Container keeps restarting
**Solution:** Check logs for the specific error causing the restart

## 💡 Pro Tip
Take a screenshot of the CMS logs and share it - that's the fastest way to diagnose the issue!
