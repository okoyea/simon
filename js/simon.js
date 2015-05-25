define(['lodash'], function (_) {
  var Simon = function () {
    this.initializeGame = function() {
      $(".board").removeClass('overlay');
      this.sequence = [];
      this.round = 1;
      this.startRound();
    },

    this.startRound = function() {
      this.inputIds = [];
      this.buildSequence();
      this.playSequence();
    },

    this.buildSequence = function() {
      var options = [1,2,3,4];
      var times = 1;

      if (this.round > 7) {
        times = _.random(1,2)
      }

      for(var i=0; i < times; i++) {
        this.sequence.push(_.random(1,4))
      }

      this.sequenceCopy = _.clone(this.sequence);
    },

    this.activate = function() {
      var that = this;

      $('[data-id]').on({
        'click' : function(e) {
          e.stopImmediatePropagation();
          that.checkResults($(e.target).data('id'));
        },
        'mousedown' : function(e) {
          that.playSound($(e.target).data('id'));
          that.lightKeys($(e.target).data('id'));
        }
      });
    },

    this.deactivate = function() {
      $('[data-id]')
        .off('click')
        .off('mousedown');
    },

    this.checkResults = function(id) {
      var alive = this.sequenceCopy.shift() === id

      if (alive && (this.sequenceCopy.length === 0)) {
        this.round++;
        this.startRound();
      }

      if (!alive) {
        this.endGame();
      }
    },

    this.endGame = function() {
      this.playSound(5);
      this.deactivate();
      $('.board').addClass('overlay');
      $('button').show();
      $('button').text('Try Again?');
    },

    this.playSequence = function() {
      this.deactivate();
      this.play();
      this.activate();
    },

    this.play = function() {
      var i = 0;
      var that = this;
      var interval = setInterval(function() {
        that.playSound(that.sequence[i]);
        that.lightKeys(that.sequence[i]);
        i++;

        if (i >= that.sequence.length) {
          clearInterval(interval);
        }
      }, 600);
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

      window.setTimeout(function() {
        $key.removeClass('pressed');
      }, 300);
    },

    this.clockwiseFlash = function() {
      var $key1 = $('[data-id=' + 1 + ']');
      var $key2 = $('[data-id=' + 2 + ']');
      var $key3 = $('[data-id=' + 3 + ']');
      var $key4 = $('[data-id=' + 4 + ']');

      $key1.addClass('pressed');
      window.setTimeout(function() {
        $key1.removeClass('pressed');
      }, 300);

      $key3.addClass('pressed');
      window.setTimeout(function() {
        $key3.removeClass('pressed');
      }, 500);

      $key4.addClass('pressed');
      window.setTimeout(function() {
        $key4.removeClass('pressed');
      }, 700);

      $key2.addClass('pressed');
      window.setTimeout(function() {
        $key2.removeClass('pressed');
      }, 900);
    }
  };

  return Simon;
});