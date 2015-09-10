'use strict';

var $ = require('jquery');
var apiServer = require('../config').apiServer;
var renderCms = require('../../templates/cms.handlebars');
var renderHome = require('../../templates/home.handlebars');
var getProject = require('./show');

var index = function() {
  $.ajax({
    url: apiServer + '/projects/',
    method: 'GET'
  }).done(function(response){
    // TODO: use in-memory storage for project index
    $('#cmsResults').html(renderCms(response));
    $('#homepageResults').html(renderHome(response));
    getProject();
  }).fail(function(err){
    console.error(err);
  });
};

module.exports = index;
