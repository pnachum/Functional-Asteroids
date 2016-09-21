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
  const reducedAsteroids: Asteroid[] = asteroids(state.asteroids, action);
  const reducedBullets: Bullet[] = bullets(state.bullets, action);
  const reducedShip: Ship = ship(state.ship, action);
  const reducedDebris: Debris[] = debris(state.debris, action);
  const score: number = state.score;
  let lives: number = state.lives;
  const defaultNewState: State = {
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
      const collidedBullets: Bullet[] = [];
      const asteroidCollisions: AsteroidCollision[] = [];
      let newShip: Ship = reducedShip;
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
        const didShipCollide: boolean = isCollided(
          { ...reducedShip, radius: shipRadius },
          asteroid
        );
        if (!isShipInvincible(reducedShip, frameCount) && didShipCollide) {
          lives -= 1;
          asteroidCollisions.push({ points: 0, asteroid });
          // Maintain the ship's current direction and reset its spawnFrame
          newShip = {
            ...defaultShip,
            degrees: reducedShip.degrees,
            spawnFrame: frameCount,
          };
        }
      });
      const collidedAsteroids: Asteroid[] = asteroidCollisions.map(ac => ac.asteroid);

      const pointsAwarded: number = sumBy(asteroidCollisions, ac => ac.points * state.multiplier);

      const notHitAsteroids: Asteroid[] = reducedAsteroids.filter(asteroid => (
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
