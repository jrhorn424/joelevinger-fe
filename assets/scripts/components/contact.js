'use strict';

var $ = require('jquery');

var router = require('../router');

var renderContact = require('./contact.handlebars');

var init = function () {
  $('#contact').on('click', function() {
    $('#contactResults').html(renderContact());
    router.routeTo('contact');
  });
};

$(document).ready(init);
