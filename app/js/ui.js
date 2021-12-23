import Palette from './editor/palette.js';
//vars
const brushes = ["pen", "pencil", "brush"];

const brushSize = {min: 1, max: 200};
const opacity =   {min: 1, max: 100};

const initPageListeners = ( ) => {
  $('.icon', "#toolpane").click(onToolClicked);
  $('#opacityAdj').change(onOpacityChange);
  $('#sizeAdj').change(onSizeChange);
  $('#blendmode').change(onBrushBlendChange);
  $('.taskbar p').click(onManualShow);
  document.querySelector('iframe').contentDocument.addEventListener('exitManual', onExitManual);
  document.addEventListener('keydown', onHotKeyDown);
}

//methods
const changeBrushSVGSize = value => {
  const brushSVG = document.querySelector('.cursorcontainer svg');
  const circle = brushSVG.querySelector('circle');
  circle.setAttribute('r', (value/2) | 0);
}

const changeMouseIcon = type => {
  const cursorImage = document.querySelector('#cursorImage');
  switch (type) {
    case  "pen": cursorImage.src = "./images/icons8-pen-64.png"; break;
    case  "pencil": cursorImage.src = "./images/icons8-pencil-64.png"; break;
    case  "eraser": cursorImage.src = "./images/icons8-erase-64.png"; break;
  }
}

const contextualTool = type => {
  $('section > section').removeClass('active');
  if(brushes.indexOf(type) != -1) {
    $('section > section').addClass('active');
  } else if(type =='eraser') {
    $('#opacitySection').addClass('active');
    $('#sizeSection').addClass('active');
  } else {

  }
  changeMouseIcon(type);
}

const triggerChange = (query, value) => {
  let newValue = Number(document.querySelector(query).value) + value;
  document.querySelector(query).value  = newValue;
  document.querySelector(query).dispatchEvent(new Event('change'));
  document.querySelector(query).blur( );
}
//Listeners
const onBrushBlendChange = function(event) {
  document.dispatchEvent(new CustomEvent('brushBlendMode', {detail: this.value}));
}

const onExitManual = function(event) {
  $('iframe').hide( );
}

const onHotKeyDown = function(event) {
  const key = event.key.toLowerCase( );
  if(key == 'p') document.getElementById('pencil').click( );
  if(key == 'p' && event.shiftKey) document.getElementById('pen').click( );
  if(key == 'e') document.getElementById('eraser').click( );
  if(key == '[') triggerChange('#sizeAdj', -10);
  if(key == ']') triggerChange('#sizeAdj',  10);
  if(key == '{') triggerChange('#opacityAdj', -10);
  if(key == '}') triggerChange('#opacityAdj',  10);
}

const onManualShow = function(event) {
  $('iframe').show( );
}

const onOpacityChange = function(event) {
  if(this.value < opacity.min) this.value = opacity.min
  if(this.value > opacity.max) this.value = opacity.max
  document.dispatchEvent(new CustomEvent('brushOpacity', {detail: this.value}))
}

const onSizeChange = function(event) {
  if(this.value < brushSize.min) this.value = brushSize.min;
  if(this.value > brushSize.max) this.value = brushSize.max;
  changeBrushSVGSize(this.value);
  document.dispatchEvent(new CustomEvent('brushSize', {detail: this.value}));
}

const onToolClicked = function(event) {
  $('.icon', "#toolpane").removeClass('active');
  $(this).addClass('active');
  contextualTool(this.id);
  document.dispatchEvent(new CustomEvent('toolSelect', {detail: this.id}));
}

//export
export default function( ) {
  initPageListeners( );
  Palette( );
}
