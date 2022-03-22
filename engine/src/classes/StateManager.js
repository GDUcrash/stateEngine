class StateManager {

    #states = {}
    #node = null;
    #currentState = null;
    #animationElem = null;
    #paused = false;

    constructor (node) {
        this.#node = node;
    }

    get states ()   { return this.#states }

    get paused ()   { return this.#paused }
    set paused (p)  { this.#paused = p    }

    addState (state) {
        let targetKey = this.#states[state.id];
        if(!targetKey)  this.#states[state.id] = state;
        if(Object.keys(this.#states).length == 1) this.setState(state);
    }

    removeState (state) {
        if (typeof state == 'string') delete this.#states[state];
        else {
            Object.keys(this.#states).forEach(s => {
                if (this.#states[s] == state) delete this.#states[s];
            });
        }
    }

    setState (state) {
        let targetState = typeof state == 'string' ? this.#states[state] : state;
        this.#currentState = targetState;
        this.#node.animation = targetState.animation;
        this.#updateAnimationElement();
        if(!this.#paused) this.play();
    }

    getState (id) { return id ? this.#states[id] : this.#currentState }

    play () {
        this.#animationElem.play();
        this.#paused = false;
    }

    pause () {
        this.#animationElem.pause();
        this.#paused = true;
    }

    #updateAnimationElement () {
        this.#animationElem = this.#node.animation.render();
        this.#node.animation.render().onended = () => {
            let targetState = this.#currentState.loop ? this.#currentState : this.#currentState.nextState;
            if (!targetState) return;

            this.setState(targetState);
        }
    }

}

export default StateManager;