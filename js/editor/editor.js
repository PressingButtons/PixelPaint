import * as Palette from './palette.js';
import * as Paper from './paper.js';
import AppTool from '../tools/apptool.js';

let toolManager;
let scale = 0.3;

const init = ( ) => {
  toolManager = new AppTool({size: 105, main: Paper.getLayer(0), buffer: Paper.getBuffer()});
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
const onPointerDown = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.cursorDown(position, Paper.getBuffer( ));
}

const onPointerMove = function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.update(position, Paper);
}

const onPointerUp =  function(event) {
  const position = parseRelativePosition(event);
  moveCursor(position);
  toolManager.cursorUp(position, Paper.getCurrentLayer( ));
}

const hiliteIcon = icon => {
  $('.icon').removeClass('active');
  $(icon).addClass('active');
}


const selectTool = index => {
  switch (index) {
    case 0: toolManager.setTool('pen'); break;
    case 3: toolManager.setTool('eraser'); break;
  }
}

const onIconClick = function(jqev) {
  selectTool($(this).index());
}

const setSize = size => {
  if(currentTool) {
    currentTool.size = size;
  }
  $('#toolSizeInput').val(size);
  $('#toolSize').html(size.toString().padStart(3, '0'));
}

const onToolSizeChange = event => {
  setSize(event.target.value);
}

const setListeners = ( ) => {
  $('.icon').click(onIconClick);
  //$('#toolSizeInput').change(onToolSizeChange);
  //$('#opacity').change(onOpacityChange);
}

export default function( ) {
  Paper.init( );
  Palette.init( );

  init( );
}
