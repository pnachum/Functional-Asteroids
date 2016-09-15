import GameText from './gameText';
import SETTINGS from './settings';
import { includes, times } from 'lodash';

// The UI class handles the right-hand panel which displays lives, the score,
// and elapsed time
export default class UI {

  static DIM_X = 250;
  static DIM_Y = 500;

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.scoreText = new GameText("", 20, [5, 30], "black");
    this.multiplierText = new GameText("", 20, [5, 60], "black");
    this.modeText = new GameText("", 20, [5, 130], "black");
    this.timeText = new GameText("", 20, [5, 160], "black");
  }

  draw() {
    const game = this.game;
    const mode = game.mode;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, UI.DIM_X, UI.DIM_Y);
    this.scoreText.string = `Score: ${game.score}`;
    this.multiplierText.string = `x${game.scoreMultiplier}`;
    this.modeText.string = `Mode: ${mode}`;
    this.timeText.string = `Time: ${Math.floor(game.timer / 1000)}`;

    // Choose which information to display based on the game mode
    if (mode === "Classic") {
      this.scoreText.draw(ctx);
      this.multiplierText.draw(ctx);
    }
    if (includes(["Bossteroid", "Super Bossteroid", "Classic"], mode)) {
      this.drawShipIcons(ctx);
    }
    if (includes(["Bossteroid", "Super Bossteroid", "Dodgeball"], mode)) {
      this.timeText.draw(ctx);
    }
    this.modeText.draw(ctx);
  }

  // The ship icons represent how many lives the player has left
  drawShipIcons(ctx) {
    const shipRadius = this.game.ship.radius;
    const turretRadius = this.game.ship.turret.radius;
    const color = SETTINGS.ship.color;

    times(this.game.lives, (i) => {
      const shipPos = [20 + 25 * i, 90];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        shipPos[0],
        shipPos[1],
        shipRadius,
        0,
        2 * Math.PI,
        false
        );
      ctx.fill();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        shipPos[0],
        shipPos[1] - shipRadius,
        turretRadius,
        0,
        2 * Math.PI,
        false
        );
      ctx.fill();
    });
  }
}
