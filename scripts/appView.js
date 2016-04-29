(function(module) {

  var projectView = {};

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
    projectView.handleCategoryFilter();
    // projectView.handleMainNav();
    projectView.setTeasers();

  });



})(window);
