#!/bin/bash
# Revert server.js to original configuration

CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

echo "Reverting server.js to original configuration..."
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/config/server.js << "EOF"
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
EOF'

echo "Configuration reverted. Restart the container in Coolify."




