const DEFAULT = {
  SIZE: 10
}

const GraphicTool = function(config) {
  this.size = config.size || DEFAULT.SIZE;
  this.currentState;
  this.context;
  this.positions = [ ];
  this.scale = 1;
  this.pressure = 1;
  this.opacity = 1;
  this.blendMode = 'source-over';
}

GraphicTool.prototype.logPosition = function(pos) {
  this.positions.push(new Position2D(pos));
}

GraphicTool.prototype.update = function(config) {
  this.context = config.context;
  this.size = config.size || this.size;
  this.opacity = config.opacity || this.opacity;
  this.pressure = config.pressure || this.pressure;
  this.strokeStyle = config.strokeStyle || this.strokeStyle;
  this.blendMode = config.blendMode || "source-over";
  this.currentState.update({pos: config.pos, context: this.context});
}

GraphicTool.prototype.toDownState = function(config) {
  this.currentState.exitState(config);
  this.currentState = this.DownState;
  this.currentState.enterState(config);
  this.context = config.context;
}

GraphicTool.prototype.toUpState = function(config) {
  this.currentState.exitState(config);
  this.currentState = this.UpState;
  this.currentState.enterState(config);
  this.context = config.context;
}

export default GraphicTool;
