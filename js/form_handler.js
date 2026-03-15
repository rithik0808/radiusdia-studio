document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Show loading state
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/radiusdiastudio@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success === "true") {
                btn.textContent = '✓ Message Sent!';
                btn.style.backgroundColor = '#2d6a4f'; // Green success
                btn.style.color = '#fff';
                form.reset();
            } else {
                throw new Error('FormSubmit Error');
            }
        } catch (err) {
            btn.textContent = '✗ Failed to send';
            btn.style.backgroundColor = '#c0392b'; // Red error
            btn.style.color = '#fff';
            console.error('Email error:', err);
        }

        // Reset button after 4 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 5000);
    });
});
