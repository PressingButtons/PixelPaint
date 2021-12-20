import GraphicPen from '../tools/GraphicPen.js';
import Eraser from '../tools/Eraser.js';
import * as Paper from './paper.js';

let graphicPen, eraser;
let toolSize = 10;
let currentTool;
let currentColor = '#000000'
let paper;

const colorPicker = document.createElement('input');
colorPicker.setAttribute('type', 'color');

const initTools = ( ) => {
  const ctx = $('#bufferCanvas')[0].getContext('2d');
  graphicPen = new GraphicPen({size: toolSize, ctx: ctx, stroke: "#00000070"});
  eraser = new Eraser({size: toolSize, ctx: ctx});
}

const hiliteIcon = icon => {
  $('.icon').removeClass('active');
  $(icon).addClass('active');
}

const onColorClick = function(event) {
  currentColor = $(event.target).css('background-color');
  $('.gradient').css('background', `linear-gradient(-90deg, ${currentColor}, transparent)`);
  if(currentTool && currentTool.strokeStyle) currentTool.strokeStyle = currentColor;
}

const onColorDClick = function(event) {
  pickColor( ).then(color => {$(event.target).css('background', color)})
}

const pickColor = ( ) => {
  return new Promise(function(resolve, reject) {
    $(colorPicker).change(event => {resolve(event.target.value)});
    $(colorPicker).trigger('click', event.target);
  });
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
  $('.color').dblclick(onColorDClick);
  $('.color').click(onColorClick);
}

export default function( ) {
  Paper.init( );
  setListeners( );
  initTools( );
}
