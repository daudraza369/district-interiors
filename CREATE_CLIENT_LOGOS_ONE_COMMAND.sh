#!/bin/bash
# ONE COMMAND to create Client Logos content type - Copy and paste everything below
CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}') && docker exec $CONTAINER_ID mkdir -p /opt/app/src/components/client-logo-item && docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/components/client-logo-item/schema.json << "EOF"
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
EOF' && docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/client-logos/content-types/client-logos && docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << "EOF"
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
EOF' && docker restart $CONTAINER_ID && echo "✅ Done! Wait 30 seconds then run: node populate-client-logos.js"


