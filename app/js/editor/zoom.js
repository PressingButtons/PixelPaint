const zMax = 10, zMin = 0.02;
let zoom = 1;
let paper

export default function( ) {
  paper = document.querySelector('.paper');
  document.querySelector('#workspace').addEventListener('wheel', onMouseWheel);
  document.addEventListener('zoomChange', onZoomChange);
}

const onMouseWheel = function(event) {
  event.preventDefault( );
  const mp = mousePosition(event);
  //transformOrigin(mp);
  if(event.deltaY < 0) increaseZoom(event.deltaY);
  else if (event.deltaY > 0) decreaseZoom(event.deltaY);
  document.dispatchEvent(new CustomEvent('zoomLevel', {detail: zoom}))
}

const onZoomChange = event => {
  zoom = Number(event.detail) / 100;
  paper.style.transform  = `scale(${zoom})`;
}

const mousePosition = event => {
  const rect = event.target.getBoundingClientRect( );
  return {
    x: (event.clientX - rect.x) / zoom,
    y: (event.clientY - rect.y) / zoom
   }
}

const increaseZoom = (inc) => {
  if(zoom < zMax) zoom += Math.abs(inc) * 0.01;
  else zoom = zMax;
  paper.style.transform = `scale(${zoom})`
}


const decreaseZoom = (dec) => {
  if(zoom > zMin) zoom -= Math.abs(dec) * 0.01;
  else zoom = zMin;
  paper.style.transform = `scale(${zoom})`
}

const transformOrigin = (pos) => {
  const str = `${pos.x|0}px ${pos.y|0}px`;
  paper.style.transformOrigin = str;
  console.log(str);
}

window.getZoom = ( ) => {
  return zoom;
}
