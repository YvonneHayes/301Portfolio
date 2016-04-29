// (function(module){
//   var routes = {};
//
//   routes.setRouteMappings = function() {
//     page.base('/');
//     page('/', projectController.index);
//     page('about', aboutController.index);
//
//
//     page();
//   };
//
//   routes.setRouteMappings();
//
//   module.routes = routes; //making it global
//
// })(window);

// DONE: Configure routes for this app with page.js, by registering each URL your app can handle,
// linked to a a single controller function to handle it:
page('/', projectController.index);
page('/about', aboutController.index);

// DONE: Activate page.js!
page();
