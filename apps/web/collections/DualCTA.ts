import { CollectionConfig } from 'payload/types';

export const DualCTA: CollectionConfig = {
  slug: 'dual-cta',
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
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'action',
          type: 'select',
          options: ['link', 'scroll'],
          defaultValue: 'link',
        },
        {
          name: 'scrollTarget',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'action',
          type: 'select',
          options: ['link', 'scroll'],
          defaultValue: 'link',
        },
        {
          name: 'scrollTarget',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

