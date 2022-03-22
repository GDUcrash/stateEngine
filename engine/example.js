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
import AnimationVideoSource from './src/classes/AnimationVideoSource.js';
import Vector2 from './src/classes/Vector2.js';
import State from './src/classes/State.js';
import { createElement } from "./src/util/jsx.js";
import style from './src/styles/index.css';

import idleAnim from "./exampleassets/idle.webm";
import dragStartAnim from "./exampleassets/drag_start.webm";
import dragStaticAnim from "./exampleassets/drag_static.webm";


let director = new Director(document.body);

director.preload(idleAnim);
director.preload(dragStartAnim);
director.preload(dragStaticAnim);

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
            onCreate={e => {
                e.self.state.addState(<State 
                    id="idle" 
                    animation={new AnimationVideoSource(idleAnim)}
                    loop
                />);
                e.self.state.addState(<State 
                    id="dragStart" 
                    animation={new AnimationVideoSource(dragStartAnim)}
                    nextState="dragStatic"
                />);
                e.self.state.addState(<State 
                    id="dragStatic" 
                    animation={new AnimationVideoSource(dragStaticAnim)}
                    loop
                />);

                let counter = 0;
                document.addEventListener('click', () => {
                    if(!counter) {
                        e.self.state.setState('idle');
                        setTimeout(() => {
                            e.self.state.setState('dragStart');
                        }, 1000);
                    }
                    else e.self.state.setState('dragStart');
                    counter++;
                });
                
            }}
        />
        </Node>
    </Container>
</Scene>;

director.addScene(mainScene, 'main');