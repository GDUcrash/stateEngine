import { appendChild } from '../util/jsx.js';

class Container {
    element = document.createElement('div');
    #children = [];

    render () {
        return this.element;
    }

    get children ()  { return this.#children }
    set children (c) { 
        this.#children = c;
        this.element.innerHTML = '';
        c.forEach(elem => {
            appendChild(this.element, elem);
        });
    }
}

export default Container;