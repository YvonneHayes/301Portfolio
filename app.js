var projectView = {};
var projects = [];

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

Project.prototype.toHtml = function() {
  var $newProject = $('div.template').clone();

  $newProject.attr('data-category', this.category);
  $newProject.find('.forProject').text(this.name);
  $newProject.find('.projectCategory').text(this.category);
  $newProject.find('.projectSummary').html(this.summary);
  $newProject.find('.creatorName').text(this.creator);
  $newProject.find('.others').text(this.collaborators);
  $newProject.find('pubdate').text(this.finishedOn);
  $newProject.find('.projectUrl').html(this.locationUrl);

  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.finishedOn);

  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.finishedOn))/60/60/24/1000) + ' days ago');

  // $newProject.append('<hr>');

  $newProject.removeClass('template');

  return $newProject;
};


projectsData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectsData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});

//********************************************************//
//                    FILTERS                             //
//*******************************************************//

//populate Filter with categories
projectView.populateFilters = function() {
  $('.newProject').each(function() {
    if (!$(this).hasClass('template')) {

      var val = $(this).find('.projectCategory').text();

      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#category-filter').append(optionTag);
    }
  });
};

//Show only projects of the selected category (or all if blank)
projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    var categoryName = $(this).val(); //Turned value of category into a variable
    if (categoryName) {

      $('.newProject').hide(); //hiding ALL articles
      $('.newProject[data-category="' + categoryName +'"]').fadeIn('slow'); //fade in JUST the one category

    } else {
      $('.template:not(.template)').fadeIn('fast'); //showing all projects but the template

    }
  });
};



//********************************************************//
//                  VIEW OPTIONS                          //
//*******************************************************//

// Event Handler that turns Home and About into Tabs
projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(){
    var dataContent = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + dataContent).show();
  });

  $('.main-nav .tab:first').click();
};

//Set the teasers and read more link
projectView.setTeasers = function() {
  $('.projectSummary *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.
  $('.read-on').on('click', function(e){
    e.preventDefault();
    $(this).siblings('.projectSummary').find('*:nth-of-type(n+2)').show();
  });

};

//Calling all functions as soon as ready
$(document).ready(function(){
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.setTeasers();

});
