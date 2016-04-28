(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {

    $.ajax ({
      url: 'https://api.github.com/user/repos',
      // data: {access_token: githubToken} // this is the parameter way, it's an alternative way
      headers: {Authorization: 'token ' + githubToken } //this is the Header way. Both work.
    }).done(function(data){
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
