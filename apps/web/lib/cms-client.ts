/**
 * Client-safe exports from CMS
 * Only exports types and utilities that work in browser
 */

// Re-export client-safe utilities
export { getImageUrl, getMediaUrl, isVideo } from './media-utils';

// Re-export types only (types are erased at runtime)
export type {
  HeroSection,
  ClientLogosSection,
  ClientLogoItem,
  WhyChooseUs,
  ServicesSection,
  StatsSection,
  DualCTA,
  StatItem,
  CollectionPreview,
  AboutSnapshot,
  ServicePreviewItem,
} from './cms';

