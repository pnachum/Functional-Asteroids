const MovingObject = require('./movingObject'),
  SETTINGS = require('./settings');

class StandardBullet extends MovingObject {

  static get SPEED() {
    return SETTINGS.bullets.standard.speed;
  }

  static set SPEED(val) {
    SETTINGS.bullets.standard.speed = val;
  }

  static get RADIUS() {
    return SETTINGS.bullets.standard.radius;
  }

  static set RADIUS(val) {
    SETTINGS.bullets.standard.radius = val;
  }

  static get DISTANCE() {
    return SETTINGS.bullets.standard.distance;
  }

  static set DISTANCE(val) {
    SETTINGS.bullets.standard.distance = val;
  }

  static get COLOR() {
    return SETTINGS.bullets.standard.color;
  }

  static setVel(turret) {
    return turret.direction().map( (d) => StandardBullet.SPEED * d);
  }

  constructor(turret) {
    super(turret.pos, StandardBullet.setVel(turret), StandardBullet.RADIUS, StandardBullet.COLOR);
    this.turret = turret;
    this.availableDistance = SETTINGS.bullets.standard.distance;
  }

  draw(ctx) {
    if (this.availableDistance > 0){
      super.draw(ctx);
      return true;
    } else {
      return false;
    }
  }

  move() {
    super.move();
    this.availableDistance -= StandardBullet.SPEED;
  }

}

module.exports = StandardBullet;
