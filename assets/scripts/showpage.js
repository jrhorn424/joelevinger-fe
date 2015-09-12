'use strict';

var showPage = (function() {
  return {
    homePage: function() {
      event.preventDefault();
      $('#homepage').show();
      $('#loginpage').hide();
      $('#cmspage').hide();
      $('#detailpage').hide();
      $('#aboutmepage').hide();
      $('#contactmepage').hide();
    },
    loginPage: function() {
      event.preventDefault();
      $('#loginpage').show();
      $('#homepage').hide();
      $('#cmspage').hide();
      $('#detailpage').hide();
      $('#aboutmepage').hide();
      $('#contactmepage').hide();
    },
    cmsPage: function() {
      event.preventDefault();
      $('#cmspage').show();
      $('#loginpage').hide();
      $('#homepage').hide();
      $('#detailpage').hide();
      $('#aboutmepage').hide();
      $('#contactmepage').hide();
    },
    detailPage: function() {
      event.preventDefault();
      $('#detailpage').show();
      $('#cmspage').hide();
      $('#loginpage').hide();
      $('#homepage').hide();
      $('#aboutmepage').hide();
      $('#contactmepage').hide();
    },
    aboutMePage: function() {
      event.preventDefault();
      $('#aboutmepage').show();
      $('#cmspage').hide();
      $('#loginpage').hide();
      $('#homepage').hide();
      $('#detailpage').hide();
      $('#contactmepage').hide();
    },
    contactMePage: function() {
      event.preventDefault();
      $('#contactmepage').show();
      $('#cmspage').hide();
      $('#loginpage').hide();
      $('#homepage').hide();
      $('#detailpage').hide();
      $('#aboutmepage').hide();
    }
  };
})();
