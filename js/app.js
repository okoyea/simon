define(['simon', 'interaction_helper'], function (Simon, Interactions) {
  var App = function () {
    this.initialize = function() {
      this.simon = new Simon();
      this.interactions = new Interactions();

      this.simon.initialize();
      this.interactions.onPageLoad();
      this.setListeners();
    },

    this.setListeners = function() {
      var $startButton = $('#start')

      $startButton.on({
        'click' : $.proxy(function() {
          this.startSimon();
        }, this)
      });
    },

    this.startSimon = function() {
      this.interactions.onGameStart();
      this.simon.startGame();
    }
  };

  return App;
});