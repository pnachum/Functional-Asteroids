export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';

export function move() {
  return { type: MOVE };
}

export function addAsteroid(asteroid) {
  return { type: ADD_ASTEROID, asteroid };
}
