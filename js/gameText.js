// The GameText class handles any text that is displayed in a canvas
class GameText {

  constructor(string, size, pos, color) {
    this.string = string;
    this.size = size;
    this.pos = pos;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}pt Arial `;
    ctx.fillText(this.string, this.pos[0], this.pos[1]);
  }
}

module.exports = GameText;
