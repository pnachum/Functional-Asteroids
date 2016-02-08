const MovingObject = require('./movingObject'),
  SETTINGS = require('./settings'),
  toRadians = require('./helpers').toRadians;

// Rotateable provides the interface used for the ship's bullet and thruster,
// which rotate around the ship, instead of moving normally.
class Rotateable extends MovingObject {

  constructor(ship, pos, radius, color, degree) {
    super(pos, [0, 0], radius, color);
    this.degree = degree;
    this.ship = ship;
  }

  direction() {
    var x = Math.cos(toRadians(this.degree));
    var y = -Math.sin(toRadians(this.degree));
    return [x, y];
  }

  move() {
    const ship = this.ship;
    const [shipX, shipY] = ship.pos;

    const distX = ship.radius * Math.cos(toRadians(this.degree));
    const distY = ship.radius * Math.sin(toRadians(this.degree));

    this.pos = [shipX + distX, shipY - distY];
  }

  rotate(direction) {
    this.degree = (this.degree + (direction * SETTINGS.ship.turnSpeed)) % 360;
  }
}

module.exports = Rotateable;
