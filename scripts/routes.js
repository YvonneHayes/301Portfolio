(function(module){
  var routes = {};

  routes.setRouteMappings = function() {
    page.base('/');
    page('/', projectController.index);
    page('about', aboutController.index);

    // DONE: What function do we call to activate page.js? Fire it off now, to execute
    page();
  };

  routes.setRouteMappings();

  module.routes = routes; //making it global

})(window);
