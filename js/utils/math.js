export function direction(degrees) {
  const radians = toRadians(degrees);
  return [Math.cos(radians), -Math.sin(radians)];
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
