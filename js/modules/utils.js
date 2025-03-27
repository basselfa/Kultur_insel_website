/**
 * Utility functions for Kultur Insel website
 */

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Select DOM element with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} - The selected element or null if not found
 */
export const select = (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
};

/**
 * Select multiple DOM elements with error handling
 * @param {string} selector - CSS selector
 * @returns {NodeList} - The selected elements or empty NodeList if none found
 */
export const selectAll = (selector) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`No elements found: ${selector}`);
  }
  return elements;
};