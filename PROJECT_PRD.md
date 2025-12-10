# District Interiors Bloom - Product Requirements Document (PRD)

## Executive Summary

**Project Name:** District Interiors Bloom  
**Project Type:** Corporate Website with CMS Admin Panel  
**Technology Stack:** React + TypeScript + Vite + Supabase + Tailwind CSS  
**Current Status:** Production-ready website with full admin CMS capabilities

District Interiors Bloom is a modern, luxury-focused corporate website for an interior plantscaping company. The platform consists of a public-facing marketing website and a comprehensive Content Management System (CMS) for managing all website content, media, and user access.

---

## 1. Project Overview

### 1.1 Purpose
A dual-purpose platform serving:
- **Public Website:** Marketing and showcase platform for District Interiors' services, projects, and collection
- **Admin CMS:** Full content management system for non-technical staff to manage website content

### 1.2 Target Users
- **Public Users:** Potential clients, architects, designers, and fit-out specialists
- **Admin Users:** Content managers, editors, and administrators
- **Editor Users:** Limited access content editors

### 1.3 Business Goals
- Showcase company services, portfolio, and product collection
- Generate leads through contact forms and consultation requests
- Enable non-technical staff to manage website content independently
- Maintain brand consistency with luxury, nature-focused aesthetic

---

## 2. Technical Architecture

### 2.1 Frontend Stack
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite 5.4.19
- **Routing:** React Router DOM 6.30.1
- **UI Library:** shadcn/ui (Radix UI components)
- **Styling:** Tailwind CSS 3.4.17 with custom design system
- **Animations:** Framer Motion 12.23.25
- **State Management:** React Query (TanStack Query) 5.83.0
- **Forms:** React Hook Form 7.61.1 + Zod 3.25.76

### 2.2 Backend & Database
- **Backend:** Supabase (PostgreSQL database)
- **Authentication:** Supabase Auth with role-based access control
- **Storage:** Supabase Storage for media assets
- **Database Version:** PostgreSQL 17.6

### 2.3 Design System
- **Custom Color Palette:**
  - Primary: Night Green (hsl(155 22% 16%))
  - Secondary: Slate Moss (hsl(155 10% 32%))
  - Neutral: Stone (hsl(60 3% 78%)), Ivory (hsl(60 30% 98%))
  - Accents: Pear, Lavender, Mauve, Blush
- **Typography:**
  - Headings: Kalice (custom font)
  - Body: Santana (custom font)
- **Design Philosophy:** Luxury, nature-inspired, minimalist with sophisticated animations

---

## 3. Database Schema

### 3.1 Core Tables

#### **profiles**
User profile information linked to Supabase Auth
- `id` (UUID, PK)
- `user_id` (UUID, FK to auth.users)
- `email` (text)
- `full_name` (text, nullable)
- `avatar_url` (text, nullable)
- `created_at`, `updated_at` (timestamps)

#### **user_roles**
Role-based access control (RBAC)
- `id` (UUID, PK)
- `user_id` (UUID, FK to auth.users)
- `role` (enum: 'admin' | 'editor')
- `created_at` (timestamp)

#### **projects**
Portfolio project showcase
- `id` (UUID, PK)
- `title` (text)
- `slug` (text, unique)
- `location` (text, nullable)
- `client_name` (text, nullable)
- `project_type` (text, nullable)
- `description` (text, nullable)
- `hero_image` (text, nullable)
- `gallery` (JSONB array)
- `services_used` (text array)
- `highlights` (text array)
- `is_published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **services**
Service offerings management
- `id` (UUID, PK)
- `title` (text)
- `slug` (text, unique)
- `icon` (text, nullable)
- `short_description` (text, nullable)
- `long_description` (text, nullable)
- `hero_image` (text, nullable)
- `key_benefits` (JSONB, nullable)
- `process_steps` (JSONB, nullable)
- `is_published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **collection_items**
Product catalog items
- `id` (UUID, PK)
- `name` (text)
- `slug` (text, unique)
- `category` (text)
- `short_description` (text, nullable)
- `dimensions` (text, nullable)
- `materials` (text, nullable)
- `price` (text, nullable)
- `images` (JSONB array, default: [])
- `application` (text, nullable)
- `is_published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **testimonials**
Client testimonials
- `id` (UUID, PK)
- `client_name` (text)
- `company` (text, nullable)
- `role` (text, nullable)
- `quote` (text)
- `client_logo` (text, nullable)
- `is_published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **client_logos**
Client logo showcase
- `id` (UUID, PK)
- `client_name` (text)
- `logo_url` (text)
- `website_url` (text, nullable)
- `is_published` (boolean, default: true)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **stats**
Company statistics/metrics
- `id` (UUID, PK)
- `label` (text)
- `value` (text)
- `unit` (text, nullable)
- `display_order` (integer, default: 0)
- `created_at`, `updated_at` (timestamps)

