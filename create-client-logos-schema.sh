#!/bin/bash
# Script to create Client Logos content type in Strapi
# Run this on your server where Strapi container is running

# Get the container ID
CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No Strapi container found!"
    exit 1
fi

echo "📦 Found Strapi container: $CONTAINER_ID"
echo "🔨 Creating Client Logo Item component..."

# Create component directory
docker exec $CONTAINER_ID mkdir -p /opt/app/src/components/client-logo-item

# Create component schema
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/components/client-logo-item/schema.json << "EOFFILE"
{
  "collectionName": "components_client_logo_items",
  "info": {
    "displayName": "Client Logo Item",
    "description": "A client logo with name and optional website"
  },
  "options": {},
  "attributes": {
    "clientName": {
      "type": "string",
      "required": true
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "websiteUrl": {
      "type": "string",
      "required": false
    },
    "displayOrder": {
      "type": "integer",
      "default": 0,
      "required": false
    }
  }
}
EOFFILE'

echo "✅ Component schema created"
echo "🔨 Creating Client Logos single type..."

# Create single type directory
docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/client-logos/content-types/client-logos

# Create single type schema
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << "EOFFILE"
{
  "kind": "singleType",
  "collectionName": "client_logos",
  "info": {
    "singularName": "client-logos",
    "pluralName": "client-logos",
    "displayName": "Client Logos Section"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "default": "Trusted By Leading Brands"
    },
    "subtitle": {
      "type": "text",
      "required": false
    },
    "showRow1": {
      "type": "boolean",
      "default": true,
      "required": false
    },
    "showRow2": {
      "type": "boolean",
      "default": true,
      "required": false
    },
    "row1Logos": {
      "type": "component",
      "repeatable": true,
      "component": "client-logo-item.client-logo-item"
    },
    "row2Logos": {
      "type": "component",
      "repeatable": true,
      "component": "client-logo-item.client-logo-item"
    }
  }
}
EOFFILE'

echo "✅ Single type schema created"
echo "🔄 Restarting Strapi container to load new content type..."

# Restart Strapi container to load new content type
docker restart $CONTAINER_ID

echo ""
echo "✅ Done! Strapi is restarting..."
echo "⏳ Wait for Strapi to fully start (about 30-60 seconds), then run:"
echo "   node populate-client-logos.js"


