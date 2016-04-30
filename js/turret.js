import Rotateable from './rotateable';
import SETTINGS from './settings';
import StandardBullet from './standardBullet';

// The turret is the small circle in front of the ship where it shoots
// bullets from.
export default class Turret extends Rotateable {

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
