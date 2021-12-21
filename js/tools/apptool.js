import * as Tools from './$tools.js';

const AppTool = function(config) {

  let currentTool;
  let toolIsDown = false;
  let size = config.size;
  let _opacity = 255;
  let color = "#000000"
  let paper = config.paper;

  let tools = {
    pen : new Tools.GraphicPen(this),
    eraser: new Tools.Eraser(this),
  }

  const selectTool = tool => {
    currentTool = tool;
  }

  const update = (pos, pressure) => {
    if( currentTool ) {
      if(currentTool != tools.eraser) currentTool.update(createConfig(pos, pressure, paper.getBuffer()));
      else currentTool.update(createConfig(pos, pressure, paper.getCurrentLayer()));
    }
  }

  const createConfig = function(pos, pressure, context) {
    return {
      size: size,
      pos: pos,
      strokeStyle: color,
      pressure: pressure,
      opacity: _opacity,
      context: context
    }
  }

  const cursorDown = ( ) => {
    if(currentTool && currentTool != tools.eraser) currentTool.toDownState({context: paper.getBuffer(), opacity: _opacity});
    else if(currentTool && currentTool == tools.eraser) currentTool.toDownState({context: paper.getCurrentLayer()});
  }

  const cursorUp = ( ) => {
    if(currentTool) currentTool.toUpState(createConfig(null, 0, paper.getCurrentLayer()));
  }

  const getSize = ( ) => {
    return size;
  }

  const setSize = n => {
    size = n;
  }

  const setMainContext = context => {
    mainContext = context
  }

  const setTool = type => {
    currentTool = tools[type];
    currentTool.currentState = currentTool.UpState;
  }

  const setScale = scale => {
    for(var type in tools) tools[type].scale = scale;
  }

  setScale(0.3);

  return {
    cursorDown: cursorDown,
    cursorUp: cursorUp,
    setScale: setScale,
    setTool: setTool,
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
