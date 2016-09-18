// @flow

export const DIMENSION = 500;
export const FRAMES_PER_SECOND = 30;

export const SETTINGS = {
  asteroids: {
    startingNumber: 2,
    startingMinimumArea: 5000,
    startingSpawnRadius: 30,
    minimumRadius: 10,
    color: 'sienna',
    spawnBufferRange: 200,
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
    timeInterval: 10, // seconds
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

  startingLives: 2,
  pointsForBreak: 2,
  pointsForDestroy: 10,
};
