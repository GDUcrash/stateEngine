import { createElement } from "./src/util/jsx.js";
import Node from "./src/nodes/Node.js";
import Vector2 from "./src/classes/Vector2.js";

let myNode = new Node('player');
myNode.position = new Vector2(-69, 429);
myNode.on('create', e => {
    console.log('node created!', e);
});


<div>
    <Node id="player" position={new Vector2(69, 5)} onCreate={console.log} />
    {myNode}
</div>
