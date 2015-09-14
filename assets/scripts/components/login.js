'use strict';

var $ = require('jquery');
var simpleStorage = require('simplestorage.js');

var login = require('../authentication/login');
var router = require('../router');
var projectsController = require('../projects/controller');

var renderLogin = require('./login.handlebars');

var submitLogin = function () {
   var credentials = {
    credentials: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  };
  login(credentials, function(err, data) {
    if (err) {
      return alert('Check your input values.');
    }
    simpleStorage.set('token', data.token);
    projectsController.index();
    router.routeTo('cms');
  });
};

var showLoginView = function (event) {
  event.preventDefault();
  router.routeTo('login');
};

var init = function () {
  $('#loginpage').html(renderLogin());
  $('#login-button').on('click', showLoginView);
  $('#loginpage').on('click', '#login', submitLogin);
};

$(document).ready(init);
