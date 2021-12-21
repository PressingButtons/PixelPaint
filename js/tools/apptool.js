import * as Tools from './$tools.js';

const AppTool = function(config) {

  let currentTool;
  let toolIsDown = false;
  let size = config.size;
  let mainContext = config.main;
  let bufferContext = config.buffer;

  let tools = {
    pen : new Tools.GraphicPen(this)
  }

  const selectTool = tool => {
    currentTool = tool;
  }

  const update = (pos, ctx) => {
    if( currentTool ) currentTool.update({size: size}, pos, ctx);
  }

  const cursorDown = ( ) => {
    if(currentTool) currentTool.toDownState(bufferContext);
  }

  const cursorUp = ( ) => {
    if(currentTool) currentTool.toUpState(mainContext);
  }

  const getSize = ( ) => {
    return size;
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
    setMainContext: setMainContext,
    setScale: setScale,
    setTool: setTool,
    update: update,
    getSize: getSize,
    get ToolIsDown( ) {return toolIsDown}
  }

}

export default AppTool;
