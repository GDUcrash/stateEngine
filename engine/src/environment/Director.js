import * as util from '../util/util.js';

class Director {

    scenes = [];

    #processListeneres = [];

    constructor (root) {
        this.root = root;
        this.process(0);
    }

    addScene (scene, name) {

        scene.director = this;

        let data = {
            name: name,
            ref: scene
        }

        let targetScene = this.scenes.filter(f => f.name == name)[0];

        // if the scene with the given name already exists, replace it
        if (targetScene) {
            let targetScene = this.scenes[this.scenes.indexOf(targetScene)];
            if(typeof targetScene != 'object') targetScene = {};
            targetScene = Object.assign(targetScene, data);
            return;
        }

        // if not, add new scene
        data.active = !this.scenes.length;
        this.scenes.push(data);

        // if this is the only scene at the moment, switch to it
        if(this.scenes.length == 1) this.switchToScene(name);

    }

    switchToScene (name) {
        // find the new scene by name, set it to active, 
        // set all other previosuly active scenes to inactive

        let targetScene = this.getScene(name);
        if(!targetScene) return;

        targetScene.active = true;

        let lastActiveScenes = this.scenes.filter(f => f.active);
        lastActiveScenes.forEach(scene => scene.active = false);

        // remove previosuly rendered scenes
        this.root.querySelectorAll('.state-engine-scene').forEach(sceneElem => {
            sceneElem.parentElement.removeChild(sceneElem);
        });

        // render new scene
        this.root.appendChild(targetScene.ref.render());
    }

    getScene (name) {
        return this.scenes.filter(f => f.name == name)[0];
    }

    getSceneRef (name) {
        let targetScene = this.getScene(name);
        return targetScene ? targetScene.ref : null;
    }

    process (dt) {
        let prevTime = Date.now();
        
        this.#processListeneres.forEach(node => {
            if (node && util.isFunction(node.process)) node.process(dt);
        });

        requestAnimationFrame(() => { 
            let newTime = Date.now();
            this.process(newTime - prevTime);
        });
    }

    addProcessListener (node) {
        if(!this.#processListeneres.includes(node)) this.#processListeneres.push(node);
    }

    removeProcessListener (node) {
        this.#processListeneres = this.#processListeneres.filter(f => f != node);
    }

}

export default Director;