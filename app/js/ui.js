const htmlPrefabs = { };

const initPrefabs = ( ) => {
  const prefabs = [fetchText('../html/layer.html')]
  return Promise.all(prefabs).then(html => {
    htmlPrefabs.layer = html[0];
  })
}

const setListeners = ( ) => {
  document.addEventListener('zoomLevel', listeners.onZoomLevel);
  document.addEventListener('newLayer', listeners.onNewLayer);
  document.addEventListener('layerClick', listeners.onLayerClick);
  document.addEventListener('toolData', listeners.onToolData);
  document.addEventListener('brushType', listeners.onBrushTypeChange);
}

const listeners = { };

listeners.onBrushTypeChange = function(event) {
  const iconList = document.querySelector('.iconList');
  $('div', iconList).removeClass('selected');
  $('div', iconList)[event.detail].classList.add('selected');
}

listeners.onNewLayer = event => {
  const tr = methods.setTableRow(event.detail.index);
  methods.setRowBinds(tr, event);
  tr.dispatchEvent(new Event('click'));
}

listeners.onZoomLevel = event => {
  const value = (event.detail * 100).toFixed(2)
  document.querySelector('#zoomLevel').value = value
}

listeners.onLayerClick = function(event, index) {
  const table = document.querySelector('#layerTable');
  $('.pencil', table).removeClass('active');
  $('.pencil', event.currentTarget).addClass('active');
  document.dispatchEvent(new CustomEvent('layerSelect', {detail: index}));
}

listeners.onToolData = function(event) {
  document.querySelector('select[name="brushBlend"]').value = event.detail.blendMode;
  document.querySelector('input[name="brushSizeNumber"]').value = event.detail.size;
  document.querySelector('input[name="brushSizeNumber"]').dispatchEvent(new Event('change'));
  document.querySelector('input[name="brushOpacityNumber"]').value = event.detail.opacity;
  document.querySelector('input[name="brushOpacityNumber"]').dispatchEvent(new Event('change'));
}

const methods = { };

methods.setRowBinds = function(tr, event) {
  tr.addEventListener('click', ev => listeners.onLayerClick(ev, event.detail.index));
  tr.querySelector('')
}

methods.setTableRow = function(index) {
  const table = document.querySelector('#layerTable');
  const tr = document.createElement('tr');
  tr.innerHTML = htmlPrefabs.layer;
  table.insertBefore(tr, table.firstChild);
  tr.querySelector('input').value = "Layer" + event.detail.index;
  return tr;
}

//export
export default function( ) {
  return initPrefabs( ).then(setListeners);
}
