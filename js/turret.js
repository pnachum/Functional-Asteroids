const Rotateable = require('./rotateable'),
  SETTINGS = require('./settings'),
  StandardBullet = require('./standardBullet');

// The turret is the small circle in front of the ship where it shoots
// bullets from.
class Turret extends Rotateable {

  static get RADIUS() {
    return SETTINGS.ship.turretRadius;
  }

  constructor(ship) {
    const startingPos = [ship.pos[0], ship.pos[1] - ship.radius];
    super(ship, startingPos, Turret.RADIUS, ship.color, 90);
  }

  fireBullet() {
    return new StandardBullet(this);
  }
}

module.exports = Turret;
