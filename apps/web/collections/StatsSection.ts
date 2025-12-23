import { CollectionConfig } from 'payload/types';

export const StatsSection: CollectionConfig = {
  slug: 'stats-section',
  access: {
    read: () => true, // Public read access
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
  ],
};

