# How to Populate Strapi Content

## Option 1: Wait for Deployment, Then Run Script (Recommended)

1. **Wait for Coolify to redeploy** the CMS service with the new PUT handlers (just pushed)
2. **Run the populate script:**
   ```powershell
   cd apps/cms
   $env:STRAPI_URL="https://admin.districtflowers.com"
   $env:API_TOKEN="d387609ba8c2412056ed9fd4b3b3bac1ee50bc56811c2aa19db129bee62fe5fa0ff24c8ff174a2f9af4e9f0336e1c51a8dca30d1f17b47fac7e20cc8480ce6818afef2234fcfea1defaf16d3702d0e56d55247efeadb0fb9b1190527148462f647371797243b22dbf10f1bd7732caa1d02b0755bc0a826021a2f06b06bfec2c7"
   $env:STRAPI_API_TOKEN=$env:API_TOKEN
   node scripts/populate-all-content.js
   ```

## Option 2: Manual Creation in Strapi Admin

Go to **https://admin.districtflowers.com/admin** and manually create each content type:

### 1. Hero Section
- Go to **Content Manager → Hero Section**
- Click **"Create new entry"**
- Fill in:
  - **Title**: `Transform Your Space with Premium Interior Greenery`
  - **Subtitle**: `Partnering with architects and designers to bring nature into luxury spaces`
  - **Description**: `District Interiors helps architects, designers, and property developers create stunning interior environments with premium artificial and natural plants. From luxury villas to corporate offices, we deliver bespoke greenery solutions.`
  - **Primary Button Text**: `Explore Our Services`
  - **Primary Button Action**: `link`
  - **Primary Button Link**: `/services`
  - **Secondary Button Text**: `View Portfolio`
  - **Secondary Button Action**: `link`
  - **Secondary Button Link**: `/projects`
- Click **"Save"** then **"Publish"**

### 2. Why Choose Us
- Go to **Content Manager → Why Choose Us**
- Click **"Create new entry"**
- Fill in:
  - **Title**: `Why Clients Choose District Interiors`
  - **Subtitle**: `Trusted by leading companies for our flexibility, fast turnaround, and dependable delivery in office environments.`
  - **Features** (Add 5 features):
    1. Icon: `leaf`, Title: `Dual Expertise`, Description: `Specialists in both natural and artificial greenery.`
    2. Icon: `palette`, Title: `Customization`, Description: `Trees, planters, and layouts tailored to every project.`
    3. Icon: `recycle`, Title: `Sustainability`, Description: `Eco-focused solutions and long-term maintenance.`
    4. Icon: `award`, Title: `Quality Assurance`, Description: `Realistic greenery and reliable upkeep.`
    5. Icon: `building2`, Title: `Luxury Reach`, Description: `Serving villas, hotels, and premium corporate projects.`
- Click **"Save"** then **"Publish"**

### 3. About Snapshot
- Go to **Content Manager → About Snapshot**
- Fill in:
  - **Title**: `About District Interiors`
  - **Subtitle**: `Your Trusted Partner in Interior Greenery`
  - **Description**: `With years of experience in the luxury interior design space, District Interiors specializes in creating stunning botanical environments that enhance any space. We work closely with architects, designers, and property developers to deliver bespoke solutions.`
- Click **"Save"** then **"Publish"**

### 4. Stats Section
- Go to **Content Manager → Stats Section**
- Fill in:
  - **Title**: `Our Impact`
  - **Subtitle**: `Numbers that speak for themselves`
  - **Stats** (Add 4 stats):
    1. Value: `500+`, Label: `Projects Completed`
    2. Value: `200+`, Label: `Happy Clients`
    3. Value: `15+`, Label: `Years Experience`
    4. Value: `98%`, Label: `Client Satisfaction`
- Click **"Save"** then **"Publish"**

### 5. Services Section
- Go to **Content Manager → Services Section**
- Fill in:
  - **Title**: `Our Services`
  - **Subtitle**: `Comprehensive interior greenery solutions`
  - **Services** (Add 4 services):
    1. Title: `Interior Plant Design`, Description: `Custom plant arrangements tailored to your space`
    2. Title: `Maintenance Services`, Description: `Regular care and upkeep for your greenery`
    3. Title: `Consultation`, Description: `Expert advice on plant selection and placement`
    4. Title: `Installation`, Description: `Professional installation of all greenery elements`
- Click **"Save"** then **"Publish"**

### 6. Collection Preview
- Go to **Content Manager → Collection Preview**
- Fill in:
  - **Title**: `Our Collections`
  - **Subtitle**: `Explore our curated selection of premium plants`
  - **Collections** (Add 3 collections):
    1. Name: `Luxury Trees`, Description: `Premium artificial trees for grand spaces`, Slug: `luxury-trees`
    2. Name: `Office Plants`, Description: `Low-maintenance plants for corporate environments`, Slug: `office-plants`
    3. Name: `Decorative Plants`, Description: `Beautiful plants to enhance any interior`, Slug: `decorative-plants`
- Click **"Save"** then **"Publish"**

### 7. Dual CTA
- Go to **Content Manager → Dual CTA**
- Fill in:
  - **Primary CTA Text**: `Start Your Project`
  - **Primary CTA Link**: `/contact`
  - **Secondary CTA Text**: `View Portfolio`
  - **Secondary CTA Link**: `/projects`
- Click **"Save"** then **"Publish"**

### 8. Client Logos
- Go to **Content Manager → Client Logos**
- Fill in:
  - **Title**: `Trusted By Leading Brands`
  - **Subtitle**: `Proud collaborations with top names in hospitality and design.`
  - **Row 1 Logos** (Add 5):
    1. Client Name: `PepsiCo` (placeholder: true)
    2. Client Name: `Marriott` (placeholder: true)
    3. Client Name: `Hilton` (placeholder: true)
    4. Client Name: `Four Seasons` (placeholder: true)
    5. Client Name: `Hyatt` (placeholder: true)
  - **Row 2 Logos** (Add 4):
    1. Client Name: `Google` (placeholder: true)
    2. Client Name: `Microsoft` (placeholder: true)
    3. Client Name: `Amazon` (placeholder: true)
    4. Client Name: `Apple` (placeholder: true)
- Click **"Save"** then **"Publish"**

## After Populating

1. **Verify all content is published** (green "Published" badge)
2. **Check frontend** - Visit your website to see the content
3. **Upload images** where needed (Hero Section, About Snapshot, etc.)

---

**Note**: The automated script will work once Coolify redeploys the CMS with the new PUT handlers. Check deployment status in Coolify first!





