/**
 * Populate Hero Section in Strapi via API
 * Run with: node populate-hero-section.js
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';

const heroSectionData = {
  data: {
    title: 'Where Design Takes Root',
    subtitle: 'Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.',
    description: 'District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.',
    primaryButtonText: 'Explore Our Work',
    primaryButtonAction: 'scroll',
    primaryButtonScrollTarget: 'portfolio',
    secondaryButtonText: 'Request a Consultation',
    secondaryButtonAction: 'scroll',
    secondaryButtonScrollTarget: 'contact',
  }
};

async function populateHeroSection() {
  try {
    console.log('🚀 Starting Hero Section population...');
    console.log(`📡 Connecting to: ${STRAPI_URL}`);

    // For Strapi v5 single types, we need to check if it exists first
    let checkResponse;
    try {
      checkResponse = await fetch(`${STRAPI_URL}/api/hero-section`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.log('⚠️  Could not check existing data, proceeding to create...');
    }

    // For single types in Strapi v5, use PUT to create/update
    console.log('📝 Creating/updating hero section...');
    const response = await fetch(`${STRAPI_URL}/api/hero-section`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(heroSectionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', response.status, response.statusText);
      console.error('Error details:', errorText);
      throw new Error(`Failed to populate hero section: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Hero Section populated successfully!');
    console.log('📄 Result:', JSON.stringify(result, null, 2));

    // Publish the content (for single types, publish is done via PUT with publicationState)
    console.log('📢 Publishing hero section...');
    const publishData = {
      ...heroSectionData,
      data: {
        ...heroSectionData.data,
        publishedAt: new Date().toISOString(),
      }
    };
    const publishResponse = await fetch(`${STRAPI_URL}/api/hero-section?publicationState=live`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publishData),
    });

    if (publishResponse.ok) {
      console.log('✅ Hero Section published!');
    } else {
      console.log('⚠️  Could not auto-publish. Please publish manually in Strapi admin.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateHeroSection();

