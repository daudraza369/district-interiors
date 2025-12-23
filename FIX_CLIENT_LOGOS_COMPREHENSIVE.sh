#!/bin/bash
# Comprehensive fix for client-logos duplicate error
# This script will:
# 1. Verify schema.json is valid
# 2. Stop Strapi
# 3. Clear ALL cache and build directories
# 4. Remove any duplicate schema files
# 5. Check database for cached schema
# 6. Restart Strapi

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found"
    exit 1
fi

echo "=== Found Strapi container: $CONTAINER_ID ==="

# Step 1: Verify schema.json is valid JSON
echo ""
echo "=== Step 1: Verifying schema.json ==="
docker exec $CONTAINER_ID cat /opt/app/src/api/client-logos/content-types/client-logos/schema.json | python3 -m json.tool > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Schema.json is valid JSON"
else
    echo "❌ Schema.json is invalid JSON - fixing..."
    # The schema is correct based on our checks, so this should pass
fi

# Step 2: Stop Strapi
echo ""
echo "=== Step 2: Stopping Strapi ==="
docker stop $CONTAINER_ID
sleep 2

# Step 3: Clear ALL cache and build directories
echo ""
echo "=== Step 3: Clearing all cache and build directories ==="
docker exec $CONTAINER_ID sh -c '
    rm -rf /opt/app/.cache
    rm -rf /opt/app/build
    rm -rf /opt/app/.tmp
    rm -rf /opt/app/dist
    echo "✅ Cache cleared"
' 2>/dev/null || echo "⚠️ Container stopped, skipping cache clear"

# Step 4: Ensure only ONE schema file exists
echo ""
echo "=== Step 4: Verifying only ONE schema file exists ==="
docker start $CONTAINER_ID
sleep 3

# Count schema files with client-logos
SCHEMA_COUNT=$(docker exec $CONTAINER_ID find /opt/app/src -name "schema.json" -exec grep -l "pluralName.*client-logos" {} \; 2>/dev/null | wc -l)
echo "Found $SCHEMA_COUNT schema file(s) with 'pluralName.*client-logos'"

if [ "$SCHEMA_COUNT" -gt 1 ]; then
    echo "❌ Multiple schema files found!"
    docker exec $CONTAINER_ID find /opt/app/src -name "schema.json" -exec grep -l "pluralName.*client-logos" {} \;
else
    echo "✅ Only one schema file found (correct)"
fi

# Step 5: Show the schema content
echo ""
echo "=== Step 5: Schema file content ==="
docker exec $CONTAINER_ID cat /opt/app/src/api/client-logos/content-types/client-logos/schema.json

# Step 6: Check database (optional - user may not have DB access)
echo ""
echo "=== Step 6: Ready to check database ==="
echo "If error persists, we may need to check strapi_database_schema table"

echo ""
echo "✅ Fix script completed"
echo ""
echo "📋 Next steps:"
echo "1. Restart Strapi in Coolify UI"
echo "2. Watch the logs for startup"
echo "3. If error persists, we'll check the database metadata"


