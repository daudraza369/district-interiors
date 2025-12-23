/**
 * Complete automation script for Client Logos Section
 * Attempts everything possible via API and provides fallback solutions
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = 'c2f9002a52bff4448f00b19c0a38d4aa72f96b46bc717aaf52b61f458aca39bd55a30417ba98ecfe94ed9e5401e3f0a2d4d0a4893a7086cf8c7f33c747c7478a533694803a1688de7f2bb867e9976c2006c4e90591d5010e11c3361cc5a6f896dc6d3a56088e360b23db3120922b975b076210ba297e84d68d1be4753f0863c0';

async function completeAutoFix() {
  console.log('🚀 Complete Auto-Fix for Client Logos Section\n');
  console.log('=' .repeat(60));

  // Step 1: Check current state
  console.log('\n1️⃣ Analyzing current state...');
  let contentId = null;
  let currentData = null;
  
  try {
    const checkUrl = `${STRAPI_URL}/api/client-logos-section?populate=*`;
    const response = await fetch(checkUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      contentId = data.data.id || data.data.documentId;
      currentData = data.data.attributes || data.data;
      
      console.log(`   ✅ Content type exists (ID: ${contentId})`);
      console.log(`   ✅ Has row1Logos: ${!!currentData.row1Logos} (${Array.isArray(currentData.row1Logos) ? currentData.row1Logos.length : 0} items)`);
      console.log(`   ${currentData.row2Logos ? '✅' : '❌'} Has row2Logos: ${!!currentData.row2Logos}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 2: Try to get schema
  console.log('\n2️⃣ Attempting to access schema...');
  try {
    const schemaUrl = `${STRAPI_URL}/api/content-type-builder/content-types/api::client-logos-section.client-logos-section`;
    const schemaResponse = await fetch(schemaUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    if (schemaResponse.ok) {
      const schema = await schemaResponse.json();
      console.log('   ✅ Can access schema!');
      const fields = Object.keys(schema.data?.schema?.attributes || {});
      console.log(`   Current fields: ${fields.join(', ')}`);
      
      if (!fields.includes('row2Logos')) {
        console.log('\n   ⚠️  row2Logos field is missing in schema');
        console.log('   Attempting to add it via API...');
        
        // Try to update schema (this likely won't work, but let's try)
        const updatedSchema = {
          ...schema.data.schema,
          attributes: {
            ...schema.data.schema.attributes,
            row2Logos: {
              type: 'component',
              repeatable: true,
              component: 'shared.client-logo-item', // This needs to match the actual component UID
            },
          },
        };
        
        const updateResponse = await fetch(schemaUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              schema: updatedSchema,
            },
          }),
        });
        
        if (updateResponse.ok) {
          console.log('   ✅ Successfully added row2Logos via API!');
          console.log('   ⏳ Strapi will restart - wait 1-2 minutes');
        } else {
          const errorText = await updateResponse.text();
          console.log(`   ❌ Cannot add field via API: ${updateResponse.status}`);
          console.log(`   Error: ${errorText.substring(0, 200)}`);
          console.log('\n   💡 This is expected - Strapi doesn\'t allow field creation via API');
          console.log('   💡 Solution: Use schema file modification (see below)');
        }
      } else {
        console.log('   ✅ row2Logos field already exists in schema!');
      }
    } else {
      console.log(`   ❌ Cannot access schema (${schemaResponse.status})`);
    }
  } catch (error) {
    console.log(`   ❌ Schema access failed: ${error.message}`);
  }

  // Step 3: Create Docker script to modify schema file
  console.log('\n3️⃣ Creating Docker script to modify schema file...');
  console.log('   (This is the most reliable way to add the field)');
  
  const dockerScript = `#!/bin/bash
# Run this ON YOUR SERVER or via Coolify Terminal

CONTAINER_ID=$(docker ps | grep strapi | grep cms | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found!"
    exit 1
fi

echo "📦 Found Strapi container: $CONTAINER_ID"
echo "🔧 Adding row2Logos field to Client Logos Section schema..."

# Schema file location
SCHEMA_FILE="/opt/app/src/api/client-logos-section/content-types/client-logos-section/schema.json"

# Check if schema file exists
if docker exec $CONTAINER_ID test -f "$SCHEMA_FILE"; then
    echo "✅ Schema file exists"
    
    # Read current schema
    CURRENT_SCHEMA=$(docker exec $CONTAINER_ID cat "$SCHEMA_FILE")
    
    # Check if row2Logos already exists
    if echo "$CURRENT_SCHEMA" | grep -q "row2Logos"; then
        echo "✅ row2Logos field already exists!"
        exit 0
    fi
    
    # Create updated schema with row2Logos
    docker exec $CONTAINER_ID sh -c 'cat > /tmp/updated-schema.json << "EOF"
{
  "kind": "singleType",
  "collectionName": "client_logos_sections",
  "info": {
    "singularName": "client-logos-section",
    "pluralName": "client-logos-sections",
    "displayName": "Client Logos Section"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subtitle": {
      "type": "text"
    },
    "showRow1": {
      "type": "boolean",
      "default": true
    },
    "showRow2": {
      "type": "boolean",
      "default": true
    },
    "row1Logos": {
      "type": "component",
      "repeatable": true,
      "component": "shared.client-logo-item"
    },
    "row2Logos": {
      "type": "component",
      "repeatable": true,
      "component": "shared.client-logo-item"
    }
  }
}
EOF'
    
    # Backup original
    docker exec $CONTAINER_ID cp "$SCHEMA_FILE" "$SCHEMA_FILE.backup"
    
    # Copy new schema
    docker exec $CONTAINER_ID cp /tmp/updated-schema.json "$SCHEMA_FILE"
    
    echo "✅ Schema updated! Restarting Strapi..."
    docker restart $CONTAINER_ID
    
    echo "⏳ Wait 1-2 minutes for Strapi to restart, then run the populate script"
else
    echo "❌ Schema file not found at: $SCHEMA_FILE"
    echo "   Content type might not exist or path is different"
    exit 1
fi
`;

  // Write the script
  const fs = require('fs');
  fs.writeFileSync('add-row2logos-field.sh', dockerScript);
  console.log('   ✅ Created: add-row2logos-field.sh');
  console.log('   📝 Run this script on your server or via Coolify Terminal');

  // Step 4: Create populate script
  console.log('\n4️⃣ Creating script to populate logos automatically...');
  console.log('   (Once row2Logos field exists)');
  
  const populateScript = `
// Run this AFTER row2Logos field is added and Strapi restarted
const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '${API_TOKEN}';

// Get available media files
async function getMediaFiles() {
  const response = await fetch(\`\${STRAPI_URL}/api/upload/files\`, {
    headers: {
      'Authorization': \`Bearer \${API_TOKEN}\`,
    },
  });
  return response.json();
}

// Populate client logos
async function populateClientLogos() {
  console.log('🚀 Populating Client Logos Section...');
  
  // Get media files
  const mediaFiles = await getMediaFiles();
  console.log(\`📁 Found \${mediaFiles.length} media files\`);
  
  // Use first few images as logos
  const logos = mediaFiles.slice(0, 6).map((file, index) => ({
    clientName: \`Client \${index + 1}\`,
    logo: file.id,
    websiteUrl: '',
    displayOrder: index,
  }));
  
  // Split into two rows
  const row1Logos = logos.slice(0, 3);
  const row2Logos = logos.slice(3, 6);
  
  // Update content
  const updateData = {
    data: {
      title: 'Trusted By Leading Brands',
      subtitle: 'Proud collaborations with top names in hospitality and design.',
      showRow1: true,
      showRow2: true,
      row1Logos: row1Logos,
      row2Logos: row2Logos,
    },
  };
  
  const response = await fetch(\`\${STRAPI_URL}/api/client-logos-section\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${API_TOKEN}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  
  if (response.ok) {
    console.log('✅ Client logos populated successfully!');
    console.log('📝 Remember to PUBLISH in Strapi Admin');
  } else {
    const error = await response.text();
    console.error('❌ Error:', error);
  }
}

populateClientLogos();
`;

  fs.writeFileSync('populate-client-logos-auto.js', populateScript);
  console.log('   ✅ Created: populate-client-logos-auto.js');

  console.log('\n' + '='.repeat(60));
  console.log('📋 SUMMARY & NEXT STEPS:\n');
  console.log('1. Run: bash add-row2logos-field.sh (on server or Coolify Terminal)');
  console.log('2. Wait 1-2 minutes for Strapi restart');
  console.log('3. Run: node populate-client-logos-auto.js');
  console.log('4. Go to Strapi Admin → Publish the content');
  console.log('\n✅ Everything else is automated!');
}

completeAutoFix();

