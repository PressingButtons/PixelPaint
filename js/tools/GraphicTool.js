const Position = function( ) {
  this.x = 0;
  this.y = 0;
  this.scale = 1;
}

Position.prototype.set = function(position) {
  this.x = position.x / this.scale;
  this.y = position.y / this.scale;
  this.action = function( ) { };
}

const GraphicTool = function(config) {
  this.ctx = config.ctx;
  this.size = config.size || 5;
  this.inUse = false;
  this.start = new Position( );
  this.end = new Position( );
  this.currentState;
}

GraphicTool.prototype.activate = function(canvas, onCommit) {
  this.ctx = canvas.getContext('2d');
  //this.CommitChange = onCommit;
}

GraphicTool.prototype.SwitchState = function(state, position) {
  this.currentState = state;
  this.currentState.EnterState(this, position);
}

GraphicTool.prototype.Update = function(position) {
  this.currentState.Update(this, position);
}

export default GraphicTool
