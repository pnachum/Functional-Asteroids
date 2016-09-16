import ship from './ship';
import bullets from './bullets';
import asteroids from './asteroids';
import { MOVE } from '../actionCreators';
import { isCollided } from '../utils/math';
import randomAsteroids from '../utils/randomAsteroids';
import { SETTINGS } from '../constants';

// This reducer allows for state changes which rely on interactions between various moving objects,
// specifically to handle collisions.
export default function movingObjects(state = {}, action) {
  // TODO: This seems pretty messy
  const reducedAsteroids = asteroids(state.asteroids, action);
  const reducedBullets = bullets(state.bullets, action);
  const reducedShip = ship(state.ship, action);

  switch (action.type) {
    case MOVE:
      const collidedBullets = [];
      const collidedAsteroids = [];
      reducedAsteroids.forEach((asteroid) => {
        reducedBullets.forEach((bullet) => {
          if (isCollided(bullet, asteroid)) {
            collidedBullets.push(bullet);
            collidedAsteroids.push(asteroid);
          }
        });
      });

      const notHitAsteroids = reducedAsteroids.filter(asteroid => !collidedAsteroids.includes(asteroid));
      const subAsteroids = collidedAsteroids
        .reduce((prev, current) => {
          return prev.concat(randomAsteroids(2, {
            radius: current.radius * (1 / Math.sqrt(2)),
            pos: current.pos,
          }));
        }, [])
        .filter(asteroid => asteroid.radius > SETTINGS.asteroids.minimumRadius);

      const newAsteroids = notHitAsteroids.concat(subAsteroids);

      return {
        ship: reducedShip,
        bullets: reducedBullets.filter(bullet => !collidedBullets.includes(bullet)),
        asteroids: newAsteroids,
      };
    default:
      return {
        asteroids: reducedAsteroids,
        bullets: reducedBullets,
        ship: reducedShip,
      };
  }
}
