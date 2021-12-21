const layers = [];
const size = {width: 2480, height: 3508};
let buffer;
let currentLayer = 0;

const addLayer = ( ) => {
  const ctx = createCanvasContext(size);
  ctx.canvas.setAttribute('id', 'layer' + layers.length);
  layers.push(ctx);
}

//exports
export const init = ( ) => {
  buffer = document.querySelector('#bufferCanvas').getContext('2d');
  addLayer( );
}

export const getLayer = index => {
  return layers[index];
}

export const getCurrentLayer = ( ) => {
  return layers[currentLayer];
}

export const getBuffer = ( ) => {
  return buffer;
}

export const bindPaper = (type, func) => {
  buffer.canvas.addEventListener(type, func);
}
