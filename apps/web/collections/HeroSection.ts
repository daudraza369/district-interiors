import { CollectionConfig } from 'payload';

export const HeroSection: CollectionConfig = {
  slug: 'hero-section',
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
      defaultValue: 'Where Design Takes Root',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      defaultValue: 'Explore Our Work',
    },
    {
      name: 'primaryButtonAction',
      type: 'select',
      options: ['link', 'scroll'],
      defaultValue: 'scroll',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
    },
    {
      name: 'primaryButtonScrollTarget',
      type: 'text',
      defaultValue: 'portfolio',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      defaultValue: 'Request a Consultation',
    },
    {
      name: 'secondaryButtonAction',
      type: 'select',
      options: ['link', 'scroll'],
      defaultValue: 'scroll',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
    },
    {
      name: 'secondaryButtonScrollTarget',
      type: 'text',
      defaultValue: 'contact',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

