'use strict';

// external modules
var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

// my modules
var server = require('./config').apiServer;
var authenticationController = require('./authentication/login');
var projectsController = require('./projects/controller');
var router = require('./router');

// templates
var renderProjectForm = require('./projects/create.handlebars');
var renderFooter = require('./components/footer.handlebars');
var renderHome = require('./projects/gallery.handlebars');

// modules evaluated for side-effects
require('./components/logo');
require('./components/login');
require('./dashboard/index');

var init = function () {
  projectsController.index();
  router.routeTo('home');
  $('#footerResults').html(renderFooter({
    isLoggedIn: authenticationController.loginStatus()
  }));
};

$(document).ready(function() {
  init();
  $('#projectForm').html(renderProjectForm());
  $('#js').on('click', function() {
    projectsController.filterByCategory('js');
  });
  $('#ruby').on('click', function() {
    projectsController.filterByCategory('ruby');
  });
  $('#all').on('click', function() {
    projectsController.index();
  });
});
