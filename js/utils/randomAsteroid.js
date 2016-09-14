import { SETTINGS } from '../constants';
import { random, sample } from 'lodash';

export default function randomAsteroid(dimX, dimY) {
  // Asteroids in dodgeball have a predefined set of sizes
  // const radius = options.dodgeball ? sample([15, 21.2, 30]) : Asteroid.spawnRadius;

  const pos = randomPos(dimX, dimY);
  const vel = randomVel(dimX, dimY, SETTINGS.asteroids.startingSpeed);
  const radius = SETTINGS.asteroids.startingSpawnRadius;
  return {
    pos,
    vel,
    radius,
  };
}

// Pick a random position along the edge of the game for the asteroid to
// spawn at
function randomPos(dimX, dimY) {
  const radius = SETTINGS.asteroids.startingSpawnRadius;
  const randomX = random(-radius, dimX + radius);
  const randomY = random(-radius, dimY + radius);
  const edgeX = sample([-radius, dimX + radius]);
  const edgeY = sample([-radius, dimY + radius]);
  const candidate1 = [edgeX, randomY];
  const candidate2 = [randomX, edgeY];
  return sample([candidate1, candidate2]);
}

// Pick a random direction for the asteroid to begin moving in
function randomVel(dimX, dimY, intensity) {
  return [dimX, dimY].map(dim => {
    const range = (intensity * dim) / 125;
    const direction = sample([-1, 1]);
    return random(1, range) * direction;
  });
}
