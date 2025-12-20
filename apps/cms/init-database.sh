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
  echo "📊 Checking PostgreSQL user: ${DATABASE_USERNAME:-postgres}"
  
  # Try to connect with the specified username to check if it exists
  # First, try to connect without specifying a database (connects to default postgres database)
  # Use the postgres superuser if available, otherwise try the specified user
  DB_USER_EXISTS=$(PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U postgres -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DATABASE_USERNAME:-postgres}'" 2>/dev/null || \
    PGPASSWORD="${DATABASE_PASSWORD:-postgres}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d postgres -tAc "SELECT 1" 2>/dev/null && echo "1" || echo "0")
  
  # If we can't determine if user exists (connection failed), try creating it
  if [ "$DB_USER_EXISTS" != "1" ]; then
    echo "👤 User '${DATABASE_USERNAME:-postgres}' does not exist or cannot connect, attempting to create..."
    
    # Try to connect as postgres superuser first (if POSTGRES_PASSWORD is different)
    # If that fails, try connecting with the username itself (it might be a superuser)
    PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U postgres -d postgres -c "CREATE USER \"${DATABASE_USERNAME:-postgres}\" WITH PASSWORD '${DATABASE_PASSWORD:-postgres}' SUPERUSER;" 2>/dev/null && echo "✅ User created successfully" || \
    PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${POSTGRES_USER:-postgres}" -d postgres -c "CREATE USER \"${DATABASE_USERNAME:-postgres}\" WITH PASSWORD '${DATABASE_PASSWORD:-postgres}' SUPERUSER;" 2>/dev/null && echo "✅ User created successfully" || \
    echo "⚠️  Could not create user (may already exist or need different superuser)"
  else
    echo "✅ User exists"
  fi
  
  echo "📊 Checking database: ${DATABASE_NAME:-district_interiors_cms}"
  
  # Now try to connect with the user we want to use
  # Check if database exists
  DB_EXISTS=$(PGPASSWORD="${DATABASE_PASSWORD:-postgres}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${DATABASE_NAME:-district_interiors_cms}'" 2>/dev/null || echo "0")
  
  if [ "$DB_EXISTS" != "1" ]; then
    echo "📝 Database does not exist, creating it..."
    PGPASSWORD="${DATABASE_PASSWORD:-postgres}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d postgres -c "CREATE DATABASE \"${DATABASE_NAME:-district_interiors_cms}\";" 2>/dev/null && echo "✅ Database created successfully" || \
    # If that fails, try with postgres superuser
    PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U postgres -d postgres -c "CREATE DATABASE \"${DATABASE_NAME:-district_interiors_cms}\" OWNER \"${DATABASE_USERNAME:-postgres}\";" 2>/dev/null && echo "✅ Database created successfully" || \
    echo "⚠️  Could not create database (may already exist or permissions issue)"
  else
    echo "✅ Database already exists"
  fi
  
  # Grant permissions to ensure the user can access the database
  echo "🔐 Ensuring user has proper permissions..."
  PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U postgres -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"${DATABASE_NAME:-district_interiors_cms}\" TO \"${DATABASE_USERNAME:-postgres}\";" 2>/dev/null || \
  PGPASSWORD="${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "${POSTGRES_USER:-postgres}" -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"${DATABASE_NAME:-district_interiors_cms}\" TO \"${DATABASE_USERNAME:-postgres}\";" 2>/dev/null || \
  echo "⚠️  Could not grant permissions (user may already have access)"
else
  echo "⚠️  psql not available, skipping database creation check"
  echo "   PostgreSQL should create the database automatically on first run"
fi

echo "✅ Database check complete"
