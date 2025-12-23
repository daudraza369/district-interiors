/**
 * Payload CMS client - replaces Strapi
 * Direct database queries with full type safety!
 * 
 * SERVER-ONLY: This module must never be imported in client components
 */

import 'server-only';
import { getPayload } from './payload-client';

// Re-export types for compatibility
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

export interface ClientLogoItem {
  clientName: string;
  logo?: any;
  websiteUrl?: string;
  displayOrder?: number;
}

export interface ClientLogosSection {
  title: string;
  subtitle?: string;
  row1Logos?: ClientLogoItem[];
  showRow1?: boolean;
  row2Logos?: ClientLogoItem[];
  showRow2?: boolean;
}

export interface WhyChooseUs {
  title: string;
  subtitle?: string;
  description?: string;
  benefits?: Array<{
    title: string;
    description?: string;
    icon?: string;
    image?: any;
  }>;
}

export interface ServicesSection {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: Array<{
    title: string;
    description?: string;
    icon?: string;
    image?: any;
    link?: string;
  }>;
}

export interface StatsSection {
  title?: string;
  subtitle?: string;
  stats?: Array<{
    label: string;
    value: string;
    suffix?: string;
    icon?: string;
  }>;
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
}

// Wrapper to match Strapi response format for compatibility
interface PayloadResponse<T> {
  data: {
    id: string;
    attributes: T;
  } | null;
}

// Hero Section
export async function getHeroSection(): Promise<PayloadResponse<HeroSection> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'hero-section',
      limit: 1,
      depth: 2, // Populate relations
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getHeroSection] Error:', error);
    return null;
  }
}

// Client Logos Section
export async function getClientLogos(): Promise<PayloadResponse<ClientLogosSection> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'client-logos-section',
      limit: 1,
      depth: 2,
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getClientLogos] Error:', error);
    return null;
  }
}

// Why Choose Us
export async function getWhyChooseUs(): Promise<PayloadResponse<WhyChooseUs> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'why-choose-us',
      limit: 1,
      depth: 2,
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getWhyChooseUs] Error:', error);
    return null;
  }
}

// Services Section
export async function getServicesSection(): Promise<PayloadResponse<ServicesSection> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services-section',
      limit: 1,
      depth: 2,
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getServicesSection] Error:', error);
    return null;
  }
}

// Stats Section
export async function getStatsSection(): Promise<PayloadResponse<StatsSection> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'stats-section',
      limit: 1,
      depth: 2,
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getStatsSection] Error:', error);
    return null;
  }
}

// Dual CTA
export async function getDualCTA(): Promise<PayloadResponse<DualCTA> | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dual-cta',
      limit: 1,
      depth: 2,
    });

    if (!result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      data: {
        id: doc.id,
        attributes: doc as any,
      },
    };
  } catch (error) {
    console.error('[getDualCTA] Error:', error);
    return null;
  }
}

// Media helpers are exported from media-utils.ts for client-safe usage

