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

EraserDownState.prototype.enterState = function(context) {
  this.pen.positions = [];
}

EraserDownState.prototype.exitState = function(context) {

}

EraserDownState.prototype.update = function(pos, context){
  this.pen.logPosition(pos);
  const config = createPathConfig(this.pen, context);
  renderPath(config);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const EraserUpState = function(pen) {
  this.pen = pen;
}

EraserUpState.prototype.enterState = function(context) {
  const config = createPathConfig(this.pen, context);
  renderPath(config);
}

EraserUpState.prototype.exitState = function(context) {
  
}

EraserUpState.prototype.update = function(position) {

}

export {EraserDownState, EraserUpState};
