import React from 'react';
import { connect } from 'react-redux';
import { toggleSound } from '../actions';

type Props = {
  toggle: () => void,
  isSoundOn: boolean,
};

function SoundControl({ toggle, isSoundOn }: Props) {
  return (
    <button onClick={toggle}>
      {isSoundOn ? 'Turn off sound' : 'Turn on sound'}
    </button>
  );
}

export default connect(
  ({ isSoundOn }) => ({ isSoundOn }),
  dispatch => ({ toggle: () => dispatch(toggleSound()) })
)(SoundControl);
