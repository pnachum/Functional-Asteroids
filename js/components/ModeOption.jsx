// @flow

import React from 'react';
import { SETTINGS, Mode } from '../constants';

type Props = {
  mode: Mode,
  onClick: () => void,
};

export default function ModeOption({ mode, onClick }: Props) {
  return (
    <button className="mode-button" onClick={onClick}>
      <p className="mode-title">{SETTINGS.modes.name[mode]}</p>
      <p className="mode-text">{SETTINGS.modes.description[mode]}</p>
    </button>
  );
}
