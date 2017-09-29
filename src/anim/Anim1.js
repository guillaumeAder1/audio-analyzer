// import * as d3 from 'd3'


export default class _Anim1 {

    constructor(params) {
        this.svg = params.stage;
    }
    createShape() {
        this.node = this.svg.append('g').attr('class', 'anim1');
        let circle = this.node.append('circle')
            .attr('cx', 150)
            .attr('cy', 150)
            .attr('r', 50)
            // .transition()
            // .attr('r', 0)
            // .remove();
    }

    animate() {
        this.node.selectAll('circle').attr('r', 50).transition()
            .attr('r', 100)
    }
    eventReceived() {
        console.log('Received Anim 1...')
        this.animate()
    }
    startAnimation() {
        this.createShape()
    }

    removeAnimation() {
        this.node.transition()
            .style('opacity', 0).remove()
    }

}