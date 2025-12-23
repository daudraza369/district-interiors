#!/bin/bash
# Update admin.js to handle cookies behind proxy

CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

echo "Updating admin.js configuration..."
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/config/admin.js << "EOF"
module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    options: {
      expiresIn: "7d",
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  url: env("PUBLIC_URL", "https://admin.districtflowers.com"),
});
EOF'

echo "admin.js updated. Restart the container."




