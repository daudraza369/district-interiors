#!/bin/bash
# Quick script to check Strapi status on the server

echo "=== 1. Current Strapi Container ==="
CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')
if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No running Strapi container found!"
    docker ps -a | grep strapi
    exit 1
fi
echo "✅ Container ID: $CONTAINER_ID"

echo ""
echo "=== 2. Container Status ==="
docker ps | grep strapi

echo ""
echo "=== 3. Check Schema Files ==="
echo "Checking component schema..."
docker exec $CONTAINER_ID test -f /opt/app/src/components/client-logo-item/schema.json && echo "✅ Component schema exists" || echo "❌ Component schema missing"

echo "Checking single type schema..."
docker exec $CONTAINER_ID test -f /opt/app/src/api/client-logos/content-types/client-logos/schema.json && echo "✅ Single type schema exists" || echo "❌ Single type schema missing"

echo ""
echo "=== 4. Recent Logs (last 30 lines) ==="
docker logs $CONTAINER_ID --tail 30

echo ""
echo "=== 5. Check if Strapi is Responding ==="
docker exec $CONTAINER_ID wget -q -O- http://localhost:1337/api 2>&1 | head -5


