// @flow

import { times, sumBy } from 'lodash';
import ship from './ship';
import bullets from './bullets';
import asteroids from './asteroids';
import debris from './debris';
import { MOVE } from '../actionCreators';
import { isCollided, direction, sumOfAreas } from '../utils/math';
import randomAsteroids from '../utils/randomAsteroids';
import { SETTINGS } from '../constants';
import type { Ship, Asteroid, Bullet, Debris, WithRadius } from '../types/index';

function smallerRadius(distance: number): (obj: WithRadius) => boolean {
  return ({ radius }) => radius < distance;
}

type State = {
  asteroids: Asteroid[],
  bullets: Bullet[],
  ship: Ship,
  debris: Debris[],
  score: number,
  lives: number,
};

type AsteroidCollision = {
  asteroid: Asteroid,
  points: number,
};

const defaultState = {
  asteroids: [],
  bullets: [],
  ship: SETTINGS.ship.defaultShip,
  debris: [],
  score: 0,
  lives: SETTINGS.startingLives,
};

// This reducer allows for state changes which rely on interactions between various moving objects,
// specifically to handle collisions.
export default function movingObjects(state: State = defaultState, action: Object): State {
  const {
    asteroids: {
      minimumRadius,
      startingMinimumArea,
    },
    debris: {
      number: numDebris,
      distance: debrisDistance,
    },
    ship: {
      radius: shipRadius,
      defaultShip,
    },
    bullets: {
      radius: bulletRadius,
    },
    pointsForBreak,
    pointsForDestroy,
  } = SETTINGS;
  const shouldBeDestroyed = smallerRadius(minimumRadius * Math.sqrt(2));

  // TODO: This seems pretty messy
  const reducedAsteroids = asteroids(state.asteroids, action);
  const reducedBullets = bullets(state.bullets, action);
  const reducedShip = ship(state.ship, action);
  const reducedDebris = debris(state.debris, action);
  const score = state.score;
  let lives = state.lives;
  switch (action.type) {
    case MOVE:
      const collidedBullets: Bullet[] = [];
      const asteroidCollisions: AsteroidCollision[] = [];
      let newShip = reducedShip;
      reducedAsteroids.forEach((asteroid) => {
        reducedBullets.forEach((bullet) => {
          if (isCollided({ ...bullet, radius: bulletRadius }, asteroid)) {
            collidedBullets.push(bullet);
            asteroidCollisions.push({
              points: shouldBeDestroyed(asteroid) ? pointsForDestroy : pointsForBreak,
              asteroid,
            });
          }
        });

        if (isCollided({ ...reducedShip, radius: shipRadius }, asteroid)) {
          lives--;
          asteroidCollisions.push({ points: 0, asteroid });
          // Maintain the ship's current direction
          newShip = { ...defaultShip, degrees: reducedShip.degrees };
        }
      });
      const collidedAsteroids = asteroidCollisions.map(info => info.asteroid);

      const pointsAwarded = sumBy(asteroidCollisions, ac => ac.points);

      const notHitAsteroids = reducedAsteroids.filter(asteroid => (
        !collidedAsteroids.includes(asteroid)
      ));
      const subAsteroids = collidedAsteroids.reduce((prev, current) => (
        prev.concat(randomAsteroids(2, {
          radius: current.radius / Math.sqrt(2),
          pos: current.pos,
        }))
      ), []).filter(asteroid => asteroid.radius > minimumRadius);

      const destroyedAsteroids = collidedAsteroids.filter(shouldBeDestroyed);
      const angle = 360 / numDebris;
      const newDebris = destroyedAsteroids.reduce((prev, current) => {
        const debrisForAsteroid = times(numDebris, index => ({
          pos: current.pos,
          vel: direction(angle * index),
          distance: debrisDistance,
        }));
        return prev.concat(debrisForAsteroid);
      }, []);

      const newAsteroids = notHitAsteroids.concat(subAsteroids);
      // Flow can't cast Asteroid[] to WithRadius[], so map over the array to do it explicitly
      const withRadii: WithRadius[] = newAsteroids.map(ast => (ast: WithRadius));
      const area = sumOfAreas(withRadii);
      const additionalAsteroids = area < startingMinimumArea ? randomAsteroids(1) : [];

      return {
        ship: newShip,
        bullets: reducedBullets.filter(bullet => !collidedBullets.includes(bullet)),
        asteroids: newAsteroids.concat(additionalAsteroids),
        debris: reducedDebris.concat(newDebris),
        score: score + pointsAwarded,
        lives,
      };
    default:
      return {
        asteroids: reducedAsteroids,
        bullets: reducedBullets,
        ship: reducedShip,
        debris: reducedDebris,
        score,
        lives,
      };
  }
}
