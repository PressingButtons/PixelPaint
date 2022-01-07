const GraphicTool = function(config) {
  this.machine = config.machine;
  this.size = config.size;
  this.blendMode = 'source-over';
  this.pointLog = [];
  this.currentState;
  this.opacity = 100;
  this.states = { };
}

Object.defineProperties(GraphicTool.prototype, {
  DOWN: {value: 1},
  UP: {value: 0},
})

GraphicTool.prototype.switchState = function(switchID) {
  if(this.currentState) this.currentState.exitState( );
  this.states[switchID].enterState( );
  this.currentState = this.states[switchID];
}

GraphicTool.prototype.update = function(event) {
  this.currentState.update(event);
}

export default GraphicTool;
