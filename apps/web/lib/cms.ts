/**
 * Typed CMS client - Now using Payload CMS!
 * Direct database queries with full type safety
 * 
 * NOTE: This file re-exports types (safe for client) and server functions (server-only)
 */

// Re-export all types (client-safe)
export * from './cms-types';

// Re-export client-safe media utilities
export { getImageUrl, getMediaUrl, isVideo } from './media-utils';

// Server-only imports (dynamic to prevent client bundling)
let payloadCms: any = null;
const getPayloadFunctions = () => {
  if (typeof window !== 'undefined') {
    throw new Error('CMS functions can only be called on the server');
  }
  if (!payloadCms) {
    payloadCms = require('./cms-payload');
  }
  return payloadCms;
};

// Strapi imports (will be removed later, keeping for compatibility during migration)
let strapiFetch: any = null;
let strapiPublicFetch: any = null;
const getStrapiFunctions = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Strapi functions can only be called on the server');
  }
  // Strapi removed - return null functions that return empty data
  return {
    strapiFetch: async () => ({ data: [] }),
    strapiPublicFetch: async () => ({ data: null }),
  };
};
  name: string;
  slug: string;
  description?: string;
  image?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  displayOrder: number;
}

export interface Product {
  name: string;
  slug: string;
  category?: { data: StrapiEntity<Category> };
  shortDescription?: string;
  longDescription?: string;
  dimensions?: string;
  materials?: string;
  images?: { data: StrapiEntity<{ url: string; alternativeText?: string }>[] };
  price?: number;
  currency: string;
  priceOnRequest: boolean;
  purchasable: boolean;
  stripePriceId?: string;
  application?: string;
  displayOrder: number;
}

export interface Service {
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  longDescription?: string;
  heroImage?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  keyBenefits?: Array<{ title: string; description?: string }>;
  processSteps?: Array<{ title: string; description?: string }>;
  displayOrder: number;
}

export interface Project {
  title: string;
  slug: string;
  location?: string;
  clientName?: string;
  projectType?: string;
  description?: string;
  heroImage?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  gallery?: { data: StrapiEntity<{ url: string; alternativeText?: string }>[] };
  servicesUsed?: { data: StrapiEntity<Service>[] };
  highlights?: Array<{ text: string }>;
  displayOrder: number;
}

export interface Testimonial {
  clientName: string;
  company?: string;
  role?: string;
  quote: string;
  clientLogo?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  displayOrder: number;
}

export interface ClientLogoItem {
  clientName: string;
  // Strapi v5 format: media objects have url directly, not wrapped in data
  logo?: { url: string; alternativeText?: string; mime?: string; [key: string]: any };
  websiteUrl?: string;
  displayOrder: number;
}

export interface ClientLogosSection {
  title: string;
  subtitle?: string;
  row1Logos?: ClientLogoItem[];
  showRow1?: boolean;
  row2Logos?: ClientLogoItem[];
  showRow2?: boolean;
}

export interface Stat {
  label: string;
  value: string;
  unit?: string;
  displayOrder: number;
}

export interface PageSection {
  page: string;
  sectionKey: string;
  sectionName: string;
  content: any;
  displayOrder: number;
}

export interface ShippingOption {
  name: string;
  description?: string;
  price: number;
  currency: string;
  estimatedDays?: number;
  region: 'saudi' | 'international';
  active: boolean;
}

export interface Discount {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minPurchase?: number;
  validFrom?: string;
  validTo?: string;
  usageLimit?: number;
  active: boolean;
}

// Hero Section
export interface HeroSection {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  primaryButtonText?: string;
  primaryButtonAction?: 'link' | 'scroll';
  primaryButtonLink?: string;
  primaryButtonScrollTarget?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: 'link' | 'scroll';
  secondaryButtonLink?: string;
  secondaryButtonScrollTarget?: string;
  // Strapi v5 format: media objects have url directly, not wrapped in data
  backgroundImage?: { url: string; alternativeText?: string; mime?: string; [key: string]: any };
  heroImage?: { url: string; alternativeText?: string; mime?: string; [key: string]: any }[];
  beforeImage?: { url: string; alternativeText?: string; mime?: string; [key: string]: any };
  afterImage?: { url: string; alternativeText?: string; mime?: string; [key: string]: any };
}

