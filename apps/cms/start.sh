#!/bin/sh
set -e

echo "🚀 Starting Strapi CMS..."

# Run database initialization script first
if [ -f "./init-database.sh" ]; then
  echo "📋 Running database initialization..."
  chmod +x ./init-database.sh
  ./init-database.sh
fi

# Wait for database to be ready (with timeout)
echo "⏳ Waiting for database to be ready..."
timeout=60
elapsed=0
until nc -z ${DATABASE_HOST:-postgres} ${DATABASE_PORT:-5432}; do
  if [ $elapsed -ge $timeout ]; then
    echo "⚠️  Database connection timeout after ${timeout}s, but continuing anyway..."
    break
  fi
  echo "   Database not ready, waiting... (${elapsed}s/${timeout}s)"
  sleep 2
  elapsed=$((elapsed + 2))
done
echo "✅ Database connection check complete"

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

# Debug: Print database configuration (without password)
echo "🔍 Database Configuration:"
echo "   DATABASE_CLIENT: ${DATABASE_CLIENT:-not set}"
echo "   DATABASE_HOST: ${DATABASE_HOST:-not set}"
echo "   DATABASE_PORT: ${DATABASE_PORT:-not set}"
echo "   DATABASE_NAME: ${DATABASE_NAME:-not set}"
echo "   DATABASE_USERNAME: ${DATABASE_USERNAME:-not set}"
echo "   DATABASE_PASSWORD: ${DATABASE_PASSWORD:+***set***}"

# Start Strapi
echo "🚀 Starting Strapi..."
exec npm start











