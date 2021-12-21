window.createCanvasContext = config => {
  const canvas = document.createElement('canvas');
  canvas.width = config.width;
  canvas.height = config.height;
  return canvas.getContext('2d', config.options);
}


const Position2D = function(pos) {
  this.x = pos.x || pos[0] || 0;
  this.y = pos.y || pos[1] || 0;
}

Position2D.prototype.ScalePosition = function(scale) {
  return {x: this.x / scale, y: this.y / scale};
}

Position2D.prototype.Add = function(value) {
  this.x += value.x || value[0] || 0;
  this.y += value.y || value[1] || 0;
}

Position2D.prototype.Set = function(value) {
  this.x = value.x || value[0] || this.x;
  this.y = value.y || value[1] || this.y;
}

window.Position2D = Position2D;

window.renderPath = config => {
  config.ctx.strokeStyle = config.strokeStyle;
  config.ctx.globalCompositeOperation = config.renderType;
  config.ctx.lineWidth = config.size;
  config.ctx.lineCap = config.lineCap;
  config.ctx.lineJoin = 'round';
  config.ctx.beginPath( );
  for(let i = 0; i < config.positions.length; i++) {
    const currentPosition = config.positions[i].ScalePosition(config.scale);
    if(i == 0) config.ctx.moveTo(currentPosition.x, currentPosition.y);
    else config.ctx.lineTo(currentPosition.x, currentPosition.y);
  }
  config.ctx.stroke( );
}

window.parseRelativePosition = event => {
  const rect = event.target.getBoundingClientRect( );
  return {x: event.clientX - rect.x, y: event.clientY - rect.y};
}
