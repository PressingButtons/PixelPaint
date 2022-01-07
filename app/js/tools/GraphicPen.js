import GraphicTool from './GraphicTool.js';
import {GraphicPenUpState, GraphicPenDownState} from '../toolstates/graphicpenstates.js';

const GraphicPen = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
  this.switchState(this.UP);
}

GraphicPen.prototype = Object.create(GraphicTool.prototype);
GraphicPen.prototype.constructor = GraphicPen;

GraphicPen.prototype.init = function(config) {
  this.states[1] = new GraphicPenDownState(this);
  this.states[0] = new GraphicPenUpState(this);
}


export default GraphicPen;
