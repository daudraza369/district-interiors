/**
 * Script to populate Client Logos Section in Strapi
 * Run with: node populate-client-logos.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

if (!API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Helper function to wait
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Wait for Strapi to be ready with retries
async function waitForStrapi(maxRetries = 10, retryDelay = 5000) {
  console.log('⏳ Waiting for Strapi to be ready...');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(`${STRAPI_URL}/api`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (response.ok || response.status === 401 || response.status === 403) {
        // 401/403 means Strapi is up, just auth issue (which is fine, we'll check endpoints separately)
        console.log('✅ Strapi is ready!');
        return true;
      }
      
      if (response.status === 503) {
        console.log(`⏳ Strapi is still starting... (attempt ${i + 1}/${maxRetries})`);
        if (i < maxRetries - 1) {
          await sleep(retryDelay);
          continue;
        }
      }
    } catch (error) {
      if (error.name === 'TimeoutError' || error.message?.includes('ECONNREFUSED') || error.message?.includes('fetch failed')) {
        console.log(`⏳ Strapi is not responding yet... (attempt ${i + 1}/${maxRetries})`);
        if (i < maxRetries - 1) {
          await sleep(retryDelay);
          continue;
        }
      } else {
        throw error;
      }
    }
  }
  
  console.error('❌ Strapi did not become ready after multiple attempts');
  console.log('💡 Please check:');
  console.log('   1. Strapi service is running in Coolify');
  console.log('   2. Strapi has finished starting (check logs)');
  console.log('   3. Strapi URL is correct:', STRAPI_URL);
  return false;
}

async function populateClientLogos() {
  // First, wait for Strapi to be ready
  const strapiReady = await waitForStrapi();
  if (!strapiReady) {
    console.error('\n❌ Cannot proceed - Strapi is not ready');
    process.exit(1);
  }
  
  const url = `${STRAPI_URL}/api/client-logos-section`;

  // First, check if the content type exists (with retries)
  console.log('\n📡 Checking if client-logos-section content type exists...');
  let checkResponse;
  let retries = 0;
  const maxRetries = 5;
  
  while (retries < maxRetries) {
    try {
      checkResponse = await fetch(`${url}?populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (checkResponse.status === 503) {
        retries++;
        console.log(`⏳ Strapi is still processing schema changes... (retry ${retries}/${maxRetries})`);
        if (retries < maxRetries) {
          await sleep(3000); // Wait 3 seconds between retries
          continue;
        }
      }
      
      break; // Exit retry loop if not 503
    } catch (error) {
      if (error.name === 'TimeoutError' || error.message?.includes('fetch failed')) {
        retries++;
        console.log(`⏳ Connection error, retrying... (retry ${retries}/${maxRetries})`);
        if (retries < maxRetries) {
          await sleep(3000);
          continue;
        }
      }
      throw error;
    }
  }
  
  if (checkResponse.ok) {
    const existing = await checkResponse.json();
    console.log('✅ Client logos section exists!');
    console.log('Current data:', JSON.stringify(existing, null, 2).substring(0, 500));
  } else if (checkResponse.status === 503) {
    console.log('\n❌ Strapi is still starting after schema changes.');
    console.log('💡 Please wait 1-2 minutes for Strapi to fully restart, then run this script again.');
    console.log('   You can check Strapi logs in Coolify to see when it\'s ready.');
    process.exit(1);
  } else {
    console.log(`⚠️  GET returned ${checkResponse.status}: ${checkResponse.statusText}`);
    const errorText = await checkResponse.text();
    console.log('Response:', errorText.substring(0, 300));
    
    if (checkResponse.status === 404 || checkResponse.status === 405) {
      console.log('\n❌ The client-logos-section content type does not exist in Strapi yet.');
      console.log('📋 The schema files were created, but Strapi needs to restart to register them.');
      console.log('\n🔧 Next steps:');
      console.log('   1. Go to Coolify and restart the Strapi service');
      console.log('   2. Wait for Strapi to fully start (check logs)');
      console.log('   3. Run this script again');
      console.log('\n   Or create manually in Strapi admin:');
      console.log('   1. Go to Content-Type Builder');
      console.log('   2. Create a new Single Type called "client-logos-section"');
      console.log('   3. Add the following fields:');
      console.log('      - title (Text)');
      console.log('      - subtitle (Text, optional)');
      console.log('      - showRow1 (Boolean, default: true)');
      console.log('      - showRow2 (Boolean, default: true)');
      console.log('      - row1Logos (Component: client-logo-item, Repeatable)');
      console.log('      - row2Logos (Component: client-logo-item, Repeatable)');
      console.log('   4. Create a Component called "client-logo-item" with:');
      console.log('      - clientName (Text)');
      console.log('      - logo (Media, single)');
      console.log('      - websiteUrl (Text, optional)');
      console.log('      - displayOrder (Integer, default: 0)');
      process.exit(1);
    }
  }

  const clientLogosData = {
    data: {
      title: 'Trusted By Leading Brands',
      subtitle: 'Proud collaborations with top names in hospitality and design.',
      showRow1: true,
      showRow2: true,
      // Note: row1Logos and row2Logos will need to be populated separately
      // as they require component data with media files
      // For now, we'll create the structure and the user can add logos via Strapi admin
    }
  };

  try {
    console.log('\n📡 Creating/updating client-logos-section (single type uses PUT)...');
    
    // For Strapi single types, always use PUT (works for both create and update)
    let response;
    let retries = 0;
    const maxRetries = 3;
    
    while (retries < maxRetries) {
      try {
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientLogosData),
          signal: AbortSignal.timeout(15000), // 15 second timeout
        });
        
        if (response.status === 503) {
          retries++;
          console.log(`⏳ Strapi is still processing... (retry ${retries}/${maxRetries})`);
          if (retries < maxRetries) {
            await sleep(3000);
            continue;
          }
        }
        
        break; // Exit retry loop if not 503
      } catch (error) {
        if (error.name === 'TimeoutError' || error.message?.includes('fetch failed')) {
          retries++;
          console.log(`⏳ Connection error, retrying... (retry ${retries}/${maxRetries})`);
          if (retries < maxRetries) {
            await sleep(3000);
            continue;
          }
        }
        throw error;
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error ${response.status}: ${errorText}`);
      
      if (response.status === 503) {
        console.error('\n💡 Strapi is still starting. Please wait and try again in a minute.');
      }
      
      console.error(`Full response:`, errorText);
      process.exit(1);
    }

    const result = await response.json();
    console.log('✅ Client logos section created/updated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Strapi admin panel');
    console.log('2. Navigate to Content Manager > Client Logos');
    console.log('3. Add client logos to Row 1 Logos and Row 2 Logos');
    console.log('   Each logo needs:');
    console.log('   - Client Name');
    console.log('   - Logo (image file)');
    console.log('   - Website URL (optional)');
    console.log('   - Display Order');
    console.log('\n💡 You can upload logo images directly in Strapi admin panel');
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

populateClientLogos();

