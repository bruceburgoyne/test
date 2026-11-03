// Loads the default copy and hero image into Sanity so editors start from the current site.
// Only creates documents that don't exist yet, so it never overwrites edits.
// Run with: npx sanity exec scripts/seed-sanity.js --with-user-token

import { createReadStream } from 'node:fs';
import { getCliClient } from 'sanity/cli';
import * as defaults from '../src/lib/defaults.js';

const client = getCliClient({ apiVersion: '2026-11-01' });

const typed = (items, _type) => items.map((item, i) => ({ _key: `${_type}${i + 1}`, _type, ...item }));

const heroAsset = await client.assets.upload('image', createReadStream('public/images/hero.jpg'), {
  filename: 'hero.jpg',
});

const documents = [
  { _id: 'siteSettings', _type: 'siteSettings', ...defaults.siteSettings },
  {
    _id: 'homePage',
    _type: 'homePage',
    ...defaults.homePage,
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroAsset._id },
      alt: 'A team talking around a wooden table in a bright office kitchen',
    },
    stats: typed(defaults.homePage.stats, 'stat'),
    services: typed(defaults.homePage.services, 'titledItem'),
    cta: { _type: 'callToAction', ...defaults.homePage.cta },
  },
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    ...defaults.aboutPage,
    principles: typed(defaults.aboutPage.principles, 'titledItem'),
    cta: { _type: 'callToAction', ...defaults.aboutPage.cta },
  },
  {
    _id: 'contactPage',
    _type: 'contactPage',
    ...defaults.contactPage,
    steps: typed(defaults.contactPage.steps, 'titledItem'),
  },
];

const transaction = client.transaction();
documents.forEach((doc) => transaction.createIfNotExists(doc));
await transaction.commit();

console.log(`Seeded ${documents.map((doc) => doc._id).join(', ')} (existing documents left unchanged).`);
