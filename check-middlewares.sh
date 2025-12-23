#!/bin/bash
# Check middlewares configuration

CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')
echo "Checking middlewares.js..."
docker exec $CONTAINER_ID cat /opt/app/config/middlewares.js




