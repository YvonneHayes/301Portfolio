
var projects = [];

//Project creator function
function Project (projectIndex) {
    this.category = projectIndex.category;
    this.name = projectIndex.name;
    this.summary = projectIndex.summary;
    this.creator = projectIndex.creator;
    this.collaborators = projectIndex.collaborators;
    this.finishedOn = projectIndex.finishedOn;
    this.locationUrl = projectIndex.locationUrl
}

Project.prototype.toHtml = function() {
  var $newProject = $('div.template').clone();

  $newProject.attr('data-category', this.category);
  $newProject.find('#forProject').text(this.name);
  $newProject.find('.projectSummary').html(this.summary);
  $newProject.find('#creatorName').text(this.creator);
  $newProject.find('#others').text(this.collaborators);
  $newProject.find('pubdate').text(this.finishedOn);
  $newProject.find('#projectUrl').text(this.locationUrl);

  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.finishedOn)

  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.finishedOn))/60/60/24/1000) + ' days ago')

  $newProject.append('<hr>');

  $newProject.removeClass('template');

  return $newProject;
}


projectsData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectsData.forEach(function(ele) {
  projects.push(new Project(ele));
})

projects.forEach(function(a){
  $('#projects').append(a.toHtml())
});
