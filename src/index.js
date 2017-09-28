import _ from 'lodash'
import _AudioAnalyzer from './AudioAnalyzer.js'


let analyzer = new _AudioAnalyzer({ inputSrc: false });

console.log(analyzer)

function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}

//document.body.appendChild(component());