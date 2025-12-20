#!/bin/sh
# Don't use set -e here - we want to continue even if some steps fail
set +e

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
  
  # First, find ANY existing superuser by trying common usernames
  # PostgreSQL always creates at least one superuser during initialization
  SUPERUSER_FOUND=""
  SUPERUSER_PASSWORD=""
  
  # List of possible superusers to try (in order of likelihood)
  POSSIBLE_USERS="postgres ${DATABASE_USERNAME:-postgres} ${POSTGRES_USER:-postgres}"
  
  echo "🔍 Looking for existing PostgreSQL superuser..."
  for TEST_USER in $POSSIBLE_USERS; do
    if [ -z "$TEST_USER" ]; then
      continue
    fi
    echo "   Trying user: $TEST_USER..."
    # Try with POSTGRES_PASSWORD first, then DATABASE_PASSWORD
    for TEST_PASS in "${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" "${DATABASE_PASSWORD:-postgres}"; do
      if PGPASSWORD="$TEST_PASS" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$TEST_USER" -d postgres -c "SELECT 1" >/dev/null 2>&1; then
        SUPERUSER_FOUND="$TEST_USER"
        SUPERUSER_PASSWORD="$TEST_PASS"
        echo "   ✅ Found working superuser: $TEST_USER"
        break 2
      else
        echo "   ❌ Failed to connect as $TEST_USER"
      fi
    done
  done
  
  # If still no superuser found, try to list all users from template1 (which always exists)
  if [ -z "$SUPERUSER_FOUND" ]; then
    echo "⚠️  Could not find superuser by testing. Attempting to query PostgreSQL directly..."
    # Try connecting without specifying a database (connects to default)
    # This might work if we can find ANY existing user
    for TEST_PASS in "${POSTGRES_PASSWORD:-${DATABASE_PASSWORD:-postgres}}" "${DATABASE_PASSWORD:-postgres}"; do
      # Try to connect to template1 which always exists
      EXISTING_USER=$(PGPASSWORD="$TEST_PASS" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U postgres -d template1 -tAc "SELECT rolname FROM pg_roles WHERE rolsuper = true LIMIT 1;" 2>/dev/null || echo "")
      if [ -n "$EXISTING_USER" ]; then
        echo "   ✅ Found superuser in database: $EXISTING_USER"
        SUPERUSER_FOUND="$EXISTING_USER"
        SUPERUSER_PASSWORD="$TEST_PASS"
        break
      fi
    done
  fi
  
  # Check if the desired user exists
  if [ -n "$SUPERUSER_FOUND" ]; then
    USER_EXISTS=$(PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DATABASE_USERNAME:-postgres}'" 2>/dev/null || echo "0")
    
    if [ "$USER_EXISTS" != "1" ]; then
      echo "👤 Creating user '${DATABASE_USERNAME:-postgres}'..."
      if PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -c "CREATE USER \"${DATABASE_USERNAME:-postgres}\" WITH PASSWORD '${DATABASE_PASSWORD:-postgres}' SUPERUSER CREATEDB CREATEROLE;" 2>/dev/null; then
        echo "✅ User created successfully"
      else
        echo "⚠️  Could not create user (may need different permissions)"
      fi
    else
      echo "✅ User '${DATABASE_USERNAME:-postgres}' already exists"
      # Update password to match env var
      PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -c "ALTER USER \"${DATABASE_USERNAME:-postgres}\" WITH PASSWORD '${DATABASE_PASSWORD:-postgres}';" 2>/dev/null || true
    fi
  else
    echo "⚠️  Could not find any existing superuser. PostgreSQL may not be initialized yet."
  fi
  
  echo "📊 Checking database: ${DATABASE_NAME:-district_interiors_cms}"
  
  # Check if database exists and create if needed
  if [ -n "$SUPERUSER_FOUND" ]; then
    DB_EXISTS=$(PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${DATABASE_NAME:-district_interiors_cms}'" 2>/dev/null || echo "0")
    
    if [ "$DB_EXISTS" != "1" ]; then
      echo "📝 Creating database '${DATABASE_NAME:-district_interiors_cms}'..."
      if PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -c "CREATE DATABASE \"${DATABASE_NAME:-district_interiors_cms}\" OWNER \"${DATABASE_USERNAME:-postgres}\";" 2>/dev/null; then
        echo "✅ Database created successfully"
      else
        echo "⚠️  Could not create database"
      fi
    else
      echo "✅ Database '${DATABASE_NAME:-district_interiors_cms}' already exists"
    fi
    
    # Grant permissions
    echo "🔐 Ensuring permissions..."
    PGPASSWORD="$SUPERUSER_PASSWORD" psql -h "${DATABASE_HOST:-postgres}" -p "${DATABASE_PORT:-5432}" -U "$SUPERUSER_FOUND" -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"${DATABASE_NAME:-district_interiors_cms}\" TO \"${DATABASE_USERNAME:-postgres}\";" 2>/dev/null || true
  else
    echo "⚠️  Skipping database creation - no superuser found"
  fi
else
  echo "⚠️  psql not available, skipping database creation check"
  echo "   PostgreSQL should create the database automatically on first run"
fi

echo "✅ Database check complete"
