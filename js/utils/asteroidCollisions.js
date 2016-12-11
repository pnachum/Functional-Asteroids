// @flow

import { times, sumBy } from 'lodash';
import { SETTINGS } from '../constants';
import randomAsteroids from './randomAsteroids';
import { direction, sumOfAreas, isCollided } from './math';
import { isShipInvincible } from './durationChecks';
import type {
  Asteroid,
  Debris,
  WithRadius,
  DifficultyState,
  Ship,
  Bullet,
  Powerup,
} from '../types/types';
import { PowerupType } from '../types/enums';

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

const numPowerupsOfType = (powerups: Powerup[]) => (type: PowerupType): number => (
  powerups.filter(powerup => powerup.type === type).length
);

export function handleCollisions({
  ship,
  asteroids,
  bullets,
  powerups,
  frameCount,
  pointsForCollision,
} : {
  ship: Ship,
  asteroids: Asteroid[],
  bullets: Bullet[],
  powerups: Powerup[],
  frameCount: number,
  pointsForCollision: (asteroid: Asteroid) => number,
}): {
  livesDiff: number,
  notCollidedBullets: Bullet[],
  collidedAsteroids: Asteroid[],
  notCollidedAsteroids: Asteroid[],
  notCollidedPowerups: Powerup[],
  pointsAwarded: number,
  newShip: Ship,
  beginBulletPowerup: boolean,
  beginFreezePowerup: boolean,
  bombsDiff: number,
  resetMultiplier: boolean,
} {
  const {
    ship: {
      radius: shipRadius,
      defaultShip,
    },
    bullets: {
      radius: bulletRadius,
    },
    powerups: {
      radius: powerupRadius,
    },
  } = SETTINGS;
  let livesDiff: number = 0;
  let bombsDiff: number = 0;
  let resetMultiplier: boolean = false;
  const collidedBullets: Bullet[] = [];
  const asteroidCollisions: AsteroidCollision[] = [];
  let newShip: Ship = ship;
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
    const didShipCollideWithAsteroid: boolean = isCollided(
      { pos: ship.pos, radius: shipRadius },
      asteroid
    );
    if (!isShipInvincible(ship, frameCount) && didShipCollideWithAsteroid) {
      livesDiff -= 1;
      asteroidCollisions.push({ points: 0, asteroid });
      // Maintain the ship's current direction and reset its spawnFrame
      newShip = {
        ...defaultShip,
        degrees: ship.degrees,
        invincibilityStartFrame: frameCount,
      };
      resetMultiplier = true;
    }
  });

  const collidedAsteroids: Asteroid[] = asteroidCollisions.map(ac => ac.asteroid);
  const pointsAwarded: number = sumBy(asteroidCollisions, ac => ac.points);
  const notCollidedAsteroids: Asteroid[] = asteroids.filter(asteroid => (
    !collidedAsteroids.includes(asteroid)
  ));
  const notCollidedBullets = bullets.filter(bullet => !collidedBullets.includes(bullet));

  const collidedPowerups = powerups.filter(powerup => (
    isCollided({ ...ship, radius: shipRadius }, { ...powerup, radius: powerupRadius })
  ));
  const notCollidedPowerups = powerups.filter(powerup => !collidedPowerups.includes(powerup));

  const numCollidedPowerupsOfType = numPowerupsOfType(collidedPowerups);
  livesDiff += numCollidedPowerupsOfType(PowerupType.LIFE);
  bombsDiff = numCollidedPowerupsOfType(PowerupType.BOMB);

  const beginBulletPowerup = numCollidedPowerupsOfType(PowerupType.BULLET) > 0;
  const beginFreezePowerup = numCollidedPowerupsOfType(PowerupType.FREEZE) > 0;
  const beginInvinciblePowerup = numCollidedPowerupsOfType(PowerupType.INVINCIBLE) > 0;
  if (beginInvinciblePowerup) {
    newShip = {
      ...newShip,
      invincibilityStartFrame: frameCount,
    };
  }
  return {
    newShip: newShip || ship,
    livesDiff,
    notCollidedBullets,
    collidedAsteroids,
    notCollidedAsteroids,
    notCollidedPowerups,
    pointsAwarded,
    beginBulletPowerup,
    beginFreezePowerup,
    bombsDiff,
    resetMultiplier,
  };
}

export function updateMultipliers({
  previousMultiplier,
  previousMultiplierBar,
  numHits,
  resetMultiplier,
}: {
  previousMultiplier: number,
  previousMultiplierBar: number,
  numHits: number,
  resetMultiplier: boolean,
}): { multiplier: number, multiplierBar: number } {
  if (resetMultiplier) {
    return { multiplier: 1, multiplierBar: 0 };
  }
  let newMultiplier = previousMultiplier;
  let newMultiplierBar = Math.max(0, previousMultiplierBar + (10 * numHits) - 0.2);
  if (newMultiplierBar === 0) {
    newMultiplier = 1;
  } else if (newMultiplierBar > 100) {
    newMultiplierBar %= 100;
    newMultiplier += 1;
  }
  return {
    multiplier: Math.max(1, newMultiplier),
    multiplierBar: newMultiplierBar,
  };
}
