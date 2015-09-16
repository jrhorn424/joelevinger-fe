'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var apiServer = require('../config').apiServer;
var getProject = require('./show');
var router = require('../router');

var renderCms = require('../dashboard/list.handlebars');
var renderHome = require('./gallery.handlebars');
var renderProjects = require('../dashboard/project.handlebars');
var renderProject = require('../projects/detail.handlebars');

var controller = {};

controller.index = function() {
  $.ajax({
    url: apiServer + '/projects/',
    method: 'GET'
  }).done(function(response){
    $('#cmsResults').html(renderCms(response));
    $('#homepageResults').html(renderHome(response));
    controller.show();
  }).fail(function(err){
    console.error(err);
  });
};

controller.filterByCategory = function (category) {
  $.ajax({
    url: apiServer + '/projects/',
    method: 'GET'
  }).done(function(response){
    var categoryProjects = $.grep(response.projects, function(e) { return e.category === category; });
    $('#homepageResults').html(renderHome({
      projects: categoryProjects
    }));
  }).fail(function(err){
    console.error(err);
  });
};

controller.show = function() {
  $('#homepageResults').on('click', '.showOneProject', function() {
    $.ajax({
      url: apiServer + '/projects/' + $(this).data('id'),
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function(response){
      $('#showpageResults').html(renderProject(response.project));
      router.routeTo('project');
    }).fail(function(err){
      console.error(err);
    });
  });
};

controller.create = function() {
  $.ajax(apiServer + '/projects/', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      project: {
        imageURL_sm: $('#project-imageURL_sm').val(),
        imageURL_lg: $('#project-imageURL_lg').val(),
        title: $('#project-title').val(),
        siteURL: $('#project-siteURL').val(),
        codeURL: $('#project-codeURL').val(),
        description: $('#project-description').val(),
        category: $('#project-category').val(),
      }
    }),
    dataType: 'json',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function(response){
    $('#appended-projects').append(renderProjects(response.project));
    $('#projectForm').children('input').val('');
    $('#projectForm').children('textarea').val('');
  }).fail(function(jqxhr){
    console.error(jqxhr);
  });
};

controller.update = function (id, $project, success) {
  $.ajax(apiServer + '/projects/' + id, {
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
  }).done(function(data){
    var project = data.project;
    success(project);
  }).fail(function(jqxhr){
    console.error(jqxhr);
  });
};

controller.delete = function (id, success) {
  $.ajax(apiServer + '/projects/' + id, {
    contentType: 'application/json',
    processData: false,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function() {
    success();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

$(document).ready(function () {
  $('#projectForm').on('click', '#project-submit', controller.create);
});

module.exports = controller;
