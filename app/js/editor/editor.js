import * as Paper from './paper.js';
import AppTool from '../tools/apptool.js';

let toolManager;
let scale = 0.3;
let currentLayer = 0;;

const init = ( ) => {
  toolManager = new AppTool({size: 10, paper: Paper});
  setListeners( );
  Paper.bindPaper('pointerdown', onPointerDown);
  Paper.bindPaper('pointermove', onPointerMove);
  Paper.bindPaper('pointerup', onPointerUp);
  Paper.bindPaper('pointerenter', onPointerEnter);
  Paper.bindPaper('pointerleave', onPointerLeave);
  Paper.addLayer( );
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

const onLayerSelect = function(event) {
  currentLayer = this.getAttribute('id');
  $('#layerList div').removeClass('selected');
  $(this).addClass('selected');
}

const onPointerDown = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  const config = {pressure: event.pressure, position: position, currentLayer: Paper.getLayer(currentLayer), bufferLayer: Paper.getBuffer()}
  toolManager.cursorDown(config);
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
  const config = {pressure: event.pressure, position: position, currentLayer: Paper.getLayer(currentLayer), bufferLayer: Paper.getBuffer()}
  toolManager.update(config);
}

const onPointerUp =  function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  const config = {pressure: event.pressure, position: position, currentLayer: Paper.getLayer(currentLayer), bufferLayer: Paper.getBuffer()}
  toolManager.cursorUp(config);
}

const onNewLayer = function(event) {
  event.detail.html.addEventListener('click', onLayerSelect);
  document.querySelector('#layerList').appendChild(event.detail.html);
  event.detail.html.dispatchEvent(new Event('click'));
}

const onUpdatePageDimensions = event => {
  const width  = document.querySelector('input[name="width"]').value;
  const height = document.querySelector('input[name="height"]').value;
  if(confirm('Warning! Updating page dimensions will clear all layers.')) {
    Paper.resize(width, height);
  }
}

const setListeners = ( ) => {
  document.addEventListener('brushBlendMode', toolManager.changeBlend);
  document.addEventListener('brushOpacity', toolManager.changeOpacity);
  document.addEventListener('brushSize', toolManager.changeSize);
  document.addEventListener('toolSelect', toolManager.changeTool);
  document.addEventListener('colorselect', toolManager.changeColor);
  document.addEventListener('newlayer', onNewLayer);
  document.querySelector('#updateDimBtn').addEventListener('click', onUpdatePageDimensions);
}

export default function( ) {
  Paper.init( );
  init( );
}
