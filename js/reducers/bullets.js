import movingObject from './movingObject';
import { MOVE, SHOOT } from '../actionCreators';
import { SETTINGS } from '../constants';
import {
  getRotateablePosition,
  direction,
  isCollidedWithAny
} from '../utils/math';

// state is object with { pos, vel, distance }
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

// state is array of objects with { pos, vel, distance }
export default function bullets(state = [], action) {
  const {
    bullets: {
      radius: bulletRadius,
      speed,
      distance,
    },
    ship: {
      radius: shipRadius,
    },
  } = SETTINGS;

  switch (action.type) {
    case MOVE:
      const { asteroids } = action;

      return state
        .map(b => bullet(b, action))
        .filter(b => b.distance > 0)
        // .filter(b => !isCollidedWithAny({...b, radius: bulletRadius} , asteroids));
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
