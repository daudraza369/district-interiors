#!/bin/bash
# IMMEDIATE FIX - Delete duplicate from database

CONTAINER_ID=$(docker ps -a | grep strapi | head -1 | awk '{print $1}')
PG_CONTAINER=$(docker ps -a | grep postgres | head -1 | awk '{print $1}')

# Get database credentials from Strapi container env
DB_USER=$(docker inspect $CONTAINER_ID | grep -i DATABASE_USERNAME | head -1 | sed 's/.*"DATABASE_USERNAME=\([^"]*\)".*/\1/' | cut -d= -f2)
DB_NAME=$(docker inspect $CONTAINER_ID | grep -i DATABASE_NAME | head -1 | sed 's/.*"DATABASE_NAME=\([^"]*\)".*/\1/' | cut -d= -f2)

# If not found, use defaults
DB_USER=${DB_USER:-postgres}
DB_NAME=${DB_NAME:-strapi}

echo "Using DB User: $DB_USER, DB Name: $DB_NAME"

# Start containers
docker start $CONTAINER_ID
docker start $PG_CONTAINER 2>/dev/null || true
sleep 3

# Delete from database using correct user
docker exec $PG_CONTAINER psql -U $DB_USER -d $DB_NAME -c "DELETE FROM strapi_core_store_settings WHERE key LIKE '%client%logo%';" 2>/dev/null || \
docker exec $PG_CONTAINER psql -U postgres -d $DB_NAME -c "DELETE FROM strapi_core_store_settings WHERE key LIKE '%client%logo%';" 2>/dev/null || \
docker exec $PG_CONTAINER psql -d $DB_NAME -c "DELETE FROM strapi_core_store_settings WHERE key LIKE '%client%logo%';" 2>/dev/null || echo "Could not delete from DB, trying alternative..."

# Try dropping table
docker exec $PG_CONTAINER psql -U $DB_USER -d $DB_NAME -c "DROP TABLE IF EXISTS client_logos CASCADE;" 2>/dev/null || true

# Remove schema files
docker exec $CONTAINER_ID sh -c 'rm -rf /opt/app/src/api/client-logos /opt/app/.cache /opt/app/build' 2>/dev/null || true

# Recreate schema
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
  "options": {"draftAndPublish": true},
  "attributes": {
    "title": {"type": "string", "required": true, "default": "Trusted By Leading Brands"},
    "subtitle": {"type": "text", "required": false},
    "showRow1": {"type": "boolean", "default": true, "required": false},
    "showRow2": {"type": "boolean", "default": true, "required": false},
    "row1Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"},
    "row2Logos": {"type": "component", "repeatable": true, "component": "client-logo-item.client-logo-item"}
  }
}
EOFJSON' 2>/dev/null || true

echo "✅ Done. Restart Strapi in Coolify UI"


