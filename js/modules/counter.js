/**
 * Countdown timer module for Kultur Insel website
 */
import { select, selectAll, throttle } from './utils.js';

// Target date for the countdown
const TARGET_DATE = new Date("August 30, 2025 00:00:00").getTime();

/**
 * Initialize the countdown timer
 */
export const initCountdown = () => {
  const daysElement = select('#days');
  const hoursElement = select('#hours');
  const minutesElement = select('#minutes');
  const secondsElement = select('#seconds');
  const counterElement = select('#counter');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.warn('Countdown elements not found');
    return;
  }

  // Update the countdown every second
  const countdownTimer = setInterval(() => {
    try {
      const now = new Date().getTime();
      const timeDifference = TARGET_DATE - now;

      // Calculate time units
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Update DOM elements
      daysElement.innerHTML = String(days).padStart(2, '0');
      hoursElement.innerHTML = String(hours).padStart(2, '0');
      minutesElement.innerHTML = String(minutes).padStart(2, '0');
      secondsElement.innerHTML = String(seconds).padStart(2, '0');

      // Check if countdown has ended
      if (timeDifference < 0) {
        clearInterval(countdownTimer);
        if (counterElement) {
          counterElement.innerHTML = "VERANSTALTUNG HAT BEGONNEN!";
        }
      }
    } catch (error) {
      console.error('Countdown error:', error);
      clearInterval(countdownTimer);
    }
  }, 1000);
};

/**
 * Initialize scroll animations for the counter
 */
export const initCounterAnimations = () => {
  const counter = select('#counterId');
  const banner = select('#background-banner-video');
  const countUnits = selectAll('.counter__unit');
  
  if (!counter || !banner) {
    return;
  }

  // Set initial state
  let state = "top";
  counter.style.opacity = 0;

  // Reset scroll position on page load
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    state = "top";
    counter.style.opacity = 0;
  });

  // Handle scroll events with throttling to improve performance
  window.addEventListener("scroll", throttle(function() {
    try {
      if (state === "top" && window.scrollY > 3) {
        state = "bottom";
        counter.style.opacity = 1;
        banner.style.opacity = 0;

        // Animate counter units
        countUnits.forEach(unit => {
          unit.style.animation = "none";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              unit.style.animation = "dropDown 0.4s ease forwards";
            });
          });
        });
      } 
      else if (state === "bottom" && window.scrollY < 10) {
        state = "top";
        
        // Animate counter units
        countUnits.forEach(unit => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              unit.style.animation = "climbUp 0.4s ease backwards";
            });
          });
        });
        
        // Delay opacity changes for smoother transition
        setTimeout(() => {
          counter.style.opacity = 0;
          banner.style.opacity = 1;
        }, 1000);
      }
    } catch (error) {
      console.error('Counter animation error:', error);
    }
  }, 300)); // Throttle to run at most once every 300ms
};