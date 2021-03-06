import AnimationSource from "./AnimationSource.js";

class AnimationVideoSource extends AnimationSource {

    element = document.createElement('video');

    isVideoSource = true;

    constructor (src) {
        super(src);
        this.element.src = src;
        this.element.autoplay = true;
        this.element.controls = false;
    }

    play  () { this.element.play();  }
    pause () { this.element.pause(); }

    seekTo (n) { this.currentTime = n;    }
    getTime () { return this.currentTime; }

    get currentTime ()  { return this.element.currentTime }
    set currentTime (tm) { this.element.currentTime = tm; }
    
}

export default AnimationVideoSource;