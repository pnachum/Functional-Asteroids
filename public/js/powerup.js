(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var MovingObject = AsteroidsGame.MovingObject;
  var SETTINGS = AsteroidsGame.SETTINGS;
  var random = AsteroidsGame.random;
  var randomFromArray = AsteroidsGame.randomFromArray;
  var StandardBullet = AsteroidsGame.StandardBullet;

  var types = ["life", "score", "bullet"];
  var Powerup = AsteroidsGame.Powerup = function(pos, type, game){
    MovingObject.call(this, pos, [0, 0], SETTINGS.powerups.radius, colorMap[type]);
    this.type = type;
    this.game = game;
  };

  // Powerups don't actually move, so their velocity is always [0, 0]
  Powerup.inherits(MovingObject);

  // The bullet powerup is represented by the color of the bullet (red by
  // default). The extra life powerup is represented by the color of the ship (
  // blue by default). The score powerup is green.
  var colorMap = Powerup.colorMap = {
    bullet: SETTINGS.bullets.standard.color,
    life: SETTINGS.ship.color,
    score: "green"
  };

  Powerup.randomPowerup = function(game) {
    var position = [random(0, 500), random(0, 500)];
    if (game.lives >= 2) {
      // If the player has more than 3 lives, don't spawn extra life powerups
      var type = randomFromArray(types.slice(1));
    } else {
      var type = randomFromArray(types);
    }

    return new Powerup(position, type, game);
  };

  Powerup.prototype.applyEffect = function() {
    var game = this.game;
    var ship = game.ship;

    switch (this.type) {
    case "bullet":
      // The bullet powerup makes bullets faster, larger, and travel a longer
      // distance
      StandardBullet.SPEED *= 1.5;
      StandardBullet.RADIUS *= 2;
      SETTINGS.bullets.standard.distance *= 1.5;
      // The effect lasts for a limited time
      setTimeout(function() {
        StandardBullet.SPEED /= 1.5;
        StandardBullet.RADIUS /= 2;
        SETTINGS.bullets.standard.distance /= 1.5;
      }, 5000);
      break;
    case "life":
      game.lives++;
      break;
    case "score":
      game.increaseMultiplier();
      break;
    }
  }

})(this);
