// @flow

import { direction } from './math';

// Computes the new velocity of the ship when it accelerates
export default function computeNewVel(
  oldVel: [number, number],
  degree: number,
  accel: number,
  maxSpeed: number
): [number, number] {
  const impulse: [number, number] = direction(degree).map(d => d * accel);
  const newVel: [number, number] = oldVel.map((d, i) => d + impulse[i]);
  // Enforce that the ship's speed does not exceed MAXSPEED
  const minVel: [number, number] = newVel.map(d => Math.min(maxSpeed, Math.abs(d)));
  return newVel.map((d, i) => (d >= 0 ? minVel[i] : -minVel[i]));
}
