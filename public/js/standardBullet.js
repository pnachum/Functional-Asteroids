(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var MovingObject = AsteroidsGame.MovingObject;
  var toRadians = AsteroidsGame.toRadians;
  var random = AsteroidsGame.random;
  var SETTINGS = AsteroidsGame.SETTINGS;

  var StandardBullet = AsteroidsGame.StandardBullet = function (turret){
    MovingObject.call(this, turret.pos, setVel(turret), StandardBullet.RADIUS, StandardBullet.COLOR);
    this.turret = turret;
    this.availableDistance = SETTINGS.bullets.standard.distance;
  };

  StandardBullet.SPEED = SETTINGS.bullets.standard.speed;
  StandardBullet.RADIUS = SETTINGS.bullets.standard.radius;
  StandardBullet.COLOR = SETTINGS.bullets.standard.color;

  StandardBullet.inherits(MovingObject);

  StandardBullet.prototype.draw = function(ctx){
    if (this.availableDistance > 0){
      MovingObject.prototype.draw.call(this, ctx);
      return true;
    } else {
      return false;
    }
  };

  StandardBullet.prototype.move = function(){
    MovingObject.prototype.move.call(this);
    this.availableDistance -= StandardBullet.SPEED;
  };

  var setVel = function(turret){
    return turret.direction().map(function(d){
      return StandardBullet.SPEED * d;
    });
  };

})(this);
