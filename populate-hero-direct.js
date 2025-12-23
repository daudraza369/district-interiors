/**
 * Populate Hero Section - Direct API approach
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '497ed3f9b308f1aa478862578e2276377486270c940b18292c311a8243528453b5f11f1b7224f2c022813977c83a0e5062d9eed4a18733d63d311ce2bcbc7fd34c34e1960405c2abdf40aa7b5c684ed68b11502047cbf97c2adf492db115b8c9704e76f1b3f33c04d27ae39d1c79330d55bb48c8a28037408f5b82b10b1a209d';

const heroData = {
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

async function populateHero() {
  console.log('🚀 Populating Hero Section...\n');

  // Try different endpoint formats for Strapi v5
  const endpoints = [
    '/api/hero-section',
    '/api/hero-sections', // plural
    '/content-manager/single-types/hero-section',
  ];

  for (const endpoint of endpoints) {
    console.log(`Trying: ${STRAPI_URL}${endpoint}`);
    
    try {
      // Try PUT first (for single types)
      const putResponse = await fetch(`${STRAPI_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      console.log(`  PUT Status: ${putResponse.status} ${putResponse.statusText}`);
      
      if (putResponse.ok) {
        const result = await putResponse.json();
        console.log('✅ SUCCESS! Hero section populated.');
        console.log('Result:', JSON.stringify(result, null, 2));
        return;
      } else {
        const errorText = await putResponse.text();
        console.log(`  Error: ${errorText.substring(0, 200)}`);
      }

      // Try POST as fallback
      const postResponse = await fetch(`${STRAPI_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      console.log(`  POST Status: ${postResponse.status} ${postResponse.statusText}`);
      
      if (postResponse.ok) {
        const result = await postResponse.json();
        console.log('✅ SUCCESS! Hero section populated.');
        console.log('Result:', JSON.stringify(result, null, 2));
        return;
      } else {
        const errorText = await postResponse.text();
        console.log(`  Error: ${errorText.substring(0, 200)}`);
      }
    } catch (error) {
      console.log(`  Exception: ${error.message}`);
    }
    
    console.log('');
  }

  console.log('❌ All endpoints failed. Please check:');
  console.log('1. Content type "hero-section" exists in Strapi');
  console.log('2. API token has permissions to create/update hero-section');
  console.log('3. Go to Settings → Users & Permissions → Roles → Authenticated');
  console.log('   Enable "create", "update" for Hero Section');
}

populateHero();



