// @flow

import { FRAMES_PER_SECOND, SETTINGS } from '../constants';
import type { Ship } from '../types/types';
import { PowerupType } from '../types/enums';

function hasTimePassed(
  startFrame: ?number,
  duration: number,
  currentFrame: number,
): boolean {
  if (startFrame == null) {
    return true;
  }
  return startFrame + (FRAMES_PER_SECOND * duration) < currentFrame;
}

export function isShipInvincible({ invincibilityStartFrame }: Ship, frameCount: number): boolean {
  return !hasTimePassed(invincibilityStartFrame, SETTINGS.ship.invincibilityTime, frameCount);
}

export function isBulletPoweredUp(bulletPowerupStartFrame: ?number, frameCount: number): boolean {
  return !hasTimePassed(
    bulletPowerupStartFrame,
    SETTINGS.powerups.duration[PowerupType.BULLET],
    frameCount
  );
}

export function areAsteroidsFrozen(freezePowerupStartFrame: ?number, frameCount: number): boolean {
  return !hasTimePassed(
    freezePowerupStartFrame,
    SETTINGS.powerups.duration[PowerupType.FREEZE],
    frameCount
  );
}
