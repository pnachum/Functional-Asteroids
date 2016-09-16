import { sumBy } from 'lodash';

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function direction(degrees) {
  const radians = toRadians(degrees);
  return [Math.cos(radians), -Math.sin(radians)];
}

// Get the position of a rotateable (ie the turret or the thruster), given the radius, and position
// of the ship, and degrees that the rotateable is pointing in.
export function getRotateablePosition(radius, pos, degrees) {
  const distances = direction(degrees).map(d => d * radius);
  return pos.map((d, i) => d + distances[i]);
}

export function distance(obj1, obj2) {
  const [xDiff, yDiff] = obj1.pos.map((d, i) => d - obj2.pos[i]);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export function isCollided(obj1, obj2) {
  if (obj1 === obj2) {
    return false;
  } else {
    return distance(obj1, obj2) < obj1.radius + obj2.radius;
  }
}

function area({ radius }) {
  return Math.PI * Math.pow(radius, 2);
}

export function sumOfAreas(objects) {
  return sumBy(objects, area);
}
