import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sanity({
      // Placeholder lets the site build with default content before a Sanity project exists.
      projectId: env.PUBLIC_SANITY_PROJECT_ID || 'notconfigured',
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-11-01',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
});
