import Dimension2 from './src/classes/Dimension2.js';
import Director from './src/environment/Director.js';
import Scene from './src/environment/Scene.js';
import Container from './src/nodes/Container.js';
import Node from './src/nodes/Node.js';
import StaticBodyNode from './src/nodes/StaticBodyNode.js';
import DynamicBodyNode from './src/nodes/DynamicBodyNode.js';
import CharacterNode from './src/nodes/CharacterNode.js';
import AnimationSource from './src/classes/AnimationSource.js';
import { createElement } from "./src/util/jsx.js";
import style from './src/styles/index.css';


let director = new Director(document.body);

let mainScene = <Scene>
    <Container>
        <CharacterNode 
            id="player"
            name="player"
            size={new Dimension2(50, 100)}
            animation={new AnimationSource("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bebra_Wasserturm.jpeg/220px-Bebra_Wasserturm.jpeg")} 
            onCreate={e => {
                e.self.counter = 0;
                e.self.rotation = -3;
            }}
            onProcess={e => {
                e.self.counter++;
                e.self.position.x = Math.sin(e.self.counter*0.2);
                e.self.rotation += e.self.position.x;
            }}
        />
    </Container>
</Scene>;

console.log(Node.Background);

director.addScene(mainScene, 'main');