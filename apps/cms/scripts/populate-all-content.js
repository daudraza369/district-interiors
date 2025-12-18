/**
 * Master script to populate ALL Strapi content via API
 * Uses API token for authentication
 * 
 * Usage: 
 *   STRAPI_URL=https://your-strapi-url.com API_TOKEN=your-token node scripts/populate-all-content.js
 */

const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN || process.env.STRAPI_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ ERROR: API_TOKEN or STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Helper function to make API requests
async function strapiRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${STRAPI_URL}/api${endpoint}`,
      headers,
    };
    
    if (data) {
      config.data = { data };
    }
    
    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return { 
        success: false, 
        status: error.response.status,
        error: error.response.data 
      };
    }
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// 1. Populate Hero Section
async function populateHeroSection() {
  console.log('\n📝 Populating Hero Section...');
  
  const heroData = {
    title: 'Transform Your Space with Premium Interior Greenery',
    subtitle: 'Partnering with architects and designers to bring nature into luxury spaces',
    description: 'District Interiors helps architects, designers, and property developers create stunning interior environments with premium artificial and natural plants. From luxury villas to corporate offices, we deliver bespoke greenery solutions.',
    primaryButtonText: 'Explore Our Services',
    primaryButtonAction: 'link',
    primaryButtonLink: '/services',
    secondaryButtonText: 'View Portfolio',
    secondaryButtonAction: 'link',
    secondaryButtonLink: '/projects',
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/hero-section', heroData);
  if (result.success) {
    console.log('✅ Hero Section populated');
  } else {
    console.log(`⚠️  Hero Section: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 2. Populate Why Choose Us
