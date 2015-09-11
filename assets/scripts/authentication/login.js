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


// TODO integrate these click handlers
  // $('#login').on('click', function() {
  //   var credentials = {
  //     credentials: {
  //       email: $('#email').val(),
  //       password: $('#password').val()
  //     }
  //   };
  //   login(credentials, function(err, data) {
  //     if (err) {
  //       return alert('Check your input values.');
  //     }
  //     simpleStorage.set('token', data.token);
  //     console.log('token = ' + data.token);
  //     getProjects();
  //     router.routeTo('cms');
  //   });
  // });
