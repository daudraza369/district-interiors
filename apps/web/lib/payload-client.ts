/**
 * Payload CMS client helper
 * Replaces Strapi - direct database queries with full type safety!
 */

import { getPayload as getPayloadClient } from 'payload';
import config from '../payload.config';

let cachedPayload: any = null;

export async function getPayload() {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayloadClient({ config });
  return cachedPayload;
}

// Helper to get media URL from Payload media object
export function getMediaUrl(media: any): string | null {
  if (!media) return null;
  
  // Payload media object can be a string (ID) or an object with url property
  if (typeof media === 'string') return null;
  if (media.url) {
    // If url is absolute, return as-is; otherwise prepend server URL
    if (media.url.startsWith('http')) {
      return media.url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
    return `${baseUrl}${media.url}`;
  }
  return null;
}

// Helper for image URL (same as media URL)
export function getImageUrl(image: any): string | null {
  return getMediaUrl(image);
}

