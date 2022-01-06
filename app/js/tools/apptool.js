import * as Tools from './$tools.js';

const AppTool = function(config) {

  let currentTool;
  let toolIsDown = false;

  let tools = {
    pen : new Tools.GraphicPen(this),
    pencil : new Tools.GraphicPencil(this),
    eraser: new Tools.Eraser(this),
  }

  const selectTool = tool => {
    currentTool = tool;
  }

  const update = (pos, pressure) => {
    if( currentTool ) {
      if(currentTool == tools.pen) currentTool.update(createConfig(pos, pressure, paper.getBuffer()));
      else currentTool.update(createConfig(pos, pressure, paper.getCurrentLayer()));
    }
  }

  const changeBlend = event => {
    if(currentTool) {
      currentTool.blendMode = event.detail;
      document.dispatchEvent(new CustomEvent('tooldata', {detail: currentTool}))
    }
  }

  const changeColor = event => {
    color = event.detail;
  }

  const changeOpacity = event => {
    if(currentTool) {
      currentTool.opacity = (event.detail/100) * 255;
      document.dispatchEvent(new CustomEvent('tooldata', {detail: currentTool}))
    }
  }

  const changeSize = event => {
    if(currentTool) {
      currentTool.size = event.detail;
      document.dispatchEvent(new CustomEvent('tooldata', {detail: currentTool}))
    }
  }

  const changeTool = event => {
    currentTool = tools[event.detail] || null;
    if(currentTool) {
      currentTool.currentState = currentTool.UpState;
      document.dispatchEvent(new CustomEvent('tooldata', {detail: currentTool}))
    }
  }

  const createConfig = function(pos, pressure, context) {
    return {
      size: size,
      pos: pos,
      strokeStyle: color,
      pressure: pressure,
      opacity: _opacity,
      context: context,
      blendMode: blendMode
    }
  }

  const cursorDown = config => {
    if(currentTool && currentTool != tools.eraser) currentTool.toDownState({context: paper.getBuffer(), opacity: _opacity});
    else if(currentTool && currentTool == tools.eraser) currentTool.toDownState({context: paper.getCurrentLayer()});
  }

  const cursorUp = config => {
    if(currentTool) currentTool.toUpState(createConfig(null, 0, paper.getCurrentLayer()));
  }

  const getSize = config => {
    return currentTool.size || 0;
  }

  const setSize = n => {
    if(currentTool) {
      currentTool.size = n;
      document.dispatchEvent(new CustomEvent('tooldata', {detail: currentTool}));
    }
  }

  const setMainContext = context => {
    mainContext = context
  }

  const setTool = type => {
    currentTool = tools[type];
  }

  const setScale = scale => {
    for(var type in tools) tools[type].scale = scale;
  }

  setScale(0.3);
  return {
    changeBlend: changeBlend,
    changeColor: changeColor,
    changeOpacity: changeOpacity,
    changeSize: changeSize,
    changeTool: changeTool,
    cursorDown: cursorDown,
    cursorUp: cursorUp,
    setScale: setScale,
    update: update,
    getSize: getSize,
    setSize: setSize,
    set color( value ) { color = value },
    get opacity( ) { return _opacity;},
    set opacity(n) { _opacity = n|0; },
    get ToolIsDown( ) {return toolIsDown}
  }

}

export default AppTool;
