/**
 * Test Hero Section API endpoints
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '497ed3f9b308f1aa478862578e2276377486270c940b18292c311a8243528453b5f11f1b7224f2c022813977c83a0e5062d9eed4a18733d63d311ce2bcbc7fd34c34e1960405c2abdf40aa7b5c684ed68b11502047cbf97c2adf492db115b8c9704e76f1b3f33c04d27ae39d1c79330d55bb48c8a28037408f5b82b10b1a209d';

async function testAPI() {
  console.log('Testing GET endpoint...');
  try {
    const getResponse = await fetch(`${STRAPI_URL}/api/hero-section`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('GET Status:', getResponse.status, getResponse.statusText);
    const getData = await getResponse.text();
    console.log('GET Response:', getData);
  } catch (error) {
    console.error('GET Error:', error.message);
  }

  console.log('\nTesting PUT endpoint...');
  const putData = {
    data: {
      title: 'Where Design Takes Root',
      subtitle: 'Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.',
      description: 'District Interiors helps invigorate spaces with thoughtful greenery.',
      primaryButtonText: 'Explore Our Work',
      primaryButtonAction: 'scroll',
      primaryButtonScrollTarget: 'portfolio',
      secondaryButtonText: 'Request a Consultation',
      secondaryButtonAction: 'scroll',
      secondaryButtonScrollTarget: 'contact',
    }
  };

  try {
    const putResponse = await fetch(`${STRAPI_URL}/api/hero-section`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putData),
    });
    
    console.log('PUT Status:', putResponse.status, putResponse.statusText);
    const putResponseText = await putResponse.text();
    console.log('PUT Response:', putResponseText);
  } catch (error) {
    console.error('PUT Error:', error.message);
  }
}

testAPI();



