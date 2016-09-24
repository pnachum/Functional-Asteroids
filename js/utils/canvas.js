// @flow

import { DIMENSION } from '../constants';
import type { DrawableCircle, DrawableText } from '../types/types';

let gameCtx: CanvasRenderingContext2D;
let uiCtx: CanvasRenderingContext2D;

function guardForInitialized(callback: Function): Function {
  return (...args) => {
    if (gameCtx && uiCtx) {
      callback(...args);
    }
  };
}

export function initContext(
  gameContext: CanvasRenderingContext2D,
  uiContext: CanvasRenderingContext2D
) {
  gameCtx = gameContext;
  uiCtx = uiContext;
}

function unguardedClear() {
  gameCtx.clearRect(0, 0, DIMENSION, DIMENSION);
  uiCtx.clearRect(0, 0, DIMENSION / 2, DIMENSION);
}

export const clear = guardForInitialized(unguardedClear);

function drawCircle(ctx: CanvasRenderingContext2D, { color, pos, radius }: DrawableCircle) {
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

function unguardedDrawCircleInGame(obj: DrawableCircle) {
  drawCircle(gameCtx, obj);
}
export const drawCircleInGame = guardForInitialized(unguardedDrawCircleInGame);

function unguardedDrawCircleInUI(obj: DrawableCircle) {
  drawCircle(uiCtx, obj);
}
export const drawCircleInUI = guardForInitialized(unguardedDrawCircleInUI);

function drawText(
  ctx: CanvasRenderingContext2D,
  { text, size, pos, color }: DrawableText,
) {
  ctx.fillStyle = color;
  ctx.font = `${size}pt Arial `;
  ctx.fillText(text, ...pos);
}

function ungardedDrawTextInGame(obj: DrawableText) {
  drawText(gameCtx, obj);
}
export const drawTextInGame = guardForInitialized(ungardedDrawTextInGame);

function ungardedDrawTextInUI(obj: DrawableText) {
  drawText(uiCtx, obj);
}
export const drawTextInUI = guardForInitialized(ungardedDrawTextInUI);
