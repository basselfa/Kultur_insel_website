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