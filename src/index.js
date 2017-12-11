import _AudioAnalyzer from './AudioAnalyzer.js'
import _Stage from './Stage.js'
import './style/main.css'


const stage = new _Stage();

let analyzer = new _AudioAnalyzer({
    inputSrc: false,
    bassEvent: stage.eventReceived.bind(stage),
    allFreqEvent: stage.frequencies.bind(stage)
});




// example observable
// http://www.datchley.name/es6-eventemitter/