# Run This On Your Server (via SSH)

## Step 1: SSH into your server
```bash
ssh root@your-server-ip
```

## Step 2: Find the Strapi container
```bash
docker ps | grep strapi
```

## Step 3: Run these commands (replace CONTAINER_ID with the actual ID):

```bash
CONTAINER_ID=$(docker ps | grep strapi | awk '{print $1}')

# Create schema directory
docker exec $CONTAINER_ID mkdir -p /opt/app/src/api/hero-section/content-types/hero-section

# Create schema file
docker exec $CONTAINER_ID sh -c 'cat > /opt/app/src/api/hero-section/content-types/hero-section/schema.json << "EOF"
{
  "kind": "singleType",
  "collectionName": "hero_sections",
  "info": {
    "singularName": "hero-section",
    "pluralName": "hero-sections",
    "displayName": "Hero Section"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subtitle": {
      "type": "text"
    },
    "description": {
      "type": "text"
    },
    "primaryButtonText": {
      "type": "string"
    },
    "primaryButtonAction": {
      "type": "enumeration",
      "enum": ["scroll", "link"],
      "default": "scroll"
    },
    "primaryButtonLink": {
      "type": "string"
    },
    "primaryButtonScrollTarget": {
      "type": "string",
      "default": "portfolio"
    },
    "secondaryButtonText": {
      "type": "string"
    },
    "secondaryButtonAction": {
      "type": "enumeration",
      "enum": ["scroll", "link"],
      "default": "scroll"
    },
    "secondaryButtonLink": {
      "type": "string"
    },
    "secondaryButtonScrollTarget": {
      "type": "string",
      "default": "contact"
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "heroImage": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images", "videos"]
    },
    "beforeImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "afterImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    }
  }
}
EOF'

# Restart container
docker restart $CONTAINER_ID
```

## Step 4: Wait 1-2 minutes, then run:
```bash
node populate-hero-section.js
```

This will add all fields and populate the hero section automatically!



