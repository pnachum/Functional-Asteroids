import movingObject from './movingObject';
import { MOVE, SHOOT } from '../actionCreators';
import { SETTINGS } from '../constants';
import { getRotateablePosition, direction } from '../utils/math';

export default function bullets(state = [], action) {
  const {
    bullets: {
      radius: bulletRadius,
      speed,
      distance,
    },
    ship: {
      radius: shipRadius,
    }
  } = SETTINGS;


  switch (action.type) {
    case MOVE:
      return state.map(bullet => {
        const moved = movingObject({
          ...bullet,
          radius: bulletRadius,
        }, action);
        return {...moved, distance: moved.distance - speed };
      }).filter(bullet => bullet.distance > 0);
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
