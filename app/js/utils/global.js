//variables
Object.defineProperties(window, {
  brushMin: {value: 1},
  brushMax: {value: 2000}
})
//methods

window.createCanvasObject = config => {
  const canvas = document.createElement('canvas');
  canvas.width = config.w
  canvas.height = config.h
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  canvas.style.opacity = 1;
  return {canvas: canvas, ctx: ctx};
}

const Position2D = function(pos) {
  this.x = pos.x || pos[0] || 0;
  this.y = pos.y || pos[1] || 0;
}

Position2D.prototype.ScalePosition = function(scale) {
  return {x: this.x / scale, y: this.y / scale};
}

Position2D.prototype.Add = function(value) {
  this.x += value.x || value[0] || 0;
  this.y += value.y || value[1] || 0;
}

Position2D.prototype.Set = function(value) {
  this.x = value.x || value[0] || this.x;
  this.y = value.y || value[1] || this.y;
}

window.Position2D = Position2D;

window.positionFromMouseEvent = event => {
  const rect = event.target.getBoundingClientRect( );
  return {x: ((event.clientX - rect.x) / getZoom( )) | 0, y: ((event.clientY - rect.y) / getZoom( )) | 0};
}

window.renderPath = config => {
  config.ctx.strokeStyle = config.strokeStyle;
  config.ctx.globalCompositeOperation = config.renderType;
  config.ctx.lineWidth = config.size;
  config.ctx.lineCap = config.lineCap;
  config.ctx.lineJoin = 'round';
  config.ctx.beginPath( );
  for(let i = 0; i < config.positions.length; i++) {
    const currentPosition = config.positions[i].ScalePosition(config.scale);
    if(i == 0) config.ctx.moveTo(currentPosition.x, currentPosition.y);
    else config.ctx.lineTo(currentPosition.x, currentPosition.y);
  }
  config.ctx.stroke( );
}

window.parseRelativePosition = event => {
  const rect = event.target.getBoundingClientRect( );
  return {x: event.clientX - rect.x, y: event.clientY - rect.y};
}

window.fetchText = url => {
  return fetch(url).then(response => response.text());
}

window.domParser = new DOMParser( );

window.fetchHTML = url => {
  return fetchText(url).then(html => {
    return domParser.parseFromString(html, 'text/html').body.children;
  })
}

window.onLayerBlendChange = function(element) {

}

window.onBrushOpacityChange = function(element) {
  const value = element.value;
  document.querySelector('input[name="brushOpacitySlider"]').value = value;
  document.querySelector('input[name="brushOpacityNumber"]').value = value;
  document.dispatchEvent(new CustomEvent('brushOpacityChange', {detail: value}));
}

window.onBrushSizeChange = function(element) {
  const value = element.value;
  document.querySelector('input[name="brushSizeSlider"]').value = value;
  document.querySelector('input[name="brushSizeNumber"]').value = value;
  document.dispatchEvent(new CustomEvent('brushSizeChange', {detail: value}));
}


window.onBrushTypeChange = function(event) {
  document.dispatchEvent(new CustomEvent('brushType', {detail: event.value}))
}

window.onLayerOpacityChange = function(element) {
  const value = element.value;
  document.querySelector('input[name="layerOpacitySlider"]').value = value;
  document.querySelector('input[name="layerOpacityNumber"]').value = value;
  document.dispatchEvent(new CustomEvent('layerOpacityChange', {detail: value}));
}

window.onLayerSelect = function(event) {
  document.dispatchEvent(new CustomEvent('layerSelect', {detail: event}));
}

window.onZoomChange = function(element) {
  document.dispatchEvent(new CustomEvent('zoomChange', {detail: element.value}))
}

window.requestNewLayer = function( ) {
  document.dispatchEvent(new Event('requestNewLayer'));
}

window.canvasUpdateDim = function(element) {
  const value = { };
  value.w =  document.querySelector('input[name="canvasWidth"]').value;
  value.h =  document.querySelector('input[name="canvasHeight"]').value;
  if(confirm('Resizing the canvas will clear all layers. Continue?'))
  document.dispatchEvent(new CustomEvent('paperResize', {detail: value}));
}

window.mergeLayers = function(element) {
  if(confirm('Merge current active layer with layer below?'))
    document.dispatchEvent(new Event('mergeLayer'));
}

window.deleteLayers = function(element) {
  if(confirm('Delete all current layers?'))
    document.dispatchEvent(new Event('deleteLayers'));
}
