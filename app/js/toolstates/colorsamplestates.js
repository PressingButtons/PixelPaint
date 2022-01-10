//Graphic Pen States
const ColorSampleDownState = function(pen) {
  this.pen = pen;
}

ColorSampleDownState.prototype.enterState = function(config) {
  this.pen.colorValue = getColorValue(config);
}

ColorSampleDownState.prototype.exitState = function(config) {
  if(this.pen.colorValue != undefined)
    document.dispatchEvent(new CustomEvent('setColor', {detail: this.pen.colorValue}));
}

ColorSampleDownState.prototype.update = function(config){
  this.pen.colorValue = getColorValue(config);
}

///////////////////////////////////////////////////////////////////////////
/// Up State
///////////////////////////////////////////////////////////////////////////

const ColorSampleUpState = function(pen) {
  this.pen = pen;
}

ColorSampleUpState.prototype.enterState = function(config) {
}

ColorSampleUpState.prototype.exitState = function(config) {
}

ColorSampleUpState.prototype.update = function(config) {

}

////////////////////////
const getColorValue = event => {
  if(!event) return undefined;
  const canvas = document.querySelector('.paper canvas');
  const rgba = canvas.getContext('2d').getImageData(event.detail.pos.x, event.detail.pos.y, 1, 1).data;
  let hex = Array.from(rgba).map(num => num.toString(16).padStart(2, 0));
  return "#" + hex.join("");
}

export {ColorSampleDownState, ColorSampleUpState};
