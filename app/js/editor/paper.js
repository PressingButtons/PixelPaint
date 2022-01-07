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
  const layer = layers[event.detail.layer];
  methods.clear(layer.buffer.canvas);
  methods.drawPath(layer.raster.canvas, event.detail);
}

listeners.onRenderPlot = function(event) {
  const layer = layers[event.detail.layer];
  methods.clear(layer.buffer.canvas);
  methods.drawPath(layer.buffer.canvas, event.detail)
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


export default function( ) {
  paper = document.querySelector('.paper');
  setListeners( );
  init( );
}
