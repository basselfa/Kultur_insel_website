/**
 * Form handler module for Kultur Insel website
 */
import { select } from './utils.js';

/**
 * Initialize form handling for contact forms
 */
export const initFormHandlers = () => {
  const contactForm = select('#contactForm');
  
  if (!contactForm) {
    return; // Exit if form isn't found
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Check if EmailJS is available
      if (typeof emailjs !== 'undefined') {
        const successMessage = select('#successMessage');
        const submitButton = select('#submitButton');
        
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }
        
        // Send the email using EmailJS
        await emailjs.send(
          'service_id', // Replace with your service ID
          'template_id', // Replace with your template ID
          formValues
        );
        
        // Show success message
        if (successMessage) {
          successMessage.style.display = 'block';
        }
        
        // Reset form and button
        contactForm.reset();
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
        
        // Hide success message after delay
        setTimeout(() => {
          if (successMessage) {
            successMessage.style.display = 'none';
          }
        }, 5000);
      } else {
        console.error('EmailJS is not loaded');
        alert('Error: Email service is not available. Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again later.');
      
      const submitButton = select('#submitButton');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    }
  });
};