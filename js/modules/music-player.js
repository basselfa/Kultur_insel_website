/**
 * Music player module for Kultur Insel website
 */
import { select } from './utils.js';

/**
 * Initialize music player functionality
 */
export const initMusicPlayer = () => {
  const musicButton = select('#music');
  const backgroundAudio = select('#background-audio');
  
  if (!musicButton || !backgroundAudio) {
    return; // Exit if elements aren't found
  }

  // Set up click handler for music toggle
  musicButton.addEventListener('click', () => {
    try {
      if (backgroundAudio.paused) {
        const playPromise = backgroundAudio.play();
        
        // Handle asynchronous play operation
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              musicButton.innerHTML = 'Pause';
            })
            .catch(error => {
              console.error('Audio playback failed:', error);
              // Provide user feedback
              musicButton.innerHTML = 'Error';
              setTimeout(() => {
                musicButton.innerHTML = 'Play';
              }, 2000);
            });
        }
      } else {
        backgroundAudio.pause();
        musicButton.innerHTML = 'Play';
      }
    } catch (error) {
      console.error('Music player error:', error);
    }
  });
};