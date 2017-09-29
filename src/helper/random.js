export function randomBool() {
    return Math.random() >= 0.5;
}

export function getRandomArbitrary(min, max, bool) {
    let value = Math.floor(Math.random() * (max - min) + min);
    if (bool) {
        value = (randomBool()) ? value : -value;
    }
    return value
}