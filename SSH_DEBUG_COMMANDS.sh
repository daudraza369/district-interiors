#!/bin/bash
# Run these commands on the Coolify server via SSH

echo "=== 1. Finding CMS Container ==="
CMS_CONTAINER=$(docker ps -a | grep cms | head -1 | awk '{print $1}')
echo "CMS Container ID: $CMS_CONTAINER"

if [ -z "$CMS_CONTAINER" ]; then
    echo "❌ No CMS container found!"
    exit 1
fi

echo ""
echo "=== 2. CMS Container Status ==="
docker ps -a | grep cms

echo ""
echo "=== 3. Last 100 Lines of CMS Logs (MOST IMPORTANT) ==="
docker logs $CMS_CONTAINER --tail 100

echo ""
echo "=== 4. Checking if Port 1337 is Listening ==="
docker exec $CMS_CONTAINER nc -z localhost 1337 2>/dev/null && echo "✅ Port 1337 is open" || echo "❌ Port 1337 is closed"

echo ""
echo "=== 5. Environment Variables Check ==="
docker exec $CMS_CONTAINER env | grep -E "DATABASE|APP_KEYS|JWT|STRAPI" | sort

echo ""
echo "=== 6. Testing Database Connection ==="
docker exec $CMS_CONTAINER sh -c "nc -z postgres 5432 2>/dev/null && echo '✅ Database reachable' || echo '❌ Database NOT reachable'"

echo ""
echo "=== 7. Container Health Status ==="
docker inspect $CMS_CONTAINER | grep -A 10 '"Health"' || echo "No healthcheck configured"

