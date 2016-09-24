// @flow

import React from 'react';
import VolumeOff from 'react-icons/lib/fa/volume-off';
import VolumeUp from 'react-icons/lib/fa/volume-up';
import { connect } from 'react-redux';
import { toggleSound } from '../actions';

type Props = {
  toggle: () => void,
  isSoundOn: boolean,
};

function SoundControl({ toggle, isSoundOn }: Props) {
  return (
    <div onClick={toggle}>
      {isSoundOn ? <VolumeUp size={24} /> : <VolumeOff size={24} />}
    </div>
  );
}

export default connect(
  ({ isSoundOn }) => ({ isSoundOn }),
  dispatch => ({ toggle: () => dispatch(toggleSound()) })
)(SoundControl);
