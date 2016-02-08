const Rotateable = require('./rotateable'),
  SETTINGS = require('./settings');

// The thruster is the yellow circle that appears behind the ship when it's
// moving
class Thruster extends Rotateable {

  static get RADIUS() {
    return SETTINGS.ship.thrusterRadius;
  }

  static get COLOR() {
    return SETTINGS.ship.thrusterColor;
  }

  constructor(ship) {
    const startingPos = [ship.pos[0], ship.pos[1] + ship.radius]
    super(ship, startingPos, Thruster.RADIUS, Thruster.COLOR, 270);
  }

}

module.exports = Thruster;
