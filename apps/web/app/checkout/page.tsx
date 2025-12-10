import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { parseCart } from '@/lib/cart';

export default async function CheckoutPage() {
  // Checkout page redirects to Stripe - this is just a placeholder
  // Actual checkout happens via /api/checkout
  const cartCookie = (await cookies()).get('district_cart');
  const cartItems = parseCart(cartCookie?.value);

  if (cartItems.length === 0) {
    redirect('/cart');
  }

  // This page would show a loading state while redirecting to Stripe
  // For now, redirect to cart
  redirect('/cart');
}

