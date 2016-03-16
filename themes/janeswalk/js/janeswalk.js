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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _I18nUtils = __webpack_require__(2);

	var _AreaActions = __webpack_require__(10);

	var AreaActions = _interopRequireWildcard(_AreaActions);

	var _UserActions = __webpack_require__(11);

	var UserActions = _interopRequireWildcard(_UserActions);

	var _WalkActions = __webpack_require__(12);

	var WalkActions = _interopRequireWildcard(_WalkActions);

	var _CityActions = __webpack_require__(13);

	var CityActions = _interopRequireWildcard(_CityActions);

	var _ItineraryActions = __webpack_require__(14);

	var ItineraryActions = _interopRequireWildcard(_ItineraryActions);

	var _Navbar = __webpack_require__(15);

	var _Navbar2 = _interopRequireDefault(_Navbar);

	var _CityStore = __webpack_require__(27);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _Itinerary = __webpack_require__(28);

	var ItineraryAPI = _interopRequireWildcard(_Itinerary);

	var _CreateWalk = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/CreateWalk.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _CreateWalk2 = _interopRequireDefault(_CreateWalk);

	var _Walk = __webpack_require__(30);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _Dashboard = __webpack_require__(44);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _Login = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/Login.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Let hitting 'm' make the menu pop up
	 */


	// React Views


	// Stores, for late-binding some page updates.
	// Not fully React, but we can use Flux for making PHP-rendered page updates too!
	function initKeyEvents() {
	  // Init keyboard shortcuts
	  var toolbar = document.getElementById('ccm-toolbar');
	  if (toolbar) {
	    window.addEventListener('keyup', function (ev) {
	      /* Don't capture inputs going into a form */
	      if (ev.target.tagName !== "INPUT") {
	        ev.preventDefault();
	        switch (String(ev.key || ev.keyCode && String.fromCharCode(ev.keyCode) || ev.char).toUpperCase()) {
	          case "M":
	            if (toolbar.style.display === 'block' || !toolbar.style.display) {
	              toolbar.style.display = 'none';
	            } else {
	              toolbar.style.display = 'block';
	            }
	            break;
	          default:
	            break;
	        }
	      }
	    });
	  }
	}

	// load modals
	/**
	 * Initialization code goes here. This is not to be a dumping ground for
	 * miscellaneous functions, and especially not a place to stick new global
	 * variables.
	 */
	// Translations for i18n L10n


	function renderGlobal() {
	  // Render our header first
	  var navbar = document.getElementById('navbar');
	  if (navbar) {
	    React.render(React.createElement(_Navbar2.default, null), navbar);
	  }

	  // Render modals we need on each page
	  React.render(React.createElement(_Login2.default, { socialLogin: (JanesWalk.stacks || { "Social Logins": "" })['Social Logins'] }), document.getElementById('modals'));
	}

	// Listen for JW events to load flux stores with
	function addFluxListeners() {
	  JanesWalk.event.on('area.receive', function (areas) {
	    return AreaActions.receive(areas);
	  });
	  JanesWalk.event.on('user.receive', function (user, options) {
	    return UserActions.receive(user, options);
	  });
	  JanesWalk.event.on('users.receive', function (users) {
	    return UserActions.receiveAll(users);
	  });
	  JanesWalk.event.on('walk.receive', function (walk) {
	    return WalkActions.receive(walk);
	  });
	  JanesWalk.event.on('walks.receive', function (walks) {
	    return WalkActions.receiveAll(walks);
	  });
	  JanesWalk.event.on('city.receive', function (city) {
	    return CityActions.receive(city);
	  });
	  JanesWalk.event.on('itineraries.receive', function (itineraries) {
	    return ItineraryActions.receiveAll(itineraries);
	  });
	}

	// Routes initialized by events
	function addRenderListeners() {
	  // A walk, e.g. /canada/toronto/curb-cuts-and-desire-lines
	  JanesWalk.event.on('walkpage.load', function (_ref) {
	    var walk = _ref.walk;
	    var city = _ref.city;

	    WalkActions.receive(walk);
	    React.render(React.createElement(_Walk2.default, { city: city, page: JanesWalk.page, walk: walk }), document.getElementById('page'));
	  });

	  // The profile page, e.g. /profile
	  JanesWalk.event.on('profilepage.load', function (props) {
	    React.render(React.createElement(_Dashboard2.default, props), document.getElementById('page'));
	  });

	  // Create a walk
	  JanesWalk.event.on('caw.load', function (props) {
	    React.render(React.createElement(_CreateWalk2.default, {
	      data: JanesWalk.walk.data,
	      city: JanesWalk.city,
	      user: JanesWalk.user,
	      url: JanesWalk.walk.url,
	      valt: JanesWalk.form.valt
	    }), document.getElementById('page'));
	  });
	}

	_CityStore2.default.addChangeListener(function () {
	  // Bind anything to render not using react
	  switch (document.body.dataset.pageviewname) {
	    case 'CityPageView':
	      var city = _CityStore2.default.getCity();
	      if (city) {
	        var bgUri = 'url(' + city.background + ')';
	        if (city.background && document.body.style.backgroundImage !== bgUri) {
	          document.body.style.backgroundImage = bgUri;
	        }
	      }
	      break;
	  }
	});

	document.addEventListener('DOMContentLoaded', function () {
	  // Load our translations upfront
	  (0, _I18nUtils.getTranslations)(JanesWalk.locale);

	  renderGlobal();
	  addFluxListeners();
	  addRenderListeners();

	  initKeyEvents();

	  // TODO: this could use a better home
	  ItineraryAPI.startPolling();

	  // Process all deferred events
	  JanesWalk.event.activate();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTranslations = getTranslations;

	var _I18nActions = __webpack_require__(3);

	var _I18nActions2 = _interopRequireDefault(_I18nActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Load translations file from JanesWalk
	 *
	 * @param object locale The locale definition, including name and url to messages
	 */
	function getTranslations(locale) {
	  // Check that we have a translations file set
	  if (locale && locale.translation) {
	    // Grab from session if we have it
	    var translation = window.sessionStorage.getItem('i18n_' + locale.name);
	    if (translation) {
	      _I18nActions2.default.receive(JSON.parse(translation).translations['']);
	    } else {
	      var xhr = new XMLHttpRequest();
	      xhr.open('get', locale.translation, true);
	      xhr.onload = function () {
	        var data = JSON.parse(this.responseText);

	        // Store with the session
	        window.sessionStorage.setItem('i18n_' + locale.name, this.responseText);

	        // Trigger i18n change on complete
	        _I18nActions2.default.receive(data.translations['']);
	      };
	      xhr.send();
	    }
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	// Load all loop data
	/**
	 * i18n Translations
	 *
	 * Translate text content into our available translations using
	 * the i18n standard.
	 */

	function receive(translations) {
	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.I18N_RECEIVE,
	    translations: translations
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.waitFor = exports.dispatch = exports.register2 = exports.register = undefined;

	var _flux = __webpack_require__(5);

	var AppDispatcher = new _flux.Dispatcher();
	var dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
	var register = AppDispatcher.register.bind(AppDispatcher);
	var waitFor = AppDispatcher.waitFor.bind(AppDispatcher);

	function register2(receivers, onComplete) {
	  return AppDispatcher.register(function (payload) {
	    if (payload.type in receivers) {
	      receivers[payload.type](payload);
	      if (onComplete) onComplete(payload);
	    }
	  });
	}

	exports.default = AppDispatcher;
	exports.register = register;
	exports.register2 = register2;
	exports.dispatch = dispatch;
	exports.waitFor = waitFor;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var invariant = __webpack_require__(8);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	}();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Basic constants for route app
	 */

	// The action names sent to the Dispatcher
	var ActionTypes = [
	// i18n translations
	'I18N_RECEIVE',

	// Walks
	'WALK_RECEIVE', 'WALK_RECEIVE_ALL', 'WALK_SAVE', 'WALK_PUBLISH',

	// City
	'CITY_RECEIVE',

	// Areas
	'AREA_RECEIVE',

	// Users
	'USER_RECEIVE', 'USER_RECEIVE_ALL',

	// Itineraries
	'ITINERARY_RECEIVE', 'ITINERARY_REMOVE_WALK', 'ITINERARY_ADD_WALK', 'ITINERARY_SCHEDULE_WALK', 'ITINERARY_UNSCHEDULE_WALK', 'ITINERARY_UPDATE_TITLE', 'ITINERARY_UPDATE_DESCRIPTION', 'ITINERARY_CREATE_LIST', 'ITINERARY_RECEIVE_ALL', 'ITINERARY_SYNC_START', 'ITINERARY_SYNC_END'].reduce(function (p, k) {
	  p[k] = k;return p;
	}, {});

	exports.ActionTypes = ActionTypes;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	// Load all loop data
	/**
	 * i18n Translations
	 *
	 * Translate text content into our available translations using
	 * the i18n standard.
	 */

	function receive(areas) {
	  Object.keys(areas).forEach(function (name) {
	    (0, _AppDispatcher.dispatch)({
	      type: _JWConstants.ActionTypes.AREA_RECEIVE,
	      name: name,
	      content: areas[name]
	    });
	  });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;
	exports.receiveAll = receiveAll;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	// Load all loop data
	/**
	 * User Actions
	 *
	 */

	function receive(user) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var current = opts.current;
	  var profile = opts.profile;

	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.USER_RECEIVE,
	    user: user,
	    current: current,
	    profile: profile
	  });
	}

	function receiveAll(users) {
	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.USER_RECEIVE_ALL,
	    users: users
	  });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;
	exports.receiveAll = receiveAll;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	// Load the walk
	function receive(walk) {
	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.WALK_RECEIVE,
	    walk: walk
	  });
	}

	function receiveAll(walks) {
	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.WALK_RECEIVE_ALL,
	    walks: walks
	  });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	// Load all loop data
	/**
	 * City Actions
	 *
	 */

	function receive(city) {
	  (0, _AppDispatcher.dispatch)({
	    type: _JWConstants.ActionTypes.CITY_RECEIVE,
	    city: city
	  });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.remove = remove;
	exports.add = add;
	exports.schedule = schedule;
	exports.unschedule = unschedule;
	exports.updateTitle = updateTitle;
	exports.updateDescription = updateDescription;
	exports.createList = createList;
	exports.receiveAll = receiveAll;
	exports.syncEnd = syncEnd;

	var _JWConstants = __webpack_require__(9);

	var _AppDispatcher = __webpack_require__(4);

	//TODO: API call before dispatch

	function remove(list, walk) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK, list: list, walk: walk });
	}

	function add(list, walk) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_ADD_WALK, list: list, walk: walk });
	}

	function schedule(walk, time) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_SCHEDULE_WALK, walk: walk, time: time });
	}

	function unschedule(walk, time) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_UNSCHEDULE_WALK, walk: walk, time: time });
	}

	function updateTitle(list, title) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_UPDATE_TITLE, title: title, list: list });
	}

	function updateDescription(list, description) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_UPDATE_DESCRIPTION, description: description, list: list });
	}

	function createList(title, description) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_CREATE_LIST, title: title, description: description });
	}

	function receiveAll(itineraries) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_RECEIVE_ALL, itineraries: itineraries });
	}

	function syncEnd(start) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_SYNC_END, start: start });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Itinerary = __webpack_require__(16);

	var _Itinerary2 = _interopRequireDefault(_Itinerary);

	var _AreaStore = __webpack_require__(17);

	var _AreaStore2 = _interopRequireDefault(_AreaStore);

	var _UserStore = __webpack_require__(20);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _ItineraryStore = __webpack_require__(21);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _dom = __webpack_require__(24);

	var _I18nStore = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// TODO: Replace translations placeholders


	var tc = function tc(c, s) {
	  return s;
	};

	/* Build menu options depending if currently logged in or not */
	var LoggedInOptions = function LoggedInOptions(_ref) {
	  var user = _ref.user;
	  var profiling = _ref.profiling;
	  var searching = _ref.searching;
	  var toggleProfile = _ref.toggleProfile;
	  var toggleSearch = _ref.toggleSearch;
	  var unseenUpdates = _ref.unseenUpdates;
	  return [React.createElement(
	    'li',
	    { key: 'in0' },
	    React.createElement(
	      'a',
	      { onClick: toggleSearch, className: searching ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-search' })
	    )
	  ), React.createElement(
	    'li',
	    { key: 'in1', className: unseenUpdates ? 'notify' : '' },
	    React.createElement(
	      'a',
	      { onClick: toggleProfile, className: profiling ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-calendar' })
	    )
	  ), React.createElement(
	    'li',
	    { key: 'in2' },
	    React.createElement(
	      'a',
	      { href: '/profile' },
	      user.firstName || user.name
	    )
	  ), React.createElement(
	    'li',
	    { key: 'in3' },
	    React.createElement(
	      'a',
	      { href: '/login/logout' },
	      (0, _I18nStore.t)('Logout')
	    )
	  )];
	};

	var LoggedOutOptions = function LoggedOutOptions(_ref2) {
	  var searching = _ref2.searching;
	  var toggleSearch = _ref2.toggleSearch;
	  return [React.createElement(
	    'li',
	    { key: 'out0' },
	    React.createElement(
	      'a',
	      { onClick: toggleSearch, className: searching ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-search' })
	    )
	  ), React.createElement(
	    'li',
	    { key: 'out1' },
	    React.createElement(
	      'a',
	      { href: '/register' },
	      tc('Register on a website', 'Join')
	    )
	  ), React.createElement(
	    'li',
	    { key: 'out2' },
	    React.createElement(
	      'a',
	      { onClick: function onClick() {
	          return $('#login').modal();
	        } },
	      (0, _I18nStore.t)('Log in')
	    )
	  )];
	};

	function getNavbar() {
	  return {
	    options: _AreaStore2.default.getArea('Left Header'),
	    dropdown: _AreaStore2.default.getArea('Dropdown'),
	    user: _UserStore2.default.getCurrent(),
	    itinerary: _ItineraryStore2.default.getLists(),
	    totalWalks: _ItineraryStore2.default.totalWalks()
	  };
	}

	/**
	 * Parse out some HTML, and add the built element after the ref
	 */
	function appendSiblings(html, refNode) {
	  var div = document.createElement('div');
	  div.innerHTML = html;

	  [].forEach.call(div.children, function (child) {
	    return refNode.parentNode.appendChild(child);
	  });
	}

	// The header menu

	var Navbar = function (_React$Component) {
	  _inherits(Navbar, _React$Component);

	  function Navbar() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Navbar);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Navbar)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.state = getNavbar();
	    _this.state.lastSize = _ItineraryStore2.default.totalWalks();
	    _this._onChange = _this._onChange.bind(_this);
	    return _this;
	  }

	  _createClass(Navbar, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _AreaStore2.default.addChangeListener(this._onChange);
	      _UserStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _AreaStore2.default.removeChangeListener(this._onChage);
	      _UserStore2.default.removeChangeListener(this._onChage);
	    }
	  }, {
	    key: '_onChange',
	    value: function _onChange() {
	      this.setState(getNavbar);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      appendSiblings(this.state.options, this.refs.topnav);
	      (0, _dom.makeSticky)(React.findDOMNode(this), this.refs.header);
	    }

	    /**
	     * Need to check if the HTML has updated, so we don't rebuild the DOM
	     */

	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, _ref3) {
	      var options = _ref3.options;
	      var dropdown = _ref3.dropdown;
	      var searching = _ref3.searching;

	      if (options && options !== this.state.options) {
	        appendSiblings(options, this.refs.topnav);
	      }

	      // See if we're opening the search
	      if (!this.state.searching && searching) {
	        this.openSearch();
	      }
	    }

	    /**
	     * _addNavEvents
	     *
	     * @protected
	     * @return    void
	     */

	  }, {
	    key: '_addNavEvents',
	    value: function _addNavEvents() {
	      this._element.find('a.search-open').click(function () {
	        $('body > header').addClass('dropped');
	      });
	      this._element.find('a.search-close').click(function () {
	        $('body > header').removeClass('dropped');
	      });
	    }
	  }, {
	    key: 'openSearch',
	    value: function openSearch() {
	      $('html, body').animate({
	        scrollTop: 0
	      }, 300);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var editMode = this.props.editMode;
	      var _state = this.state;
	      var user = _state.user;
	      var searching = _state.searching;
	      var profiling = _state.profiling;
	      var itinerary = _state.itinerary;
	      var totalWalks = _state.totalWalks;

	      var userOptions = void 0;
	      var defaultOptions = {
	        searching: searching,
	        toggleSearch: function toggleSearch() {
	          return _this2.setState({ searching: !_this2.state.searching });
	        }
	      };

	      // Build the logged in vs logged out
	      if (user) {
	        userOptions = LoggedInOptions(Object.assign({
	          user: user,
	          profiling: profiling,
	          unseenUpdates: this.state.lastSize !== totalWalks,
	          toggleProfile: function toggleProfile() {
	            return _this2.setState({ profiling: !_this2.state.profiling, lastSize: totalWalks });
	          }
	        }, defaultOptions));
	      } else {
	        userOptions = LoggedOutOptions(defaultOptions);
	      }

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'header',
	          { ref: 'header', className: [editMode ? 'edit' : '', searching ? 'dropped' : ''].join(' ') },
	          React.createElement(
	            'nav',
	            { role: 'navigation' },
	            React.createElement(
	              'a',
	              { href: '/', className: 'logo' },
	              React.createElement('span', null)
	            ),
	            React.createElement(
	              'ul',
	              { className: 'nav', ref: 'topnav' },
	              userOptions,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '/donate', id: 'donate' },
	                  'Donate'
	                )
	              )
	            )
	          ),
	          React.createElement('div', { className: 'navbar-outer', dangerouslySetInnerHTML: { __html: this.state.dropdown } })
	        ),
	        React.createElement(
	          'div',
	          { id: 'modals' },
	          profiling ? React.createElement(_Itinerary2.default, { onClose: function onClose() {
	              return _this2.setState({ profiling: !_this2.state.profiling });
	            } }) : null
	        )
	      );
	    }
	  }]);

	  return Navbar;
	}(React.Component);

	exports.default = Navbar;


	Navbar.defaultProps = {
	  editMode: CCM_EDIT_MODE
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ItineraryStore = __webpack_require__(21);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(23);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	var _ItineraryActions = __webpack_require__(14);

	var Actions = _interopRequireWildcard(_ItineraryActions);

	var _I18nStore = __webpack_require__(25);

	var _Walk = __webpack_require__(57);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _ItineraryHeader = __webpack_require__(59);

	var _ItineraryHeader2 = _interopRequireDefault(_ItineraryHeader);

	var _ItinerarySelect = __webpack_require__(60);

	var _ItinerarySelect2 = _interopRequireDefault(_ItinerarySelect);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global React $ */

	var getItinerary = function getItinerary() {
	  var list = arguments.length <= 0 || arguments[0] === undefined ? [].concat(_toConsumableArray(_ItineraryStore2.default.getLists()))[0] : arguments[0];
	  return {
	    activeList: list,
	    lists: _ItineraryStore2.default.getLists(),
	    schedule: _ItineraryStore2.default.getSchedule()
	  };
	};

	var Itinerary = function (_React$Component) {
	  _inherits(Itinerary, _React$Component);

	  function Itinerary(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Itinerary);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Itinerary)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    Object.assign(_this, {
	      state: Object.assign({}, getItinerary(), props.itinerary),
	      _onChange: function _onChange() {
	        return _this.setState(function () {
	          return getItinerary(_this.state.activeList);
	        });
	      },
	      handleHide: function handleHide() {
	        return _this.state.$el.modal('hide');
	      },
	      handleChooseItinerary: function handleChooseItinerary(list) {
	        return _this.setState({ activeList: list });
	      },
	      handleChangeTitle: function handleChangeTitle(v) {
	        return Actions.updateTitle(_this.state.activeList, v);
	      },
	      handleChangeDescription: function handleChangeDescription(v) {
	        return Actions.updateDescription(_this.state.activeList, v);
	      }
	    });
	    return _this;
	  }

	  _createClass(Itinerary, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _ItineraryStore2.default.addChangeListener(this._onChange);
	      _WalkStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var $el = $(React.findDOMNode(this));
	      $el.modal();
	      $el.on('hidden.bs.modal', function () {
	        return _this2.props.onClose();
	      });

	      this.setState({ $el: $el });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _ItineraryStore2.default.removeChangeListener(this._onChange);
	      _WalkStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'handleCreateItinerary',
	    value: function handleCreateItinerary() {
	      Actions.createList((0, _I18nStore.t)('New Itinerary'));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var activeList = _state.activeList;
	      var lists = _state.lists;
	      var schedule = _state.schedule;

	      // Lookup the walk data from the walk's ID

	      var ItineraryWalks = [];
	      activeList.walks.forEach(function (startTimes, walk) {
	        var onAdd = function onAdd(list) {
	          return Actions.add(list, walk);
	        };
	        var onRemove = function onRemove(list) {
	          return Actions.remove(list, walk);
	        };
	        var onSchedule = function onSchedule(time) {
	          return Actions.schedule(walk, time);
	        };
	        var onUnschedule = function onUnschedule(time) {
	          return Actions.unschedule(walk, time);
	        };

	        ItineraryWalks.push(React.createElement(_Walk2.default, _extends({
	          key: walk.id,
	          list: activeList
	        }, { lists: lists, walk: walk, schedule: schedule, onAdd: onAdd, onRemove: onRemove, onSchedule: onSchedule, onUnschedule: onUnschedule })));
	      });

	      return React.createElement(
	        'dialog',
	        { open: true },
	        React.createElement(
	          'section',
	          { id: 'itinerary' },
	          React.createElement('i', { className: 'close fa fa-times', onClick: this.handleHide }),
	          React.createElement(_ItinerarySelect2.default, _extends({
	            onChoose: this.handleChooseItinerary,
	            onCreate: this.handleCreateItinerary
	          }, { lists: lists, activeList: activeList })),
	          React.createElement(
	            'div',
	            { className: 'itinerary' },
	            React.createElement(
	              'section',
	              null,
	              React.createElement(_ItineraryHeader2.default, {
	                onChangeDescription: this.handleChangeDescription,
	                onChangeTitle: this.handleChangeTitle,
	                list: activeList
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              ItineraryWalks
	            )
	          ),
	          React.createElement(
	            'p',
	            { className: 'knightFdn-itinerary' },
	            'Powered by the Knight Foundation'
	          )
	        )
	      );
	    }
	  }]);

	  return Itinerary;
	}(React.Component);

	exports.default = Itinerary;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _Stores = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _areas = {};

	var AreaStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getAreas: function getAreas() {
	    return _areas;
	  },
	  getArea: function getArea(name) {
	    return _areas[name];
	  },

	  dispatcherIndex: (0, _AppDispatcher.register2)(_defineProperty({}, _JWConstants.ActionTypes.AREA_RECEIVE, function (_ref) {
	    var name = _ref.name;
	    var content = _ref.content;
	    return _areas[name] = content;
	  }), function () {
	    return AreaStore.emitChange();
	  })
	});

	exports.default = AreaStore;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CHANGE_EVENT = 'change';

	var changeMethods = exports.changeMethods = {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _Stores = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * User store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * Users on Jane's Walk.
	                                                                                                                                                                                                                   */

	// Store singletons
	// The users, keyed on uID
	var _users = new Map();

	// Is this the actively logged in user
	var _current = void 0;

	function receiveUser(_ref) {
	  var user = _ref.user;
	  var current = _ref.current;
	  var profile = _ref.profile;

	  _users.set(+user.id, user);

	  if (current) {
	    _current = user;
	  }
	}

	var UserStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getUsers: function getUsers() {
	    return _users;
	  },
	  getCurrent: function getCurrent() {
	    return _current;
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register2)((_register = {}, _defineProperty(_register, _JWConstants.ActionTypes.USER_RECEIVE, receiveUser), _defineProperty(_register, _JWConstants.ActionTypes.USER_RECEIVE_ALL, function (_ref2) {
	    var users = _ref2.users;
	    return users.forEach(function (user) {
	      return receiveUser({ user: user });
	    });
	  }), _register), function () {
	    return UserStore.emitChange();
	  })
	});

	exports.default = UserStore;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _ItineraryUtils = __webpack_require__(22);

	var _Stores = __webpack_require__(19);

	var _WalkStore = __webpack_require__(23);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Set<Set> A set of walk sets
	var _lists = new Set();

	// Map<{walk}:[times]> A map of times set for each walk
	var _schedule = new Map();

	// Has this store been synced, and is it syncing?
	var _lastChange = Date.now();

	//TODO: Currently no remove list, just adding lists
	//TODO: How to handle cancelled walks and removing from itinerary when no sign-ups

	var _scheduleWalk = function _scheduleWalk(walk, time) {
	  var times = _schedule.get(walk) || new Set();
	  times.add(+time);
	  _schedule.set(walk, times);
	};

	var _unscheduleWalk = function _unscheduleWalk(walk, time) {
	  var times = _schedule.get(walk) || new Set();
	  times.delete(+time);
	  _schedule.set(walk, times);
	};

	var _createList = function _createList() {
	  var title = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var description = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var list = {
	    title: title,
	    description: description,
	    walks: new Set(),
	    shareUrl: ''
	  };

	  _lists.add(list);

	  // Returning list, since after _createList, _addWalk is called, so passing around the list
	  return list;
	};

	/**
	 * Load all the basic itineraries
	 *
	 * @param itineraries array List of itineraries in serialization-friendly state
	 */
	var _receiveAll = function _receiveAll(_ref) {
	  var lists = _ref.lists;
	  var schedule = _ref.schedule;

	  lists.forEach(function (itinerary, index) {
	    _lists.add(Object.assign({}, itinerary, {
	      walks: new Set(itinerary.walks.map(function (wID) {
	        return _WalkStore2.default.getWalk(+wID);
	      }))
	    }));
	  });

	  // Loop through the {123: [14224342342, 2343535345]} object of times arrays
	  // Build a set, using the times as a number to key
	  Object.keys(schedule).forEach(function (wID) {
	    _schedule.set(_WalkStore2.default.getWalk(+wID), new Set(schedule[wID].map(function (t) {
	      return +t;
	    })));
	  });
	};

	function hasInList(walk) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = _lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var list = _step.value;

	      if (list.walks.has(walk)) return true;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return false;
	}

	var ItineraryStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getLists: function getLists() {
	    return _lists;
	  },
	  getSchedule: function getSchedule() {
	    return _schedule;
	  },
	  getWalks: function getWalks(list) {
	    return list.walks;
	  },
	  getLastChange: function getLastChange() {
	    return _lastChange;
	  },

	  hasInList: hasInList,

	  hasInSchedule: function hasInSchedule(walk, time) {
	    var times = _schedule.get(walk);
	    if (times && times.has(+time)) return true;
	    return false;
	  },
	  totalWalks: function totalWalks() {
	    var count = 0;
	    _lists.forEach(function (list) {
	      return count += list.walks.size;
	    });
	    return count;
	  },


	  dispatcherIndex: (0, _AppDispatcher.register2)((_register = {}, _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_ADD_WALK, function (_ref2) {
	    var list = _ref2.list;
	    var walk = _ref2.walk;
	    return list.walks.add(walk);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK, function (_ref3) {
	    var list = _ref3.list;
	    var walk = _ref3.walk;
	    return list.walks.delete(walk);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_UNSCHEDULE_WALK, function (_ref4) {
	    var walk = _ref4.walk;
	    var time = _ref4.time;
	    return _unscheduleWalk(walk, time);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_UPDATE_TITLE, function (_ref5) {
	    var list = _ref5.list;
	    var title = _ref5.title;
	    return list.title = title;
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_UPDATE_DESCRIPTION, function (_ref6) {
	    var list = _ref6.list;
	    var description = _ref6.description;
	    return list.description = description;
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_CREATE_LIST, function (_ref7) {
	    var title = _ref7.title;
	    var description = _ref7.description;
	    return _createList(title, description);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_SCHEDULE_WALK, function (_ref8) {
	    var _ref8$list = _ref8.list;
	    _ref8$list = _ref8$list === undefined ? _lists : _ref8$list;

	    var _ref8$list2 = _slicedToArray(_ref8$list, 1);

	    var list = _ref8$list2[0];
	    var walk = _ref8.walk;
	    var time = _ref8.time;

	    if (!hasInList(walk)) {
	      list.walks.add(walk);
	    }
	    _scheduleWalk(walk, time);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_RECEIVE_ALL, function (_ref9) {
	    var itineraries = _ref9.itineraries;

	    (0, _AppDispatcher.waitFor)([_WalkStore2.default.dispatchToken]);
	    _receiveAll(itineraries);
	  }), _register), function () {
	    _lastChange = Date.now();
	    ItineraryStore.emitChange();
	  })
	});

	exports.default = ItineraryStore;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.dateFormatted = dateFormatted;
	// Default formatter
	var dtfDate = void 0;

	// Date formatted
	if ((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object') {
	  dtfDate = new Intl.DateTimeFormat('en-US', {
	    year: 'numeric',
	    month: 'long',
	    day: 'numeric',
	    hour: 'numeric',
	    minute: '2-digit',
	    timeZone: 'UTC'
	  });
	}

	// Cache the parsed dates
	var _dateCache = {};

	function formatDate(dateInMs) {
	  if (dtfDate) {
	    return dtfDate.format(dateInMs);
	  } else {
	    var date = new Date(dateInMs);
	    var dateString = date.toUTCString();
	    return dateString.slice(0, dateString.indexOf(' GMT'));
	  }
	}

	function dateFormatted(dateInSeconds) {
	  var fromCache = _dateCache[dateInSeconds];
	  var fromFormat = void 0;
	  if (dateInSeconds) {
	    if (fromCache) {
	      return fromCache;
	    } else {
	      fromFormat = formatDate(dateInSeconds * 1000);
	      _dateCache[dateInSeconds] = fromFormat;
	      return fromFormat;
	    }
	  } else {
	    // Invalid date
	    return dateInSeconds;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _Stores = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * Walk store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
	                                                                                                                                                                                                                   * description, and people involved with a walk.
	                                                                                                                                                                                                                   */

	// Store singletons
	// The Walk objects, keyed by walk ID (ie collection ID)
	var _walks = new Map();

	// Receive a single walk
	function receiveWalk(walk) {
	  _walks.set(+walk.id, walk);
	}

	// Receive an array of walks
	function receiveWalks(walks) {
	  walks.forEach(function (w) {
	    return receiveWalk(w);
	  });
	}

	var WalkStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getWalks: function getWalks() {
	    return _walks;
	  },
	  getWalk: function getWalk(id) {
	    return _walks.get(+id);
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register2)((_register = {}, _defineProperty(_register, _JWConstants.ActionTypes.WALK_RECEIVE, function (_ref) {
	    var walk = _ref.walk;
	    return receiveWalk(walk);
	  }), _defineProperty(_register, _JWConstants.ActionTypes.WALK_RECEIVE_ALL, function (_ref2) {
	    var walks = _ref2.walks;
	    return receiveWalks(walks);
	  }), _register), function () {
	    return WalkStore.emitChange();
	  })
	});

	exports.default = WalkStore;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeSticky = makeSticky;
	/**
	 * Utils for when we need direct DOM access, e.g. calculating actual size of components
	 */

	/**
	 * Make the navbar sticky to the top
	 */
	function makeSticky(reference, el) {
	  var running = false;
	  // Where the el is when unfixed
	  var unfixed = reference.offsetTop;
	  var stick = function stick() {
	    if (running) return;
	    running = true;
	    requestAnimationFrame(function () {
	      running = false;
	      // TODO: remove this 60 hardcoding of the header height
	      if (window.scrollY > unfixed - 60) {
	        el.classList.add('fixed');
	      } else {
	        el.classList.remove('fixed');
	      }
	    });
	  };
	  window.addEventListener('scroll', stick);
	  window.addEventListener('resize', function () {
	    unfixed = reference.offsetTop;stick();
	  });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.t2 = exports.t = undefined;

	var _events = __webpack_require__(18);

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Stores = __webpack_require__(19);

	var _translate = __webpack_require__(26);

	var _translate2 = _interopRequireDefault(_translate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * i18n Store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * Store for i18n language translations
	                                                                                                                                                                                                                   */

	// Basic flux setup


	// The library for managing translations


	// Local vars
	var _i18n = new _translate2.default();

	var I18nStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getTranslate: function getTranslate() {
	    return _i18n.translate.bind(_i18n);
	  },
	  getTranslatePlural: function getTranslatePlural() {
	    return _i18n.translatePlural.bind(_i18n);
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register2)(_defineProperty({}, _JWConstants.ActionTypes.I18N_RECEIVE, function (_ref) {
	    var translations = _ref.translations;
	    return _i18n.constructor(translations);
	  }), function () {
	    return I18nStore.emitChange();
	  })
	});

	exports.default = I18nStore;
	var t = exports.t = I18nStore.getTranslate();
	var t2 = exports.t2 = I18nStore.getTranslatePlural();

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * i18n translation class
	 *
	 * @param object translations A map of i18next-format translations
	 */

	// sprintf tokenizer
	function sprintf(str) {
	  var args = Array.prototype.slice.call(arguments);
	  return args.shift().replace(/%(s|d)/g, function () {
	    return args.shift();
	  });
	}

	function I18nTranslator(translations) {
	  if (translations) {
	    this.translations = translations;
	  }
	}

	// Prototype methods
	Object.defineProperties(I18nTranslator.prototype, {
	  // The big translations map
	  translations: {
	    value: {},
	    writable: true,
	    enumerable: true
	  },

	  /**
	   * Basic translation.
	   * sprintf syntax used to replace %d and %s tokens with arguments
	   */
	  translate: {
	    value: function value(str) {
	      var translated = Array.prototype.slice.call(arguments);
	      translated[0] = (this.translations[str] || [str])[0];
	      return sprintf.apply(this, translated);
	    }
	  },

	  /**
	   * Plural translations
	   * Different languages make different numbers plural (eg is 0 plural or not)
	   * Translations should provide conjugation only, and make no assumptions about
	   * the nature of the data.
	   *
	   * @param string singular
	   * @param string plural
	   * @param int count
	   * @return string
	   * @example t2('%d ox', '%d oxen', numberOfOxen)
	   */
	  translatePlural: {
	    value: function value(singular, plural, count) {
	      // TODO Use the plural rules for the language, not just English
	      var isPlural = count !== 1 ? 1 : 0;

	      var translateTo = (this.translations[singular + '_' + plural] || [singular, plural])[isPlural];

	      return sprintf(translateTo, count);
	    }
	  },

	  /**
	  * Translate with context
	  * Some words mean different things based on context, so
	  * use tc to give context.
	  *
	  * @param string context
	  * @param string str Sprintf-formatted string
	  * @return string
	  * @example tc('make or manufacture', 'produce'); tc('food', 'produce');
	  */
	  translateContext: {
	    value: function value(context, str) {
	      // Grab the values to apply to the string
	      var args = Array.prototype.slice.call(arguments, 2);
	      // i18n lib makes context keys simply an underscore between them
	      var key = context + '_' + str;
	      sprintf.apply(this, [context, args]);
	    }
	  }
	});

	module.exports = I18nTranslator;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _Stores = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * City store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * Single-city storage. May be refactored for multiple cities later, but
	                                                                                                                                                                                                                   * currently no requirement exists for this.
	                                                                                                                                                                                                                   */

	// Store singletons
	var _city = void 0;

	var CityStore = Object.assign({}, _events.EventEmitter.prototype, _Stores.changeMethods, {
	  getCity: function getCity() {
	    return _city;
	  },
	  getLocation: function getLocation() {
	    return _city && _city.latlng;
	  },

	  dispatchToken: (0, _AppDispatcher.register2)(_defineProperty({}, _JWConstants.ActionTypes.CITY_RECEIVE, function (_ref) {
	    var city = _ref.city;
	    return _city = city;
	  }), function () {
	    return CityStore.emitChange();
	  })
	});
	exports.default = CityStore;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.post = post;
	exports.get = get;
	exports.startPolling = startPolling;

	var _ItineraryStore = __webpack_require__(21);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } /**
	                                                                               * API methods for loading itineraries
	                                                                               * (de)serializing to and from from the Jane's Walk C5
	                                                                               */

	// Service endpoints
	var endpoint = '/profile/itineraries';

	/**
	 * Serialize as JSON
	 * No need to serialize the whole walks list. Just need their IDs
	 */
	function getJson(_ref, _ref2) {
	  var _ref4 = _toArray(_ref);

	  var lists = _ref4;

	  var _ref3 = _toArray(_ref2);

	  var schedule = _ref3;

	  return JSON.stringify({
	    lists: lists.map(function (list) {
	      var walks = [];

	      // Denormalize for serializing
	      list.walks.forEach(function (walk) {
	        return walks.push(+walk.id);
	      });

	      return Object.assign({}, list, { walks: walks });
	    }),
	    schedule: schedule.reduce(function (p, _ref5) {
	      var _ref6 = _slicedToArray(_ref5, 2);

	      var walk = _ref6[0];
	      var times = _ref6[1];

	      p[+walk.id] = [].concat(_toConsumableArray(times));
	      return p;
	    }, {})
	  });
	}

	function post(cb) {
	  var url = arguments.length <= 1 || arguments[1] === undefined ? endpoint : arguments[1];

	  var xhr = new XMLHttpRequest();
	  xhr.open('POST', url);
	  xhr.onload = function () {
	    var data = void 0;
	    try {
	      data = JSON.parse(this.responseText);
	      console.log(data);
	      cb();
	    } catch (e) {
	      console.log('Error parsing JSON returned on itinerary' + url);
	    }
	  };
	  xhr.onerror = function () {
	    console.log('Failed to update itinerary.');
	  };
	  xhr.send(getJson(_ItineraryStore2.default.getLists(), _ItineraryStore2.default.getSchedule()));
	}

	function get() {
	  var url = arguments.length <= 0 || arguments[0] === undefined ? endpoint : arguments[0];

	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url);
	  xhr.onload = function () {
	    var data = void 0;
	    try {
	      data = JSON.parse(this.responseText);
	      (0, _ItineraryActions.receiveAll)(data);
	    } catch (e) {
	      cb('Error parsing JSON returned on itinerary' + url);
	    }
	  };
	  xhr.onerror = function () {
	    console.log('Failed to update itinerary.');
	  };
	  xhr.send();
	}

	/**
	 * Poll, and sync when updates stop
	 */
	function startPolling() {
	  var period = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];

	  var lastSync = _ItineraryStore2.default.getLastChange();
	  var syncing = false;

	  setInterval(function () {
	    var lastChange = _ItineraryStore2.default.getLastChange();
	    // Poll, to see if we've waited a bit since the last thing you changed
	    if (Date.now() - lastChange > period * 3) {
	      if (lastChange > lastSync && !syncing) {
	        syncing = true;
	        post(function () {
	          lastSync = Date.now();syncing = false;
	        });
	      }
	    }
	  }, period);
	}

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _ItineraryStore = __webpack_require__(21);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(14);

	var Action = _interopRequireWildcard(_ItineraryActions);

	var _WalkHeader = __webpack_require__(31);

	var _WalkHeader2 = _interopRequireDefault(_WalkHeader);

	var _WalkDescription = __webpack_require__(33);

	var _WalkDescription2 = _interopRequireDefault(_WalkDescription);

	var _WalkRoute = __webpack_require__(34);

	var _WalkRoute2 = _interopRequireDefault(_WalkRoute);

	var _WalkAccessibility = __webpack_require__(35);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(37);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(38);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _WalkStart = __webpack_require__(39);

	var _WalkStart2 = _interopRequireDefault(_WalkStart);

	var _WalkTeam = __webpack_require__(40);

	var _WalkTeam2 = _interopRequireDefault(_WalkTeam);

	var _WalkMenu = __webpack_require__(41);

	var _WalkMenu2 = _interopRequireDefault(_WalkMenu);

	var _WalkMap = __webpack_require__(43);

	var _WalkMap2 = _interopRequireDefault(_WalkMap);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getWalk = function getWalk(_ref) {
	  var walk = _ref.walk;
	  var page = _ref.page;
	  var city = _ref.city;

	  var _ItineraryStore$getLi = _ItineraryStore2.default.getLists();

	  var _ItineraryStore$getLi2 = _slicedToArray(_ItineraryStore$getLi, 1);

	  var firstList = _ItineraryStore$getLi2[0];

	  return { walk: walk, page: page, city: city, list: firstList, isFavourite: _ItineraryStore2.default.hasInList(walk), schedule: _ItineraryStore2.default.getSchedule() };
	};

	var WalkPage = function (_React$Component) {
	  _inherits(WalkPage, _React$Component);

	  function WalkPage(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, WalkPage);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WalkPage)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = getWalk(props);
	    _this._onChange = _this._onChange.bind(_this);
	    return _this;
	  }

	  _createClass(WalkPage, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _ItineraryStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _ItineraryStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: '_onChange',
	    value: function _onChange() {
	      this.setState(getWalk);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var walk = _state.walk;
	      var page = _state.page;
	      var city = _state.city;
	      var list = _state.list;
	      var isFavourite = _state.isFavourite;
	      var schedule = _state.schedule;

	      var hasMarkers = false,
	          hasRoute = false;
	      if (walk && walk['map']) {
	        hasMarkers = walk['map']['markers'].length > 0;
	        hasRoute = walk['map']['route'].length > 0;
	      }

	      return React.createElement(
	        'section',
	        { className: 'walkPage' },
	        React.createElement(_WalkHeader2.default, _extends({ walk: walk, city: city, isFavourite: isFavourite, schedule: schedule }, {
	          onSchedule: function onSchedule(t) {
	            return Action.schedule(walk, t);
	          },
	          onUnschedule: function onUnschedule(t) {
	            return Action.unschedule(walk, t);
	          },
	          onAdd: function onAdd() {
	            return Action.add(list, walk);
	          },
	          onRemove: function onRemove() {
	            return Action.remove(list, walk);
	          }
	        })),
	        React.createElement(_WalkMenu2.default, this.state),
	        React.createElement(_WalkDescription2.default, this.state.walk),
	        hasMarkers || hasRoute ? React.createElement(_WalkMap2.default, { map: this.state.walk['map'] }) : null,
	        hasMarkers ? React.createElement(_WalkRoute2.default, this.state.walk) : null,
	        hasMarkers ? React.createElement(_WalkStart2.default, this.state.walk) : null,
	        React.createElement(_WalkPublicTransit2.default, this.state.walk),
	        React.createElement(_WalkParking2.default, this.state.walk),
	        React.createElement(_WalkTeam2.default, this.state.walk)
	      );
	    }
	  }]);

	  return WalkPage;
	}(React.Component);

	exports.default = WalkPage;
	;

	WalkPage.propsType = {
	  page: React.PropTypes.object.isRequired,
	  walk: React.PropTypes.object.isRequired
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AddToItinerary = __webpack_require__(32);

	var _AddToItinerary2 = _interopRequireDefault(_AddToItinerary);

	var _WalkStore = __webpack_require__(23);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TODO: Duplicate of Itinerary <Walk/>

	/**
	 * Build a style object for the header
	 * @return object A style object for React
	 */
	function headerBG(city, walk) {
	  // Load the BG
	  var thumb = walk.thumbnails[0] && walk.thumbnails[0].url || city.background;
	  var bg = void 0;
	  if (thumb) {
	    bg = 'url(' + thumb + ')';
	  } else {
	    bg = '#eaeaea';
	  }

	  return {
	    backgroundImage: bg,
	    backgroundSize: 'cover',
	    backgroundPosition: '50%'
	  };
	}

	// Read a map, return the meeting place or null
	function getMeetingPlace(map) {
	  if (map && map.markers && map.markers.length) {
	    return map.markers[0].title;
	  }
	}

	var WalkHeader = function WalkHeader(_ref) {
	  var city = _ref.city;
	  var walk = _ref.walk;
	  var isFavourite = _ref.isFavourite;
	  var schedule = _ref.schedule;
	  var onAdd = _ref.onAdd;
	  var onRemove = _ref.onRemove;
	  var onSchedule = _ref.onSchedule;
	  var onUnschedule = _ref.onUnschedule;
	  var title = walk.title;
	  var map = walk.map;
	  var time = walk.time;
	  var team = walk.team;
	  var thumbnails = walk.thumbnails;
	  var url = city.url;
	  var name = city.name;

	  //TODO: This is problematic since there are many different type of roles defined, not a finite list

	  var walkLeader = team.find(function (member) {
	    return member.role === 'walk-leader';
	  });

	  var meetingPlace = getMeetingPlace(map);

	  var favButton = void 0;

	  if (isFavourite) {
	    favButton = React.createElement('button', { className: 'removeFavourite', onClick: onRemove });
	  } else {
	    favButton = React.createElement('button', { className: 'addFavourite', onClick: onAdd });
	  }

	  return React.createElement(
	    'section',
	    { className: 'walkHeader' },
	    React.createElement(
	      'section',
	      { className: 'coverImage', style: headerBG(city, walk) },
	      React.createElement(
	        'ul',
	        { className: 'breadcrumb' },
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            'a',
	            { href: '/' },
	            React.createElement('i', { className: 'fa fa-home' })
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            'a',
	            { href: url },
	            name + ' walks'
	          )
	        ),
	        React.createElement(
	          'li',
	          { className: 'active' },
	          title
	        )
	      )
	    ),
	    React.createElement(
	      'h1',
	      null,
	      title,
	      ' ',
	      favButton
	    ),
	    meetingPlace ? React.createElement(
	      'h4',
	      null,
	      meetingPlace
	    ) : null,
	    React.createElement(
	      'h4',
	      null,
	      walkLeader ? 'Led By ' + walkLeader['name-first'] + ' ' + walkLeader['name-last'] + ' - ' : null
	    ),
	    React.createElement(_AddToItinerary2.default, { time: time, walk: walk, schedule: schedule, onSchedule: onSchedule, onUnschedule: onUnschedule })
	  );
	};

	WalkHeader.propTypes = {
	  walk: React.PropTypes.object.isRequired,
	  remove: React.PropTypes.func.isRequired,
	  add: React.PropTypes.func.isRequired
	};

	WalkHeader.defaultProps = {
	  remove: null,
	  add: null
	};

	exports.default = WalkHeader;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(22);

	var AddToItinerary = function AddToItinerary(_ref) {
	  var schedule = _ref.schedule;
	  var time = _ref.time;
	  var walk = _ref.walk;
	  var onSchedule = _ref.onSchedule;
	  var onUnschedule = _ref.onUnschedule;

	  var addButtons = [];
	  var timeSet = schedule.get(walk) || new Set();

	  if (time && time.slots) {
	    addButtons = time.slots.map(function (t) {
	      if (timeSet.has(+t[0])) {
	        return React.createElement(
	          "h4",
	          null,
	          (0, _ItineraryUtils.dateFormatted)(t[0]),
	          React.createElement("button", { className: "removeItinerary", onClick: function onClick() {
	              return onUnschedule(+t[0]);
	            } })
	        );
	      } else {
	        return React.createElement(
	          "h4",
	          null,
	          (0, _ItineraryUtils.dateFormatted)(t[0]),
	          React.createElement("button", { className: "addItinerary", onClick: function onClick() {
	              return onSchedule(+t[0]);
	            } })
	        );
	      }
	    });
	  }
	  return React.createElement(
	    "section",
	    null,
	    addButtons
	  );
	};

	exports.default = AddToItinerary;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkDescription = function WalkDescription(_ref) {
	  var longDescription = _ref.longDescription;
	  return React.createElement(
	    "section",
	    { className: "walkDescription" },
	    React.createElement("a", { name: "About This Walk" }),
	    React.createElement(
	      "h2",
	      null,
	      React.createElement(
	        "span",
	        { clasName: "topRule" },
	        "About This Walk"
	      )
	    ),
	    React.createElement("article", { dangerouslySetInnerHTML: { __html: longDescription } })
	  );
	};

	WalkDescription.propTypes = {
	  longDescription: React.PropTypes.string.isRequired
	};

	exports.default = WalkDescription;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkRoute = function WalkRoute(_ref) {
	  var map = _ref.map;
	  return React.createElement(
	    "section",
	    { className: "walkRoute" },
	    React.createElement("a", { name: "Walk Route" }),
	    React.createElement(
	      "h2",
	      null,
	      "Walk Route"
	    ),
	    React.createElement(
	      "ol",
	      null,
	      map.markers.map(function (marker, i) {
	        return React.createElement(
	          "li",
	          { key: i },
	          React.createElement(
	            "h2",
	            null,
	            marker.title
	          ),
	          React.createElement(
	            "p",
	            null,
	            marker.description
	          )
	        );
	      })
	    )
	  );
	};

	WalkRoute.propTypes = {
	  map: React.PropTypes.object.isRequired
	};

	exports.default = WalkRoute;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Accessible = __webpack_require__(36);

	var WalkAccessibility = function WalkAccessibility(_ref) {
	  var checkboxes = _ref.checkboxes;


	  var accessibilityKeys = Object.keys(checkboxes).filter(function (item) {
	    return item.includes("accessible-");
	  });

	  return React.createElement(
	    "section",
	    { className: "walkAccessibility" },
	    React.createElement(
	      "h2",
	      null,
	      "Accessibility"
	    ),
	    React.createElement(
	      "ul",
	      null,
	      accessibilityKeys.map(function (k, i) {
	        return React.createElement(
	          "li",
	          { key: i },
	          (0, _Accessible.getAccessibleName)(k)
	        );
	      })
	    )
	  );
	};

	WalkAccessibility.propTypes = {
	  checkboxes: React.PropTypes.array.isRequired
	};

	exports.default = WalkAccessibility;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAccessibleName = getAccessibleName;
	var icons = exports.icons = {
	  'familyfriendly': { name: 'Family friendly', icon: '' },
	  'wheelchair': { name: 'Wheelchair accessible', icon: '' },
	  'dogs': { name: 'Dogs welcome', icon: '' },
	  'strollers': { name: 'Strollers welcome', icon: '' },
	  'bicycles': { name: 'Bicycles welcome', icon: '' },
	  'steephills': { name: 'Steep hills', icon: '' },
	  'uneven': { name: 'Uneven terrain', icon: '' },
	  'busy': { name: 'Busy sidewalks', icon: '' },
	  'bicyclesonly': { name: 'Bicycles only', icon: '' },
	  'lowlight': { name: 'Low light or nighttime', icon: '' },
	  'seniors': { name: 'Senior Friendly', icon: '' }
	};

	/**
	 * Helpers, to deal with that 'accessible-' prefix from the v1 json
	 */
	function getAccessibleName(theme) {
	  return (icons[theme.slice(11)] || { name: '' }).name;
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkPublicTransit = function WalkPublicTransit(_ref) {
	  var accessibleTransit = _ref.accessibleTransit;

	  if (accessibleTransit && accessibleTransit.length > 0) {
	    return React.createElement(
	      "section",
	      { className: "walkPublicTransit" },
	      React.createElement("a", { name: "Taking Public Transit" }),
	      React.createElement(
	        "h2",
	        null,
	        "Taking Public Transit"
	      ),
	      accessibleTransit
	    );
	  } else {
	    return React.createElement("section", null);
	  }
	};

	WalkPublicTransit.propTypes = {
	  accessibleTransit: React.PropTypes.string.isRequired
	};

	exports.default = WalkPublicTransit;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkParking = function WalkParking(_ref) {
	  var accessibleParking = _ref.accessibleParking;
	  var style = _ref.style;

	  if (accessibleParking && accessibleParking.length > 0) {
	    return React.createElement(
	      "section",
	      { className: "walkParking " + style },
	      style === 'walk-page' ? React.createElement("a", { name: "Parking Availability" }) : null,
	      React.createElement("a", { name: "Parking Availability" }),
	      React.createElement(
	        "h2",
	        null,
	        "Parking Availability"
	      ),
	      accessibleParking
	    );
	  } else {
	    return React.createElement("section", null);
	  }
	};

	WalkParking.propTypes = {
	  accessibleParking: React.PropTypes.string.isRequired
	};

	exports.default = WalkParking;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkStart = function WalkStart(_ref) {
	  var accessibleFind = _ref.accessibleFind;
	  return React.createElement(
	    "section",
	    { className: "walkStart" },
	    React.createElement("a", { name: "How to find us" }),
	    React.createElement(
	      "h2",
	      null,
	      "How to Find Us"
	    ),
	    accessibleFind
	  );
	};

	WalkStart.propTypes = {
	  accessibleFind: React.PropTypes.string.isRequired
	};

	exports.default = WalkStart;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var connections = [{ name: 'twitter', href: 'http://twitter.com/', style: 'fa fa-twitter' }, { name: 'facebook', href: 'http://facebook.com/', style: 'fa fa-facebook' }, { name: 'email', href: 'mailto:', style: 'fa fa-envelope-o' }, { name: 'website', href: '', style: 'fa fa-globe' }, { name: 'phone', href: '', style: 'fa fa-phone' }];

	function ConnectionLinks(_ref) {
	  var member = _ref.member;

	  var availConnects = connections.filter(function (c) {
	    return member[c.name];
	  });

	  return React.createElement(
	    'div',
	    { className: 'btn-toolbar' },
	    availConnects.map(function (c, i) {
	      return React.createElement(
	        'a',
	        { key: i, className: 'btn', href: c.href + member[c.name], target: '_blank' },
	        React.createElement('i', { className: c.style })
	      );
	    })
	  );
	}

	var WalkTeam = function WalkTeam(_ref2) {
	  var team = _ref2.team;

	  var teamMembers = team.map(function (member, i) {
	    return React.createElement(
	      'article',
	      { key: i },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          (member['name-first'] + ' ' + member['name-last']).trim(),
	          ', ',
	          React.createElement(
	            'span',
	            { className: 'walkTeamMemberRole' },
	            member['role']
	          )
	        ),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(ConnectionLinks, { member: member })
	        )
	      ),
	      React.createElement('summary', { dangerouslySetInnerHTML: { __html: member['bio'] } })
	    );
	  });

	  return React.createElement(
	    'section',
	    { className: 'walkTeam' },
	    React.createElement('a', { name: 'About the Walk Team' }),
	    React.createElement(
	      'h2',
	      null,
	      'About the Walk Team'
	    ),
	    React.createElement(
	      'section',
	      null,
	      teamMembers
	    )
	  );
	};

	WalkTeam.propTypes = {
	  member: React.PropTypes.array.isRequired
	};

	exports.default = WalkTeam;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(22);

	var _WalkAccessibility = __webpack_require__(35);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(37);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(38);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _Theme = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
	//TODO: Make walkMenu sticky - will complete after Dashboard

	var menuItems = [{ display: 'About This Walk', exists: true }, { display: 'Walk Route', exists: true }, { display: 'How to find us', exists: true }, { display: 'Taking Public Transit', exists: false }, { display: 'Parking Availability', exists: false }, { display: 'About the Walk Team', exists: true }];

	var WalkMenu = function WalkMenu(_ref) {
	  var walk = _ref.walk;
	  var filters = _ref.filters;
	  var checkboxes = walk.checkboxes;
	  var title = walk.title;
	  var map = walk.map;
	  var time = walk.time;
	  var team = walk.team;

	  var theme = { data: {} };
	  if (filters) {
	    theme = filters.theme;
	  }
	  var walkLeader = team.find(function (member) {
	    return member.role === 'walk-leader';
	  });
	  var leaderHead = void 0,
	      nextDateHead = void 0,
	      meetingPlaceHead = void 0;
	  if (walkLeader) {
	    leaderHead = React.createElement(
	      'h6',
	      null,
	      'Led By ',
	      walkLeader['name-first'],
	      ' ',
	      walkLeader['name-last'],
	      ' '
	    );
	  }
	  if (time.slots.length) {
	    nextDateHead = React.createElement(
	      'h6',
	      null,
	      (0, _ItineraryUtils.dateFormatted)(time.slots[0][0])
	    );
	  }
	  if (map.markers.length) {
	    meetingPlaceHead = React.createElement(
	      'h6',
	      null,
	      'Meeting at ',
	      map.markers[0].title
	    );
	  }

	  //TODO Convert below to a Utility to use in multiple places like <Dashboard/> <CityWalksFilter/>
	  //<WalkPublicTransit {...walk} />
	  //<WalkParking {...walk} />
	  var tags = Object.keys(checkboxes).filter(function (item) {
	    return item.includes('theme');
	  });

	  //TODO: <WalkAccessibility {...walk} {...filters} /> temporarily removed (below {meetingPlaceHead})

	  //TODO: Improve functionality to be generic for displaying menuItems, and specific react components
	  if ((walk.accessibleTransit || []).length > 0) menuItems[3].exists = true;
	  if ((walk.accessibleParking || []).length > 0) menuItems[4].exists = true;

	  return React.createElement(
	    'section',
	    { className: 'walkMenu' },
	    React.createElement(
	      'header',
	      { className: 'walkHeader' },
	      React.createElement(
	        'h5',
	        null,
	        title
	      ),
	      leaderHead,
	      nextDateHead,
	      meetingPlaceHead
	    ),
	    React.createElement(
	      'section',
	      { className: 'menu' },
	      React.createElement(
	        'ul',
	        null,
	        menuItems.filter(function (item) {
	          return item.exists;
	        }).map(function (item, i) {
	          return React.createElement(
	            'li',
	            { key: i },
	            React.createElement(
	              'a',
	              { href: '#' + item.display },
	              item.display
	            )
	          );
	        })
	      )
	    ),
	    React.createElement(
	      'section',
	      { className: 'tags' },
	      tags.map(function (tag, i) {
	        return React.createElement(
	          'span',
	          { className: 'tag', key: i },
	          '#',
	          (0, _Theme.getThemeName)(tag)
	        );
	      })
	    )
	  );
	};

	WalkMenu.propTypes = {
	  walk: React.PropTypes.object.isRequired
	};

	exports.default = WalkMenu;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getThemeName = getThemeName;
	exports.getThemeIcon = getThemeIcon;
	var icons = exports.icons = {
	  'civic-activist': { name: 'Activism', icon: 'bullhorn' },
	  'civic-commerce': { name: 'Commerce', icon: 'shopping-cart' },
	  'civic-gender': { name: 'Gender', icon: 'unlock-alt' },
	  'civic-goodneighbour': { name: 'Community', icon: 'group' },
	  'civic-health': { name: 'Health', icon: 'medkit' },
	  'civic-international': { name: 'International Issues', icon: 'globe' },
	  'civic-military': { name: 'Military', icon: 'fighter-jet' },
	  'civic-nativeissues': { name: 'Native Issues', icon: 'sun-o' },
	  'civic-religion': { name: 'Religion', icon: 'bell' },
	  'civic-truecitizen': { name: 'Citizenry', icon: 'flag-o' },
	  'culture-aesthete': { name: 'Design', icon: 'pencil' },
	  'culture-artist': { name: 'Art', icon: 'picture-o' },
	  'culture-bookworm': { name: 'Literature', icon: 'book' },
	  'culture-foodie': { name: 'Food', icon: 'cutlery' },
	  'culture-historybuff': { name: 'Heritage', icon: 'archive' },
	  'culture-nightowl': { name: 'Night Life', icon: 'glass' },
	  'culture-techie': { name: 'Technology', icon: 'gears' },
	  'culture-writer': { name: 'Storytelling', icon: 'edit' },
	  'nature-greenthumb': { name: 'Gardening', icon: 'leaf' },
	  'nature-naturelover': { name: 'Nature', icon: 'bug' },
	  'nature-petlover': { name: 'Animals', icon: 'heart' },
	  'urban-architecturalenthusiast': { name: 'Architecture', icon: 'building' },
	  'urban-film': { name: 'Film', icon: 'video-camera' },
	  'urban-moversandshakers': { name: 'Transportation', icon: 'truck' },
	  'urban-music': { name: 'Music', icon: 'music' },
	  'urban-play': { name: 'Play', icon: 'puzzle-piece' },
	  'urban-sports': { name: 'Sports', icon: 'trophy' },
	  'urban-suburbanexplorer': { name: 'Suburbs', icon: 'home' },
	  'urban-water': { name: 'Water', icon: 'tint' }
	};

	/**
	 * Helpers, to deal with that 'theme-' prefix from the v1 json
	 */
	function getThemeName(theme) {
	  return (icons[theme.slice(6)] || { name: '' }).name;
	}

	function getThemeIcon(theme) {
	  return 'fa-' + (icons[theme.slice(6)] || { icon: '' }).icon;
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//TODO: WalkMap.jsx already exists, review and re-use
	/**
	 * The walk stop marker theme
	 * TODO: generalize for import
	 */
	var stopMarker = {
	  url: CCM_THEME_PATH + '/images/marker.png',
	  // This marker is 20 pixels wide by 32 pixels tall.
	  size: new google.maps.Size(30, 46),
	  // The origin for this image is 0,0.
	  origin: new google.maps.Point(0, 0),
	  labelOrigin: new google.maps.Point(11, 17),
	  // The anchor for this image is the base of the flagpole at 0,32.
	  anchor: new google.maps.Point(11, 44)
	};

	function boundMapByMarkers(map, markers) {
	  // Don't include the route - it can be too expensive to compute.
	  var bounds = new google.maps.LatLngBounds();
	  google.maps.event.trigger(map, 'resize');
	  markers.forEach(function (marker) {
	    return bounds.extend(marker.getPosition());
	  });

	  // Fitbounds is async, and runs a bounds_changed event
	  map.fitBounds(bounds);

	  // Make sure we don't zoom in too far, eg a 1 point map
	  var boundListener = google.maps.event.addListener(map, 'bounds_changed', function () {
	    if (map.getZoom() > 17) {
	      map.setZoom(17);
	    }
	    google.maps.event.removeListener(boundListener);
	  });
	}

	var WalkMap = function (_React$Component) {
	  _inherits(WalkMap, _React$Component);

	  function WalkMap(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, WalkMap);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WalkMap)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = { googleMap: null };
	    return _this;
	  }

	  _createClass(WalkMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      //TODO: Create a <GoogleMap/> component to generalize use of google maps
	      var map = this.props.map;

	      var locationLatLng = new google.maps.LatLng(map.markers[0].lat, map.markers[0].lng);
	      var markers = [];

	      var mapOptions = {
	        center: locationLatLng,
	        scrollwheel: false,
	        backgroundColor: '#d7f0fa'
	      };

	      var googleMap = new google.maps.Map(React.findDOMNode(this), mapOptions);
	      googleMap.mapTypes.set('map_style', new google.maps.StyledMapType([{
	        featureType: "poi.park",
	        elementType: "geometry.fill",
	        stylers: [{
	          visibility: "on"
	        }, {
	          saturation: 37
	        }]
	      }, {
	        featureType: 'landscape',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#eaeaea'
	        }]
	      }, {
	        featureType: 'poi',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'poi.park',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#cadfaa'
	        }]
	      }, {
	        featureType: 'poi.school',
	        elementType: 'labels',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'poi.school',
	        elementType: 'geometry',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#dadada'
	        }]
	      }, {
	        featureType: 'transit',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'water',
	        stylers: [{
	          visibility: 'simplified'
	        }, {
	          color: '#90c2ff'
	        }]
	      }, {
	        featureType: 'road',
	        elementType: 'geometry',
	        stylers: [{
	          visibility: 'simplified'
	        }, {
	          color: '#ffffff'
	        }]
	      }, {
	        featureType: 'road',
	        elementType: 'labels.icon',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }]));
	      googleMap.setMapTypeId('map_style');

	      var routePath = new google.maps.Polyline({
	        strokeColor: '#F16725',
	        strokeOpacity: 0.8,
	        strokeWeight: 3,
	        path: map.route,
	        map: googleMap
	      });

	      map.markers.forEach(function (m, i) {
	        var locationLatLng = new google.maps.LatLng(m.lat, m.lng);
	        var marker = new google.maps.Marker({
	          position: locationLatLng,
	          style: 'stop',
	          icon: stopMarker,
	          map: googleMap,
	          label: {
	            text: (i + 1).toString(),
	            fontWeight: '700',
	            fontSize: '16px',
	            color: '#ffffff'
	          }
	        });

	        google.maps.event.addListener(marker, 'click', function () {
	          googleMap.panTo(marker.getPosition());
	          // TODO: scroll to list of stops
	        });

	        markers.push(marker);
	      });

	      boundMapByMarkers(googleMap, markers);

	      this.setState({ googleMap: googleMap });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('div', { className: 'walkMap' });
	    }
	  }]);

	  return WalkMap;
	}(React.Component);

	exports.default = WalkMap;


	WalkMap.PropTypes = {
	  map: React.PropTypes.object.isRequired
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DashboardHeader = __webpack_require__(45);

	var _DashboardHeader2 = _interopRequireDefault(_DashboardHeader);

	var _DashboardMenu = __webpack_require__(46);

	var _DashboardMenu2 = _interopRequireDefault(_DashboardMenu);

	var _DashboardSummary = __webpack_require__(47);

	var _DashboardSummary2 = _interopRequireDefault(_DashboardSummary);

	var _UserStore = __webpack_require__(20);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _CityStore = __webpack_require__(27);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _ItineraryStore = __webpack_require__(21);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(23);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getDashData() {
	  return {
	    walks: _WalkStore2.default.getWalks(),
	    users: _UserStore2.default.getUsers(),
	    city: _CityStore2.default.getCity()
	  };
	}

	var Dashboard = function (_React$Component) {
	  _inherits(Dashboard, _React$Component);

	  function Dashboard() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Dashboard);

	    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
	      props[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Dashboard)).call.apply(_Object$getPrototypeO, [this].concat(props)));

	    _this.state = getDashData();
	    _this._onChange = _this._onChange.bind(_this);
	    return _this;
	  }

	  _createClass(Dashboard, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _UserStore2.default.addChangeListener(this._onChange);
	      _WalkStore2.default.addChangeListener(this._onChange);
	      _CityStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _UserStore2.default.removeChangeListener(this._onChange);
	      _WalkStore2.default.removeChangeListener(this._onChange);
	      _CityStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: '_onChange',
	    value: function _onChange() {
	      this.setState(getDashData);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var user = this.props.user;
	      var _state = this.state;
	      var city = _state.city;
	      var walks = _state.walks;
	      var users = _state.users;


	      return React.createElement(
	        'section',
	        { className: 'dashboard' },
	        React.createElement(_DashboardHeader2.default, { user: user }),
	        React.createElement(_DashboardMenu2.default, { walks: walks, users: users, user: user, city: city }),
	        React.createElement(_DashboardSummary2.default, {
	          city: city,
	          walks: walks,
	          year: 2015,
	          leaders: [1, 2],
	          participants: [5, 6]
	        })
	      );
	    }
	  }]);

	  return Dashboard;
	}(React.Component);

	exports.default = Dashboard;

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// TODO: link to blog/message system

	var DashboardHeader = function DashboardHeader(_ref) {
	  var user = _ref.user;
	  return React.createElement(
	    "header",
	    null,
	    React.createElement(
	      "h3",
	      null,
	      user.firstName.toUpperCase(),
	      " Organizer Dashboard"
	    ),
	    React.createElement(
	      "h4",
	      null,
	      "Hi, ",
	      user.firstName + "!",
	      " "
	    ),
	    React.createElement(
	      "section",
	      { className: "dashboardLatestPost" },
	      React.createElement(
	        "h4",
	        null,
	        "New User Dashboard!"
	      ),
	      React.createElement(
	        "h5",
	        null,
	        "Feb 9th, 2016"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Jane's Walk Leaders and City Organizers now have a whole new dashboard. We're making it easier and simpler to organize your city, and your walks. Look here for more updates soon."
	      )
	    )
	  );
	};

	DashboardHeader.PropTypes = {
	  user: React.PropTypes.object.isRequired
	};

	exports.default = DashboardHeader;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DashboardSummary = __webpack_require__(47);

	var _DashboardSummary2 = _interopRequireDefault(_DashboardSummary);

	var _DashboardResources = __webpack_require__(48);

	var _DashboardResources2 = _interopRequireDefault(_DashboardResources);

	var _MyBlogPosts = __webpack_require__(49);

	var _MyBlogPosts2 = _interopRequireDefault(_MyBlogPosts);

	var _Walks = __webpack_require__(50);

	var _Walks2 = _interopRequireDefault(_Walks);

	var _WalkLeaders = __webpack_require__(54);

	var _WalkLeaders2 = _interopRequireDefault(_WalkLeaders);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: ImpactReport is not set-up
	// import ImpactReport from './ImpactReport.jsx';

	var DashboardMenu = function (_React$Component) {
	  _inherits(DashboardMenu, _React$Component);

	  function DashboardMenu(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, DashboardMenu);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?, props] tuples

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DashboardMenu)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = {
	      menuItems: [
	      // [DashboardResources, 'Dashboard Resources', true],
	      //        [MyBlogPosts, 'My Blog Posts', false],
	      [_Walks2.default, 'My Walks', false, { show: 'user' }], [_Walks2.default, 'Walks in My City', false, { show: 'city' }]]
	    };
	    return _this;
	  }

	  _createClass(DashboardMenu, [{
	    key: 'toggleSection',

	    //  [WalkLeaders, 'Walk Leaders', false]
	    value: function toggleSection(idx) {
	      var newItems = this.state.menuItems.slice();
	      newItems[idx][2] = !newItems[idx][2];
	      this.setState({ menuItems: newItems });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var menuItems = this.state.menuItems;
	      var _props = this.props;
	      var walks = _props.walks;
	      var city = _props.city;
	      var user = _props.user;


	      var menu = menuItems.map(function (_ref, i) {
	        var _ref2 = _slicedToArray(_ref, 4);

	        var Component = _ref2[0];
	        var name = _ref2[1];
	        var open = _ref2[2];
	        var props = _ref2[3];
	        return React.createElement(
	          'section',
	          null,
	          React.createElement(
	            'li',
	            {
	              key: i,
	              className: open ? 'activeMenuItem' : null,
	              onClick: function onClick() {
	                return _this2.toggleSection(i);
	              } },
	            React.createElement('i', { className: 'icon-caret-right' }),
	            ' ',
	            name
	          ),
	          open ? React.createElement(Component, _extends({ user: user, walks: walks, city: city }, props)) : null
	        );
	      });

	      return React.createElement(
	        'section',
	        { className: 'dashboardMenu' },
	        React.createElement(
	          'ul',
	          null,
	          menu
	        )
	      );
	    }
	  }]);

	  return DashboardMenu;
	}(React.Component);

	exports.default = DashboardMenu;
	;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _I18nStore = __webpack_require__(25);

	var DashboardSummary = function DashboardSummary(_ref) {
	  var city = _ref.city;
	  var walks = _ref.walks;

	  var leaderCount = 0,
	      walkCount = 0,
	      year = 2015;
	  var leaders = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = walks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _slicedToArray(_step.value, 2);

	      var id = _step$value[0];
	      var walk = _step$value[1];

	      var teamLeader = walk.team && walk.team[0];
	      if (teamLeader) {
	        var key = teamLeader.email || teamLeader.firstName + teamLeader.lastName;
	        leaders[key] = (leaders[key] || 0) + 1;
	      }
	      if (walk.time) {
	        walkCount += walk.time.slots.length;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  leaderCount = Object.keys(leaders).length;

	  return React.createElement(
	    'section',
	    { className: 'dashboardRecap' },
	    React.createElement(
	      'h2',
	      null,
	      'Recap'
	    ),
	    React.createElement(
	      'h4',
	      null,
	      'In ',
	      city.name,
	      ', ',
	      (0, _I18nStore.t2)('%d walk leader', '%d walk leaders', leaderCount) + ' ' + (0, _I18nStore.t2)('led %d walk', 'led %d walks', walkCount) + ' ' + (0, _I18nStore.t)('since its first Jane\'s Walk in %d,', year) + '.'
	    )
	  );
	};

	DashboardSummary.defaultProps = {
	  city: { name: 'your city' }
	};

	exports.default = DashboardSummary;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(25);

	// TODO Resources should be loaded, not literal
	// TODO* Country Flag (data is not stubbed, just 'Canada') and 'Toronto' as well
	var resources = {
	  cityOrganizers: [{
	    "id": 2627, "photo": "\/files\/avatars\/2627.jpg?1450825591", "firstName": "Kate", "lastName": "Watanabe", "email": "kate.watanabe@janeswalk.org", "facebook": "", "twitter": "", "website": "", cityName: "Toronto"
	  }, {
	    "id": 2627, "photo": "\/files\/avatars\/2627.jpg?1450825591", "firstName": "Kate", "lastName": "Watanabe", "email": "kate.watanabe@janeswalk.org", "facebook": "", "twitter": "", "website": "", cityName: "Toronto"
	  }, {
	    "id": 2627, "photo": "\/files\/avatars\/2627.jpg?1450825591", "firstName": "Kate", "lastName": "Watanabe", "email": "kate.watanabe@janeswalk.org", "facebook": "", "twitter": "", "website": "", cityName: "Toronto"
	  }],
	  videoTips: ['//player.vimeo.com/video/91185841', '//player.vimeo.com/video/91185841', '//player.vimeo.com/video/91185841'],
	  files: [{
	    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
	    name: 'Vector Logo'
	  }, {
	    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
	    name: 'Vector Logo'
	  }, {
	    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
	    name: 'Vector Logo'
	  }]
	};

	var DashboardResources = function DashboardResources() {
	  var cityOrganizers = resources.cityOrganizers;
	  var videoTips = resources.videoTips;
	  var files = resources.files;

	  var featuredWalks = undefined.props.walks.slice(3);

	  return React.createElement(
	    "section",
	    { className: "dashboardResources" },
	    React.createElement(
	      "section",
	      { className: "walkOrganizers" },
	      React.createElement(
	        "h3",
	        null,
	        "Connect with Fellow organizers"
	      ),
	      "Got a question? Reach out to a fellow City Organizer for help.",
	      React.createElement(
	        "ul",
	        null,
	        cityOrganizers.map(function (co, i) {
	          return React.createElement(
	            "li",
	            { key: i },
	            co.firstName + " from " + co.cityName + ": " + co.email
	          );
	        })
	      )
	    ),
	    React.createElement(
	      "section",
	      { className: "globalWalks resourceBlock" },
	      React.createElement(
	        "h3",
	        null,
	        "Walks from around the world"
	      ),
	      (0, _I18nStore.t)('Don\'t know what kind of walk to lead? Here are some fun ones from around the world.'),
	      React.createElement(
	        "ul",
	        null,
	        featuredWalks.map(function (w, i) {
	          return React.createElement(
	            "li",
	            { key: i, className: "funWalksFromAroundWorld" },
	            React.createElement(
	              "a",
	              { href: w.url, className: "walkImage" },
	              React.createElement("img", { src: "http://janeswalk.org/" + w.thumbnailUrl })
	            ),
	            React.createElement(
	              "span",
	              { className: "flag" },
	              React.createElement("img", { src: "http://janeswalk.org/themes/janeswalk/images/countryFlags/Canada.png" })
	            ),
	            React.createElement(
	              "div",
	              null,
	              React.createElement(
	                "a",
	                { href: w.url },
	                w.title,
	                "}"
	              ),
	              React.createElement(
	                "h4",
	                null,
	                "Toronto, ON"
	              )
	            )
	          );
	        })
	      )
	    ),
	    React.createElement(
	      "section",
	      { className: "walkTips vimeos resourceBlock" },
	      React.createElement(
	        "h3",
	        null,
	        (0, _I18nStore.t)('Tips on leading a walk')
	      ),
	      (0, _I18nStore.t)('Leading your first or fifth walk? Here are some tips from the Jane\'s Walk crew!'),
	      React.createElement(
	        "ul",
	        null,
	        videoTips.map(function (v, i) {
	          return React.createElement(
	            "li",
	            { key: i },
	            React.createElement(
	              "div",
	              { className: "embed-container" },
	              React.createElement("iframe", { src: v, frameborder: "0", webkitallowfullscreen: true, mozallowfullscreen: true, allowfullscreen: true })
	            )
	          );
	        })
	      )
	    ),
	    React.createElement(
	      "section",
	      { className: "files" },
	      React.createElement(
	        "h3",
	        null,
	        "Files"
	      ),
	      (0, _I18nStore.t)('Want help promoting Jane\'s Walk?'),
	      (0, _I18nStore.t)('Use these files to promote Jane\'s Walk in your city'),
	      React.createElement(
	        "ul",
	        null,
	        files.map(function (f, i) {
	          return React.createElement(
	            "li",
	            { key: i },
	            React.createElement(
	              "a",
	              { href: f.url },
	              f.name,
	              "}"
	            )
	          );
	        })
	      )
	    )
	  );
	};

	exports.default = DashboardResources;

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MyBlogPosts = function MyBlogPosts() {
	  var posts = DashboardStore.getMyBlogPosts().map(function (p, i) {
	    return React.createElement(
	      "li",
	      { key: i },
	      React.createElement(
	        "a",
	        { href: p.url },
	        React.createElement(
	          "h3",
	          null,
	          p.name
	        ),
	        React.createElement(
	          "button",
	          null,
	          React.createElement(
	            "a",
	            { href: "" },
	            "Promote"
	          )
	        )
	      )
	    );
	  });

	  return React.createElement(
	    "ul",
	    { className: "dashboardMyBlogPosts" },
	    posts
	  );
	};

	exports.default = MyBlogPosts;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _WalkFilters = __webpack_require__(51);

	var _WalkFilters2 = _interopRequireDefault(_WalkFilters);

	var _WalksMap = __webpack_require__(52);

	var _WalksMap2 = _interopRequireDefault(_WalksMap);

	var _Walk = __webpack_require__(53);

	var _Walk2 = _interopRequireDefault(_Walk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin


	// TODO: Discuss: Not sure on the precedent of this naming: a dashboard (or rather, the profile page) can potentially be shown for other users. The dash store should show the walks for the profile's owner, not necessarily "my" walks.
	function _removeFilter(filters, handle, option) {
	  var newFilters = Object.assign({}, filters);
	  newFilters[handle] = Object.assign({}, filters[handle]);
	  delete newFilters[handle][option];

	  return newFilters;
	}

	function _toggleFilter(filters, handle, option) {
	  var newFilters = Object.assign({}, filters);
	  newFilters[handle] = Object.assign({}, filters[handle]);
	  newFilters[handle][option] = !newFilters[handle][option];

	  return newFilters;
	}

	// TODO: load only the ones we need from the walk data
	var _filters = { "theme": { "name": "Theme", "data": { "civic-activist": "Activism", "nature-petlover": "Animals", "urban-architecturalenthusiast": "Architecture", "culture-artist": "Art", "civic-truecitizen": "Citizenry", "civic-commerce": "Commerce", "civic-goodneighbour": "Community", "culture-aesthete": "Design", "urban-film": "Film", "culture-foodie": "Food", "nature-greenthumb": "Gardening", "civic-gender": "Gender", "civic-health": "Health", "culture-historybuff": "Heritage", "civic-international": "International Issues", "culture-bookworm": "Literature", "civic-military": "Military", "urban-music": "Music", "civic-nativeissues": "Native Issues", "nature-naturelover": "Nature", "culture-nightowl": "Night Life", "urban-play": "Play", "civic-religion": "Religion", "urban-sports": "Sports", "culture-writer": "Storytelling", "urban-suburbanexplorer": "Suburbs", "culture-techie": "Technology", "urban-moversandshakers": "Transportation", "urban-water": "Water" } }, "ward": { "name": "Region", "data": { "Ward 1 Etobicoke North": "Ward 1 Etobicoke North", "Ward 2 Etobicoke North": "Ward 2 Etobicoke North", "Ward 3 Etobicoke Centre": "Ward 3 Etobicoke Centre", "Ward 4 Etobicoke Centre": "Ward 4 Etobicoke Centre", "Ward 5 Etobicoke-Lakeshore": "Ward 5 Etobicoke-Lakeshore", "Ward 6 Etobicoke-Lakeshore": "Ward 6 Etobicoke-Lakeshore", "Ward 7 York West": "Ward 7 York West", "Ward 8 York West": "Ward 8 York West", "Ward 9 York Centre": "Ward 9 York Centre", "Ward 10 York Centre": "Ward 10 York Centre", "Ward 11 York South-Weston": "Ward 11 York South-Weston", "Ward 12 York South-Weston": "Ward 12 York South-Weston", "Ward 13 Parkdale-High Park": "Ward 13 Parkdale-High Park", "Ward 14 Parkdale-High Park": "Ward 14 Parkdale-High Park", "Ward 15 Eglinton-Lawrence": "Ward 15 Eglinton-Lawrence", "Ward 16 Eglinton-Lawrence": "Ward 16 Eglinton-Lawrence", "Ward 17 Davenport": "Ward 17 Davenport", "Ward 18 Davenport": "Ward 18 Davenport", "Ward 19 Trinity-Spadina": "Ward 19 Trinity-Spadina", "Ward 20 Trinity-Spadina": "Ward 20 Trinity-Spadina", "Ward 21 St. Pauls": "Ward 21 St. Pauls", "Ward 22 St. Pauls": "Ward 22 St. Pauls", "Ward 23 Willowdale": "Ward 23 Willowdale", "Ward 24 Willowdale": "Ward 24 Willowdale", "Ward 25 Don Valley West": "Ward 25 Don Valley West", "Ward 26 Don Valley West": "Ward 26 Don Valley West", "Ward 27 Toronto Centre-Rosedale": "Ward 27 Toronto Centre-Rosedale", "Ward 28 Toronto Centre-Rosedale": "Ward 28 Toronto Centre-Rosedale", "Ward 29 Toronto-Danforth": "Ward 29 Toronto-Danforth", "Ward 30 Toronto-Danforth": "Ward 30 Toronto-Danforth", "Ward 31 Beaches-East York": "Ward 31 Beaches-East York", "Ward 32 Beaches-East York": "Ward 32 Beaches-East York", "Ward 33 Don Valley East": "Ward 33 Don Valley East", "Ward 34 Don Valley East": "Ward 34 Don Valley East", "Ward 35 Scarborough Southwest": "Ward 35 Scarborough Southwest", "Ward 36 Scarborough Southwest": "Ward 36 Scarborough Southwest", "Ward 37 Scarborough Centre": "Ward 37 Scarborough Centre", "Ward 38 Scarborough Centre": "Ward 38 Scarborough Centre", "Ward 39 Scarborough-Agincourt": "Ward 39 Scarborough-Agincourt", "Ward 40 Scarborough Agincourt": "Ward 40 Scarborough Agincourt", "Ward 41 Scarborough-Rouge River": "Ward 41 Scarborough-Rouge River", "Ward 42 Scarborough-Rouge River": "Ward 42 Scarborough-Rouge River", "Ward 43 Scarborough East": "Ward 43 Scarborough East", "Ward 44 Scarborough East": "Ward 44 Scarborough East" } }, "accessibility": { "name": "Accessibility", "data": { "bicyclesonly": "Bicyiccles only", "bicycles": "Bicycles welcome", "busy": "Busy sidewalks", "dogs": "Dogs welcome", "familyfriendly": "Family friendly", "lowlight": "Low light or nighttime", "seniors": "Senior Friendly", "steephills": "Steep hills", "strollers": "Strollers welcome", "uneven": "Uneven terrain", "wheelchair": "Wheelchair accessible" } } };

	var Walks = function (_React$Component) {
	  _inherits(Walks, _React$Component);

	  function Walks(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Walks);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Walks)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = {
	      currentView: 'list',
	      filters: {}
	    };
	    return _this;
	  }

	  _createClass(Walks, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _state = this.state;
	      var currentView = _state.currentView;
	      var filterByDate = _state.filterByDate;
	      var filters = _state.filters;
	      var _props = this.props;
	      var walks = _props.walks;
	      var city = _props.city;
	      var user = _props.user;
	      var show = _props.show;

	      // How we're presenting the walks (map or list)

	      var Walks = void 0;
	      if (currentView === 'list') {
	        // TODO: separate this out into some functions
	        var walkIDs = show === 'city' ? city.walks : user.walks;
	        Walks = walkIDs.map(function (wID) {
	          var _walks$get = walks.get(wID);

	          var map = _walks$get.map;
	          var id = _walks$get.id;
	          var title = _walks$get.title;
	          var time = _walks$get.time;
	          var team = _walks$get.team;
	          var url = _walks$get.url;

	          var props = { title: title, id: id, key: id, team: team, url: url };
	          if (map && map.markers.length) {
	            props.meeting = map.markers[0].title;
	          }
	          if (time && time.slots.length) {
	            props.start = time.slots[0][0];
	          }
	          return React.createElement(_Walk2.default, props);
	        });
	      } else if (currentView === 'map') {
	        Walks = React.createElement(_WalksMap2.default, { walks: user.walks.map(function (wID) {
	            return walks.get(wID);
	          }), city: city });
	      }

	      // The toggle for the past walks
	      var DateToggle = void 0;
	      if (filterByDate === 'future') {
	        DateToggle = React.createElement(
	          'button',
	          {
	            className: filterByDate === 'future' ? 'active' : null,
	            onClick: function onClick() {
	              return _this2.setState({ filterByDate: 'future' });
	            } },
	          'With Past Walks'
	        );
	      } else {
	        DateToggle = React.createElement(
	          'button',
	          {
	            className: filterByDate === 'past' ? 'active' : null,
	            onClick: function onClick() {
	              return _this2.setState({ filterByDate: 'past' });
	            } },
	          'Without Past Walks'
	        );
	      }

	      //TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
	      //TODO: (Post-PR) Create generic button component as part of a filter generic component (iterable buttons)
	      return React.createElement(
	        'div',
	        { className: 'walks' },
	        React.createElement(
	          'button',
	          {
	            className: 'walksListButton ' + (currentView === 'list' ? 'active' : null),
	            onClick: function onClick() {
	              return _this2.setState({ currentView: 'list' });
	            } },
	          'List'
	        ),
	        React.createElement(
	          'button',
	          {
	            className: 'walksMapButton ' + (currentView === 'map' ? 'active' : null),
	            onClick: function onClick() {
	              return _this2.setState({ currentView: 'map' });
	            } },
	          'Map'
	        ),
	        DateToggle,
	        city ? React.createElement(
	          'a',
	          { target: '_blank', href: '/profile/exportCity/' + city.id },
	          React.createElement(
	            'button',
	            null,
	            'Export Spreadsheet'
	          )
	        ) : null,
	        React.createElement(_WalkFilters2.default, {
	          allFilters: _filters,
	          filters: filters,
	          removeFilter: function removeFilter(filter, option) {
	            return _this2.setState({ filters: _removeFilter(filters, filter, option) });
	          },
	          toggleFilter: function toggleFilter(filter, option) {
	            return _this2.setState({ filters: _toggleFilter(filters, filter, option) });
	          }
	        }),
	        Walks
	      );
	    }
	  }]);

	  return Walks;
	}(React.Component);

	exports.default = Walks;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// TODO*: Refactoring Components, WalksFilter is not doing much

	var Filter = function Filter(_ref) {
	  var name = _ref.name;
	  var handle = _ref.handle;
	  var toggleFilter = _ref.toggleFilter;
	  var removeFilter = _ref.removeFilter;
	  var options = _ref.options;
	  var allFilters = _ref.allFilters;
	  var filters = _ref.filters;

	  var ActiveFilters = void 0;

	  if (Object.keys(filters).includes(handle)) {
	    ActiveFilters = Object.keys(filters[handle]).map(function (fh) {
	      return React.createElement(
	        'button',
	        { key: handle, className: filters[fh] ? 'activeFilter' : 'inActiveFilter' },
	        React.createElement(
	          'span',
	          { className: 'buttonToggle', onClick: function onClick() {
	              return toggleFilter(fh);
	            } },
	          ' ',
	          name,
	          ' '
	        ),
	        React.createElement(
	          'span',
	          { className: 'buttonClose', onClick: function onClick() {
	              return removeFilter(fh);
	            } },
	          ' × '
	        )
	      );
	    });
	  }

	  return React.createElement(
	    'li',
	    null,
	    React.createElement('label', null),
	    React.createElement(
	      'select',
	      { value: 'Select', onChange: function onChange(e) {
	          return toggleFilter(e.target.value);
	        } },
	      React.createElement(
	        'option',
	        { value: '' },
	        name
	      ),
	      Object.keys(options).map(function (handle, i) {
	        return React.createElement(
	          'option',
	          { key: i, value: handle },
	          options[handle]
	        );
	      })
	    ),
	    React.createElement(
	      'section',
	      null,
	      ActiveFilters
	    )
	  );
	};

	var WalkFilters = function WalkFilters(_ref2) {
	  var filters = _ref2.filters;
	  var allFilters = _ref2.allFilters;
	  var _removeFilter = _ref2.removeFilter;
	  var _toggleFilter = _ref2.toggleFilter;


	  var Filters = Object.keys(filters).map(function (key) {
	    return React.createElement(Filter, {
	      key: key,
	      handle: key,
	      options: filters[key].data,
	      filters: filters,
	      allFilters: allFilters,
	      toggleFilter: function toggleFilter(v) {
	        return _toggleFilter(key, v);
	      },
	      removeFilter: function removeFilter(v) {
	        return _removeFilter(key, v);
	      }
	    });
	  });

	  return React.createElement(
	    'div',
	    { className: 'walksFilter' },
	    Filters
	  );
	};

	exports.default = WalkFilters;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// TODO: (Post-PR) WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined

	var InfoWindow = function InfoWindow(_ref) {
	  var url = _ref.url;
	  var title = _ref.title;
	  var shortDescription = _ref.shortDescription;
	  return React.createElement(
	    'span',
	    null,
	    React.createElement(
	      'h4',
	      null,
	      React.createElement(
	        'a',
	        { href: url },
	        title
	      )
	    ),
	    React.createElement(
	      'p',
	      null,
	      shortDescription
	    )
	  );
	};

	var manageMarkers = function manageMarkers(map, markers, walks) {

	  var infoWindow = new google.maps.InfoWindow({ maxWidth: 600 });
	  var _infoNode = document.createElement('div');

	  // Remove any markers that are not part of active walks
	  markers = markers.filter(function (m) {
	    var walkFound = walks.find(function (w) {
	      return w.id === m.walkId;
	    });

	    if (walkFound) {
	      return walkFound;
	    } else {
	      m.setMap(null);
	      return false;
	    }
	  });

	  // Add additional markers
	  walks.forEach(function (walk) {
	    if (walk.map && walk.map.markers && walk.map.markers.length) {

	      var m = walk.map.markers[0];

	      var locationLatLng = new google.maps.LatLng(m.lat, m.lng);

	      var walkFound = markers.find(function (m) {
	        return m.walkId === walk.id;
	      });

	      if (!walkFound) {
	        (function () {
	          var marker = new google.maps.Marker({
	            position: locationLatLng,
	            style: 'stop',
	            map: map,
	            walkId: walk.id
	          });

	          markers.push(marker);

	          google.maps.event.addListener(marker, 'click', function () {
	            React.render(React.createElement(InfoWindow, walk), _infoNode);

	            infoWindow.setMap(map);
	            map.panTo(marker.getPosition());
	            infoWindow.setContent(_infoNode);
	            infoWindow.open(map, marker);
	          });
	        })();
	      }
	    }
	  });

	  return markers;
	};

	var WalksMap = function (_React$Component) {
	  _inherits(WalksMap, _React$Component);

	  function WalksMap(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, WalksMap);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WalksMap)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = {
	      googleMap: null,
	      googleMapMarkers: []
	    };
	    return _this;
	  }
	  // You cannot use this.setState() in componentWillUpdate


	  _createClass(WalksMap, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(updatedProps) {
	      var _state = this.state;
	      var googleMap = _state.googleMap;
	      var googleMapMarkers = _state.googleMapMarkers;
	      var walks = updatedProps.walks;


	      this.setState({ googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks), walks: walks });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      //TODO: (Post-PR) Create a <GoogleMap/> component to generalize use of google maps
	      var _props = this.props;
	      var city = _props.city;
	      var walks = _props.walks;

	      var _city$latlng = _slicedToArray(city.latlng, 2);

	      var lat = _city$latlng[0];
	      var lng = _city$latlng[1];
	      var googleMapMarkers = this.state.googleMapMarkers;


	      var locationLatLng = new google.maps.LatLng(lat, lng);

	      //TODO: Place configuration and constants in a single file

	      var mapOptions = {
	        center: locationLatLng,
	        zoom: 12,
	        scrollwheel: false,
	        backgroundColor: '#d7f0fa'
	      };

	      var googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

	      googleMap.mapTypes.set('map_style', new google.maps.StyledMapType([{
	        featureType: "poi.park",
	        elementType: "geometry.fill",
	        stylers: [{
	          visibility: "on"
	        }, {
	          saturation: 37
	        }]
	      }, {
	        featureType: 'landscape',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#eaeaea'
	        }]
	      }, {
	        featureType: 'poi',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'poi.park',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#cadfaa'
	        }]
	      }, {
	        featureType: 'poi.school',
	        elementType: 'labels',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'poi.school',
	        elementType: 'geometry',
	        stylers: [{
	          visibility: 'on'
	        }, {
	          color: '#dadada'
	        }]
	      }, {
	        featureType: 'transit',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }, {
	        featureType: 'water',
	        stylers: [{
	          visibility: 'simplified'
	        }, {
	          color: '#90c2ff'
	        }]
	      }, {
	        featureType: 'road',
	        elementType: 'geometry',
	        stylers: [{
	          visibility: 'simplified'
	        }, {
	          color: '#ffffff'
	        }]
	      }, {
	        featureType: 'road',
	        elementType: 'labels.icon',
	        stylers: [{
	          visibility: 'off'
	        }]
	      }]));
	      googleMap.setMapTypeId('map_style');

	      this.setState({ googleMap: googleMap, googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks) });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('div', { className: 'walkMap', style: { width: '100%', height: '600px' } });
	    }
	  }]);

	  return WalksMap;
	}(React.Component);

	exports.default = WalksMap;


	WalksMap.PropTypes = {
	  walks: React.PropTypes.array.isRequired
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(22);

	//TODO: (Post PR) Common component from <Itinerary/> <Walk/>
	//https://github.com/jkoudys/janeswalk-web/blob/react14/models/page_types/Walk.php

	var Walk = function Walk(_ref) {
	  var title = _ref.title;
	  var start = _ref.start;
	  var meeting = _ref.meeting;
	  var id = _ref.id;
	  var team = _ref.team;
	  var url = _ref.url;

	  //TODO: no consistent definition of "walk-leader", how to grab the 'Led by' data, grabbing first team member.
	  //TODO: Promote | Edit | Unpublish
	  //TODO*: mailto: for email

	  return React.createElement(
	    'li',
	    { key: id },
	    React.createElement(
	      'div',
	      { className: start * 1000 > Date.now() ? 'walk' : 'walk pastWalk' },
	      React.createElement(
	        'h3',
	        null,
	        React.createElement(
	          'a',
	          { href: url },
	          title || '{untitled}'
	        )
	      ),
	      React.createElement(
	        'h4',
	        null,
	        (0, _ItineraryUtils.dateFormatted)(start)
	      ),
	      team && team.length ? React.createElement(
	        'h4',
	        null,
	        'Led by ',
	        team[0]['name-first'] + ' ' + team[0]['name-last'],
	        ' ',
	        React.createElement(
	          'a',
	          { href: 'mailto:' + team[0]['email'] },
	          team[0]['email']
	        ),
	        ' '
	      ) : null,
	      React.createElement(
	        'h4',
	        null,
	        'Meeting at ',
	        meeting || '{no meeting place}'
	      ),
	      start * 1000 > Date.now() ? React.createElement(
	        'button',
	        null,
	        React.createElement(
	          'a',
	          { href: '' },
	          'Promote'
	        )
	      ) : null,
	      React.createElement(
	        'button',
	        null,
	        React.createElement(
	          'a',
	          { href: '/walk/form/?load=' + url.split('.org')[1] },
	          'Edit'
	        )
	      ),
	      React.createElement(
	        'button',
	        null,
	        React.createElement(
	          'a',
	          { href: '' },
	          'Unpublish'
	        )
	      )
	    )
	  );
	};

	Walk.propTypes = {
	  title: React.PropTypes.string,
	  time: React.PropTypes.number,
	  meeting: React.PropTypes.string,
	  id: React.PropTypes.string.isRequired
	};

	Walk.defaultProps = {
	  title: 'Walk Title',
	  time: Date.now()
	};

	exports.default = Walk;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _WalkLeader = __webpack_require__(55);

	var _WalkLeader2 = _interopRequireDefault(_WalkLeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WalkLeaders = function (_React$Component) {
	  _inherits(WalkLeaders, _React$Component);

	  function WalkLeaders(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, WalkLeaders);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WalkLeaders)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));
	  }

	  _createClass(WalkLeaders, [{
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var activeLeaders = _state.activeLeaders;
	      var filterByDate = _state.filterByDate;
	      var sortBy = _state.sortBy;
	      var location = this.props.location;


	      var WalkLeaders = activeLeaders.map(function (wL, i) {
	        return React.createElement(_WalkLeader2.default, _extends({}, wL, { key: i }));
	      });

	      return React.createElement(
	        'section',
	        { className: 'dashboardWalkLeaders' },
	        React.createElement(
	          'button',
	          {
	            className: 'buttonAllWalks ' + (filterByDate === 'all' ? 'active' : null),
	            onClick: function onClick() {
	              return filterLeadersByDate('all', location);
	            } },
	          'All Walks'
	        ),
	        React.createElement(
	          'button',
	          {
	            className: 'buttonUpcomingWalks ' + (filterByDate === 'future' ? 'active' : null),
	            onClick: function onClick() {
	              return filterLeadersByDate('future', location);
	            } },
	          'Upcoming Walks Only'
	        ),
	        React.createElement(
	          'button',
	          {
	            className: 'buttonPastWalks ' + (filterByDate === 'past' ? 'active' : null),
	            onClick: function onClick() {
	              return filterLeadersByDate('past', location);
	            } },
	          'Past Walks Only'
	        ),
	        React.createElement('br', null),
	        React.createElement(
	          'button',
	          {
	            className: 'buttonSortAlphabetically ' + (sortBy === 'alpha' ? 'active' : null),
	            onClick: function onClick() {
	              return sortLeaders('alpha', location);
	            } },
	          'Sort Alphabetically by First Name'
	        ),
	        React.createElement(
	          'button',
	          {
	            className: 'buttonSortByMostWalks ' + (sortBy === 'count' ? 'active' : null),
	            onClick: function onClick() {
	              return sortLeaders('count', location);
	            } },
	          'Sort by Most Walks'
	        ),
	        WalkLeaders
	      );
	    }
	  }]);

	  return WalkLeaders;
	}(React.Component);

	exports.default = WalkLeaders;
	exports.default = WalkLeaders;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// TODO: Common component from <Itinerary/> <Walk/>, List component should be generic with configuration specified (maybe a mixing or factory) (Post-PR)
	// TODO: Show volunteers - so static data generated is not correct (confirm with json data provided before proceeding with any changes

	var Walk = function Walk(_ref) {
	  var firstName = _ref.firstName;
	  var lastName = _ref.lastName;
	  var walks = _ref.walks;
	  var email = _ref.email;


	  var Walks = walks.map(function (w, i) {
	    // TODO: date parsing like this can be extremely slow.
	    var fullYear = new Date(w.time.slots[0][0] * 1000).getFullYear();
	    return React.createElement(
	      "li",
	      { key: i },
	      React.createElement(
	        "a",
	        { href: w.url },
	        w.title
	      ),
	      " (",
	      fullYear,
	      ")"
	    );
	  });

	  return React.createElement(
	    "li",
	    null,
	    React.createElement(
	      "div",
	      { className: "walkLeader" },
	      React.createElement(
	        "h3",
	        null,
	        "Walk Leader: ",
	        firstName + " " + lastName,
	        " ",
	        React.createElement(
	          "span",
	          { className: "walkLeaderEmail" },
	          React.createElement(
	            "a",
	            { href: "mailto:" + email },
	            email
	          )
	        )
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "h4",
	          null,
	          Walks
	        )
	      )
	    )
	  );
	};

	Walk.propTypes = {
	  firstName: React.PropTypes.string.isRequired,
	  lastName: React.PropTypes.string.isRequired,
	  walks: React.PropTypes.array.isRequired,
	  email: React.PropTypes.string.isRequired
	};

	exports.default = Walk;

