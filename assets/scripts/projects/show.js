'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var apiServer = require('../config').apiServer;
var renderProject = require('../../templates/project.handlebars');
var router = require('../router');

// TODO: fix document ready inside modules
var show = function() {
  $('#homepageResults').on('click', '.showOneProject', function() {
    console.log('in the AJAX call to retrieve one project');
    $.ajax({
      url: apiServer + '/projects/' + $(this).data('id'),
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function(response){
      $('#showpageResults').html(renderProject(response));
      router.routeTo('project');
    }).fail(function(err){
      console.error(err);
    });
  });
};

module.exports = show;
