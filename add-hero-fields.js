/**
 * Add fields to Hero Section content type via API
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

const fieldsToAdd = {
  components: {},
  contentType: {
    uid: 'api::hero-section.hero-section',
    apiID: 'hero-section',
    schema: {
      displayName: 'Hero Section',
      singularName: 'hero-section',
      pluralName: 'hero-sections',
      draftAndPublish: true,
      kind: 'singleType',
      attributes: {
        title: {
          type: 'string',
          required: true,
        },
        subtitle: {
          type: 'text',
        },
        description: {
          type: 'text',
        },
        primaryButtonText: {
          type: 'string',
        },
        primaryButtonAction: {
          type: 'enumeration',
          enum: ['scroll', 'link'],
          default: 'scroll',
        },
        primaryButtonLink: {
          type: 'string',
        },
        primaryButtonScrollTarget: {
          type: 'string',
          default: 'portfolio',
        },
        secondaryButtonText: {
          type: 'string',
        },
        secondaryButtonAction: {
          type: 'enumeration',
          enum: ['scroll', 'link'],
          default: 'scroll',
        },
        secondaryButtonLink: {
          type: 'string',
        },
        secondaryButtonScrollTarget: {
          type: 'string',
          default: 'contact',
        },
        backgroundImage: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['images'],
        },
        heroImage: {
          type: 'media',
          multiple: true,
          required: false,
          allowedTypes: ['images', 'videos'],
        },
        beforeImage: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['images'],
        },
        afterImage: {
          type: 'media',
          multiple: false,
          required: false,
          allowedTypes: ['images'],
        },
      },
    },
  },
};

async function addFields() {
  try {
    console.log('🚀 Adding fields to Hero Section content type...\n');

    const response = await fetch(`${STRAPI_URL}/api/content-type-builder/content-types/api::hero-section.hero-section`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldsToAdd),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      
      // Try alternative endpoint
      console.log('\n🔄 Trying alternative endpoint...');
      const altResponse = await fetch(`${STRAPI_URL}/content-type-builder/content-types/api::hero-section.hero-section`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fieldsToAdd),
      });
      
      console.log(`Alt Status: ${altResponse.status} ${altResponse.statusText}`);
      const altText = await altResponse.text();
      console.log('Alt Response:', altText);
    } else {
      const result = await response.json();
      console.log('✅ Fields added successfully!');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Exception:', error.message);
  }
}

addFields();



