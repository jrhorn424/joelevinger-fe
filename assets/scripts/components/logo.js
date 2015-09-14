'use strict';

var $ = require('jquery');

var router = require('../router');

var init = function () {
  $('#logo').on('click', function() {
    router.routeTo('home');
  });
};

$(document).ready(init);
