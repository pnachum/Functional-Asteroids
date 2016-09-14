export function direction(degrees) {
  const radians = toRadians(degrees);
  return [Math.cos(radians), -Math.sin(radians)];
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Get the position of a rotateable (ie the turret or the thruster), given the radius, and position
// of the ship, and degrees that the rotateable is pointing in.
export function getRotateablePosition(radius, pos, degrees) {
  const distances = direction(degrees).map(d => d * radius);
  return pos.map((d, i) => d + distances[i]);
}
