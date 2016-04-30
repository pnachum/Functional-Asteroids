export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function removeFromArray(array, item) {
  const badIndex = array.indexOf(item);
  if (badIndex >= 0) {
    array.splice(badIndex, 1);
  }
}

export default {
  toRadians,
  removeFromArray,
};
