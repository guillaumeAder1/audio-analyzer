import * as d3 from 'd3'


export default class _Anim1 {

    constructor() {

        console.log(this)
        this.createSvg()
    }
    createSvg() {
        const svg = d3.select('body');
    }
    eventReceived() {
        console.log('Received Anim 1...')
    }

}