import * as util from '../util/util.js';

class TextureSource {

    #src = null;

    constructor (src) {
        this.#src = src || null;
    }

    set src (src) { this.#src = src; }
    get src ()    { return this.#src }

}

export default TextureSource;