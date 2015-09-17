'use strict';

var $ = require('jquery');

var router = {};

router.routeTo = function (view) {
  var routes = this.routes;
  var target = routes[view];

  var rest = Object.keys(routes).filter(function predicate (route) {
    return route !== view;
  });

  rest.forEach(function (view) {
    routes[view].hide();
  });

  target.show();
};

router.routes = {
  'home': $('#homepage'),
  'about': $('#aboutpage'),
  'contact': $('#contactpage'),
  'login': $('#loginpage'),
  'cms': $('#cmspage'),
  'project': $('#detailpage')
};

module.exports = router;
