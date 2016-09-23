// @flow

import React from 'react';
import { DESCRIPTION_FOR_MODE, NAME_FOR_MODE, Mode } from '../constants';

type Props = {
  mode: Mode,
  onClick: () => void,
};

export default function ModeOption({ mode, onClick }: Props) {
  return (
    <button className="mode-button" onClick={onClick}>
      <p className="mode-title">{NAME_FOR_MODE.get(mode)}</p>
      <p className="mode-text">{DESCRIPTION_FOR_MODE.get(mode)}</p>
    </button>
  );
}
