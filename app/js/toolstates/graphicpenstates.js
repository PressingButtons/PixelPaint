//Graphic Pen States
const GraphicPenDownState = function(pen) {
  this.pen = pen;
}

GraphicPenDownState.prototype.enterState = function(config) {
  this.pen.pointLog = [ ];
}

GraphicPenDownState.prototype.exitState = function(config) {
  this.pen.machine.dispatchPath('path', {
    path: this.pointLog,
    size: this.pen.size,
    blend: this.pen.blendMode
  });
}

GraphicPenDownState.prototype.update = function(event){
  this.pen.pointLog.push(event.detail.pos);
  this.pen.machine.dispatchPath('plot', {
    path: this.pointLog,
    size: this.pen.size,
    blend: this.pen.blendMode
  });
}


///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const GraphicPenUpState = function(pen) {
  this.pen = pen;
}

GraphicPenUpState.prototype.enterState = function(config) {
  this.pen.pointLog = [ ];
}

GraphicPenUpState.prototype.exitState = function(context) {
  this.pen.pointLog = [ ];
}

GraphicPenUpState.prototype.update = function(position) {

}

export {GraphicPenDownState, GraphicPenUpState};
