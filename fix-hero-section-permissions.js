/**
 * Fix Hero Section Public Permissions in Strapi
 * Uses API token to enable public access
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function fixPermissions() {
  console.log('🔧 Fixing Hero Section Public Permissions...\n');

  try {
    // Step 1: Get the Public role ID
    console.log('1️⃣ Fetching Public role...');
    const rolesResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!rolesResponse.ok) {
      throw new Error(`Failed to fetch roles: ${rolesResponse.status}`);
    }

    const rolesData = await rolesResponse.json();
    const publicRole = rolesData.roles?.find(role => role.type === 'public');
    
    if (!publicRole) {
      throw new Error('Public role not found');
    }

    console.log(`   ✅ Found Public role (ID: ${publicRole.id})\n`);

    // Step 2: Get current permissions
    console.log('2️⃣ Fetching current permissions...');
    const permResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!permResponse.ok) {
      throw new Error(`Failed to fetch permissions: ${permResponse.status}`);
    }

    const permData = await permResponse.json();
    console.log(`   ✅ Current permissions retrieved\n`);

    // Step 3: Update permissions to include hero-section
    console.log('3️⃣ Updating permissions to enable hero-section access...');
    
    // Prepare permissions - enable find and findOne for hero-section
    const updatedPermissions = {
      ...permData.role,
      permissions: permData.role.permissions || {},
    };

    // Ensure permissions object exists
    if (!updatedPermissions.permissions['api::hero-section.hero-section']) {
      updatedPermissions.permissions['api::hero-section.hero-section'] = {};
    }

    // Enable find and findOne
    updatedPermissions.permissions['api::hero-section.hero-section'].controllers = {
      'hero-section': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' },
      }
    };

    // Update the role
    const updateResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPermissions),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error(`   ❌ Failed to update permissions: ${updateResponse.status}`);
      console.error(`   Error: ${errorText}`);
      
      // Try alternative approach - direct permission update
      console.log('\n   🔄 Trying alternative method...');
      const altUpdate = {
        ...updatedPermissions,
      };
      
      const altResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(altUpdate),
      });

      if (!altResponse.ok) {
        const altError = await altResponse.text();
        throw new Error(`Alternative method also failed: ${altError}`);
      }
    }

    console.log('   ✅ Permissions updated!\n');

    // Step 4: Verify it works
    console.log('4️⃣ Verifying public access...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds for Strapi to process
    
    const verifyResponse = await fetch(`${STRAPI_URL}/api/hero-section?publicationState=live`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (verifyResponse.ok) {
      console.log('   ✅ Public access now works!');
      console.log('\n🎉 SUCCESS! Hero Section is now publicly accessible.');
      console.log('\n📋 Next steps:');
      console.log('   1. Go to Strapi Admin → Content Manager → Hero Section');
      console.log('   2. Make sure your content is PUBLISHED (not just saved)');
      console.log('   3. The frontend should now display the changes!');
    } else {
      console.log(`   ⚠️  Still getting ${verifyResponse.status} - might need to restart Strapi or set permissions manually`);
      console.log('\n📋 Manual fix:');
      console.log('   1. Go to Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public');
      console.log('   2. Find "Hero Section" and enable "find" and "findOne"');
      console.log('   3. Save');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n📋 Manual fix required:');
    console.log('   1. Go to https://admin.districtflowers.com/admin');
    console.log('   2. Settings → Users & Permissions Plugin → Roles → Public');
    console.log('   3. Find "Hero Section" in the permissions list');
    console.log('   4. Enable:');
    console.log('      ✅ find');
    console.log('      ✅ findOne');
    console.log('   5. Click Save');
  }
}

fixPermissions().catch(console.error);

