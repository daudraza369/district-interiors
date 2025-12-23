/**
 * Script to populate Client Logos Section in Strapi
 * Run with: node populate-client-logos.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.districtflowers.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'a7ef5a357b8d08c74f5bd5a34df9df6d333be57f3cb1b082946d1c2f95add7335dc4e6fef09b59e290259524c13f88a17c497b9970a0e96ee9cf96fbf61e347208e2847d2ad90bfa99cd8b7705a0fa15f4481eeb223e47ecda14c4391e5757a426715c3bb8f8094a2c816bcbc5a23c5100e5bd23e620393a929f6decd1119418';

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
      // Try to access the admin endpoint as a simple connectivity check
      const response = await fetch(`${STRAPI_URL}/admin`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (response.ok || response.status === 302 || response.status === 200) {
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
        // For other errors, just continue - Strapi might be up
        console.log(`⚠️  Connection check returned error, but continuing... (attempt ${i + 1}/${maxRetries})`);
        if (i >= 2) { // After 2 attempts, assume it's up and continue
          console.log('✅ Assuming Strapi is ready, continuing...');
          return true;
        }
        if (i < maxRetries - 1) {
          await sleep(retryDelay);
          continue;
        }
      }
    }
  }
  
  // Even if checks failed, try to proceed - might be a connectivity issue, not Strapi being down
  console.log('⚠️  Could not confirm Strapi readiness, but proceeding anyway...');
  return true;
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
    
    if (checkResponse.status === 404) {
      console.log('\n⚠️  Content type not found via GET (might need permissions or doesn\'t exist yet)');
      console.log('🔄 Proceeding to create/update anyway using PUT (single types support PUT for create)...');
      // Continue to create/update section below
    } else if (checkResponse.status === 403 || checkResponse.status === 401) {
      console.log('\n⚠️  Permission denied. Please set API permissions:');
      console.log('   1. Go to Strapi Admin > Settings > Users & Permissions Plugin > Roles > Public');
      console.log('   2. Enable "find" and "findOne" for "Client Logos Section"');
      console.log('   3. Or ensure your API token has permissions');
      console.log('🔄 Attempting to create anyway...');
      // Continue to create/update section below
    } else {
      console.log(`\n⚠️  Unexpected status ${checkResponse.status}, but proceeding to create/update...`);
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

