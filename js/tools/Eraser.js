import GraphicTool from './GraphicTool.js';

const EraserUpState = function( ) {

}

EraserUpState.prototype.EnterState = function(tool, position) {
  tool.start.set(position);
  tool.end.set(position);
}

EraserUpState.prototype.Update = function(tool, position) {
  if(tool.isDown) {
    tool.SwitchState(tool.EraserDown, position);
  }
}

const EraserDownState = function( ) {

}

EraserDownState.prototype.EnterState = function(tool, position) {
  tool.start.set(position);
  tool.end.set(position);
  tool.ctx.strokeStyle = '#000000F0';
}

EraserDownState.prototype.Update = function(tool, position) {
  if(tool.isDown) {
    tool.end.set(position);
    tool.toolAction( );
    tool.start.set(position);
  } else {
    tool.SwitchState(tool.EraserUp, position);
  }
}

//

const Eraser = function(config) {
  GraphicTool.call(this, config);
  this.ctx.lineCap = 'round';
  this.EraserDown = new EraserDownState( );
  this.EraserUp = new EraserUpState( );
  this.start.scale = 0.3;
  this.end.scale = 0.3;
  this.SwitchState(this.EraserUp, {x:0, y: 0});
}

Eraser.prototype = Object.create(GraphicTool.prototype);
Eraser.prototype.constructor = Eraser;

Eraser.prototype.toolAction = function( ) {
  this.ctx.globalCompositeOperation = 'destination-out';
  this.ctx.lineWidth = this.size;
  this.ctx.beginPath( );
  this.ctx.moveTo(this.start.x, this.start.y);
  this.ctx.lineTo(this.end.x, this.end.y);
  this.ctx.closePath( );
  this.ctx.stroke( );
}


export default Eraser;
