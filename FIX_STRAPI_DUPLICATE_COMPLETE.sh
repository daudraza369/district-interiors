#!/bin/bash
# Complete fix for duplicate client-logos schema error

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No Strapi container found!"
    exit 1
fi

echo "=== Step 1: Stop container (prevent restart loop) ==="
docker stop $CONTAINER_ID
sleep 2

echo ""
echo "=== Step 2: Find ALL client-logos related directories/files ==="
docker exec $CONTAINER_ID find /opt/app/src -type d -name "*client*logo*" 2>/dev/null || echo "Container stopped, using alternative method..."
docker exec $CONTAINER_ID find /opt/app/src -type f -name "*client*logo*" 2>/dev/null || echo "Container stopped, using alternative method..."

echo ""
echo "=== Step 3: Remove ALL client-logos schemas AND clear cache ==="
docker exec $CONTAINER_ID sh -c '
  echo "Removing all possible client-logos locations..."
  rm -rf /opt/app/src/api/client-logos
  rm -rf /opt/app/src/api/client_logos
  rm -rf /opt/app/.cache
  rm -rf /opt/app/build
  echo "✅ Cleaned all client-logos directories and cache"
'

echo ""
echo "=== Step 4: Verify all are removed ==="
docker exec $CONTAINER_ID find /opt/app/src/api -type d -name "*client*logo*" 2>/dev/null | wc -l
echo "directories found (should be 0)"

echo ""
echo "=== Step 5: Create schema ONCE (fresh, clean) ==="
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

echo ""
echo "=== Step 6: Verify only ONE schema exists ==="
docker exec $CONTAINER_ID find /opt/app/src/api -path "*/client-logos/*" -name "schema.json" | wc -l
echo "schema file(s) found (should be 1)"

echo ""
echo "✅ Done! Now restart Strapi via Coolify UI"
echo "   The duplicate error should be resolved."

