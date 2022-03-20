import Node from './Node.js';
import AnimationSource from '../classes/AnimationSource.js';

class DynamicBodyNode extends Node {

    #animation = new AnimationSource(null);
    #active = true;

    constructor (id=null) {
        super(id);
    }

    render () {
        this.create();
        this.#updateAnimation();
        return this.element;
    }

    get animation ()    { return this.#animation }
    set animation (src) { 
        this.#animation = src;  
        this.#updateAnimation();
    }

    get active ()  { return this.#active }
    set active (t) { 
        this.#active = t;
        this.element.setAttribute('disabled', t);  
    }

    setActive (t) { this.active = t     }
    enable    ()  { this.active = true  }
    disable   ()  { this.active = false }

    #updateAnimation () {
        this.element.innerHTML = '';
        this.element.appendChild(this.#animation.render());
    }

}

export default DynamicBodyNode;