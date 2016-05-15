import SETTINGS from './settings';
import MovingObject from './movingObject';
import Turret from './turret';
import Thruster from './thruster';
import key from 'keymaster';

export default class Ship extends MovingObject {

  static RADIUS = SETTINGS.ship.radius;
  static COLOR = SETTINGS.ship.color;
  static CENTER = [250, 250];
  static MAXSPEED = SETTINGS.ship.maxSpeed;

  constructor() {
    super(Ship.CENTER, [0, 0], Ship.RADIUS, Ship.COLOR);
    this.turret = new Turret(this);
    this.thruster = new Thruster(this);
    this.invincible = true;
    this.spawnTime = Date.now();
    this.frame = 0;
  }

  direction() {
    return this.turret.direction();
  }

  draw(ctx) {
    if (this.invincible) {
      this.drawFlashing(ctx);
    } else {
      super.draw(ctx);
      this.turret.draw(ctx);
    }
    if (key.isPressed('up')) {
      this.thruster.draw(ctx);
    }
  }

  drawFlashing(ctx) {
    // Only draw the ship in some frames if the ship is invincible to make it
    // flash.
    if (this.frame < 3) {
      super.draw(ctx);
      this.turret.draw(ctx);
    }
    this.frame = (this.frame + 1) % 5;
  }

  fireBullet() {
    return this.turret.fireBullet();
  }

  move() {
    super.move();
    this.turret.move();
    this.thruster.move();

    const airResistance = SETTINGS.ship.airResistance;

    [0, 1].forEach((i) => {
      if (this.vel[i] > airResistance) {
        this.vel[i] -= airResistance;
      } else if (this.vel[i] < -airResistance) {
        this.vel[i] += airResistance;
      } else {
        this.vel[i] = 0;
      }
    });
  }

  power(impulse) {
    let newVelX = this.vel[0] + impulse[0];
    let newVelY = this.vel[1] + impulse[1];

    // Enforce that the ship's speed does not exceed MAXSPEED
    const minX = Math.min(Ship.MAXSPEED, Math.abs(newVelX));
    newVelX = newVelX >= 0 ? minX : -minX;

    const minY = Math.min(Ship.MAXSPEED, Math.abs(newVelY));
    newVelY = newVelY >= 0 ? minY : -minY;

    this.vel = [newVelX, newVelY];
  }

  // The ship itself doesn't actually rotate. The turret and thruster do,
  // making it look like its rotating
  rotate(direction) {
    this.turret.rotate(direction);
    this.thruster.rotate(direction);
  }

  setVel() {
    const accel = SETTINGS.ship.acceleration;
    return this.direction().map((d) => d * accel);
  }
}
