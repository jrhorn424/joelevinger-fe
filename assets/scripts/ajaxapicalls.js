'use strict';

var login = function() {
  $.ajax(server + '/login', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      credentials: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr){
    simpleStorage.set('token', data.token);
    console.log('token = ' + data.token);
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('Check your input values.');
  });
};

var getProjects = function() {
  $.ajax({
    url: server + '/projects/',
    method: 'GET'
  }).done(function(response){
    console.log('projects = ' + response.projects);
    $('#cmsResults').html(View.cmsIndexHTML({projects: response.projects}));
  }).fail(function(error){
    console.log(error);
  });
};

var createProject = function() {
  console.log('in the create function');
  $.ajax(server + '/projects/', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      project: {
        imageURL_sm: $('#project-imageURL_sm').val(),
        imageURL_lg: $('#project-imageURL_lg').val(),
        title: $('#project-title').val(),
        siteURL: $('#project-siteURL').val(),
        codeURL: $('#project-codeURL').val(),
        description: $('#project-description').val()
      }
    }),
    dataType: 'json',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function(data, textStatus, jqxhr){
    var project = data.project;
    var template = Handlebars.compile($('#projects').html());
    var html = template({ project: project });
    $('#appended-projects').append(html);
    $('#projectForm').children('input').val('');
    $('#projectForm').children('textarea').val('');
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('Unable to create a project.');
  });
};
