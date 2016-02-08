const MovingObject = require('./movingObject'),
  SETTINGS = require('./settings'),
  Debris = require('./debris');

class Asteroid extends MovingObject {

  static setConstants() {
    Asteroid.minimumArea = SETTINGS.asteroids.startingMinimumArea;
    Asteroid.speed = SETTINGS.asteroids.startingSpeed;
    Asteroid.spawnRadius = SETTINGS.asteroids.startingSpawnRadius;
    Asteroid.COLOR = SETTINGS.asteroids.color;
  }

  static randomAsteroid(dimX, dimY, options) {
    var radius;
    // Asteroids in dodgeball have a predefined set of sizes
    if (options.dodgeball){
      radius = _.sample([15, 21.2, 30]);
    } else {
      radius = Asteroid.spawnRadius;
    }

    const randomPos = Asteroid.randomPos(dimX, dimY);
    const randomVel = Asteroid.randomVel(dimX, dimY, Asteroid.speed);
    return new Asteroid(randomPos, randomVel, radius, Asteroid.speed);
  }

  // Pick a random position along the edge of the game for the asteroid to
  // spawn at
  static randomPos(dimX, dimY, ship) {
    const radius = Asteroid.spawnRadius;
    const randomX = _.random(-radius, dimX + radius);
    const randomY = _.random(-radius, dimY + radius);
    const edgeX = _.sample([-radius, dimX + radius]);
    const edgeY = _.sample([-radius, dimY + radius]);
    const candidate1 = [edgeX, randomY];
    const candidate2 = [randomX, edgeY];
    return _.sample([candidate1, candidate2]);
  }

  // Pick a random direction for the asteroid to begin moving in
  static randomVel(dimX, dimY, intensity) {
    return [dimX, dimY].map( (dim) => {
      const range = (intensity * dim) / 125;
      const direction = _.sample([-1, 1]);
      return _.random(1, range) * direction;
    });
  }

  constructor(pos, vel, radius, spawnedSpeed) {
    super(pos, vel, radius, Asteroid.COLOR);
    // Asteroid stores the speed multiplier it spawned at so that when it is destroyed,
    // the new smaller asteroids can use the same speed, and not the class variable
    // speed, which increases over time.
    this.spawnedSpeed = spawnedSpeed;
  }

  // When an asteroid is hit with a bullet, it either breaks up into two
  // new asteroids, or if it's small enough, it explodes. In this case, it
  // is replaced with Debris objects.
  explode() {
    const pos = this.pos;
    const vels = [];
    const numDebris = SETTINGS.debris.number;
    const angle = 360 / numDebris;

    for (let i = 0; i < numDebris; i++){
      let degree = angle * i;
      vels.push([Math.cos(degree), Math.sin(degree)]);
    }

    return vels.map( (vel) => new Debris(pos.slice(), vel));
  }

  split(dimX, dimY, newRadius) {
    // The two new asteroids spawn at the position that the old asteroid was
    // destroyed
    const pos = this.pos;
    // They spawn at the same speed that the original asteroid spawned at,
    // but with random directions
    const spawnedSpeed = this.spawnedSpeed;
    const vel1 = Asteroid.randomVel(dimX, dimY, spawnedSpeed);
    const vel2 = Asteroid.randomVel(dimX, dimY, spawnedSpeed);
    return [vel1, vel2].map((vel) => {
      return new Asteroid(pos.slice(), vel, newRadius, spawnedSpeed)
    });
  }

  area() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

module.exports = Asteroid;
