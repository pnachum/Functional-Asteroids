// @flow

import newPosition from '../utils/newPosition';
import { MOVE, SHOOT } from '../actions';
import { SETTINGS, DODGEBALL } from '../constants';
import {
  getRotateablePosition,
  direction,
} from '../utils/math';
import type { Bullet, Action } from '../types/index';

const defaultState = [];

function bullet(state: Bullet, action: Action): Bullet {
  const {
    radius: bulletRadius,
    speed,
  } = SETTINGS.bullets;
  switch (action.type) {
    case MOVE: {
      const newPos = newPosition({
        ...state,
        radius: bulletRadius,
      });
      return {
        ...state,
        pos: newPos,
        distance: state.distance - speed,
      };
    }
    default:
      return state;
  }
}

export default function bullets(state: Bullet[] = defaultState, action: Action): Bullet[] {
  const {
    bullets: {
      speed,
      distance,
    },
    ship: {
      radius: shipRadius,
    },
  } = SETTINGS;

  switch (action.type) {
    case MOVE:
      return state
        .map(b => bullet(b, action))
        .filter(b => b.distance > 0);
    case SHOOT: {
      if (action.payload == null) {
        return state;
      }
      const {
        ship: {
          pos,
          degrees,
        },
        mode,
      } = action.payload;
      // Disable shooting in DODGEBALL mode
      if (mode === DODGEBALL) {
        return state;
      }
      const turretPos = getRotateablePosition(shipRadius, pos, degrees);
      const newBullet = {
        pos: turretPos,
        vel: direction(degrees).map(d => d * speed),
        distance,
      };
      return [...state, newBullet];
    }
    default:
      return state;
  }
}
