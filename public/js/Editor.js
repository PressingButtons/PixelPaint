import {createMatrix} from './utils.js';
//globals
let graphics,
    tool = {type: 0, active: false},
    pointer = {position: [], size: 1},
    properties = {
      color: {
        primary: "#000000",
        alternate: "#FFFFFF",
        opacity: 1,
        get getPrimaryVertices() {
          return [this.primary.r, this.primary.g, this.primary.b, this.opacity];
        },
        get getAlternateVertices() {
          return [this.alternate.r, this.alternate.g, this.alternate.b, this.opacity];
        }
      }
    },
    actionLog = [],
    actionBuffer = [];
//methods
const clearAll = (color) => {
  graphics.clear(graphics.gl, color.r, color.g, color.b);
}

const commit = buffer => {
  actionLog.push(buffer);
}

const createPath = (vertices, size) => {
  let dx = vertices[2] - vertices[0],
      dy = vertices[3] - vertices[1];

}

const getRelativePosition = event => {
  let rect = event.target.getBoundingClientRect( );
  return {x: event.clientX - rect.x, y: event.clientY - rect.y};
}

const setListeners = canvas => {
  canvas.addEventListener('contextmenu', onContextMenu);
  canvas.addEventListener('pointerover', onPointerEvent);
  canvas.addEventListener('pointerenter', onPointerEvent);
  canvas.addEventListener('pointerdown', onPointerEvent);
  canvas.addEventListener('pointermove', onPointerEvent);
  canvas.addEventListener('pointerup', onPointerEvent);
  canvas.addEventListener('pointercancel', onPointerEvent);
  canvas.addEventListener('pointerout', onPointerEvent);
  canvas.addEventListener('pointerleave', onPointerEvent);
  canvas.addEventListener('gotpointercapture', onPointerEvent);
  canvas.addEventListener('lostpointercapture', onPointerEvent);
  $('#primaryColor').change( event => selectPrimaryColor(event.target.value));
  $('#alternateColor').change( event => selectAlternateColor(event.target.value));
  $('#opacity').change(event => setColorOpacity(event.target.value))
  $('#clearAll').click(event => clearAll(properties.color.alternate));
}

const onContextMenu = event => {
  if(tool.type == 0)
    event.preventDefault( );
}

const pointerEvent = { };

pointerEvent.pointerover = event => {

}

pointerEvent.pointerenter = event => {

}

pointerEvent.pointerdown = event => {
  tool.active = true;
  toolAction[tool.type](tool.value, event);
}

pointerEvent.pointermove = event => {
  if(tool.active) toolAction[tool.type](tool.value, event);
}

pointerEvent.pointerup = event => {
  tool.active = false;
  if(actionBuffer.length > 0) {
    commit(actionBuffer);
  }
}

const onPointerEvent = event => {
  updatePointerPosition(event);
  if(pointer.position.length < 4) updatePointerPosition(event);
  if(pointerEvent[event.type])
    pointerEvent[event.type](event);
  updatePointerPosition(event);
}

const snapShot = (gl) => {
  const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
}

const setColorOpacity = num => {
  properties.color.opacity = num/100;
  $('#opacity').val(num);
}

const toComponent = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16)/255, g: parseInt(result[2], 16)/255,
    b: parseInt(result[3], 16)/255, a: properties.color.opacity
  } : {r:0, g:0, b:0, a: 1}
}

const toolAction = { };

toolAction["0"] = (value, pointer_event) => {
  let color_vertices = pointer_event.buttons == 1 ? properties.color.getPrimaryVertices : properties.color.getAlternateVertices;
  let path = createPath(pointer.position, pointer.size);
  let vertices = createMatrix(pointer.position, color_vertices, 2, 6);
  actionBuffer = actionBuffer.concat(vertices);
  graphics.renderLine(vertices);
}

const updatePointerPosition = event => {
  let pos = getRelativePosition(event);
  pointer.position.unshift(pos.y)
  pointer.position.unshift(pos.x);
  while(pointer.position.length > 4) {
    pointer.position.pop( );
  }
}

//exports
export const init = Graphics => {
  graphics = Graphics;
  setListeners(graphics.gl.canvas);
  selectPrimaryColor('#000000');
  selectAlternateColor("#FFFFFF");
  setColorOpacity(100);
}

export const selectTool = value => {
  tool.value = value;
  tool.active = false;
}

export const selectPrimaryColor = hex => {
  properties.color.primary = toComponent(hex);
  $('#primaryColor').val(hex);
}

export const selectAlternateColor = hex => {
  properties.color.alternate = toComponent(hex);
  $('#alternateColor').val(hex);

}
