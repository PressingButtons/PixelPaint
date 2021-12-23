window.onload = event => {
  document.body.addEventListener('click', onClick)
}

const onClick = function(event) {
  if(event.target == this) document.dispatchEvent(new Event('exitManual'));
}
