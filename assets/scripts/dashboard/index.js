'use strict';

var $ = require('jquery');
var projectsController = require('../projects/controller');

var showUpdateForm = function (event) {
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
};

var updateProjectHandler = function (event) {
  var $project = $(event.target).parent();
  var projectId = $(event.target).parent().data('id');
  projectsController.update(projectId, $project, function (project) {
    $project.find('.title.project-show').html('').append(project.title);
    $project.find('.imageURL_sm.project-show').html('').append(project.imageURL_sm);
    $project.find('.imageURL_lg.project-show').html('').append(project.imageURL_lg);
    $project.find('.siteURL.project-show').html('').append(project.siteURL);
    $project.find('.codeURL.project-show').html('').append(project.codeURL);
    $project.find('.description.project-show').html('').append(project.description);
    $project.find('.category.project-show').html('').append(project.category);

    $project.find('.edit-form').hide();
    $project.find('.project-show').show();
  });
};

var cancelUpdate = function (event) {
  event.preventDefault();
  var $project = $(this).closest('.entire-project');

  $project.find('.edit-form').hide();
  $project.find('.project-show').show();
};

var deleteProjectHandler = function (event) {
  event.preventDefault();
  var $project = $(event.target).parent().parent();
  var projectId = $(event.target).parent().data('id');

  projectsController.delete(projectId, function () {
    $project.remove();
  });
};

var init = function () {
  $('#cmsResults').on('click', '.project-update', showUpdateForm);
  $('#cmsResults').on('click', '#edit-project-submit', updateProjectHandler);
  $('#cmsResults').on('click', '#edit-project-cancel', cancelUpdate);
  $('#cmsResults').on('click', '.project-update-delete', deleteProjectHandler);
};

$(document).ready(init);
