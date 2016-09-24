import { FRAMES_PER_SECOND, SETTINGS, PowerupType } from '../constants';
import type { Ship } from '../types/index';

function hasTimePassed(
  startFrame: number,
  duration: number,
  currentFrame: number,
): boolean {
  return startFrame + (FRAMES_PER_SECOND * duration) < currentFrame;
}

export function isShipInvincible({ invincibilityStartFrame }: Ship, frameCount: number): boolean {
  return !hasTimePassed(invincibilityStartFrame, SETTINGS.ship.invincibilityTime, frameCount);
}

// TODO: These two functions look very similar
export function isBulletPoweredUp(bulletPowerupStartFrame: ?number, frameCount: number): boolean {
  if (bulletPowerupStartFrame == null) {
    return false;
  }
  return !hasTimePassed(
    bulletPowerupStartFrame,
    SETTINGS.powerups.duration[PowerupType.BULLET],
    frameCount
  );
}

export function areAsteroidsFrozen(freezePowerupStartFrame: ?number, frameCount: number): boolean {
  if (freezePowerupStartFrame == null) {
    return false;
  }
  return !hasTimePassed(
    freezePowerupStartFrame,
    SETTINGS.powerups.duration[PowerupType.FREEZE],
    frameCount
  );
}
