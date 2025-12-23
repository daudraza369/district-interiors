/**
 * Test if normalization is working correctly
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

// Simulate the normalization function from strapi-adapters.ts
function normalizeStrapiV5Entity(entity) {
  // If it already has attributes, it's already normalized or v4 format
  if ('attributes' in entity && typeof entity.attributes === 'object') {
    return entity;
  }

  // Extract id/documentId and separate from other fields
  const { id, documentId, createdAt, updatedAt, publishedAt, ...attributes } = entity;
  
  return {
    id: id || (documentId ? parseInt(documentId) : 0),
    attributes: {
      ...attributes,
      // Preserve metadata if needed
      ...(createdAt && { createdAt }),
      ...(updatedAt && { updatedAt }),
      ...(publishedAt && { publishedAt }),
    },
  };
}

async function testNormalization() {
  console.log('🔍 Testing Strapi Response Normalization...\n');

  try {
    const response = await fetch(`${STRAPI_URL}/api/hero-section?populate=*&publicationState=live`);
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log('📄 RAW Strapi Response (first 500 chars):');
    console.log(JSON.stringify(rawData, null, 2).substring(0, 500));
    console.log('\n');

    if (rawData?.data) {
      console.log('🔧 Normalizing response...\n');
      const normalized = normalizeStrapiV5Entity(rawData.data);
      
      console.log('✅ NORMALIZED Response:');
      console.log('   Has attributes?', !!normalized.attributes);
      console.log('   ID:', normalized.id);
      console.log('   Title (raw):', rawData.data.title);
      console.log('   Title (normalized):', normalized.attributes?.title);
      console.log('   Subtitle (normalized):', normalized.attributes?.subtitle);
      console.log('   Has backgroundImage?', !!normalized.attributes?.backgroundImage);
      
      console.log('\n📋 Full normalized structure (attributes keys):');
      if (normalized.attributes) {
        console.log('   Keys:', Object.keys(normalized.attributes).join(', '));
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testNormalization();

