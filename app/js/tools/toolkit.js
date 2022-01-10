import GraphicPen from './GraphicPen.js'
import GraphicPencil from './GraphicPencil.js'
import Eraser from './Eraser.js'
import ColorSample from './ColorSample.js';

const ToolKit = function( ) {
  this.color = "#FFFFFF";
  Object.defineProperties(this, {
    pencil: {value: new GraphicPencil({machine: this, size: 10})},
    pen:    {value: new GraphicPen({machine: this, size: 10})},
    eraser: {value: new Eraser({machine: this, size: 10})},
    sample:  {value: new ColorSample({machine: this})},
  })
  this.currentTool = this.pencil;
}

Object.defineProperties(ToolKit.prototype, {

  onPointerDown: {
    value: function(event) {
      this.currentTool.switchState(this.currentTool.DOWN, event);
    }
  },

  onPointerUp: {
    value: function(event) {
      this.currentTool.switchState(this.currentTool.UP, event);
      document.dispatchEvent(new Event('clearBuffer'))
    }
  },

  onPointerMove: {
    value: function(event) {
      this.currentTool.update(event);
    }
  },

  selectTool: {
    value: function(type) {
      this.currentTool.currentState.exitState( );
      if(type == ToolKit.ERASER) this.currentTool = this.eraser;
      else if (type == ToolKit.PENCIL) this.currentTool = this.pencil;
      else if (type == ToolKit.PEN) this.currentTool = this.pen;
      else if (type == ToolKit.COLOR) this.currentTool = this.sample;
      this.currentTool.currentState.enterState( );
      document.dispatchEvent(new CustomEvent('toolData', {detail: this.currentTool}))

    }
  },

  dispatchPath: {
    value: function(type, tool, clear = true) {
      type = type == 'path' ? "drawPath" : "drawPlot";
      const config = createPathConfiguration(type, tool, this.color, clear);
      document.dispatchEvent(new CustomEvent(type, {detail: config}));
    }
  }

});

ToolKit.ERASER = 0;
ToolKit.PENCIL = 1;
ToolKit.PEN    = 2;
ToolKit.COLOR  = 3;

const createPathConfiguration = (type, tool, color) => {
  const opacity = ((tool.opacity * 255 / 100) | 0).toString(16).padStart(2, '0');
  return {
    type: type,
    path: tool.pointLog,
    size: tool.size,
    blend: tool.blendMode,
    color: color + opacity,
  }
}


export default ToolKit;
