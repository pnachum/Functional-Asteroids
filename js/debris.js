const MovingObject = require('./movingObject'),
  SETTINGS = require('./settings');

// Debris objects are the small circles which make the asteroid look like
// it's exploding. They travel for a limited distance before disappearing
class Debris extends MovingObject {

  static get SPEED() {
    return SETTINGS.debris.speed;
  }

  constructor(pos, vel){
    var radius = SETTINGS.debris.radius;
    // Debris has the same color as the asteroids
    var color = SETTINGS.asteroids.color;

    super(pos, vel, radius, color);
    this.availableDistance = SETTINGS.debris.distance;
  }

  move(){
    MovingObject.prototype.move.call(this);
    this.availableDistance -= Debris.SPEED;
  }

  draw(ctx){
    // If the debris has available distance left to travel, just call the
    // MovingObject's draw function. Otherwise, don't call it.
    if (this.availableDistance > 0){
      MovingObject.prototype.draw.call(this, ctx);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Debris;
