/**
 * Test Hero Section API Endpoint
 * Tests both authenticated and public access
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function testHeroSection() {
  console.log('🔍 Testing Hero Section API Endpoint...\n');

  // Test 1: Public access (no auth) - This is what the frontend uses
  console.log('1️⃣ Testing PUBLIC access (no auth token)...');
  try {
    const publicUrl = `${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`;
    const publicResponse = await fetch(publicUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`   Status: ${publicResponse.status} ${publicResponse.statusText}`);
    
    if (publicResponse.ok) {
      const data = await publicResponse.json();
      console.log('   ✅ PUBLIC access works!');
      console.log(`   Title: ${data?.data?.attributes?.title || 'N/A'}`);
      console.log(`   Published: ${data?.data?.attributes?.publishedAt ? 'Yes' : 'No'}`);
    } else {
      const errorText = await publicResponse.text();
      console.log('   ❌ PUBLIC access failed!');
      console.log(`   Error: ${errorText.substring(0, 200)}`);
      
      if (publicResponse.status === 403 || publicResponse.status === 401) {
        console.log('\n   ⚠️  PERMISSION ISSUE: Public role needs "find" and "findOne" permissions for Hero Section');
        console.log('   Fix: Go to Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public');
        console.log('        Enable "find" and "findOne" for "Hero Section"');
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n');

  // Test 2: Authenticated access (with token)
  console.log('2️⃣ Testing AUTHENTICATED access (with API token)...');
  try {
    const authUrl = `${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`;
    const authResponse = await fetch(authUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`   Status: ${authResponse.status} ${authResponse.statusText}`);
    
    if (authResponse.ok) {
      const data = await authResponse.json();
      console.log('   ✅ AUTHENTICATED access works!');
      console.log(`   Title: ${data?.data?.attributes?.title || 'N/A'}`);
      console.log(`   Published: ${data?.data?.attributes?.publishedAt ? 'Yes' : 'No'}`);
    } else {
      const errorText = await authResponse.text();
      console.log('   ❌ AUTHENTICATED access failed!');
      console.log(`   Error: ${errorText.substring(0, 200)}`);
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n');

  // Test 3: Check if endpoint exists
  console.log('3️⃣ Testing endpoint existence...');
  try {
    const testUrl = `${STRAPI_URL}/api`;
    const testResponse = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (testResponse.ok) {
      const data = await testResponse.json();
      const contentTypes = Object.keys(data);
      console.log(`   ✅ Available content types: ${contentTypes.join(', ')}`);
      
      if (contentTypes.includes('hero-section')) {
        console.log('   ✅ hero-section endpoint exists');
      } else {
        console.log('   ❌ hero-section endpoint NOT found');
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('   - If PUBLIC access works: ✅ Frontend will work (no code changes needed)');
  console.log('   - If only AUTHENTICATED works: ⚠️  Need to fix Public role permissions');
  console.log('   - If both fail: ❌ Content type might not exist or be published');
}

testHeroSection().catch(console.error);

