import Vector2 from "./src/classes/Vector2.js";
import Dimension2 from "./src/classes/Dimension2.js";
import Node from "./src/nodes/Node.js";
import Container from "./src/nodes/Container.js";
import Director from "./src/environment/Director.js";
import Scene from "./src/environment/Scene.js";

import { createElement } from "./src/util/jsx.js";

const world = new Director(document.body);

export { 
    Vector2, Dimension2, 
    Node, Container, Scene,
    Director, world,
    createElement
};