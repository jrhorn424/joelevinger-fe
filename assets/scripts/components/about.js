'use strict';

var $ = require('jquery');

var router = require('../router');

var renderAbout = require('./about.handlebars');

var init = function () {
  $('#about').on('click', function() {
    $('#aboutResults').html(renderAbout());
    router.routeTo('about');
  });
};

$(document).ready(init);
