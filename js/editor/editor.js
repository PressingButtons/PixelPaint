import GraphicPen from '../tools/GraphicPen.js';
import Eraser from '../tools/Eraser.js';
import * as Paper from './paper.js';

let graphicPen, eraser;

let currentTool;
let paper;

const initTools = ( ) => {
  const ctx = $('#bufferCanvas')[0].getContext('2d');
  graphicPen = new GraphicPen({size: 50, ctx: ctx, stroke: "#00000070"});
  eraser = new Eraser({size: 100, ctx: ctx});
}

const onIconClick = function(jqev) {
  switch($(this).index()) {
    case 0: Paper.setTool(graphicPen); break;
    case 3: Paper.setTool(eraser); break;
  }
}

const onSelectTool = event => {
  const value = event instanceof CustomEvent ? event.originalEvent.data : event instanceof Number ? event : null;
  if(value == null) return;
  switch(value) {
    case 0: currentTool = graphicPen;
    case 3: currentTool = graphicPen;
  }
}

const setListeners = ( ) => {
  //$(document).on('selectTool', onSelectTool);
  $('.icon').click(onIconClick);
}

export default function( ) {
  Paper.init( );
  setListeners( );
  initTools( );
}
