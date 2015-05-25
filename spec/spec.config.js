require.config({
  paths: {
    'simon'   : '../js/simon'
  }
});

define(function(require) {
  require([
    'simon.js',
  ], function(require) {
    mocha.run();
  });
});