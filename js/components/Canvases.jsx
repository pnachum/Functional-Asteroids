// @flow

import React from 'react';
import beginGame from '../index';

export default class Canvases extends React.Component {
  gameCanvas: any;
  uiCanvas: any;

  componentDidMount() {
    const contexts = [this.gameCanvas, this.uiCanvas].map(canvas => canvas.getContext('2d'));
    beginGame(...contexts);
  }

  render() {
    return (
      <div>
        <canvas
          id="game"
          width="500"
          height="500"
          ref={gameCanvas => {
            this.gameCanvas = gameCanvas
          }}
        />

        <canvas
          id="ui"
          width="250"
          height="500"
          ref={uiCanvas => {
            this.uiCanvas = uiCanvas
          }}
        />
      </div>
    );
  }
}
