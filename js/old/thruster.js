import Rotateable from './rotateable';
import SETTINGS from './settings';

// The thruster is the yellow circle that appears behind the ship when it's
// moving
export default class Thruster extends Rotateable {

  static RADIUS = SETTINGS.ship.thrusterRadius;
  static COLOR = SETTINGS.ship.thrusterColor;

  constructor(ship) {
    const startingPos = [ship.pos[0], ship.pos[1] + ship.radius];
    super(ship, startingPos, Thruster.RADIUS, Thruster.COLOR, 270);
  }
}
