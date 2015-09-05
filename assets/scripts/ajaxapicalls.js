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
