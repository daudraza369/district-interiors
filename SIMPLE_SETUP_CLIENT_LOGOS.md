# ✅ Simple Client Logos Setup - NO Server Access

## 🎯 What You Need to Do

**Only 2 simple steps in Strapi Admin UI** (no server access, no scripts needed):

---

## Step 1: Add `row2Logos` Field (2 minutes)

1. Go to **Strapi Admin**: https://admin.districtflowers.com/admin
2. Click **Content-Type Builder** (left sidebar)
3. Find and click **"Client Logos Section"**
4. Scroll down, click **"Add another field"**
5. Select **"Component"**
6. Fill in:
   - **Name:** `row2Logos`
   - **Component:** Select **"Client Logo Item"**
   - **Repeatable:** ✅ Yes (check this!)
7. Click **"Finish"**
8. Click **"Save"** (top right)
9. Wait 10-30 seconds for Strapi to restart

**Done!** ✅

---

## Step 2: Add Logos (5-10 minutes)

1. Go to **Content Manager** → **Client Logos Section**
2. Click **"Edit"** or **"Create new entry"**
3. Fill in:
   - **Title:** `Trusted By Leading Brands`
   - **Subtitle:** `Proud collaborations with top names in hospitality and design.`
4. **Row 1 Logos:**
   - Click **"Add an entry"** for each logo
   - For each:
     - **Client Name:** (e.g., "PepsiCo")
     - **Logo:** Click to upload image
     - **Website URL:** (optional, e.g., "https://pepsico.com")
     - **Display Order:** 0, 1, 2, etc.
5. **Row 2 Logos:**
   - Click **"Add an entry"** for each logo
   - Repeat same steps as Row 1
6. Click **"Save"** (top right)
7. **IMPORTANT:** Click **"Publish"** button (top right)

**Done!** ✅ The logos will now appear on your frontend.

---

## 🔍 Verify It Works

Visit: https://web.districtflowers.com/interiors

You should see two rows of client logos scrolling.

---

## ✅ That's It!

**No server access needed.**
**No scripts needed.**
**Just Strapi Admin UI!**

The frontend is already set up and will work perfectly once you add the content above.

---

## 💡 Tips

- **Logo Images:** Upload high-quality logos (PNG with transparent background works best)
- **Logo Size:** Recommended 200-400px width, keep aspect ratio
- **Display Order:** Use 0, 1, 2, 3... to control the order they appear
- **Must Publish:** Always click "Publish" after saving, otherwise frontend won't see it

