const keys = { };

export default function( ) {
  document.addEventListener('keyup', useKey);
  document.addEventListener('keydown', useKey);
}

const useKey = function(event) {
  keys[event.key] = event.type == 'keydown';
  if(event.key == "e") selectBrush(0);
  else if(event.key == "P") selectBrush(2);
  else if (event.key == "p") selectBrush(1);
  else if (event.key.toLowerCase( ) == "i") selectBrush(3);
  else if (event.key == "[") changeBrushSize( -10 );
  else if (event.key == "]") changeBrushSize( +10 );
  else if (event.key == "{") changeBrushSize( -50 );
  else if (event.key == "}") changeBrushSize( +50 );
  else if (event.key == "N" && !keys["N"]) requestNewLayer( );
  else if (event.key == "h" && !keys["h"]) requestCanvasFlip( );
}

const changeBrushSize = value => {
  value += Number(document.querySelector('input[name="brushSizeNumber"]').value);
  value = value < brushMin ? brushMax : value > brushMax ? brushMax : value;
  document.querySelector('input[name="brushSizeNumber"]').value = value;
  document.querySelector('input[name="brushSizeNumber"]').dispatchEvent(new Event("change"));
}

const selectBrush = value => {
  document.querySelector('select[name="brushType"]').value = value;
  document.querySelector('select[name="brushType"]').dispatchEvent(new Event('change'));
}
