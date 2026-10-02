const form = document.getElementById('contact-form');
const button = form.querySelector('button[type="submit"]');
const status = document.getElementById('form-status');
let sending = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;

  sending = true;
  button.disabled = true;
  button.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.dataset.state = 'pending';
  status.textContent = 'Sending your message…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error('Submission was not accepted');
    }
    if (/activat|confirm.*email|verify.*email/i.test(result.message || '')) {
      throw new Error('Email confirmation is pending');
    }
    status.dataset.state = 'success';
    status.textContent = 'Message sent. Thanks for getting in touch!';
    form.reset();
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error.name === 'AbortError'
      ? 'Sending took too long to confirm. Your message is still here. Please try again later or email tobiaspk1@gmail.com directly.'
      : 'We couldn’t confirm that your message was sent. Your message is still here. Please try again or email tobiaspk1@gmail.com directly.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    button.disabled = false;
    button.textContent = 'Send message';
    form.removeAttribute('aria-busy');
  }
});

button.disabled = false;
