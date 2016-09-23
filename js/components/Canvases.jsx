// @flow

import React from 'react';
import beginGame from '../index';
import SoundControl from './SoundControl';

export default class Canvases extends React.Component {
  gameCanvas: Object;
  uiCanvas: Object;

  componentDidMount() {
    const contexts: CanvasRenderingContext2D[] = [this.gameCanvas, this.uiCanvas].map(canvas => (
      canvas.getContext('2d')
    ));
    beginGame(...contexts);
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <canvas
          id="game"
          width="500"
          height="500"
          ref={gameCanvas => {
            this.gameCanvas = gameCanvas;
          }}
        />

        <canvas
          id="ui"
          width="250"
          height="500"
          ref={uiCanvas => {
            this.uiCanvas = uiCanvas;
          }}
        />

        <SoundControl />
      </div>
    );
  }
}
