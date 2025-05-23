const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');


menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove('active');
    }
});