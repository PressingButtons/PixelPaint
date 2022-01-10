const GraphicLayer = function(config) {
  this.raster = createCanvasObject(config);
  this.buffer = createCanvasObject(config);
  this.blend = "source-over";
  this.visible = true;
  this.opacity = 1;
}

Object.defineProperties(GraphicLayer.prototype, {
  copyToBuffer: {
    value: function( ) {
      this.buffer.ctx.drawImage(this.raster.canvas, 0, 0);
    }
  },
  resize: {
    value: function(size) {
      this.raster.canvas.width = this.buffer.canvas.width = size.w;
      this.raster.canvas.height = this.buffer.canvas.height = size.h;    
    }
  },

  setOpacity: {
    value: function(value) {this.opacity = value / 100}
  },
  setBlend: {
    value: function(value) {
      this.blend = value;
      const idata = this.raster.ctx.getImageData(0, 0, this.raster.canvas.width, this.raster.canvas.height);
      this.raster.ctx.globalCompositeOperation = this.blend;
      this.raster.ctx.putImageData(idata, 0, 0);
    }
  },
});

export default GraphicLayer;
