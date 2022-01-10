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

GraphicTool.prototype.switchState = function(switchID, event) {
  if(this.currentState) this.currentState.exitState(event);
  this.states[switchID].enterState(event);
  this.currentState = this.states[switchID];
}

GraphicTool.prototype.update = function(event, config) {
  this.currentState.update(event);
}

export default GraphicTool;
