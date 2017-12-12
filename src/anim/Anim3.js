import AnimationModel from '../model/animationModel.js'
import * as d3 from 'd3'

export default class _Anim3 extends AnimationModel {
    constructor(params) {
        super(params, params);
        this.params = params;
        this.lines = [];
    }
    createShape() {
        let canvas = d3.select('body').append('canvas')
            .attr('width', this.params.size.w)
            .attr('height', this.params.size.h);
        let ctx = canvas.node().getContext('2d');
        this.ctx = ctx;
        this.max = 10;
    }

    animate(data) {
        // clear full canvas
        this.ctx.clearRect(0, 0, this.params.size.w, this.params.size.h)
        if (!this.steps) {
            this.steps = this.params.size.h / data.length;
        }
        this.lines.push(data);
        if (this.lines.length > this.max) {
            this.lines.shift()
        }

        this.lines.forEach((element, i) => {
            let op = (this.max - i) / 10;
            console.log(op)
                // this.ctx.strokeStyle = 'rgba(255,0,0,' + op + ')';
            this.ctx.strokeStyle = 'rgba(255,0,0,.1)';
            this.ctx.beginPath();
            element.forEach((_data, j) => {
                if (j === 0) {
                    this.ctx.moveTo(50, -2)
                } else {
                    this.ctx.lineTo(_data / 2, j * this.steps);
                }
            });
            this.ctx.stroke()

        });



    }
    eventReceived(e) {
        console.log(e)
        this.animate(e)
    }


    removeAnimation() {
        // this.node.transition()
        //     .style('opacity', 0).remove()
    }
}