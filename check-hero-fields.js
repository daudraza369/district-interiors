/**
 * Check Hero Section fields structure
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

async function checkFields() {
  try {
    // Try to get the content type schema
    const schemaResponse = await fetch(`${STRAPI_URL}/api/content-type-builder/content-types/api::hero-section.hero-section`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (schemaResponse.ok) {
      const schema = await schemaResponse.json();
      console.log('Schema:', JSON.stringify(schema, null, 2));
    } else {
      console.log('Schema check failed, trying direct GET...');
      const getResponse = await fetch(`${STRAPI_URL}/api/hero-section`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await getResponse.text();
      console.log('GET Response:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkFields();



