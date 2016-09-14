export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';
export const ADD_RANDOM_ASTEROIDS = 'ADD_RANDOM_ASTEROIDS';

export function move() {
  return { type: MOVE };
}

export function addAsteroid(asteroid) {
  return { type: ADD_ASTEROID, asteroid };
}

export function addRandomAsteroids(numAsteroids) {
  return { type: ADD_RANDOM_ASTEROIDS, numAsteroids };
}