#### **section_content**
Dynamic page section content (Page Builder)
- `id` (UUID, PK)
- `page` (text) - 'home', 'about', 'services', 'projects', 'collection', 'contact'
- `section_key` (text) - unique identifier for section
- `section_name` (text) - human-readable name
- `content` (JSONB) - flexible content structure
- `is_published` (boolean, nullable)
- `created_at`, `updated_at` (timestamps)

#### **media_assets**
Media library for uploaded files
- `id` (UUID, PK)
- `file_name` (text)
- `file_path` (text)
- `file_type` (text)
- `file_size` (integer, nullable)
- `alt_text` (text, nullable)
- `uploaded_by` (UUID, nullable, FK to auth.users)
- `created_at` (timestamp)

### 3.2 Database Functions
- `handle_new_user()` - Auto-creates profile on user signup
- `has_role(_user_id, _role)` - Checks if user has specific role
- `is_admin_or_editor(_user_id)` - Checks admin/editor access
- `update_updated_at_column()` - Auto-updates timestamp trigger

### 3.3 Enums
- `app_role`: 'admin' | 'editor'

---

## 4. Public Website Features

### 4.1 Public Pages

#### **Homepage (`/`)**
Multi-section landing page with:
- Hero section with CTA buttons
- Why Choose Us section
- Collection preview
- Services overview
- About snapshot
- Dual CTA section
- Statistics showcase
- Client logos carousel
- Portfolio preview
- Gallery section
- Testimonials carousel
- Tree consultation preview
- Maintenance services section
- Contact section

#### **Services (`/services`)**
- Hero section with service overview
- Grid of 6 main services:
  1. Office & F&B Plantscaping
  2. Tree Customization & Enhancement
  3. Tree Restoration & Refurbishment
  4. Green Wall Installations
  5. Custom Planter Design & Fabrication
  6. Natural Plant Maintenance
- Individual service detail pages (via slug routing)
- CTA section for consultation requests

#### **Tree Solutions (`/tree-solutions`)**
- Dedicated page for tree-related services
- Consultation form integration

#### **Collection (`/collection`)**
- Category-filtered product catalog
- Categories: All, Trees, Flowers, Leaves/Foliage, Green Walls, Trunks & Branches, Planters
- Grid layout with product cards
- Price display (or "Price on Request")

#### **Projects (`/projects`)**
- Portfolio showcase with category filtering
- Categories: All, Office, Hospitality, F&B, Retail, Villa
- Masonry-style grid layout
- Project detail cards with hover effects
- Location and project type display

#### **About (`/about`)**
- Company story and values
- Team information (if applicable)
- Mission and vision

#### **Contact (`/contact`)**
- Contact form (email, name, message)
- Contact information display:
  - Email: Sales@district.sa
  - Phone: +966 056 228 8177
  - WhatsApp: +966 50 060 6506
  - Address: Al Zoubair Ibn Al Awwam, Ar Rawabi, Riyadh 14214
- Direct links to email, phone, WhatsApp, and Google Maps

### 4.2 Navigation
- **Header Navigation:**
  - Home
  - Services (dropdown with 6 sub-services)
  - Collection
  - Tree Solutions
  - Projects
  - About
  - Contact
  - "Request Consultation" CTA button
- **Mobile:** Hamburger menu with collapsible dropdowns
- **Footer:** Additional navigation links and company information

### 4.3 Design Features
- **Animations:**
  - Scroll-triggered fade-in animations
  - Hover effects on cards and images
  - Smooth page transitions
  - Parallax effects on hero sections
- **Responsive Design:**
  - Mobile-first approach
  - Breakpoints: sm, md, lg, xl, 2xl
  - Touch-friendly interactions
- **Accessibility:**
  - Semantic HTML
  - ARIA labels where appropriate
  - Keyboard navigation support

---

## 5. Admin CMS Features

### 5.1 Authentication & Authorization

#### **Authentication Flow**
- Login page at `/admin/auth`
- Email/password authentication via Supabase Auth
- Session persistence with localStorage
- Auto-redirect to dashboard on successful login
- Protected routes requiring authentication

#### **Role-Based Access Control (RBAC)**
- **Admin Role:**
  - Full access to all admin features
  - User management capabilities
  - All editor permissions
