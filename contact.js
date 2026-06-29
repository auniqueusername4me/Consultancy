document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission Logic
    const contactForm = document.getElementById('contact-inquiry-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Submit Button Visual Loading State
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Simulate success callback
                alert(`Thank you, ${name}! Your inquiry has been successfully sent to Sample Consultancy. We will reply to your email at ${email} shortly.`);
                
                // Reset form inputs
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }
});
