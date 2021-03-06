function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype.render = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Rect.prototype.intersects = function (rect) {
  return (
    rect.x < this.x + this.width &&
    rect.y < this.y + this.height &&
    rect.x + rect.width > this.x &&
    rect.y + rect.height > this.y
  );
};
