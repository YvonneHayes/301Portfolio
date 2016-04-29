(function(module){
  var routes = {};

  routes.setRouteMappings = function() {
    page.base('/');
    page('/', projectController.index);
    page('about', aboutController.index);
    page();
  };

  routes.setRouteMappings();

  module.routes = routes; //making it global

})(window);
