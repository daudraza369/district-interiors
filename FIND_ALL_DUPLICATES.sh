#!/bin/bash
# Find ALL possible sources of the duplicate "client-logos" pluralName

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Strapi container not found"
    exit 1
fi

echo "=== Searching for ALL occurrences of 'client-logos' in schema files ==="

# Find ALL schema.json files that mention client-logos
echo ""
echo "1. All schema.json files containing 'client-logos':"
docker exec $CONTAINER_ID find /opt/app/src -name "schema.json" -exec grep -l "client-logos" {} \; 2>/dev/null

echo ""
echo "2. All API directories:"
docker exec $CONTAINER_ID ls -la /opt/app/src/api/ 2>/dev/null

echo ""
echo "3. Checking for similar directory names (client_logos, clientlogos, etc.):"
docker exec $CONTAINER_ID find /opt/app/src/api -type d -iname "*client*logo*" 2>/dev/null

echo ""
echo "4. All occurrences of 'pluralName.*client-logos' in ALL files:"
docker exec $CONTAINER_ID find /opt/app/src -type f -name "*.json" -exec grep -l '"pluralName".*"client-logos"' {} \; 2>/dev/null

echo ""
echo "5. All occurrences of 'client-logos' as a string in JSON files:"
docker exec $CONTAINER_ID find /opt/app/src -type f -name "*.json" -exec grep -H "client-logos" {} \; 2>/dev/null | head -20

echo ""
echo "6. Checking for duplicate API directories with same collectionName:"
docker exec $CONTAINER_ID sh -c 'for dir in /opt/app/src/api/*/; do if [ -f "$dir/content-types"*"/schema.json" ]; then echo "$dir"; cat "$dir"/content-types/*/schema.json 2>/dev/null | grep -A 2 "collectionName\|pluralName"; fi; done' 2>/dev/null

echo ""
echo "=== Done searching ==="


