//Graphic Pen States
const EraserDownState = function(pen) {
  this.pen = pen;
}

EraserDownState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
}

EraserDownState.prototype.exitState = function(context) {

}

EraserDownState.prototype.update = function(config){
  this.pen.pointLog.push(event.detail.pos);
  this.pen.blendMode = 'destination-out';
  this.pen.machine.dispatchPath('path', this.pen);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const EraserUpState = function(pen) {
  this.pen = pen;
}

EraserUpState.prototype.enterState = function(config) {
  this.pen.pointLog = [];
}

EraserUpState.prototype.exitState = function(config) {
  this.pen.pointLog = [];
}

EraserUpState.prototype.update = function(config) {

}

export {EraserDownState, EraserUpState};
