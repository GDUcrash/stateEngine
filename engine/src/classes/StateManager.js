class StateManager {

    #states = {}
    #node = null;
    #currentState = null;

    constructor (node) {
        this.#node = node;
    }

    get states ()   { return this.#states }

    addState (state) {
        let targetKey = this.#states[state.id];
        if(!targetKey) targetKey = state;
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
    }

    getState (id) { return id ? this.#states[id] : this.#currentState }

}

export default StateManager;