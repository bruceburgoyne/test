import { defineField, defineType } from 'sanity';
import { pageIntroFields } from './objects';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Introduction', default: true },
    { name: 'story', title: 'Our story' },
    { name: 'principles', title: 'How we work' },
    { name: 'cta', title: 'Call to action' },
  ],
  fields: [
    ...pageIntroFields.map((field) => ({ ...field, group: 'intro' })),
    defineField({ name: 'storyEyebrow', title: 'Section label', type: 'string', group: 'story' }),
    defineField({
      name: 'story',
      title: 'Story paragraphs',
      type: 'array',
      group: 'story',
      description: 'The first paragraph is shown larger with a decorative first letter.',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({ name: 'principlesEyebrow', title: 'Section label', type: 'string', group: 'principles' }),
    defineField({ name: 'principlesHeading', title: 'Section heading', type: 'string', group: 'principles' }),
    defineField({ name: 'principles', title: 'Principles', type: 'array', group: 'principles', of: [{ type: 'titledItem' }], validation: (r) => r.max(6) }),
    defineField({ name: 'cta', title: 'Call to action band', type: 'callToAction', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
