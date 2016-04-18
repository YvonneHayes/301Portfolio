


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

Project.all = [];

Project.prototype.toHtml = function() {

  var appTemplate = $('#project-template').html();
  var compileTemplate = Handlebars.compile(appTemplate);

  this.daysAgo = parseInt((new Date() - new Date(this.finishedOn))/60/60/24/1000);
  this.publishStatus = this.finishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = compileTemplate(this);
  return html;

};

// Sorting
Project.loadAll = function(projectsData) {
  projectsData.sort(function(a,b) {
    return (new Date(b.finishedOn)) - (new Date(a.finishedOn));
  });

  projectsData.forEach(function(ele) {
    Project.all.push(new Article(ele));
  });

};


// projectsData.sort(function(a,b) {
//   return (new Date(b.finishedOn)) - (new Date(a.finishedOn));
// });
//
// projectsData.forEach(function(ele) {
//   projects.push(new Project(ele));
// });
//
// projects.forEach(function(a){
//   $('#projects').append(a.toHtml());
// });


Project.fetchAll = function() {
  // if (localStorage.projectsData) {
  //   // When rawData is already in localStorage,
  //   // we can load it by calling the .loadAll function,
  //   // and then render the index page (using the proper method on the articleView object).
  //   Project.loadAll(JSON.parse(localStorage.rawData));
  //   projectView.callAll(); //DONE: Change this fake method call to the correct one that will render the index page.
  // } else {
    // TODO: When we don't already have the rawData in local storage, we need to get it from the JSON file,
    //       which simulates data on a remote server. Run live-server or pushstate-server!
    //       Please do NOT browse to your HTML file(s) using a "file:///" link. RUN A SERVER INSTEAD!!

    // 1. Retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    var ajaxCall = $.getJSON('projects.json', function(data){
      console.log('hi there');
    });
    console.log(ajaxCall);


    ajaxCall.done(function (data){
      // 2. Store the resulting JSON data with the .loadAll method,
      Project.loadAll(data);
      console.log();
      // 3. Cache the data in localStorage so next time we won't enter this "else" block (avoids hitting the server),
      localStorage.projectsData = JSON.stringify(data);
      // 4. Render the index page (perhaps with an articleView method?).




    });
  // }
};
Project.fetchAll();
callAllNow();
