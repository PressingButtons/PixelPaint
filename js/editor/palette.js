const palette = {0: "#FFFFFF"};

const colorInput = document.createElement('input');
colorInput.setAttribute('type', 'color');

const changeColor = function(event) {
  updateColor( ).then(color => setColor(event.target, color));
}

const selectColor = function(event) {
  const index = $(this).index( );
  if(!palette[index]) palette[index] = "#000000";
  document.dispatchEvent(new CustomEvent('colorselect', {detail: palette[index]}));
}

const setColor = (element, color) => {
  const index = $(element).index( );
  palette[index] = color;
  element.style.backgroundColor = color;
  document.dispatchEvent(new CustomEvent('colorselect', {detail: palette[index]}));
}

const updateColor = ( ) => {
  return new Promise(function(resolve, reject) {
    colorInput.addEventListener('change', event => {resolve(event.target.value)});
    colorInput.click( );
  });
}


//exports
export const init = ( ) => {
  let num = 0;
  while(num < 20) {
    const color = document.createElement('div');
    color.classList.add('color');
    color.style.backgroundColor = num == 0 ? "#FFFFFF" : "#000000";
    color.addEventListener('click', selectColor);
    color.addEventListener('dblclick', changeColor);
    $('.palette').append(color);
    num++;
  }
}
