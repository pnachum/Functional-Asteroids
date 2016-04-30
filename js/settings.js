// Sets up all of the parameters of the game
const SETTINGS = {

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
    turretColor: 'blue',
    turretRadius: 3,
    airResistance: 0.07,
    invincibilityTime: 3,
  },

  bullets: {
    standard: {
      radius: 2,
      color: 'red',
      speed: 20,
      maximumNumber: 5,
      distance: 400,
    }
  },

  debris: {
    radius: 1,
    distance: 400,
    number: 10,
    speed: 20,
  },

  difficulty: {
    timeInterval: 10,
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
    }
  },

  startingLives: 2,

  updateMode(newMode) {
    this.mode = newMode;
    // Some settings need to be modified based on the game mode
    switch (newMode){
      case ('Bossteroid'):
        this.asteroids.startingNumber = 1;
        this.asteroids.startingMinimumArea = 0;
        this.asteroids.startingSpawnRadius = 100;
        break;
      case ('Dodgeball'):
        this.bullets.standard.maximumNumber = 0;
        this.startingLives = 0;
        this.difficulty.timeInterval = 5;
        break;
      case ('Super Bossteroid'):
        this.asteroids.startingNumber = 1;
        this.asteroids.startingMinimumArea = 0;
        this.asteroids.startingSpawnRadius = 173;
        this.startingLives = 6;
        break;
      case ('Classic'):
        this.asteroids.startingNumber = 2;
        break;
    }
  }
};

export default SETTINGS;
