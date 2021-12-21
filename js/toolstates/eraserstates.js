////////////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////////
const createPathConfig = (pen, context) => {

  const config = {
    strokeStyle: pen.strokeStyle,
    renderType: "destination-out",
    size: pen.size,
    positions: pen.positions,
    ctx: context,
    scale: pen.scale,
    lineCap: 'round'
  }
  return config;
}

//Graphic Pen States
const EraserDownState = function(pen) {
  this.pen = pen;
}

EraserDownState.prototype.enterState = function(config) {
  this.pen.positions = [];
}

EraserDownState.prototype.exitState = function(context) {

}

EraserDownState.prototype.update = function(config){
  this.pen.logPosition(config.pos);
  this.pen.pressure = 1;
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const EraserUpState = function(pen) {
  this.pen = pen;
}

EraserUpState.prototype.enterState = function(config) {
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
}

EraserUpState.prototype.exitState = function(config) {

}

EraserUpState.prototype.update = function(config) {

}

export {EraserDownState, EraserUpState};
