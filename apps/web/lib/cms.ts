/**
 * Typed CMS client for Strapi API
 * Server-side functions use API token, client-side use public API
 */

import { strapiFetch, strapiPublicFetch } from './strapi';

// Types
export interface StrapiEntity<T = any> {
  id: number;
  attributes: T;
}

export interface Category {
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
  logo: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
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
  backgroundImage?: { data: StrapiEntity<{ url: string; alternativeText?: string; mime?: string }> };
  heroImage?: { data: StrapiEntity<{ url: string; alternativeText?: string; mime?: string }>[] };
  beforeImage?: { data: StrapiEntity<{ url: string; alternativeText?: string; mime?: string }> };
  afterImage?: { data: StrapiEntity<{ url: string; alternativeText?: string; mime?: string }> };
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

// Helper to get image URL (handles both Strapi v4 and v5 formats)
export function getImageUrl(image?: { data?: StrapiEntity<{ url: string }> } | { url?: string } | null): string | null {
  if (!image) return null;
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Strapi v5 format: image is direct object with url property
  if ('url' in image && image.url) {
    return `${baseUrl}${image.url}`;
  }
  
  // Strapi v4 format: image.data.attributes.url
  if ('data' in image && image.data?.attributes?.url) {
    return `${baseUrl}${image.data.attributes.url}`;
  }
  
  return null;
}

export function getImageUrlArray(images?: { data?: StrapiEntity<{ url: string }>[] } | { url?: string }[] | null): string[] {
  if (!images) return [];
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Strapi v5 format: array of objects with url property
  if (Array.isArray(images)) {
    return images.map(img => 'url' in img && img.url ? `${baseUrl}${img.url}` : '').filter(Boolean);
  }
  
  // Strapi v4 format: images.data array
  if (images.data && Array.isArray(images.data)) {
    return images.data.map(img => `${baseUrl}${img.attributes.url}`);
  }
  
  return [];
}

// Helper to get media URL (for images and videos, handles both v4 and v5)
export function getMediaUrl(media?: { data?: StrapiEntity<{ url: string; mime?: string }> | StrapiEntity<{ url: string; mime?: string }>[] } | { url?: string; mime?: string } | { url?: string; mime?: string }[] | null): string | null {
  if (!media) return null;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Strapi v5 format: direct object or array with url property
  if (Array.isArray(media)) {
    return media.length > 0 && 'url' in media[0] && media[0].url ? `${baseUrl}${media[0].url}` : null;
  }
  
  if ('url' in media && media.url) {
    return `${baseUrl}${media.url}`;
  }
  
  // Strapi v4 format: media.data.attributes.url
  if ('data' in media && media.data) {
    if (Array.isArray(media.data)) {
      return media.data.length > 0 && media.data[0].attributes?.url ? `${baseUrl}${media.data[0].attributes.url}` : null;
    }
    if (media.data.attributes?.url) {
      return `${baseUrl}${media.data.attributes.url}`;
    }
  }
  
  return null;
}

// Helper to check if media is video (handles both v4 and v5)
export function isVideo(media?: { data?: StrapiEntity<{ mime?: string }> | StrapiEntity<{ mime?: string }>[] } | { mime?: string } | { mime?: string }[] | null): boolean {
  if (!media) return false;
  
  // Strapi v5 format: direct object with mime property
  if (Array.isArray(media)) {
    return media.length > 0 && 'mime' in media[0] ? media[0].mime?.startsWith('video/') || false : false;
  }
  
  if ('mime' in media && media.mime) {
    return media.mime.startsWith('video/');
  }
  
  // Strapi v4 format: media.data.attributes.mime
  if ('data' in media && media.data) {
    const mime = Array.isArray(media.data) ? media.data[0]?.attributes?.mime : media.data.attributes?.mime;
    return mime?.startsWith('video/') || false;
  }
  
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

// Client logos section
export async function getClientLogos(): Promise<StrapiEntity<ClientLogosSection> | null> {
  try {
    // strapiPublicFetch already adds /api prefix, so use /client-logos not /api/client-logos
    const response = await strapiPublicFetch<StrapiEntity<ClientLogosSection>>(
      '/client-logos'
    );
    
    // strapiPublicFetch returns { data: T }, so response.data is StrapiEntity<ClientLogosSection>
    if (!response || !response.data) {
      console.warn('Client Logos Section not found in Strapi. Using fallback values.');
      return null;
    }
    
    const data = response.data;
    
    // Sort logos by displayOrder for both rows
    if (data.attributes && data.attributes.row1Logos && Array.isArray(data.attributes.row1Logos)) {
      data.attributes.row1Logos.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    if (data.attributes && data.attributes.row2Logos && Array.isArray(data.attributes.row2Logos)) {
      data.attributes.row2Logos.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    
    return data;
  } catch (error) {
    console.error('[getClientLogos] Error:', error);
    return null;
  }
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
    // Use server-side fetch with API token for Strapi v5
    // Simple populate=* works best for v5
    const { data } = await strapiFetch<StrapiEntity<HeroSection>>(
      '/hero-section?populate=*'
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

// Why Choose Us
export async function getWhyChooseUs(): Promise<StrapiEntity<WhyChooseUs> | null> {
  try {
    const { data } = await strapiPublicFetch<StrapiEntity<WhyChooseUs>>(
      '/why-choose-us?populate[features]=*&publicationState=live'
    );
    if (!data) {
      console.warn('Why Choose Us not found in Strapi. Using fallback values.');
      return null;
    }
    // Sort features by displayOrder
    if (data.attributes.features) {
      data.attributes.features.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Why Choose Us:', error);
    return null;
  }
}

// Collection Preview
export async function getCollectionPreview(): Promise<StrapiEntity<CollectionPreview> | null> {
  try {
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

// Services Section
export async function getServicesSection(): Promise<StrapiEntity<ServicesSection> | null> {
  try {
    const { data } = await strapiPublicFetch<StrapiEntity<ServicesSection>>(
      '/services-section?populate[services][populate]=image&publicationState=live'
    );
    if (!data) {
      console.warn('Services Section not found in Strapi. Using fallback values.');
      return null;
    }
    // Sort services by displayOrder
    if (data.attributes.services) {
      data.attributes.services.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Services Section:', error);
    return null;
  }
}

// About Snapshot
export async function getAboutSnapshot(): Promise<StrapiEntity<AboutSnapshot> | null> {
  try {
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

// Dual CTA
export async function getDualCTA(): Promise<StrapiEntity<DualCTA> | null> {
  try {
    const { data } = await strapiPublicFetch<StrapiEntity<DualCTA>>(
      '/dual-cta?publicationState=live'
    );
    if (!data) {
      console.warn('Dual CTA not found in Strapi. Using fallback values.');
      return null;
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Dual CTA:', error);
    return null;
  }
}

// Stats Section
export async function getStatsSection(): Promise<StrapiEntity<StatsSection> | null> {
  try {
    const { data } = await strapiPublicFetch<StrapiEntity<StatsSection>>(
      '/stats-section?populate=stats&publicationState=live'
    );
    if (!data) {
      console.warn('Stats Section not found in Strapi. Using fallback values.');
      return null;
    }
    // Sort stats by displayOrder
    if (data.attributes.stats) {
      data.attributes.stats.sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return data;
  } catch (error) {
    console.warn('Error fetching Stats Section:', error);
    return null;
  }
}

