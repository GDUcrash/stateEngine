class Vector2 {
    #x; #y;
    constructor (x=0, y=0) {
        this.#x = x;
        this.#y = y;
        this.isVector = true;
    }

    get x () { return this.#x }
    get y () { return this.#y }

    set x (x=0) { this.#x = x }
    set y (y=0) { this.#y = y }

    get lengthSquared () {
        let x = this.#x;
        let y = this.#y;
        return x*x + y*y; 
    }

    get length () { 
        return Math.sqrt(this.lengthSquared()); 
    }

    get abs () { 
        return new Vector2(
            Math.abs(this.#x), 
            Math.abs(this.#y)
        );
    }
    
    static zero  () { return new Vector2(0, 0)  }
    static one   () { return new Vector2(1, 1)  }
    static up    () { return new Vector2(0, 1)  }
    static down  () { return new Vector2(0, -1) }
    static left  () { return new Vector2(-1, 0) }
    static right () { return new Vector2(1, 0)  }
}

export default Vector2;