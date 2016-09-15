import { DIMENSION } from '../constants';

// Given the position and radius of an object, and the dimension of the screen, map the object
// to the screeen so that it wraps around the edge of screen.
function mapToScreen(pos, radius, dimension) {
  return pos.map(d => {
    if (d >= dimension + radius) {
      return d - (dimension + (2 * radius));
    } else if (d <= 0 - radius) {
      return d + (dimension + (2 * radius));
    }
    return d;
  });
}

export default function newPosition({ pos, vel, radius }, modifer) {
  let newPos = pos.map((d, i) => d + vel[i]);
  if (modifer) {
    newPos = modifer(newPos);
  }
  return mapToScreen(newPos, radius, DIMENSION);
}
