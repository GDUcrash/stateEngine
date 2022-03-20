import Vector2 from '../classes/Vector2.js';
import Dimension2 from '../classes/Dimension2.js';
import Container from './Container.js';
import * as util from '../util/util.js';

class Node extends Container {

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

    #processing = false;

    // event methods

    constructor (id=null) {
        super();
        this.#id = id;

        // construct element
        this.element.id = id;
        this.element.className = 'state-engine-node';
    }

    render () {
        this.create();
        return this.element;
    }

    destroy () {
        this.#processing = false;
        this.emitEvent('destroy', { id: this.#id });
        delete this;
    }

    // getters/setters for properties

    get id () { return this.#id }
    set id (id) { 
        if(!this.#id) this.#id = this.element.id = id;
    }

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
    
    // events

    #eventMap = {}

    emitEvent (name, ctx, additionalFunc) {
        let targetEvent = this.#eventMap[name];
        if(!util.isFunction(targetEvent)) return;

        targetEvent(ctx);
        if(util.isFunction(additionalFunc)) additionalFunc(ctx);
    }

    on (event, func) {
        this.#eventMap[event] = func;
    }

    // create and process events

    create () {
        this.#processing = true;
        this.emitEvent('create', { id: this.#id, self: this });

        this.process();
    }

    process () {
        if(!this.#processing) return;

        // update node's transofrm, visibility and zIndex
        this.element.style.transform = 
            `translate(${this.position.x * this.parallaxMove.x}px, ${this.position.y * this.parallaxMove.y}px)` + 
            `rotate(${this.rotation}deg)` + 
            `scale(${this.scale.x * this.parallaxScale.x}, ${this.scale.y * this.parallaxScale.y})`;
        this.element.style.display = this.visible ? 'block' : 'none';
        this.element.style.zIndex = this.zindex;

        // emit process event
        this.emitEvent('process', { delta: 0, dt: 0, id: this.#id, self: this });

        requestAnimationFrame(() => { this.process() });
    }

}

export default Node;