class AnimationSource {

    element = document.createElement('img');

    constructor (src) {
        this.element.className = 'state-engine-animation';
        this.element.src = src;
    }

    set src (src) { this.element.src = src  }
    get src ()    { return this.element.src }

    render () {
        return this.element;
    }

}

export default AnimationSource;