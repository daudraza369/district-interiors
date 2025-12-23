/**
 * Payload CMS Configuration
 * This replaces Strapi - everything is defined in code!
 */

import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Import all collections
import { HeroSection } from './collections/HeroSection';
import { ClientLogosSection } from './collections/ClientLogosSection';
import { WhyChooseUs } from './collections/WhyChooseUs';
import { ServicesSection } from './collections/ServicesSection';
import { StatsSection } from './collections/StatsSection';
import { DualCTA } from './collections/DualCTA';
import { CollectionPreview } from './collections/CollectionPreview';
import { AboutSnapshot } from './collections/AboutSnapshot';

export default buildConfig({
  admin: {
    user: 'users', // Collection slug for users
  },
  collections: [
    HeroSection,
    ClientLogosSection,
    WhyChooseUs,
    ServicesSection,
    StatsSection,
    DualCTA,
    CollectionPreview,
    AboutSnapshot,
    // Add more collections here
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  }),
  // Server URL
  serverURL: process.env.NEXT_PUBLIC_APP_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
});

