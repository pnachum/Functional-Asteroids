// @flow

import { DIMENSION } from '../constants';
import { map, add } from './tupleMap';
import type { Moveable } from '../types/types';

// Given the position and radius of an object, and the dimension of the screen, map the object
// to the screeen so that it wraps around the edge of screen.
function mapToScreen(
  pos: [number, number],
  radius: number,
  dimension: number = DIMENSION
): [number, number] {
  return map(pos, (d) => {
    if (d >= dimension + radius) {
      return d - (dimension + (2 * radius));
    } else if (d <= 0 - radius) {
      return d + (dimension + (2 * radius));
    }
    return d;
  });
}

export default function newPosition({ vel, radius, pos }: Moveable): [number, number] {
  const newPos = add(pos, vel);
  return mapToScreen(newPos, radius);
}
