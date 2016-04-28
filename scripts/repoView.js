(function(module) {
  var repoView = {};


  var ui = function() {
    var $about = $('#about');


    $about.show();
    $('#filters').hide();
    $('#projects').hide();
  };


  var render = function(repo){
    var repotemplate = Handlebars.compile($('#repo-template').text());
    return repotemplate(repo);
  };


  repoView.index = function() {
    ui();

    /
    $('#repoList').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
