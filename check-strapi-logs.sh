#!/bin/bash
# Check Strapi logs for errors
echo "=== Recent Strapi Logs (last 50 lines) ==="
docker logs --tail 50 d4737258e037

echo ""
echo "=== Checking for Errors ==="
docker logs --tail 100 d4737258e037 2>&1 | grep -i error

echo ""
echo "=== Checking for Warnings ==="
docker logs --tail 100 d4737258e037 2>&1 | grep -i warn | tail -10