- **Editor Role:**
  - Content management (projects, services, collection, testimonials, clients, stats)
  - Media library access
  - Page builder access
  - No user management access

#### **User Management** (Admin Only)
- View all users
- Create new users
- Assign roles (admin/editor)
- Delete users
- Profile management

### 5.2 Admin Dashboard (`/admin`)
- **Overview Statistics:**
  - Total projects count
  - Total services count
  - Total collection items count
  - Total testimonials count
  - Total client logos count
  - Total media files count
- **Quick Actions:**
  - Add New Project
  - Upload Media
  - Add Testimonial
- **Website Links:**
  - Quick access to public pages (opens in new tab)

### 5.3 Content Management Modules

#### **Projects Admin (`/admin/projects`)**
- **Features:**
  - List all projects with sortable table
  - Create new project
  - Edit existing project
  - Delete project
  - Toggle publish/unpublish status
  - Set display order
  - Upload hero image
  - Manage gallery images (JSONB array)
  - Add services used (array)
  - Add highlights (array)
- **Fields:**
  - Title, Slug (auto-generated), Location, Client Name, Project Type
  - Description (textarea), Hero Image URL
  - Gallery (multiple images), Services Used (tags), Highlights (tags)
  - Publish toggle, Display Order

#### **Services Admin (`/admin/services`)**
- **Features:**
  - List all services
  - Create/Edit/Delete services
  - Toggle publish status
  - Set display order
  - Manage service details:
    - Icon, Hero Image
    - Short/Long descriptions
    - Key Benefits (JSONB array)
    - Process Steps (JSONB array)
- **Fields:**
  - Title, Slug, Icon, Hero Image
  - Short Description, Long Description
  - Key Benefits (array), Process Steps (array)
  - Publish toggle, Display Order

#### **Collection Admin (`/admin/collection`)**
- **Features:**
  - List all collection items
  - Create/Edit/Delete items
  - Toggle publish status
  - Set display order
  - Category management
  - Image gallery management
- **Fields:**
  - Name, Slug, Category
  - Short Description, Dimensions, Materials, Price
  - Images (JSONB array), Application
  - Publish toggle, Display Order

#### **Testimonials Admin (`/admin/testimonials`)**
- **Features:**
  - List all testimonials
  - Create/Edit/Delete testimonials
  - Toggle publish status
  - Set display order
  - Upload client logo
- **Fields:**
  - Client Name, Company, Role
  - Quote (textarea)
  - Client Logo URL
  - Publish toggle, Display Order

#### **Client Logos Admin (`/admin/clients`)**
- **Features:**
  - List all client logos
  - Create/Edit/Delete logos
  - Toggle publish status
  - Set display order
  - Link to client website
- **Fields:**
  - Client Name, Logo URL, Website URL
  - Publish toggle, Display Order

#### **Statistics Admin (`/admin/stats`)**
- **Features:**
  - List all statistics
  - Create/Edit/Delete stats
  - Set display order
- **Fields:**
  - Label, Value, Unit
  - Display Order

### 5.4 Page Builder (`/admin/pages`)
**Advanced CMS feature for dynamic content management**

- **Page Selection:**
  - Home, About, Services, Projects, Collection, Contact
  - Tab-based interface for switching between pages

- **Section Management:**
  - List all sections for selected page
  - Expandable/collapsible section cards
  - Visual section hierarchy
  - Publish/unpublish toggle per section

- **Content Editing:**
  - Dynamic form fields based on section structure
  - Text inputs, textareas, image selectors
  - Array/list item management (add, edit, delete, reorder)
  - Rich content editing for flexible structures
  - Real-time preview capability

- **Media Integration:**
  - Media library dialog
  - Image picker for section fields
  - Upload new media directly from page builder
  - Alt text management

- **Features:**
  - Save all changes at once
  - Track unsaved changes
  - Visual indicators for published/unpublished sections
  - External link to preview page

### 5.5 Media Library (`/admin/media`)
- **Features:**
  - Grid view of all uploaded media
  - Upload new files (images, documents)
  - Delete media files
  - View file details (name, type, size, upload date)
  - Alt text management
  - File type filtering
  - Search functionality
- **Supported File Types:**
  - Images (JPG, PNG, GIF, WebP, SVG)
  - Documents (PDF, etc.)
- **Storage:** Supabase Storage buckets

### 5.6 Admin Layout
- **Sidebar Navigation:**
  - Dashboard
  - Page Builder
  - Projects
  - Services
  - Collection
  - Testimonials
  - Client Logos
  - Statistics
  - Media Library
  - User Management (Admin only)
