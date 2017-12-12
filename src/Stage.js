import * as d3 from 'd3'
import _Anim1 from './anim/Anim1.js'
import _Anim2 from './anim/Anim2.js'
import _Anim3 from './anim/Anim3.js'

export default class _Stage {

    constructor(params) {

        let w = window.innerWidth;
        let h = window.innerHeight;
        this.indexAnim = 0;

        let svg = this.initSvg(w, h);
        // create spctre vbisualization // default array length 32
        this.spectumSvg = this.initSpectrum(svg, 32)

        this.animList = [
            new _Anim1({ stage: svg, size: { w: w, h: h } }),
            new _Anim2({ stage: svg, size: { w: w, h: h } }),
            new _Anim3({ stage: svg, size: { w: w, h: h } })
        ];
        this.initAnimation()

        this.initEvent()
    }
    initSpectrum(svg, nbr) {
        let data = new Array(nbr).fill({});
        let space = 20;
        let width = 15;
        let _d = data.map((val, index) => {
            return {
                x: index * (space + width),
                y: 200,
                w: width,
                h: 200
            }
        });
        // create and place spectr for debug
        return svg.append('g').attr('transform', 'translate( 150,150 )').selectAll('rect').data(_d).enter().append('rect')
            .attr('x', (d, i) => d.x)
            .attr('y', (d, i) => d.y)
            .attr('height', (d, i) => d.h)
            .attr('width', (d, i) => d.w);
    }

    initAnimation() {
        this.animList[this.indexAnim].startAnimation()
    }


    initEvent() {
        // window.document.addEventListener('keyup', this.changeAnim.bind(this));
        window.document.addEventListener('keyup', (e) => { this.changeAnim(e) });
    }

    /**
     * change anim
     * @param {*event} e key event
     */
    changeAnim(e) {
        if (e.keyCode === 13) {
            // remove previous
            this.removeAnim(this.indexAnim);
            // increment index
            this.indexAnim++;
            if (this.indexAnim >= this.animList.length) {
                this.indexAnim = 0;
            }
            // start new anim
            this.animList[this.indexAnim].startAnimation();
        }
    }

    initSvg(width, height) {
        let stage = d3.select('body').append('svg')
            .attr('id', 'stage')
            .attr('width', width)
            .attr('height', height);
        return stage
    }

    removeAnim(index) {
        this.animList[index].removeAnimation();
    }

    frequencies(data) {
        this.spectumSvg.transition().duration(10)
            .attr('height', (d, i) => data[i])
            .style('opacity', 0);
    }

    eventReceived(freq) {
        this.animList[this.indexAnim].eventReceived(freq);
    }
}