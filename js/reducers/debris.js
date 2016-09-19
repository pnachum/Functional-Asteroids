// @flow

import { MOVE } from '../actionCreators';
import newPosition from '../utils/newPosition';
import { SETTINGS } from '../constants';
import type { Debris } from '../types/index';

// TODO: These reducers are nearly identical to the bullet reducers. Share the code

const defaultState = [];

function oneDebris(state: Debris, action: Object): Debris {
  const {
    debris: {
      number,
      speed,
    },
    asteroids: {
      minimumRadius,
    },
  } = SETTINGS;
  switch (action.type) {
    case MOVE:
      const newPos = newPosition({
        ...state,
        radius: minimumRadius / number,
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

export default function debris(state: Debris[] = defaultState, action: Object): Debris[] {
  switch (action.type) {
    case MOVE:
      return state
        .map(deb => oneDebris(deb, action))
        .filter(deb => deb.distance > 0);
    default:
      return state;
  }
}
