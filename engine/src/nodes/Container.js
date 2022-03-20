import { appendChild } from '../util/jsx.js';

class Container {
    element = document.createElement('div');
    #children = [];
    #parent = null;

    render () {
        return this.element;
    }

    get children ()  { return this.#children }
    set children (c) { 
        // destroy previous children
        this.#children.forEach(elem => {
            if(!c.includes(elem)) {
                try {
                    elem.destroy();
                    elem.parent = null;
                } catch {}
            }
        });

        // replace with new children and link everything up
        this.#children = c;
        this.element.innerHTML = '';
        c.forEach(elem => {
            if(elem) elem.parent = this;
            appendChild(this.element, elem);
        });
    }

    get parent ()  { return this.#parent }
    set parent (p) { this.#parent = p    }

    #scanParentsWithRule (elem, rule, onFullfil) {
        if(rule) onFullfil();
        else return elem.parent;
    }

    findParent (id) {
        let resultElement = null;

        let step = (elem) => this.#scanParentsWithRule(
            elem, elem.parent && elem.parent.id == id, 
            () => { resultElement = elem.parent }
        );

        let currentElement = this;
        while (currentElement && !resultElement) currentElement = step(currentElement);

        return resultElement;
    }

    parentScene () {
        let resultScene = null;

        let step = (elem) => this.#scanParentsWithRule(
            elem, elem.parent && elem.parent.isScene, 
            () => { resultScene = elem.parent }
        );

        let currentElement = this;
        while (currentElement && !resultScene) currentElement = step(currentElement);

        return resultScene;
    }

}

export default Container;