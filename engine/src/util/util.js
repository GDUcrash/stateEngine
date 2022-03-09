export function clamp (val, min, max) {
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    return Math.max(Math.min(val, max), min);
}

export function isVector (val) { 
    return val && val.isVector;
}