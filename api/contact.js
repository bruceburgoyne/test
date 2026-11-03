// Vercel serverless function: saves contact form submissions to Supabase.
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set in the Vercel project.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name = '', email = '', message = '', company = '' } = req.body || {};

  // Honeypot filled in: pretend it worked and drop it.
  if (company) return res.status(200).json({ ok: true });

  const clean = {
    name: String(name).trim().slice(0, 200),
    email: String(email).trim().slice(0, 320),
    message: String(message).trim().slice(0, 5000),
  };

  if (!clean.name || !clean.message || !EMAIL_PATTERN.test(clean.email)) {
    return res.status(400).json({ error: 'Please provide a name, a valid email address and a message.' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase environment variables are not set.');
    return res.status(500).json({ error: 'The form is not set up yet.' });
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
    return res.status(502).json({ error: 'We could not send your message.' });
  }

  return res.status(200).json({ ok: true });
}
