const musicButton = document.getElementById('music');
const backgroundAudio = document.getElementById('background-audio');
function playPauseMusic() {
    console.log('Button geklickt');
    if (backgroundAudio.paused) {
        console.log('Musik wird abgespielt');
        backgroundAudio.play();
        musicButton.innerHTML = 'Pause';
    } else {
        console.log('Musik wird pausiert');
        backgroundAudio.pause();
        musicButton.innerHTML = 'Play';
    }
}

console.log(backgroundAudio.play());
backgroundAudio.addEventListener("play", () => {
    musicButton.innerHTML = "Pause";
});

// const backgroundAudio = document.getElementById("background-audio");
// const musicButton = document.getElementById("music");

// function playPauseMusic() {
//     console.log("Button geklickt");
//     if (backgroundAudio.paused) {
//         console.log("Musik wird abgespielt");
//         backgroundAudio.play();
//     } else {
//         console.log("Musik wird pausiert");
//         backgroundAudio.pause();
//     }
// }
// console.log(backgroundAudio.play());
// backgroundAudio.addEventListener("play", () => {
//     musicButton.innerHTML = "Pause";
// });

// backgroundAudio.addEventListener("pause", () => {
//     musicButton.innerHTML = "Play";
// });

// musicButton.addEventListener("click", playPauseMusic);
