// @flow

import { random, sample, times } from 'lodash';
import { SETTINGS, DIMENSION } from '../constants';
import { makePair } from './tupleMap';
import type { Asteroid } from '../types/types';

type Options = {
  pos?: [number, number],
  radius: number,
  spawnSpeed?: number,
}

// Pick a random position along the edge of the game for the asteroid to
// spawn at
function randomPos(radius, dimension: number): [number, number] {
  const [randomX, randomY] = makePair(() => random(-radius, dimension + radius));
  const [edgeX, edgeY] = makePair(() => sample([-radius, dimension + radius]));
  const candidate1 = [edgeX, randomY];
  const candidate2 = [randomX, edgeY];
  return sample([candidate1, candidate2]);
}

// Pick a random direction for the asteroid to begin moving in
function randomVel(dimension: number, intensity: number): [number, number] {
  return makePair(() => {
    const range = (intensity * dimension) / 125;
    const direction = sample([-1, 1]);
    return random(1, range) * direction;
  });
}

function randomAsteroid(options: Options): Asteroid {
  // Asteroids in dodgeball have a predefined set of sizes
  // const radius = options.dodgeball ? sample([15, 21.2, 30]) : Asteroid.spawnRadius;

  const radius = options.radius;
  const pos = options.pos || randomPos(radius, DIMENSION);
  const spawnSpeed = options.spawnSpeed || SETTINGS.asteroids.startingSpeed;
  const vel = randomVel(DIMENSION, spawnSpeed);

  return {
    pos,
    vel,
    radius,
    spawnSpeed,
  };
}

export default function randomAsteroids(num: number, options: Options): Asteroid[] {
  return times(num, () => randomAsteroid(options));
}
