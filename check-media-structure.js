/**
 * Check the exact media structure returned and what the component expects
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

async function checkMediaStructure() {
  console.log('🔍 Checking Media Structure Mismatch...\n');

  const response = await fetch(`${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`);
  const rawData = await response.json();

  console.log('📄 RAW Strapi Response - backgroundImage structure:');
  console.log(JSON.stringify(rawData.data.backgroundImage, null, 2).substring(0, 500));
  console.log('\n');

  // Simulate normalization
  function normalizeStrapiV5Entity(entity) {
    if ('attributes' in entity && typeof entity.attributes === 'object') {
      return entity;
    }
    const { id, documentId, createdAt, updatedAt, publishedAt, ...attributes } = entity;
    return {
      id: id || 0,
      attributes: { ...attributes, ...(createdAt && { createdAt }), ...(updatedAt && { updatedAt }), ...(publishedAt && { publishedAt }) },
    };
  }

  const normalized = normalizeStrapiV5Entity(rawData.data);
  
  console.log('📄 NORMALIZED - backgroundImage in attributes:');
  console.log('Type:', typeof normalized.attributes.backgroundImage);
  console.log('Has url?', !!normalized.attributes.backgroundImage?.url);
  console.log('Has data?', !!normalized.attributes.backgroundImage?.data);
  console.log('Keys:', Object.keys(normalized.attributes.backgroundImage || {}));
  console.log('\n');

  // Check what getImageUrl expects
  console.log('🔍 What getImageUrl() function checks:');
  console.log('1. Checks if image.url exists (v5 format) ✅');
  console.log('2. Checks if image.data.attributes.url exists (v4 format) ❌');
  console.log('\n');

  // Test getImageUrl logic
  const image = normalized.attributes.backgroundImage;
  const baseUrl = STRAPI_URL;
  
  let imageUrl = null;
  
  // Simulate getImageUrl logic
  if (image) {
    // Check v5 format first (direct url property)
    if ('url' in image && image.url) {
      imageUrl = `${baseUrl}${image.url}`;
      console.log('✅ getImageUrl() would use v5 format');
      console.log(`   Result: ${imageUrl}`);
    }
    // Check v4 format (nested data.attributes.url)
    else if ('data' in image && image.data?.attributes?.url) {
      imageUrl = `${baseUrl}${image.data.attributes.url}`;
      console.log('✅ getImageUrl() would use v4 format');
      console.log(`   Result: ${imageUrl}`);
    } else {
      console.log('❌ getImageUrl() would return null');
      console.log('   Image structure:', Object.keys(image));
    }
  }

  console.log('\n📋 INTERFACE EXPECTATION:');
  console.log('HeroSection interface expects:');
  console.log('  backgroundImage?: { data: StrapiEntity<{ url: string }> }');
  console.log('But normalized data has:');
  console.log('  backgroundImage: { url: string, ... } (direct object, v5 format)');
  console.log('\n⚠️  MISMATCH! The interface expects v4 format but we have v5 format');
  console.log('However, getImageUrl() handles both formats, so this should still work.');
}

checkMediaStructure();

