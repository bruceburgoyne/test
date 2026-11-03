// Serverless endpoint on Vercel: saves contact form submissions to Supabase.
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set in the Vercel project.

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export async function POST({ request }) {
  const body = await request.json().catch(() => ({}));
  const { name = '', email = '', message = '', company = '' } = body;

  // Honeypot filled in: pretend it worked and drop it.
  if (company) return json(200, { ok: true });

  const clean = {
    name: String(name).trim().slice(0, 200),
    email: String(email).trim().slice(0, 320),
    message: String(message).trim().slice(0, 5000),
  };

  if (!clean.name || !clean.message || !EMAIL_PATTERN.test(clean.email)) {
    return json(400, { error: 'Please provide a name, a valid email address and a message.' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase environment variables are not set.');
    return json(500, { error: 'The form is not set up yet.' });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(clean),
  });

  if (!response.ok) {
    console.error('Supabase insert failed:', response.status, await response.text());
    return json(502, { error: 'We could not send your message.' });
  }

  return json(200, { ok: true });
}

export function ALL() {
  return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
}
