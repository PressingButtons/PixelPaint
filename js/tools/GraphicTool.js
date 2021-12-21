const DEFAULT = {
  SIZE: 10
}

const GraphicTool = function(config) {
  this.size = config.size || DEFAULT.SIZE;
  this.currentState;
  this.context;
  this.positions = [ ];
  this.scale = 1;
}

GraphicTool.prototype.logPosition = function(pos) {
  this.positions.push(new Position2D(pos));
}

GraphicTool.prototype.update = function(config, pos, context, scale) {
  this.context = context;
  this.size = config.size;
  this.currentState.update(pos, context);
}

GraphicTool.prototype.toDownState = function(context) {
  this.currentState.exitState(this.context);
  this.currentState = this.DownState;
  this.currentState.enterState(context);
  this.context = context;
}

GraphicTool.prototype.toUpState = function(context) {
  this.currentState.exitState(this.context);
  this.currentState = this.UpState;
  this.currentState.enterState(context);
  this.context = context;
}

export default GraphicTool;
