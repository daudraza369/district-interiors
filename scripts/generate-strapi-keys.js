#!/usr/bin/env node

/**
 * Generate secure random keys for Strapi .env file
 * Usage: node scripts/generate-strapi-keys.js
 */

const crypto = require('crypto');

function generateKey() {
  return crypto.randomBytes(32).toString('base64');
}

console.log('\n🔐 Strapi Environment Keys Generator\n');
console.log('Copy these values to your .env file:\n');
console.log('APP_KEYS=' + [
  generateKey(),
  generateKey(),
  generateKey(),
  generateKey()
].join(','));
console.log('API_TOKEN_SALT=' + generateKey());
console.log('ADMIN_JWT_SECRET=' + generateKey());
console.log('TRANSFER_TOKEN_SALT=' + generateKey());
console.log('JWT_SECRET=' + generateKey());
console.log('\n✅ Done! Copy these to your Strapi .env file.\n');

