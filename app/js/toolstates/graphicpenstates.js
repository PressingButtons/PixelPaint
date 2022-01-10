//Graphic Pen States
const GraphicPenDownState = function(pen) {
  this.pen = pen;
}

GraphicPenDownState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
  document.dispatchEvent(new Event('beginDraw'));
}

GraphicPenDownState.prototype.exitState = function(config) {
  this.pen.machine.dispatchPath('path', this.pen);
}

GraphicPenDownState.prototype.update = function(config){
  this.pen.pointLog.push(event.detail.pos);
  this.pen.machine.dispatchPath('plot', this.pen);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPenUpState = function(pen) {
  this.pen = pen;
}

GraphicPenUpState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
}

GraphicPenUpState.prototype.exitState = function(config) {
  this.pen.pointLog = [];
}

GraphicPenUpState.prototype.update = function(config) {

}

export {GraphicPenDownState, GraphicPenUpState};
