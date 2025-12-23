#!/bin/bash
# COMPREHENSIVE FIX - Find and delete ALL duplicates

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

echo "=== Step 1: Find ALL client-logos related files ==="
docker exec $CONTAINER_ID find /opt/app/src -name "*client*logo*" -type f 2>/dev/null
docker exec $CONTAINER_ID find /opt/app/src -name "*client*logo*" -type d 2>/dev/null

echo ""
echo "=== Step 2: List ALL api directories to see structure ==="
docker exec $CONTAINER_ID ls -la /opt/app/src/api/ 2>/dev/null

echo ""
echo "=== Step 3: Delete EVERYTHING related to client-logos ==="
docker exec $CONTAINER_ID sh -c '
  # Delete all directories
  rm -rf /opt/app/src/api/client-logos
  rm -rf /opt/app/src/api/client_logos
  # Delete all files in api that match
  find /opt/app/src/api -type f -name "*client*logo*" -delete 2>/dev/null
  find /opt/app/src/api -type d -name "*client*logo*" -exec rm -rf {} + 2>/dev/null
  # Clear caches
  rm -rf /opt/app/.cache
  rm -rf /opt/app/build
  echo "✅ Deleted all client-logos files and directories"
'

echo ""
echo "=== Step 4: Verify everything is deleted ==="
docker exec $CONTAINER_ID find /opt/app/src -name "*client*logo*" 2>/dev/null | wc -l
echo "items found (should be 0)"

echo ""
echo "=== Step 5: Recreate schema ONCE ==="
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
echo "=== Step 6: Verify only ONE exists ==="
docker exec $CONTAINER_ID find /opt/app/src/api -name "*client*logo*" -type f
docker exec $CONTAINER_ID find /opt/app/src/api -name "*client*logo*" -type d

echo ""
echo "✅ Done. Restart Strapi in Coolify UI"


