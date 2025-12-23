/**
 * Check the actual structure of client-logos-section
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function checkStructure() {
  console.log('🔍 Checking Client Logos Section Structure...\n');

  try {
    // Fetch without populate to see base structure
    const url = `${STRAPI_URL}/api/client-logos-section?publicationState=live`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('📄 Full Response Structure:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.data) {
        const item = data.data.attributes || data.data;
        console.log('\n📋 Available Fields:');
        console.log(`   Keys: ${Object.keys(item).join(', ')}`);
        console.log(`   Title: ${item.title || 'N/A'}`);
        console.log(`   Subtitle: ${item.subtitle || 'N/A'}`);
        
        // Check for logo fields
        const logoFields = Object.keys(item).filter(key => 
          key.toLowerCase().includes('logo') || key.toLowerCase().includes('row')
        );
        console.log(`\n🎯 Logo/Row related fields: ${logoFields.join(', ')}`);
        
        if (logoFields.length > 0) {
          logoFields.forEach(field => {
            console.log(`\n   ${field}:`);
            console.log(`     Type: ${typeof item[field]}`);
            console.log(`     Value: ${JSON.stringify(item[field]).substring(0, 100)}`);
            if (Array.isArray(item[field])) {
              console.log(`     Array length: ${item[field].length}`);
            }
          });
        }
      }
    } else {
      const errorText = await response.text();
      console.log(`❌ Error ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  // Try with simple populate
  console.log('\n\n2️⃣ Testing with populate=* (simple)...');
  try {
    const url = `${STRAPI_URL}/api/client-logos-section?populate=*&publicationState=live`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const item = data.data.attributes || data.data;
      console.log('✅ Success with populate=*');
      console.log(`   Fields with populate: ${Object.keys(item).join(', ')}`);
      
      // Check if row1Logos or row2Logos exist
      if (item.row1Logos) {
        console.log(`\n   row1Logos exists!`);
        console.log(`     Type: ${typeof item.row1Logos}`);
        console.log(`     Is Array: ${Array.isArray(item.row1Logos)}`);
        if (Array.isArray(item.row1Logos)) {
          console.log(`     Length: ${item.row1Logos.length}`);
          if (item.row1Logos.length > 0) {
            console.log(`     First item keys: ${Object.keys(item.row1Logos[0]).join(', ')}`);
          }
        }
      } else {
        console.log(`\n   ⚠️  row1Logos does NOT exist`);
      }
      
      if (item.row2Logos) {
        console.log(`\n   row2Logos exists!`);
        console.log(`     Type: ${typeof item.row2Logos}`);
        console.log(`     Is Array: ${Array.isArray(item.row2Logos)}`);
        if (Array.isArray(item.row2Logos)) {
          console.log(`     Length: ${item.row2Logos.length}`);
          if (item.row2Logos.length > 0) {
            console.log(`     First item keys: ${Object.keys(item.row2Logos[0]).join(', ')}`);
          }
        }
      } else {
        console.log(`\n   ⚠️  row2Logos does NOT exist`);
      }
    } else {
      const errorText = await response.text();
      console.log(`❌ Error: ${errorText.substring(0, 200)}`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkStructure();

