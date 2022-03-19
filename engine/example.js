import Dimension2 from './src/classes/Dimension2.js';
import Director from './src/environment/Director.js';
import Scene from './src/environment/Scene.js';
import Container from './src/nodes/Container.js';
import Node from './src/nodes/Node.js';
import StaticBodyNode from './src/nodes/StaticBodyNode.js';
import { createElement } from "./src/util/jsx.js";


let director = new Director(document.body);

let mainScene = <Scene>
    <Container>
        <StaticBodyNode 
            id="player" 
            size={new Dimension2(50, 50)}
            texture="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bebra_Wasserturm.jpeg/220px-Bebra_Wasserturm.jpeg" 
        />
    </Container>
</Scene>;

console.log(Node.Background);

director.addScene(mainScene, 'main');