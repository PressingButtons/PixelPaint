////////////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////////
const createPathConfig = (pen, context) => {
  const opaqueValue = ((pen.opacity * /*pen.pressure*/ 1) | 0).toString(16).padStart(2, '0');
  const config = {
    strokeStyle: pen.strokeStyle + opaqueValue,
    renderType: "source-over",
    size: pen.size,
    positions: pen.positions,
    ctx: context,
    scale: pen.scale,
    lineCap: 'round'
  }
  return config;
}

//Graphic Pen States
const GraphicPencilDownState = function(pen) {
  this.pen = pen;
}

GraphicPencilDownState.prototype.enterState = function(config) {
  this.pen.positions = [];
}

GraphicPencilDownState.prototype.exitState = function(context) {

}

GraphicPencilDownState.prototype.update = function(config){
  this.pen.logPosition(config.pos);
  //this.pen.pressure = 1;
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
  while(this.pen.positions > 1) this.pen.positions.shift( );
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPencilUpState = function(pen) {
  this.pen = pen;
}

GraphicPencilUpState.prototype.enterState = function(config) {
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
}

GraphicPencilUpState.prototype.exitState = function(config) {

}

GraphicPencilUpState.prototype.update = function(config) {

}

export {GraphicPencilDownState, GraphicPencilUpState};
