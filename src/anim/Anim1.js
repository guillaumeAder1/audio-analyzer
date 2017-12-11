// import * as d3 from 'd3'
import AnimationModel from '../model/animationModel'


export default class _Anim1 extends AnimationModel {

    constructor(params) {
        super(params, params)
        this.svg = params.stage;
    }
    createShape() {
        this.node = this.svg.append('g').attr('class', 'anim1');
        let circle = this.node.append('circle')
            .attr('cx', 50)
            .attr('cy', 50)
            .attr('r', 50)
            // .transition()
            // .attr('r', 0)
            // .remove();
    }

    // animate() {
    //     this.node.selectAll('circle').attr('r', 50).transition()
    //         .attr('r', 100)
    // }
    // eventReceived() {
    //     console.log('Received Anim 1...')
    //     this.animate();
    //     this._alert("anim 1")
    // }
    // startAnimation() {
    //     this.createShape()
    // }

    // removeAnimation() {
    //     this.node.transition()
    //         .style('opacity', 0).remove()
    // }

}