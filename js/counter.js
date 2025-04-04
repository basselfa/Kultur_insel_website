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

window.addEventListener("load", function() {
    window.scrollTo(0, 0);
    state = "top";
    document.getElementById("counterId").style.opacity = 0;
});

let state = "top";
window.addEventListener("scroll", function() {
    let counter = document.getElementById("counterId");
    let banner = document.getElementById("background-banner-video");
    let countUnits = document.getElementsByClassName("count-unit");

    setTimeout(() => {
        if (state === "top" && window.scrollY > 3) {
            state = "bottom";
            counter.style.opacity = 1;
            banner.style.opacity = 0;

            for (let unit of countUnits) {
                unit.style.animation = "none";
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        unit.style.animation = "dropDown 0.4s ease forwards";
                    });
                });
            }
        } else if (state === "bottom" && window.scrollY < 10) {
            state = "top";
            for (let unit of countUnits) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        unit.style.animation = "climbUp 0.4s ease backwards";
                    });
                });
            }
            setTimeout(() => {
                counter.style.opacity = 0;
                banner.style.opacity = 1;
            }, 1000);
        }
    }, 300);
});
