const backgroundAudio = document.getElementById("background-audio");
const musicButton = document.getElementById("music-button");

function playPauseMusic() {
    console.log("Button geklickt");
    if (backgroundAudio.paused) {
        console.log("Musik wird abgespielt");
        backgroundAudio.play();
    } else {
        console.log("Musik wird pausiert");
        backgroundAudio.pause();
    }
}

backgroundAudio.addEventListener("play", () => {
    musicButton.innerHTML = "Pause";
});

backgroundAudio.addEventListener("pause", () => {
    musicButton.innerHTML = "Play";
});

musicButton.addEventListener("click", playPauseMusic);
