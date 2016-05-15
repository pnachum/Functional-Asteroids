import MovingObject from './movingObject';
import SETTINGS from './settings';
import StandardBullet from './standardBullet';
import { random, without, sample } from 'lodash';

// Powerups are colored circles that occasionally appear on the screen.
// Moving the ship over them provides some bonus
export default class Powerup extends MovingObject {

  // The bullet powerup is represented by the color of the bullet (red by
  // default). The extra life powerup is represented by the color of the ship (
  // blue by default). The score powerup is green.
  static colorMap = {
    bullet: SETTINGS.bullets.standard.color,
    life: SETTINGS.ship.color,
    score: 'green',
  };

  // The types of powerups available in each mode
  static typesForMode = {
    'Classic': ['life', 'score', 'bullet'],
    'Bossteroid': ['life', 'bullet'],
    'Super Bossteroid': ['life', 'bullet'],
  };

  static randomPowerup(game) {
    const position = [random(0, 500), random(0, 500)];
    let types = Powerup.typesForMode[game.mode];
    // If the player has 2 or more lives, don't spawn extra life powerups
    if (game.lives >= 2) {
      types = without(types, "life");
    }
    const type = sample(types);

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
    case 'bullet':
      const {
        speedMultiplier,
        radiusMultiplier,
        distanceMultiplier,
        duration,
      } = SETTINGS.powerups.bullet;

      // The bullet powerup makes bullets faster, larger, and travel a longer
      // distance
      StandardBullet.SPEED *= speedMultiplier;
      StandardBullet.RADIUS *= radiusMultiplier;
      StandardBullet.DISTANCE *= distanceMultiplier;
      // The effect lasts for a limited time
      setTimeout(() => {
        StandardBullet.SPEED /= speedMultiplier;
        StandardBullet.RADIUS /= radiusMultiplier;
        StandardBullet.DISTANCE /= distanceMultiplier;
      }, duration);
      break;
    case 'life':
      game.lives++;
      break;
    case 'score':
      game.increaseMultiplier();
      break;
    }
  }
}
