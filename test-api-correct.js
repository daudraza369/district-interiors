/**
 * Test Strapi API with correct syntax
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

async function test() {
  console.log('Testing different populate syntaxes...\n');

  // Test 1: Simple populate
  console.log('Test 1: populate=*');
  try {
    const r1 = await fetch(`${STRAPI_URL}/api/hero-section?populate=*`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    console.log(`Status: ${r1.status}`);
    const d1 = await r1.json();
    if (d1.data) {
      console.log('✅ SUCCESS!');
      console.log('Title:', d1.data.title);
      console.log('Has data:', !!d1.data);
    } else {
      console.log('Response:', JSON.stringify(d1, null, 2).substring(0, 500));
    }
  } catch (e) {
    console.log('Error:', e.message);
  }

  console.log('\n---\n');

  // Test 2: Without populate
  console.log('Test 2: No populate');
  try {
    const r2 = await fetch(`${STRAPI_URL}/api/hero-section`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    console.log(`Status: ${r2.status}`);
    const d2 = await r2.json();
    if (d2.data) {
      console.log('✅ SUCCESS!');
      console.log('Title:', d2.data.title);
    } else {
      console.log('Response:', JSON.stringify(d2, null, 2).substring(0, 500));
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}

test();



