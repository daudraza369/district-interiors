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

export interface ClientLogo {
  clientName: string;
  logo: { data: StrapiEntity<{ url: string; alternativeText?: string }> };
  websiteUrl?: string;
  displayOrder: number;
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

// Helper to get image URL
export function getImageUrl(image?: { data: StrapiEntity<{ url: string }> }): string | null {
  if (!image?.data) return null;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${image.data.attributes.url}`;
}

export function getImageUrlArray(images?: { data: StrapiEntity<{ url: string }>[] }): string[] {
  if (!images?.data) return [];
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return images.data.map(img => `${baseUrl}${img.attributes.url}`);
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

// Client logos
export async function getClientLogos(): Promise<StrapiEntity<ClientLogo>[]> {
  const { data } = await strapiFetch<StrapiEntity<ClientLogo>[]>(
    '/client-logos?populate=*&sort=displayOrder:asc&filters[publishedAt][$notNull]=true'
  );
  return data;
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

