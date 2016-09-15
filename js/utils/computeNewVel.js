import { direction } from './math';

// Computes the new velocity of the ship when it accelerates
export default function computeNewVel(oldVel, degree, accel, maxSpeed) {
  const impulse = direction(degree).map(d => d * accel);
  const newVel = oldVel.map((d, i) => d + impulse[i]);
  // Enforce that the ship's speed does not exceed MAXSPEED
  const minVel = newVel.map(d => Math.min(maxSpeed, Math.abs(d)));
  return newVel.map((d, i) => (d >= 0 ? minVel[i] : -minVel[i]));
}
