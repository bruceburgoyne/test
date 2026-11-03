import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';
import * as defaults from './defaults.js';

const isConfigured = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID);
const imageBuilder = createImageUrlBuilder(sanityClient);

const isEmpty = (value) =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

// Fill anything left empty in Sanity from the defaults, one level deep.
function withDefaults(doc, fallback) {
  const result = { ...fallback };
  for (const [key, value] of Object.entries(doc ?? {})) {
    if (key.startsWith('_') || isEmpty(value)) continue;
    result[key] =
      value && typeof value === 'object' && !Array.isArray(value) && fallback[key] && typeof fallback[key] === 'object'
        ? withDefaults(value, fallback[key])
        : value;
  }
  return result;
}

// Singletons use their type as the document id (see sanity/structure.js).
// If Sanity is configured but unreachable, the build fails rather than
// publishing placeholder copy, so Vercel keeps the last good deployment.
async function getSingleton(type) {
  if (!isConfigured) return defaults[type];
  const doc = await sanityClient.fetch('*[_id == $id][0]', { id: type });
  return withDefaults(doc, defaults[type]);
}

export const getSiteSettings = () => getSingleton('siteSettings');
export const getHomePage = () => getSingleton('homePage');
export const getAboutPage = () => getSingleton('aboutPage');
export const getContactPage = () => getSingleton('contactPage');

export function imageUrl(image, width) {
  return imageBuilder.image(image).width(width).fit('max').auto('format').quality(75).url();
}

// Used for the hero image's width and height attributes, to reserve space while it loads.
export function imageDimensions(image) {
  const match = /-(\d+)x(\d+)-/.exec(image?.asset?._ref ?? '');
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1600, height: 900 };
}
