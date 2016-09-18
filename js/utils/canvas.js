// @flow

import { DIMENSION } from '../constants';

let ctx: any;

export function initContext(context: any) {
  ctx = context;
}

export function clear() {
  ctx.clearRect(0, 0, DIMENSION, DIMENSION);
}

export function drawObject(
  { color, pos, radius }: { color: string, pos: [number, number], radius: string }
) {
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
