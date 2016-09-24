// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { SETTINGS } from '../constants';
import { Mode } from '../types/enums';

const styles = StyleSheet.create({
  modeOption: {
    width: 200,
    height: 120,
    display: 'inline-block',
    border: '3px solid lightgreen',
    margin: 10,
    verticalAlign: 'top',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'lightgreen',
    },
  },
  modeTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  modeText: {
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
  },
});

type Props = {
  mode: Mode,
  onClick: () => void,
};

export default function ModeOption({ mode, onClick }: Props) {
  return (
    <button className={css(styles.modeOption)} onClick={onClick}>
      <p className={css(styles.modeTitle)}>{SETTINGS.modes.name[mode]}</p>
      <p className={css(styles.modeText)}>{SETTINGS.modes.description[mode]}</p>
    </button>
  );
}
