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

//////////////////////////////////////////////
// END: document.ready
//////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN: hitting the edit button
//////////////////////////////////////////////

$('#cmsResults').on('click', '.project-update', function(event) {
  event.preventDefault();
  var $project = $(this).closest('.entire-project');
  $project.find('.edit-form').show();
  $project.find('.edit-project-title').val($project.find('.title').text());
  $project.find('.edit-project-imageURL_sm').val($project.find('.imageURL_sm').text());
  $project.find('.edit-project-imageURL_lg').val($project.find('.imageURL_lg').text());
  $project.find('.edit-project-siteURL').val($project.find('.siteURL').text());
  $project.find('.edit-project-codeURL').val($project.find('.codeURL').text());
  $project.find('.edit-project-description').val($project.find('.description').text());
  $project.find('.edit-project-category').val($project.find('.category').text());
  $project.find('.project-show').hide();
});

//////////////////////////////////////////////
// END: hitting the edit button
//////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN: hitting the update's cancel button
//////////////////////////////////////////////

$('#cmsResults').on('click', '#edit-project-cancel', function(event) {
  event.preventDefault();
  var $project = $(this).closest('.entire-project');

  $project.find('.edit-form').hide();
  $project.find('.project-show').show();
});

//////////////////////////////////////////////
// END: hitting the update's cancel button
//////////////////////////////////////////////
