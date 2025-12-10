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
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error: any) {
    // Handle connection errors gracefully
    if (error.message?.includes('fetch failed') || error.code === 'ECONNREFUSED') {
      console.warn(`Strapi not available at ${STRAPI_URL}. Returning empty data.`);
      return { data: [] as T };
    }
    throw error;
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
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    cache: 'no-store', // Client-side: always fresh
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  return response.json();
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

