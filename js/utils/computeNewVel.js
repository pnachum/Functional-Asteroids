// @flow

import { direction } from './math';
import { map, mapPair, add } from './tupleMap';

// Computes the new velocity of the ship when it accelerates
export default function computeNewVel(
  oldVel: [number, number],
  degree: number,
  accel: number,
  maxSpeed: number
): [number, number] {
  const impulse = map(direction(degree), d => d * accel);
  const newVel = add(oldVel, impulse);
  // Enforce that the ship's speed does not exceed MAXSPEED
  const minVel = map(newVel, d => Math.min(maxSpeed, Math.abs(d)));
  return mapPair(newVel, minVel, (n, m) => n >= 0 ? m : -m);
}
