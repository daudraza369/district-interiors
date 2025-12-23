#!/bin/bash
# Quick script to update Coolify environment variables via SSH

echo "🔧 Coolify Environment Variables Updater"
echo "========================================"
echo ""

# Step 1: Generate PAYLOAD_SECRET
echo "📝 Step 1: Generating PAYLOAD_SECRET..."
PAYLOAD_SECRET=$(openssl rand -hex 32)
echo "Generated PAYLOAD_SECRET: $PAYLOAD_SECRET"
echo ""

# Step 2: Get Project ID
echo "📝 Step 2: Finding Project ID..."
echo "Run this SQL command in Coolify database:"
echo "----------------------------------------"
echo "sudo -u postgres psql coolify"
echo ""
echo "Then run:"
echo "SELECT id, name FROM projects WHERE name LIKE '%District Interior%';"
echo ""
read -p "Enter your Project ID: " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: Project ID is required!"
  exit 1
fi

# Step 3: Update database
echo ""
echo "📝 Step 3: Updating environment variables..."
sudo -u postgres psql coolify << EOF
-- Remove Strapi variables
DELETE FROM project_environment_variables 
WHERE project_id = $PROJECT_ID AND key IN ('STRAPI_API_TOKEN', 'NEXT_PUBLIC_STRAPI_URL', 'STRAPI_URL');

-- Add PAYLOAD_SECRET
INSERT INTO project_environment_variables (project_id, key, value, created_at, updated_at)
VALUES ($PROJECT_ID, 'PAYLOAD_SECRET', '$PAYLOAD_SECRET', NOW(), NOW())
ON CONFLICT (project_id, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Verify
SELECT key, LEFT(value, 20) || '...' as value_preview 
FROM project_environment_variables 
WHERE project_id = $PROJECT_ID 
ORDER BY key;
EOF

echo ""
echo "✅ Environment variables updated!"
echo ""
echo "📝 Step 4: Restart the container"
echo "Run: docker ps | grep district"
echo "Then: docker restart CONTAINER_ID"
echo ""
echo "OR better: Go to Coolify UI and click 'Redeploy'"