async function populateWhyChooseUs() {
  console.log('\n📝 Populating Why Choose Us...');
  
  const whyChooseUsData = {
    title: 'Why Clients Choose District Interiors',
    subtitle: 'Trusted by leading companies for our flexibility, fast turnaround, and dependable delivery in office environments.',
    features: [
      {
        icon: 'leaf',
        title: 'Dual Expertise',
        description: 'Specialists in both natural and artificial greenery.',
        displayOrder: 0,
      },
      {
        icon: 'palette',
        title: 'Customization',
        description: 'Trees, planters, and layouts tailored to every project.',
        displayOrder: 1,
      },
      {
        icon: 'recycle',
        title: 'Sustainability',
        description: 'Eco-focused solutions and long-term maintenance.',
        displayOrder: 2,
      },
      {
        icon: 'award',
        title: 'Quality Assurance',
        description: 'Realistic greenery and reliable upkeep.',
        displayOrder: 3,
      },
      {
        icon: 'building2',
        title: 'Luxury Reach',
        description: 'Serving villas, hotels, and premium corporate projects.',
        displayOrder: 4,
      },
    ],
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/why-choose-us', whyChooseUsData);
  if (result.success) {
    console.log('✅ Why Choose Us populated');
  } else {
    console.log(`⚠️  Why Choose Us: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 3. Populate About Snapshot
async function populateAboutSnapshot() {
  console.log('\n📝 Populating About Snapshot...');
  
  const aboutData = {
    title: 'About District Interiors',
    subtitle: 'Your Trusted Partner in Interior Greenery',
    description: 'With years of experience in the luxury interior design space, District Interiors specializes in creating stunning botanical environments that enhance any space. We work closely with architects, designers, and property developers to deliver bespoke solutions.',
    imageUrl: null, // Will be set via admin panel
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/about-snapshot', aboutData);
  if (result.success) {
    console.log('✅ About Snapshot populated');
  } else {
    console.log(`⚠️  About Snapshot: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 4. Populate Stats Section
async function populateStatsSection() {
  console.log('\n📝 Populating Stats Section...');
  
  const statsData = {
    title: 'Our Impact',
    subtitle: 'Numbers that speak for themselves',
    stats: [
      {
        value: '500+',
        label: 'Projects Completed',
        displayOrder: 0,
      },
      {
        value: '200+',
        label: 'Happy Clients',
        displayOrder: 1,
      },
      {
        value: '15+',
        label: 'Years Experience',
        displayOrder: 2,
      },
      {
        value: '98%',
        label: 'Client Satisfaction',
        displayOrder: 3,
      },
    ],
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/stats-section', statsData);
  if (result.success) {
    console.log('✅ Stats Section populated');
  } else {
    console.log(`⚠️  Stats Section: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 5. Populate Services Section
async function populateServicesSection() {
  console.log('\n📝 Populating Services Section...');
  
  const servicesData = {
    title: 'Our Services',
    subtitle: 'Comprehensive interior greenery solutions',
    services: [
      {
        title: 'Interior Plant Design',
        description: 'Custom plant arrangements tailored to your space',
        displayOrder: 0,
      },
      {
        title: 'Maintenance Services',
        description: 'Regular care and upkeep for your greenery',
        displayOrder: 1,
      },
      {
        title: 'Consultation',
        description: 'Expert advice on plant selection and placement',
        displayOrder: 2,
      },
      {
        title: 'Installation',
        description: 'Professional installation of all greenery elements',
        displayOrder: 3,
      },
    ],
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/services-section', servicesData);
  if (result.success) {
    console.log('✅ Services Section populated');
  } else {
    console.log(`⚠️  Services Section: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 6. Populate Collection Preview
async function populateCollectionPreview() {
  console.log('\n📝 Populating Collection Preview...');
  
  const collectionData = {
    title: 'Our Collections',
    subtitle: 'Explore our curated selection of premium plants',
    collections: [
      {
        name: 'Luxury Trees',
        description: 'Premium artificial trees for grand spaces',
        slug: 'luxury-trees',
        displayOrder: 0,
      },
      {
        name: 'Office Plants',
        description: 'Low-maintenance plants for corporate environments',
        slug: 'office-plants',
        displayOrder: 1,
      },
      {
        name: 'Decorative Plants',
        description: 'Beautiful plants to enhance any interior',
        slug: 'decorative-plants',
        displayOrder: 2,
      },
    ],
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/collection-preview', collectionData);
  if (result.success) {
    console.log('✅ Collection Preview populated');
  } else {
    console.log(`⚠️  Collection Preview: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 7. Populate Dual CTA
async function populateDualCTA() {
  console.log('\n📝 Populating Dual CTA...');
  
  const dualCTAData = {
    primaryCTAText: 'Start Your Project',
    primaryCTALink: '/contact',
    secondaryCTAText: 'View Portfolio',
    secondaryCTALink: '/projects',
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/dual-cta', dualCTAData);
  if (result.success) {
    console.log('✅ Dual CTA populated');
  } else {
    console.log(`⚠️  Dual CTA: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// 8. Populate Client Logos
async function populateClientLogos() {
  console.log('\n📝 Populating Client Logos...');
  
  const clientLogosData = {
    title: 'Trusted By Leading Brands',
    subtitle: 'Proud collaborations with top names in hospitality and design.',
    row1Logos: [
      {
        clientName: 'PepsiCo',
        displayOrder: 0,
        placeholder: true,
      },
      {
        clientName: 'Marriott',
        displayOrder: 1,
        placeholder: true,
      },
      {
        clientName: 'Hilton',
        displayOrder: 2,
        placeholder: true,
      },
      {
        clientName: 'Four Seasons',
        displayOrder: 3,
        placeholder: true,
      },
      {
        clientName: 'Hyatt',
        displayOrder: 4,
        placeholder: true,
      },
    ],
    row2Logos: [
      {
        clientName: 'Google',
        displayOrder: 0,
        placeholder: true,
      },
      {
        clientName: 'Microsoft',
        displayOrder: 1,
        placeholder: true,
      },
      {
        clientName: 'Amazon',
        displayOrder: 2,
        placeholder: true,
      },
      {
        clientName: 'Apple',
        displayOrder: 3,
        placeholder: true,
      },
    ],
    showRow1: true,
    showRow2: true,
    publishedAt: new Date().toISOString(),
  };
  
  const result = await strapiRequest('PUT', '/client-logos', clientLogosData);
  if (result.success) {
    console.log('✅ Client Logos populated');
  } else {
    console.log(`⚠️  Client Logos: ${result.status || 'Error'} - ${JSON.stringify(result.error)}`);
  }
}

// Main function
async function main() {
  console.log('\n🚀 Starting Content Population...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 Using API Token: ${API_TOKEN.substring(0, 20)}...\n`);
  
  // Test connection first
  console.log('🔍 Testing connection...');
  const testResult = await strapiRequest('GET', '/hero-section');
  if (!testResult.success && testResult.status === 401) {
    console.error('❌ Authentication failed. Please check your API token.');
    process.exit(1);
  } else if (!testResult.success && testResult.status === 404) {
    console.log('⚠️  Some endpoints not found, but continuing...');
  } else if (testResult.success) {
    console.log('✅ Connection successful!\n');
  }
  
  // Populate all content
  await populateHeroSection();
  await populateWhyChooseUs();
  await populateAboutSnapshot();
  await populateStatsSection();
  await populateServicesSection();
  await populateCollectionPreview();
  await populateDualCTA();
  await populateClientLogos();
  
  console.log('\n✅ Content population complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to Strapi Admin Panel');
  console.log('2. Review and publish all content');
  console.log('3. Upload images for sections that need them');
  console.log('4. Verify content appears on frontend\n');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { main };
