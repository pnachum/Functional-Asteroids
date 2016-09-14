import { DIMENSION } from '../constants';

// Given the position and radius of an object, and the dimension of the screen, map the object
// to the screeen so that it wraps around the edge of screen.
export default function mapToScreen(pos, radius, dimension = DIMENSION) {
  return pos.map(d => {
    if (d >= dimension + radius) {
      return d - (dimension + 2 * radius);
    } else if (d <= 0 - radius) {
      return d + (dimension + 2 * radius);
    } else {
      return d;
    }
  });
}
