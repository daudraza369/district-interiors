#!/bin/bash
# Run this script ON YOUR SERVER (via SSH)
# This will add fields to Hero Section by modifying the Strapi schema file

CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found!"
    exit 1
fi

echo "📦 Found Strapi container: $CONTAINER_ID"
echo "🚀 Adding fields to Hero Section..."

# Create the schema JSON
docker exec $CONTAINER_ID sh -c 'cat > /tmp/hero-schema.json << "EOF"
{
  "kind": "singleType",
  "collectionName": "hero_sections",
  "info": {
    "singularName": "hero-section",
    "pluralName": "hero-sections",
    "displayName": "Hero Section"
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
    "description": {
      "type": "text"
    },
    "primaryButtonText": {
      "type": "string"
    },
    "primaryButtonAction": {
      "type": "enumeration",
      "enum": ["scroll", "link"],
      "default": "scroll"
    },
    "primaryButtonLink": {
      "type": "string"
    },
    "primaryButtonScrollTarget": {
      "type": "string",
      "default": "portfolio"
    },
    "secondaryButtonText": {
      "type": "string"
    },
    "secondaryButtonAction": {
      "type": "enumeration",
      "enum": ["scroll", "link"],
      "default": "scroll"
    },
    "secondaryButtonLink": {
      "type": "string"
    },
    "secondaryButtonScrollTarget": {
      "type": "string",
      "default": "contact"
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "heroImage": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images", "videos"]
    },
    "beforeImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "afterImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    }
  }
}
EOF'

# The schema file location in Strapi
SCHEMA_FILE="/opt/app/src/api/hero-section/content-types/hero-section/schema.json"

# Check if directory exists, create if not
docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/hero-section/content-types/hero-section

# Copy the schema file
docker exec $CONTAINER_ID cp /tmp/hero-schema.json $SCHEMA_FILE

echo "✅ Schema file created at: $SCHEMA_FILE"
echo "🔄 Restart Strapi container for changes to take effect:"
echo "   docker restart $CONTAINER_ID"
echo ""
echo "Or restart via Coolify dashboard"



