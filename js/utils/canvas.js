// @flow

import { DIMENSION } from '../constants';
import type { Drawable } from '../types/index';

let ctx: Object;

export function initContext(context: Object) {
  ctx = context;
}

export function clear() {
  ctx.clearRect(0, 0, DIMENSION, DIMENSION);
}

export function drawCircle({ color, pos, radius }: Drawable) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    pos[0],
    pos[1],
    radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
}

export function drawText(
  { text, size, pos, color }: { text: string, size: number, pos: [number, number], color: string }
) {
  ctx.fillStyle = color;
  ctx.font = `${size}pt Arial `;
  ctx.fillText(text, ...pos);
}
