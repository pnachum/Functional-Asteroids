import MovingObject from './movingObject';
import SETTINGS from './settings';

// Debris objects are the small circles which make the asteroid look like
// it's exploding. They travel for a limited distance before disappearing
export default class Debris extends MovingObject {

  static get SPEED() {
    return SETTINGS.debris.speed;
  }

  constructor(pos, vel) {
    const radius = SETTINGS.debris.radius;
    // Debris has the same color as the asteroids
    const color = SETTINGS.asteroids.color;

    super(pos, vel, radius, color);
    this.availableDistance = SETTINGS.debris.distance;
  }

  move() {
    super.move();
    this.availableDistance -= Debris.SPEED;
  }

  draw(ctx) {
    // If the debris has available distance left to travel, just call the
    // MovingObject's draw function. Otherwise, don't call it.
    if (this.availableDistance > 0){
      super.draw(ctx);
      return true;
    } else {
      return false;
    }
  }
}
