class Dimension2 {
    #w; #h;
    constructor (width, height) {
        if (width && height) {
            this.#w = width;
            this.#h = height
        } else if (width && width.isVector) {
            this.#w = width.x;
            this.#h = width.y;
        } else {
            this.#w = width || 0;
            this.#h = height || 0;
        }
        this.isDimension = true;
    }

    get width  () { return this.#w }
    get height () { return this.#h }

    set width  (w=0) { this.#w = w }
    set height (h=0) { this.#h = h }

    get area () {
        return this.#w * this.#h;
    }

    static zero () { return new Dimension2(0, 0) }
}

export default Dimension2;