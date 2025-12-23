/**
 * Secure checkout API route
 * Validates cart server-side and creates Stripe Checkout Session
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCart, validateCartItem } from '@/lib/cart';
import { strapiFetch } from '@/lib/strapi';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Simple rate limiting (in-memory, for production use Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // 5 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Read cart from cookie
    const cartCookie = request.cookies.get('district_cart');
    const cartItems = parseCart(cartCookie?.value);

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate cart structure
    for (const item of cartItems) {
      if (!validateCartItem(item)) {
        return NextResponse.json(
          { error: 'Invalid cart item' },
          { status: 400 }
        );
      }
    }

    // Read request body for shipping and discount
    const body = await request.json();
    const { shippingOptionId, discountCode, email } = body;

    // Fetch products from Strapi server-side (with API token)
    const productIds = cartItems.map(item => item.productId);
    const productsResponse = await strapiFetch(
      `/products?filters[id][$in]=${productIds.join(',')}&populate=*`
    );

    const products = productsResponse.data as any[];

    // Validate all products exist and are purchasable
    const validatedItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let subtotal = 0;

    for (const cartItem of cartItems) {
      const product = products.find(p => p.id === cartItem.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Product ${cartItem.productId} not found` },
          { status: 404 }
        );
      }

      const attrs = product.attributes || product;

      if (!attrs.purchasable) {
        return NextResponse.json(
          { error: `Product ${attrs.name} is not purchasable` },
          { status: 400 }
        );
      }

      if (!attrs.stripePriceId) {
        return NextResponse.json(
          { error: `Product ${attrs.name} missing Stripe price ID` },
          { status: 400 }
        );
      }

      // Use Stripe price ID from Strapi (server-validated)
      validatedItems.push({
        price: attrs.stripePriceId,
        quantity: cartItem.qty,
      });

      // Calculate subtotal (for reference, but Stripe is source of truth)
      if (attrs.price) {
        subtotal += parseFloat(attrs.price) * cartItem.qty;
      }
    }

    // Validate discount code if provided
    let discountAmount = 0;
    if (discountCode) {
      const discountResponse = await fetch(
        `${STRAPI_URL}/api/discounts?filters[code][$eq]=${encodeURIComponent(discountCode)}&filters[active][$eq]=true`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (discountResponse.ok) {
        const discountData = await discountResponse.json();
        if (discountData.data && discountData.data.length > 0) {
          const discount = discountData.data[0].attributes || discountData.data[0];
          const now = new Date();
          const validFrom = discount.validFrom ? new Date(discount.validFrom) : null;
          const validTo = discount.validTo ? new Date(discount.validTo) : null;

          if (
            (!validFrom || now >= validFrom) &&
            (!validTo || now <= validTo) &&
            (!discount.minPurchase || subtotal >= parseFloat(discount.minPurchase))
          ) {
            if (discount.type === 'percent') {
              discountAmount = subtotal * (parseFloat(discount.value) / 100);
            } else {
              discountAmount = parseFloat(discount.value);
            }
          }
        }
      }
    }

    // Validate shipping option
    let shippingAmount = 0;
    if (shippingOptionId) {
      const shippingResponse = await fetch(
        `${STRAPI_URL}/api/shipping-options/${shippingOptionId}?filters[active][$eq]=true`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (shippingResponse.ok) {
        const shippingData = await shippingResponse.json();
        if (shippingData.data) {
          const shipping = shippingData.data.attributes || shippingData.data;
          shippingAmount = parseFloat(shipping.price);
        }
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: validatedItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart`,
      customer_email: email,
      metadata: {
        cartItems: JSON.stringify(cartItems),
        discountCode: discountCode || '',
        shippingOptionId: shippingOptionId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}

