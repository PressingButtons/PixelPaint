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
  Paper.bindPaper('pointerenter', onPointerEnter);
  Paper.bindPaper('pointerleave', onPointerLeave);
}

//Methods
const moveCursor = mousePosition => {
  const cursor = document.querySelector('.cursorcontainer');
  const position = new Position2D(mousePosition).ScalePosition(scale);
  const str = `translate(${ position.x|0}px, ${position.y| 0}px)`;
  cursor.style.transform = str;
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

const onPointerDown = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.cursorDown(position, event.pressure, Paper.getBuffer( ));
}

const onPointerEnter = function( ) {
  $('.cursorcontainer').show( );
}

const onPointerLeave = function( ) {
  $('.cursorcontainer').hide( );
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

const setListeners = ( ) => {
  document.addEventListener('brushBlendMode', toolManager.changeBlend);
  document.addEventListener('brushOpacity', toolManager.changeOpacity);
  document.addEventListener('brushSize', toolManager.changeSize);
  document.addEventListener('toolSelect', toolManager.changeTool);
  document.addEventListener('colorselect', toolManager.changeColor);
}

export default function( ) {
  Paper.init( );
  init( );
}
