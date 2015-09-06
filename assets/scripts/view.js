'use strict';

var View = (function(){
  var _cmsIndex = Handlebars.compile($('#cms-template').html());

  // var _projects = Handlebars.compile($('#projects-template').html());

  return {
    cmsIndexHTML : _cmsIndex
    // projectsHTML : _projects
  };
})();
