#!/bin/sh
set -e

echo "🚀 Starting Strapi CMS..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until nc -z ${DATABASE_HOST:-postgres} ${DATABASE_PORT:-5432}; do
  echo "   Database not ready, waiting..."
  sleep 2
done
echo "✅ Database is ready"

# Check required environment variables
if [ -z "$APP_KEYS" ]; then
  echo "❌ ERROR: APP_KEYS environment variable is not set"
  exit 1
fi

if [ -z "$DATABASE_PASSWORD" ]; then
  echo "❌ ERROR: DATABASE_PASSWORD environment variable is not set"
  exit 1
fi

echo "✅ Environment variables validated"

# Start Strapi
echo "🚀 Starting Strapi..."
exec npm start









