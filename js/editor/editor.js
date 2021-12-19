import GraphicPen from '../tools/GraphicPen.js';
import Eraser from '../tools/Eraser.js';
import * as Paper from './paper.js';

let graphicPen, eraser;
let toolSize = 10;
let currentTool;
let paper;

const initTools = ( ) => {
  const ctx = $('#bufferCanvas')[0].getContext('2d');
  graphicPen = new GraphicPen({size: toolSize, ctx: ctx, stroke: "#00000070"});
  eraser = new Eraser({size: toolSize, ctx: ctx});
}

const hiliteIcon = icon => {
  $('.icon').removeClass('active');
  $(icon).addClass('active');
}

const onIconClick = function(jqev) {
  switch($(this).index()) {
    case 0: currentTool = graphicPen; hiliteIcon(this); break;
    case 3: currentTool = eraser; hiliteIcon(this); break;
  }
  Paper.setTool(currentTool);
  setSize(currentTool.size);
}


const setSize = size => {
  currentTool.size = size;
  $('#toolSizeInput').val(currentTool.size);
  $('#toolSize').html(size.toString().padStart(3, '0'));
}

const onToolSizeChange = event => {
  setSize(event.target.value);
}

const setListeners = ( ) => {
  $('.icon').click(onIconClick);
  $('#toolSizeInput').change(onToolSizeChange);
}

export default function( ) {
  Paper.init( );
  setListeners( );
  initTools( );
}
