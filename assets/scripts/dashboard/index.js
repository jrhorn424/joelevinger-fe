'use strict';

var $ = require('jquery');
var projectsController = require('../projects/controller');

var deleteProjectHandler = function (event) {
  event.preventDefault();
  var $project = $(event.target).parent().parent();
  var projectId = $(event.target).parent().data('id');

  projectsController.delete(projectId, function () {
    $project.remove();
  });
};

var init = function () {
  $('#cmsResults').on('click', '.project-update-delete', deleteProjectHandler);
};

$(document).ready(init);
