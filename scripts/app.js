(function(module) {

  var projectView = {};

//Project creator function
  function Project (projectIndex) {
    this.category = projectIndex.category;
    this.name = projectIndex.name;
    this.summary = projectIndex.summary;
    this.creator = projectIndex.creator;
    this.collaborators = projectIndex.collaborators;
    this.finishedOn = projectIndex.finishedOn;
    this.locationUrl = projectIndex.locationUrl;
  }

//making the Template

  Project.all = []; //empty array to be filled with projects

  Project.prototype.toHtml = function() {
    //store number of days since finshedOn
    this.daysAgo = parseInt((new Date() - new Date(this.finishedOn))/60/60/24/1000);

    var apptemplate = $('#project-template').html();
    var templateFunction = Handlebars.compile(apptemplate);
    return templateFunction(this);
  };

//instatiating the projects

  Project.loadAll = function(rawData) {
    // sorting Projects in order they were finished
    rawData.sort(function(a,b) {
      var diff =  (new Date(b.finishedOn)) - (new Date(a.finishedOn));
      return diff;
    });

  //rendering the sorted Projects via the .map method
    Project.all = rawData.map(function(item){
      return new Project(item);
    });
  };

//function that calls .toHtml method on each project and appends them to #projects
  Project.renderProjects = function(){
    return Project.all.forEach(function(x){
      $('#projects').append(x.toHtml());
    });
  };


  // function to count total number of Projects
  projectView.countProjects = function() {
    $('#projectNumber .projectsnumb').text(Project.all.length);
  };

//********************************************************//
//                  AJAX                                  //
//*******************************************************//

  Project.fetchAll = function () {
    var latestEtag = '';
    var xhr = $.ajax({
      url: '/Data/projects.json',
      type: 'HEAD',
      success: function(){
        latestEtag = xhr.getResponseHeader('etag');
        //if-else statement to make sure it isn't run before getResponseHeader request is DONE
        if (localStorage.rawData && localStorage.etag == latestEtag){
          Project.loadAll(JSON.parse(localStorage.rawData));
          Project.renderProjects();
          // projectView.populateFilters();
          projectView.countProjects();

        }else {
          localStorage.etag = latestEtag;
          $.getJSON('/Data/projects.json', function(data) {
            //calling Project.LoadAll on data that we got from projects.json
            Project.loadAll(data);
            //storing stringifyed json data in local storage
            localStorage.rawData = JSON.stringify(data);
            Project.renderProjects();
            projectView.populateFilters();
            projectView.countProjects();
          });
        }
      }
    });
  };

  //********************************************************//
  //              ABOUT PAGE - INTERESTS                   //
  //*******************************************************//

  function useNext(next) { //starting by targeting the right element and giving it text
    document.getElementById('interests').innerHTML = 'Here\'s a few things I like doing in my free time:';

    var likes = ['coding', 'gaming', 'reading']; //the array of hobbies
    likes.forEach(function(el) { next(el);}); //looping through the array
  }

  function hobbies(s) { //creating the proper elements and appending the info to the DOM
    var node = document.createElement('li');
    var textnode = document.createTextNode(s);
    node.appendChild(textnode);
    document.getElementById('hobbies').appendChild(node);
  }

  useNext(hobbies); //calling useNext and handing it hobbies() as a param


//making Project and projectView 'visible' outside of IIFE
  module.Project = Project;
  module.projectView = projectView;

})(window);
