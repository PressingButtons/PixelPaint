//globals
let webGL;
//methods
/* initalization method */
const init = canvas => {
  webGL = canvas.getContext('webgl');
  clear(webGL, 1,1,1);
}

const clear = (gl, red, green, blue) => {
  if(!gl) throw "WebGL context not found.";
  gl.clearColor(red, green, blue, 1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}

export {clear, init}