/***/ },
/* 56 */,
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AddWalkToList = __webpack_require__(58);

	var _AddWalkToList2 = _interopRequireDefault(_AddWalkToList);

	var _AddToItinerary = __webpack_require__(32);

	var _AddToItinerary2 = _interopRequireDefault(_AddToItinerary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Walk = function (_React$Component) {
	  _inherits(Walk, _React$Component);

	  function Walk() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Walk);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Walk)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.state = {
	      dialogOpen: false
	    };
	    return _this;
	  }

	  _createClass(Walk, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var list = _ref.list;

	      // If the active list changes, close the dialog
	      if (list !== this.props.list) {
	        this.setState({ dialogOpen: false });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var walk = _props.walk;
	      var list = _props.list;
	      var lists = _props.lists;
	      var onAdd = _props.onAdd;
	      var onRemove = _props.onRemove;
	      var onSchedule = _props.onSchedule;
	      var onUnschedule = _props.onUnschedule;
	      var schedule = _props.schedule;
	      var isScheduled = _props.isScheduled;
	      var dialogOpen = this.state.dialogOpen;
	      var title = walk.title;
	      var url = walk.url;
	      var map = walk.map;
	      var time = walk.time;

	      var meeting = void 0,
	          start = void 0;

	      if (map && map.markers[0]) {
	        meeting = map.markers[0].title;
	      }

	      return React.createElement(
	        'li',
	        { className: 'walklistItem' },
	        React.createElement(
	          'div',
	          { className: 'walk' },
	          React.createElement(
	            'h3',
	            null,
	            React.createElement(
	              'a',
	              { href: url },
	              title
	            )
	          ),
	          React.createElement(
	            'h4',
	            null,
	            meeting
	          ),
	          React.createElement(_AddToItinerary2.default, { schedule: schedule, time: time, walk: walk, onSchedule: onSchedule, onUnschedule: onUnschedule, isScheduled: isScheduled })
	        ),
	        React.createElement('button', {
	          className: 'action removeWalk',
	          onClick: function onClick() {
	            return onRemove(list);
	          }
	        }),
	        React.createElement('button', {
	          className: 'action addWalk ' + (dialogOpen ? 'selected' : ''),
	          onClick: function onClick() {
	            return _this2.setState({ dialogOpen: !dialogOpen });
	          }
	        }),
	        dialogOpen ? React.createElement(_AddWalkToList2.default, { lists: lists, walk: walk, list: list, onAdd: onAdd, onRemove: onRemove }) : null
	      );
	    }
	  }]);

	  return Walk;
	}(React.Component);

	Walk.propTypes = {
	  title: React.PropTypes.string,
	  time: React.PropTypes.number,
	  meeting: React.PropTypes.string,
	  id: React.PropTypes.number.isRequired,
	  remove: React.PropTypes.func.isRequired
	};

	Walk.defaultProps = {
	  title: 'Walk Title',
	  time: { slots: [Date.now(), Date.now()] },
	  remove: null
	};

	exports.default = Walk;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(25);

	var AddWalkToList = function AddWalkToList(_ref) {
	  var lists = _ref.lists;
	  var walk = _ref.walk;
	  var list = _ref.list;
	  var onAdd = _ref.onAdd;
	  var onRemove = _ref.onRemove;

	  //selectedWalk comes from where
	  var allLists = [];

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    var _loop = function _loop() {
	      var otherList = _step.value;

	      if (list !== otherList) {
	        var id = otherList.id;
	        var title = otherList.title;
	        var walks = otherList.walks;

	        var walkFound = walks.has(walk);
	        var action = void 0;

	        if (walkFound) {
	          action = function action() {
	            return onRemove(otherList);
	          };
	        } else {
	          action = function action() {
	            return onAdd(otherList);
	          };
	        }

	        allLists.push(React.createElement(
	          'li',
	          { key: id },
	          React.createElement(
	            'a',
	            { onClick: action, className: walkFound ? 'selected' : '' },
	            title
	          )
	        ));
	      }
	    };

	    for (var _iterator = lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      _loop();
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return React.createElement(
	    'div',
	    { id: 'addWalk', className: 'add-walk-to-list' },
	    React.createElement(
	      'ul',
	      null,
	      allLists
	    )
	  );
	};

	AddWalkToList.propTypes = {
	  lists: React.PropTypes.instanceOf(Set)
	};

	exports.default = AddWalkToList;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(25);

	var ItineraryHeader = function ItineraryHeader(_ref) {
	  var list = _ref.list;
	  var onChangeTitle = _ref.onChangeTitle;
	  var onChangeDescription = _ref.onChangeDescription;
	  return React.createElement(
	    "header",
	    { className: "itineraryHeader" },
	    React.createElement(
	      "h2",
	      null,
	      React.createElement("input", {
	        type: "text",
	        required: "required",
	        value: list.title,
	        placeholder: (0, _I18nStore.t)('My Itinerary\'s Title'),
	        onChange: function onChange(ev) {
	          return onChangeTitle(ev.target.value);
	        }
	      })
	    ),
	    list.shareUrl && false ? React.createElement(
	      "h5",
	      { className: "shareUrl" },
	      React.createElement(
	        "a",
	        { href: list.shareUrl },
	        list.shareUrl
	      )
	    ) : null,
	    React.createElement(
	      "h4",
	      { className: "walklistDescription" },
	      React.createElement("textarea", {
	        required: "required",
	        value: list.description,
	        placeholder: (0, _I18nStore.t)('Tell people about it! Start typing here to give your list some commentary.'),
	        onChange: function onChange(ev) {
	          return onChangeDescription(ev.target.value);
	        }
	      })
	    )
	  );
	};

	ItineraryHeader.propTypes = {
	  title: React.PropTypes.string,
	  description: React.PropTypes.string
	};

	exports.default = ItineraryHeader;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryActions = __webpack_require__(14);

	var _I18nStore = __webpack_require__(25);

	var ItinerarySelect = function ItinerarySelect(_ref) {
	  var lists = _ref.lists;
	  var activeList = _ref.activeList;
	  var onChoose = _ref.onChoose;
	  var onCreate = _ref.onCreate;

	  var listItems = [];
	  lists.forEach(function (list) {
	    return listItems.push(React.createElement(
	      'li',
	      { key: list.id },
	      React.createElement(
	        'a',
	        { className: activeList === list ? 'selected' : '', onClick: function onClick() {
	            return onChoose(list);
	          } },
	        list.title,
	        ' (',
	        list.walks.size,
	        ')'
	      )
	    ));
	  });

	  return React.createElement(
	    'dialog',
	    { id: 'itinerary-select', className: 'static-list' },
	    React.createElement(
	      'ul',
	      null,
	      listItems
	    ),
	    React.createElement(
	      'button',
	      { onClick: onCreate },
	      React.createElement('i', { className: 'fa fa-plus' }),
	      ' ',
	      (0, _I18nStore.t)('New List')
	    )
	  );
	};

	exports.default = ItinerarySelect;

/***/ }
/******/ ]);