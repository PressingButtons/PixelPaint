//vars
const brushes = ["pen", "pencil", "brush"];

const brushSize = {min: 1, max: 200};
const opacity =   {min: 1, max: 100};

const initPageListeners = ( ) => {
  $('.icon', "#toolpane").click(onToolClicked);
  $('#opacityAdj').change(onOpacityChange);
  $('#sizeAdj').change(onSizeChange);
  $('#blendmode').change(onBrushBlendChange);
}

//methods
const contextualTool = type => {
  $('section > section').removeClass('active');
  if(brushes.indexOf(type) != -1) {
    $('section > section').addClass('active');
  } else if(type =='eraser') {
    $('#opacitySection').addClass('active');
    $('#sizeSection').addClass('active');
  } else {

  }
}
//Listeners
const onBrushBlendChange = function(event) {
  document.dispatchEvent(new CustomEvent('brushBlendMode', {detail: this.value}));
}

const onOpacityChange = function(event) {
  if(this.value < opacity.min) this.value = opacity.min
  if(this.value > opacity.max) this.value = opacity.max
  document.dispatchEvent(new CustomEvent('brushOpacity', {detail: this.value}))
}

const onSizeChange = function(event) {
  if(this.value < brushSize.min) this.value = brushSize.min;
  if(this.value > brushSize.max) this.value = brushSize.max;
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
}
