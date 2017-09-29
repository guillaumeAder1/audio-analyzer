import * as d3 from 'd3'
import _Anim1 from './anim/Anim1.js'
import _Anim2 from './anim/Anim2.js'

export default class _Stage {

    constructor(params) {

        let w = window.innerWidth;
        let h = window.innerHeight;
        // let h = window.document.body.offsetHeight
        // let w = window.document.body.offsetWidth
        console.log(w, h);
        this.indexAnim = 0;

        let svg = this.initSvg(w, h)
        this.animList = [
            new _Anim1({ stage: svg, size: { w: w, h: h } }),
            new _Anim2({ stage: svg, size: { w: w, h: h } })
        ];
        this.previousIndex = 0;
        this.initAnimation()

        this.initEvent()
    }

    initAnimation() {
        this.animList[this.indexAnim].startAnimation()
    }


    initEvent() {
        window.document.addEventListener('keyup', this.changeAnim.bind(this));
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

    eventReceived() {
        this.animList[this.indexAnim].eventReceived();
    }
}