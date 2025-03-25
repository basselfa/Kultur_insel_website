
const zielDatum = new Date("August 30, 2025 00:00:00").getTime();


const countdownTimer = setInterval(function() {

    const jetzt = new Date().getTime();
    
    const zeitDifferenz = zielDatum - jetzt;

    const tage = Math.floor(zeitDifferenz / (1000 * 60 * 60 * 24));
    const stunden = Math.floor((zeitDifferenz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuten = Math.floor((zeitDifferenz % (1000 * 60 * 60)) / (1000 * 60));
    const sekunden = Math.floor((zeitDifferenz % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(tage).padStart(2, '0');
    document.getElementById("hours").innerHTML = String(stunden).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minuten).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(sekunden).padStart(2, '0');

    if (zeitDifferenz < 0) {
        clearInterval(countdownTimer);
        document.getElementById("counter").innerHTML = "VERANSTALTUNG HAT BEGONNEN!";
    }
}, 1000);

let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner');
    const counter = document.querySelector('.counter');
    
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        banner.style.opacity = 0;
        counter.style.opacity = 1;
    } else if (currentScrollY < lastScrollY) {
        banner.style.opacity = 1;
        counter.style.opacity = 0;
    }

    lastScrollY = currentScrollY; // Aktuelle Position speichern
});