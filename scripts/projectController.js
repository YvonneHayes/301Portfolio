(function(module) {
  var projectController = {};
  Project.fetchAll();

  projectController.index = function() {

    $('main > section').hide();
    $('#projects').fadeIn();
    $('#filters').fadeIn();
  };

  module.projectController = projectController;
})(window);
