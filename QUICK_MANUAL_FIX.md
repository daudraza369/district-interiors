# ⚡ QUICK MANUAL FIX - Fill Missing Content

Since the API is giving 405 errors, here's the fastest way to fix it manually:

## 🎯 Hero Section (2 minutes)

1. Go to `http://localhost:1337/admin`
2. **Content Manager** → **Hero Section**
3. Fill these fields:

   **Subtitle:**
   ```
   Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.
   ```

   **Description:**
   ```
   District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.
   ```

4. **Link the Image:**
   - Click the `heroImage` field (purple image icon)
   - Click "Select an asset"
   - Find `hero-interior.jpg` in the list
   - Click it → Click "Finish"

5. **IMPORTANT:** Click **"Publish"** button (top right, green checkmark)
   - Don't just click "Save" - you need to PUBLISH it!

## 📄 Page Sections

The Page Sections already exist (you have 12 entries). You can:
- Edit them one by one to add content
- Or fix the API token and run the script

## 🔧 Fix API Token (For Future Automation)

1. **Settings** → **API Tokens**
2. **Edit** your token
3. Set **Token type** to **"Full access"**
4. **Save**
5. Then scripts will work automatically

---

**After filling Hero Section manually, click PUBLISH and refresh your frontend!**
















