// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import beginGame from '../index';
import SoundControl from './SoundControl';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
  },
  canvas: {
    border: '2px solid #000000',
  },
  gameCanvas: {
    backgroundImage: "url('./images/background.jpg')",
  },
});

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
      <div className={css(styles.container)}>
        <canvas
          id="game"
          width="500"
          height="500"
          className={css(styles.canvas, styles.gameCanvas)}
          ref={gameCanvas => {
            this.gameCanvas = gameCanvas;
          }}
        />

        <canvas
          id="ui"
          width="250"
          height="500"
          className={css(styles.canvas)}
          ref={uiCanvas => {
            this.uiCanvas = uiCanvas;
          }}
        />

        <SoundControl />
      </div>
    );
  }
}
