import DynamicBodyNode from './DynamicBodyNode.js';

class CharacterNode extends DynamicBodyNode {

    #name = null;

    constructor (id=null) {
        super(id);
    }

    get name ()     { return this.#name }
    set name (name) { this.#name = name }

}

export default CharacterNode;