import { DIMENSION } from '../constants';

let ctx;

export function initContext(context) {
  ctx = context;
}

export function clear() {
  ctx.clearRect(0, 0, DIMENSION, DIMENSION);
}

export function drawObject({ color, pos, radius }) {
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
