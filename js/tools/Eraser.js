import GraphicTool from './GraphicTool.js';
import {EraserUpState, EraserDownState} from '../toolstates/Eraserstates.js';

const Eraser = function(config) {
  GraphicTool.call(this, config);
  this.init(config);
}

Eraser.prototype = Object.create(GraphicTool.prototype);
Eraser.prototype.constructor = Eraser;

Eraser.prototype.init = function(config) {
  this.strokeStyle = config.strokeStyle || '#000000';
  this.DownState = new EraserDownState(this);
  this.UpState = new EraserUpState(this);
  this.scale = config.scale || 0.3;
}


export default Eraser;
