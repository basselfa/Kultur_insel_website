let lastClickTimeMenu = 0;
function toggleMenu(x) {
    let currentTime = new Date().getTime();
    if (currentTime - lastClickTimeMenu < 300) {
        console.log("Bitte warte 2 Sekunden, bevor du erneut klickst.");
        return;
    }
    lastClickTimeMenu = currentTime;
    x.classList.toggle("change");
    console.log("Menü-Button aktiviert");

    let myNav = document.getElementById("menuId");
    let myNavElement = window.getComputedStyle(myNav);

    setTimeout(() => {
        if (myNavElement.height === "0px") {
            console.log("Menü geöffnet");
            myNav.style.height = window.innerHeight + "px"; // Volle Höhe des Viewports
        } else {
            console.log("Menü geschlossen");
            myNav.style.height = "0px";
        }
    }, 300);
}