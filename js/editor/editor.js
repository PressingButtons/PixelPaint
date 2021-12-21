import * as Palette from './palette.js';
import * as Paper from './paper.js';
import AppTool from '../tools/apptool.js';

let toolManager;
let scale = 0.3;

const init = ( ) => {
  toolManager = new AppTool({size: 10, paper: Paper});
  setListeners( );
  Paper.bindPaper('pointerdown', onPointerDown);
  Paper.bindPaper('pointermove', onPointerMove);
  Paper.bindPaper('pointerup', onPointerUp);
}

//Methods
const moveCursor = mousePosition => {
  const cursor = document.querySelector('#cursorImage');
  const position = new Position2D(mousePosition).ScalePosition(scale);
  const str = `translate(${ position.x - cursor.width/2 | 0}px, ${position.y - cursor.height/2 | 0}px)`;
  cursor.style.transform = str
}
//Listeners
const onColorSelect = event => {
  toolManager.color = event.detail;
  const gradient = document.querySelector('.gradient')
  const color = `linear-gradient(-90deg, ${event.detail}, transparent)`;
  gradient.style.background = color;
};

const onHotKey = event => {
  const key = event.key.toLowerCase( );
  if(key == 'p') document.getElementById('pen').click( );
  if(key == 'e') document.getElementById('eraser').click( );
}

const onIconClick = function(event) {
  selectTool(event.target.id, event.target);
}

const onOpacityChange = function(event) {
  toolManager.opacity = ((event.target.value / 100) * 255);
}

const onPointerDown = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.cursorDown(position, event.pressure, Paper.getBuffer( ));
}

const onPointerMove = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.update(position, event.pressure, Paper);
}

const onPointerUp =  function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.cursorUp(position, Paper.getCurrentLayer( ));
}

const onToolSizeChange = function(event) {
  toolManager.setSize(event.target.value);
  document.getElementById('toolSize').innerHTML = (event.target.value).toString().padStart(3, '0');
  document.querySelector('#cursorImage').style.width = `${event.target.value}px`;
}

const hiliteIcon = icon => {
  $('.icon').removeClass('active');
  $(icon).addClass('active');
}


const selectTool = function(type, icon) {
  if(type == "pen" || type == "eraser") {
    toolManager.setTool(type);
    hiliteIcon(icon);
  }
}


const setListeners = ( ) => {
  $('.icon').click(onIconClick);
  $('#toolSizeInput').change(onToolSizeChange);
  $('#opacity').change(onOpacityChange);
  document.addEventListener('keydown', onHotKey);
  document.addEventListener('colorselect', onColorSelect);
  document.getElementById('blendmode').addEventListener('change', toolManager.changeBlend);
}

export default function( ) {
  Paper.init( );
  Palette.init( );

  init( );
}
