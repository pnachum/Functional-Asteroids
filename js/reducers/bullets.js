import movingObject from './movingObject';
import { MOVE, SHOOT } from '../actionCreators';
import { SETTINGS } from '../constants';
import { getRotateablePosition, direction } from '../utils/math';

function bullet(state, action) {
  const {
    radius: bulletRadius,
    speed,
  } = SETTINGS.bullets;
  switch (action.type) {
    case MOVE:
      const moved = movingObject({
        ...state,
        radius: bulletRadius,
      }, action);
      return {...moved, distance: moved.distance - speed };
    default:
      return state;
  }
}

export default function bullets(state = [], action) {
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
        vel: direction(degrees).map((d) => d * speed),
        distance,
      };
      return [...state, newBullet];
    default:
      return state;
  }
}
