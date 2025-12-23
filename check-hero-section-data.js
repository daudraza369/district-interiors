/**
 * Check Hero Section Data from Strapi
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

async function checkHeroData() {
  console.log('🔍 Checking Hero Section Data...\n');

  try {
    const response = await fetch(`${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`);
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('✅ API Response Status:', response.status);
    console.log('\n📄 Full Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data?.data) {
      console.log('\n📋 Hero Section Data:');
      console.log('   ID:', data.data.id);
      console.log('   Title:', data.data.attributes?.title || 'NOT SET');
      console.log('   Subtitle:', data.data.attributes?.subtitle || 'NOT SET');
      console.log('   Description:', data.data.attributes?.description ? data.data.attributes.description.substring(0, 50) + '...' : 'NOT SET');
      console.log('   Published:', data.data.attributes?.publishedAt ? 'Yes (' + new Date(data.data.attributes.publishedAt).toLocaleString() + ')' : 'NO - NEEDS PUBLISHING');
      console.log('   Primary Button Text:', data.data.attributes?.primaryButtonText || 'NOT SET');
      console.log('   Secondary Button Text:', data.data.attributes?.secondaryButtonText || 'NOT SET');
      
      if (!data.data.attributes?.publishedAt) {
        console.log('\n⚠️  CONTENT IS NOT PUBLISHED!');
        console.log('   Action: Go to Strapi Admin → Content Manager → Hero Section → Click "Publish"');
      }
    } else {
      console.log('\n⚠️  No data found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkHeroData();

