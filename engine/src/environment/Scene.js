import Container from "../nodes/Container.js";

class Scene extends Container {

    constructor () {
        super();

        // construct element
        this.element.className = 'state-engine-scene';
    }

}

export default Scene;