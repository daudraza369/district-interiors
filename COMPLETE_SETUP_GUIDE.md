# 🚀 Complete Setup Guide - Frontend Connected to Strapi

## ✅ What I Just Did

1. ✅ **Created Hero Section content type** in Strapi
2. ✅ **Updated frontend** to fetch from Strapi
3. ✅ **Created populate script** to add your current content
4. ✅ **Set up permissions** for public access

## 🎯 Run This Now

```powershell
.\populate-and-connect.ps1
```

This script will:
- Populate Hero Section with your current frontend content
- Publish it in Strapi
- Verify everything is connected

## 📋 Step-by-Step

### Step 1: Populate Strapi
```powershell
.\populate-and-connect.ps1
```

### Step 2: Upload Hero Image
1. Go to `http://localhost:1337/admin`
2. Click **Media Library** (left sidebar)
3. Click **Upload** button
4. Upload your hero image (e.g., `hero-interior.jpg`)
5. Go to **Content Manager → Hero Section**
6. Click on **heroImage** field
7. Select the uploaded image
8. Click **Save** then **Publish**

### Step 3: Test Frontend
```powershell
cd apps\web
npm run dev
```

Visit `http://localhost:3000` - you should see content from Strapi!

### Step 4: Edit in Real-Time
1. Go to Strapi admin: `http://localhost:1337/admin`
2. **Content Manager → Hero Section**
3. Edit any text field
4. Click **Save** then **Publish**
5. Refresh frontend - changes appear immediately!

## 🔧 What Was Changed

### Frontend Files Updated:
- ✅ `apps/web/lib/cms.ts` - Added `HeroSection` interface and `getHeroSection()` function
- ✅ `apps/web/components/sections/HeroSection.tsx` - Now fetches from Strapi
- ✅ `apps/web/app/page.tsx` - Fetches hero data and passes to component

### Strapi Files Created:
- ✅ `apps/cms/src/api/hero-section/content-types/hero-section/schema.json` - Hero Section content type
- ✅ `apps/cms/src/bootstrap.ts` - Added hero-section to public permissions

## 📝 Current Hero Content (Populated)

- **Title:** "Where Design Takes Root"
- **Subtitle:** "Partnering with architects, designers, and fit-out specialists..."
- **Description:** "District Interiors helps invigorate spaces..."
- **Primary Button:** "Explore Our Work" (scrolls to portfolio)
- **Secondary Button:** "Request a Consultation" (scrolls to contact)

## 🎨 How It Works

1. **Frontend fetches** hero data from Strapi API on page load
2. **Strapi serves** the content via `/api/hero-section`
3. **Component displays** the content dynamically
4. **You edit** in Strapi admin panel
5. **Changes appear** on frontend after refresh

## 🐛 Troubleshooting

### Hero Section not showing?
- Check Strapi is running: `http://localhost:1337/admin`
- Verify Hero Section is published in Strapi
- Check browser console for errors
- Make sure frontend can reach Strapi API

### Content not updating?
- Make sure you clicked **Publish** in Strapi (not just Save)
- Hard refresh frontend (Ctrl+F5)
- Check Strapi API: `http://localhost:1337/api/hero-section`

### Image not showing?
- Upload image in Strapi Media Library first
- Link it to Hero Section → heroImage field
- Publish the Hero Section
- Check image URL in browser console

## ✅ Success Checklist

- [ ] Ran `populate-and-connect.ps1`
- [ ] Hero Section populated in Strapi
- [ ] Hero Section published in Strapi
- [ ] Hero image uploaded and linked
- [ ] Frontend shows Strapi content
- [ ] Can edit content in Strapi
- [ ] Changes appear on frontend

---

**You're all set!** Edit your hero section in Strapi and see it update on your frontend in real-time! 🎉
















