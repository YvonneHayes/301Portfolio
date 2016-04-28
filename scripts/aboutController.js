(function(module) {
  var aboutController = {};

  
  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
