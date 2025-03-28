let lastClickTimeMenu = 0;

function toggleMenu(x) {
    let currentTime = new Date().getTime();
    if (currentTime - lastClickTimeMenu < 300) return;
    
    lastClickTimeMenu = currentTime;
    x.classList.toggle("change");

    let myNav = document.getElementById("menuId");
    let myNavElement = window.getComputedStyle(myNav);

    setTimeout(() => {
        myNav.style.height = myNavElement.height === "0px" ? window.innerHeight + "px" : "0px";
    }, 300);
}