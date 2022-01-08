import ToolKit from '../tools/toolkit.js';
let toolkit;
let currentLayer = null;

const init = ( ) => {
  toolkit = new ToolKit( );
  setListeners( );
}

const setListeners = ( ) => {
  document.addEventListener('layerSelect', listeners.onLayerSelect);
  document.addEventListener('paperPointerEvent', listeners.onPointerEvent);
  document.addEventListener('drawPath', listeners.onDrawPath);
  document.addEventListener('drawPlot', listeners.onPlotPath);
  document.addEventListener('colorValue', listeners.onColorValue);
  document.addEventListener('brushSizeChange', listeners.onBrushSizeChange);
  document.addEventListener('brushOpacityChange', listeners.onBrushOpacityChange);
  document.addEventListener('brushType', listeners.onBrushTypeChange);
}

const listeners = { };

listeners.onBrushSizeChange = event => {
  toolkit.currentTool.size = event.detail;
}

listeners.onBrushOpacityChange = event => {
  toolkit.currentTool.opacity = event.detail;
}

listeners.onBrushTypeChange = event => {
  toolkit.selectTool(event.detail);
}

listeners.onColorValue = event => {
  toolkit.color = event.detail;
}

listeners.onDrawPath = event => {
  const detail = Object.assign(event.detail, {layer: currentLayer});
  document.dispatchEvent(new CustomEvent('renderPath', {detail: detail}));
}

listeners.onPlotPath = event => {
  const detail = Object.assign(event.detail, {layer: currentLayer});
  document.dispatchEvent(new CustomEvent('renderPlot', {detail: detail}));
}

listeners.onLayerSelect = event => {
  currentLayer = event.detail;
  window.currentLayer = currentLayer;
}

listeners.onPointerEvent = function(event) {
  switch(event.detail.event.type) {
    case "pointerdown":   toolkit.onPointerDown(event); break;
    case "pointerup":     toolkit.onPointerUp(event); break;
    case "pointercancel": toolkit.onPointerUp(event); break;
    case "pointerout":    toolkit.onPointerUp(event); break;
    case "pointerleave":  toolkit.onPointerUp(event); break;
    case "pointermove":   toolkit.onPointerMove(event); break;
  }
}

export default function( ) {
  init( );
}
