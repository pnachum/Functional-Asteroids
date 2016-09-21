import { times, sumBy } from 'lodash';
import { SETTINGS } from '../constants';
import randomAsteroids from './randomAsteroids';
import { direction, sumOfAreas, isCollided } from './math';
import isShipInvincible from './isShipInvincible';
import type {
  Asteroid,
  Debris,
  WithRadius,
  DifficultyState,
  Ship,
  Bullet,
} from '../types/index';

type AsteroidCollision = {
  asteroid: Asteroid,
  points: number,
};

// Returns the debris objects resulting from the destroyed asteroids
export function debrisForDestroyedAsteroids(destroyedAsteroids: Asteroid[]): Debris[] {
  const {
    debris: {
      number: numDebris,
      distance: debrisDistance,
    },
  } = SETTINGS;
  const angle: number = 360 / numDebris;
  return destroyedAsteroids.reduce((prev, current) => {
    const debrisForAsteroid: Debris[] = times(numDebris, index => ({
      pos: current.pos,
      vel: direction(angle * index),
      distance: debrisDistance,
    }));
    return prev.concat(debrisForAsteroid);
  }, []);
}

// Return the new small asteroids resulting from the asteroids that have been collided with
export function subASteroidsForCollidedAsteroids(collidedAsteroids: Asteroid[]): Asteroid[] {
  const { minimumRadius } = SETTINGS.asteroids;

  return collidedAsteroids.reduce((prev, current) => (
    prev.concat(randomAsteroids(2, {
      radius: current.radius / Math.sqrt(2),
      pos: current.pos,
      // Split asteroids maintain the same speed as their parent
      spawnSpeed: current.spawnSpeed,
    }))
  ), []).filter(asteroid => asteroid.radius > minimumRadius);
}

// Return the asteroids needed in addition to the current ones to meet the minimum area requirement
export function additionalAsteroidsForCurrentAsteroids(
  currentAsteroids: Asteroid[],
  { asteroidSpawnRadius, asteroidSpeed, minimumAsteroidArea }: DifficultyState,
): Asteroid[] {
  // Flow can't cast Asteroid[] to WithRadius[], so map over the array to do it explicitly
  const withRadii: WithRadius[] = currentAsteroids.map(asteroid => (asteroid: WithRadius));
  return sumOfAreas(withRadii) < minimumAsteroidArea
    ? randomAsteroids(1, { radius: asteroidSpawnRadius, spawnSpeed: asteroidSpeed })
    : [];
}

export function handleCollisions({
  ship,
  asteroids,
  bullets,
  frameCount,
  pointsForCollision,
} : {
  ship: Ship,
  asteroids: Asteroid[],
  bullets: Bullet[],
  frameCount: number,
  pointsForCollision: (asteroid: Asteroid) => number,
}): {
  livesDiff: number,
  notCollidedBullets: Bullet[],
  collidedAsteroids: Asteroid[],
  notCollidedAsteroids: Asteroid[],
  pointsAwarded: number,
  newShip: Ship,
} {
  const {
    ship: {
      radius: shipRadius,
      defaultShip,
    },
    bullets: {
      radius: bulletRadius,
    },
  } = SETTINGS;
  let livesDiff = 0;
  const collidedBullets: Bullet[] = [];
  const asteroidCollisions: AsteroidCollision[] = [];
  let newShip: Ship;
  asteroids.forEach((asteroid) => {
    bullets.forEach((bullet) => {
      if (isCollided({ ...bullet, radius: bulletRadius }, asteroid)) {
        collidedBullets.push(bullet);
        asteroidCollisions.push({
          points: pointsForCollision(asteroid),
          asteroid,
        });
      }
    });
    const didShipCollide: boolean = isCollided(
      { ...ship, radius: shipRadius },
      asteroid
    );
    if (!isShipInvincible(ship, frameCount) && didShipCollide) {
      livesDiff -= 1;
      asteroidCollisions.push({ points: 0, asteroid });
      // Maintain the ship's current direction and reset its spawnFrame
      newShip = {
        ...defaultShip,
        degrees: ship.degrees,
        spawnFrame: frameCount,
      };
    }
  });

  const collidedAsteroids: Asteroid[] = asteroidCollisions.map(ac => ac.asteroid);
  const pointsAwarded: number = sumBy(asteroidCollisions, ac => ac.points);
  const notCollidedAsteroids: Asteroid[] = asteroids.filter(asteroid => (
    !collidedAsteroids.includes(asteroid)
  ));
  const notCollidedBullets = bullets.filter(bullet => !collidedBullets.includes(bullet));

  return {
    newShip: newShip || ship,
    livesDiff,
    notCollidedBullets,
    collidedAsteroids,
    notCollidedAsteroids,
    pointsAwarded,
  };
}
