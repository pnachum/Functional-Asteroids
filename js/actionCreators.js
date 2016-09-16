export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';
export const ADD_RANDOM_ASTEROIDS = 'ADD_RANDOM_ASTEROIDS';
export const THRUST_SHIP = 'THRUST_SHIP';
export const ROTATE_SHIP = 'ROTATE_SHIP';
export const STOP_THRUSTING_SHIP = 'STOP_THRUSTING_SHIP';
export const SHOOT = 'SHOOT';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const NEW_FRAME = 'NEW_FRAME';

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

export function stopThrustingShip() {
  return { type: STOP_THRUSTING_SHIP };
}

export function shoot(ship) {
  return { type: SHOOT, ship };
}

export function togglePause() {
  return { type: TOGGLE_PAUSE };
}

export function newFrame(frameCount) {
  return { type: NEW_FRAME, frameCount };
}
