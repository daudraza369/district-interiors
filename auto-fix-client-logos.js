/**
 * Auto-fix Client Logos Section via API
 * Attempts to populate content and check what we can fix automatically
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function autoFix() {
  console.log('🔧 Attempting to auto-fix Client Logos Section via API...\n');

  // Step 1: Check what exists
  console.log('1️⃣ Checking current state...');
  try {
    const checkUrl = `${STRAPI_URL}/api/client-logos-section?populate=*`;
    const checkResponse = await fetch(checkUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (checkResponse.ok) {
      const data = await checkResponse.json();
      const item = data.data.attributes || data.data;
      
      console.log('   ✅ Content type exists');
      console.log(`   Title: ${item.title || 'NOT SET'}`);
      console.log(`   Has row1Logos: ${!!item.row1Logos} (${Array.isArray(item.row1Logos) ? item.row1Logos.length : 'N/A'} items)`);
      console.log(`   Has row2Logos: ${!!item.row2Logos} (${Array.isArray(item.row2Logos) ? item.row2Logos.length : 'N/A'} items)`);
      
      // Check if we can update
      const id = data.data.id || data.data.documentId;
      console.log(`\n   Content ID: ${id}`);
      
      // Step 2: Try to update with row2Logos (even if field doesn't exist, test what happens)
      console.log('\n2️⃣ Attempting to check if we can add row2Logos via API...');
      console.log('   ⚠️  Note: Strapi does not allow adding NEW fields via API');
      console.log('   ⚠️  Fields must be added via Content-Type Builder');
      console.log('   ✅ But we CAN populate existing fields with data\n');
      
      // Step 3: Check what we CAN do - populate existing row1Logos if it's empty
      if (item.row1Logos && Array.isArray(item.row1Logos) && item.row1Logos.length === 0) {
        console.log('3️⃣ row1Logos exists but is empty - we can populate it!');
        console.log('   However, we need logo images uploaded first.');
        console.log('   Let me check what media exists...\n');
        
        // Check media library
        const mediaUrl = `${STRAPI_URL}/api/upload/files`;
        const mediaResponse = await fetch(mediaUrl, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        });
        
        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          console.log(`   ✅ Found ${mediaData.length || 0} files in media library`);
          if (mediaData.length > 0) {
            console.log(`   Files: ${mediaData.slice(0, 5).map(f => f.name).join(', ')}...`);
          }
        }
      } else if (!item.row1Logos) {
        console.log('3️⃣ ⚠️  row1Logos field does not exist');
        console.log('   Cannot create fields via API - must use Content-Type Builder\n');
      }
      
      // Step 4: Try to get schema information
      console.log('4️⃣ Checking if we can access schema via API...');
      try {
        const schemaUrl = `${STRAPI_URL}/api/content-type-builder/content-types/api::client-logos-section.client-logos-section`;
        const schemaResponse = await fetch(schemaUrl, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        });
        
        if (schemaResponse.ok) {
          const schema = await schemaResponse.json();
          console.log('   ✅ Can access schema!');
          console.log(`   Fields: ${Object.keys(schema.data?.schema?.attributes || {}).join(', ')}`);
        } else {
          console.log(`   ❌ Cannot access schema (${schemaResponse.status})`);
          console.log('   Content-Type Builder API is not publicly available\n');
        }
      } catch (error) {
        console.log(`   ❌ Schema check failed: ${error.message}`);
      }
      
    } else {
      console.log(`   ❌ Content type check failed: ${checkResponse.status}`);
    }
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  console.log('\n📋 LIMITATIONS:');
  console.log('   ❌ Cannot create/modify content type fields via API');
  console.log('   ❌ Cannot add new fields (like row2Logos) via API');
  console.log('   ✅ CAN populate existing fields with data');
  console.log('   ✅ CAN update content if fields exist');
  console.log('\n💡 SOLUTION:');
  console.log('   Fields must be added via Strapi Admin UI (Content-Type Builder)');
  console.log('   But once fields exist, I can help populate them via API!');
}

autoFix();

