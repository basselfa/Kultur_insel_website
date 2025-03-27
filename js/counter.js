
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

let state = "top";
let transitioning = false;
window.addEventListener("scroll", function () {

    let counter = document.getElementById("counterId");
    let counterElement = window.getComputedStyle(counter);
    console.log("Aktuelle Scrollposition:", window.scrollY);
    console.log(" Height" + counterElement.height);
    setTimeout(() => {
        if (state === "top" && window.scrollY > 3) {
            console.log("Scrolling nach unten...");
            state = "bottom";
            counter.style.height = window.innerHeight + "px"; // Volle Höhe des Viewports
        }
        else if (state === "bottom" && window.scrollY < 10) {
            state = "top";
            console.log("Scrolling nach oben...");
            counter.style.height = "0px";
        }
    }, 300);
        
});