// Section Config
export interface SectionConfig {
  id?: number;
  sectionKey: 'hero' | 'why-choose-us' | 'collection-preview' | 'services' | 'about-snapshot' | 'dual-cta' | 'stats' | 'client-logos' | 'portfolio' | 'gallery' | 'testimonials' | 'tree-consultation' | 'maintenance' | 'contact';
  enabled: boolean;
  displayOrder: number;
  sectionName: string;
}

export interface HomePageLayout {
  sections: SectionConfig[];
}

// Why Choose Us
export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface WhyChooseUs {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
}

// Collection Preview
export interface CollectionItem {
  title: string;
  description: string;
  image?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  imageUrl?: string;
  displayOrder: number;
}

export interface CollectionPreview {
  title: string;
  subtitle: string;
  collections: CollectionItem[];
}

// Services Section
export interface ServicePreviewItem {
  title: string;
  description: string;
  cta: string;
  href: string;
  image?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  imageUrl?: string;
  displayOrder: number;
}

export interface ServicesSection {
  title?: string;
  services: ServicePreviewItem[];
}

// About Snapshot
export interface AboutSnapshot {
  title: string;
  subtitle?: string;
  description: string;
  image?: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  imageUrl?: string;
  imageAlt?: string;
}

// Dual CTA
export interface DualCTA {
  leftTitle: string;
  leftSubtitle?: string;
  leftButtonLabel: string;
  leftButtonHref: string;
  rightTitle: string;
  rightSubtitle?: string;
  rightButtonLabel: string;
  rightButtonHref: string;
}

// Stats Section
export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  isText?: boolean;
  displayOrder: number;
}

export interface StatsSection {
  title: string;
  stats: StatItem[];
}

// Helper to check if media is video
export function isVideo(media?: any): boolean {
  if (!media) return false;
  if (media.mime) return media.mime.startsWith('video/');
  return false;
}

// Homepage sections
export async function getHomeSections(): Promise<StrapiEntity<PageSection>[]> {
  const { data } = await strapiFetch<StrapiEntity<PageSection>[]>(
    '/page-sections?filters[page][$eq]=home&sort=displayOrder:asc'
  );
  return data;
}

