// The MovingObject superclass provides an interface for all moving objects,
// including asteroids, the ship, bullets, etc.
// It specifies a position, a velocity (which also represents direction),
// a size, and a color.
class MovingObject {

  constructor(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.radius = radius;
  }

  distance(otherObject) {
    var xDiff = this.pos[0] - otherObject.pos[0];
    var yDiff = this.pos[1] - otherObject.pos[1];
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    if (this === otherObject) {
      return false;
    }

    const distance = this.distance(otherObject)
    return distance < this.radius + otherObject.radius;
  }

  // Handles wrapping the object around the edge of the screen, so that when it
  // goes off of one edge, it re-appears on the opposite side of the screen
  mapToScreen() {
    const radius = this.radius
    if (this.pos[0] >= 500 + radius){
      this.pos[0] -= (500 + 2 * radius)
    } else if (this.pos[0] <= 0 - radius) {
      this.pos[0] += (500 + 2 * radius)
    }

    if (this.pos[1] >= 500 + radius){
      this.pos[1] -= (500 + 2 * radius)
    } else if (this.pos[1] <= 0 - radius) {
      this.pos[1] += (500 + 2 * radius)
    }
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.mapToScreen();
  }

}

module.exports = MovingObject;
