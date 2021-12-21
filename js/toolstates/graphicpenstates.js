////////////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////////
const createPathConfig = (pen, context) => {

  const config = {
    strokeStyle: pen.strokeStyle,
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

GraphicPenDownState.prototype.enterState = function(context) {
  this.pen.positions = [];
}

GraphicPenDownState.prototype.update = function(pos, context){
  this.pen.logPosition(pos);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  const config = createPathConfig(this.pen, context);
  renderPath(config);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPenUpState = function(pen) {
  this.pen = pen;
}

GraphicPenUpState.prototype.enterState = function(context) {
  const config = createPathConfig(this.pen, context);
  renderPath(config);
}

GraphicPenUpState.prototype.update = function(position) {

}

export {GraphicPenDownState, GraphicPenUpState};
