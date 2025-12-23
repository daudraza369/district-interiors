# Fix: Duplicate "client-logos" Content Type

## The Error
```
Error: The plural name "client-logos" should be unique
```

This means there are duplicate schema files or conflicting content types.

## Fix Steps (Run on Server via SSH)

```bash
# 1. Stop the container to prevent restart loop
CONTAINER_ID=$(docker ps -a | grep strapi | awk '{print $1}')
docker stop $CONTAINER_ID

# 2. Check for duplicate schema files
docker exec $CONTAINER_ID find /opt/app/src/api -name "*client-logos*" -type f 2>/dev/null || echo "Container stopped, checking filesystem..."
docker exec $CONTAINER_ID find /opt/app/src/api -name "*client_logos*" -type f 2>/dev/null || echo "Container stopped, checking filesystem..."

# 3. Remove the client-logos schema (we'll recreate it properly)
docker exec $CONTAINER_ID rm -rf /opt/app/src/api/client-logos 2>/dev/null || echo "Already removed or doesn't exist"

# 4. Check if there are any other content types with similar names
docker exec $CONTAINER_ID ls -la /opt/app/src/api/ 2>/dev/null || echo "Container stopped"

# 5. Start container
docker start $CONTAINER_ID

# 6. Wait a moment, then create the schema correctly (single creation)
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
EOFJSON'

# 7. Verify only one schema file exists
docker exec $CONTAINER_ID find /opt/app/src/api -name "*client*logo*" -type f

# 8. Restart Strapi
docker restart $CONTAINER_ID

# 9. Wait 2 minutes, then check logs
sleep 120
docker logs $CONTAINER_ID --tail 50 | grep -i error || echo "No errors found!"
```


