import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'NOT SET';
  const API_TOKEN = process.env.STRAPI_API_TOKEN ? 'SET (hidden)' : 'NOT SET';
  
  // Try to make a test request
  let testResult = 'NOT TESTED';
  let testError = null;
  
  if (STRAPI_URL !== 'NOT SET' && process.env.STRAPI_API_TOKEN) {
    try {
      const url = `${STRAPI_URL}/api/hero-section?populate=*`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 },
      });
      
      if (response.ok) {
        const data = await response.json();
        testResult = `SUCCESS - Data keys: ${Object.keys(data).join(', ')}`;
      } else {
        testResult = `FAILED - Status: ${response.status} ${response.statusText}`;
        const text = await response.text();
        testError = text.substring(0, 200);
      }
    } catch (error: any) {
      testResult = `ERROR - ${error.message}`;
      testError = error.message;
    }
  }
  
  return NextResponse.json({
    env: {
      NEXT_PUBLIC_STRAPI_URL: STRAPI_URL,
      STRAPI_API_TOKEN: API_TOKEN,
    },
    test: {
      result: testResult,
      error: testError,
    },
    timestamp: new Date().toISOString(),
  });
}

