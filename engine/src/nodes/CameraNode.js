import Vector2 from '../classes/Vector2.js';
import Node from './Node.js';

class CameraNode extends Node {

    type = 'camera';

    #active = false;
    #zoom = 1;
    #offset = Vector2.zero();
    #follow = {
        target: null,
        threshold: Vector2.zero(),
        damping: 1
    }

    constructor (id=null) {
        super(id);
    }

    get active () { return this.#active }
    set active (t) {
        if(!t) return this.#active = false;

        setTimeout(() => {
            let cameras = this.parentScene().findChildrenOfType('camera');
            cameras.forEach(c => c.active = false);
            this.#active = true;
        }, 0);
    }

    get zoom ()         { return this.#zoom     }
    set zoom (zoom)     { this.#zoom = zoom     }
    get offset ()       { return this.#offset   }
    set offset (offset) { this.#offset = offset }

    get followTarget ()     { return this.#follow.target    }
    set followTarget (node) { this.#follow.target = node    }
    get followThreshold ()  { return this.#follow.threshold }
    set followThreshold (n) { this.#follow.threshold = n    }
    get followDamping ()     { return this.#follow.damping  }
    set followDamping (n)    { this.#follow.damping = n     }

    updateElement () {
        if(!this.active) return;

        // update offset based on follow node
        if(this.followTarget || this.followTarget.position) {
            let diffX = this.followTarget.position.x - this.offset.x;
            let diffY = this.followTarget.position.y - this.offset.y;

            let distX = this.followThreshold.x * (diffX / Math.abs(diffX));
            let distY = this.followThreshold.y * (diffY / Math.abs(diffY));

            if(Math.abs(diffX) > this.followThreshold.x)
                this.offset.x += (diffX - distX) * this.followDamping;
            if(Math.abs(diffY) > this.followThreshold.y)
                this.offset.y += (diffY - distY) * this.followDamping;
        }

        // get current scene element
        let sceneElem = this.parentScene().element;
        sceneElem.style.transform = `translate(${-this.offset.x}px, ${-this.offset.y}px) scale(${this.zoom})`;
    }

}

export default CameraNode;