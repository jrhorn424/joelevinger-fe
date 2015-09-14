'use strict';

var $ = require('jquery');

var getProjects = require('../projects/controller');
var router = require('../router');

var init = function () {
  $('#logo').on('click', function() {
    getProjects();
    router.routeTo('home');
  });
};

$(document).ready(init);
