import AnimationSource from './AnimationSource.js';

class State {

    #id        = null;
    #animation = new AnimationSource(null);
    #paused    = false;
    #loop      = false;
    #nextState = null;
    #event     = null;
    #frame     = 0;
    #frameRate = 24;

    constructor (id=null) {
        this.#id = id;
    }

    get id () { return this.#id }

    get animation ()     { return this.#animation }
    set animation (anim) { this.#animation = anim }

    get paused ()  { return this.#paused }
    set paused (t) { this.#paused = t    }
    get loop   ()  { return this.#loop   }
    set loop   (t) { this.#loop = t      }

    get nextState ()  { return this.#nextState }
    set nextState (s) { this.#nextState = s    }
    get event     ()  { return this.#event     }
    set event  (evt)  { this.#event = evt      }

    get frame     ()  { return this.#frame     }
    set frame     (n) { this.#frame = n        }
    get frameRate ()  { return this.#frameRate }
    set frameRate (n) { this.#frameRate = n    }

}

export default State;