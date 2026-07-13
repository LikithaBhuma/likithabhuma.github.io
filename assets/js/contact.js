const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm && contactStatus) {
  const placeholderEmail = 'YOUR_EMAIL_HERE';
  if (contactForm.action.includes(placeholderEmail)) {
    contactStatus.innerHTML = '<div class="alert alert-warning border-0 shadow-sm">Please replace <strong>YOUR_EMAIL_HERE</strong> in the contact form action and email link with your actual email address for submissions to work.</div>';
  }

  contactForm.addEventListener('submit', async (e) => {
    if (contactForm.action.includes(placeholderEmail)) {
      e.preventDefault();
      contactStatus.innerHTML = '<div class="alert alert-warning border-0 shadow-sm">The contact form is not configured yet. Update the action email address in contact.html and try again.</div>';
      return;
    }

    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      const result = await response.json();
      const success = result.success === 'true' || response.ok;

      if (success) {
        contactStatus.innerHTML = '<div class="alert alert-success border-0 shadow-sm">Thanks! Your message has been sent successfully.</div>';
        contactForm.reset();
      } else {
        throw new Error('Submission response was not successful.');
      }
    } catch (error) {
      console.error(error);
      contactStatus.innerHTML = '<div class="alert alert-danger border-0 shadow-sm">Unable to send your message right now. Please try again later or email directly.</div>';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    }
  });
}
