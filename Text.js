function Text(x, y, text, align = 'left', baseline = 'top') {
  this.x = x;
  this.y = y;
  this.text = text;
  this.align = align;
  this.size = '12px';
  this.font = 'Arial';
  this.baseline = baseline;
}

Text.prototype.render = function (ctx, color) {
  ctx.save();
  ctx.textAlign = this.align;
  ctx.textBaseline = this.baseline;
  ctx.font = this.size + ' ' + this.font;
  ctx.fillStyle = color;
  ctx.fillText(this.text, this.x, this.y);
  ctx.restore();
};

Text.prototype.setFont = function (font) {
  this.font = font;
};
