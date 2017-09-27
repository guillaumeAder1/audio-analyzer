// import track from '../public/assets/techno.mp3'

export default class _AudioAnalyzer {

    constructor(params) {

        console.log("constructor analyser init...", params);

    }
    init() {
        var player = document.createElement('audio');
        player.classList.add('player-audio');
        player.src = './assets/techno.mp3';
        player.play();
        document.body.appendChild(player);
    }
}