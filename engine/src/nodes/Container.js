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
            this.addChildHTML(elem);
        });
    }

    addChildHTML (elem) {
        appendChild(this.element, elem);
    }

    get parent ()  { return this.#parent }
    set parent (p) { this.#parent = p    }

    findParent (id) {
        let resultNode = null;

        let step = (elem) => this.#scanParentsWithRule(
            elem, elem.parent && elem.parent.id == id, 
            () => { resultNode = elem.parent }
        );

        let currentElement = this;
        while (currentElement && !resultNode) currentElement = step(currentElement);

        return resultNode;
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

    getDirector () {
        return this.parentScene().director;
    }

    findChild (id) {
        let resultNode = null;

        this.#scanChildrenWithRule(this, 'id', id, (node) => { resultNode = node });
        return resultNode;
    }

    findChildrenOfType (type) {
        let resultNodes = [];

        this.#scanChildrenWithRule(this, 'type', type, (node) => { resultNodes.push(node) });
        return resultNodes;
    }

    #scanParentsWithRule (node, rule, onFullfil) {
        if(rule) onFullfil();
        else return node.parent;
    }

    #scanChildrenWithRule (node, prop, val, onFullfil) {
        if (!node || node[prop] == val) onFullfil(node);
        if (!node.children) return;

        node.children.forEach(child => {
            this.#scanChildrenWithRule(child, prop, val, onFullfil);
        });
    }

}

export default Container;