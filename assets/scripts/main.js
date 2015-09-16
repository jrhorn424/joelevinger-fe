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

// modules evaluated for side-effects
require('./components/logo');
require('./components/login');

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

//////////////////////////////////////////////
// BEGIN: delete a project
//////////////////////////////////////////////

  $('#cmsResults').on('click', '.project-update-delete', function(event) {
    event.preventDefault();
    var entireProjectElement = this.parentElement;
    $.ajax(server + '/projects/' + $(this).data('id'), {
      contentType: 'application/json',
      processData: false,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function() {
      $(entireProjectElement).remove();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      alert('Unable to delete a project.');
    });
  });

//////////////////////////////////////////////
// END: delete a project
//////////////////////////////////////////////

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
// BEGIN: hitting the update's submit button
//////////////////////////////////////////////

$('#cmsResults').on('click', '#edit-project-submit', function(event) {
  var $project = $(this).closest('.entire-project');
  $.ajax(server + '/projects/' + $project.data('id'), {
    contentType: 'application/json',
    processData: false,
    method: 'PUT',
    data: JSON.stringify({
      project: {
        title: $project.find('.edit-project-title').val(),
        imageURL_sm: $project.find('.edit-project-imageURL_sm').val(),
        imageURL_lg: $project.find('.edit-project-imageURL_lg').val(),
        siteURL: $project.find('.edit-project-siteURL').val(),
        codeURL: $project.find('.edit-project-codeURL').val(),
        description: $project.find('.edit-project-description').val(),
        category: $project.find('.edit-project-category').val()
      }
    }),
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function(data, textStatus, jqxhr){
    var project = data.project;
    $project.find('.title.project-show').html('').append(data.project.title);
    $project.find('.imageURL_sm.project-show').html('').append(data.project.imageURL_sm);
    $project.find('.imageURL_lg.project-show').html('').append(data.project.imageURL_lg);
    $project.find('.siteURL.project-show').html('').append(data.project.siteURL);
    $project.find('.codeURL.project-show').html('').append(data.project.codeURL);
    $project.find('.description.project-show').html('').append(data.project.description);
    $project.find('.category.project-show').html('').append(data.project.category);

    $project.find('.edit-form').hide();
    $project.find('.project-show').show();
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('Unable to update a project.');
  });
});

//////////////////////////////////////////////
// END: hitting the update's submit button
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
