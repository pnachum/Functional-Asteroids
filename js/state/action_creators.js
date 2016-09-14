export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';
export const ADD_RANDOM_ASTEROIDS = 'ADD_RANDOM_ASTEROIDS';
export const THRUST_SHIP = 'THRUST_SHIP';
export const ROTATE_SHIP = 'ROTATE_SHIP';

export function move() {
  return { type: MOVE };
}

export function addAsteroid(asteroid) {
  return { type: ADD_ASTEROID, asteroid };
}

export function addRandomAsteroids(numAsteroids) {
  return { type: ADD_RANDOM_ASTEROIDS, numAsteroids };
}

export function thrustShip() {
  return { type: THRUST_SHIP };
}

export function rotateShip(direction) {
  return { type: ROTATE_SHIP, direction };
}
