import GraphicPen from '../tools/GraphicPen.js';
import Eraser from '../tools/Eraser.js';
import * as Paper from './paper.js';

let graphicPen, eraser;
let toolSize = 10;
let currentTool;
let currentColor = '#000000'
let paper;

let palette = {};

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

const opacityToHex = ( ) => {
  let value = $('#opacity').val( );
  value = ((value / 100) * 255) | 0;
  return value.toString(16).padStart(2, '0');
}

const onOpacityChange = event => {
  let val = opacityToHex( );
  if(currentColor.length > 7)  {
    currentColor = currentColor.substring(0, 7);
  }
  currentColor += val;
  if(currentTool && currentTool.strokeStyle) currentTool.strokeStyle = currentColor;
}

const onColorClick = function(event) {
  let index = $(event.target).index( );
  currentColor = palette[$(event.target).index()] || "#000000";
  $('.gradient').css('background', `linear-gradient(-90deg, ${currentColor}, transparent)`);
  currentColor += opacityToHex( );
  if(currentTool && currentTool.strokeStyle) currentTool.strokeStyle = currentColor;
}

const onColorDClick = function(event) {
  pickColor( ).then(color => {
    palette[$(event.target).index( )] = color;
    $(event.target).css('background', color);
    $(event.target).trigger('click');
  })
}

const pickColor = ( ) => {
  return new Promise(function(resolve, reject) {
    $(colorPicker).change(event => {
      resolve(event.target.value)}
    );
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

const rgba2hex = color => {
  if(color.match('rgba')) {
    color = `#${color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
  } else if(color.match('rgb')) {
    color = `#${color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
  } else {
    color = '#000000';
  }
  return color;
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
  $('#opacity').change(onOpacityChange);
}

export default function( ) {
  Paper.init( );
  setListeners( );
  initTools( );
}
