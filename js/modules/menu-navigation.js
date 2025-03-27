/**
 * Menu navigation module for Kultur Insel website
 */
import { select } from './utils.js';

/**
 * Initialize menu navigation functionality
 */
export const initMenuNavigation = () => {
  const menuToggle = select('#menuToggle');
  const navMenu = select('#navMenu');
  
  if (!menuToggle || !navMenu) {
    return; // Exit if elements aren't found
  }

  // Toggle menu on click
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('menu-icon--active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && e.target !== menuToggle) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('menu-icon--active');
    }
  });
};