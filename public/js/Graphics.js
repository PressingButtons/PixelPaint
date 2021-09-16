import * as ShaderLib from './shader.js';
//constants
const GL_PROPERTIES = {
  preserveDrawingBuffer: true,
  premultipledAlpha: false,
}
//globals
let webGL, resolution = {}, gblBuffer;
//methods
/* initalization method */
const init = canvas => {
  webGL = canvas.getContext('webgl', GL_PROPERTIES);
  //setBlendMode(webGL)
  clear(webGL, 1,1,1);
  setResolution(canvas.width, canvas.height);
  gblBuffer = webGL.createBuffer( );
  return ShaderLib.initialize(webGL);
}

const clear = (gl, red = 1, green = 1, blue = 1) => {
  if(!gl) throw "WebGL context not found.";
  gl.clearColor(red, green, blue, 1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}

const invokeAttribute = (gl, attribute, size, stride = 0, offset = 0) => {
  gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, stride * Float32Array.BYTES_PER_ELEMENT, offset * Float32Array.BYTES_PER_ELEMENT)
  gl.enableVertexAttribArray(attribute)
}

const renderLine = (vertices, z = 0) => {
  const shader = ShaderLib.getShader('line');
  const gl = webGL;
  if(!shader) throw 'Error: No appropriate shader found to render [lines]';
  gl.useProgram(shader.program);
  gl.uniform2f(shader.uniformLocations.uResolution, resolution.width, resolution.height)
  gl.uniform1f(shader.uniformLocations.uZIndex, z);
  gl.bindBuffer(gl.ARRAY_BUFFER, gblBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  invokeAttribute(gl, shader.attributeLocations.vPosition, 2, 6, 0);
  invokeAttribute(gl, shader.attributeLocations.vColor, 4, 6, 2);
  gl.drawArrays(gl.LINES, 0, 2)
}

const setBlendMode = gl => {
  gl.enable(webGL.BLEND);
  //webGL.blendFunc(webGL.SRC_ALPHA, webGL.DST_ALPHA);
  gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR);
}

const setResolution = (width, height) => {
  resolution.width = width;
  resolution.height = height;
  if(!webGL) return;
  webGL.canvas.width = width;
  webGL.canvas.height = height;
  clear(webGL);
}

export {clear, init, renderLine, setResolution, webGL as gl}
