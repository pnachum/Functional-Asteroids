// @flow

import React from 'react';
import { connect } from 'react-redux';
import { MODES } from '../constants';
import ModeOption from './ModeOption';
import Instructions from './Instructions';
import Canvases from './Canvases';
import type { Mode } from '../types/index';
import { setMode } from '../actions';

type State = {
  isSelectingMode: boolean,
};

type Props = {
  modeSelected: (mode: Mode) => void,
};

class App extends React.Component {
  props: Props;
  state: State

  constructor(props) {
    super(props);

    this.state = {
      isSelectingMode: true,
    };
  }

  selectMode(mode: Mode) {
    this.setState({ isSelectingMode: false });
    this.props.modeSelected(mode);
  }

  render() {
    const { isSelectingMode } = this.state;

    return (
      <div>
        {isSelectingMode ? (
          <div>
            <h2>Choose a Mode</h2>
            <div>
              {MODES.map(mode => (
                <ModeOption
                  key={mode}
                  mode={mode}
                  onClick={() => this.selectMode(mode)}
                />
              ))}
            </div>
          </div>
        ) : (
          <Canvases />
        )}
        <Instructions />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  modeSelected: (mode: Mode) => dispatch(setMode(mode)),
}))(App);
