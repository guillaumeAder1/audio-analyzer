import _ from 'lodash'
import _AudioAnalyzer from './AudioAnalyzer.js'
import _Anim1 from './Anim1.js'
import _Anim2 from './Anim2.js'


let anim = new _Anim1();
let anim2 = new _Anim2();


let analyzer = new _AudioAnalyzer({
    inputSrc: false,
    bassEvent: anim.eventReceived
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        analyzer.emitBass = anim2.eventReceived
    }
})

// example observable
// http://www.datchley.name/es6-eventemitter/