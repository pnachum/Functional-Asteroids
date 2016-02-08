const Helpers = {
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  },

  removeFromArray(array, item) {
    const badIndex = array.indexOf(item);
    if (badIndex >= 0) {
      array.splice(badIndex, 1);
    }
  }
};

module.exports = Helpers;
