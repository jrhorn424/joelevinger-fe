'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var apiServer = require('../config').apiServer;

var login = function(credentials, callback) {
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

var resetSimpleStorage = function () {
  if (simpleStorage.get('token')) {
    simpleStorage.deleteKey('token');
  }
};

$(document).ready(resetSimpleStorage);

module.exports = login;