// Services
export async function getServices(): Promise<StrapiEntity<Service>[]> {
  const { data } = await strapiFetch<StrapiEntity<Service>[]>(
    '/services?populate=*&sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
}

export async function getServiceBySlug(slug: string): Promise<StrapiEntity<Service> | null> {
  const { data } = await strapiFetch<StrapiEntity<Service>[]>(
    `/services?filters[slug][$eq]=${slug}&populate=*&filters[publishedAt][$notNull]=true`
  );
  return data[0] || null;
}

// Products
export async function getProducts(params?: {
  category?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: StrapiEntity<Product>[]; pagination: any }> {
  const { category, page = 1, pageSize = 24 } = params || {};
  let url = `/products?populate=*&sort=displayOrder:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[publishedAt][$notNull]=true`;
  
  if (category && category !== 'All') {
    url += `&filters[category][slug][$eq]=${category}`;
  }
  
  const response = await strapiFetch<StrapiEntity<Product>[]>(url);
  return {
    data: response.data,
    pagination: response.meta?.pagination,
  };
}

export async function getProductBySlug(slug: string): Promise<StrapiEntity<Product> | null> {
  const { data } = await strapiFetch<StrapiEntity<Product>[]>(
    `/products?filters[slug][$eq]=${slug}&populate=*&filters[publishedAt][$notNull]=true`
  );
  return data[0] || null;
}

export async function getCategories(): Promise<StrapiEntity<Category>[]> {
  const { data } = await strapiFetch<StrapiEntity<Category>[]>(
    '/categories?populate=*&sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
}

// Projects
export async function getProjects(): Promise<StrapiEntity<Project>[]> {
  const { data } = await strapiFetch<StrapiEntity<Project>[]>(
    '/projects?populate=*&sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
}

export async function getProjectBySlug(slug: string): Promise<StrapiEntity<Project> | null> {
  const { data } = await strapiFetch<StrapiEntity<Project>[]>(
    `/projects?filters[slug][$eq]=${slug}&populate=*&filters[publishedAt][$notNull]=true`
  );
  return data[0] || null;
}

// Page sections
export async function getPageSections(pageKey: string): Promise<StrapiEntity<PageSection>[]> {
  const { data } = await strapiFetch<StrapiEntity<PageSection>[]>(
    `/page-sections?filters[page][$eq]=${pageKey}&sort=displayOrder:asc`
  );
  return data;
}

// Testimonials
export async function getTestimonials(): Promise<StrapiEntity<Testimonial>[]> {
  const { data } = await strapiFetch<StrapiEntity<Testimonial>[]>(
    '/testimonials?populate=*&sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
}

// Client logos section - Now using Payload!
export async function getClientLogos() {
  return payloadCms.getClientLogos();
}

// Stats
export async function getStats(): Promise<StrapiEntity<Stat>[]> {
  const { data } = await strapiFetch<StrapiEntity<Stat>[]>(
    '/stats?sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
}

// Shipping options
export async function getShippingOptions(): Promise<StrapiEntity<ShippingOption>[]> {
  const { data } = await strapiFetch<StrapiEntity<ShippingOption>[]>(
    '/shipping-options?filters[active][$eq]=true&sort=price:asc'
  );
  return data;
}

// Discount (server-side only)
export async function getDiscountByCode(code: string): Promise<StrapiEntity<Discount> | null> {
  const { data } = await strapiFetch<StrapiEntity<Discount>[]>(
    `/discounts?filters[code][$eq]=${code}&filters[active][$eq]=true`
  );
  return data[0] || null;
}

// Hero Section
export async function getHeroSection(): Promise<StrapiEntity<HeroSection> | null> {
  try {
    console.log('[getHeroSection] Fetching hero section from Strapi...');
    // Use strapiPublicFetch like other sections - this fetches published content without auth
    // This ensures that when content is published in Strapi, it shows up on the frontend
    const { data } = await strapiPublicFetch<StrapiEntity<HeroSection>>(
      '/hero-section?populate=*&publicationState=live'
    );
    if (!data) {
      console.warn('[getHeroSection] Hero Section not found in Strapi. Using fallback values.');
      return null;
    }
    console.log('[getHeroSection] Successfully fetched hero section:', {
      hasData: !!data,
      hasAttributes: !!data?.attributes,
      title: data?.attributes?.title,
    });
    return data;
  } catch (error) {
    console.error('[getHeroSection] Error fetching Hero Section:', error);
    return null;
  }
}

// Home Page Layout
export async function getHomePageLayout(): Promise<StrapiEntity<HomePageLayout> | null> {
  try {
    const { data } = await strapiPublicFetch<StrapiEntity<HomePageLayout>>(
      '/home-page-layout?populate[sections]=*&publicationState=live'
    );
    if (!data) {
      console.warn('Home Page Layout not found in Strapi.');
      return null;
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Home Page Layout:', error);
    return null;
  }
}

// Why Choose Us - Now using Payload!
export async function getWhyChooseUs() {
  const payloadCms = getPayloadFunctions();
  return payloadCms.getWhyChooseUs();
}

// Collection Preview
export async function getCollectionPreview(): Promise<StrapiEntity<CollectionPreview> | null> {
  try {
    const { strapiPublicFetch } = getStrapiFunctions();
    const { data } = await strapiPublicFetch<StrapiEntity<CollectionPreview>>(
      '/collection-preview?populate[collections][populate]=image&publicationState=live'
    );
    if (!data) {
      console.warn('Collection Preview not found in Strapi. Using fallback values.');
      return null;
    }
    // Sort collections by displayOrder
    if (data.attributes.collections) {
      data.attributes.collections.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Collection Preview:', error);
    return null;
  }
}

// Services Section - Now using Payload!
export async function getServicesSection() {
  const payloadCms = getPayloadFunctions();
  return payloadCms.getServicesSection();
}

// About Snapshot
export async function getAboutSnapshot(): Promise<StrapiEntity<AboutSnapshot> | null> {
  try {
    const { strapiPublicFetch } = getStrapiFunctions();
    const { data } = await strapiPublicFetch<StrapiEntity<AboutSnapshot>>(
      '/about-snapshot?populate=image&publicationState=live'
    );
    if (!data) {
      console.warn('About Snapshot not found in Strapi. Using fallback values.');
      return null;
    }
    return data;
  } catch (error) {
    console.warn('Error fetching About Snapshot:', error);
    return null;
  }
}

// Dual CTA - Now using Payload!
export async function getDualCTA() {
  const payloadCms = getPayloadFunctions();
  return payloadCms.getDualCTA();
}

// Stats Section - Now using Payload!
export async function getStatsSection() {
  const payloadCms = getPayloadFunctions();
  return payloadCms.getStatsSection();
}

