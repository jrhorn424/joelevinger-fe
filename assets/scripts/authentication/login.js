'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var apiServer = require('../config').apiServer;

var controller = {};

controller.login = function(credentials, callback) {
  $.ajax(apiServer + '/login', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify(credentials),
    dataType: 'json',
    method: 'POST'
  }).done(function(data) {
    callback(null, data);
  }).fail(function(jqxhr) {
    callback(jqxhr);
  });
};

controller.logout = function () {
  if (simpleStorage.get('token')) {
    simpleStorage.deleteKey('token');
  }
};

controller.loginStatus = function () {
  if (simpleStorage.get('token')) {
    return true;
  } else {
    return false;
  }
};

module.exports = controller;
