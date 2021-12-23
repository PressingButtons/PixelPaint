import TaskBar from './taskbar.js';
import Editor from './editor/editor.js'
import UI from './ui.js';

let numProjects = 0;

const onReady = event => {
  TaskBar();
  Editor( );
  UI(Editor);
}

$(document).ready(onReady);
