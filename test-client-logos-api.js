/**
 * Test Client Logos Section API Endpoint
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

async function testClientLogosAPI() {
  console.log('🔍 Testing Client Logos Section API...\n');

  // Test 1: Public access (what frontend uses)
  console.log('1️⃣ Testing PUBLIC access...');
  try {
    const url = `${STRAPI_URL}/api/client-logos-section?populate[row1Logos][populate]=*&populate[row2Logos][populate]=*&publicationState=live`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ PUBLIC access works!');
      console.log(`   Title: ${data?.data?.attributes?.title || data?.data?.title || 'NOT SET'}`);
      console.log(`   Has row1Logos: ${!!(data?.data?.attributes?.row1Logos || data?.data?.row1Logos)}`);
      console.log(`   Has row2Logos: ${!!(data?.data?.attributes?.row2Logos || data?.data?.row2Logos)}`);
      
      // Check structure
      if (data?.data) {
        const clientData = data.data.attributes || data.data;
        if (clientData.row1Logos) {
          console.log(`   Row 1 Logos count: ${Array.isArray(clientData.row1Logos) ? clientData.row1Logos.length : 0}`);
        }
        if (clientData.row2Logos) {
          console.log(`   Row 2 Logos count: ${Array.isArray(clientData.row2Logos) ? clientData.row2Logos.length : 0}`);
        }
      }
    } else {
      const errorText = await response.text();
      console.log('   ❌ PUBLIC access failed!');
      console.log(`   Error: ${errorText.substring(0, 300)}`);
      
      if (response.status === 403 || response.status === 401) {
        console.log('\n   ⚠️  PERMISSION ISSUE: Public role needs permissions');
        console.log('   Fix: Go to Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public');
        console.log('        Enable "find" and "findOne" for "Client Logos Section"');
      } else if (response.status === 404) {
        console.log('\n   ⚠️  Content type not found - may need to create it in Strapi');
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 2: Try different endpoint names
  console.log('\n2️⃣ Testing alternative endpoint names...');
  const endpoints = [
    'client-logos-section',
    'client-logos',
    'client-logo',
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${STRAPI_URL}/api/${endpoint}?publicationState=live`;
      const response = await fetch(url);
      console.log(`   ${endpoint}: ${response.status} ${response.status === 200 ? '✅' : response.status === 404 ? '❌ Not found' : `⚠️ ${response.status}`}`);
    } catch (error) {
      console.log(`   ${endpoint}: ❌ Error`);
    }
  }
}

testClientLogosAPI();

