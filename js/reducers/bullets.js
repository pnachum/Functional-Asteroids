// @flow

import newPosition from '../utils/newPosition';
import { MOVE, SHOOT } from '../actionCreators';
import { SETTINGS } from '../constants';
import {
  getRotateablePosition,
  direction,
} from '../utils/math';
import type { Bullet } from '../types/index';

function bullet(state: Bullet, action: Object): Bullet {
  const {
    radius: bulletRadius,
    speed,
  } = SETTINGS.bullets;
  switch (action.type) {
    case MOVE:
      const newPos = newPosition({
        ...state,
        radius: bulletRadius,
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

export default function bullets(state: Bullet[] = [], action: Object): Bullet[] {
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
    case SHOOT:
      const { pos, degrees } = action.ship;
      const turretPos = getRotateablePosition(shipRadius, pos, degrees);
      const newBullet = {
        pos: turretPos,
        vel: direction(degrees).map(d => d * speed),
        distance,
      };
      return [...state, newBullet];
    default:
      return state;
  }
}
