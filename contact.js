const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  status.className = 'form-status';

  if (!form.checkValidity()) {
    status.textContent = 'Please fill in your name, a valid email address and a message.';
    status.classList.add('is-error');
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
    status.textContent = 'Thank you. Your message has been sent.';
    status.classList.add('is-success');
  } catch (error) {
    status.textContent = `${error.message} Please try again.`;
    status.classList.add('is-error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});
