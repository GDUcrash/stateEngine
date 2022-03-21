import Dimension2 from './src/classes/Dimension2.js';
import Director from './src/environment/Director.js';
import Scene from './src/environment/Scene.js';
import Container from './src/nodes/Container.js';
import Node from './src/nodes/Node.js';
import StaticBodyNode from './src/nodes/StaticBodyNode.js';
import DynamicBodyNode from './src/nodes/DynamicBodyNode.js';
import CameraNode from './src/nodes/CameraNode.js';
import CharacterNode from './src/nodes/CharacterNode.js';
import AnimationSource from './src/classes/AnimationSource.js';
import { createElement } from "./src/util/jsx.js";
import style from './src/styles/index.css';
import Vector2 from './src/classes/Vector2.js';


let director = new Director(document.body);

let mainScene = <Scene>
    <CameraNode 
        active={true} 
        followThreshold={new Vector2(30, 100)}
        followDamping={0.1}
        onCreate={e => {
            e.self.followTarget = e.self.parentScene().findChild('player');
        }}
    />
    <Container>
        <Node id="playerParent">
        <CharacterNode 
            id="player"
            name="player"
            size={new Dimension2(50, 100)}
            animation={new AnimationSource("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bebra_Wasserturm.jpeg/220px-Bebra_Wasserturm.jpeg")} 
            onCreate={e => {
                e.self.counter = 0;
            }}
            onProcess={e => {
                e.self.position.x -= 5.1;
                e.self.position.y += 5.1;
            }}
        />
        </Node>
    </Container>
</Scene>;

director.addScene(mainScene, 'main');