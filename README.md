# Microsite

A three-page static site (Home, About, Contact) hosted on Vercel. The contact form saves messages to Supabase through a Vercel serverless function.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html`, `about.html`, `contact.html` | The three pages |
| `styles.css` | Shared styles and design tokens (light and dark mode) |
| `site.js` | Footer year and subtle scroll reveal |
| `contact.js` | Sends the contact form to `/api/contact` |
| `api/contact.js` | Vercel function that validates and saves the message to Supabase |
| `supabase/migrations/` | SQL for the `contact_messages` table |
| `vercel.json` | Clean URLs (`/about` rather than `/about.html`) |

## Design

Generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill for a warm, editorial consultancy site:

- **Page pattern:** Trust & Authority + Conversion (credibility hero, proof stats, services, clear call to action)
- **Style:** Editorial Grid / Magazine (numbered sections, rules, pull quote, drop cap) with a Nature Distilled palette
- **Type:** Libre Bodoni for headings, Public Sans for body text (Google Fonts)
- **Colour:** cream background, terracotta primary, warm dark mode; tokens are at the top of `styles.css`
- **Accessibility:** skip link, visible focus rings, 44px touch targets, inline form errors, reduced-motion support

Text in [square brackets] and the `00` stats are placeholders to replace with real, verified content before launch.

## Set up Supabase

1. In the Supabase dashboard, open **SQL Editor** and run `supabase/migrations/20261103000000_contact_messages.sql`.
   (Or, with the Supabase CLI linked to the project: `supabase db push`.)
2. From **Project Settings > API**, note the project URL and the `service_role` key.

The table has row level security switched on with no policies, so the public anon key cannot read or write it. Only the server-side function can insert rows. Never put the service role key in front-end code.

## Set up Vercel

1. Import this GitHub repository in Vercel. No build command or output directory is needed.
2. Under **Project Settings > Environment Variables**, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Deploy. Messages appear in Supabase under **Table Editor > contact_messages**.

## Run locally

```bash
npm i -g vercel
vercel link
vercel env pull .env.local
vercel dev
```

Opening the HTML files directly works for the pages, but the contact form needs `vercel dev` so the `/api/contact` function runs.
