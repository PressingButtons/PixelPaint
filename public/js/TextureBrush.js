const TEXTURES = { };
const BRUSHES = { };
//methods
const buildCircleBrushTexture = (gl, size) => {
  let co = canvasObject(size, size);
  co.context.fillStyle = 'black';
  co.context.beginPath();
  co.context.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
  co.context.fill( );
  co.context.closePath( );
  catalogTexture(gl, co.canvas, 'circle_brush');
}

const canvasObject = (width, height) => {
  let canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  return { canvas: canvas, context: canvas.getContext('2d') }
}
//exports
export const init = (gl) => {
  buildCircleBrushTexture(gl, 50);
}

export const catalogTexture = (gl, image, name) => {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  TEXTURES[name.toUpperCase()] = texture;
}
export const getTexture = (name) => {
  return TEXTURES[name];
}

export const CIRCLE_BRUSH = "CIRCLE_BRUSH";
