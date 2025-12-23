/**
 * Test the complete frontend flow - simulates what the frontend does
 */

const STRAPI_URL = 'https://admin.districtflowers.com';

// Simulate strapiPublicFetch (simplified version)
async function strapiPublicFetch(endpoint) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  const responseData = await response.json();
  
  // Normalize (simplified version of normalizeStrapiV5Response)
  const normalized = normalizeStrapiV5Response(responseData);
  return normalized;
}

// Simulate normalization
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
  if ('attributes' in entity && typeof entity.attributes === 'object') {
    return entity;
  }

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

async function testFrontendFlow() {
  console.log('🔍 Testing Complete Frontend Flow...\n');
  console.log('Simulating: getHeroSection() → strapiPublicFetch() → normalize → component\n');

  try {
    // Simulate what getHeroSection does
    console.log('1️⃣ Calling strapiPublicFetch("/hero-section?populate=*&publicationState=live")...');
    const { data } = await strapiPublicFetch('/hero-section?populate=*&publicationState=live');
    
    console.log('✅ Fetch successful!\n');
    
    if (!data) {
      console.log('❌ No data returned');
      return;
    }

    console.log('2️⃣ Checking normalized data structure:');
    console.log('   Has data?', !!data);
    console.log('   Has attributes?', !!data.attributes);
    console.log('   Data ID:', data.id);
    console.log('   Title from data.attributes.title:', data.attributes?.title);
    console.log('   Subtitle:', data.attributes?.subtitle?.substring(0, 50) + '...');
    
    console.log('\n3️⃣ Simulating what HeroSection component receives:');
    const componentData = data.attributes; // This is what page.tsx passes: heroData?.attributes
    
    console.log('   Component receives (data.attributes):', {
      hasTitle: !!componentData?.title,
      title: componentData?.title,
      hasSubtitle: !!componentData?.subtitle,
      hasBackgroundImage: !!componentData?.backgroundImage,
      hasBeforeImage: !!componentData?.beforeImage,
      hasAfterImage: !!componentData?.afterImage,
    });
    
    console.log('\n4️⃣ What HeroSection would display:');
    const title = componentData?.title || 'Where Design Takes Root (FALLBACK)';
    const subtitle = componentData?.subtitle || 'Fallback subtitle';
    console.log('   Title:', title);
    console.log('   Subtitle:', subtitle.substring(0, 60) + '...');
    
    if (componentData?.title) {
      console.log('\n✅ SUCCESS! Component should display Strapi data');
    } else {
      console.log('\n❌ PROBLEM! Component will use fallback values');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testFrontendFlow();

