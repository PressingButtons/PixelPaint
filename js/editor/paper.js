const Layers = [];

let width = 2480, height = 3508;
let currentTool;
let scale = 0.3;

const createCanvas = config => {
  const canvas = document.createElement('canvas');
  canvas.width = config.width || config[0],
  canvas.height = config.height || config[1];
  return canvas;
}

const getPosition = event => {
  const rect = event.target.getBoundingClientRect( );
  return {x: event.clientX - rect.x, y: event.clientY - rect.y}
}

const moveCursoer = pos => {
  let size = currentTool ? currentTool.size : 10;
  $('.cursor').css({width: size, height: size})
  let x = (pos.x / scale) - $('.cursor').width( )/2;
  let y = (pos.y / scale) - $('.cursor').height( )/2;
  $('.cursor').css('transform', `translate(${x}px, ${y}px)`)
}

const OnPoinerEvent = { };

OnPoinerEvent.pointerdown = (event, pos) => {
  currentTool.isDown = true;
  currentTool.Update(pos);
}

OnPoinerEvent.pointermove = (event, pos) => {
  currentTool.Update(pos);
}

OnPoinerEvent.pointerup = (event, pos) => {
  currentTool.isDown = false;
  currentTool.Update(pos);
}

const PointerDirector = event => {
  const pos = getPosition(event);
  moveCursoer(pos);
  if(!currentTool) return;
  if(OnPoinerEvent[event.type]) OnPoinerEvent[event.type](event.originalEvent, pos);
}

const setPointerListeners = (handler) => {
  $('#bufferCanvas', '.paper').on('pointerover',  handler);
  $('#bufferCanvas', '.paper').on('pointerenter', handler);
  $('#bufferCanvas', '.paper').on('pointerdown',  handler);
  $('#bufferCanvas', '.paper').on('pointermove',  handler);
  $('#bufferCanvas', '.paper').on('pointerup',    handler);
  $('#bufferCanvas', '.paper').on('pointercancel',handler);
  $('#bufferCanvas', '.paper').on('pointerout',   handler);
  $('#bufferCanvas', '.paper').on('pointerleave', handler);
}


export const init = ( ) => {
  setPointerListeners(PointerDirector);
}

export const Resize = function(config) {
  width = config.width, height = config.height
  $('canvas', '.paper').css({width: width, height: height});
}

export const NewPaper = function(config) {
  Resize(config);
  while(Layers.length > 0) Layers.pop( );
}

export const NewLayer = function( ) {
  const canvas = createCanvas([width, height]);
  $('.layers', '.paper').append(canvas);
  Layers.push(canvas.getContext('2d'));
}

export const setTool = function(tool) {
  currentTool = tool;
}
