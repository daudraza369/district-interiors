#!/bin/bash
# Fix duplicate client-logos schema error

echo "=== Step 1: Stop the container (to break restart loop) ==="
CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')
if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No Strapi container found!"
    exit 1
fi
echo "Found container: $CONTAINER_ID"
docker stop $CONTAINER_ID
sleep 2

echo ""
echo "=== Step 2: Remove duplicate/incomplete schema ==="
docker exec $CONTAINER_ID rm -rf /opt/app/src/api/client-logos 2>/dev/null
echo "✅ Removed old schema"

echo ""
echo "=== Step 3: Verify component schema exists ==="
if docker exec $CONTAINER_ID test -f /opt/app/src/components/client-logo-item/schema.json; then
    echo "✅ Component schema exists"
else
    echo "⚠️  Creating component schema..."
    docker exec $CONTAINER_ID mkdir -p /opt/app/src/components/client-logo-item
    docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/components/client-logo-item/schema.json << "EOFJSON"
{
  "collectionName": "components_client_logo_items",
  "info": {
    "displayName": "Client Logo Item",
    "description": "A client logo with name and optional website"
  },
  "options": {},
  "attributes": {
    "clientName": {"type": "string", "required": true},
    "logo": {"type": "media", "multiple": false, "required": true, "allowedTypes": ["images"]},
    "websiteUrl": {"type": "string", "required": false},
    "displayOrder": {"type": "integer", "default": 0, "required": false}
  }
}
EOFJSON'
fi

echo ""
echo "=== Step 4: Create single type schema (clean, single creation) ==="
docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/client-logos/content-types/client-logos
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << "EOFJSON"
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
    "title": {"type": "string", "required": true, "default": "Trusted By Leading Brands"},
    "subtitle": {"type": "text", "required": false},
    "showRow1": {"type": "boolean", "default": true, "required": false},
    "showRow2": {"type": "boolean", "default": true, "required": false},
    "row1Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"},
    "row2Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"}
  }
}
EOFJSON'
echo "✅ Schema created"

echo ""
echo "=== Step 5: Verify only one schema exists ==="
docker exec $CONTAINER_ID find /opt/app/src/api -path "*/client-logos/*" -name "schema.json" | wc -l
echo "schema files found (should be 1)"

echo ""
echo "=== Step 6: Start Strapi ==="
docker start $CONTAINER_ID
echo "✅ Container started. Wait 2 minutes for Strapi to initialize, then check logs:"
echo "   docker logs $CONTAINER_ID --tail 50"


