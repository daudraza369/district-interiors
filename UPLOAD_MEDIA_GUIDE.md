# 📸 Upload All Media Assets to Strapi

## 🚀 Quick Start

Run this command from project root:

```powershell
.\upload-media.ps1
```

This will:
1. Install required dependencies (form-data, axios)
2. Upload all images from `apps/web/public` to Strapi
3. Show you a summary of what was uploaded

## 📋 What Gets Uploaded

All images from `apps/web/public/`:
- ✅ hero-interior.jpg
- ✅ district-logo.png
- ✅ All portfolio images (portfolio-*.jpg)
- ✅ All collection images (collection-*.jpg)
- ✅ All service images (*-service.jpg)
- ✅ All other images (olive-tree.jpg, green-wall.jpg, etc.)

**Total: ~23 images**

## 🔧 Manual Method (If Script Doesn't Work)

### Option 1: Use Node.js Script Directly

```powershell
cd apps\cms
npm install form-data axios
node scripts\upload-media-to-strapi.js
```

### Option 2: Upload via Strapi Admin UI

1. Go to `http://localhost:1337/admin`
2. Click **Media Library** (left sidebar)
3. Click **Upload** button
4. Select all images from `apps/web/public/`
5. Click **Upload**
6. Done!

## 📝 After Upload

### Link Images to Content Types:

1. **Hero Section:**
   - Go to Content Manager → Hero Section
   - Click on `heroImage` field
   - Select `hero-interior.jpg`
   - Save and Publish

2. **Products:**
   - Go to Content Manager → Product
   - Edit a product
   - Click on `images` field
   - Select relevant product images
   - Save and Publish

3. **Projects:**
   - Go to Content Manager → Project
   - Edit a project
   - Click on `heroImage` or `gallery` field
   - Select portfolio images (portfolio-*.jpg)
   - Save and Publish

## ✅ Success Checklist

- [ ] Ran upload script
- [ ] All images uploaded to Strapi
- [ ] Can see images in Media Library
- [ ] Linked hero-interior.jpg to Hero Section
- [ ] Images display correctly in Strapi

## 🐛 Troubleshooting

### Script fails with "Missing dependencies"
```powershell
cd apps\cms
npm install form-data axios
```

### Upload fails with 401/403 error
- Check API token is correct in the script
- Make sure Strapi is running
- Verify you're logged in as admin

### Images not showing in Media Library
- Check Strapi is running: `http://localhost:1337/admin`
- Refresh the Media Library page
- Check browser console for errors

---

**All your media assets will be in Strapi and ready to use!** 🎉
















