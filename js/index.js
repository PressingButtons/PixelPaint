import TaskBar from './taskbar.js';
import Editor from './editor/editor.js'

let numProjects = 0;

const onReady = event => {
  TaskBar();
  Editor( );
}

$(document).ready(onReady);
