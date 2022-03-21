import Container from "../nodes/Container.js";
import { appendChild } from '../util/jsx.js';

class Scene extends Container {

    isScene = true;
    director = null;

    #containerElement = document.createElement('div');

    constructor () {
        super();

        // construct element
        this.element.className = 'state-engine-scene';
        this.#containerElement.className = 'state-engine-scene-container';
    }

    get container () { return this.#containerElement }

    render () {
        this.element.appendChild(this.#containerElement);
        return this.element;
    }

    addChildHTML (elem) {
        appendChild(this.#containerElement, elem);
    }

}

export default Scene;