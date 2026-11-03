import { defineField, defineType } from 'sanity';
import { pageIntroFields } from './objects';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'stats', title: 'Stats' },
    { name: 'services', title: 'Services' },
    { name: 'quote', title: 'Client quote' },
    { name: 'cta', title: 'Call to action' },
  ],
  fields: [
    ...pageIntroFields.map((field) => ({ ...field, group: 'hero' })),
    defineField({
      name: 'headlineEmphasis',
      title: 'Highlighted end of heading',
      type: 'string',
      group: 'hero',
      description: 'Shown in italic accent colour straight after the main heading, for example "something to say."',
      validation: (r) => r.max(40),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Landscape photo, at least 1600 pixels wide. Use the hotspot to keep the subject in view when it is cropped.',
      fields: [
        defineField({ name: 'alt', title: 'Image description', type: 'string', description: 'Describes the image for people using screen readers.', validation: (r) => r.required() }),
      ],
    }),
    defineField({ name: 'stats', title: 'Stats', type: 'array', group: 'stats', of: [{ type: 'stat' }], validation: (r) => r.max(4) }),
    defineField({ name: 'servicesEyebrow', title: 'Section label', type: 'string', group: 'services' }),
    defineField({ name: 'servicesHeading', title: 'Section heading', type: 'string', group: 'services' }),
    defineField({ name: 'services', title: 'Services', type: 'array', group: 'services', of: [{ type: 'titledItem' }], validation: (r) => r.max(6) }),
    defineField({
      name: 'quote',
      title: 'Client quote',
      type: 'object',
      group: 'quote',
      description: 'Only use real quotes you have permission to publish.',
      fields: [
        defineField({ name: 'text', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'attribution', title: 'Name, role and organisation', type: 'string' }),
      ],
    }),
    defineField({ name: 'cta', title: 'Call to action band', type: 'callToAction', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
