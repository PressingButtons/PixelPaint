import GraphicTool from './GraphicTool.js';
import {ColorSampleUpState, ColorSampleDownState} from '../toolstates/colorsamplestates.js';

const ColorSample = function(config) {
  GraphicTool.call(this, config);
  this.init( );
  this.noResize = true;
  this.switchState(this.UP);
}

ColorSample.prototype = Object.create(GraphicTool.prototype);
ColorSample.prototype.constructor = ColorSample;

ColorSample.prototype.init = function(config) {
  this.states[1] = new ColorSampleDownState(this);
  this.states[0] = new ColorSampleUpState(this);
}


export default ColorSample;
