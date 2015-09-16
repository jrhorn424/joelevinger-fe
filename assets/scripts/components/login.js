'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var router = require('../router');
var projectsController = require('../projects/controller');
var authenticationController = require('../authentication/login');

var renderLogin = require('./login.handlebars');
var renderFooter = require('./footer.handlebars');

var toggleLogin = function () {
  if (authenticationController.loginStatus()) {
    router.routeTo('cms');
  } else {
    $('#loginpage').html(renderLogin());
    router.routeTo('login');
  }
  $('#footerResults').html(renderFooter({
    isLoggedIn: authenticationController.loginStatus()
  }));
};

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
    toggleLogin();
  });
};

var logout = function (event) {
  event.preventDefault();
  authenticationController.logout();
  toggleLogin();
  router.routeTo('home');
};

var init = function () {
  $('#footerResults').on('click', '#login-button', toggleLogin);

  $('#loginpage').on('click', '#login', submitLogin);

  $('#footerResults').on('click', '#logout-button', logout);
};

$(document).ready(init);

// if logged on
//   show CMS view
//   turn the login button into a logoff button
// else
//   show login view
//   turn the logoff button into a login button
