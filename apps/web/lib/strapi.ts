/**
 * Strapi API client for server-side requests
 * Never expose API token to client
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
}

/**
 * Server-side Strapi API client with authentication
 */
export async function strapiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add API token for server-side requests
  if (STRAPI_API_TOKEN) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      // In development, always fetch fresh data (no cache)
      // In production, cache for 1 hour
      ...(process.env.NODE_ENV === 'development' 
        ? { cache: 'no-store' } 
        : { next: { revalidate: 3600 } }),
    });
    
    clearTimeout(timeoutId);

    // Handle 404 gracefully - content might not exist yet
    if (response.status === 404) {
      console.warn(`Strapi endpoint not found: ${endpoint}. Returning null.`);
      return { data: null as T };
    }

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error: any) {
    // Handle timeout and connection errors gracefully
    if (error.name === 'AbortError' || error.message?.includes('fetch failed') || error.code === 'ECONNREFUSED' || error.message?.includes('timeout')) {
      console.warn(`Strapi not available at ${STRAPI_URL} (timeout or connection error). Returning empty data.`);
      return { data: null as T };
    }
    // For other errors, still return null instead of throwing
    console.warn(`Strapi API error for ${endpoint}:`, error.message);
    return { data: null as T };
  }
}

/**
 * Public API client (no auth, for client-side)
 */
export async function strapiPublicFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        ...options.headers,
      },
      cache: 'no-store', // Always fetch fresh data
      next: { revalidate: 0 }, // Next.js: no revalidation
    });

    // Handle 404 gracefully
    if (response.status === 404) {
      console.warn(`Strapi endpoint not found: ${endpoint}. Returning null.`);
      return { data: null as T };
    }

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error: any) {
    console.warn(`Strapi API error for ${endpoint}:`, error.message);
    return { data: null as T };
  }
}

/**
 * Create order in Strapi (server-side only)
 */
export async function createOrder(orderData: {
  status: string;
  email: string;
  items: any[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  shippingOption?: number;
  shippingAmount: number;
  total: number;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  notes?: string;
}): Promise<StrapiResponse<any>> {
  if (!STRAPI_API_TOKEN) {
    throw new Error('STRAPI_API_TOKEN not configured');
  }

  return strapiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify({ data: orderData }),
  });
}

