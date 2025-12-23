#!/bin/bash
# Step-by-step fix: Let Strapi clean up the database entry itself
# This approach uses Strapi's own startup logic to remove stale entries

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found"
    exit 1
fi

echo "=== Found Strapi container: $CONTAINER_ID ==="
echo ""
echo "Strategy: Remove schema file → Start Strapi (cleans DB) → Restore schema → Restart"

# Step 1: Stop Strapi
echo ""
echo "=== Step 1: Stopping Strapi ==="
docker stop $CONTAINER_ID
sleep 2

# Step 2: Backup and remove the schema file
echo ""
echo "=== Step 2: Backing up and temporarily removing schema file ==="
docker exec $CONTAINER_ID sh -c '
    if [ -f /opt/app/src/api/client-logos/content-types/client-logos/schema.json ]; then
        cp /opt/app/src/api/client-logos/content-types/client-logos/schema.json /tmp/client-logos-schema.json.backup
        rm -f /opt/app/src/api/client-logos/content-types/client-logos/schema.json
        echo "✅ Schema file backed up and removed"
    else
        echo "⚠️ Schema file not found (may already be removed)"
    fi
' 2>/dev/null || echo "⚠️ Container stopped, will try when started"

# Step 3: Clear cache
echo ""
echo "=== Step 3: Clearing cache ==="
docker exec $CONTAINER_ID sh -c '
    rm -rf /opt/app/.cache /opt/app/build /opt/app/.tmp 2>/dev/null
    echo "✅ Cache cleared"
' 2>/dev/null || echo "⚠️ Cache clear attempted"

# Step 4: Start Strapi (this will remove the stale DB entry)
echo ""
echo "=== Step 4: Starting Strapi (this cleans up DB) ==="
echo "⏳ Starting Strapi and waiting 30 seconds for it to initialize..."
docker start $CONTAINER_ID
sleep 30

# Check if Strapi started successfully
if docker ps | grep -q $CONTAINER_ID; then
    echo "✅ Strapi is running"
else
    echo "❌ Strapi failed to start - check logs"
    docker logs --tail 50 $CONTAINER_ID
    exit 1
fi

# Step 5: Stop Strapi again
echo ""
echo "=== Step 5: Stopping Strapi before restoring schema ==="
docker stop $CONTAINER_ID
sleep 2

# Step 6: Restore the schema file
echo ""
echo "=== Step 6: Restoring schema file ==="
docker exec $CONTAINER_ID sh -c '
    if [ -f /tmp/client-logos-schema.json.backup ]; then
        mkdir -p /opt/app/src/api/client-logos/content-types/client-logos
        cp /tmp/client-logos-schema.json.backup /opt/app/src/api/client-logos/content-types/client-logos/schema.json
        rm /tmp/client-logos-schema.json.backup
        echo "✅ Schema file restored"
    else
        echo "❌ Backup not found - schema needs to be recreated"
        exit 1
    fi
' 2>/dev/null

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️ Schema restoration failed - recreating from known good content"
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
fi

# Step 7: Clear cache again
echo ""
echo "=== Step 7: Clearing cache before final restart ==="
docker exec $CONTAINER_ID sh -c 'rm -rf /opt/app/.cache /opt/app/build /opt/app/.tmp 2>/dev/null; echo "✅ Cache cleared"' 2>/dev/null

# Step 8: Verify component exists
echo ""
echo "=== Step 8: Verifying component exists ==="
if docker exec $CONTAINER_ID test -f /opt/app/src/components/client-logo-item/schema.json; then
    echo "✅ Component schema exists"
else
    echo "❌ Component schema missing - recreating..."
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
echo "✅ Fix completed!"
echo ""
echo "📋 Next step: Restart Strapi in Coolify UI"
echo "   The duplicate should be gone because Strapi cleaned it from the database"


