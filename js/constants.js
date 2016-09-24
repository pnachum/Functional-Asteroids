// @flow
import type { Ship } from './types/types';
import { Mode, PowerupType, Sound } from './types/enums';

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

export const MODES: Mode[] = [Mode.CLASSIC, Mode.DODGEBALL, Mode.BOSS, Mode.SUPER_BOSS];
export const POWERUP_TYPES: PowerupType[] = [
  PowerupType.LIFE,
  PowerupType.BULLET,
  PowerupType.BOMB,
  PowerupType.FREEZE,
  PowerupType.INVINCIBLE,
];

export const DEFAULT_MODE = Mode.CLASSIC;

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
      [Mode.CLASSIC]: 5000,
      [Mode.DODGEBALL]: 5000,
      [Mode.BOSS]: 0,
      [Mode.SUPER_BOSS]: 0,
    },
    startingSpawnRadius: {
      [Mode.CLASSIC]: 30,
      [Mode.DODGEBALL]: 30,
      [Mode.BOSS]: 100,
      [Mode.SUPER_BOSS]: 173,
    },
    startingNumber: {
      [Mode.CLASSIC]: 2,
      [Mode.DODGEBALL]: 2,
      [Mode.BOSS]: 1,
      [Mode.SUPER_BOSS]: 1,
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
      [Mode.CLASSIC]: 10,
      [Mode.DODGEBALL]: 5,
      [Mode.BOSS]: 10,
      [Mode.SUPER_BOSS]: 10,
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
    description: {
      [PowerupType.LIFE]: 'Extra life',
      [PowerupType.BULLET]: 'Gun upgrade',
      [PowerupType.BOMB]: 'Extra bomb',
      [PowerupType.FREEZE]: 'Freeze asteroids',
      [PowerupType.INVINCIBLE]: 'Invincibility',
    },
    color: {
      [PowerupType.BULLET]: bulletColor,
      [PowerupType.LIFE]: shipColor,
      [PowerupType.BOMB]: 'orange',
      [PowerupType.FREEZE]: 'lightblue',
      [PowerupType.INVINCIBLE]: 'purple',
    },
    bullet: {
      spreadDegrees: 15,
    },
  },

  startingLives: {
    [Mode.CLASSIC]: 2,
    [Mode.DODGEBALL]: 0,
    [Mode.BOSS]: 2,
    [Mode.SUPER_BOSS]: 6,
  },
  startingBombs: {
    [Mode.CLASSIC]: 2,
    [Mode.DODGEBALL]: 0,
    [Mode.BOSS]: 0,
    [Mode.SUPER_BOSS]: 0,
  },
  pointsForBreak: 2,
  pointsForDestroy: 10,

  audioFile: {
    [Sound.ASTEROID_BREAK]: 'asteroidBreak',
    [Sound.ASTEROID_DESTROY]: 'asteroidDestroy',
    [Sound.GAME_OVER]: 'gameOver',
    [Sound.LASER]: 'laser',
  },

  modes: {
    name: {
      [Mode.CLASSIC]: 'Classic',
      [Mode.DODGEBALL]: 'Dodgeball',
      [Mode.BOSS]: 'Bossteroid',
      [Mode.SUPER_BOSS]: 'Super Bossteroid',
    },
    description: {
      [Mode.CLASSIC]: 'Score as many points as you can before running out of lives',
      [Mode.DODGEBALL]: 'If you can dodge an asteroid, you can dodge a ball',
      [Mode.BOSS]: 'Kill the Bossteroid as quickly as possible. Like a boss',
      [Mode.SUPER_BOSS]: 'Like the Bossteroid, but three times bigger',
    },
    powerups: {
      [Mode.CLASSIC]: [
        PowerupType.LIFE,
        PowerupType.BULLET,
        PowerupType.BOMB,
        PowerupType.FREEZE,
        PowerupType.INVINCIBLE,
      ],
      [Mode.DODGEBALL]: [],
      [Mode.BOSS]: [
        PowerupType.LIFE,
        PowerupType.BULLET,
        PowerupType.FREEZE,
        PowerupType.INVINCIBLE,
      ],
      [Mode.SUPER_BOSS]: [
        PowerupType.LIFE,
        PowerupType.BULLET,
        PowerupType.FREEZE,
        PowerupType.INVINCIBLE,
      ],
    },
  },
};
