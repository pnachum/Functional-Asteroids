// @flow

import { times, sumBy } from 'lodash';
import ship from './ship';
import bullets from './bullets';
import asteroids from './asteroids';
import debris from './debris';
import { MOVE, SET_MODE } from '../actions';
import { isCollided, direction, sumOfAreas } from '../utils/math';
import randomAsteroids from '../utils/randomAsteroids';
import { SETTINGS, DEFAULT_MODE } from '../constants';
import type { Ship, Asteroid, Bullet, Debris, WithRadius, Action } from '../types/index';

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
  multiplier: number,
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
  lives: SETTINGS.startingLives[DEFAULT_MODE],
  multiplier: 1,
};

// This reducer allows for state changes which rely on interactions between various moving objects,
// specifically to handle collisions.
export default function movingObjects(state: State = defaultState, action: Action): State {
  const {
    asteroids: {
      minimumRadius,
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
  const defaultNewState = {
    asteroids: reducedAsteroids,
    bullets: reducedBullets,
    ship: reducedShip,
    debris: reducedDebris,
    score: state.score,
    lives: state.lives,
    multiplier: state.multiplier,
  };
  switch (action.type) {
    case MOVE: {
      if (action.payload == null) {
        return state;
      }
      const {
        asteroidSpawnRadius,
        minimumAsteroidArea,
        asteroidSpeed,
      } = action.payload;
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
          lives -= 1;
          asteroidCollisions.push({ points: 0, asteroid });
          // Maintain the ship's current direction
          newShip = { ...defaultShip, degrees: reducedShip.degrees };
        }
      });
      const collidedAsteroids = asteroidCollisions.map(info => info.asteroid);

      const pointsAwarded = sumBy(asteroidCollisions, ac => ac.points * state.multiplier);

      const notHitAsteroids = reducedAsteroids.filter(asteroid => (
        !collidedAsteroids.includes(asteroid)
      ));
      const subAsteroids = collidedAsteroids.reduce((prev, current) => (
        prev.concat(randomAsteroids(2, {
          radius: current.radius / Math.sqrt(2),
          pos: current.pos,
          // Split asteroids maintain the same speed as their parent
          spawnSpeed: current.spawnSpeed,
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
      const withRadii: WithRadius[] = newAsteroids.map(asteroid => (asteroid: WithRadius));
      const additionalAsteroids = sumOfAreas(withRadii) < minimumAsteroidArea
        ? randomAsteroids(1, { radius: asteroidSpawnRadius, spawnSpeed: asteroidSpeed })
        : [];

      return {
        ship: newShip,
        bullets: reducedBullets.filter(bullet => !collidedBullets.includes(bullet)),
        asteroids: newAsteroids.concat(additionalAsteroids),
        debris: reducedDebris.concat(newDebris),
        score: score + pointsAwarded,
        multiplier: state.multiplier,
        lives,
      };
    }
    case SET_MODE:
      if (action.payload == null) {
        return state;
      }
      return { ...defaultNewState, lives: SETTINGS.startingLives[action.payload] };
    default:
      return defaultNewState;
  }
}
