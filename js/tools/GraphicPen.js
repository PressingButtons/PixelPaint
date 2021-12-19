import GraphicTool from './GraphicTool.js';

const GraphicPen = function(config) {
  GraphicTool.call(this, config);
  this.strokeStyle = config.stroke;
  this.ctx.lineCap = 'round';
  this.PenDown = new PenStateDown( );
  this.PenUp = new PenStateUp( );
  this.start.scale = (0.3);
  this.end.scale = (0.3);
  this.contiguous = true;
  this.SwitchState(this.PenUp, {x:0, y: 0});
}

GraphicPen.prototype = Object.create(GraphicTool.prototype);
GraphicPen.prototype.constructor = GraphicPen;

GraphicPen.prototype.toolAction = function( ) {
  this.ctx.strokeStyle = this.strokeStyle;
  this.ctx.lineWidth = this.size;
  this.ctx.beginPath( );
  this.ctx.moveTo(this.start.x, this.start.y);
  this.ctx.lineTo(this.end.x, this.end.y);
  this.ctx.closePath( );
  this.ctx.stroke( );
}

const PenStateDown = function( ) {}

PenStateDown.prototype.EnterState = function(gp, position) {
  gp.ctx.globalCompositeOperation = 'source-over';
  gp.start.set(position);
  gp.end.set(position);
  //gp.ctx.globalCompositeOperation = 'source-out';
}

PenStateDown.prototype.Update = function(gp, position) {
  if(gp.isDown) {
    gp.end.set(position);
    gp.toolAction( );
    gp.start.set(position);
  } else {
    //gp.CommitChange( );
    gp.SwitchState(gp.PenUp, position);
  }
}


const PenStateUp = function( ) {};

PenStateUp.prototype.EnterState = function(gp, position) {
  gp.start.set(position);
  gp.end.set(position);
}

PenStateUp.prototype.Update = function(gp, position) {
  if(gp.isDown) gp.SwitchState(gp.PenDown, position);
}

export default GraphicPen;
