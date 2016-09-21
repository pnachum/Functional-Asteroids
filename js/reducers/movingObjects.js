// @flow

import { times, sumBy, pick } from 'lodash';
import { combineReducers } from 'redux';
import ship from './ship';
import bullets from './bullets';
import asteroids from './asteroids';
import debris from './debris';
import { MOVE, SET_MODE } from '../actions';
import { isCollided, direction, sumOfAreas } from '../utils/math';
import randomAsteroids from '../utils/randomAsteroids';
import { SETTINGS, DEFAULT_MODE } from '../constants';
import isShipInvincible from '../utils/isShipInvincible';
import type {
  Ship,
  Asteroid,
  Bullet,
  Debris,
  WithRadius,
  Action,
  DifficultyState,
} from '../types/index';

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

const defaultState: State = {
  asteroids: [],
  bullets: [],
  ship: SETTINGS.ship.defaultShip,
  debris: [],
  score: 0,
  lives: SETTINGS.startingLives[DEFAULT_MODE],
  multiplier: 1,
};

const subReducer = combineReducers({
  asteroids,
  bullets,
  debris,
  ship,
});

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
  const subState = subReducer(pick(state, [
    'asteroids',
    'ship',
    'bullets',
    'debris',
  ]), action);
  const defaultNewState: State = {
    ...state,
    ...subState,
  };
  switch (action.type) {
    case MOVE: {
      if (action.payload == null) {
        return state;
      }
      const {
        difficulty: {
          asteroidSpawnRadius,
          minimumAsteroidArea,
          asteroidSpeed,
        },
        frameCount,
      }: {
        difficulty: DifficultyState,
        frameCount: number,
      } = action.payload;
      let livesDiff = 0;
      const collidedBullets: Bullet[] = [];
      const asteroidCollisions: AsteroidCollision[] = [];
      let newShip: Ship = subState.ship;
      subState.asteroids.forEach((asteroid) => {
        subState.bullets.forEach((bullet) => {
          if (isCollided({ ...bullet, radius: bulletRadius }, asteroid)) {
            collidedBullets.push(bullet);
            asteroidCollisions.push({
              points: shouldBeDestroyed(asteroid) ? pointsForDestroy : pointsForBreak,
              asteroid,
            });
          }
        });
        const didShipCollide: boolean = isCollided(
          { ...subState.ship, radius: shipRadius },
          asteroid
        );
        if (!isShipInvincible(subState.ship, frameCount) && didShipCollide) {
          livesDiff -= 1;
          asteroidCollisions.push({ points: 0, asteroid });
          // Maintain the ship's current direction and reset its spawnFrame
          newShip = {
            ...defaultShip,
            degrees: subState.ship.degrees,
            spawnFrame: frameCount,
          };
        }
      });
      const collidedAsteroids: Asteroid[] = asteroidCollisions.map(ac => ac.asteroid);

      const pointsAwarded: number = sumBy(asteroidCollisions, ac => ac.points * state.multiplier);

      const notHitAsteroids: Asteroid[] = subState.asteroids.filter(asteroid => (
        !collidedAsteroids.includes(asteroid)
      ));
      const subAsteroids: Asteroid[] = collidedAsteroids.reduce((prev, current) => (
        prev.concat(randomAsteroids(2, {
          radius: current.radius / Math.sqrt(2),
          pos: current.pos,
          // Split asteroids maintain the same speed as their parent
          spawnSpeed: current.spawnSpeed,
        }))
      ), []).filter(asteroid => asteroid.radius > minimumRadius);

      const destroyedAsteroids: Asteroid[] = collidedAsteroids.filter(shouldBeDestroyed);
      const angle: number = 360 / numDebris;
      const newDebris: Debris[] = destroyedAsteroids.reduce((prev, current) => {
        const debrisForAsteroid: Debris[] = times(numDebris, index => ({
          pos: current.pos,
          vel: direction(angle * index),
          distance: debrisDistance,
        }));
        return prev.concat(debrisForAsteroid);
      }, []);

      const newAsteroids: Asteroid[] = notHitAsteroids.concat(subAsteroids);
      // Flow can't cast Asteroid[] to WithRadius[], so map over the array to do it explicitly
      const withRadii: WithRadius[] = newAsteroids.map(asteroid => (asteroid: WithRadius));
      const additionalAsteroids: Asteroid[] = sumOfAreas(withRadii) < minimumAsteroidArea
        ? randomAsteroids(1, { radius: asteroidSpawnRadius, spawnSpeed: asteroidSpeed })
        : [];

      return {
        ship: newShip,
        bullets: subState.bullets.filter(bullet => !collidedBullets.includes(bullet)),
        asteroids: newAsteroids.concat(additionalAsteroids),
        debris: subState.debris.concat(newDebris),
        score: state.score + pointsAwarded,
        multiplier: state.multiplier,
        lives: state.lives + livesDiff,
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
