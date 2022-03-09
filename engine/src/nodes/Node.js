import React from 'react';
import Vector2 from '../classes/Vector2.js';
import Dimension2 from '../classes/Dimension2.js';
import * as util from '../util/util.js';

class Node extends React.Component {

    // private properties

    #id = null;
    #transform = {
        pos: Vector2.zero(),
        rot: 0,
        scale: Vector2.one()
    };
    #size = Dimension2.zero();
    #visible = true;
    #z = {
        index: 0,
        layer: null
    };
    #parallax = {
        move: Vector2.one(),
        scale: Vector2.one()
    }

    // event methods

    constructor (id=null) {
        super();
        this.#id = id;
    }

    render () {
        return <div className='state-engine-node' id={this.#id}> { this.props.children } </div>;
    }

    // getters/setters for properties

    get id () { return this.#id }

    get position ()    { return this.#transform.pos   }
    get rotation ()    { return this.#transform.rot   }
    get scale    ()    { return this.#transform.scale }
    set position (pos) { this.#transform.pos = pos    }
    set rotation (rot) { this.#transform.rot = rot    }
    set scale    (scl) { this.#transform.scale = scl  }

    get size ()     { return this.#size }
    set size (size) { this.#size = size }

    get visible ()  { return this.#visible }
    set visible (t) { this.#visible = !!t  }

    get zindex ()  { return this.#z.index }
    get layer  ()  { return this.#z.layer }
    set zindex (z) { this.#z.index = z    }
    set layer  (z) { this.#z.layer = z    }

    get parallaxMove  ()  { return this.#parallax.move  }
    get parallaxScale ()  { return this.#parallax.scale }
    set parallaxMove  (p) { this.#parallax.move = p     }
    set parallaxScale (p) { this.#parallax.scale = p    }

    // methods

    moveTo (pos) { this.position = pos }
    setX   (x)   { this.position.x = x }
    setY   (y)   { this.position.y = y }
    slideTo (pos, time, easing) {
        //todo
    }
    lerpTo (pos, damping) {
        if(!util.isVector(pos)) return;
        damping = util.clamp(damping, 0, 1);

        this.position.x += (pos.x - this.position.x) * damping;
        this.position.y += (pos.y - this.position.y) * damping;
    }

    setRotation (rot) { this.rotation = rot }
    slideRotation (rot, time, easing) {
        // todo
    }
    lerpRotation (rot, damping) {
        damping = util.clamp(damping, 0, 1);

        this.rotation += (rot - this.rotation) * damping;
    }

    setScale (scale) { this.scale = scale }
    slideScale (scale, time, easing) {
        // todo
    }
    lerpScale (scale, damping) {
        damping = util.clamp(damping, 0, 1);

        this.scale += (scale - this.scale) * damping;
    }

    setSize (size) { this.size = size }

    show () { this.visible = true  }
    hide () { this.visible = false }
    setVisible (visible) { this.visible = visible }

    setZIndex (z) { this.zindex = z }
    setLayer  (l) { this.layer = l  }
    setParallax (move, scale) {
        this.parallaxMove  = move;
        this.parallaxScale = scale;
    }
    
}

export default Node;