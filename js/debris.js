(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var MovingObject = AsteroidsGame.MovingObject;
  var SETTINGS = AsteroidsGame.SETTINGS;

  // Debris objects are the small circles which make the asteroid look like
  // it's exploding. They travel for a limited distance before disappearing
  var Debris = AsteroidsGame.Debris = function(pos, vel){
    var radius = SETTINGS.debris.radius;
    // Debris has the same color as the asteroids
    var color = SETTINGS.asteroids.color;

    MovingObject.call(this, pos, vel, radius, color);
    this.availableDistance = SETTINGS.debris.distance;
  };

  Debris.inherits(MovingObject);

  Debris.SPEED = SETTINGS.debris.speed;

  Debris.prototype.move = function(){
    MovingObject.prototype.move.call(this);
    this.availableDistance -= Debris.SPEED;
  };

  Debris.prototype.draw = function(ctx){
    // If the debris has available distance left to travel, just call the
    // MovingObject's draw function. Otherwise, don't call it.
    if (this.availableDistance > 0){
      MovingObject.prototype.draw.call(this, ctx);
      return true;
    } else {
      return false;
    }
  };

})(this);
