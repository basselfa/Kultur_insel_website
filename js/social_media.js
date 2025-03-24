// Social media functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize social media sharing functionality
    const socialLinks = document.querySelectorAll('.fa-facebook, .fa-instagram');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Social media link will be available soon!');
            }
        });
    });
});