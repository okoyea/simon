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

require(['simon','jquery'], function(Simon, $){
  var simon = new Simon();
  var interval;

  $(function() {
    startUp();
  });

  function startUp() {
    simon.clockwiseFlash();
    simon.playSound(6);
    $('#start').hide();

    interval = setInterval(function() {
      simon.clockwiseFlash();
    }, 1700);

    setTimeout(showStart,4000)
  }

  function showStart() {
    $('#start').show()
  }

  $('button').click(function(event) {
    $('#start').hide();
    $(".board").removeClass('overlay');

    clearInterval(interval);
    simon.initializeGame();
    event.preventDefault();
  });
});