export function direction(degrees) {
  const radians = toRadians(degrees);
  return [Math.cos(radians), -Math.sin(radians)];
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Get the position of the turret given the radius, position, and degrees of the ship
export function getTurretPosition(radius, pos, degrees) {
  const distances = direction(degrees).map(d => d * radius);
  return pos.map((d, i) => d + distances[i]);
}
