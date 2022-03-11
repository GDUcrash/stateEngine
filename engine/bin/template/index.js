const { world, Scene, Node, Vector2, Dimension2, createElement } = require('state-game-engine');

const mainScene = <Scene>
    <Node 
        id="player" 
        position={new Vector2(-50, 0)} size={new Dimension2(100, 100)} 
        onCreate={console.log}
    />
</Scene>;

world.addScene(mainScene, 'name');

