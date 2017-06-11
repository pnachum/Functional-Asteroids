// @flow
import type { Ship } from './types/types';
import type { Mode, PowerupType, Sound } from './types/enums';

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

export const MODES: Mode[] = ['CLASSIC', 'DODGEBALL', 'BOSS', 'SUPER_BOSS'];
export const BOSS_MODES: Mode[] = ['BOSS', 'SUPER_BOSS'];
export const POWERUP_TYPES: PowerupType[] = [
  'LIFE',
  'BULLET',
  'BOMB',
  'FREEZE',
  'INVINCIBLE',
];

export const DEFAULT_MODE: Mode = 'CLASSIC';

const bulletColor = 'red';
const shipColor = 'blue';

type ModeToNumber = { [key: Mode]: number };
type ModeToString = { [key: Mode]: string };
type PowerupTypeToString = { [key: PowerupType]: string };

type SettingsType = {
  asteroids: {
    startingMinimumArea: ModeToNumber,
    startingSpawnRadius: ModeToNumber,
    startingNumber: ModeToNumber,
    minimumRadius: number,
    color: string,
    startingSpeed: number,
  },
  ship: {
    radius: number,
    color: string,
    maxSpeed: number,
    turnSpeed: number,
    acceleration: number,
    thrusterRadius: number,
    thrusterColor: string,
    turretRadius: number,
    airResistance: number,
    invincibilityTime: number,
    defaultShip: Ship,
  },
  bullets: {
    radius: number,
    color: string,
    speed: number,
    distance: number,
  },
  debris: {
    distance: number,
    number: number,
    speed: number,
  },
  difficulty: {
    timeInterval: ModeToNumber,
    asteroidSpeedIncrease: number,
    asteroidSpawnRadiusMultiplier: number,
    minimumAsteroidAreaMultiplier: number,
  },
  powerups: {
    radius: number,
    duration: { [key: PowerupType]: number },
    description: PowerupTypeToString,
    color: PowerupTypeToString,
    bullet: {
      spreadDegrees: number,
    },
  },
  startingLives: ModeToNumber,
  startingBombs: ModeToNumber,
  pointsForBreak: number,
  pointsForDestroy: number,
  audioFile: { [key: Sound]: string },
  modes: {
    name: ModeToString,
    description: ModeToString,
    powerups: { [key: Mode]: PowerupType[] },
  },
};

export const SETTINGS: SettingsType = {
  asteroids: {
    startingMinimumArea: {
      CLASSIC: 5000,
      DODGEBALL: 5000,
      BOSS: 0,
      SUPER_BOSS: 0,
    },
    startingSpawnRadius: {
      CLASSIC: 30,
      DODGEBALL: 30,
      BOSS: 100,
      SUPER_BOSS: 173,
    },
    startingNumber: {
      CLASSIC: 2,
      DODGEBALL: 2,
      BOSS: 1,
      SUPER_BOSS: 1,
    },
    minimumRadius: 10,
    color: 'sienna',
    startingSpeed: 0.5,
  },

  ship: {
    radius: 10,
    color: shipColor,
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
    color: bulletColor,
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
      CLASSIC: 10,
      DODGEBALL: 5,
      BOSS: 10,
      SUPER_BOSS: 10,
    },
    asteroidSpeedIncrease: 0.15,
    asteroidSpawnRadiusMultiplier: 1.0,
    minimumAsteroidAreaMultiplier: 1.25,
  },

  powerups: {
    radius: 10,
    duration: {
      // seconds
      BULLET: 5,
      FREEZE: 3,
    },
    description: {
      LIFE: 'Extra life',
      BULLET: 'Gun upgrade',
      BOMB: 'Extra bomb',
      FREEZE: 'Freeze asteroids',
      INVINCIBLE: 'Invincibility',
    },
    color: {
      BULLET: bulletColor,
      LIFE: shipColor,
      BOMB: 'orange',
      FREEZE: 'lightblue',
      INVINCIBLE: 'purple',
    },
    bullet: {
      spreadDegrees: 15,
    },
  },

  startingLives: {
    CLASSIC: 2,
    DODGEBALL: 0,
    BOSS: 2,
    SUPER_BOSS: 6,
  },
  startingBombs: {
    CLASSIC: 2,
    DODGEBALL: 0,
    BOSS: 0,
    SUPER_BOSS: 0,
  },
  pointsForBreak: 2,
  pointsForDestroy: 10,

  audioFile: {
    ASTEROID_BREAK: 'asteroidBreak',
    ASTEROID_DESTROY: 'asteroidDestroy',
    GAME_OVER: 'gameOver',
    LASER: 'laser',
  },

  modes: {
    name: {
      CLASSIC: 'Classic',
      DODGEBALL: 'Dodgeball',
      BOSS: 'Bossteroid',
      SUPER_BOSS: 'Super Bossteroid',
    },
    description: {
      CLASSIC: 'Score as many points as you can before running out of lives',
      DODGEBALL: 'If you can dodge an asteroid, you can dodge a ball',
      BOSS: 'Kill the Bossteroid as quickly as possible. Like a boss',
      SUPER_BOSS: 'Like the Bossteroid, but three times bigger',
    },
    powerups: {
      CLASSIC: [
        'LIFE',
        'BULLET',
        'BOMB',
        'FREEZE',
        'INVINCIBLE',
      ],
      DODGEBALL: [],
      BOSS: [
        'LIFE',
        'BULLET',
        'FREEZE',
        'INVINCIBLE',
      ],
      SUPER_BOSS: [
        'LIFE',
        'BULLET',
        'FREEZE',
        'INVINCIBLE',
      ],
    },
  },
};
