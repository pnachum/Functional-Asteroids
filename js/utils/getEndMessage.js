// @flow

import { FRAMES_PER_SECOND } from '../constants';
import { Mode } from '../types/enums';

type Argument = {
  score: number,
  frameCount: number,
  mode: Mode,
  hasWon: boolean,
};

const ending: string = 'Would you like to play again?';

function getEndMessageHelper({ score, frameCount, mode, hasWon }: Argument): string {
  const seconds: number = Math.floor(frameCount / FRAMES_PER_SECOND);
  if (hasWon) {
    return `You win! That took you ${seconds} seconds.`;
  }
  if (mode === Mode.DODGEBALL) {
    return `Game Over! You survived for ${seconds} seconds.`;
  }
  return `Game Over! Your score is ${score}. You survived for ${seconds} seconds.`;
}

export default function getEndMessage(options: Argument): string {
  return `${getEndMessageHelper(options)} ${ending}`;
}
