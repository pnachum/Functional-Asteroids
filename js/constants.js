// @flow

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

// Flow's literal types can't use constants, so make sure the Mode type is updated if these
// constants change
export const CLASSIC = 0;
export const DODGEBALL = 1;
export const BOSS = 2;
export const SUPER_BOSS = 3;

export const MODES = [CLASSIC, DODGEBALL, BOSS, SUPER_BOSS];

export const DEFAULT_MODE = CLASSIC;

export const NAME_FOR_MODE = {
  [CLASSIC]: 'Classic',
  [DODGEBALL]: 'Dodgeball',
  [BOSS]: 'Bossteroid',
  [SUPER_BOSS]: 'Super Bossteroid',
};

export const DESCRIPTION_FOR_MODE = {
  [CLASSIC]: 'Score as many points as you can before running out of lives',
  [DODGEBALL]: 'If you can dodge an asteroid, you can dodge a ball',
  [BOSS]: 'Kill the Bossteroid as quickly as possible. Like a boss',
  [SUPER_BOSS]: 'Like the Bossteroid, but three times bigger',
};

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
    invincibilityTime: 3,
    defaultShip: {
      pos: [250, 250],
      vel: [0, 0],
      degrees: 90,
      isThrusting: false,
    },
  },

  bullets: {
    radius: 2,
    color: 'red',
    speed: 20,
    maximumNumber: 5,
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
    bullet: {
      speedMultiplier: 1.5,
      radiusMultiplier: 2,
      distanceMultiplier: 1.5,
      duration: 5000,
    },
  },

  startingLives: {
    [CLASSIC]: 2,
    [DODGEBALL]: 0,
    [BOSS]: 2,
    [SUPER_BOSS]: 6,
  },
  pointsForBreak: 2,
  pointsForDestroy: 10,
};
