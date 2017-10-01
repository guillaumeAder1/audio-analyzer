import { randomBool, getRandomArbitrary } from './../helper/Random.js'

export default class _Anim2 {

    constructor(params) {
        this.svg = params.stage;
        this.size = params.size;
        this.counter = 0;
        this.isPlaying = false;
    }
    startAnimation() {
        this.node = this.svg.append('g').attr('class', 'anim1');
        this.data = this.getData(6, this.size);
        this.initShape(this.data)

    }
    initShape(data) {
        console.log(data)
        let shapes = this.node.selectAll('circle').data(data).enter().append('circle')
            .attr('cx', function(d, i) { return d.cx })
            .attr('cy', function(d, i) { return d.cy })
            .attr('r', function(d, i) { return d.r })

    }
    createShape(data) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            let shapes = this.node.selectAll('circle')
                .transition()
                .attr('r', (d, i) => {
                    if (this.counter % 2 === 0) {
                        if (!d.isOdd) {
                            return d.r * 1.3
                        } else {
                            return d.r
                        }
                    }
                    if (this.counter % 2 !== 0) {
                        if (d.isOdd) {
                            return d.r * 1.3
                        } else {
                            return d.r
                        }
                    }

                });
            this.isPlaying = false;

        }

    }
    eventReceived() {
        console.log('Received Anim 2...', this.counter);

        this.counter += 1;
        if (this.counter > 11) { this.counter = 0 }
        this.createShape(this.data);
    }

    getData(nbrDots, position) {
        let arr = new Array(nbrDots).fill({});
        return arr.map((element) => {
            return {
                r: getRandomArbitrary(50, 100),
                cx: getRandomArbitrary(0, position.w),
                cy: getRandomArbitrary(0, position.h),
                isOdd: randomBool()
            }
        }, this);
    }

    removeAnimation() {
        this.node.transition()
            .style('opacity', 0).remove()
    }
}