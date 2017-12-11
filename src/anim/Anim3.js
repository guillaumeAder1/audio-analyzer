import AnimationModel from '../model/animationModel.js'

export default class _Anim3 extends AnimationModel {
    constructor(params) {
        super(params, params);
    }
    animate() {
        this.node.selectAll('circle').attr('cx', 50).transition()
            .attr('cx', 100)

        let log = [1, 2, 1, 2, 4, 5].map((e) => {
            return e + 1;
        })
        console.log(log)

    }
}