const palette = { };
const numColors = 21;
let colorPicker;
let activeColor;

const colorInput = document.createElement('input');
colorInput.setAttribute('type', 'color');

const changeColor = function(event) {
  updateColor( ).then(color => setColor(event.target, color));
}

const createPalette = ( ) => {
  for(let i = 0; i < numColors; i++) {
    palette[i] = {color: "#FFFFFF", element: document.createElement('div')}
    palette[i].element.addEventListener('click', event => {selectPaletteColor(palette[i])});
    palette[i].element.style.backgroundColor = palette[i].color;
    document.querySelector('.palette').appendChild(palette[i].element);
  }
}

const selectPaletteColor = function(palette) {
  document.querySelectorAll('.palette > div').forEach( elm => {
    elm.classList.remove('selected');
  });
  activeColor = palette;
  activeColor.element.classList.add('selected');
  colorPicker.color.hexString = palette.color;
  dispatchColorEvent(palette.color);
}

const onColorChange = function(color) {
  if(activeColor) {
    activeColor.element.style.backgroundColor = color.hexString;
    activeColor.color = color.hexString;
  }
  dispatchColorEvent(color.hexString);
}

const dispatchColorEvent = function(color) {
  document.dispatchEvent(new CustomEvent('colorValue', {
    detail: color
  }));
}



//exports
export default function( ) {
  colorPicker = new iro.ColorPicker('#colorPicker', {width: 200});
  colorPicker.on('color:change', onColorChange);
  createPalette( );
}
