/**
 * Script to populate Client Logos Section in Strapi
 * Run with: node populate-client-logos.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

if (!API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

async function populateClientLogos() {
  const url = `${STRAPI_URL}/api/client-logos`;

  // First, check if the content type exists
  console.log('📡 Checking if client-logos content type exists...');
  try {
    const checkResponse = await fetch(`${url}?populate=*`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      console.log('✅ Client logos section exists!');
      console.log('Current data:', JSON.stringify(existing, null, 2).substring(0, 500));
    } else {
      console.log(`⚠️  GET returned ${checkResponse.status}: ${checkResponse.statusText}`);
      const errorText = await checkResponse.text();
      console.log('Response:', errorText.substring(0, 300));
      
      if (checkResponse.status === 404 || checkResponse.status === 405) {
        console.log('\n❌ The client-logos content type does not exist in Strapi yet.');
        console.log('📋 You need to create it first in Strapi admin panel:');
        console.log('   1. Go to Content-Type Builder');
        console.log('   2. Create a new Single Type called "client-logos"');
        console.log('   3. Add the following fields:');
        console.log('      - title (Text)');
        console.log('      - subtitle (Text, optional)');
        console.log('      - showRow1 (Boolean, default: true)');
        console.log('      - showRow2 (Boolean, default: true)');
        console.log('      - row1Logos (Component: client-logo-item, Repeatable)');
        console.log('      - row2Logos (Component: client-logo-item, Repeatable)');
        console.log('   4. Create a Component called "client-logo-item" with:');
        console.log('      - clientName (Text)');
        console.log('      - logo (Media, single)');
        console.log('      - websiteUrl (Text, optional)');
        console.log('      - displayOrder (Integer, default: 0)');
        console.log('\n   Then run this script again.');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('❌ Error checking content type:', error.message);
    process.exit(1);
  }

  const clientLogosData = {
    data: {
      title: 'Trusted By Leading Brands',
      subtitle: 'Proud collaborations with top names in hospitality and design.',
      showRow1: true,
      showRow2: true,
      // Note: row1Logos and row2Logos will need to be populated separately
      // as they require component data with media files
      // For now, we'll create the structure and the user can add logos via Strapi admin
    }
  };

  try {
    console.log('📡 Creating/updating client-logos section (single type uses PUT)...');
    
    // For Strapi single types, always use PUT (works for both create and update)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientLogosData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error ${response.status}: ${errorText}`);
      console.error(`Full response:`, errorText);
      process.exit(1);
    }

    const result = await response.json();
    console.log('✅ Client logos section created/updated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Strapi admin panel');
    console.log('2. Navigate to Content Manager > Client Logos');
    console.log('3. Add client logos to Row 1 Logos and Row 2 Logos');
    console.log('   Each logo needs:');
    console.log('   - Client Name');
    console.log('   - Logo (image file)');
    console.log('   - Website URL (optional)');
    console.log('   - Display Order');
    console.log('\n💡 You can upload logo images directly in Strapi admin panel');
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

populateClientLogos();

