#!/bin/bash
# Run this ON YOUR SERVER or via Coolify Terminal
# This will add the missing row2Logos field to Client Logos Section

CONTAINER_ID=$(docker ps | grep strapi | grep cms | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found!"
    echo "💡 Try: docker ps | grep strapi"
    exit 1
fi

echo "📦 Found Strapi container: $CONTAINER_ID"
echo "🔧 Adding row2Logos field to Client Logos Section schema..."

# Schema file location (Strapi v5 path)
SCHEMA_FILE="/opt/app/src/api/client-logos-section/content-types/client-logos-section/schema.json"

# Check if schema file exists
if docker exec $CONTAINER_ID test -f "$SCHEMA_FILE"; then
    echo "✅ Schema file exists at: $SCHEMA_FILE"
    
    # Check if row2Logos already exists
    if docker exec $CONTAINER_ID grep -q "row2Logos" "$SCHEMA_FILE"; then
        echo "✅ row2Logos field already exists in schema!"
        exit 0
    fi
    
    echo "📝 Reading current schema..."
    CURRENT_SCHEMA=$(docker exec $CONTAINER_ID cat "$SCHEMA_FILE")
    
    # Create updated schema with row2Logos added
    docker exec $CONTAINER_ID sh -c 'cat > /tmp/updated-client-logos-schema.json << "EOFJSON"
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
EOFJSON'
    
    # Backup original
    echo "💾 Creating backup..."
    docker exec $CONTAINER_ID cp "$SCHEMA_FILE" "$SCHEMA_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Copy new schema
    echo "📝 Updating schema file..."
    docker exec $CONTAINER_ID cp /tmp/updated-client-logos-schema.json "$SCHEMA_FILE"
    
    echo "✅ Schema updated successfully!"
    echo "🔄 Restarting Strapi container..."
    docker restart $CONTAINER_ID
    
    echo ""
    echo "⏳ Wait 1-2 minutes for Strapi to restart"
    echo "✅ Then run: node populate-client-logos-auto.js"
else
    echo "❌ Schema file not found at: $SCHEMA_FILE"
    echo ""
    echo "🔍 Let me search for the correct path..."
    docker exec $CONTAINER_ID find /opt/app -name "*client-logos*" -type f 2>/dev/null | head -10
    echo ""
    echo "💡 If you see a different path, update SCHEMA_FILE variable in this script"
    exit 1
fi

