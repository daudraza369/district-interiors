/**
 * Test what the frontend would actually receive
 * Simulating the exact flow the frontend uses
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

// Simulate the exact strapiPublicFetch function
async function strapiPublicFetch(endpoint) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  console.log(`[strapiPublicFetch] Fetching: ${url}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log(`[strapiPublicFetch] Response status: ${response.status}`);

  if (response.status === 404) {
    console.warn(`[strapiPublicFetch] 404 - endpoint not found`);
    return { data: null };
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[strapiPublicFetch] Error ${response.status}: ${errorText.substring(0, 200)}`);
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  const responseData = await response.json();
  console.log(`[strapiPublicFetch] Got response data`);
  
  // Normalize the response
  const normalized = normalizeStrapiV5Response(responseData);
  console.log(`[strapiPublicFetch] Normalized response`);
  
  return normalized;
}

// Normalize function (from strapi-adapters.ts)
function normalizeStrapiV5Response(response) {
  if (!response.data) {
    return response;
  }

  if (response.data === null) {
    return response;
  }

  if (Array.isArray(response.data)) {
    return {
      ...response,
      data: response.data.map((item) => normalizeStrapiV5Entity(item)),
    };
  }

  return {
    ...response,
    data: normalizeStrapiV5Entity(response.data),
  };
}

function normalizeStrapiV5Entity(entity) {
  // If it already has attributes, it's already normalized
  if ('attributes' in entity && typeof entity.attributes === 'object' && entity.attributes !== null) {
    return entity;
  }

  // Extract id/documentId and separate from other fields
  const { id, documentId, createdAt, updatedAt, publishedAt, ...attributes } = entity;
  
  return {
    id: id || (documentId ? parseInt(documentId) : 0),
    attributes: {
      ...attributes,
      ...(createdAt && { createdAt }),
      ...(updatedAt && { updatedAt }),
      ...(publishedAt && { publishedAt }),
    },
  };
}

async function testCompleteFlow() {
  console.log('🔍 Testing Complete Frontend Flow - Root Cause Analysis\n');
  console.log('='.repeat(60));

  try {
    // Step 1: Test API endpoint (what frontend calls)
    console.log('\n1️⃣ Testing API Endpoint (what getHeroSection() calls)...');
    console.log('Endpoint: /hero-section?populate=*&publicationState=live\n');
    
    const { data } = await strapiPublicFetch('/hero-section?populate=*&publicationState=live');
    
    console.log('\n2️⃣ Checking returned data structure:');
    console.log(`   Has data? ${!!data}`);
    console.log(`   Data type: ${typeof data}`);
    console.log(`   Is null? ${data === null}`);
    
    if (!data) {
      console.log('\n❌ ROOT CAUSE: No data returned from API!');
      return;
    }

    console.log(`   Has attributes? ${!!data.attributes}`);
    console.log(`   Data ID: ${data.id}`);
    
    if (!data.attributes) {
      console.log('\n❌ ROOT CAUSE: Data does not have attributes property!');
      console.log('   Data structure:', Object.keys(data));
      return;
    }

    // Step 3: Check what the component receives
    console.log('\n3️⃣ Checking what HeroSection component receives:');
    console.log('   (page.tsx passes: heroData?.attributes)');
    
    const componentData = data.attributes;
    
    console.log(`   Title: ${componentData.title || 'MISSING'}`);
    console.log(`   Subtitle: ${componentData.subtitle ? componentData.subtitle.substring(0, 50) + '...' : 'MISSING'}`);
    console.log(`   Primary Button Text: ${componentData.primaryButtonText || 'MISSING'}`);
    console.log(`   Secondary Button Text: ${componentData.secondaryButtonText || 'MISSING'}`);
    
    // Step 4: Check media fields
    console.log('\n4️⃣ Checking media fields:');
    console.log(`   backgroundImage: ${componentData.backgroundImage ? 'EXISTS' : 'MISSING'}`);
    if (componentData.backgroundImage) {
      console.log(`     Type: ${typeof componentData.backgroundImage}`);
      console.log(`     Keys: ${Object.keys(componentData.backgroundImage).join(', ')}`);
      if (componentData.backgroundImage.url) {
        console.log(`     URL: ${componentData.backgroundImage.url}`);
      } else if (componentData.backgroundImage.data) {
        console.log(`     Has data property (v4 format)`);
      }
    }
    
    console.log(`   beforeImage: ${componentData.beforeImage ? 'EXISTS' : 'MISSING'}`);
    console.log(`   afterImage: ${componentData.afterImage ? 'EXISTS' : 'MISSING'}`);
    
    // Step 5: Test image URL extraction
    console.log('\n5️⃣ Testing image URL extraction (what getImageUrl() would do):');
    
    if (componentData.backgroundImage) {
      // Check if it's v4 format (has data property)
      if (componentData.backgroundImage.data) {
        const imageData = componentData.backgroundImage.data;
        if (imageData.url) {
          const fullUrl = imageData.url.startsWith('http') 
            ? imageData.url 
            : `${STRAPI_URL}${imageData.url}`;
          console.log(`   backgroundImage URL: ${fullUrl}`);
        } else {
          console.log(`   ⚠️  backgroundImage.data.url is missing`);
        }
      } else if (componentData.backgroundImage.url) {
        // v5 format - url directly on object
        const fullUrl = componentData.backgroundImage.url.startsWith('http')
          ? componentData.backgroundImage.url
          : `${STRAPI_URL}${componentData.backgroundImage.url}`;
        console.log(`   backgroundImage URL (v5 format): ${fullUrl}`);
      }
    }

    // Step 6: Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 ROOT CAUSE ANALYSIS SUMMARY:\n');
    
    if (componentData.title) {
      console.log('✅ API is working - data is returned');
      console.log('✅ Normalization is working - attributes exist');
      console.log('✅ Component should receive data');
      console.log('\n🔍 If frontend still not showing data, possible causes:');
      console.log('   1. Frontend code not deployed (most likely)');
      console.log('   2. Environment variable NEXT_PUBLIC_STRAPI_URL not set correctly');
      console.log('   3. Browser cache - need hard refresh');
      console.log('   4. Component not receiving data prop correctly');
    } else {
      console.log('❌ ISSUE: Title is missing - normalization may have failed');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
  }
}

testCompleteFlow();

