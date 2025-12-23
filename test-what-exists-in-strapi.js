/**
 * Test script to check what actually exists in Strapi
 * This will help us understand what needs to be created
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '53ccb9cc39e0b32cfb30f68329b2467961cc1af700728431d2474bf6b78166035a073cd58916846f8e90087f890dd5fdd287d52ba0d6ce25559635473b35649f03a0a1047841ab972d8a17dbbd3dbe136ac89ad5cb9b2b9e102d159cfdf76ca0115450e4067cf97cde24f2cfb1e8faa6cb318f2fb6b0b28873acb5e61b17ee6d';

async function checkWhatExists() {
  console.log('🔍 Checking what exists in Strapi...\n');
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

  // 1. Check if client-logos-section content type exists
  console.log('1️⃣  Checking if client-logos-section content type exists...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/client-logos-section?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Content type EXISTS!');
      console.log('   Data:', JSON.stringify(data, null, 2).substring(0, 500));
    } else if (response.status === 404) {
      console.log('❌ Content type DOES NOT EXIST (404)');
    } else {
      console.log(`⚠️  Status: ${response.status}`);
      const text = await response.text();
      console.log('   Response:', text.substring(0, 200));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n');

  // 2. Check all content types
  console.log('2️⃣  Checking all available content types...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/content-type-builder/content-types`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Available content types:');
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(type => {
          console.log(`   - ${type.uid || type.name || JSON.stringify(type)}`);
        });
      } else {
        console.log('   Data structure:', JSON.stringify(data, null, 2).substring(0, 500));
      }
    } else {
      console.log(`⚠️  Status: ${response.status}`);
      const text = await response.text();
      console.log('   Response:', text.substring(0, 200));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n');

  // 3. Try to list all content types via different endpoint
  console.log('3️⃣  Checking content types via schema endpoint...');
  try {
    const response = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Schema endpoint works!');
      console.log('   Data:', JSON.stringify(data, null, 2).substring(0, 500));
    } else {
      console.log(`⚠️  Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n');

  // 4. Check components
  console.log('4️⃣  Checking available components...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/content-type-builder/components`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Available components:');
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(comp => {
          console.log(`   - ${comp.uid || comp.name || JSON.stringify(comp)}`);
        });
      } else {
        console.log('   Data:', JSON.stringify(data, null, 2).substring(0, 500));
      }
    } else {
      console.log(`⚠️  Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkWhatExists().catch(console.error);

