import Node from './Node.js';
import AnimationSource from '../classes/AnimationSource.js';
import StateManager from '../classes/StateManager.js';

class DynamicBodyNode extends Node {

    type = 'dynamicBody';

    #animation = new AnimationSource(null);
    #active = true;

    #stateManager = new StateManager(this);

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

    get state  () { return this.#stateManager        }
    get states () { return this.#stateManager.states }

    setActive (t) { this.active = t     }
    enable    ()  { this.active = true  }
    disable   ()  { this.active = false }

    #updateAnimation () {
        this.element.innerHTML = '';
        this.element.appendChild(this.#animation.render());
    }

}

export default DynamicBodyNode;