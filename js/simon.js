define(['lodash','interaction_helper'], function (_, Interactions) {
  var Simon = function () {

    this.initialize = function() {
      this.interactions = new Interactions();
    },

    this.resetGame = function() {
      this.sequence = [];
      this.round = 1;
    },

    this.startGame = function() {
      this.interactions.hideOverlay();
      this.resetGame();
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
        times = _.random(1,2);
      }

      for(var i=0; i < times; i++) {
        this.sequence.push(_.random(1,4));
      }

      this.sequenceCopy = _.clone(this.sequence);
    },

    this.checkResults = function(id) {
      var alive = this.sequenceCopy.shift() === id

      if (alive && (this.sequenceCopy.length === 0)) {
        this.nextRound();
      }

      if (!alive) {
        this.endGame();
      }
    },

    this.endGame = function() {
      this.interactions.playSound(5);
      this.deactivate();
      this.interactions.showOverlay();
    },

    this.nextRound = function() {
      this.round++;
      this.startRound();
    },

    this.activate = function() {
      $('[data-id]').on({
        'click' : $.proxy(function(e) {
          e.stopImmediatePropagation();
          var id = $(e.target).data('id')
          this.checkResults(id);
        }, this),
        'mousedown' : $.proxy(function(e) {
          var id = $(e.target).data('id');
          this.interactions.playSound(id);
          this.interactions.lightKeys(id);
        }, this)
      });
    },

    this.deactivate = function() {
      $('[data-id]')
        .off('click')
        .off('mousedown');
    },

    this.playSequence = function() {
      this.deactivate();
      this.play();
      this.activate();
    },

    this.play = function() {
      var i = 0;

      var interval = setInterval((function() {
        this.interactions.playSound(this.sequence[i]);
        this.interactions.lightKeys(this.sequence[i]);
        i++;

        if (i >= this.sequence.length) {
          clearInterval(interval);
        }

      }).bind(this), 600 );
    }
  };

  return Simon;
});