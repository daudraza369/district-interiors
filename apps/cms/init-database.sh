#!/bin/sh
set -e

echo "🔍 Checking if database exists..."

# Wait for database to be ready
timeout=60
elapsed=0
until nc -z ${DATABASE_HOST:-postgres} ${DATABASE_PORT:-5432}; do
  if [ $elapsed -ge $timeout ]; then
    echo "⚠️  Database connection timeout, but continuing..."
    break
  fi
  sleep 2
  elapsed=$((elapsed + 2))
done

# Install psql client if not available (for Alpine)
if ! command -v psql > /dev/null 2>&1; then
  echo "📦 Installing PostgreSQL client..."
  apk add --no-cache postgresql-client > /dev/null 2>&1 || echo "⚠️  Could not install psql client"
fi

# Check if database exists, create if it doesn't
if command -v psql > /dev/null 2>&1; then
  echo "📊 Checking database: ${DATABASE_NAME:-district_interiors_cms}"
  
  # Check if database exists
  DB_EXISTS=$(PGPASSWORD="${DATABASE_PASSWORD:-postgres}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${DATABASE_NAME:-district_interiors_cms}'" 2>/dev/null || echo "0")
  
  if [ "$DB_EXISTS" != "1" ]; then
    echo "📝 Database does not exist, creating it..."
    PGPASSWORD="${DATABASE_PASSWORD:-postgres}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d postgres -c "CREATE DATABASE \"${DATABASE_NAME:-district_interiors_cms}\";" 2>/dev/null && echo "✅ Database created successfully" || echo "⚠️  Could not create database (may already exist or permissions issue)"
  else
    echo "✅ Database already exists"
  fi
else
  echo "⚠️  psql not available, skipping database creation check"
  echo "   PostgreSQL should create the database automatically on first run"
fi

echo "✅ Database check complete"
