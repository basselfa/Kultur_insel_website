// Social media icon initialization and fallback
document.addEventListener('DOMContentLoaded', function() {
    // Check if Font Awesome is loaded properly
    const isFontAwesomeLoaded = (function() {
        // Create a test element with a Font Awesome icon
        const testIcon = document.createElement('i');
        testIcon.className = 'fa fa-facebook';
        testIcon.style.visibility = 'hidden';
        document.body.appendChild(testIcon);
        
        // Check if the icon has the correct styling
        const styles = window.getComputedStyle(testIcon);
        const fontFamily = styles.getPropertyValue('font-family');
        const display = styles.getPropertyValue('display');
        
        // Clean up
        document.body.removeChild(testIcon);
        
        // Return true if Font Awesome seems to be loaded
        return fontFamily.includes('FontAwesome') || display === 'inline-block';
    })();
    
    // If Font Awesome is not loaded, add fallback classes
    if (!isFontAwesomeLoaded) {
        console.log('Font Awesome not properly loaded, applying fallback');
        
        // Get all social media links
        const socialLinks = document.querySelectorAll('#social-media a');
        
        // Add fallback class
        socialLinks.forEach(link => {
            link.classList.add('social-fallback');
            
            // Add text fallback based on the icon class
            if (link.classList.contains('fa-facebook')) {
                link.textContent = 'FB';
            } else if (link.classList.contains('fa-instagram')) {
                link.textContent = 'IG';
            } else if (link.classList.contains('fa-twitter')) {
                link.textContent = 'TW';
            } else {
                link.textContent = '•';
            }
        });
        
        // Add fallback styles
        const style = document.createElement('style');
        style.textContent = `
            .social-fallback {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-weight: bold !important;
                text-decoration: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Fix icon alignment on all browsers
    const socialIcons = document.querySelectorAll('.fa');
    socialIcons.forEach(icon => {
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
    });
});