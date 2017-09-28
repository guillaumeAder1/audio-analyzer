/**
 * params
 * 
 * inputSrc : path to source file /path/to/src/ {.mp3 extention}
 */

export default class _AudioAnalyzer {


    constructor(params) {
        console.log("constructor analyser init...", params);
        this.isPlaying = false;
        //
        this.createAnalyzer(this.createAudioElement(params.inputSrc));
        this.initPlayEvent();
    }

    /**
     * event on 'SPACE' bar key to play/stop music
     */
    initPlayEvent() {
        document.addEventListener('keyup', (e) => {
            if (!e.keyCode === 32) return;
            if (!this.isPlaying) {
                this.player.play();
                this.draw(true);
            } else {
                this.player.pause();
                this.draw(false)
            }
            this.isPlaying = !this.isPlaying;
        })
    }

    /** 
     * @param {*String} source - path/to/source/file
     */
    createAudioElement(source) {
        this.player = document.createElement('audio');
        this.player.classList.add('player-audio');
        this.player.src = source || './assets/techno.mp3';
        this.player.loop = true;
        document.body.appendChild(this.player);
        return this.player;
    }

    /**
     * 
     * @param {html5 Audio} player - audio element playing the song
     */
    createAnalyzer(player) {
        console.log("Analyzer....");
        let context = new AudioContext();
        let source = context.createMediaElementSource(player);
        this.analyser = context.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
    }

    /**
     * @param {Boolean} activate - stop or play animation and get frequencies data
     */
    draw(activate) {
        console.log('drawing...', this.frequencies)
        if (!activate) {
            window.cancelAnimationFrame(this.animFrame);
            return;
        }
        this.analyser.getByteFrequencyData(this.frequencies);
        this.animFrame = window.requestAnimationFrame(this.draw.bind(this))
    }
}