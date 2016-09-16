import { DIMENSION } from '../constants';

// Given the position and radius of an object, and the dimension of the screen, map the object
// to the screeen so that it wraps around the edge of screen.
function mapToScreen(pos, radius, dimension = DIMENSION) {
  return pos.map((d) => {
    if (d >= dimension + radius) {
      return d - (dimension + (2 * radius));
    } else if (d <= 0 - radius) {
      return d + (dimension + (2 * radius));
    }
    return d;
  });
}

// state must have a vel, a radius, and a pos
export default function newPosition({ vel, radius, pos }) {
  const newPos = pos.map((d, i) => d + vel[i]);
  return mapToScreen(newPos, radius);
}
