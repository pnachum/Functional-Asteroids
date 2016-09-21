// @flow

import React from 'react';
import { DESCRIPTION_FOR_MODE, NAME_FOR_MODE } from '../constants';
import type { Mode } from '../types/index';

type Props = {
  mode: Mode,
  onClick: () => void,
};

export default function ModeOption({ mode, onClick }: Props) {
  return (
    <div className="mode-button" onClick={onClick}>
      <p className="mode-title">{NAME_FOR_MODE[mode]}</p>
      <p className="mode-text">{DESCRIPTION_FOR_MODE[mode]}</p>
    </div>
  );
}