- **Header:**
  - User email display
  - Role indicator (Admin/Editor)
  - Sign out button
- **Responsive:**
  - Mobile hamburger menu
  - Collapsible sidebar
  - Touch-friendly interface

---

## 6. User Experience (UX) Features

### 6.1 Public Website UX
- **Smooth Scrolling:** Scroll-triggered animations
- **Loading States:** Skeleton loaders for content
- **Error Handling:** 404 page for invalid routes
- **Form Validation:** Client-side validation with helpful error messages
- **Toast Notifications:** Success/error feedback for form submissions
- **Image Optimization:** Responsive images with lazy loading
- **Performance:** Optimized bundle size, code splitting

### 6.2 Admin CMS UX
- **Intuitive Interface:** Clean, organized admin layout
- **Bulk Operations:** Efficient content management workflows
- **Search & Filter:** Quick content discovery
- **Drag & Drop:** Reordering capabilities (display order)
- **Confirmation Dialogs:** Prevent accidental deletions
- **Auto-save Indicators:** Visual feedback for saved changes
- **Responsive Admin:** Full functionality on mobile devices

---

## 7. Security Features

### 7.1 Authentication Security
- Secure password authentication via Supabase
- Session management with auto-refresh tokens
- Protected admin routes with authentication checks
- Role-based route protection

### 7.2 Data Security
- Row Level Security (RLS) policies in Supabase
- SQL injection protection via parameterized queries
- XSS protection through React's built-in escaping
- CSRF protection via Supabase's security model

### 7.3 Access Control
- Role-based permissions enforced at database level
- Admin-only features hidden from editors
- Secure file upload validation
- Media access control

---

## 8. Content Management Workflows

### 8.1 Content Creation Flow
1. Admin/Editor logs into admin panel
2. Navigates to relevant content module
3. Clicks "Add New" or "Create" button
4. Fills in required fields
5. Uploads images/media if needed
6. Sets publish status and display order
7. Saves content
8. Content appears on public website (if published)

### 8.2 Page Builder Workflow
1. Navigate to Page Builder
2. Select target page (Home, About, etc.)
3. Expand section to edit
4. Modify content fields
5. Upload/select images from media library
6. Add/remove/reorder list items
7. Toggle publish status
8. Save all changes
9. Preview on public website

### 8.3 Media Management Workflow
1. Navigate to Media Library
2. Click "Upload" button
3. Select file(s) from device
4. File uploads to Supabase Storage
5. Media asset record created in database
6. Media available in all content modules
7. Can be deleted if no longer needed

---

## 9. Technical Implementation Details

### 9.1 File Structure
```
src/
├── components/
│   ├── admin/          # Admin-specific components
│   ├── layout/         # Header, Footer
│   ├── sections/       # Homepage sections
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── integrations/       # Supabase client & types
├── lib/                # Utilities
├── pages/              # Route pages
│   ├── admin/          # Admin pages
│   └── [public pages]
└── assets/             # Static images
```

### 9.2 Key Custom Hooks
- `useAuth` - Authentication state management
- `useScrollAnimation` - Scroll-triggered animations
- `useToast` - Toast notification system
- `use-mobile` - Responsive breakpoint detection

### 9.3 State Management
- React Query for server state (data fetching, caching)
- React Context for auth state
- Local component state for UI interactions
- URL state for routing and filters

### 9.4 Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key

---

## 10. Deployment & Infrastructure

### 10.1 Build Process
- **Development:** `npm run dev` - Vite dev server with HMR
- **Production Build:** `npm run build` - Optimized production bundle
- **Preview:** `npm run preview` - Local production preview

### 10.2 Hosting
- Compatible with any static hosting (Vercel, Netlify, AWS S3, etc.)
- Supabase handles backend, database, and storage
- CDN-ready static assets

### 10.3 Database Migrations
- Migration file: `supabase/migrations/20251210100857_remix_migration_from_pg_dump.sql`
- Version control for schema changes
- Supabase migration system

---

## 11. Current Feature Status

### 11.1 Implemented Features ✅
- ✅ Complete public website with all pages
- ✅ Full admin CMS with 10 modules
- ✅ Authentication & role-based access
- ✅ Page Builder for dynamic content
- ✅ Media library with upload capability
- ✅ Projects, Services, Collection management
- ✅ Testimonials & Client Logos management
- ✅ Statistics management
- ✅ User management (admin only)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animations and smooth interactions
- ✅ Form validation and error handling

