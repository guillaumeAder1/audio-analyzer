/**
 * params
 * 
 * inputSrc : path to source file /path/to/src/ {.mp3 extention}
 */

export default class _AudioAnalyzer {


    constructor(params) {
        console.log("constructor analyser init...", params);
        this.isPlaying = false;

        this.emitBass = params.bassEvent;
        this.bassDown = false;

        //
        let audio = this.createAudioElement(params.inputSrc);
        let analyser = this.createAnalyzer(audio);
        this.initPlayEvent(audio, analyser.analyser, analyser.frequencies);

        this.bassMeasure = [];
    }

    /**
     * event on 'SPACE' bar key to play/stop music
     */
    initPlayEvent(player, analyser, frequencies) {
        document.addEventListener('keyup', (e) => {
            if (e.keyCode !== 32) {
                return false;
            }
            if (!this.isPlaying) {
                player.play();
                this.draw(true, frequencies, analyser);
            } else {
                player.pause();
                this.draw(false, frequencies, analyser)
            }
            this.isPlaying = !this.isPlaying;
        });
    }

    /** 
     * @param {*String} source - path/to/source/file
     */
    createAudioElement(source) {
        let player = document.createElement('audio');
        player.classList.add('player-audio');
        player.src = source || './assets/techno.mp3';
        player.loop = true;
        document.body.appendChild(player);
        this.player = player
        return this.player;
    }

    /**
     * 
     * @param {HTML5 Audio} player - audio element playing the song
     */
    createAnalyzer(player) {
        let context = new AudioContext();
        let source = context.createMediaElementSource(player);
        let analyser = context.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(context.destination);
        let frequencies = new Uint8Array(analyser.frequencyBinCount);
        return { analyser: analyser, frequencies: frequencies }
    }

    /**
     * @param {Boolean} activate - stop or play animation and get frequencies data
     */
    draw(activate, frequencies, analyser) {
        if (!activate) {
            window.cancelAnimationFrame(this.animFrame);
            return;
        }
        analyser.getByteFrequencyData(frequencies);
        this.animFrame = window.requestAnimationFrame(this.draw.bind(this, true, frequencies, analyser));
        // bass are index 0,1,2 of frequencies array
        this.getBassFreq(frequencies.slice(0, 3));

    }

    getBassFreq(basses) {

        let global = basses.reduce((acc, val) => {
            return acc + val;
        }) / basses.length;
        //console.log(global, this.getAverageBass(global));

        if (global > this.getAverageBass(global)) {
            if (!this.bassDown) return;
            this.bassDown = false;
            return this.emitBass();
        } else {
            this.bassDown = true;
            console.log("___minus___")
        }

    }

    getAverageBass(value) {
        this.bassMeasure.push(value);
        if (this.bassMeasure.length > 100) {
            this.bassMeasure.shift();
        }
        return this.bassMeasure.reduce((acc, val) => {
            return acc + val;
        }) / this.bassMeasure.length;
    }
}