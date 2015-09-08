'use strict';

var showPage = (function() {
  return {
    homePage: function() {
      event.preventDefault();
      $('#homepage').show();
      $('#loginpage').hide();
      $('#cmspage').hide();
      $('#detailpage').hide();
    },
    loginPage: function() {
      event.preventDefault();
      $('#loginpage').show();
      $('#homepage').hide();
      $('#cmspage').hide();
      $('#detailpage').hide();
    },
    cmsPage: function() {
      event.preventDefault();
      $('#cmspage').show();
      $('#loginpage').hide();
      $('#homepage').hide();
      $('#detailpage').hide();
    },
    detailPage: function() {
      event.preventDefault();
      $('#detailpage').show();
      $('#cmspage').hide();
      $('#loginpage').hide();
      $('#homepage').hide();
    }
  };
})();
