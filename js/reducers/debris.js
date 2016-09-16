import { MOVE } from '../actionCreators';
import movingObject from './movingObject';
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
      const moved = movingObject({
        ...state,
        radius,
      }, action);
      return {...moved, distance: moved.distance - speed };
    default:
      return state;
  }
}

export default function debris(state = [], action) {
  switch (action.type) {
    case MOVE:
    return state
      .map(debris => oneDebris(debris, action))
      .filter(debris => debris.distance > 0)
    default:
      return state;
  }
}
