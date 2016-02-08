const SETTINGS = require('./settings'),
  MovingObject = require('./movingObject'),
  Turret = require('./turret'),
  Thruster = require('./thruster'),
  toRadians = require('./helpers').toRadians,
  key = require('keymaster');

class Ship extends MovingObject {

  static get RADIUS() {
    return SETTINGS.ship.radius;
  }

  static get COLOR() {
    return SETTINGS.ship.color;
  }

  static get CENTER() {
    return [250, 250];
  }

  static get MAXSPEED() {
    return SETTINGS.ship.maxSpeed;
  }

  constructor(){
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
    if (this.invincible){
      this.drawFlashing(ctx);
    } else {
      MovingObject.prototype.draw.call(this, ctx);
      this.turret.draw(ctx);
    }
    if (key.isPressed('up')){
      this.thruster.draw(ctx);
    }
  }

  drawFlashing(ctx) {
    // Only draw the ship in some frames if the ship is invincible to make it
    // flash
    if (this.frame < 3){
      MovingObject.prototype.draw.call(this, ctx);
      this.turret.draw(ctx);
    }
    this.frame = (this.frame + 1) % 5;
  }

  fireBullet() {
    return this.turret.fireBullet();
  }

  move() {
    MovingObject.prototype.move.call(this);
    this.turret.move();
    this.thruster.move();

    var airResistance = SETTINGS.ship.airResistance;

    if (this.vel[0] > airResistance){
      this.vel[0] -= airResistance;
    } else if (this.vel[0] < -airResistance) {
      this.vel[0] += airResistance;
    } else {
      this.vel[0] = 0;
    }

    if (this.vel[1] > airResistance){
      this.vel[1] -= airResistance;
    } else if (this.vel[1] < -airResistance){
      this.vel[1] += airResistance;
    } else {
      this.vel[1] = 0;
    }
  }

  power(impulse) {
    var newVelX = this.vel[0] + impulse[0];
    var newVelY = this.vel[1] + impulse[1];

    // Enforce that the ship's speed does not exceed MAXSPEED
    var minX = Math.min(Ship.MAXSPEED, Math.abs(newVelX))
    newVelX = newVelX >= 0 ? minX : -minX;

    var minY = Math.min(Ship.MAXSPEED, Math.abs(newVelY))
    newVelY = newVelY >= 0 ? minY : -minY;

    this.vel = [newVelX, newVelY];
  }

  // The ship itself doesn't actually rotate. The turret and thruster do,
  // making it look like its rotating
  rotate(direction) {
    this.turret.rotate(direction);
    this.thruster.rotate(direction);
  };

  setVel() {
    var accel = SETTINGS.ship.acceleration;
    return this.direction().map(function(d){
      return d * accel;
    });
  }
}

module.exports = Ship;
