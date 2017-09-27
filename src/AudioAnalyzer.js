// import track from '../public/assets/techno.mp3'

export default class _AudioAnalyzer {


    constructor(params) {
        console.log("constructor analyser init...", params);
        this.frequencies = "toto";
    }
    init() {
        let player = document.createElement('audio');
        player.classList.add('player-audio');
        player.src = './assets/techno.mp3';
        //player.loop = true;
        player.play();
        let context = new AudioContext();
        let source = context.createMediaElementSource(player);
        this.analyser = context.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
        this.draw()
        document.body.appendChild(player);
    }

    draw() {
        this.analyser.getByteFrequencyData(this.frequencies)
        console.log('drawing...', this.frequencies)
        window.requestAnimationFrame(this.draw.bind(this))
    }
}