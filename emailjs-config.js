// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("JlnOLzY_Wxh0pl8zA"); // You need to replace this with your actual EmailJS public key
    
    // Form submission handler
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Wird gesendet...';
                submitButton.disabled = true;
                
                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    to_email: 'ba.f.prosoft@gmail.com',
                    subject: subject,
                    message: message
                };
                
                // Send email using EmailJS
                emailjs.send('service_1za8ewa', 'template_xwczo1h', templateParams) // You need to replace with your actual service and template IDs
                    .then(function() {
                        showMessage('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
                        contactForm.reset();
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    })
                    .catch(function(error) {
                        console.error('EmailJS error:', error);
                        showMessage('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.', 'error');
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    });
            });
        }
    });
    
    // Function to show success/error messages
    function showMessage(text, type) {
        const messageElement = document.getElementById('form-message');
        if (messageElement) {
            messageElement.textContent = text;
            messageElement.className = type;
            messageElement.style.display = 'block';
            
            // Auto-hide message after 5 seconds
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
})();