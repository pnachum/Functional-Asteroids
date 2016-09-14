import $ from 'jquery';
import Game from './js/game';
import SETTINGS from './js/settings';
import start from './js/state/index';

$(function() {
  $('.mode-button').on('click', (event) => {
    const mode = $(event.currentTarget).find('.mode-title').text();
    // SETTINGS.updateMode(mode);
    $('#mode-buttons').toggleClass('hidden');
    $('canvas').toggleClass('hidden');
    const game = document.getElementById('game');
    const gameContext = game.getContext('2d');
    start(gameContext);

    // const ui = document.getElementById('ui');
    // const uiContext = ui.getContext('2d');
    // const asteroidsGame = new Game(gameContext, uiContext);
    // asteroidsGame.start();
  });

  $('.mode-button').hover((event) => {
    $(event.currentTarget).toggleClass('hovered');
  });
});
