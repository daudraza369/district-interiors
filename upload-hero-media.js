/**
 * Upload hero images to Strapi and update hero section
 */

const STRAPI_URL = 'https://admin.districtflowers.com';
const API_TOKEN = '96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b';
const fs = require('fs');
const path = require('path');

async function uploadImage(imagePath, filename) {
  try {
    console.log(`📤 Uploading ${filename}...`);
    
    const fileContent = fs.readFileSync(imagePath);
    const formData = new FormData();
    const blob = new Blob([fileContent]);
    formData.append('files', blob, filename);
    formData.append('fileInfo', JSON.stringify({ alternativeText: filename.replace('.jpg', '').replace(/-/g, ' ') }));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to upload ${filename}:`, errorText);
      return null;
    }

    const result = await response.json();
    console.log(`✅ Uploaded ${filename}, ID: ${result[0].id}`);
    return result[0];
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function updateHeroWithImages() {
  try {
    console.log('🚀 Starting media upload...\n');

    // Upload hero-interior.jpg as background and hero image
    const heroImagePath = path.join(__dirname, 'apps/web/public/hero-interior.jpg');
    
    if (!fs.existsSync(heroImagePath)) {
      console.log('⚠️  hero-interior.jpg not found. Please upload images manually in Strapi admin.');
      console.log('Go to Media Library → Upload files');
      console.log('Then update hero section with the uploaded images.');
      return;
    }

    const uploadedImage = await uploadImage(heroImagePath, 'hero-interior.jpg');

    if (uploadedImage) {
      // Update hero section with the image
      const updateData = {
        data: {
          backgroundImage: uploadedImage.id,
          heroImage: [uploadedImage.id],
          beforeImage: uploadedImage.id,
          afterImage: uploadedImage.id,
        }
      };

      const updateResponse = await fetch(`${STRAPI_URL}/api/hero-section`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (updateResponse.ok) {
        console.log('\n✅ Hero section updated with images!');
      } else {
        const errorText = await updateResponse.text();
        console.error('❌ Failed to update hero section:', errorText);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Note: This requires Node.js 18+ with fetch and FormData support
if (typeof fetch === 'undefined' || typeof FormData === 'undefined') {
  console.log('⚠️  This script requires Node.js 18+ with native fetch support.');
  console.log('Or install: npm install form-data node-fetch');
  console.log('\nAlternative: Upload images manually in Strapi admin:');
  console.log('1. Go to Media Library → Upload files');
  console.log('2. Upload hero-interior.jpg');
  console.log('3. Go to Content Manager → Hero Section');
  console.log('4. Select the uploaded image for backgroundImage, heroImage, beforeImage, afterImage');
}

updateHeroWithImages();



