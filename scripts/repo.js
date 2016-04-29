(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax ({
      url: 'https://api.github.com/user/repos',
      headers: { Authorization: 'token ' + githubToken }
    }).done(function(data){
      console.log('hi there!');
      repos.all = data;
      callback();
    });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
