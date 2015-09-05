'use strict';

var View = (function(){
  var _cmsIndex = Handlebars.compile($('#cms-template').html());

  return {
    cmsIndexHTML : _cmsIndex
  };
})();
