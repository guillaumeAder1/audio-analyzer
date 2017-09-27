// import track from '../public/assets/techno.mp3'

export default class _AudioAnalyzer {


    constructor(params) {
        console.log("constructor analyser init...", params);
        this.frequencies = null;
    }
    init() {
        let player = document.createElement('audio');
        player.classList.add('player-audio');
        player.src = './assets/techno.mp3';
        player.play();
        let context = new AudioContext();
        let source = context.createMediaElementSource(player);
        let analyser = context.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(context.destination);
        this.frequencies = new Uint8Array(analyser.frequencyBinCount);

        requestAnimationFrame(this.draw)

        document.body.appendChild(player);
    }

    draw() {
        console.log('drawing...', this.frequencies)
    }
}