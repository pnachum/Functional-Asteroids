// @flow

import { DIMENSION } from '../constants';
import type { DrawableCircle, DrawableText } from '../types/index';

let gameCtx: Object;
let uiCtx: Object;

export function initContext(gameContext: Object, uiContext: Object) {
  gameCtx = gameContext;
  uiCtx = uiContext;
}

export function clear() {
  gameCtx.clearRect(0, 0, DIMENSION, DIMENSION);
  uiCtx.clearRect(0, 0, DIMENSION / 2, DIMENSION);
}

function drawCircle(ctx: Object, { color, pos, radius }: DrawableCircle) {
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

export function drawCircleInGame(obj: DrawableCircle) {
  drawCircle(gameCtx, obj);
}

export function drawCircleInUI(obj: DrawableCircle) {
  drawCircle(uiCtx, obj);
}

function drawText(
  ctx: Object,
  { text, size, pos, color }: DrawableText,
) {
  ctx.fillStyle = color;
  ctx.font = `${size}pt Arial `;
  ctx.fillText(text, ...pos);
}

export function drawTextInGame(obj: DrawableText) {
  drawText(gameCtx, obj);
}

export function drawTextInUI(obj: DrawableText) {
  drawText(uiCtx, obj);
}
