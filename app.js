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
  rawData.sort(function(a,b) {
    var diff =  (new Date(b.finishedOn)) - (new Date(a.finishedOn));
    return diff;
  });

//Going through data and creating new Project object for each object in data
  rawData.forEach(function(item) {
    Project.all.push(new Project(item));
  });
};

//function that calls .toHtml method on each project and appends them to #projects
Project.renderProjects = function(){
  return Project.all.forEach(function(x){
    $('#projects').append(x.toHtml());
  });
};

//********************************************************//
//                    FILTERS                             //
//*******************************************************//

// populate Filter with categories
projectView.populateFilters = function() {
  var apptemplate = $('#selector-template').html();
  var compileTemplate = Handlebars.compile(apptemplate);
  $('.newProject').each(function() {

    val = {
      data: $(this).attr('data-category')
    };
    optionTag = compileTemplate(val);
    if ($('#category-filter option[value="' + val.data + '"]').length === 0) {
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

//********************************************************//
//                  AJAX                                  //
//*******************************************************//

// Project.fetchAll = function () {
//   var latestEtag = '';
//   var xhr = $.ajax({
//     url: '/Data/projects.json',
//     type: 'HEAD',
//     success: function(){
//       latestEtag = xhr.getResponseHeader('etag');
//       //if-else statement to make sure it isn't run before getResponseHeader request is DONE
//       if (localStorage.rawData && localStorage.etag == latestEtag){
//         Project.loadAll(JSON.parse(localStorage.rawData));
//         Project.renderProjects();
//
//       }else {
//         localStorage.etag = latestEtag;
//         $.getJSON('/Data/projects.json', function(data) {
//           //calling Project.LoadAll on data that we got from projects.json
//           Project.loadAll(data);
//           //storing stringifyed json data in local storage
//           localStorage.rawData = JSON.stringify(data);
//           Project.renderProjects();
//         });
//       }
//     }
//   });
// };

Project.fetchAll = function() {
  console.log("Hello");
  $.getJSON('Data/projects.json', function() {
    console.log("Hi there!");

  }).done(function(data){
    Project.loadAll(data);
    Project.renderProjects();
  }).error(function(data){
    console.log(data);
  });
};




//Calling all functions as soon as ready
$(document).ready(function(){
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.setTeasers();

});
