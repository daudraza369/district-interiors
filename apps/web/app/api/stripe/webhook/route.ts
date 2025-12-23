/**
 * Stripe webhook handler
 * Creates orders in Strapi after successful payment
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/strapi';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 100; // Higher limit for webhooks
const RATE_LIMIT_WINDOW = 60 * 1000;

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

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Idempotency: Check if order already exists
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

      const existingOrderResponse = await fetch(
        `${STRAPI_URL}/api/orders?filters[stripeSessionId][$eq]=${session.id}`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (existingOrderResponse.ok) {
        const existingData = await existingOrderResponse.json();
        if (existingData.data && existingData.data.length > 0) {
          // Order already exists, skip
          return NextResponse.json({ received: true, skipped: 'order_exists' });
        }
      }

      // Retrieve line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // Build items array for Strapi
      const items = lineItems.data.map(item => ({
        productId: item.price?.metadata?.productId || null,
        name: item.description || 'Product',
        slug: item.price?.metadata?.slug || '',
        qty: item.quantity || 1,
        unitPrice: (item.price?.unit_amount || 0) / 100, // Convert from cents
        currency: item.price?.currency || 'sar',
      }));

      // Calculate totals from Stripe (source of truth)
      const subtotal = (session.amount_subtotal || 0) / 100;
      const total = (session.amount_total || 0) / 100;
      const discountAmount = (session.total_details?.amount_discount || 0) / 100;
      const shippingAmount = (session.total_details?.amount_shipping || 0) / 100;

      // Get metadata
      const discountCode = session.metadata?.discountCode || '';
      const shippingOptionId = session.metadata?.shippingOptionId || '';

      // Create order in Strapi
      await createOrder({
        status: 'paid',
        email: session.customer_details?.email || session.customer_email || '',
        items,
        subtotal,
        discountCode: discountCode || undefined,
        discountAmount,
        shippingOption: shippingOptionId ? parseInt(shippingOptionId) : undefined,
        shippingAmount,
        total,
        stripeSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === 'string' 
          ? session.payment_intent 
          : session.payment_intent?.id,
      });

      return NextResponse.json({ received: true });
    }

    // Handle other event types if needed
    return NextResponse.json({ received: true, ignored: event.type });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing for webhooks (we need raw body)
export const runtime = 'nodejs';

