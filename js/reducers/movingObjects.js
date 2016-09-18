// @flow

import { times } from 'lodash';
import ship from './ship';
import bullets from './bullets';
import asteroids from './asteroids';
import debris from './debris';
import { MOVE } from '../actionCreators';
import { isCollided, direction, sumOfAreas } from '../utils/math';
import randomAsteroids from '../utils/randomAsteroids';
import { SETTINGS } from '../constants';
import type { Ship, Asteroid, Bullet, Debris, WithRadius } from '../types/index';

type State = {
  asteroids: Asteroid[],
  bullets: Bullet[],
  ship: Ship,
  debris: Debris[],
  score: number,
};

const defaultState = {
  asteroids: [],
  bullets: [],
  ship: SETTINGS.ship.defaultShip,
  debris: [],
  score: 0,
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

  // TODO: This seems pretty messy
  const reducedAsteroids = asteroids(state.asteroids, action);
  const reducedBullets = bullets(state.bullets, action);
  const reducedShip = ship(state.ship, action);
  const reducedDebris = debris(state.debris, action);
  let newScore = state.score || 0;
  switch (action.type) {
    case MOVE:
      const collidedBullets = [];
      const collidedAsteroids = [];
      let newShip = reducedShip;
      reducedAsteroids.forEach((asteroid) => {
        reducedBullets.forEach((bullet) => {
          if (isCollided({ ...bullet, radius: bulletRadius }, asteroid)) {
            collidedBullets.push(bullet);
            collidedAsteroids.push(asteroid);
          }
        });

        if (isCollided({ ...reducedShip, radius: shipRadius }, asteroid)) {
          collidedAsteroids.push(asteroid);
          // Maintain the ship's current direction
          newShip = { ...defaultShip, degrees: reducedShip.degrees };
        }
      });

      const notHitAsteroids = reducedAsteroids.filter(asteroid => (
        !collidedAsteroids.includes(asteroid)
      ));
      const subAsteroids = collidedAsteroids.reduce((prev, current) => (
        prev.concat(randomAsteroids(2, {
          radius: current.radius / Math.sqrt(2),
          pos: current.pos,
        }))
      ), []).filter(asteroid => asteroid.radius > minimumRadius);

      const destroyedAsteroids = collidedAsteroids.filter(asteroid => (
        asteroid.radius / Math.sqrt(2) < minimumRadius
      ));
      newScore += (destroyedAsteroids.length * pointsForDestroy);
      newScore += ((subAsteroids.length / 2) * pointsForBreak);

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
        score: newScore,
      };
    default:
      return {
        asteroids: reducedAsteroids,
        bullets: reducedBullets,
        ship: reducedShip,
        debris: reducedDebris,
        score: newScore,
      };
  }
}

function getRadius(obj: WithRadius): number {
  return obj.radius;
}

function getAsteroidRadius(asteroid: Asteroid): number {
  return getRadius(asteroid);
}

const ast = { radius: 10, pos: [10, 10], vel: [0, 0] };
console.log(getAsteroidRadius(ast));
