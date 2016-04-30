import $ from 'jquery';
import Game from './js/game';
import SETTINGS from './js/settings';

$(document).ready(function(){

  $(".mode-button").click(function(event){
    var mode = $(event.currentTarget).find($(".mode-title")).text();
    SETTINGS.updateMode(mode);
    $("#mode-buttons").toggleClass("hidden");
    $("canvas").toggleClass("hidden");
    var game = document.getElementById("game");
    var gameContext = game.getContext("2d");
    var ui = document.getElementById("ui");
    var uiContext = ui.getContext("2d");
    var asteroidsGame = new Game(gameContext, uiContext);
    asteroidsGame.start();
  });

  $('.mode-button').hover(function(event){
    $(event.currentTarget).toggleClass("hovered");
  });

});
