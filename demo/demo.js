/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.github.com/users/c0/events', true);

	request.onload = function () {
	  if (this.status >= 200 && this.status < 400) {
	    console.log('AJAX data', JSON.parse(this.response));
	  } else {
	    // We reached our target server, but it returned an error
	  }
	};

	request.onerror = function () {
	  console.log('loading error');
	};

	request.send();

	// preload-json!
	(0, _index.subscribe)('githubEvents', function (d) {
	  console.log('my lib notified!', d);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var subscribers = {};
	var notifyQueue = {};

	function notify(name, data) {
	  var toNotify = subscribers[name] || [];
	  for (var i = 0, len = toNotify.length; i < len; i++) {
	    toNotify[i](data);
	  }
	  notifyQueue[name] = data;
	}

	function subscribe(name, callback) {
	  subscribers[name] = subscribers[name] || [];
	  subscribers[name].push(callback);

	  if (notifyQueue.hasOwnProperty(name)) {
	    callback(notifyQueue[name]);
	    delete notifyQueue[name];
	  }
	}

	function cmd(commandArgs) {
	  var _commandArgs = _slicedToArray(commandArgs, 3);

	  var action = _commandArgs[0];
	  var name = _commandArgs[1];
	  var args = _commandArgs[2];

	  if (action === 'notify') {
	    notify(name, args);
	  } else if (action === 'subscribe') {
	    subscribe(name, args);
	  }
	}

	function reset() {
	  subscribers = {};
	  notifyQueue = {};
	}

	function applyCommandQueue(scope) {
	  if (typeof scope.preloadJSON !== 'undefined') {
	    while (scope.preloadJSON.length) {
	      cmd(scope.preloadJSON.shift());
	    }
	  }
	}

	// Hookup to globals
	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	  applyCommandQueue(window);
	  window.preloadJSON = { push: cmd };
	}

	exports.default = {
	  cmd: cmd,
	  notify: notify,
	  subscribe: subscribe,
	  reset: reset,
	  applyCommandQueue: applyCommandQueue
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);