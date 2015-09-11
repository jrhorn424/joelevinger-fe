'use strict';


var retrieveJavaScript = function() {
  $.ajax({
    url: server + '/projects/',
    method: 'GET'
  }).done(function(response){
    var js = $.grep(response.projects, function(e) { return e.category === 'js'; });
    console.log('projects = ' + js);
    $('#homepageResults').html(View.homepageIndexHTML({projects: js}));
  }).fail(function(error){
    console.log(error);
  });
};

var retrieveRuby = function() {
  $.ajax({
    url: server + '/projects/',
    method: 'GET'
  }).done(function(response){
    var ruby = $.grep(response.projects, function(e) { return e.category === 'ruby'; });
    console.log('projects = ' + ruby);
    $('#homepageResults').html(View.homepageIndexHTML({projects: ruby}));
  }).fail(function(error){
    console.log(error);
  });
};

