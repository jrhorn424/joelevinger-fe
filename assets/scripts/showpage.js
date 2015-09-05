'use strict';

var showPage = (function() {
  return {
    homePage: function() {
      event.preventDefault();
      $('#homepage').show();
      $('#loginpage').hide();
      $('#cmspage').hide();
    },
    loginPage: function() {
      event.preventDefault();
      $('#loginpage').show();
      $('#homepage').hide();
      $('#cmspage').hide();
    },
      cmsPage: function() {
      event.preventDefault();
      $('#cmspage').show();
      $('#loginpage').hide();
      $('#homepage').hide();
    }
  };
})();
