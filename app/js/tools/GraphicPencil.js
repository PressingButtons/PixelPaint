import GraphicTool from './GraphicTool.js';
import {GraphicPencilUpState, GraphicPencilDownState} from '../toolstates/graphicpencilstates.js';

const GraphicPencil = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
}

GraphicPencil.prototype = Object.create(GraphicTool.prototype);
GraphicPencil.prototype.constructor = GraphicPencil;

GraphicPencil.prototype.init = function(config) {
  this.strokeStyle = config.strokeStyle || '#000000';
  this.DownState = new GraphicPencilDownState(this);
  this.UpState = new GraphicPencilUpState(this);
  this.scale = config.scale || 0.3;
}


export default GraphicPencil;
