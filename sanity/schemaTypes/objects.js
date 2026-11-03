import { defineField, defineType } from 'sanity';

// A titled item with a short description: services, principles and contact steps.
export const titledItem = defineType({
  name: 'titledItem',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required().max(60) }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
  ],
});

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Figure', type: 'string', description: 'For example 15 or 120+. Use verified figures only.', validation: (r) => r.required().max(8) }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required().max(40) }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
});

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to action band',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required().max(60) }),
    defineField({ name: 'text', title: 'Supporting text', type: 'text', rows: 2, validation: (r) => r.max(200) }),
  ],
});

const seoField = defineField({
  name: 'seoDescription',
  title: 'Search engine description',
  type: 'text',
  rows: 2,
  description: 'Shown under the page title in search results. Aim for 120 to 160 characters.',
  validation: (r) => r.max(170),
});

export const pageIntroFields = [
  defineField({ name: 'eyebrow', title: 'Small label above the heading', type: 'string', validation: (r) => r.max(40) }),
  defineField({ name: 'headline', title: 'Main heading', type: 'string', validation: (r) => r.required().max(90) }),
  defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (r) => r.max(240) }),
  seoField,
];
