// @flow

import { sumBy } from 'lodash';
import { map, add, subtract } from './tupleMap';
import type { WithRadius, Distanceable } from '../types/types';

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function direction(degrees: number): [number, number] {
  const radians = toRadians(degrees);
  return [Math.cos(radians), -Math.sin(radians)];
}

// Get the position of a rotateable (ie the turret or the thruster), given the radius, and position
// of the ship, and degrees that the rotateable is pointing in.
export function getRotateablePosition(
  radius: number,
  pos: [number, number],
  degrees: number
): [number, number] {
  const distances = map(direction(degrees), d => d * radius);
  return add(pos, distances);
}

export function distance(obj1: Distanceable, obj2: Distanceable): number {
  const [xDiff, yDiff] = subtract(obj1.pos, obj2.pos);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export function isCollided(obj1: Distanceable, obj2: Distanceable): boolean {
  if (obj1 === obj2) {
    return false;
  }
  return distance(obj1, obj2) < obj1.radius + obj2.radius;
}

function area({ radius }: WithRadius): number {
  return Math.PI * Math.pow(radius, 2);
}

export function sumOfAreas(objects: WithRadius[]) {
  return sumBy(objects, area);
}
