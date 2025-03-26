
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
let isCtrlPressed = false;


window.addEventListener("keydown", function (event) {
    if (event.ctrlKey) {
        isCtrlPressed = true;
    }
});

window.addEventListener("keyup", function (event) {
    if (!event.ctrlKey) {
        isCtrlPressed = false;
    }
});
let lastClickTime = 0;

window.addEventListener("scroll", function () { 

    if (isCtrlPressed) return;
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 4000) {
        console.log("Bitte warte 2 Sekunden, bevor du erneut klickst.");
        return; // Verhindert weiteres Klicken für 2 Sekunden
    }
    const banner = document.querySelector(".banner");
    const counter = document.querySelector(".counter");

    const scrollPosition = window.scrollY;
    const fadeSpeed = 0.02;

    const isScrollingDown = scrollPosition > lastScrollY;
    const isScrollingUp = scrollPosition < lastScrollY;

    lastScrollY = scrollPosition; // Update for next scroll event

    if (isScrollingDown && window.scrollY > 0  ){
        counter.classList.remove('hide');

        counter.classList.add('animate');
        console.log('scrolling down');
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 200);
    }
    else if ( scrollPosition!=1 && isScrollingUp && window.scrollY < document.body.scrollHeight) {
        counter.classList.remove('animate');
        counter.classList.add('hide');
        setTimeout(() => {
            window.scrollTo(1, 1);
        }, 9000);
        console.log('scrolling up');
    }
    console.log(scrollPosition);

    // let bannerOpacity = 1 - scrollPosition / fadeSpeed;
    // let counterOpacity = scrollPosition / fadeSpeed;

    // bannerOpacity = Math.max(bannerOpacity, 0);
    // counterOpacity = Math.min(counterOpacity, 1);

    // banner.style.opacity = bannerOpacity;
    // counter.style.opacity = counterOpacity;
});