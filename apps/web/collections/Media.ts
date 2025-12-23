import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Public read access
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

