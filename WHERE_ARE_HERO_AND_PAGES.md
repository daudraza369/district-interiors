# 📍 Where to Find Hero and Pages in Strapi

## 🎯 Quick Answer

You're currently in **Content-Type Builder** (defines structure), but you need to:

1. **Create Hero Section** - It doesn't exist yet! Follow steps below
2. **View/Edit Pages** - Go to **Content Manager** (not Content-Type Builder)

---

## 🚀 Step 1: Create Hero Section (Single Type)

### In Content-Type Builder (where you are now):

1. Look at **"SINGLE TYPES"** section (currently shows "0")
2. Click **"+ Create new single type"**
3. Enter:
   - **Display name:** `Hero Section`
   - **API ID (singular):** `hero-section`
   - **API ID (plural):** `hero-sections`
4. Click **"Continue"**

5. Add these 12 fields (click "+ Add another field" for each):

   **Field 1: Title**
   - Type: Text
   - Name: `title`
   - Required: Yes
   - Default: `Where Design Takes Root`

   **Field 2: Subtitle**
   - Type: Long text
   - Name: `subtitle`
   - Required: Yes

   **Field 3: Description**
   - Type: Long text
   - Name: `description`
   - Required: Yes

   **Field 4: Primary Button Text**
   - Type: Text
   - Name: `primaryButtonText`
   - Default: `Explore Our Work`

   **Field 5: Primary Button Action**
   - Type: Enumeration
   - Name: `primaryButtonAction`
   - Values: `scroll`, `link`
   - Default: `scroll`

   **Field 6: Primary Button Link**
   - Type: Text
   - Name: `primaryButtonLink`

   **Field 7: Primary Button Scroll Target**
   - Type: Text
   - Name: `primaryButtonScrollTarget`
   - Default: `portfolio`

   **Field 8: Secondary Button Text**
   - Type: Text
   - Name: `secondaryButtonText`
   - Default: `Request a Consultation`

   **Field 9: Secondary Button Action**
   - Type: Enumeration
   - Name: `secondaryButtonAction`
   - Values: `scroll`, `link`
   - Default: `scroll`

   **Field 10: Secondary Button Link**
   - Type: Text
   - Name: `secondaryButtonLink`

   **Field 11: Secondary Button Scroll Target**
   - Type: Text
   - Name: `secondaryButtonScrollTarget`
   - Default: `contact`

   **Field 12: Hero Image**
   - Type: Media
   - Name: `heroImage`
   - Allowed types: Images only
   - Multiple: No

6. Click **"Save"** (top right)
7. Strapi will reload
8. You'll see **"Hero Section"** under Single Types!

---

## 📄 Step 2: Find Your Pages (Page Sections)

### Pages are stored in "Page Section" Collection Type

**You're in the wrong place!** You're in **Content-Type Builder** (defines structure).  
**You need to go to Content Manager** (manages actual content).

### How to View/Edit Pages:

1. **Click "Content Manager"** in the left sidebar (above Content-Type Builder)
2. Look for **"Page Section"** in the collection types
3. Click on **"Page Section"**
4. You'll see all your page sections!

### Page Section Structure:

Each "Page Section" entry represents a section on a page:

- **Page field**: Which page it belongs to (home, about, services, projects, collection, contact, tree-solutions)
- **Section Key**: Which section on that page (e.g., "hero", "services", "testimonials")
- **Content**: The actual content (stored as JSON)

### Example Page Sections:

- `page: "home"`, `sectionKey: "hero"` → Homepage hero section
- `page: "home"`, `sectionKey: "services"` → Homepage services section
- `page: "about"`, `sectionKey: "hero"` → About page hero section
- etc.

---

## 🎨 How Frontend Uses These

### Hero Section:
- Frontend currently has hardcoded hero sections
- Once you create Hero Section in Strapi, we'll update frontend to fetch from Strapi

### Page Sections:
- Frontend fetches page sections using:
  ```typescript
  getPageSections('home')  // Gets all sections for homepage
  getPageSections('about') // Gets all sections for about page
  ```
- Each page section has a `sectionKey` that identifies which section it is

---

## ✅ What You Should See After Creating Hero Section

### In Content-Type Builder:
- **Single Types**: 1 (Hero Section)
- **Collection Types**: 12 (including Page Section)

### In Content Manager:
- **Hero Section**: Create/edit homepage hero content
- **Page Section**: View/edit all page sections (home, about, services, etc.)

---

## 🚨 Important Notes

1. **Content-Type Builder** = Define structure (what fields exist)
2. **Content Manager** = Manage content (actual data/entries)
3. **Hero Section** = Single Type (one hero for homepage)
4. **Page Section** = Collection Type (many sections for different pages)

---

## 📝 Next Steps

1. ✅ Create Hero Section (Single Type) - Follow Step 1 above
2. ✅ Go to Content Manager to see Page Sections
3. ✅ Create/edit page section entries for your pages
4. ✅ Update frontend to fetch Hero Section from Strapi

---

**Need Help?** Check `QUICK_FIX_STEPS.md` for detailed Hero Section creation steps!
















