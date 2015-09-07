'use strict';

var View = (function(){
  var _cmsIndex = Handlebars.compile($('#cms-template').html());
  var _homepageIndex = Handlebars.compile($('#homepage-template').html());

  // var _projects = Handlebars.compile($('#projects-template').html());

  return {
    cmsIndexHTML : _cmsIndex,
    homepageIndexHTML : _homepageIndex,
    // projectsHTML : _projects
  };
})();
