import Director from './src/environment/Director.js';
import Scene from './src/environment/Scene.js';
import Node from './src/nodes/Node.js';
import { createElement } from "./src/util/jsx.js";


let director = new Director(document.body);

let mainScene = <Scene>
    <Container>
        <Node id="player" />
    </Container>
</Scene>;

director.addScene(mainScene, 'main');