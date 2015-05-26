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

require(['app','jquery'], function(App, $){
  var app = new App();

  $(function() {
    app.initialize();
  });
});