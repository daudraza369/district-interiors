/**
 * Debug Client Logos Section - Check what's wrong
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function debugClientLogos() {
  console.log('🔍 Debugging Client Logos Section...\n');

  // Step 1: Check what content types exist
  console.log('1️⃣ Checking available content types...');
  try {
    const response = await fetch(`${STRAPI_URL}/api`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      const contentTypes = Object.keys(data);
      console.log(`   ✅ Found ${contentTypes.length} content types:`);
      console.log(`   ${contentTypes.join(', ')}`);
      
      // Check for client logos related types
      const clientLogosTypes = contentTypes.filter(type => 
        type.toLowerCase().includes('client') || type.toLowerCase().includes('logo')
      );
      if (clientLogosTypes.length > 0) {
        console.log(`\n   🎯 Client/Logo related types: ${clientLogosTypes.join(', ')}`);
      } else {
        console.log(`\n   ⚠️  No client/logo related content types found`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Step 2: Test different endpoint variations
  console.log('\n2️⃣ Testing endpoint variations...');
  const endpoints = [
    'client-logos-section',
    'client-logos',
    'client-logo',
    'client-logos-sections',
  ];

  for (const endpoint of endpoints) {
    try {
      // Test public access
      const publicResponse = await fetch(`${STRAPI_URL}/api/${endpoint}?publicationState=live`);
      console.log(`   ${endpoint}:`);
      console.log(`     Public: ${publicResponse.status} ${publicResponse.status === 200 ? '✅' : publicResponse.status === 404 ? '❌ Not found' : publicResponse.status === 403 ? '⚠️ Permissions' : ''}`);
      
      // Test authenticated access
      const authResponse = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });
      console.log(`     Auth: ${authResponse.status} ${authResponse.status === 200 ? '✅' : ''}`);
      
      if (authResponse.ok) {
        const data = await authResponse.json();
        console.log(`     ✅ Data exists!`);
        if (data.data) {
          const item = data.data.attributes || data.data;
          console.log(`        Title: ${item.title || 'N/A'}`);
          console.log(`        Has row1Logos: ${!!item.row1Logos}`);
          console.log(`        Has row2Logos: ${!!item.row2Logos}`);
        }
      }
    } catch (error) {
      console.log(`   ${endpoint}: ❌ Error - ${error.message}`);
    }
  }

  // Step 3: Test with populate
  console.log('\n3️⃣ Testing with populate parameter...');
  try {
    const url = `${STRAPI_URL}/api/client-logos-section?populate[row1Logos][populate]=*&populate[row2Logos][populate]=*&publicationState=live`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    console.log(`   Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Success!`);
      console.log(`   Response structure:`, JSON.stringify(data, null, 2).substring(0, 500));
    } else {
      const errorText = await response.text();
      console.log(`   ❌ Error: ${errorText.substring(0, 200)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n📋 Summary:');
  console.log('   - Check which endpoint name exists');
  console.log('   - Check if permissions are set');
  console.log('   - Check if content is published');
}

debugClientLogos();

