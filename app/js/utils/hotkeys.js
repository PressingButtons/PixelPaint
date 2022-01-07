const keys = { };

export default function( ) {
  document.addEventListener('keyup', useKey);
  document.addEventListener('keydown', useKey);
}

const useKey = function(event) {
  keys[event.key] = event.type == 'keydown';
  handleBrushType(document.querySelector('select[name="brushType"]'));
  handleBrushSize(document.querySelector('input[name="brushSizeNumber"]'));
}

const handleBrushType = element => {
  let value;
  if(keys["0"]) value = 0;
  else if (keys["1"]) value = 1;
  else if (keys["2"]) value = 2;
  //
  if(value === undefined) return;
  element.value = value;
  element.dispatchEvent(new Event('change'));
}

const handleBrushSize = element => {
  let value = 0;
  if(keys["["]) value = -10;
  else if (keys["]"]) value = 10;
  let appliedNumber = Number(element.value) + value;
  appliedNumber = appliedNumber < brushMin ? brushMin : appliedNumber > brushMax ? brushMax : appliedNumber;
  element.value = appliedNumber;
  element.dispatchEvent(new Event('change'));
}
