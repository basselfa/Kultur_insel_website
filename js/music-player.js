const musicButton = document.getElementById('music');
const backgroundAudio = document.getElementById('background-audio');
function playPauseMusic() {
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        musicButton.innerHTML = 'Pause';
    } else {
        backgroundAudio.pause();
        musicButton.innerHTML = 'Play';
    }
}
