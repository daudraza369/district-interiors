# 🎯 Create Client Logos Section in Strapi

## Quick Start (All Commands in One)

**Run these commands on your server via SSH:**

```bash
# Get the container ID
CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

# Create component directory and schema
docker exec $CONTAINER_ID mkdir -p /opt/app/src/components/client-logo-item && \
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/components/client-logo-item/schema.json << "EOF"
{
  "collectionName": "components_client_logo_items",
  "info": {
    "displayName": "Client Logo Item",
    "description": "A client logo with name and optional website"
  },
  "options": {},
  "attributes": {
    "clientName": {
      "type": "string",
      "required": true
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "websiteUrl": {
      "type": "string",
      "required": false
    },
    "displayOrder": {
      "type": "integer",
      "default": 0,
      "required": false
    }
  }
}
EOF'

# Create single type directory and schema
docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/client-logos/content-types/client-logos && \
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/client-logos/content-types/client-logos/schema.json << "EOF"
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
    "title": {
      "type": "string",
      "required": true,
      "default": "Trusted By Leading Brands"
    },
    "subtitle": {
      "type": "text",
      "required": false
    },
    "showRow1": {
      "type": "boolean",
      "default": true,
      "required": false
    },
    "showRow2": {
      "type": "boolean",
      "default": true,
      "required": false
    },
    "row1Logos": {
      "type": "component",
      "repeatable": true,
      "component": "client-logo-item.client-logo-item"
    },
    "row2Logos": {
      "type": "component",
      "repeatable": true,
      "component": "client-logo-item.client-logo-item"
    }
  }
}
EOF'

# Restart Strapi
docker restart $CONTAINER_ID
```

**Wait 30-60 seconds for Strapi to restart, then run:**

```bash
cd /path/to/your/repo
node populate-client-logos.js
```

## What This Creates

### Component: `client-logo-item`
- `clientName` (Text, required) - Name of the client/brand
- `logo` (Media, required) - Logo image file
- `websiteUrl` (Text, optional) - Client website URL
- `displayOrder` (Integer, default: 0) - Order for sorting

### Single Type: `client-logos`
- `title` (Text, default: "Trusted By Leading Brands")
- `subtitle` (Text, optional)
- `showRow1` (Boolean, default: true)
- `showRow2` (Boolean, default: true)
- `row1Logos` (Component array: client-logo-item)
- `row2Logos` (Component array: client-logo-item)

## After Schema Creation

1. **Wait for Strapi to restart** (check logs: `docker logs $CONTAINER_ID`)
2. **Set API Permissions:**
   - Go to Strapi Admin > Settings > Users & Permissions Plugin > Roles > Public
   - Enable "find" and "findOne" for Client Logos
3. **Run populate script:**
   ```bash
   node populate-client-logos.js
   ```
4. **Add logos via Strapi Admin:**
   - Go to Content Manager > Client Logos
   - Add client logos to Row 1 Logos and Row 2 Logos
   - Upload logo images
   - Set display order
   - Publish


