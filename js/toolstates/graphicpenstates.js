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
const GraphicPenDownState = function(pen) {
  this.pen = pen;
}

GraphicPenDownState.prototype.enterState = function(config) {
  this.pen.positions = [];
  this.opacity = config.opacity;
}

GraphicPenDownState.prototype.exitState = function(config) {
  this.pen.context.clearRect(0, 0, this.pen.context.canvas.width, this.pen.context.canvas.height);
}

GraphicPenDownState.prototype.update = function(config){
  this.pen.logPosition(config.pos);
  this.pen.context.clearRect(0, 0, this.pen.context.canvas.width, this.pen.context.canvas.height);
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
}


///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPenUpState = function(pen) {
  this.pen = pen;
}

GraphicPenUpState.prototype.enterState = function(config) {
  const path = createPathConfig(this.pen, config.context);
  renderPath(path);
}

GraphicPenUpState.prototype.exitState = function(context) {

}

GraphicPenUpState.prototype.update = function(position) {

}

export {GraphicPenDownState, GraphicPenUpState};
