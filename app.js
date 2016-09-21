import $ from 'jquery';
import beginGame from './js/index';

$(() => {
  $('.mode-button').on('click', (event) => {
    const mode = $(event.currentTarget).find('.mode-title').text();
    $('#mode-buttons').toggleClass('hidden');
    $('canvas').toggleClass('hidden');
    const game = document.getElementById('game');
    const gameContext = game.getContext('2d');
    const ui = document.getElementById('ui');
    const uiContext = ui.getContext('2d');
    beginGame(gameContext, uiContext);
  });
});
