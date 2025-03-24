// Handles mobile-friendly audio playback
document.addEventListener('DOMContentLoaded', function() {
    const backgroundAudio = document.getElementById('background-audio');
    const musicButton = document.getElementById('music');
    
    if (backgroundAudio && musicButton) {
        // Pause audio by default on mobile devices
        if (window.innerWidth <= 768) {
            backgroundAudio.pause();
            if (musicButton) {
                musicButton.innerHTML = 'Play';
            }
        }
        
        // Add touch event for mobile devices
        document.addEventListener('touchstart', function() {
            if (backgroundAudio.paused) {
                // Do nothing, let user control with button
            }
        }, { once: true });
    }
});