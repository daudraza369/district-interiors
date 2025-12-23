/**
 * CMS Types - Client-safe types only (no runtime imports)
 * These can be safely imported in client components
 */

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

export interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: string;
  isText?: boolean;
  displayOrder?: number;
}

export interface ShippingOption {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  estimatedDays?: number;
  displayOrder: number;
}

export interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  validUntil?: string;
}

export interface HeroSection {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonAction?: 'link' | 'scroll';
  primaryButtonLink?: string;
  primaryButtonScrollTarget?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: 'link' | 'scroll';
  secondaryButtonLink?: string;
  secondaryButtonScrollTarget?: string;
  backgroundImage?: any;
  heroImage?: any[];
  beforeImage?: any;
  afterImage?: any;
}

export interface SectionConfig {
  showHero?: boolean;
  showClientLogos?: boolean;
  showWhyChooseUs?: boolean;
  showServices?: boolean;
  showStats?: boolean;
  showDualCTA?: boolean;
}

export interface HomePageLayout {
  config?: SectionConfig;
}

export interface FeatureItem {
  title: string;
  description?: string;
  icon?: string;
  image?: any;
}

export interface WhyChooseUs {
  title: string;
  subtitle?: string;
  description?: string;
  benefits?: FeatureItem[];
  features?: (FeatureItem & { displayOrder?: number })[];
}

export interface CollectionItem {
  name?: string;
  slug?: string;
  title?: string; // Alias for name
  description?: string;
  image?: any;
  imageUrl?: string;
  displayOrder: number;
}

export interface CollectionPreview {
  title: string;
  subtitle?: string;
  items?: CollectionItem[];
  collections?: CollectionItem[]; // Alternative name used in components
}

export interface ServicePreviewItem {
  title: string;
  description?: string;
  icon?: string;
  image?: any;
  imageUrl?: string;
  link?: string;
  href?: string; // Alternative to link
  cta?: string; // Call to action text
  displayOrder?: number;
}

export interface ServicesSection {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: ServicePreviewItem[];
}

export interface AboutSnapshot {
  title: string;
  subtitle?: string;
  description?: string;
  image?: any;
  imageUrl?: string;
  imageAlt?: string;
  stats?: Stat[];
}

export interface DualCTA {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text?: string;
    link?: string;
    action?: 'link' | 'scroll';
    scrollTarget?: string;
  };
  secondaryCTA?: {
    text?: string;
    link?: string;
    action?: 'link' | 'scroll';
    scrollTarget?: string;
  };
  backgroundImage?: any;
  // Alternative flat structure used in components
  leftTitle?: string;
  leftSubtitle?: string;
  leftButtonLabel?: string;
  leftButtonHref?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  rightButtonLabel?: string;
  rightButtonHref?: string;
}

export interface StatsSection {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
}

