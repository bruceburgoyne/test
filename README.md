# Microsite

A three-page static site (Home, About, Contact) hosted on Vercel. The contact form saves messages to Supabase through a Vercel serverless function.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html`, `about.html`, `contact.html` | The three pages |
| `styles.css` | Shared styles (light and dark mode) |
| `contact.js` | Sends the contact form to `/api/contact` |
| `api/contact.js` | Vercel function that validates and saves the message to Supabase |
| `supabase/migrations/` | SQL for the `contact_messages` table |
| `vercel.json` | Clean URLs (`/about` rather than `/about.html`) |

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
