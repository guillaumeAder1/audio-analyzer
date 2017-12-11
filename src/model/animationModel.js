export default class AnimationModel {
    constructor(params) {
        this.svg = params.stage
        this.name = params.name || ("ramdom_" + (Math.random() * 100000).toFixed(0))
    }

    _alert(msg) {
        console.log(msg)
    }

    createShape() {
        this.node = this.svg.append('g').attr('class', this.name);
        let circle = this.node.append('circle')
            .attr('cx', 150)
            .attr('cy', 150)
            .attr('r', 50)
            .style('fill', 'red')
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
        this.animate();
        this._alert("anim 1")
    }
    startAnimation() {
        this.createShape()
    }

    removeAnimation() {
        this.node.transition()
            .style('opacity', 0).remove()
    }
}