# FINAL FIX - Remove Duplicate from Database

The duplicate is stored in the **database**, not just files. Run these commands:

## Step 1: Stop Container
```bash
CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')
docker stop $CONTAINER_ID
```

## Step 2: Remove Schema Files (clean slate)
```bash
docker exec $CONTAINER_ID sh -c '
  rm -rf /opt/app/src/api/client-logos
  rm -rf /opt/app/src/api/client_logos
  rm -rf /opt/app/.cache
  rm -rf /opt/app/build
  echo "Files cleaned"
'
```

## Step 3: Delete from Database (CRITICAL - this is the real fix)

Connect to PostgreSQL and delete the content type from the database:

```bash
# Get PostgreSQL container
PG_CONTAINER=$(docker ps -a | grep postgres | grep -i strapi | head -1 | awk '{print $1}')

# Connect and delete
docker exec -it $PG_CONTAINER psql -U postgres -d strapi -c "
DELETE FROM strapi_core_store_settings WHERE key LIKE '%client-logos%';
DELETE FROM strapi_content_types WHERE uid LIKE '%client-logos%';
DELETE FROM information_schema.tables WHERE table_name LIKE '%client_logos%';
"

# If that doesn't work, try this (more aggressive):
docker exec -it $PG_CONTAINER psql -U postgres -d strapi -c "
DROP TABLE IF EXISTS client_logos CASCADE;
DELETE FROM strapi_core_store_settings WHERE key LIKE '%client%logo%';
"
```

## Step 4: Recreate Schema File (ONCE)
```bash
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
```

## Step 5: Restart via Coolify UI
Go to Coolify and restart Strapi service.


