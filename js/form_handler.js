document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                btn.textContent = '✓ Message Sent!';
                btn.style.backgroundColor = '#2d6a4f';
                btn.style.color = '#fff';
                form.reset();
            } else {
                btn.textContent = '✗ Failed. Try again.';
                btn.style.backgroundColor = '#c0392b';
                btn.style.color = '#fff';
                console.error('Server error:', result.message);
            }
        } catch (err) {
            btn.textContent = '✗ Could not connect to server';
            btn.style.backgroundColor = '#c0392b';
            btn.style.color = '#fff';
            console.error('Network error:', err);
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 4000);
    });
});
