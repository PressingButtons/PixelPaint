//Graphic Pen States
const GraphicPencilDownState = function(pen) {
  this.pen = pen;
}

GraphicPencilDownState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
  document.dispatchEvent(new Event('beginDraw'));
}

GraphicPencilDownState.prototype.exitState = function(config) {
  this.pen.machine.dispatchPath('path', this.pen);
}

GraphicPencilDownState.prototype.update = function(config){
  this.pen.pointLog.push(event.detail.pos);
  this.pen.machine.dispatchPath('plot', this.pen);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPencilUpState = function(pen) {
  this.pen = pen;
}

GraphicPencilUpState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
}

GraphicPencilUpState.prototype.exitState = function(config) {
  this.pen.pointLog = [];
}

GraphicPencilUpState.prototype.update = function(config) {

}

export {GraphicPencilDownState, GraphicPencilUpState};
