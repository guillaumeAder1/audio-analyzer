export function randomBool() {
    return Math.random() >= 0.5;
}

/**
 * 
 * @param {*min} min minumum pixel value 
 * @param {*max} max maximum pixel value
 * @param {*bool} bool boolean of tru - return a negative values 
 */
export function getRandomArbitrary(min, max, bool) {
    let value = Math.floor(Math.random() * (max - min) + min);
    if (bool) {
        value = (randomBool()) ? value : -value;
    }
    return value
}