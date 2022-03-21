import TexturedNode from "./TexturedNode.js";

class BackgroundNode extends TexturedNode {

    type = 'background';

    constructor (id=null) {
        super(id);
    }

}

export default BackgroundNode;