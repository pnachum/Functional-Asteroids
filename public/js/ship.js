(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var SETTINGS = AsteroidsGame.SETTINGS;
  var MovingObject = AsteroidsGame.MovingObject;
  var Turret = AsteroidsGame.Turret;
  var Thruster = AsteroidsGame.Thruster;
  var toRadians = AsteroidsGame.toRadians;

  var Ship = AsteroidsGame.Ship = function(){
    MovingObject.call(this, Ship.CENTER, [0, 0], Ship.RADIUS, Ship.COLOR);
    this.turret = new Turret(this);
    this.thruster = new Thruster(this);
    this.invincible = true;
    this.spawnTime = Date.now();
    this.frame = 0;
  };

  Ship.RADIUS = SETTINGS.ship.radius;
  Ship.COLOR = SETTINGS.ship.color;
  Ship.CENTER = [250, 250];
  Ship.MAXSPEED = SETTINGS.ship.maxSpeed;

  Ship.inherits(MovingObject);

  Ship.prototype.direction = function(){
    return this.turret.direction();
  }

  Ship.prototype.draw = function(ctx){
    if (this.invincible){
      this.drawFlashing(ctx);
    } else {
      MovingObject.prototype.draw.call(this, ctx);
      this.turret.draw(ctx);
    }
    if (key.isPressed('up')){
      this.thruster.draw(ctx);
    }
  };

  Ship.prototype.drawFlashing = function(ctx){
    // Only draw the ship in some frames if the ship is invincible to make it
    // flash
    if (this.frame < 3){
      MovingObject.prototype.draw.call(this, ctx);
      this.turret.draw(ctx);
    }
    this.frame = (this.frame + 1) % 5;
  }

  Ship.prototype.fireBullet = function(){
    return this.turret.fireBullet();
  };

  Ship.prototype.move = function(){
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
  };

  Ship.prototype.power = function(impulse){
    var newVelX = this.vel[0] + impulse[0];
    var newVelY = this.vel[1] + impulse[1];

    var minX = Math.min(Ship.MAXSPEED, Math.abs(newVelX))
    newVelX = newVelX >= 0 ? minX : -minX;

    var minY = Math.min(Ship.MAXSPEED, Math.abs(newVelY))
    newVelY = newVelY >= 0 ? minY : -minY;

    this.vel = [newVelX, newVelY];
  };

  // The ship itself doesn't actually rotate. The turret and thruster do,
  // making it look like its rotating
  Ship.prototype.rotate = function(direction){
    this.turret.rotate(direction);
    this.thruster.rotate(direction);
  };

  Ship.prototype.setVel = function(){
    var accel = SETTINGS.ship.acceleration;
    return this.direction().map(function(d){
      return d * accel;
    });
  };

})(this);
