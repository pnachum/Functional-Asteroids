// @flow

export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';
export const ADD_RANDOM_ASTEROIDS = 'ADD_RANDOM_ASTEROIDS';
export const THRUST_SHIP = 'THRUST_SHIP';
export const ROTATE_SHIP = 'ROTATE_SHIP';
export const STOP_THRUSTING_SHIP = 'STOP_THRUSTING_SHIP';
export const SHOOT = 'SHOOT';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const NEW_FRAME = 'NEW_FRAME';

type SimpleAction = { type: string };
type Asteroid = { pos: [number, number], radius: number, vel: [number, number] };
type Ship = {
  pos: [number, number],
  vel: [number, number],
  degrees: number,
  isTruthsting: boolean
};

export function move(): SimpleAction {
  return { type: MOVE };
}

export function addAsteroid(asteroid: Asteroid): { type: string, asteroid: Asteroid} {
  return { type: ADD_ASTEROID, asteroid };
}

export function addRandomAsteroids(numAsteroids: number): { type: string, numAsteroids: number } {
  return { type: ADD_RANDOM_ASTEROIDS, numAsteroids };
}

export function thrustShip(): SimpleAction {
  return { type: THRUST_SHIP };
}

export function rotateShip(direction: number): { type: string, direction: number } {
  return { type: ROTATE_SHIP, direction };
}

export function stopThrustingShip(): SimpleAction {
  return { type: STOP_THRUSTING_SHIP };
}

export function shoot(ship: Ship): { type: string, ship: Ship } {
  return { type: SHOOT, ship };
}

export function togglePause(): SimpleAction {
  return { type: TOGGLE_PAUSE };
}

export function newFrame(frameCount: number): { type: string, frameCount: number } {
  return { type: NEW_FRAME, frameCount };
}
