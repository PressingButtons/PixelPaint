import GraphicLayer from './graphiclayer.js'

const layers = [];
let canvasSize, composite;
//const size = {width: 2480, height: 3508};
let paper;
let mousePos;

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
  document.addEventListener('mergeLayer', listeners.onMergeLayer);
  document.addEventListener('swapLayers', listeners.onSwapLayers);
  document.addEventListener('layerOpacityChange', listeners.onLayerOpacityChange);
  document.addEventListener('layerBlend', listeners.onLayerBlendChange);
  document.addEventListener('beginDraw', listeners.onBeginDraw);
  document.addEventListener('flipCanvas', listeners.onFlipCanvas);
  paper.addEventListener('pointerdown', listeners.onPointerEvent);
  paper.addEventListener('pointermove', listeners.onPointerEvent);
  paper.addEventListener('pointerup', listeners.onPointerEvent);
  paper.addEventListener('pointerleave', listeners.onPointerEvent);
}

const init = ( ) => {
  composite = createCanvasObject({w: 1200, h: 1750});
  paper.appendChild(composite.canvas);
  document.dispatchEvent(new CustomEvent('paperResize', {detail: {w: 1200, h: 1750}}));
  methods.addLayer( );
}

const listeners = { };

listeners.onBeginDraw = event => {
  const layer = window.currentLayer;
  layer.buffer.ctx.drawImage(layer.raster.canvas, 0, 0);
}

listeners.onFlipCanvas = event => {
  for(const layer of layers) methods.flipLayer(layer);
  methods.drawComposite( );
}

listeners.onLayerBlendChange = event => {
  const activeLayer = window.currentLayer;
  if(!activeLayer) return;
  methods.changeBlend(activeLayer, event.detail);
}

listeners.onLayerOpacityChange = event => {
  const activeLayer = window.currentLayer;
  if(!activeLayer) return;
  methods.changeOpacity(activeLayer, event.detail/100);
}

listeners.onMergeLayer = function( ) {
  while(layers.length > 1 ) {
    const layer = layers.pop( );
    const next = layers[layers.length - 1];
    next.raster.ctx.drawImage(layer.raster.canvas, 0, 0);
    layer.raster.canvas.dispatchEvent(new Event('delete'));
  }
  methods.drawComposite( );
}

listeners.onNewLayer = function(event) {
  methods.addLayer( );
}

listeners.onPaperResize = function(event) {
  methods.resizePaper(event.detail);
}

listeners.onPointerEvent = function(event) {
  mousePos = positionFromMouseEvent(event);
  if(event.type == 'pointerleave') mousePos = null;
  document.dispatchEvent(new CustomEvent('paperPointerEvent', {detail:{
    event: event,
    pos: mousePos,
  }}));
  methods.drawComposite( );
}

listeners.onRenderPath = function(event) {
  const layer = event.detail.layer;
  if(!layer || !layer.visible) return;
  methods.clear(layer.raster.ctx);
  layer.raster.ctx.drawImage(layer.buffer.canvas, 0, 0);
  methods.drawComposite( );
  methods.drawPath(layer.raster.canvas, event.detail);
  methods.clear(layer.buffer.ctx);
}

listeners.onRenderPlot = function(event) {
  const layer = event.detail.layer;
  if(!layer || !layer.visible) return;
  methods.clear(layer.raster.ctx);
  layer.raster.ctx.drawImage(layer.buffer.canvas, 0, 0);
  methods.drawPath(layer.raster.canvas, event.detail)
  methods.drawComposite( );
}

listeners.onSwapLayers = function(event) {
  const a = layers.indexOf(event.detail[0]);
  const b = layers.indexOf(event.detail[1]);
  let s = layers[a];
  layers[a] = layers[b];
  layers[b] = s;
  methods.drawComposite( );
}

////////////////////////////////////////////
// Layer command listeners
////////////////////////////////////////////
listeners.onClearLayer = event => {
  const layer = event.detail.layer.raster;
  layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
}

listeners.onHideLayer = event => {
  event.detail.layer.visible = false;
  methods.drawComposite( );
}


listeners.onShowLayer = event => {
  event.detail.layer.visible = true;
  methods.drawComposite( );
}


listeners.onDestroyLayer = event => {
  const index = layers.indexOf(event.detail);
  layers.splice(index, 1);
  //event.detail.buffer.canvas.remove( );
  methods.drawComposite( );
}

const methods = { };

methods.addLayer = ( ) => {
  const layer = new GraphicLayer(canvasSize)
  layers.push(layer);
  document.dispatchEvent(new CustomEvent('newLayer', {detail: {layer: layer, index: layers.length - 1}}));
}

methods.changeBlend = (layer, value) => {
  layer.setBlend(value);
  methods.drawComposite( );
}

methods.changeOpacity = (layer, value) => {
  layer.opacity = value;
  methods.drawComposite( );
}

methods.clear = ctx => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

methods.drawComposite = ( ) => {
  methods.clear(composite.ctx);
  for(const layer of layers) {
    if(!layer.visible) continue;
    composite.ctx.globalCompositeOperation = layer.blend;
    composite.ctx.globalAlpha = layer.opacity;
    composite.ctx.drawImage(layer.raster.canvas, 0, 0);
  }
  methods.drawCursor( );
}

methods.drawCursor = ( ) => {
  if(!mousePos) return;
  composite.ctx.beginPath( );
  composite.ctx.globalCompositeOperation = 'difference';
  composite.ctx.strokeStyle = '#777';
  composite.ctx.lineWidth = 2;
  composite.ctx.arc(mousePos.x, mousePos.y, window.toolSize/2, 0, 2 * Math.PI);
  composite.ctx.stroke( );
}

methods.drawPath = (canvas, config) => {
  const context = canvas.getContext('2d');
  const originalComposite = context.globalCompositeOperation;
  context.strokeStyle = config.color;
  context.globalCompositeOperation = config.blend;
  context.lineWidth = config.size;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  methods.plotPath(context, config.path);
  context.stroke( );
  context.globalCompositeOperation = originalComposite;
}

methods.flipLayer = layer => {
  methods.clear(layer.buffer.ctx);
  layer.buffer.ctx.setTransform(-1, 0, 0, 1, 0, 0);
  layer.buffer.ctx.drawImage(layer.raster.canvas, -layer.raster.canvas.width, 0);
  layer.buffer.ctx.setTransform( 1, 0, 0, 1, 0, 0);
  methods.clear(layer.raster.ctx);
  layer.raster.ctx.drawImage(layer.buffer.canvas, 0, 0);
  methods.clear(layer.buffer.ctx);
}

methods.plotPath = (context, path) => {
  context.beginPath( );
  for(const point of path) {
    if(path.indexOf(point) == 0 ) context.moveTo(point.x, point.y);
    else if (point) context.lineTo(point.x, point.y)
  }
}

methods.resizePaper = function(size) {
  paper.style.width = size.w + 'px';
  paper.style.height = size.h + 'px';
  composite.canvas.width = size.w;
  composite.canvas.height = size.h;
  for(const layer of layers) layer.resize(size);
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
