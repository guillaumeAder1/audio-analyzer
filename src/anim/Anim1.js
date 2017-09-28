// import * as d3 from 'd3'


export default class _Anim1 {

    constructor(params) {
        this.svg = params.stage;
    }
    createShape() {
        let circle = this.svg.append('circle')
            .attr('cx', 150)
            .attr('cy', 150)
            .attr('r', 50).transition()
            .attr('r', 0)
            .remove();
    }
    eventReceived() {
        console.log('Received Anim 1...')
        this.createShape()
    }

}