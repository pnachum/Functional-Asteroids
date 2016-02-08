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

    var randomPos = Asteroid.randomPos(dimX, dimY);
    var randomVel = Asteroid.randomVel(dimX, dimY, Asteroid.speed);
    return new Asteroid(randomPos, randomVel, radius, Asteroid.speed);
  }

  // Pick a random position along the edge of the game for the asteroid to
  // spawn at
  static randomPos(dimX, dimY, ship) {
    var radius = Asteroid.spawnRadius;
    var randomX = _.random(-radius, dimX + radius);
    var randomY = _.random(-radius, dimY + radius);
    var edgeX = _.sample([-radius, dimX + radius]);
    var edgeY = _.sample([-radius, dimY + radius]);
    var candidate1 = [edgeX, randomY];
    var candidate2 = [randomX, edgeY];
    return _.sample([candidate1, candidate2]);
  }

  // Pick a random direction for the asteroid to begin moving in
  static randomVel(dimX, dimY, intensity) {
    var rangeX = (intensity * dimX) / 125;
    var rangeY = (intensity * dimY) / 125;
    var xDirection = _.sample([-1, 1]);
    var yDirection = _.sample([-1, 1]);
    var randomDx = _.random(1, rangeX) * xDirection;
    var randomDy = _.random(1, rangeY) * yDirection;
    return [randomDx, randomDy];
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
  explode(){
    var pos = this.pos;
    var vels = [];
    var numDebris = SETTINGS.debris.number;
    var angle = 360 / numDebris;

    for (var i = 0; i < numDebris; i++){
      var degree = angle * i;
      vels.push([Math.cos(degree), Math.sin(degree)]);
    }

    return vels.map(function(vel){
      return new Debris(pos.slice(), vel);
    });
  }

  split(dimX, dimY, newRadius) {
    // The two new asteroids spawn at the position that the old asteroid was
    // destroyed
    var pos = this.pos;
    // They spawn at the same speed that the original asteroid spawned at,
    // but with random directions
    var spawnedSpeed = this.spawnedSpeed;
    var vel1 = Asteroid.randomVel(dimX, dimY, spawnedSpeed);
    var vel2 = Asteroid.randomVel(dimX, dimY, spawnedSpeed);

    var asteroid_one = new Asteroid(pos.slice(), vel1, newRadius, spawnedSpeed);
    var asteroid_two = new Asteroid(pos.slice(), vel2, newRadius, spawnedSpeed);
    return [asteroid_one, asteroid_two];
  }

  area() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

module.exports = Asteroid;
