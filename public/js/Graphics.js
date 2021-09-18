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
  setBlendMode(webGL)
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

const renderLine = (vertices, z = 0, texture = null) => {
  if(texture == null) renderPolyLine(vertices, z);
  else renderTextureBrush(webGL, texture, vertices, z)
}

const renderPolyLine = (vertices, z = 0) => {
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
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

const renderTextureBrush = (gl, texture, vertices, depth) => {
  const shader = ShaderLib.getShader('texture');
  if(!shader) throw 'Error: No appropriate shader found to render [texture]';
  // Which program to use
  gl.useProgram(shader.program);
  //set resolution
  gl.uniform2f(shader.uniformLocations.uResolution, resolution.width, resolution.height);
  //create buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, gblBuffer);
  //feed buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //set texture
  gl.bindTexture(gl.TEXTURE_2D, texture);
  invokeAttribute(gl, shader.attributeLocations.vPosition, 2, 4, 0);
  invokeAttribute(gl, shader.attributeLocations.vTexture, 2, 4, 2);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
}

const setBlendMode = gl => {
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
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
