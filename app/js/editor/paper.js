const layers = [];
let canvasSize;
//const size = {width: 2480, height: 3508};
let paper;

const setListeners = ( ) => {
  document.addEventListener('paperResize', listeners.onPaperResize);
  document.addEventListener('requestNewLayer', listeners.onNewLayer);
  document.addEventListener('renderPath', listeners.onRenderPath);
  document.addEventListener('renderPlot', listeners.onRenderPlot);
  document.addEventListener('clearBuffer', listeners.onClearBuffer);
  document.addEventListener('clearLayer', listeners.onClearLayer);
  document.addEventListener('hideLayer', listeners.onHideLayer);
  document.addEventListener('showLayer', listeners.onShowLayer);
  document.addEventListener('destroyLayer', listeners.onDestroyLayer);
  document.addEventListener('mergeLayer', listeners.onDestroyLayers);
  document.addEventListener('swapLayers', listeners.onSwapLayers);
  document.addEventListener('layerOpacityChange', listeners.onLayerOpacityChange);
  paper.addEventListener('pointerdown', listeners.onPointerEvent);
  paper.addEventListener('pointermove', listeners.onPointerEvent);
  paper.addEventListener('pointerup', listeners.onPointerEvent);
  paper.addEventListener('pointerleave', listeners.onPointerEvent);
}

const init = ( ) => {
  document.dispatchEvent(new CustomEvent('paperResize', {detail: {w: 2400, h: 3500}}));
  methods.addLayer( );
}

const listeners = { };

listeners.onLayerOpacityChange = event => {
  const activeLayer = window.currentLayer;
  if(!activeLayer) return;
  methods.changeOpacity(activeLayer, event.detail/100);
}

listeners.onPaperResize = function(event) {
  methods.resizePaper(event.detail);
}

listeners.onNewLayer = function(event) {
  methods.addLayer( );
}

listeners.onPointerEvent = function(event) {
  const pos = positionFromMouseEvent(event);
  document.dispatchEvent(new CustomEvent('paperPointerEvent', {detail:{
    event: event,
    pos: pos,
  }}))
}

listeners.onRenderPath = function(event) {
  const layer = event.detail.layer;
  if(!layer || layer.raster.canvas.style.display == "none") return;
  methods.clear(layer.buffer.canvas);
  methods.drawPath(layer.raster.canvas, event.detail);
}

listeners.onRenderPlot = function(event) {
  const layer = event.detail.layer;
  if(!layer || layer.raster.canvas.style.display == "none") return;
  methods.clear(layer.buffer.canvas);
  methods.drawPath(layer.buffer.canvas, event.detail)
}

listeners.onSwapLayers = function(event) {
  methods.swapLayerElements(event.detail[0], event.detail[1]);
}

////////////////////////////////////////////
// Layer command listeners
////////////////////////////////////////////
listeners.onClearLayer = event => {
  const layer = event.detail.layer.raster;
  layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
}

listeners.onHideLayer = event => {
  const layer = event.detail.layer;
  layer.raster.canvas.style.display = "none";
  layer.buffer.canvas.style.display = "none";
}


listeners.onShowLayer = event => {
  const layer = event.detail.layer;
  layer.raster.canvas.style.display = "block";
  layer.buffer.canvas.style.display = "block";
}


listeners.onDestroyLayer = event => {
  const index = layers.indexOf(event.detail);
  layers.splice(index, 1);
  event.detail.raster.canvas.remove( );
  event.detail.buffer.canvas.remove( );
  //methods.selectNextLayer(event.detail);
}

const methods = { };

methods.addLayer = ( ) => {
  const layer = {
    raster: createCanvasObject(canvasSize),
    buffer: createCanvasObject(canvasSize)
  }
  layers.push(layer);
  document.dispatchEvent(new CustomEvent('newLayer', {detail: {layer: layer, index: layers.length - 1}}));
  paper.appendChild(layer.raster.canvas);
  paper.appendChild(layer.buffer.canvas);
}

methods.changeOpacity = (layer, value) => {
  layer.raster.canvas.style.opacity = value;
  layer.buffer.canvas.style.opacity = value;
}

methods.clear = canvas => {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

methods.drawPath = (canvas, config) => {
  const context = canvas.getContext('2d');
  context.strokeStyle = config.color;
  context.globalCompositeOperation = config.blend;
  context.lineWidth = config.size;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  methods.plotPath(context, config.path);
  context.stroke( );
}

methods.plotPath = (context, path) => {
  context.beginPath( );
  for(const point of path) {
    if(path.indexOf(point) == 0 ) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y)
  }
}

methods.resizePaper = function(size) {
  paper.style.width = size.w + 'px';
  paper.style.height = size.h + 'px';
  paper.querySelectorAll('canvas').forEach((canvas, i) => {
    canvas.width = size.w;
    canvas.height = size.h;
  });
  canvasSize = size;
  document.querySelector('#zoomLevel').dispatchEvent(new Event('change'));
}

methods.selectNextLayer = index => {
  let layer;
  while(index > -1 && layer == undefined) {
    if(layers[index]) layer = layers[index];
    else index --;
  }
  //if(layer) document.dispatchEvent(new CustomEvent('layerSelect', {detail: index}));
}

methods.swapLayerElements = (layerA, layerB) => {
  const container = layerA.raster.canvas.parentNode;
  container.insertBefore(layerB.buffer.canvas, layerA.buffer.canvas);
  container.insertBefore(layerA.buffer.canvas, layerB.raster.canvas);
  container.insertBefore(layerA.raster.canvas, layerA.buffer.canvas);
  container.insertBefore(layerB.raster.canvas, layerB.buffer.canvas);
}

export default function( ) {
  paper = document.querySelector('.paper');
  setListeners( );
  init( );
}
