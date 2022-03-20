import Vector2 from "./src/classes/Vector2.js";
import Dimension2 from "./src/classes/Dimension2.js";
import AnimationSource from "./src/classes/AnimationSource.js";
import AnimationVideoSource from "./src/classes/AnimationVideoSource.js";
import AnimationFrameSource from "./src/classes/AnimationFrameSource.js";
import TextureSource from "./src/classes/TextureSource.js";

import Node from "./src/nodes/Node.js";
import StaticBodyNode from "./src/nodes/StaticBodyNode.js";
import BackgroundNode from "./src/nodes/BackgroundNode.js";
import DynamicBodyNode from "./src/nodes/DynamicBodyNode.js";
import CharacterNode from "./src/nodes/CharacterNode.js";

import Container from "./src/nodes/Container.js";
import Director from "./src/environment/Director.js";
import Scene from "./src/environment/Scene.js";

import { createElement } from "./src/util/jsx.js";

import style from './src/styles/index.css';

const world = new Director(document.body);

export { 
    Vector2, Dimension2, AnimationSource, 
    AnimationVideoSource, AnimationFrameSource, TextureSource,
    Node, Container, Scene, StaticBodyNode, BackgroundNode,
    DynamicBodyNode, CharacterNode,
    Director, world,
    createElement
};