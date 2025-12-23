/**
 * Test if Strapi API is accessible and returning hero section data
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

async function testAPI() {
  console.log('🧪 Testing Strapi API connection...\n');

  // Test 1: Public API (no auth needed for published content)
  console.log('Test 1: Public API endpoint');
  try {
    const publicResponse = await fetch(`${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`);
    console.log(`Status: ${publicResponse.status} ${publicResponse.statusText}`);
    const publicData = await publicResponse.json();
    console.log('Response:', JSON.stringify(publicData, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: With API token
  console.log('Test 2: With API Token');
  const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';
  
  try {
    const authResponse = await fetch(`${STRAPI_URL}/api/hero-section?populate[backgroundImage]=*&populate[heroImage]=*&populate[beforeImage]=*&populate[afterImage]=*&publicationState=live`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Status: ${authResponse.status} ${authResponse.statusText}`);
    const authData = await authResponse.json();
    console.log('Response:', JSON.stringify(authData, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();



