// @flow

import type { Mode, PowerupType } from './types/index';

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

// TODO: Use enums for mode and powerup

// Flow's literal types can't use constants, so make sure the Mode and PowerupType types are
// updated if these constants change
export const CLASSIC: Mode = 0;
export const DODGEBALL: Mode = 1;
export const BOSS: Mode = 2;
export const SUPER_BOSS: Mode = 3;

export const LIFE: PowerupType = 0;
export const SCORE: PowerupType = 1;
export const BULLET: PowerupType = 2;
export const BOMB: PowerupType = 3;
export const FREEZE: PowerupType = 4;

export const MODES: Mode[] = [CLASSIC, DODGEBALL, BOSS, SUPER_BOSS];
export const POWERUP_TYPES: PowerupType[] = [LIFE, SCORE, BULLET, BOMB, FREEZE];

export const DEFAULT_MODE = CLASSIC;

export const NAME_FOR_MODE: Map<Mode, string> = new Map();
NAME_FOR_MODE.set(CLASSIC, 'Classic');
NAME_FOR_MODE.set(DODGEBALL, 'Dodgeball');
NAME_FOR_MODE.set(BOSS, 'Bossteroid');
NAME_FOR_MODE.set(SUPER_BOSS, 'Super Bossteroid');

export const DESCRIPTION_FOR_MODE: Map<Mode, string> = new Map();
DESCRIPTION_FOR_MODE.set(CLASSIC, 'Score as many points as you can before running out of lives');
DESCRIPTION_FOR_MODE.set(DODGEBALL, 'If you can dodge an asteroid, you can dodge a ball');
DESCRIPTION_FOR_MODE.set(BOSS, 'Kill the Bossteroid as quickly as possible. Like a boss');
DESCRIPTION_FOR_MODE.set(SUPER_BOSS, 'Like the Bossteroid, but three times bigger');

export const DESCRIPTION_FOR_POWERUP: Map<PowerupType, string> = new Map();
DESCRIPTION_FOR_POWERUP.set(SCORE, 'Increase score multiplier');
DESCRIPTION_FOR_POWERUP.set(LIFE, 'Extra life');
DESCRIPTION_FOR_POWERUP.set(BULLET, 'Gun upgrade');
DESCRIPTION_FOR_POWERUP.set(BOMB, 'Extra bomb');
DESCRIPTION_FOR_POWERUP.set(FREEZE, 'Freeze asteroids');

// The powerups that are available in each game mode
export const POWERUPS_FOR_MODE: Map<Mode, PowerupType[]> = new Map();
POWERUPS_FOR_MODE.set(CLASSIC, [LIFE, SCORE, BULLET, BOMB, FREEZE]);
POWERUPS_FOR_MODE.set(DODGEBALL, []);
POWERUPS_FOR_MODE.set(BOSS, [LIFE, BULLET, FREEZE]);
POWERUPS_FOR_MODE.set(SUPER_BOSS, [LIFE, BULLET, FREEZE]);

export const SETTINGS = {
  asteroids: {
    startingMinimumArea: {
      [CLASSIC]: 5000,
      [DODGEBALL]: 5000,
      [BOSS]: 0,
      [SUPER_BOSS]: 0,
    },
    startingSpawnRadius: {
      [CLASSIC]: 30,
      [DODGEBALL]: 30,
      [BOSS]: 100,
      [SUPER_BOSS]: 173,
    },
    startingNumber: {
      [CLASSIC]: 2,
      [DODGEBALL]: 2,
      [BOSS]: 1,
      [SUPER_BOSS]: 1,
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
      spawnFrame: 0,
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
      [CLASSIC]: 10,
      [DODGEBALL]: 5,
      [BOSS]: 10,
      [SUPER_BOSS]: 10,
    },
    asteroidSpeedIncrease: 0.15,
    asteroidSpawnRadiusMultiplier: 1.0,
    minimumAsteroidAreaMultiplier: 1.25,
  },

  powerups: {
    radius: 10,
    duration: {
      // seconds
      [BULLET]: 5,
      [FREEZE]: 3,
    },
    bullet: {
      speedMultiplier: 1.5,
      radiusMultiplier: 2,
      distanceMultiplier: 1.5,
    },
  },

  startingLives: {
    [CLASSIC]: 2,
    [DODGEBALL]: 0,
    [BOSS]: 2,
    [SUPER_BOSS]: 6,
  },
  startingBombs: {
    [CLASSIC]: 2,
    [DODGEBALL]: 0,
    [BOSS]: 0,
    [SUPER_BOSS]: 0,
  },
  pointsForBreak: 2,
  pointsForDestroy: 10,
};

export const COLOR_FOR_POWERUP: Map<PowerupType, string> = new Map();
COLOR_FOR_POWERUP.set(BULLET, SETTINGS.bullets.color);
COLOR_FOR_POWERUP.set(LIFE, SETTINGS.ship.color);
COLOR_FOR_POWERUP.set(SCORE, 'green');
COLOR_FOR_POWERUP.set(BOMB, 'orange');
COLOR_FOR_POWERUP.set(FREEZE, 'lightblue');
