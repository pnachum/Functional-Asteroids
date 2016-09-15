import movingObject from './movingObject';
import randomAsteroids from '../utils/randomAsteroids';
import { DIMENSION, SETTINGS } from '../constants';
import { MOVE, ADD_RANDOM_ASTEROIDS } from '../actionCreators';
import { isCollidedWithAny } from '../utils/math';
import separateItems from '../utils/separateItems';

// state is array of objects with { pos, vel, radius }
export default function asteroids(state = [], action) {
  const {
    bullets: {
      radius: bulletRadius,
    },
    asteroids: {
      minimumRadius,
    },
  } = SETTINGS;
  switch (action.type) {
    case MOVE:
      const { bullets, ship } = action;
      const moved = state.map(asteroid => movingObject(asteroid, action));
      const bulletsWithRadius = bullets.map(bullet => ({...bullet, radius: bulletRadius }));

      const [hitAsteroids, notHitAsteroids] = separateItems(moved, asteroid => {
        return isCollidedWithAny(asteroid, bulletsWithRadius);
      });
      const subAsteroids = hitAsteroids
        .reduce((prev, current) => {
          return prev.concat(randomAsteroids(2, {
            radius: current.radius * (1 / Math.sqrt(2)),
            pos: current.pos,
          }));
        }, [])
        .filter(asteroid => asteroid.radius > minimumRadius);

      return notHitAsteroids.concat(subAsteroids);
    case ADD_RANDOM_ASTEROIDS:
      const newAsteroids = randomAsteroids(action.numAsteroids);
      return state.concat(newAsteroids);
    default:
      return state;
  }
}
