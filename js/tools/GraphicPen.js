import GraphicTool from './GraphicTool.js';
import {GraphicPenUpState, GraphicPenDownState} from '../toolstates/graphicpenstates.js';

const GraphicPen = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
}

GraphicPen.prototype = Object.create(GraphicTool.prototype);
GraphicPen.prototype.constructor = GraphicPen;

GraphicPen.prototype.init = function(config) {
  this.strokeStyle = config.strokeStyle || '#000000';
  this.DownState = new GraphicPenDownState(this);
  this.UpState = new GraphicPenUpState(this);
  this.scale = config.scale || 0.3;
}


export default GraphicPen;
