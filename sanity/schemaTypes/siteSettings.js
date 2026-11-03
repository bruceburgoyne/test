import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site name', type: 'string', validation: (r) => r.required().max(40) }),
    defineField({ name: 'footerNote', title: 'Footer line', type: 'string', description: 'One line on who you are and where you work.', validation: (r) => r.max(120) }),
    defineField({ name: 'email', title: 'Email address', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'phone', title: 'Phone number', type: 'string' }),
    defineField({ name: 'address', title: 'Office address', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
