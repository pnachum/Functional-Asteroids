import { random, sample, times } from 'lodash';
import { SETTINGS, DIMENSION } from '../constants';

// Pick a random position along the edge of the game for the asteroid to
// spawn at
function randomPos(dimension) {
  const radius = SETTINGS.asteroids.startingSpawnRadius;
  const [randomX, randomY] = times(2, () => random(-radius, dimension + radius));
  const [edgeX, edgeY] = times(2, () => sample([-radius, dimension + radius]));
  const candidate1 = [edgeX, randomY];
  const candidate2 = [randomX, edgeY];
  return sample([candidate1, candidate2]);
}

// Pick a random direction for the asteroid to begin moving in
function randomVel(dimension, intensity) {
  return times(2, () => {
    const range = (intensity * dimension) / 125;
    const direction = sample([-1, 1]);
    return random(1, range) * direction;
  });
}

function randomAsteroid(options) {
  // Asteroids in dodgeball have a predefined set of sizes
  // const radius = options.dodgeball ? sample([15, 21.2, 30]) : Asteroid.spawnRadius;

  const pos = options.pos || randomPos(DIMENSION);
  const vel = randomVel(DIMENSION, SETTINGS.asteroids.startingSpeed);
  const radius = options.radius || SETTINGS.asteroids.startingSpawnRadius;
  return {
    pos,
    vel,
    radius,
  };
}

export default function randomAsteroids(num, options = {}) {
  return times(num, () => randomAsteroid(options));
}
