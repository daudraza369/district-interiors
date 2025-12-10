/**
 * Cart management utilities
 * Cart stored in HTTP-only cookie for security
 */

export interface CartItem {
  productId: number;
  slug: string;
  qty: number;
}

export interface CartCookie {
  items: CartItem[];
}

/**
 * Parse cart from cookie string
 */
export function parseCart(cookieValue: string | undefined): CartItem[] {
  if (!cookieValue) return [];
  
  try {
    const cart: CartCookie = JSON.parse(cookieValue);
    return cart.items || [];
  } catch {
    return [];
  }
}

/**
 * Serialize cart to cookie string
 */
export function serializeCart(items: CartItem[]): string {
  return JSON.stringify({ items });
}

/**
 * Validate cart item structure
 */
export function validateCartItem(item: any): item is CartItem {
  return (
    typeof item === 'object' &&
    typeof item.productId === 'number' &&
    typeof item.slug === 'string' &&
    typeof item.qty === 'number' &&
    item.qty > 0
  );
}

