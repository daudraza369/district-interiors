/**
 * Test different populate strategies to see what works
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function testPopulate() {
  console.log('🔍 Testing different populate strategies...\n');

  const strategies = [
    'populate=*',
    'populate[row1Logos]=*',
    'populate[row1Logos][populate]=*',
    'populate[row1Logos][populate][logo]=*',
  ];

  for (const populate of strategies) {
    try {
      const url = `${STRAPI_URL}/api/client-logos-section?${populate}&publicationState=live`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const item = data.data.attributes || data.data;
        
        console.log(`✅ ${populate}:`);
        console.log(`   Has row1Logos: ${!!item.row1Logos}`);
        if (item.row1Logos && Array.isArray(item.row1Logos)) {
          console.log(`   row1Logos length: ${item.row1Logos.length}`);
          if (item.row1Logos.length > 0) {
            console.log(`   First item: ${JSON.stringify(item.row1Logos[0]).substring(0, 150)}`);
          }
        }
        console.log(`   Has row2Logos: ${!!item.row2Logos}`);
        if (item.row2Logos && Array.isArray(item.row2Logos)) {
          console.log(`   row2Logos length: ${item.row2Logos.length}`);
        }
        console.log('');
      } else {
        const errorText = await response.text();
        console.log(`❌ ${populate}: ${response.status} - ${errorText.substring(0, 100)}\n`);
      }
    } catch (error) {
      console.log(`❌ ${populate}: Error - ${error.message}\n`);
    }
  }
}

testPopulate();

