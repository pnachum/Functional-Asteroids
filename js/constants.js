// @flow

import { Enum } from 'enumify';

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

export class Mode extends Enum {}
Mode.initEnum(['CLASSIC', 'DODGEBALL', 'BOSS', 'SUPER_BOSS']);

export class PowerupType extends Enum {}
PowerupType.initEnum(['LIFE', 'SCORE', 'BULLET', 'BOMB', 'FREEZE', 'INVINCIBLE']);

export class Sound extends Enum {}
Sound.initEnum({
  ASTEROID_BREAK: {
    get file() { return 'asteroidBreak'; },
  },
  ASTEROID_DESTROY: {
    get file() { return 'asteroidDestroy'; },
  },
  GAME_OVER: {
    get file() { return 'gameOver'; },
  },
  LASER: {
    get file() { return 'laser'; },
  },
});

export const MODES: Mode[] = [Mode.CLASSIC, Mode.DODGEBALL, Mode.BOSS, Mode.SUPER_BOSS];
export const POWERUP_TYPES: PowerupType[] = [
  PowerupType.LIFE,
  PowerupType.SCORE,
  PowerupType.BULLET,
  PowerupType.BOMB,
  PowerupType.FREEZE,
  PowerupType.INVINCIBLE,
];

export const DEFAULT_MODE = Mode.CLASSIC;

export const NAME_FOR_MODE: Map<Mode, string> = new Map();
NAME_FOR_MODE.set(Mode.CLASSIC, 'Classic');
NAME_FOR_MODE.set(Mode.DODGEBALL, 'Dodgeball');
NAME_FOR_MODE.set(Mode.BOSS, 'Bossteroid');
NAME_FOR_MODE.set(Mode.SUPER_BOSS, 'Super Bossteroid');

export const DESCRIPTION_FOR_MODE: Map<Mode, string> = new Map();
DESCRIPTION_FOR_MODE.set(Mode.CLASSIC, 'Score as many points as you can before running out of lives');
DESCRIPTION_FOR_MODE.set(Mode.DODGEBALL, 'If you can dodge an asteroid, you can dodge a ball');
DESCRIPTION_FOR_MODE.set(Mode.BOSS, 'Kill the Bossteroid as quickly as possible. Like a boss');
DESCRIPTION_FOR_MODE.set(Mode.SUPER_BOSS, 'Like the Bossteroid, but three times bigger');

export const DESCRIPTION_FOR_POWERUP: Map<PowerupType, string> = new Map();
DESCRIPTION_FOR_POWERUP.set(PowerupType.SCORE, 'Increase score multiplier');
DESCRIPTION_FOR_POWERUP.set(PowerupType.LIFE, 'Extra life');
DESCRIPTION_FOR_POWERUP.set(PowerupType.BULLET, 'Gun upgrade');
DESCRIPTION_FOR_POWERUP.set(PowerupType.BOMB, 'Extra bomb');
DESCRIPTION_FOR_POWERUP.set(PowerupType.FREEZE, 'Freeze asteroids');
DESCRIPTION_FOR_POWERUP.set(PowerupType.INVINCIBLE, 'Invincibility');

// The powerups that are available in each game mode
export const POWERUPS_FOR_MODE: Map<Mode, PowerupType[]> = new Map();
POWERUPS_FOR_MODE.set(Mode.CLASSIC, [
  PowerupType.LIFE,
  PowerupType.SCORE,
  PowerupType.BULLET,
  PowerupType.BOMB,
  PowerupType.FREEZE,
  PowerupType.INVINCIBLE,
]);
POWERUPS_FOR_MODE.set(Mode.DODGEBALL, []);
POWERUPS_FOR_MODE.set(Mode.BOSS, [
  PowerupType.LIFE,
  PowerupType.BULLET,
  PowerupType.FREEZE,
  PowerupType.INVINCIBLE,
]);
POWERUPS_FOR_MODE.set(Mode.SUPER_BOSS, [
  PowerupType.LIFE,
  PowerupType.BULLET,
  PowerupType.FREEZE,
  PowerupType.INVINCIBLE,
]);

export const SETTINGS = {
  asteroids: {
    startingMinimumArea: {
      [Mode.CLASSIC.name]: 5000,
      [Mode.DODGEBALL.name]: 5000,
      [Mode.BOSS.name]: 0,
      [Mode.SUPER_BOSS.name]: 0,
    },
    startingSpawnRadius: {
      [Mode.CLASSIC.name]: 30,
      [Mode.DODGEBALL.name]: 30,
      [Mode.BOSS.name]: 100,
      [Mode.SUPER_BOSS.name]: 173,
    },
    startingNumber: {
      [Mode.CLASSIC.name]: 2,
      [Mode.DODGEBALL.name]: 2,
      [Mode.BOSS.name]: 1,
      [Mode.SUPER_BOSS.name]: 1,
    },
    minimumRadius: 10,
    color: 'sienna',
    startingSpeed: 0.5,
  },

  ship: {
    radius: 10,
    color: 'blue',
    maxSpeed: 5,
    turnSpeed: 10,
    acceleration: 0.3,
    thrusterRadius: 5,
    thrusterColor: 'orange',
    turretRadius: 3,
    airResistance: 0.07,
    invincibilityTime: 3, // seconds
    defaultShip: {
      pos: [250, 250],
      vel: [0, 0],
      degrees: 90,
      isThrusting: false,
      invincibilityStartFrame: 0,
    },
  },

  bullets: {
    radius: 2,
    color: 'red',
    speed: 20,
    distance: 400,
  },

  debris: {
    distance: 400,
    number: 10,
    speed: 20,
  },

  difficulty: {
    timeInterval: {
      // seconds
      [Mode.CLASSIC.name]: 10,
      [Mode.DODGEBALL.name]: 5,
      [Mode.BOSS.name]: 10,
      [Mode.SUPER_BOSS.name]: 10,
    },
    asteroidSpeedIncrease: 0.15,
    asteroidSpawnRadiusMultiplier: 1.0,
    minimumAsteroidAreaMultiplier: 1.25,
  },

  powerups: {
    radius: 10,
    duration: {
      // seconds
      [PowerupType.BULLET]: 5,
      [PowerupType.FREEZE]: 3,
    },
    bullet: {
      speedMultiplier: 1.5,
      radiusMultiplier: 2,
      distanceMultiplier: 1.5,
    },
  },

  startingLives: {
    [Mode.CLASSIC.name]: 2,
    [Mode.DODGEBALL.name]: 0,
    [Mode.BOSS.name]: 2,
    [Mode.SUPER_BOSS.name]: 6,
  },
  startingBombs: {
    [Mode.CLASSIC.name]: 2,
    [Mode.DODGEBALL.name]: 0,
    [Mode.BOSS.name]: 0,
    [Mode.SUPER_BOSS.name]: 0,
  },
  pointsForBreak: 2,
  pointsForDestroy: 10,
};

export const COLOR_FOR_POWERUP: Map<PowerupType, string> = new Map();
COLOR_FOR_POWERUP.set(PowerupType.BULLET, SETTINGS.bullets.color);
COLOR_FOR_POWERUP.set(PowerupType.LIFE, SETTINGS.ship.color);
COLOR_FOR_POWERUP.set(PowerupType.SCORE, 'green');
COLOR_FOR_POWERUP.set(PowerupType.BOMB, 'orange');
COLOR_FOR_POWERUP.set(PowerupType.FREEZE, 'lightblue');
COLOR_FOR_POWERUP.set(PowerupType.INVINCIBLE, 'purple');
