import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Enable CORS for the static website
CORS(app)

EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASS = os.getenv('EMAIL_PASS')
RECIPIENT_EMAIL = 'radiusdiastudio@gmail.com'

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    if not EMAIL_USER or not EMAIL_PASS:
        print("CRITICAL ERROR: EMAIL_USER or EMAIL_PASS environment variables are not set. Please ensure you have a .env file with these values.")
        return jsonify({'success': False, 'message': 'Server configuration error (missing credentials)'}), 500

    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400

        # Create the email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"New Contact Form Submission from {name}"
        msg['Reply-To'] = email

        body = f"""
        You have received a new contact form submission from the Radiusdia Studio website.

        Name: {name}
        Email: {email}
        
        Message:
        {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # Connect to Gmail SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
        server.quit()

        return jsonify({'success': True, 'message': 'Email sent successfully'})
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'success': False, 'message': 'Failed to send email'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
