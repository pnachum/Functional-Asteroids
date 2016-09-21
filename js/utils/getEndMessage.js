// @flow

import {
  CLASSIC,
  DODGEBALL,
  BOSS,
  SUPER_BOSS,
  FRAMES_PER_SECOND,
} from '../constants';
import type { Mode } from '../types/index';

type Argument = {
  score: number,
  frameCount: number,
  mode: Mode,
};

const ending: string = 'Would you like to play again?';

function getEndMessageHelper({ score, frameCount, mode }: Argument): string {
  const seconds: number = Math.floor(frameCount / FRAMES_PER_SECOND);
  switch (mode) {
    case CLASSIC:
      return `Game Over! Your score is ${score}. You survived for ${seconds} seconds.`;
    case DODGEBALL:
      return `Game Over! You survived for ${seconds} seconds.`;
    case BOSS:
    case SUPER_BOSS:
      return `You win! That took you ${seconds} seconds.`;
    default:
      return '';
  }
}

export default function getEndMessage(options: Argument): string {
  return `${getEndMessageHelper(options)} ${ending}`;
}
