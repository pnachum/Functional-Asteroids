import MovingObject from './movingObject';
import SETTINGS from './settings';
import Debris from './debris';
import { sample, random, times } from 'lodash';

export default class Asteroid extends MovingObject {

  static setConstants() {
    Asteroid.minimumArea = SETTINGS.asteroids.startingMinimumArea;
    Asteroid.speed = SETTINGS.asteroids.startingSpeed;
    Asteroid.spawnRadius = SETTINGS.asteroids.startingSpawnRadius;
    Asteroid.COLOR = SETTINGS.asteroids.color;
  }

  static randomAsteroid(dimX, dimY, ship, options) {
    // Asteroids in dodgeball have a predefined set of sizes
    const radius = options.dodgeball ? sample([15, 21.2, 30]) : Asteroid.spawnRadius;

    const randomPos = Asteroid.randomPos(dimX, dimY);
    const randomVel = Asteroid.randomVel(dimX, dimY, Asteroid.speed);
    return new Asteroid(randomPos, randomVel, radius, Asteroid.speed, ship);
  }

  // Pick a random position along the edge of the game for the asteroid to
  // spawn at
  static randomPos(dimX, dimY, ship) {
    const radius = Asteroid.spawnRadius;
    const randomX = random(-radius, dimX + radius);
    const randomY = random(-radius, dimY + radius);
    const edgeX = sample([-radius, dimX + radius]);
    const edgeY = sample([-radius, dimY + radius]);
    const candidate1 = [edgeX, randomY];
    const candidate2 = [randomX, edgeY];
    return sample([candidate1, candidate2]);
  }

  // Pick a random direction for the asteroid to begin moving in
  static randomVel(dimX, dimY, intensity) {
    return [dimX, dimY].map( (dim) => {
      const range = (intensity * dim) / 125;
      const direction = sample([-1, 1]);
      return random(1, range) * direction;
    });
  }

  constructor(pos, vel, radius, spawnedSpeed, ship) {
    super(pos, vel, radius, Asteroid.COLOR);
    // Asteroid stores the speed multiplier it spawned at so that when it is destroyed,
    // the new smaller asteroids can use the same speed, and not the class variable
    // speed, which increases over time.
    this.spawnedSpeed = spawnedSpeed;
    this.ship = ship;
  }

  // When an asteroid is hit with a bullet, it either breaks up into two
  // new asteroids, or if it's small enough, it explodes. In this case, it
  // is replaced with Debris objects.
  explode() {
    const pos = this.pos;
    const vels = [];
    const numDebris = SETTINGS.debris.number;
    const angle = 360 / numDebris;

    return times(numDebris + 1, (i) => {
      const degree = angle * i;
      const velocity = [Math.cos(degree), Math.sin(degree)];
      return new Debris(pos.slice(), velocity);
    });
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
    return [vel1, vel2].map((vel) => new Asteroid(pos.slice(), vel, newRadius, spawnedSpeed, this.ship));
  }

  area() {
    return Math.PI * Math.pow(this.radius, 2);
  }

  velocityToPoint(origin, destination) {
    return destination.map((num, index) => (num - origin[index]) / 125);
  }

  move() {
    if (this.ageFrames > 30) {
      this.vel = this.velocityToPoint(this.pos, this.ship.pos);
    }
    super.move();
  }
}
