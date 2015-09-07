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
    alert('Unable to delete a comment.');
  });
});

//////////////////////////////////////////////
// END: delete a project
//////////////////////////////////////////////

});

//////////////////////////////////////////////
// END: document.ready
//////////////////////////////////////////////
