const MovingObject = require('./movingObject'),
  SETTINGS = require('./settings'),
  StandardBullet = require('./standardBullet');

// Powerups are colored circles that occasionally appear on the screen.
// Moving the ship over them provides some bonus
class Powerup extends MovingObject {

  // The bullet powerup is represented by the color of the bullet (red by
  // default). The extra life powerup is represented by the color of the ship (
  // blue by default). The score powerup is green.
  static get colorMap() {
    return {
      bullet: SETTINGS.bullets.standard.color,
      life: SETTINGS.ship.color,
      score: "green"
    };
  }

  // The types of powerups available in each mode
  static get typesForMode() {
    return {
      "Classic": ["life", "score", "bullet"],
      "Bossteroid": ["life", "bullet"],
      "Super Bossteroid": ["life", "bullet"]
    };
  }

  static randomPowerup(game) {
    const position = [_.random(0, 500), _.random(0, 500)];
    var types = Powerup.typesForMode[game.mode];
    // If the player has 2 or more lives, don't spawn extra life powerups
    if (game.lives >= 2) {
      types = _.without(types, "life");
    }
    const type = _.sample(types);

    return new Powerup(position, type, game);
  }

  constructor(pos, type, game) {
    // Powerups don't actually move, so their velocity is always [0, 0]
    super(pos, [0, 0], SETTINGS.powerups.radius, Powerup.colorMap[type]);
    this.type = type;
    this.game = game;
  }

  applyEffect() {
    const game = this.game;

    switch (this.type) {
    case "bullet":
      // The bullet powerup makes bullets faster, larger, and travel a longer
      // distance
      StandardBullet.SPEED *= 1.5;
      StandardBullet.RADIUS *= 2;
      StandardBullet.DISTANCE *= 1.5;
      // The effect lasts for a limited time
      setTimeout(function() {
        StandardBullet.SPEED /= 1.5;
        StandardBullet.RADIUS /= 2;
        StandardBullet.DISTANCE /= 1.5;
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
}

module.exports = Powerup;
