export default class _Anim2 {

    constructor(params) {
        this.svg = params.stage;
    }
    createShape() {
        let rect = this.svg.append('circle')
            .attr('cx', 350)
            .attr('cy', 350)
            .style('fill', 'red')
            .attr('r', 50).transition()
            .attr('r', 0)
            .remove();
    }
    eventReceived() {
        console.log('Received Anim 2...')
        this.createShape()
    }
}