### 11.2 Potential Enhancements (Not Currently Implemented)
- ⚠️ Contact form submission handling (backend integration)
- ⚠️ Email notifications for form submissions
- ⚠️ SEO optimization (meta tags, sitemap, structured data)
- ⚠️ Multi-language support (currently English only)
- ⚠️ Blog/news section
- ⚠️ Advanced search functionality
- ⚠️ Analytics integration
- ⚠️ Content versioning/history
- ⚠️ Bulk import/export capabilities

---

## 12. Design System Details

### 12.1 Color Palette
- **Primary Brand Colors:**
  - Night Green: `hsl(155 22% 16%)` - Primary dark green
  - Slate Moss: `hsl(155 10% 32%)` - Secondary muted green
  - Stone: `hsl(60 3% 78%)` - Light neutral
  - Ivory: `hsl(60 30% 98%)` - Off-white background

- **Accent Colors:**
  - Pear: `hsl(72 46% 83%)` - Light green accent
  - Lavender: `hsl(270 33% 66%)` - Purple accent
  - Mauve: `hsl(280 33% 79%)` - Pink-purple accent
  - Blush: `hsl(20 18% 88%)` - Peach accent

### 12.2 Typography
- **Headings:** Kalice (custom serif font) - Luxury, elegant
- **Body:** Santana (custom sans-serif font) - Modern, readable
- **Font Sizes:** Responsive scale from mobile to desktop

### 12.3 Spacing & Layout
- **Container:** Max-width with luxury padding (`container-luxury`)
- **Section Padding:** Consistent vertical spacing
- **Grid System:** CSS Grid and Flexbox for layouts

### 12.4 Components
- **Buttons:** Hero (primary), Hero Outline (secondary), Ghost variants
- **Cards:** Elevated cards with hover effects
- **Forms:** Clean inputs with validation states
- **Modals/Dialogs:** Overlay dialogs for admin actions
- **Tables:** Sortable, filterable data tables

---

## 13. Performance Considerations

### 13.1 Optimization Strategies
- Code splitting via React Router
- Lazy loading for images
- React Query caching for API calls
- Optimized bundle size with Vite
- Minimal JavaScript for initial load

### 13.2 Image Handling
- Responsive image sizing
- Lazy loading implementation
- Optimized formats (WebP where supported)
- CDN-ready asset structure

---

## 14. Browser Support

### 14.1 Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 14.2 Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

---

## 15. Maintenance & Updates

### 15.1 Content Updates
- Non-technical staff can update all content via admin panel
- No code changes required for content updates
- Media uploads handled through admin interface

### 15.2 Code Updates
- Version control via Git
- Environment variable management
- Database migrations for schema changes
- Dependency updates via npm

---

## 16. Documentation & Support

### 16.1 Code Documentation
- TypeScript types for all data structures
- Component prop types
- Function JSDoc comments (where applicable)

### 16.2 User Documentation
- Admin user guide (can be created)
- Content management workflows
- Media upload guidelines

---

## 17. Project Statistics

### 17.1 Codebase Metrics
- **Total Pages:** 14 (7 public + 7 admin)
- **Components:** 50+ React components
- **Database Tables:** 11 tables
- **Admin Modules:** 10 management modules
- **Public Sections:** 14 homepage sections

### 17.2 Technology Count
- **UI Components:** 40+ shadcn/ui components
- **Custom Hooks:** 4 custom hooks
- **Routes:** 20+ defined routes
- **Database Functions:** 3 SQL functions

---

## 18. Future Roadmap Considerations

### 18.1 Potential Features
1. **E-commerce Integration**
   - Shopping cart for collection items
   - Payment processing
   - Order management

2. **Advanced CMS Features**
   - Content scheduling
   - A/B testing
   - Content analytics

3. **Client Portal**
   - Client login area
   - Project status tracking
   - Communication tools

4. **Marketing Tools**
   - Newsletter integration
   - Social media integration
   - Lead capture forms

5. **Internationalization**
   - Multi-language support
   - RTL support for Arabic
   - Regional content management

---

## 19. Conclusion

District Interiors Bloom is a comprehensive, production-ready website platform with a fully functional CMS. The system enables non-technical staff to manage all website content while maintaining a luxury, professional brand presence. The architecture is scalable, maintainable, and built with modern web technologies.

The platform successfully balances:
- **User Experience:** Beautiful, responsive public website
- **Content Management:** Intuitive admin interface
- **Security:** Role-based access and data protection
- **Performance:** Optimized loading and interactions
- **Maintainability:** Clean code structure and documentation

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Current State Documentation

