'use strict';

var server = '//localhost:3000';
// var server = 'https://production_server_goes_here';

//////////////////////////////////////////////
// BEGIN: document.ready
//////////////////////////////////////////////

$(document).ready(function() {
  showPage.homePage();

//////////////////////////////////////////////
// BEGIN: page load handlers
//////////////////////////////////////////////

$('#login-button').on('click', function(event) {
  showPage.loginPage();
});

//////////////////////////////////////////////
// END: page load handlers
//////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN: click handlers
//////////////////////////////////////////////

$('#login').on('click', function() {
  login();
  getProjects();
  showPage.cmsPage();
});

$('#project-submit').on('click', function() {
  createProject();
});

//////////////////////////////////////////////
// END: click handlers
//////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN: delete a project
//////////////////////////////////////////////

$('#cmsResults').on('click', '.project-update-delete', function(event) {
  event.preventDefault();
  console.log('in the delete function');
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
  $project.find('.project-show').hide();
});

//////////////////////////////////////////////
// END: hitting the edit button
//////////////////////////////////////////////
