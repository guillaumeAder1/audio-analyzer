// OTHER resou
// https://github.com/trippedout/beatdetect 
//https: //www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/
var t = require('./lib/beatdetector.js')

/**
 * params
 * 
 * inputSrc : path to source file /path/to/src/ {.mp3 extention}
 */

export default class _AudioAnalyzer {


    constructor(params) {
        // this.song = new stasilo.BeatDetector({
        //     sens: 5.0,
        //     visualizerFFTSize: 256,
        //     analyserFFTSize: 256,
        //     passFreq: 600,
        //     url: "./assets/classAwayofsun.mp3"
        // });


        // this.test()
        this.emitBass = params.bassEvent;

        // document.addEventListener('keyup', (e) => {
        //     console.log(Date.now())
        // })

        //return
        console.log(t)
        console.log("constructor analyser init...", params);
        this.isPlaying = false;

        this.bassDown = false;

        //
        let audio = this.createAudioElement(params.inputSrc);
        let analyser = this.createAnalyzer(audio);
        this.initPlayEvent(audio, analyser.analyser, analyser.frequencies);

        this.bassMeasure = [];
    }

    test() {

        if (this.song.isOnBeat()) {
            console.log("okokok")
            this.emitBass();
        }
        window.requestAnimationFrame(this.test.bind(this));

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
                player.currentTime = 100
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
        player.src = source || './assets/classAwayofsun.mp3';
        //player.src = source || './assets/techno.mp3';
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
        // this.getBassFreq(frequencies.slice(0, 3));

        this.getBassFreq(frequencies);

    }

    getBassFreq(basses) {

        let global = basses.reduce((acc, val) => {
            return acc + val;
        }) / basses.length;

        if (global > this.getAverageBass(global)) {
            if (!this.bassDown) return;
            this.bassDown = false;
            return this.emitBass();
        } else {
            this.bassDown = true;
            // console.log("___minus___")
        }

    }

    getAverageBass(value) {
        this.bassMeasure.push(value);
        if (this.bassMeasure.length > 200) {
            this.bassMeasure.shift();
        }
        return this.bassMeasure.reduce((acc, val) => {
            return acc + val;
        }) / this.bassMeasure.length;
    }
}