import GraphicTool from './GraphicTool.js';
import {GraphicPencilUpState, GraphicPencilDownState} from '../toolstates/graphicpencilstates.js';

const GraphicPencil = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
  this.switchState(this.UP);
}

GraphicPencil.prototype = Object.create(GraphicTool.prototype);
GraphicPencil.prototype.constructor = GraphicPencil;

GraphicPencil.prototype.init = function(config) {
  this.states[1] = new GraphicPencilDownState(this);
  this.states[0] = new GraphicPencilUpState(this);
}


export default GraphicPencil;
