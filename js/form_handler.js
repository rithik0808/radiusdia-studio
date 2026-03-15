document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with Public Key
    // You will need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_email: 'radiusdiastudio@gmail.com'
        };

        try {
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
            const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);

            if (response.status === 200) {
                btn.textContent = '✓ Message Sent!';
                btn.style.backgroundColor = '#2d6a4f';
                btn.style.color = '#fff';
                form.reset();
            } else {
                throw new Error('EmailJS Error');
            }
        } catch (err) {
            btn.textContent = '✗ Failed to send';
            btn.style.backgroundColor = '#c0392b';
            btn.style.color = '#fff';
            console.error('Email error:', err);
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 4000);
    });
});
