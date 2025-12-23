/**
 * DIRECT TEST - Test Strapi API from command line
 * Run: node test-strapi-direct.js
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

async function testStrapi() {
  console.log('🧪 Testing Strapi API directly...\n');
  console.log(`URL: ${STRAPI_URL}`);
  console.log(`Has Token: ${!!API_TOKEN}\n`);

  // Test 1: Basic API health check
  console.log('Test 1: API Health Check');
  try {
    const healthResponse = await fetch(`${STRAPI_URL}/api`);
    console.log(`Status: ${healthResponse.status}`);
    const healthData = await healthResponse.json();
    console.log('Response:', JSON.stringify(healthData, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Hero Section with API token (published)
  console.log('Test 2: Hero Section (Published)');
  try {
    const url = `${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`;
    console.log(`Fetching: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log('Response:', text.substring(0, 500));
    if (response.ok) {
      const data = JSON.parse(text);
      console.log('\n✅ SUCCESS! Data keys:', Object.keys(data));
      if (data.data) {
        console.log('Has data:', !!data.data);
        if (data.data.attributes) {
          console.log('Attributes keys:', Object.keys(data.data.attributes));
        }
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Hero Section with API token (preview/draft)
  console.log('Test 3: Hero Section (Preview/Draft)');
  try {
    const url = `${STRAPI_URL}/api/hero-section?populate=*&publicationState=preview`;
    console.log(`Fetching: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log('Response:', text.substring(0, 500));
    if (response.ok) {
      const data = JSON.parse(text);
      console.log('\n✅ SUCCESS! Data keys:', Object.keys(data));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 4: List all content types
  console.log('Test 4: List Content Types');
  try {
    const url = `${STRAPI_URL}/api/content-type-builder/content-types`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Available content types:', (data.data || []).map(ct => ct.uid).join(', ') || 'none');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 5: Content Manager API - get hero-section
  console.log('Test 5: Content Manager API - Hero Section');
  try {
    const url = `${STRAPI_URL}/api/content-manager/collection-types/api::hero-section.hero-section`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`Status: ${response.status}`);
    const text = await response.text();
    console.log('Response:', text.substring(0, 500));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testStrapi().catch(console.error);

