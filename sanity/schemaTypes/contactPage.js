import { defineField, defineType } from 'sanity';
import { pageIntroFields } from './objects';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    ...pageIntroFields,
    defineField({ name: 'stepsHeading', title: '"What happens next" heading', type: 'string' }),
    defineField({ name: 'steps', title: 'Steps', type: 'array', of: [{ type: 'titledItem' }], validation: (r) => r.max(5) }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
