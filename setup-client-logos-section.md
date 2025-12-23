# Setup Client Logos Section in Strapi

## Content Type Structure

Based on the component requirements, we need a **Single Type** called `client-logos-section` with:

### Fields:
1. **title** (Text) - Default: "Trusted By Leading Brands"
2. **subtitle** (Text) - Default: "Proud collaborations with top names in hospitality and design."
3. **showRow1** (Boolean) - Default: true
4. **showRow2** (Boolean) - Default: true
5. **row1Logos** (Component - Repeatable) - `ClientLogoItem`
6. **row2Logos** (Component - Repeatable) - `ClientLogoItem`

### Component: ClientLogoItem
1. **clientName** (Text, Required)
2. **logo** (Media - Single image)
3. **websiteUrl** (Text, Optional)
4. **displayOrder** (Number, Integer, Default: 0)

## Steps to Create in Strapi Admin

1. **Create the Component first:**
   - Go to Content-Type Builder → Components
   - Click "Create new component"
   - Display name: `Client Logo Item`
   - Category: `shared` (or create new category)
   - Add fields:
     - `clientName` (Text, Required)
     - `logo` (Media - Single, Allowed types: Images)
     - `websiteUrl` (Text, Optional)
     - `displayOrder` (Number - Integer, Default: 0)
   - Save

2. **Create the Single Type:**
   - Go to Content-Type Builder → Single Types
   - Click "Create new single type"
   - Display name: `Client Logos Section`
   - API ID (singular): `client-logos-section`
   - Add fields:
     - `title` (Text, Required) - Default: "Trusted By Leading Brands"
     - `subtitle` (Text, Optional)
     - `showRow1` (Boolean, Default: true)
     - `showRow2` (Boolean, Default: true)
     - `row1Logos` (Component - Repeatable) - Select "Client Logo Item"
     - `row2Logos` (Component - Repeatable) - Select "Client Logo Item"
   - Save

3. **Set Permissions:**
   - Settings → Users & Permissions Plugin → Roles → Public
   - Find "Client Logos Section"
   - Enable:
     - ✅ find
     - ✅ findOne
   - Save

4. **Create and Publish Content:**
   - Content Manager → Single Types → Client Logos Section
   - Fill in:
     - Title: "Trusted By Leading Brands"
     - Subtitle: "Proud collaborations with top names in hospitality and design."
     - showRow1: true
     - showRow2: true
   - Add logos to row1Logos and row2Logos
   - Save and Publish

