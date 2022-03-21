import TexturedNode from "./TexturedNode.js";

class StaticBodyNode extends TexturedNode {

    type = 'staticBody';

    constructor (id=null) {
        super(id);
    }

}

export default StaticBodyNode;