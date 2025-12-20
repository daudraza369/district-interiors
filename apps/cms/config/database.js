module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  if (client === 'sqlite') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        useNullAsDefault: true,
      },
    };
  }
  
  // Get database configuration from environment variables
  const databaseName = env('DATABASE_NAME');
  const databaseUsername = env('DATABASE_USERNAME');
  const databasePassword = env('DATABASE_PASSWORD');
  const databaseHost = env('DATABASE_HOST', '127.0.0.1');
  const databasePort = env.int('DATABASE_PORT', 5432);
  
  // Validate required environment variables
  if (!databaseName) {
    throw new Error(
      '❌ DATABASE_NAME environment variable is required but not set!\n' +
      'Please set DATABASE_NAME in Coolify environment variables.'
    );
  }
  
  if (!databaseUsername) {
    throw new Error(
      '❌ DATABASE_USERNAME environment variable is required but not set!\n' +
      'Please set DATABASE_USERNAME in Coolify environment variables.'
    );
  }
  
  if (!databasePassword) {
    throw new Error(
      '❌ DATABASE_PASSWORD environment variable is required but not set!\n' +
      'Please set DATABASE_PASSWORD in Coolify environment variables.'
    );
  }
  
  // Log configuration (without password)
  console.log('🔍 Database Configuration:');
  console.log(`   DATABASE_HOST: ${databaseHost}`);
  console.log(`   DATABASE_PORT: ${databasePort}`);
  console.log(`   DATABASE_NAME: ${databaseName}`);
  console.log(`   DATABASE_USERNAME: ${databaseUsername}`);
  console.log(`   DATABASE_PASSWORD: ${databasePassword ? '***set***' : 'NOT SET'}`);
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: databaseHost,
        port: databasePort,
        database: databaseName, // Use validated value, no fallback
        user: databaseUsername, // Use validated value, no fallback
        password: databasePassword, // Use validated value
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: {
        min: 0,
        max: 10,
      },
    },
  };
};

