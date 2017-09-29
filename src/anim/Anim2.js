import { randomBool, getRandomArbitrary } from './../helper/Random.js'

export default class _Anim2 {

    constructor(params) {
        this.svg = params.stage;
        this.node = this.svg.append('g').attr('class', 'anim1');
        this.size = params.size;
        this.data = this.getData(6, this.size);
        this.counter = 0;
    }
    createShape(data) {
        console.log(data)
        let shapes = this.node.selectAll('circle').data(data).enter().append('circle')
            .attr('cx', function(d, i) { return d.cx })
            .attr('cy', function(d, i) { return d.cy })
            .attr('r', function(d, i) { return d.r })
            .transition()
            .attr('r', (d, i) => {
                if (this.counter % 2 === 0) {
                    if (!d.isOdd) {
                        return d.r * 10
                    }
                }
                if (this.counter % 2 !== 0) {
                    if (d.isOdd) {
                        return d.r * 10
                    }
                }


            }).remove();

    }
    eventReceived() {
        console.log('Received Anim 2...');
        this.counter += 1;
        if (this.counter > 10) { this.counter = 0 }
        this.createShape(this.data);
    }

    getData(nbrDots, position) {
        let arr = new Array(nbrDots).fill({});
        return arr.map((element) => {
            return {
                r: getRandomArbitrary(3, 10),
                cx: getRandomArbitrary(0, position.w),
                cy: getRandomArbitrary(0, position.h),
                isOdd: randomBool()
            }
        }, this);
    }
}