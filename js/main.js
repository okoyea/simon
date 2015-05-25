require.config({
    paths: {
      'jquery': '../bower_components/jquery/dist/jquery.min',
      'lodash': '../node_modules/lodash/index'
    },
    shim: {
      'jquery': {
          exports: '$'
      }
    }
});

require(['simon','interactions','jquery'], function(Simon, Interactions, $){
  var simon = new Simon();
  var interactions = new Interactions();
  var $start = $('#start')
  var $button = $('button')
  var $board = $(".board")
  var interval;

  $(function() {
    simon.initialize();
    startUp();
  });

  $button.click(function() {
    startGame();
  });

  function startUp() {
    interactions.clockwiseFlash();
    interactions.playSound(6);

    $start.hide();

    interval = setInterval(function() {
      interactions.clockwiseFlash();
    }, 1700);

    setTimeout(function() {
      $start.show()
    }, 4000)
  };

  function startGame() {
    clearInterval(interval);
    $start.hide();
    $board.removeClass('overlay');

    simon.startGame();
  };
});