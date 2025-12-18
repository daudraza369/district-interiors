import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker/Coolify
 * Returns 200 if the server is running
 */
export async function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
