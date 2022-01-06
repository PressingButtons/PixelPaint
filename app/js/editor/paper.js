const layers = [];
const size = {width: 2480, height: 3508};
let buffer;
let paper;

//exports
export const init = ( ) => {
  paper = document.querySelector('.paper');
  buffer = document.querySelector('#bufferCanvas').getContext('2d');
  document.addEventListener('requestNewLayer', addLayer);
}

export const addLayer = ( ) => {
  let ctx = createCanvasContext(size);
  ctx.canvas.setAttribute('id', 'layer' + layers.length);
  document.querySelector('.paper .layers').append(ctx.canvas);
  layers.push(ctx);
  createLayerHTML( ).then( html => {
    document.dispatchEvent(new CustomEvent('newlayer', {detail: {ctx: ctx, index: layers.length = 1, html: html}}));
  })
}

const createLayerHTML = ( ) => {
  return window.fetchText('../html/layer.html').then(createLayerUI);
}

const createLayerUI = htmlText => {
  const div = domParser.parseFromString(htmlText, 'text/html').body.firstChild;
  const dim = getDimensions( );
  $('canvas', div).width(dim.w);
  $('canvas', div).height(dim.h);
  return div;
}

const getDimensions = ( ) => {
  const max = 50;
  const ratio = size.width / size.height;
  const w = size.width > size.height ? max : (max * ratio) | 0;
  const h = size.height > size.width ? max : (max / ratio) | 0;
  return {w: w, h: h};
}

export const resize = (width, height) => {
  size.width = width;
  size.height = height;
  for(const layer of layers) {
    layer.canvas.width = width;
    layer.canvas.height = height;
  }
  buffer.canvas.width = width;
  buffer.canvas.height = height;

  paper.style.width = width + 'px';
  paper.style.height = height + 'px';
}

export const getLayer = index => {
  return layers[index];
}

export const getBuffer = ( ) => {
  return buffer;
}

export const bindPaper = (type, func) => {
  buffer.canvas.addEventListener(type, func);
}
