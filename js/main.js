/**
 * Main JavaScript entry point for Kultur Insel website
 */
import { initMenuNavigation } from './modules/menu-navigation.js';
import { initMusicPlayer } from './modules/music-player.js';
import { initCountdown, initCounterAnimations } from './modules/counter.js';
import { initFormHandlers } from './modules/form-handler.js';

// Initialize all modules when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize menu navigation
    initMenuNavigation();
    
    // Initialize music player if present on the page
    initMusicPlayer();
    
    // Initialize countdown timer and animations if present on the page
    initCountdown();
    initCounterAnimations();
    
    // Initialize form handlers if present on the page
    initFormHandlers();
    
    console.log('Kultur Insel website initialized successfully');
  } catch (error) {
    console.error('Error initializing website:', error);
  }
});