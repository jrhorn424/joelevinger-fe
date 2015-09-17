webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// external modules
	var $ = __webpack_require__(1);
	var simpleStorage = __webpack_require__(2);

	// my modules
	var server = __webpack_require__(3).apiServer;
	var authenticationController = __webpack_require__(4);
	var projectsController = __webpack_require__(5);
	var router = __webpack_require__(6);

	// templates
	var renderProjectForm = __webpack_require__(19);
	var renderFooter = __webpack_require__(20);
	var renderHome = __webpack_require__(16);

	// modules evaluated for side-effects
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(27);

	var init = function () {
	  projectsController.index();
	  router.routeTo('home');
	  $('#footerResults').html(renderFooter({
	    isLoggedIn: authenticationController.loginStatus()
	  }));
	};

	$(document).ready(function() {
	  init();
	  $('#projectForm').html(renderProjectForm());
	  $('#js').on('click', function() {
	    projectsController.filterByCategory('js');
	  });
	  $('#ruby').on('click', function() {
	    projectsController.filterByCategory('ruby');
	  });
	  $('#all').on('click', function() {
	    projectsController.index();
	  });
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  apiServer: 'https://glacial-wildwood-4209.herokuapp.com/'
	  // apiServer: '//localhost:3000'
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var simpleStorage = __webpack_require__(2);

	var apiServer = __webpack_require__(3).apiServer;

	var controller = {};

	controller.login = function(credentials, callback) {
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

	controller.logout = function () {
	  if (simpleStorage.get('token')) {
	    simpleStorage.deleteKey('token');
	  }
	};

	controller.loginStatus = function () {
	  if (simpleStorage.get('token')) {
	    return true;
	  } else {
	    return false;
	  }
	};

	module.exports = controller;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var simpleStorage = __webpack_require__(2);

	var apiServer = __webpack_require__(3).apiServer;
	var router = __webpack_require__(6);

	var renderCms = __webpack_require__(7);
	var renderHome = __webpack_require__(16);
	var renderProjects = __webpack_require__(17);
	var renderProject = __webpack_require__(18);

	var controller = {};

	controller.index = function() {
	  $.ajax({
	    url: apiServer + '/projects/',
	    method: 'GET'
	  }).done(function(response){
	    $('#cmsResults').html(renderCms(response));
	    $('#homepageResults').html(renderHome(response));
	    controller.show();
	  }).fail(function(err){
	    console.error(err);
	  });
	};

	controller.filterByCategory = function (category) {
	  $.ajax({
	    url: apiServer + '/projects/',
	    method: 'GET'
	  }).done(function(response){
	    var categoryProjects = $.grep(response.projects, function(e) { return e.category === category; });
	    $('#homepageResults').html(renderHome({
	      projects: categoryProjects
	    }));
	  }).fail(function(err){
	    console.error(err);
	  });
	};

	controller.show = function() {
	  $('#homepageResults').on('click', '.showOneProject', function() {
	    $.ajax({
	      url: apiServer + '/projects/' + $(this).data('id'),
	      method: 'GET',
	      headers: {
	        Authorization: 'Token token=' + simpleStorage.get('token')
	      }
	    }).done(function(response){
	      $('#showpageResults').html(renderProject(response.project));
	      router.routeTo('project');
	    }).fail(function(err){
	      console.error(err);
	    });
	  });
	};

	controller.create = function() {
	  $.ajax(apiServer + '/projects/', {
	    contentType: 'application/json',
	    processData: false,
	    data: JSON.stringify({
	      project: {
	        imageURL_sm: $('#project-imageURL_sm').val(),
	        imageURL_lg: $('#project-imageURL_lg').val(),
	        title: $('#project-title').val(),
	        siteURL: $('#project-siteURL').val(),
	        codeURL: $('#project-codeURL').val(),
	        description: $('#project-description').val(),
	        category: $('#project-category').val(),
	      }
	    }),
	    dataType: 'json',
	    method: 'POST',
	    headers: {
	      Authorization: 'Token token=' + simpleStorage.get('token')
	    }
	  }).done(function(response){
	    $('#appended-projects').append(renderProjects(response.project));
	    $('#projectForm').children('input').val('');
	    $('#projectForm').children('textarea').val('');
	  }).fail(function(jqxhr){
	    console.error(jqxhr);
	  });
	};

	controller.update = function (id, $project, success) {
	  $.ajax(apiServer + '/projects/' + id, {
	    contentType: 'application/json',
	    processData: false,
	    method: 'PUT',
	    data: JSON.stringify({
	      project: {
	        title: $project.find('.edit-project-title').val(),
	        imageURL_sm: $project.find('.edit-project-imageURL_sm').val(),
	        imageURL_lg: $project.find('.edit-project-imageURL_lg').val(),
	        siteURL: $project.find('.edit-project-siteURL').val(),
	        codeURL: $project.find('.edit-project-codeURL').val(),
	        description: $project.find('.edit-project-description').val(),
	        category: $project.find('.edit-project-category').val()
	      }
	    }),
	    headers: {
	      Authorization: 'Token token=' + simpleStorage.get('token')
	    }
	  }).done(function(data){
	    var project = data.project;
	    success(project);
	  }).fail(function(jqxhr){
	    console.error(jqxhr);
	  });
	};

	controller.delete = function (id, success) {
	  $.ajax(apiServer + '/projects/' + id, {
	    contentType: 'application/json',
	    processData: false,
	    method: 'DELETE',
	    headers: {
	      Authorization: 'Token token=' + simpleStorage.get('token')
	    }
	  }).done(function() {
	    success();
	  }).fail(function(jqxhr) {
	    console.error(jqxhr);
	  });
	};

	$(document).ready(function () {
	  $('#projectForm').on('click', '#project-submit', controller.create);
	});

	module.exports = controller;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "  <div class=\"entire-project\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\n    <p>\n      <span>TITLE: </span>\n      <span class=\"project title project-show\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"title\" type=\"text\" class=\"edit-form edit-project-title\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>CATEGORY: </span>\n      <span class=\"category project-show\">"
	    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"category\" type=\"text\" class=\"edit-form edit-project-category\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>SMALL IMAGE: </span>\n      <span class=\"imageURL_sm project-show\">"
	    + alias3(((helper = (helper = helpers.imageURL_sm || (depth0 != null ? depth0.imageURL_sm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_sm","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"imageURL_sm\" type=\"text\" class=\"edit-form edit-project-imageURL_sm\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>LARGE IMAGE: </span>\n      <span class=\"imageURL_lg project-show\">"
	    + alias3(((helper = (helper = helpers.imageURL_lg || (depth0 != null ? depth0.imageURL_lg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_lg","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"imageURL_lg\" type=\"text\" class=\"edit-form edit-project-imageURL_lg\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>WEBSITE: </span>\n      <span class=\"siteURL project-show\">"
	    + alias3(((helper = (helper = helpers.siteURL || (depth0 != null ? depth0.siteURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"siteURL","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"siteURL\" type=\"text\" class=\"edit-form edit-project-siteURL\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>CODE REPO: </span>\n      <span class=\"codeURL project-show\">"
	    + alias3(((helper = (helper = helpers.codeURL || (depth0 != null ? depth0.codeURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"codeURL","hash":{},"data":data}) : helper)))
	    + "</span>\n      <input name=\"codeURL\" type=\"text\" class=\"edit-form edit-project-codeURL\" style=\"display:none;\">\n    </p>\n    <p class=\"indent\">\n      <span>DESCRIPTION: </span>\n      <span class=\"description project-show\">"
	    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
	    + "</span>\n      <textarea class=\"edit-form edit-project-description\" style=\"display:none;\"></textarea>\n    </p>\n    <button id=\"edit-project-submit\" style=\"display: none;\" class=\"indent edit-form\">Submit Edits</button>\n    <button id=\"edit-project-cancel\" style=\"display: none;\" class=\"indent edit-form\">Cancel</button>\n    <a id=\"project-update\" class=\"project-update\" href=\"#\">\n      <p class=\"indent displayDeleteUpdateLinks project-show\">edit</p>\n    </a>\n    <a data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\"class=\"project-update-delete\" href=\"#\">\n      <p class=\"indent displayDeleteUpdateLinks project-show\">delete</p>\n    </a>\n  </div>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "<div id=\"appended-projects\">\n  <p class=\"centerHeader\">Projects</p>\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true});

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "  <div class=\"entire-homepage-project\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\n    <a href=\"#\" id=\"project"
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" class=\"showOneProject\">\n      <p class=\"nospace imageborder\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\n        <img class=\"image\" src=\"http://joelevinger.s3-us-west-2.amazonaws.com/"
	    + alias3(((helper = (helper = helpers.imageURL_sm || (depth0 != null ? depth0.imageURL_sm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_sm","hash":{},"data":data}) : helper)))
	    + "\">\n      </p>\n    </a>\n  </div>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "<div id=\"homepage-projects\" class=\"container\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "<div class=\"entire-project\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">\n  <p class=\"project title project-show\" data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"title\" type=\"text\" class=\"edit-form edit-project-title\" style=\"display:none;\">\n  <p class=\"indent category project-show\">"
	    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"category\" type=\"text\" class=\"edit-form edit-project-category\" style=\"display:none;\">\n  <p class=\"indent imageURL_sm project-show\">"
	    + alias3(((helper = (helper = helpers.imageURL_sm || (depth0 != null ? depth0.imageURL_sm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_sm","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"imageURL_sm\" type=\"text\" class=\"edit-form edit-project-imageURL_sm\" style=\"display:none;\">\n  <p class=\"indent imageURL_lg project-show\">"
	    + alias3(((helper = (helper = helpers.imageURL_lg || (depth0 != null ? depth0.imageURL_lg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_lg","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"imageURL_lg\" type=\"text\" class=\"edit-form edit-project-imageURL_lg\" style=\"display:none;\">\n  <p class=\"indent siteURL project-show\">"
	    + alias3(((helper = (helper = helpers.siteURL || (depth0 != null ? depth0.siteURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"siteURL","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"siteURL\" type=\"text\" class=\"edit-form edit-project-siteURL\" style=\"display:none;\">\n  <p class=\"indent codeURL project-show\">"
	    + alias3(((helper = (helper = helpers.codeURL || (depth0 != null ? depth0.codeURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"codeURL","hash":{},"data":data}) : helper)))
	    + "</p>\n  <input name=\"codeURL\" type=\"text\" class=\"edit-form edit-project-codeURL\" style=\"display:none;\">\n  <p class=\"indent description project-show\">"
	    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
	    + "</p>\n  <textarea class=\"edit-form edit-project-description\" style=\"display:none;\"></textarea>\n  <button id=\"edit-project-submit\" style=\"display: none;\" class=\"edit-form\">Submit Edits</button>\n  <button id=\"edit-project-cancel\" style=\"display: none;\" class=\"edit-form\">Cancel</button>\n  <a class=\"project-update\" href=\"#\">\n    <p class=\"indent displayDeleteUpdateLinks project-show\">edit</p>\n  </a>\n  <a data-id=\""
	    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" class=\"project-update-delete\" href=\"#\">\n    <p class=\"indent displayDeleteUpdateLinks project-show\">delete</p>\n  </a>\n</div>\n";
	},"useData":true});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "<div id=\"showpage-project\">\n  <p class=\"detailtitle\">"
	    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</p>\n  <p><img class=\"showimg\" src=\"http://joelevinger.s3-us-west-2.amazonaws.com/"
	    + alias3(((helper = (helper = helpers.imageURL_lg || (depth0 != null ? depth0.imageURL_lg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"imageURL_lg","hash":{},"data":data}) : helper)))
	    + "\"></p>\n  <p><span class=\"bold\">Website: </span><a href=\""
	    + alias3(((helper = (helper = helpers.siteURL || (depth0 != null ? depth0.siteURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"siteURL","hash":{},"data":data}) : helper)))
	    + "\" class=\"sitelinks\" target=\"_blank\">"
	    + alias3(((helper = (helper = helpers.siteURL || (depth0 != null ? depth0.siteURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"siteURL","hash":{},"data":data}) : helper)))
	    + "</a></p>\n  <p><span class=\"bold\">Code Repo: </span><a href=\""
	    + alias3(((helper = (helper = helpers.codeURL || (depth0 != null ? depth0.codeURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"codeURL","hash":{},"data":data}) : helper)))
	    + "\" class=\"sitelinks\" target=\"_blank\">"
	    + alias3(((helper = (helper = helpers.codeURL || (depth0 != null ? depth0.codeURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"codeURL","hash":{},"data":data}) : helper)))
	    + "</a></p>\n  <p class=\"detailcontainer\">"
	    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</p>\n</div>\n";
	},"useData":true});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<p class=\"centerHeader\">Submit a project</p>\n<label for=\"title\">TITLE:</label>\n<input type=\"text\" name=\"title\" class=\"projectForm\" id =\"project-title\">\n<label for=\"category\">CATEGORY:</label>\n<input type=\"text\" name=\"category\" class=\"projectForm\" id =\"project-category\">\n<label for=\"imageURL_sm\">SMALL IMAGE URL:</label>\n<input type=\"text\" name=\"imageURL_sm\" class=\"projectForm\" id =\"project-imageURL_sm\">\n<label for=\"imageURL_lg\">LARGE IMAGE URL:</label>\n<input type=\"text\" name=\"imageURL_lg\" class=\"projectForm\" id =\"project-imageURL_lg\">\n<label for=\"siteURL\">SITE URL:</label>\n<input type=\"text\" name=\"siteURL\" class=\"projectForm\" id =\"project-siteURL\">\n<label for=\"codeURL\">CODE URL:</label>\n<input type=\"text\" name=\"codeURL\" class=\"projectForm\" id =\"project-codeURL\">\n<label for=\"body\">DESCRIPTION:</label>\n<textarea rows=\"4\" cols=\"50\" name=\"description\" class=\"projectForm\" id=\"project-description\"></textarea>\n<button id=\"project-submit\">Submit</button>\n<p class=\"whitespace\"></p>\n";
	},"useData":true});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return "<button id=\"logout-button\">logout</button>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isLoggedIn : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "<a id=\"login-button\" class=\"nodecoration\" href=\"#\">&copy;</a>\nJoe Levinger 2015\n";
	},"useData":true});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);

	var router = __webpack_require__(6);

	var init = function () {
	  $('#logo').on('click', function() {
	    router.routeTo('home');
	  });
	};

	$(document).ready(init);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var simpleStorage = __webpack_require__(2);

	var router = __webpack_require__(6);
	var projectsController = __webpack_require__(5);
	var authenticationController = __webpack_require__(4);

	var renderLogin = __webpack_require__(23);
	var renderFooter = __webpack_require__(20);

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


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<p>Please log in:</p>\n<div>\n  <label for=\"emailLogin\">Email:</label>\n  <input type=\"text\" name=\"email\" id=\"email\">\n</div>\n<div>\n  <label for=\"password\">Password:</label>\n  <input type=\"password\" name=\"password\" id=\"password\">\n</div>\n<button class=\"login\" id=\"login\">Submit</button>\n";
	},"useData":true});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var projectsController = __webpack_require__(5);

	var showUpdateForm = function (event) {
	  event.preventDefault();
	  var $project = $(this).closest('.entire-project');
	  $project.find('.edit-form').show();
	  $project.find('.edit-project-title').val($project.find('.title').text());
	  $project.find('.edit-project-imageURL_sm').val($project.find('.imageURL_sm').text());
	  $project.find('.edit-project-imageURL_lg').val($project.find('.imageURL_lg').text());
	  $project.find('.edit-project-siteURL').val($project.find('.siteURL').text());
	  $project.find('.edit-project-codeURL').val($project.find('.codeURL').text());
	  $project.find('.edit-project-description').val($project.find('.description').text());
	  $project.find('.edit-project-category').val($project.find('.category').text());
	  $project.find('.project-show').hide();
	};

	var updateProjectHandler = function (event) {
	  var $project = $(event.target).parent();
	  var projectId = $(event.target).parent().data('id');
	  projectsController.update(projectId, $project, function (project) {
	    $project.find('.title.project-show').html('').append(project.title);
	    $project.find('.imageURL_sm.project-show').html('').append(project.imageURL_sm);
	    $project.find('.imageURL_lg.project-show').html('').append(project.imageURL_lg);
	    $project.find('.siteURL.project-show').html('').append(project.siteURL);
	    $project.find('.codeURL.project-show').html('').append(project.codeURL);
	    $project.find('.description.project-show').html('').append(project.description);
	    $project.find('.category.project-show').html('').append(project.category);

	    $project.find('.edit-form').hide();
	    $project.find('.project-show').show();
	  });
	};

	var cancelUpdate = function (event) {
	  event.preventDefault();
	  var $project = $(this).closest('.entire-project');

	  $project.find('.edit-form').hide();
	  $project.find('.project-show').show();
	};

	var deleteProjectHandler = function (event) {
	  event.preventDefault();
	  var $project = $(event.target).parent().parent();
	  var projectId = $(event.target).parent().data('id');

	  projectsController.delete(projectId, function () {
	    $project.remove();
	  });
	};

	var init = function () {
	  $('#cmsResults').on('click', '.project-update', showUpdateForm);
	  $('#cmsResults').on('click', '#edit-project-submit', updateProjectHandler);
	  $('#cmsResults').on('click', '#edit-project-cancel', cancelUpdate);
	  $('#cmsResults').on('click', '.project-update-delete', deleteProjectHandler);
	};

	$(document).ready(init);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);

	var router = __webpack_require__(6);

	var renderAbout = __webpack_require__(26);

	var init = function () {
	  $('#about').on('click', function() {
	    $('#aboutResults').html(renderAbout());
	    router.routeTo('about');
	  });
	};

	$(document).ready(init);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<div class=\"contentwrapper\">\n  <p class=\"centerHeader\">About Me</p>\n  <p><img class=\"right imagenolink\" src=\"http://joelevinger.s3-us-west-2.amazonaws.com/images/joe.jpg\" alt=\"\">Husband, Dad, Photographer, Hammered Dulcimer Player, Aspiring Web Developer...</p>\n  <p>After graduating from music school, I started my career as a software developer, programming in 3rd generation languages. Four years and two promotions later, though, I decided that it was time to pursue other interests. Then, in 2001, I jumped on the dot com bandwagon, went to web design school, and launched my own freelance web design business, which I have continued to this day.</p>\n  <p>As Ruby on Rails began to become more and more commonly used, though, it seemed only natural to learn a bit more about this relatively new technology. I started my Rails journey by completing an online Ruby on Rails bootcamp run by <a href=\"http://www.gotealeaf.com/\" class=\"sitelinks\" target=\"_blank\">Tealeaf Academy</a>, and branched out into JavaScript at <a href=\"https://generalassemb.ly/boston\" class=\"sitelinks\" target=\"_blank\">General Assembly</a>, in order to further hone my skills, ultimately combining my programming and web design backgrounds into a new career as a full-stack junior web developer.</p>\n  <p>While at Tealeaf, I created <a href=\"http://www.joelevingerblog.com\" class=\"sitelinks\" target=\"_blank\">a Ruby on Rails blog</a> as both a means of reinforcing the material I learned and as an <span class=\"italic\">aide memoire</span> as well. Perhaps it will be of use to those of you who are beginning your Rails journey. Some of my posts:</p>\n  <ul>\n    <li><a href=\"http://joelevingerblog.com/week-16creating-a-webhook-and-acceptance-behavior-driven-development/\" class=\"sitelinks\" target=\"_blank\">Creating a Webhook and BDD</a></li>\n    <li><a href=\"http://joelevingerblog.com/week-15beyond-mvc-creating-decorators-and-service-objects-and-mocks-stubs/\" class=\"sitelinks\" target=\"_blank\">Beyond MVC, Creating Decorators and Service Objects, and Mocks &amp; Stubs</a></li>\n    <li><a href=\"http://joelevingerblog.com/week-14separating-actors-file-uploading-and-credit-card-processing/\" class=\"sitelinks\" target\"=_blank\">Separating Actors, File Uploading, and Credit Card Processing</a></li>\n    <li><a href=\"http://joelevingerblog.com/week-13concerns-sidekiq-and-unicorn/\" class=\"sitelinks\" target=\"_blank\">Concerns, Sidekiq, and Unicorn</a></li>\n  </ul>\n</div>\n";
	},"useData":true});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);

	var router = __webpack_require__(6);

	var renderContact = __webpack_require__(28);

	var init = function () {
	  $('#contact').on('click', function() {
	    $('#contactResults').html(renderContact());
	    router.routeTo('contact');
	  });
	};

	$(document).ready(init);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(8);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<div class=\"centerpage\">\n  <p class=\"centerHeader\">Contact Me</p>\n  <p>Want to learn more about me?  Here's how:</p>\n  <p>\n    <a href=\"https://github.com/jlevinger/\" class=\"sitelinks\" target=\"_blank\">GitHub</a>\n  </p>\n  <p>\n    <a href=\"http://www.joelevingerblog.com/documents/resume.pdf\" class=\"sitelinks\" target=\"_blank\">R&eacute;sum&eacute;</a>\n  </p>\n  <p>\n    <a href=\"http://www.linkedin.com/in/joelevinger\" class=\"sitelinks\" target=\"_blank\">LinkedIn</a>\n  </p>\n  <p>\n    <a href=\"http://www.joelevingerblog.com/\" class=\"sitelinks\" target=\"_blank\">Ruby on Rails Blog</a>\n  </p>\n  <p class=\"whitespace\"></p>\n  <p>Or, just <a href=\"mailto:joe@joelevinger.com\" class=\"sitelinks\">send me an email!</a></p>\n</div>\n";
	},"useData":true});

/***/ }
]);