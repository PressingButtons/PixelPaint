import {getText} from './utils.js';
const Shaders = { };
//Methods
const createShaderProgram = (gl, type) => {
  let vertex   = getText(`/shader/${type}vertex.txt`).then(source => createShader(gl, gl.VERTEX_SHADER, source)),
      fragment = getText(`/shader/${type}fragment.txt`).then(source => createShader(gl, gl.FRAGMENT_SHADER, source));
  return Promise.all([vertex, fragment])
  .then(results => {return compileShaderProgram(gl, type, results[0], results[1])})
  .catch(onShaderInitializationError);
}

const createShader = (gl, type, source) => {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw  `Error, could not compile shader[${type}].\n\n${gl.getShaderInfoLog(shader)}`;
  }
  return shader;
}

const compileShaderProgram = (gl, type, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if(success) return setProgram(type, gl, program);
  let message = `Unable to initialize shader program: ${gl.getProgramInfoLog(program)}.`;
  gl.deleteProgram(program);
  throw message;
}

const setProgram = (type, gl, program) => {
  Shaders[type] = {
    program: program,
    attributeLocations: {
      vPosition: gl.getAttribLocation(program, 'aVertexPosition'),
      vColor: gl.getAttribLocation(program, 'aVertexColor')
    },
    uniformLocations: {
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uZIndex: gl.getUniformLocation(program, "uZIndex")
    }
  }
}

const onShaderInitializationError = err => {
  console.error(
    `Error on shader initiliation`,
    `\n============================\n`,
    err);
  throw err;
}
//Exports
export const initialize = (gl) => {
  return Promise.all([
    createShaderProgram(gl,'line'),
    //createShaderProgram(gl, 'texture')
  ]);
}

export const getShader = (type) => {
  if(!Shaders[type]) throw `Shader ${type} is not compiled.`;
  return Shaders[type];
}
