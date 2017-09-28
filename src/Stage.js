import * as d3 from 'd3'
import _Anim1 from './anim/Anim1.js'
import _Anim2 from './anim/Anim2.js'

export default class _Stage {

    constructor(params) {

        let w = window.innerWidth;
        let h = window.innerHeight;
        // let h = window.document.body.offsetHeight
        // let w = window.document.body.offsetWidth
        console.log(w, h)

        this.toto = "okok"

        this.indexAnim = 0;

        let svg = this.initSvg(w, h)
        this.animList = [
            new _Anim1({ stage: svg }),
            new _Anim2({ stage: svg })
        ];

        this.initEvent()
    }

    initEvent() {
        window.document.addEventListener('keyup', this.changeIndexAnim.bind(this));
    }

    changeIndexAnim(e) {
        if (e.keyCode === 13) {
            this.indexAnim++;
            if (this.indexAnim >= this.animList.length) {
                this.indexAnim = 0;
            }
        }
    }

    initSvg(width, height) {

        let stage = d3.select('body').append('svg')
            .attr('id', 'stage')
            .attr('width', width)
            .attr('height', height);
        return stage
    }

    eventReceived() {
        this.animList[this.indexAnim].eventReceived()
    }
}