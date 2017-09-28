import * as d3 from 'd3'

export default class _Stage {

    constructor(params) {

        let w = window.innerWidth;
        let h = window.innerHeight;

        // let h = window.document.body.offsetHeight
        // let w = window.document.body.offsetWidth
        console.log(w, h)

        this.initSvg(w, h)
    }

    initSvg(width, height) {

        let stage = d3.select('body').append('svg')
            .attr('id', 'stage')
            .attr('width', width)
            .attr('height', height)
        console.log(stage)
    }
}