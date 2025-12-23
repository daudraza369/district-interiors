/**
 * Auto-populate Client Logos Section
 * Run this AFTER row2Logos field is added and Strapi has restarted
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

// Get available media files
async function getMediaFiles() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching media:', error.message);
    return [];
  }
}

// Populate client logos
async function populateClientLogos() {
  console.log('🚀 Auto-populating Client Logos Section...\n');

  // Step 1: Get media files
  console.log('1️⃣ Fetching available media files...');
  const mediaFiles = await getMediaFiles();
  console.log(`   ✅ Found ${mediaFiles.length} media files\n`);
  
  if (mediaFiles.length < 6) {
    console.log('⚠️  Not enough media files (need at least 6)');
    console.log('   Please upload more images to Strapi Media Library first');
    return;
  }
  
  // Use first 6 images as logos
  const logos = mediaFiles.slice(0, 6).map((file, index) => ({
    clientName: `Client ${index + 1}`,
    logo: file.id, // Use media file ID
    websiteUrl: '',
    displayOrder: index,
  }));
  
  // Split into two rows (3 each)
  const row1Logos = logos.slice(0, 3);
  const row2Logos = logos.slice(3, 6);
  
  console.log('2️⃣ Preparing logo data...');
  console.log(`   Row 1: ${row1Logos.length} logos`);
  console.log(`   Row 2: ${row2Logos.length} logos\n`);
  
  // Step 2: Update content
  console.log('3️⃣ Updating Client Logos Section in Strapi...');
  const updateData = {
    data: {
      title: 'Trusted By Leading Brands',
      subtitle: 'Proud collaborations with top names in hospitality and design.',
      showRow1: true,
      showRow2: true,
      row1Logos: row1Logos,
      row2Logos: row2Logos,
    },
  };
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/client-logos-section`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Client logos populated successfully!\n');
      console.log('📋 IMPORTANT: Go to Strapi Admin to:');
      console.log('   1. Content Manager → Client Logos Section');
      console.log('   2. Update client names (currently "Client 1", "Client 2", etc.)');
      console.log('   3. Update website URLs if needed');
      console.log('   4. Click "Publish" (top right)\n');
      console.log('✅ After publishing, the logos will appear on the frontend!');
    } else {
      const errorText = await response.text();
      console.error(`❌ Error ${response.status}:`);
      console.error(errorText);
      
      if (response.status === 400) {
        console.log('\n💡 Possible issues:');
        console.log('   - row2Logos field might not exist yet (run add-row2logos-field.sh first)');
        console.log('   - Media file IDs might be incorrect');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

populateClientLogos();

