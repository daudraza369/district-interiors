import { CollectionConfig } from 'payload/types';

export const ClientLogosSection: CollectionConfig = {
  slug: 'client-logos-section',
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
      required: true,
      defaultValue: 'Trusted By Leading Brands',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Proud collaborations with top names in hospitality and design.',
    },
    {
      name: 'showRow1',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showRow2',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'row1Logos',
      type: 'array',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'websiteUrl',
          type: 'text',
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'row2Logos',
      type: 'array',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'websiteUrl',
          type: 'text',
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
};

