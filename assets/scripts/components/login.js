'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var router = require('../router');
var projectsController = require('../projects/controller');
var authenticationController = require('../authentication/login');

var renderLogin = require('./login.handlebars');

var submitLogin = function () {
   var credentials = {
    credentials: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  };
  authenticationController.login(credentials, function(err, data) {
    if (err) {
      return alert('Check your input values.');
    }
    simpleStorage.set('token', data.token);
    projectsController.index();
    router.routeTo('cms');
  });
};

var toggleLogin = function () {
  if (simpleStorage.get('token')) {
    router.routeTo('cms');
  } else {
    $('#loginpage').html(renderLogin());
    router.routeTo('login');
  }
};

var init = function () {
  $('#login-button').on('click', toggleLogin);

  $('#loginpage').on('click', '#login', submitLogin);

  $('#logout-button').on('click', function (event) {
    event.preventDefault();
    authenticationController.logout();
    router.routeTo('home');
  });
};

$(document).ready(init);

// if logged on
//   show CMS view
//   turn the login button into a logoff button
// else
//   show login view
//   turn the logoff button into a login button
