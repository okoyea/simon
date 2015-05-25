define(['lodash'], function (_) {
  var Interactions = function () {

    this.clockwiseFlash = function() {
      var $key1 = $('[data-id=1]');
      var $key2 = $('[data-id=2]');
      var $key3 = $('[data-id=3]');
      var $key4 = $('[data-id=4]');

      $key1.addClass('pressed');
      setTimeout(function() {
        $key1.removeClass('pressed');
      }, 300);

      $key3.addClass('pressed');
      setTimeout(function() {
        $key3.removeClass('pressed');
      }, 500);

      $key4.addClass('pressed');
      setTimeout(function() {
        $key4.removeClass('pressed');
      }, 700);

      $key2.addClass('pressed');
      setTimeout(function() {
        $key2.removeClass('pressed');
      }, 900);
    },

    this.playSound = function(id) {
      var audio = $('<audio autoplay></audio>');
      audio.volume = 1.0;
      audio.append('<source src="sounds/' + id + '.ogg" type="audio/ogg" />');
      audio.append('<source src="sounds/' + id + '.mp3" type="audio/mp3" />');
      $('[data-action=sound]').html(audio);
    },

    this.lightKeys = function(id) {
      var $key = $('[data-id=' + id + ']')

      $key.addClass('pressed');

      setTimeout(function() {
        $key.removeClass('pressed');
      }, 300);
    },

    this.hideOverlay = function() {
      $(".board").removeClass('overlay');
    },

    this.showOverlay = function() {
      var $button = $('button');
      var $board = $('.board');

      $board.addClass('overlay');
      $button.show();
      $button.text('Try Again?');
    }
  };

  return Interactions;
});