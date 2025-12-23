/**
 * Payload CMS client helper
 * Replaces Strapi - direct database queries with full type safety!
 * 
 * SERVER-ONLY: This module must never be imported in client components
 */

import 'server-only';
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

// Media helpers moved to media-utils.ts for client-safe usage

