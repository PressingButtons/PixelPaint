////////////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////////
const createPathConfig = (pen, context) => {
  const opaqueValue = ((pen.opacity * pen.pressure) | 0).toString(16).padStart(2, '0');
  const config = {
    strokeStyle: pen.strokeStyle + opaqueValue,
    renderType: pen.blendMode || "source-over",
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
  this.pressure = this.pen.pressure;
  this.prev = null;
}

GraphicPencilDownState.prototype.enterState = function(config) {
  this.pen.positions = [];
}

GraphicPencilDownState.prototype.exitState = function(context) {
  //this.pen.context.clearRect(0, 0, this.pen.context.canvas.width, this.pen.context.canvas.height);
}

GraphicPencilDownState.prototype.update = function(config){
  this.pen.logPosition(config.pos);
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
  this.prev = positions.slice(0);
  this.pen.positions = [this.pen.positions.pop()];
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPencilUpState = function(pen) {
  this.pen = pen;
}

GraphicPencilUpState.prototype.enterState = function(config) {
  //const path = createPathConfig(this.pen, config.context);
  //renderPath(path);
}

GraphicPencilUpState.prototype.exitState = function(config) {

}

GraphicPencilUpState.prototype.update = function(config) {

}

export {GraphicPencilDownState, GraphicPencilUpState};
