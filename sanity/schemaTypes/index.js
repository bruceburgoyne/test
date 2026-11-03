import { titledItem, stat, callToAction } from './objects';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';

export const schemaTypes = [titledItem, stat, callToAction, siteSettings, homePage, aboutPage, contactPage];

export const singletonTypes = new Set(['siteSettings', 'homePage', 'aboutPage', 'contactPage']);
