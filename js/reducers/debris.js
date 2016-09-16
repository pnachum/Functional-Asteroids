import { MOVE } from '../actionCreators';
import newPosition from '../utils/newPosition';
import { SETTINGS } from '../constants';

// TODO: These reducers are nearly identical to the bullet reducers. Share the code

function oneDebris(state, action) {
  const {
    debris: {
      radius,
      speed,
    },
  } = SETTINGS;
  switch (action.type) {
    case MOVE:
      const newPos = newPosition({
        ...state,
        radius,
      });
      return {
        ...state,
        pos: newPos,
        distance: state.distance - speed,
      };
    default:
      return state;
  }
}

export default function debris(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state
        .map(deb => oneDebris(deb, action))
        .filter(deb => deb.distance > 0);
    default:
      return state;
  }
}
