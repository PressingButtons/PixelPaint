import * as Graphics from './graphics.js';
import * as Editor from './editor.js';
$(document).ready( event => {
  const main = ( ) => {
    Editor.init(Graphics);
  }
  //intialization execution
  Graphics.init(document.getElementById('canvas')).then(main);
});
