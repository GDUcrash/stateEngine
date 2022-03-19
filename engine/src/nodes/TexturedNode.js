import Node from './Node.js';
import TextureSource from '../classes/TextureSource.js';

class TexturedNode extends Node {

    #texture = new TextureSource();
    textureElement = document.createElement('img');

    constructor (id=null) {
        super(id);

        this.textureElement;
        this.textureElement.className = 'state-engine-texture';
    }

    render () {
        this.#updateTexture();
        this.element.appendChild(this.textureElement);
        return this.element;
    }

    get texture () { return this.#texture.src }
    set texture (texture) { 
        if(!texture.src) this.#texture = new TextureSource(texture);
        else             this.#texture = texture;

        this.#updateTexture();
    }

    setTexture (texture) {
        this.texture = texture;
    }

    setSize (size) {
        this.size = size;
        this.#updateTexture();
    }

    #updateTexture () {
        if(this.texture) this.textureElement.src = this.texture;
        
        if(this.size) {
            this.textureElement.width =  this.size.width;
            this.textureElement.height = this.size.height;
        }

        this.element.innerHTML = '';
        this.element.appendChild(this.textureElement);
    }

}

export default TexturedNode;