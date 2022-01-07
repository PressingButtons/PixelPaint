import GraphicTool from './GraphicTool.js';
import {EraserUpState, EraserDownState} from '../toolstates/eraserstates.js';

const Eraser = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
  this.switchState(this.UP);
}

Eraser.prototype = Object.create(GraphicTool.prototype);
Eraser.prototype.constructor = Eraser;

Eraser.prototype.init = function(config) {
  this.states[1] = new EraserDownState(this);
  this.states[0] = new EraserUpState(this);
}


export default Eraser;
