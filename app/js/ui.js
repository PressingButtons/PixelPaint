const htmlPrefabs = { };

const layerTable = {num: 0};

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
  document.addEventListener('deleteLayers', listeners.onDestroyLayers);
  document.addEventListener('mergeLayer', listeners.onMergeLayer);
}

const listeners = { };

listeners.onBrushTypeChange = function(event) {
  const iconList = document.querySelector('.iconList');
  $('div', iconList).removeClass('selected');
  $('div', iconList)[event.detail].classList.add('selected');
}

listeners.onDestroyLayers = function(event) {
  for(const attr in layerTable) {
    if(attr == 'num') continue;
    document.dispatchEvent(new CustomEvent('destroyLayer', {detail: layerTable[attr].layer}));
    layerTable[attr].row.remove( );
    delete layerTable[attr];
  }
  document.dispatchEvent(new Event('requestNewLayer'));
}

listeners.onLayerClick = function(event, index) {
  const table = document.querySelector('#layerTable');
  $('.pencil', table).removeClass('active');
  $('.pencil', event.currentTarget).addClass('active');
  if(layerTable[index]) {
    document.dispatchEvent(new CustomEvent('layerSelect', {detail: layerTable[index].layer}));
    methods.setLayerData(layerTable[index].layer);
  }
}

listeners.onLayerDrag = function(event) {
  event.dataTransfer.setData('text/plain', this.id);
  event.dataTransfer.dropEffect = "move";
}

listeners.onLayerDragOver = function(event) {
  event.preventDefault( );
  event.dataTransfer.dropEffect = "move";
}

listeners.onLayerDrop = function(event) {
  event.preventDefault( );
  const data = event.dataTransfer.getData('text/plain');
  const lastChild = event.currentTarget.parentElement.lastElementChild
  if(event.currentTarget == lastChild) this.parentNode.appendChild(document.getElementById(data), event.currentTarget);
  else event.currentTarget.parentNode.insertBefore(document.getElementById(data), event.currentTarget);
  const id = [event.currentTarget.id, data].map(x => x.split('layer')[1]);
  document.dispatchEvent(new CustomEvent('swapLayers', {detail: [ layerTable[id[0]].layer, layerTable[id[1]].layer ]}));
}

listeners.onMergeLayer = event => {
  const active = document.querySelector('tr td div.pencil.active').parentElement.parentElement;
  if(!active) return;
  active.dispatchEvent(new Event('merge'));
}

listeners.onNewLayer = event => {
  const tr = methods.setTableRow(layerTable.num);
  layerTable[layerTable.num] = {layer: event.detail.layer, row: tr};
  methods.setRowBinds(tr, layerTable.num);
  layerTable.num++;
  tr.dispatchEvent(new Event('click'));
}

listeners.onZoomLevel = event => {
  const value = (event.detail * 100).toFixed(2)
  document.querySelector('#zoomLevel').value = value
}

listeners.onToolData = function(event) {
  document.querySelector('select[name="brushBlend"]').value = event.detail.blendMode;
  document.querySelector('input[name="brushSizeNumber"]').value = event.detail.size;
  document.querySelector('input[name="brushSizeNumber"]').dispatchEvent(new Event('change'));
  document.querySelector('input[name="brushOpacityNumber"]').value = event.detail.opacity;
  document.querySelector('input[name="brushOpacityNumber"]').dispatchEvent(new Event('change'));
}

const methods = { };

methods.toggleLayer = (tr, index) => {
  const sight = tr.querySelector('.sight');
  if(sight.classList.contains('active')) {
    document.dispatchEvent(new CustomEvent('hideLayer', {detail: layerTable[index]}));
    sight.classList.remove('active');
  } else {
    document.dispatchEvent(new CustomEvent('showLayer', {detail: layerTable[index]}));
    sight.classList.add('active');
  }
}

methods.clearLayer = (tr, index) => {
  document.dispatchEvent(new CustomEvent('clearLayer', {detail: layerTable[index]}));
}

methods.destroyLayer = (tr, index) => {
  const layerName = tr.querySelector('input[name="layername"]').value
  const bool = confirm(`Are you certain you wish to remove layer "${layerName}?"`);
  if(bool) {
    document.dispatchEvent(new CustomEvent('destroyLayer', {detail: layerTable[index].layer}));
    tr.remove( );
    delete layerTable[index];
  }
}

methods.layerMerge = (id) => {
  const layer = layerTable[id];
  document.dispatchEvent(new CustomEvent('mergeRequest', {detail: {
    a: "test"
  }}))
}

methods.setLayerData = layer => {
  document.querySelector('input[name="layerOpacityNumber"]').value = layer.raster.canvas.style.opacity * 100;
  document.querySelector('input[name="layerOpacityNumber"]').dispatchEvent(new Event('change'));
}

methods.setRowBinds = function(tr, id) {
  tr.addEventListener('click', ev => listeners.onLayerClick(ev, id));
  tr.querySelector('.sight').addEventListener('click', ev => methods.toggleLayer(tr, id));
  tr.querySelector('.broom').addEventListener('click', ev => methods.clearLayer(tr, id));
  tr.querySelector('.trash').addEventListener('click', ev => methods.destroyLayer(tr, id));
  tr.addEventListener('dragstart', listeners.onLayerDrag);
  tr.addEventListener('dragover', listeners.onLayerDragOver);
  tr.addEventListener('drop', listeners.onLayerDrop);
  tr.addEventListener('merge', ev => {methods.layerMerge(id)})
}

methods.setTableRow = function(index) {
  const table = document.querySelector('#layerTable');
  const tr = document.createElement('tr');
  tr.innerHTML = htmlPrefabs.layer;
  table.insertBefore(tr, table.firstChild);
  tr.querySelector('input').value = "Layer" + index;
  tr.setAttribute('draggable', true);
  tr.id = "layer" + index;
  return tr;
}

//export
export default function( ) {
  return initPrefabs( ).then(setListeners);
}
