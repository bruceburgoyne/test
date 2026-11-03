# Microsite

A three-page site (Home, About, Contact) built with [Astro](https://astro.build) and hosted on Vercel. Page content is managed in [Sanity](https://www.sanity.io), with the editing Studio at `/admin`. The contact form saves messages to Supabase.

## How content updates work

1. An editor changes content in the Studio at `yoursite.com/admin` and clicks **Publish**.
2. A Sanity webhook calls a Vercel Deploy Hook.
3. Vercel rebuilds the site with the new content, usually within a minute or two.

Until a Sanity project is connected, the site builds with the default copy in `src/lib/defaults.js`. Any field left empty in Sanity also falls back to these defaults. If Sanity is connected but can't be reached during a build, the build fails on purpose so Vercel keeps the last good version live.

## Structure

| Path | Purpose |
| --- | --- |
| `src/pages/` | The three pages, plus `api/contact.js` (the form endpoint) |
| `src/layouts/Layout.astro` | Shared head, header and footer |
| `src/components/` | Call to action band and icon |
| `src/lib/content.js` | Fetches content from Sanity and fills gaps from the defaults |
| `src/lib/defaults.js` | Default and placeholder copy |
| `sanity/schemaTypes/` | The content model editors see in the Studio |
| `sanity/structure.js` | Studio sidebar: one entry per page plus site settings |
| `sanity.config.js` | Studio configuration |
| `public/` | Styles, scripts and the fallback hero image |
| `supabase/migrations/` | SQL for the `contact_messages` table |

## What editors can change

- **Site settings:** site name, footer line, email, phone, address
- **Homepage:** hero text and image (with hotspot cropping), stats, services, client quote, call to action
- **About page:** introduction, story paragraphs, principles, call to action
- **Contact page:** introduction and "What happens next" steps
- **Every page:** the search engine description

Layout and design are fixed in code, so editors can't break the page structure.

## Design

Generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill for a warm, editorial consultancy site:

- **Page pattern:** Trust & Authority + Conversion (credibility hero, proof stats, services, clear call to action)
- **Style:** Editorial Grid / Magazine (numbered sections, rules, pull quote, drop cap) with a Nature Distilled palette
- **Type:** Libre Bodoni for headings, Public Sans for body text (Google Fonts)
- **Colour:** cream background, terracotta primary, warm dark mode; tokens are at the top of `public/styles.css`
- **Accessibility:** skip link, visible focus rings, 44px touch targets, inline form errors, reduced-motion support

Text in [square brackets] and the `00` stats are placeholders to replace with real, verified content before launch.

## Set up Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) with a dataset called `production` (public).
2. Note the **Project ID**.
3. Under **API > CORS origins**, add `http://localhost:4321` and your live site address (for example `https://yoursite.vercel.app`). Tick **Allow credentials** for both, because the Studio runs on those addresses.
4. Under **Members**, invite editors with the **Editor** role.

## Set up Supabase

1. In the Supabase dashboard, open **SQL Editor** and run `supabase/migrations/20261103000000_contact_messages.sql`.
2. From **Project Settings > API**, note the project URL and the `service_role` key.

The table has row level security switched on with no policies, so the public anon key cannot read or write it. Only the server-side endpoint can insert rows. Never put the service role key in front-end code.

## Set up Vercel

1. In the Vercel project, set **Framework Preset** to **Astro** (it is usually detected automatically).
2. Under **Settings > Environment Variables**, add:
   - `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` (`production`)
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
3. Under **Settings > Git > Deploy Hooks**, create a hook for the `main` branch and copy its URL.
4. In Sanity under **API > Webhooks**, add a webhook with that URL, triggered on create, update and delete for the dataset `production`.
5. Redeploy.

## Run locally

Requires Node 22.23.4 or later.

```bash
cp .env.example .env
npm install
npm run dev
```

The site runs at http://localhost:4321 and the Studio at http://localhost:4321/admin. The contact form needs the Supabase variables in `.env` to save messages.
