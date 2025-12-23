/**
 * Payload CMS Configuration
 * Replaces Strapi - everything defined in code, no restrictions!
 */

import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Import collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { HeroSection } from './collections/HeroSection';
import { ClientLogosSection } from './collections/ClientLogosSection';
import { WhyChooseUs } from './collections/WhyChooseUs';
import { ServicesSection } from './collections/ServicesSection';
import { StatsSection } from './collections/StatsSection';
import { DualCTA } from './collections/DualCTA';

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    Users,
    Media,
    HeroSection,
    ClientLogosSection,
    WhyChooseUs,
    ServicesSection,
    StatsSection,
    DualCTA,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET_KEY || 'your-secret-change-this',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 
        (process.env.DATABASE_HOST 
          ? `postgresql://${process.env.DATABASE_USERNAME || 'postgres'}:${process.env.DATABASE_PASSWORD || 'postgres'}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT || 5432}/${process.env.DATABASE_NAME || 'district_interiors_cms'}`
          : undefined),
    },
  }),
  serverURL: process.env.NEXT_PUBLIC_APP_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
});

