/**
 * Test if frontend can connect to Strapi
 * Run this to debug the connection
 */

// This simulates what the frontend should be doing
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

console.log('Environment Variables:');
console.log('NEXT_PUBLIC_STRAPI_URL:', STRAPI_URL);
console.log('STRAPI_API_TOKEN:', STRAPI_API_TOKEN ? 'SET (hidden)' : 'NOT SET');
console.log('\n');

async function testConnection() {
  try {
    console.log(`Testing connection to: ${STRAPI_URL}/api/hero-section`);
    
    const response = await fetch(`${STRAPI_URL}/api/hero-section?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('\n✅ SUCCESS! Hero Section Data:');
    console.log('Title:', data.data?.title);
    console.log('Subtitle:', data.data?.subtitle?.substring(0, 50) + '...');
    console.log('\nFull Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testConnection();



