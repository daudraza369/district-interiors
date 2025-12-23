#!/bin/bash
# Fix: Change pluralName to avoid duplicate conflict
# This is a workaround - we'll use "client-logos-section" instead of "client-logos"

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

# Stop Strapi
docker stop $CONTAINER_ID
sleep 2

# Update the schema with a new pluralName
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << "EOFJSON"
{
  "kind": "singleType",
  "collectionName": "client_logos_section",
  "info": {
    "singularName": "client-logos-section",
    "pluralName": "client-logos-section",
    "displayName": "Client Logos Section"
  },
  "options": {"draftAndPublish": true},
  "attributes": {
    "title": {"type": "string", "required": true, "default": "Trusted By Leading Brands"},
    "subtitle": {"type": "text", "required": false},
    "showRow1": {"type": "boolean", "default": true, "required": false},
    "showRow2": {"type": "boolean", "default": true, "required": false},
    "row1Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"},
    "row2Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"}
  }
}
EOFJSON'

# Clear cache
docker exec $CONTAINER_ID sh -c 'rm -rf /opt/app/.cache /opt/app/build /opt/app/.tmp 2>/dev/null'

echo ""
echo "✅ Schema updated with new pluralName: 'client-logos-section'"
echo ""
echo "⚠️ IMPORTANT: You'll need to update the frontend code to use:"
echo "   /api/client-logos-section  (instead of /api/client-logos)"
echo ""
echo "Now restart Strapi in Coolify UI"


