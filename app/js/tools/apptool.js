import * as Tools from './$tools.js';

const AppTool = function(config) {

  let currentTool;
  let toolIsDown = false;
  let size = config.size;
  let _opacity = 255;
  let color = "#000000"
  let paper = config.paper;
  let blendMode = 'source-over'

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
      if(currentTool != tools.eraser) currentTool.update(createConfig(pos, pressure, paper.getBuffer()));
      else currentTool.update(createConfig(pos, pressure, paper.getCurrentLayer()));
    }
  }

  const changeBlend = event => {
    blendMode = event.detail;
  }

  const changeColor = event => {
    color = event.detail;
  }

  const changeOpacity = event => {
    _opacity = (event.detail/100) * 255;
  }

  const changeSize = event => {
    size = event.detail;
  }

  const changeTool = event => {
    currentTool = tools[event.detail] || null;
    if(currentTool) currentTool.currentState = currentTool.UpState;
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
    console.log(type);
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
