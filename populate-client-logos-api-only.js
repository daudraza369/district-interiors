/**
 * Populate Client Logos Section via API ONLY
 * 
 * This script:
 * - Uses ONLY Strapi API (no server access needed)
 * - Creates/updates content (not schema)
 * - Gracefully handles missing row2Logos field
 * - Works entirely from your local machine
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

// Sample client logos data
const sampleLogosRow1 = [
  { clientName: 'PepsiCo', displayOrder: 0 },
  { clientName: 'Savvy', displayOrder: 1 },
  { clientName: 'Crowne Plaza', displayOrder: 2 },
  { clientName: 'Client 4', displayOrder: 3 },
  { clientName: 'Client 5', displayOrder: 4 },
  { clientName: 'Client 6', displayOrder: 5 },
];

const sampleLogosRow2 = [
  { clientName: 'Brand A', displayOrder: 0 },
  { clientName: 'Brand B', displayOrder: 1 },
  { clientName: 'Brand C', displayOrder: 2 },
  { clientName: 'Brand D', displayOrder: 3 },
  { clientName: 'Brand E', displayOrder: 4 },
  { clientName: 'Brand F', displayOrder: 5 },
];

async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

async function getExistingContent() {
  try {
    console.log('📡 Fetching existing Client Logos Section...');
    const data = await fetchWithAuth(
      `${STRAPI_URL}/api/client-logos-section?populate=*`
    );
    return data.data;
  } catch (error) {
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      console.log('⚠️  Client Logos Section not found, will create new one');
      return null;
    }
    throw error;
  }
}

async function updateClientLogosSection(data) {
  console.log('📤 Updating Client Logos Section...');
  
  // Check if row2Logos field exists by trying to access it
  // If it doesn't exist in schema, Strapi will ignore it in the update
  const updateData = {
    data: {
      title: data.title || 'Trusted By Leading Brands',
      subtitle: data.subtitle || 'Proud collaborations with top names in hospitality and design.',
      showRow1: data.showRow1 !== false,
      showRow2: data.showRow2 !== false,
      row1Logos: data.row1Logos || [],
      // Only include row2Logos if we're trying to set it (Strapi will ignore if field doesn't exist)
      ...(data.row2Logos !== undefined && { row2Logos: data.row2Logos }),
    },
  };

  try {
    const result = await fetchWithAuth(
      `${STRAPI_URL}/api/client-logos-section`,
      {
        method: 'PUT',
        body: JSON.stringify(updateData),
      }
    );
    return result.data;
  } catch (error) {
    // If error mentions row2Logos, the field doesn't exist yet
    if (error.message.includes('row2Logos') || error.message.includes('Invalid key')) {
      console.log('⚠️  row2Logos field not found in schema. Please add it via Strapi Admin UI first.');
      console.log('📝 See CLIENT_LOGOS_NO_SERVER_ACCESS.md for instructions');
      // Try without row2Logos
      const { row2Logos, ...dataWithoutRow2 } = updateData.data;
      const result = await fetchWithAuth(
        `${STRAPI_URL}/api/client-logos-section`,
        {
          method: 'PUT',
          body: JSON.stringify({ data: dataWithoutRow2 }),
        }
      );
      return result.data;
    }
    throw error;
  }
}

async function publishContent() {
  console.log('📢 Publishing Client Logos Section...');
  try {
    await fetchWithAuth(
      `${STRAPI_URL}/api/client-logos-section/actions/publish`,
      { method: 'POST' }
    );
    console.log('✅ Content published successfully!');
  } catch (error) {
    console.warn('⚠️  Could not publish via API. Please publish manually in Strapi Admin.');
    console.warn('   Error:', error.message);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Client Logos Section population...\n');
    console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

    // Get existing content
    const existing = await getExistingContent();

    // Determine what to update
    const updateData = {
      title: 'Trusted By Leading Brands',
      subtitle: 'Proud collaborations with top names in hospitality and design.',
      showRow1: true,
      showRow2: true,
      // Only update row1Logos if it's empty or missing
      row1Logos: existing?.attributes?.row1Logos?.length > 0 
        ? existing.attributes.row1Logos 
        : sampleLogosRow1,
      // Only update row2Logos if field exists and is empty
      row2Logos: existing?.attributes?.row2Logos?.length > 0
        ? existing.attributes.row2Logos
        : sampleLogosRow2,
    };

    console.log('📝 Updating content...');
    if (existing?.attributes?.row1Logos?.length > 0) {
      console.log('   ℹ️  row1Logos already has content, keeping it');
    } else {
      console.log('   ➕ Adding logos to row1Logos');
    }

    if (existing?.attributes?.row2Logos?.length > 0) {
      console.log('   ℹ️  row2Logos already has content, keeping it');
    } else {
      console.log('   ➕ Attempting to add logos to row2Logos (may fail if field not added yet)');
    }

    const result = await updateClientLogosSection(updateData);
    console.log('✅ Content updated successfully!');

    // Try to publish
    await publishContent();

    console.log('\n✅ Done!');
    console.log('\n📋 Next steps:');
    console.log('   1. Check Strapi Admin → Content Manager → Client Logos Section');
    console.log('   2. If row2Logos field is missing, add it via Content-Type Builder (see CLIENT_LOGOS_NO_SERVER_ACCESS.md)');
    console.log('   3. Upload logo images for each client in Content Manager');
    console.log('   4. Publish if not auto-published');
    console.log('   5. Check frontend: https://web.districtflowers.com/interiors');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   - Make sure STRAPI_API_TOKEN is set correctly');
    console.error('   - Make sure NEXT_PUBLIC_STRAPI_URL points to your Strapi instance');
    console.error('   - Check that Client Logos Section content type exists in Strapi');
    process.exit(1);
  }
}

main();

