(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var Rotateable = AsteroidsGame.Rotateable;
  var SETTINGS = AsteroidsGame.SETTINGS;
  var StandardBullet = AsteroidsGame.StandardBullet;

  // The turret is the small circle in front of the ship where it shoots
  // bullets from.
  var Turret = AsteroidsGame.Turret = function (ship){
    var startingPos = [ship.pos[0], ship.pos[1] - ship.radius]

    Rotateable.call(this, ship, startingPos, Turret.RADIUS, ship.color, 90);
  };

  Turret.RADIUS = SETTINGS.ship.turretRadius;

  Turret.inherits(Rotateable);

  Turret.prototype.fireBullet = function(){
    return new StandardBullet(this);
  };

})(this);
