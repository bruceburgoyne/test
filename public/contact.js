const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');

const messages = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address, for example name@example.com.',
  message: 'Please tell us a little about what you need.',
};

function setError(field, text) {
  const error = document.getElementById(`${field.id}-error`);
  error.textContent = text;
  field.setAttribute('aria-invalid', text ? 'true' : 'false');
}

function validateField(field) {
  const valid = field.checkValidity() && field.value.trim() !== '';
  setError(field, valid ? '' : messages[field.name]);
  return valid;
}

const fields = Object.keys(messages).map((name) => form.elements[name]);

// Re-check a field once the person has left it, and clear errors as they fix them.
fields.forEach((field) => {
  field.addEventListener('blur', () => { if (field.value) validateField(field); });
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  status.className = 'form-status';

  const invalid = fields.filter((field) => !validateField(field));
  if (invalid.length) {
    invalid[0].focus();
    return;
  }

  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Something went wrong.');

    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    status.textContent = 'Thank you. Your message has been sent and we will be in touch.';
    status.classList.add('is-success');
  } catch (error) {
    status.textContent = `${error.message} Please try again.`;
    status.classList.add('is-error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});
