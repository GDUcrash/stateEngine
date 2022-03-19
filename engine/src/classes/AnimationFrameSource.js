import AnimationSource from "./AnimationSource.js";

class AnimationFrameSource extends AnimationSource {

    #sourcesList = [];
    #currentFrame = 0;

    constructor (src) {
        if(Array.isArray(src)) {
            super(src[0]);
            this.#sourcesList = src;
        } else {
            super(src);
            this.#sourcesList = [src];
        }
    }

    addSource (src) {
        this.#sourcesList.push(src);
    }

    removeSource (src) {
        this.#sourcesList = this.#sourcesList.filter(f => f != src);
    }

    setFrame (n) { this.frame = n }

    set frame (n) {
        this.#currentFrame = n;
        this.element.src = this.#sourcesList[n];
    }

    get frame () { return this.#currentFrame }

}

export default AnimationFrameSource;