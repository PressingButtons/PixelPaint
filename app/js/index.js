import TaskBar from './taskbar.js';
import Editor from './editor/editor.js'
import UI from './ui.js';
import Palette from './editor/palette.js';
import Paper from './editor/paper.js';
import Zoom from './editor/zoom.js';
import HotKeys from './utils/hotkeys.js';

let numProjects = 0;

const onReady = event => {
  loadInterface( ).then(init);
  //TaskBar();
  //Editor( );
  //UI(Editor);
}
const init = ( ) => {
  Palette( );
  Zoom( );
  Editor( );
  UI( ).then(Paper);
  HotKeys( );
}

const loadInterface = ( ) => {
  const promises = [
    fetchHTML('./html/workspace.html'),
    fetchHTML('./html/user_interface.html')
  ];
  return Promise.all(promises).then(setHTML);
}

const setHTML = html => {
  appendChildren('#workspace', html[0]);
  appendChildren('#user_interface', html[1]);
}

const appendChildren = (query, collection) => {
  while(collection.length > 0) {
    document.querySelector(query).appendChild(collection[0]);
  }
}

$(document).ready(onReady);
