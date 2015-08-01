(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var MovingObject = AsteroidsGame.MovingObject;
  var SETTINGS = AsteroidsGame.SETTINGS;

  // Debris objects are the small circles which make the asteroid look like
  // it's exploding. They travel for a limited distance before disappearing
  var Debris = AsteroidsGame.Debris = function(pos, vel){
    var radius = SETTINGS.debris.radius;

    MovingObject.call(this, pos, vel, radius, SETTINGS.asteroids.color);
    this.availableDistance = SETTINGS.debris.distance;
  };

  Debris.inherits(MovingObject);

  Debris.SPEED = SETTINGS.debris.speed;

  Debris.prototype.move = function(){
    MovingObject.prototype.move.call(this);
    this.availableDistance -= Debris.SPEED;
  };

  Debris.prototype.draw = function(ctx){
    if (this.availableDistance > 0){
      MovingObject.prototype.draw.call(this, ctx);
      return true;
    } else {
      return false;
    }
  };

})(this);
