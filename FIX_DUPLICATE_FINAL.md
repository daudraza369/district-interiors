# Final Fix for Duplicate client-logos Schema

## The Problem
Error: `The plural name "client-logos" should be unique` - means there are duplicate schema files.

## Solution: Clean Up and Recreate

Run these commands on your server via SSH:

```bash
CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')
echo "Container ID: $CONTAINER_ID"

# Step 1: Stop the container
docker stop $CONTAINER_ID 2>/dev/null

# Step 2: Start it with a shell command to access filesystem
# We'll override the entrypoint temporarily
docker run --rm -it --volumes-from $CONTAINER_ID busybox sh -c "
  # Find and remove ALL client-logos related directories
  rm -rf /opt/app/src/api/client-logos
  rm -rf /opt/app/src/api/client_logos
  
  # Create the directory structure
  mkdir -p /opt/app/src/api/client-logos/content-types/client-logos
  
  # Create the schema file ONCE
  cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << 'EOFJSON'
{
  \"kind\": \"singleType\",
  \"collectionName\": \"client_logos\",
  \"info\": {
    \"singularName\": \"client-logos\",
    \"pluralName\": \"client-logos\",
    \"displayName\": \"Client Logos Section\"
  },
  \"options\": {
    \"draftAndPublish\": true
  },
  \"attributes\": {
    \"title\": {\"type\": \"string\", \"required\": true, \"default\": \"Trusted By Leading Brands\"},
    \"subtitle\": {\"type\": \"text\", \"required\": false},
    \"showRow1\": {\"type\": \"boolean\", \"default\": true, \"required\": false},
    \"showRow2\": {\"type\": \"boolean\", \"default\": true, \"required\": false},
    \"row1Logos\": {\"type\": \"component\", \"repeatable\": true, \"component\": \"client-logo-item.client-logo-item\"},
    \"row2Logos\": {\"type\": \"component\", \"repeatable\": true, \"component\": \"client-logo-item.client-logo-item\"}
  }
}
EOFJSON
  
  echo 'Schema created successfully'
"

# OR simpler approach: use docker cp to copy a schema file

# Step 3: Create schema file locally first, then copy it
cat > /tmp/client-logos-schema.json << 'EOF'
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
EOF

# Step 4: Remove old schema, copy new one
docker exec $CONTAINER_ID rm -rf /opt/app/src/api/client-logos 2>/dev/null || true
docker cp /tmp/client-logos-schema.json $CONTAINER_ID:/opt/app/src/api/client-logos/content-types/client-logos/schema.json 2>/dev/null || \
  (docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/client-logos/content-types/client-logos && \
   docker cp /tmp/client-logos-schema.json $CONTAINER_ID:/opt/app/src/api/client-logos/content-types/client-logos/schema.json)

# Step 5: Restart via Coolify UI (recommended) or:
docker restart $CONTAINER_ID
```

## Alternative: Use Coolify UI to Restart

1. Go to Coolify dashboard
2. Find your Strapi service
3. Click "Restart" 
4. Wait 2 minutes
5. Check logs - error should be gone!


