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

	var _CityStore = __webpack_require__(34);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _Itinerary = __webpack_require__(35);

	var ItineraryAPI = _interopRequireWildcard(_Itinerary);

	var _CreateWalk = __webpack_require__(36);

	var _CreateWalk2 = _interopRequireDefault(_CreateWalk);

	var _Walk = __webpack_require__(64);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _Dashboard = __webpack_require__(78);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _Login = __webpack_require__(90);

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
	      if (ev.target.tagName !== 'INPUT') {
	        ev.preventDefault();
	        switch (String(ev.key || ev.keyCode && String.fromCharCode(ev.keyCode) || ev.char).toUpperCase()) {
	          case 'M':
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

	// Render the sitewide elements


	// load modals
	/* global React ReactDOM JanesWalk */

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
	    ReactDOM.render(React.createElement(_Navbar2.default, null), navbar);
	  }

	  // Render modals we need on each page
	  ReactDOM.render(React.createElement(_Login2.default, { socialLogin: (JanesWalk.stacks || { 'Social Logins': '' })['Social Logins'] }), document.getElementById('modals'));
	}

	// Dispatch our own event so we only need one callback on google maps loading
	window.googleMapsLoaded = function () {
	  JanesWalk.event.emit('google.loaded');
	};

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
	    var canEdit = _ref.canEdit;

	    WalkActions.receive(walk);
	    ReactDOM.render(React.createElement(_Walk2.default, { city: city, page: JanesWalk.page, walk: walk, canEdit: canEdit }), document.getElementById('page'));
	  });

	  // The profile page, e.g. /profile
	  JanesWalk.event.on('profilepage.load', function (props) {
	    ReactDOM.render(React.createElement(_Dashboard2.default, props), document.getElementById('page'));
	  });

	  // Create a walk
	  JanesWalk.event.on('caw.load', function () {
	    ReactDOM.render(React.createElement(_CreateWalk2.default, {
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
	      {
	        var city = _CityStore2.default.getCity();
	        if (city) {
	          var bgUri = 'url(' + city.background + ')';
	          if (city.background && document.body.style.backgroundImage !== bgUri) {
	            document.body.style.backgroundImage = bgUri;
	          }
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
	  setTimeout(function () {
	    return ItineraryAPI.startPolling();
	  }, 1000);

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

	var I18nActions = _interopRequireWildcard(_I18nActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Load translations file from JanesWalk
	 *
	 * @param object locale The locale definition, including name and url to messages
	 */
	function getTranslations(locale) {
	  // Check that we have a translations file set
	  if (locale && locale.translation) {
	    // Grab from session if we have it
	    var translation = sessionStorage.getItem('i18n_' + locale.name);
	    if (translation) {
	      I18nActions.receive(JSON.parse(translation).translations['']);
	    } else {
	      fetch(locale.translation).then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        // Store with the session
	        sessionStorage.setItem('i18n_' + locale.name, JSON.stringify(data));

	        // Trigger i18n change on complete
	        I18nActions.receive(data.translations['']);
	      }).catch(function (_ref) {
	        var message = _ref.message;
	        return console.error('Failed to fetch translations: ' + message);
	      });
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Itinerary = __webpack_require__(16);

	var _Itinerary2 = _interopRequireDefault(_Itinerary);

	var _AreaStore = __webpack_require__(29);

	var _AreaStore2 = _interopRequireDefault(_AreaStore);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _dom = __webpack_require__(31);

	var _LoggedInOptions = __webpack_require__(32);

	var _LoggedInOptions2 = _interopRequireDefault(_LoggedInOptions);

	var _LoggedOutOptions = __webpack_require__(33);

	var _LoggedOutOptions2 = _interopRequireDefault(_LoggedOutOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React ReactDOM $ CCM_EDIT_MODE */


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

	    Object.assign(_this, {
	      state: _extends({
	        lastSize: _ItineraryStore2.default.totalWalks()
	      }, getNavbar()),
	      _onChange: function _onChange() {
	        return _this.setState(getNavbar);
	      }
	    });
	    return _this;
	  }

	  _createClass(Navbar, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _AreaStore2.default.addChangeListener(this._onChange);
	      _UserStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      appendSiblings(this.state.options, this.refs.topnav);
	      (0, _dom.makeSticky)(ReactDOM.findDOMNode(this), this.refs.header);
	    }

	    /**
	     * Need to check if the HTML has updated, so we don't rebuild the DOM
	     */

	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, _ref) {
	      var options = _ref.options;
	      var searching = _ref.searching;

	      if (options && options !== this.state.options) {
	        appendSiblings(options, this.refs.topnav);
	      }

	      // See if we're opening the search
	      if (!this.state.searching && searching) {
	        this.openSearch();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _AreaStore2.default.removeChangeListener(this._onChage);
	      _UserStore2.default.removeChangeListener(this._onChage);
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
	        userOptions = (0, _LoggedInOptions2.default)(_extends({}, defaultOptions, {
	          unseenUpdates: this.state.lastSize !== totalWalks,
	          toggleProfile: function toggleProfile() {
	            return _this2.setState({ profiling: !_this2.state.profiling, lastSize: totalWalks });
	          },
	          user: user,
	          profiling: profiling
	        }));
	      } else {
	        userOptions = (0, _LoggedOutOptions2.default)(defaultOptions);
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

	var _templateObject = _taggedTemplateLiteral(['New Itinerary'], ['New Itinerary']),
	    _templateObject2 = _taggedTemplateLiteral(['Powered by the Knight Foundation'], ['Powered by the Knight Foundation']);

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	var _ItineraryActions = __webpack_require__(14);

	var Actions = _interopRequireWildcard(_ItineraryActions);

	var _I18nStore = __webpack_require__(21);

	var _Walk = __webpack_require__(23);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _ItineraryHeader = __webpack_require__(27);

	var _ItineraryHeader2 = _interopRequireDefault(_ItineraryHeader);

	var _ItinerarySelect = __webpack_require__(28);

	var _ItinerarySelect2 = _interopRequireDefault(_ItinerarySelect);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global React ReactDOM $ */

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

	      var $el = $(ReactDOM.findDOMNode(this));
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
	      Actions.createList((0, _I18nStore.translateTag)(_templateObject));
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
	            (0, _I18nStore.translateTag)(_templateObject2)
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

	var _register;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Set<Set> A set of walk sets
	var _lists = new Set();

	// Map<{walk}:[times]> A map of times set for each walk
	var _schedule = new Map();

	// Has this store been synced, and is it syncing?
	var _lastChange = Date.now();

	// TODO: Currently no remove list, just adding lists
	// TODO: How to handle cancelled walks and removing from itinerary when no sign-ups

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

	  lists.forEach(function (itinerary) {
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

	var ItineraryStore = Object.assign({}, _Store2.default, {
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
	      count += list.walks.size;
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
	    list.title = title;
	  }), _defineProperty(_register, _JWConstants.ActionTypes.ITINERARY_UPDATE_DESCRIPTION, function (_ref6) {
	    var list = _ref6.list;
	    var description = _ref6.description;
	    list.description = description;
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(19);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CHANGE_EVENT = 'change'; /**
	                              * The generic 'store', which more complex stores are composed from
	                              */

	// Requires


	var Store = Object.assign({}, _events2.default.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },


	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});

	exports.default = Store;

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
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
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = walks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var walk = _step.value;

	      receiveWalk(walk);
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
	}

	// Get the "outings", or scheduled dates, for our walks
	function getWalkOutings() {
	  return [].concat(_toConsumableArray(_walks.values())).reduce(function (arr, walk) {
	    if (walk.time && walk.time.slots) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = walk.time.slots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var slot = _step2.value;

	          arr.push({ walk: walk, slot: slot });
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	    return arr;
	  }, []).sort(function (a, b) {
	    return a.slot[0] - b.slot[0];
	  });
	}

	var WalkStore = Object.assign({}, _Store2.default, {
	  getWalks: function getWalks() {
	    return _walks;
	  },
	  getWalk: function getWalk(id) {
	    return _walks.get(+id);
	  },
	  getWalkOutings: getWalkOutings,

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tc = exports.translateTag = exports.t2 = exports.t = undefined;

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _translate = __webpack_require__(22);

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

	var I18nStore = Object.assign({}, _Store2.default, {
	  getTranslate: function getTranslate() {
	    return _i18n.translate.bind(_i18n);
	  },
	  getTranslateTag: function getTranslateTag() {
	    return _i18n.translateTag.bind(_i18n);
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
	var translateTag = exports.translateTag = I18nStore.getTranslateTag();

	// FIXME make this real
	var tc = exports.tc = function tc(c, s) {
	  return s;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	/**
	 * i18n translation class
	 *
	 * @param object translations A map of i18next-format translations
	 */

	// sprintf tokenizer
	function sprintf(str) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return str.replace(/%(s|d)/g, function () {
	    return args.shift();
	  });
	}

	function I18nTranslator(translations) {
	  if (translations) {
	    this.translations = translations;
	  }
	}

	// Prototype methods
	Object.assign(I18nTranslator.prototype, {
	  // The big translations map
	  translations: {},

	  /**
	   * Basic translation.
	   * sprintf syntax used to replace %d and %s tokens with arguments
	   */
	  translate: function translate(str) {
	    var _ref = this.translations[str] || [];

	    var _ref2 = _slicedToArray(_ref, 1);

	    var translation = _ref2[0];

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    return sprintf.apply(undefined, [translation || str].concat(args));
	  },


	  /*
	   * Tagged template literal
	   * Turn a tagged template into a sprintf format
	   */
	  translateTag: function translateTag(strings) {
	    for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      values[_key3 - 1] = arguments[_key3];
	    }

	    return this.translate.apply(this, [strings.join('%s')].concat(values));
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
	  translatePlural: function translatePlural(singular, plural, count) {
	    // TODO Use the plural rules for the language, not just English
	    var isPlural = count !== 1 ? 1 : 0;

	    var translateTo = (this.translations[singular + '_' + plural] || [singular, plural])[isPlural];
	    return sprintf(translateTo, count);
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
	  translateContext: function translateContext(context, str) {
	    for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	      args[_key4 - 2] = arguments[_key4];
	    }

	    // i18n lib makes context keys simply an underscore between them
	    sprintf.apply(undefined, [context + '_' + str].concat(args));
	  }
	});

	module.exports = I18nTranslator;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AddWalkToList = __webpack_require__(24);

	var _AddWalkToList2 = _interopRequireDefault(_AddWalkToList);

	var _AddToItinerary = __webpack_require__(25);

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
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global React */

	var AddWalkToList = function AddWalkToList(_ref) {
	  var lists = _ref.lists;
	  var walk = _ref.walk;
	  var list = _ref.list;
	  var onAdd = _ref.onAdd;
	  var onRemove = _ref.onRemove;

	  // selectedWalk comes from where
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(26);

	var _I18nStore = __webpack_require__(21);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global React */

	var AddToItinerary = function AddToItinerary(_ref) {
	  var schedule = _ref.schedule;
	  var time = _ref.time;
	  var walk = _ref.walk;
	  var onSchedule = _ref.onSchedule;
	  var onUnschedule = _ref.onUnschedule;

	  var addButtons = [];
	  var timeSet = schedule.get(walk) || new Set();

	  if (time && time.slots) {
	    addButtons.push.apply(addButtons, _toConsumableArray(time.slots.map(function (t) {
	      var date = (0, _ItineraryUtils.dateFormatted)(t[0]);
	      var duration = (0, _I18nStore.t2)('%s Hour', '%s Hours', (t[1] - t[0]) / 3600);
	      if (timeSet.has(+t[0])) {
	        return React.createElement(
	          'h4',
	          null,
	          date,
	          ', ',
	          duration,
	          React.createElement('button', { className: 'removeItinerary', onClick: function onClick() {
	              return onUnschedule(+t[0]);
	            } })
	        );
	      }
	      return React.createElement(
	        'h4',
	        null,
	        date,
	        ', ',
	        duration,
	        React.createElement('button', { className: 'addItinerary', onClick: function onClick() {
	            return onSchedule(+t[0]);
	          } })
	      );
	    })));
	  }
	  return React.createElement(
	    'section',
	    null,
	    addButtons
	  );
	};

	exports.default = AddToItinerary;

/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryActions = __webpack_require__(14);

	var _I18nStore = __webpack_require__(21);

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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _areas = {};

	var AreaStore = Object.assign({}, _Store2.default, {
	  getAreas: function getAreas() {
	    return _areas;
	  },
	  getArea: function getArea(name) {
	    return _areas[name];
	  },

	  dispatcherIndex: (0, _AppDispatcher.register2)(_defineProperty({}, _JWConstants.ActionTypes.AREA_RECEIVE, function (_ref) {
	    var name = _ref.name;
	    var content = _ref.content;
	    _areas[name] = content;
	  }), function () {
	    return AreaStore.emitChange();
	  })
	});

	exports.default = AreaStore;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	  // Merge users, so we can add more data to the same one.
	  var newUser = Object.assign(_users.get(+user.id) || {}, user);
	  _users.set(+user.id, newUser);

	  if (current) {
	    _current = newUser;
	  }
	}

	var UserStore = Object.assign({}, _Store2.default, {
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	/* Build menu options depending if currently logged in or not */

	exports.default = function (_ref) {
	  var user = _ref.user;
	  var profiling = _ref.profiling;
	  var searching = _ref.searching;
	  var toggleProfile = _ref.toggleProfile;
	  var toggleSearch = _ref.toggleSearch;
	  var unseenUpdates = _ref.unseenUpdates;
	  return [React.createElement(
	    'li',
	    { key: 'nav2', className: unseenUpdates ? 'notify' : '' },
	    React.createElement(
	      'a',
	      { href: '#', onClick: toggleProfile, className: profiling ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-calendar' })
	    )
	  ), React.createElement(
	    'li',
	    { key: 'nav3' },
	    React.createElement(
	      'a',
	      { href: '/profile' },
	      user.firstName || user.name
	    )
	  ), React.createElement(
	    'li',
	    { key: 'nav4' },
	    React.createElement(
	      'a',
	      { href: '/login/logout' },
	      (0, _I18nStore.t)('Logout')
	    )
	  )];
	}; /**
	    * Array-builder of menu options. note: not a component, since there isn't a root element,
	    * but an array of components.
	    */
	/* global React */

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	exports.default = function (_ref) {
	  var searching = _ref.searching;
	  var toggleSearch = _ref.toggleSearch;
	  return [React.createElement(
	    "li",
	    { key: "nav2" },
	    React.createElement(
	      "a",
	      { href: "/register" },
	      (0, _I18nStore.tc)('Register on a website', 'Join')
	    )
	  ), React.createElement(
	    "li",
	    { key: "nav3" },
	    React.createElement(
	      "a",
	      { onClick: function onClick() {
	          return $('#login').modal();
	        } },
	      (0, _I18nStore.t)('Log in')
	    )
	  )];
	}; /* global React $ */

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * City store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * Single-city storage. May be refactored for multiple cities later, but
	                                                                                                                                                                                                                   * currently no requirement exists for this.
	                                                                                                                                                                                                                   */

	// Store singletons
	var _city = void 0;

	var CityStore = Object.assign({}, _Store2.default, {
	  getCity: function getCity() {
	    return _city;
	  },
	  getLocation: function getLocation() {
	    return _city && _city.latlng;
	  },

	  dispatchToken: (0, _AppDispatcher.register2)(_defineProperty({}, _JWConstants.ActionTypes.CITY_RECEIVE, function (_ref) {
	    var city = _ref.city;
	    _city = city;
	  }), function () {
	    return CityStore.emitChange();
	  })
	});
	exports.default = CityStore;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.post = post;
	exports.get = get;
	exports.startPolling = startPolling;

	var _ItineraryStore = __webpack_require__(17);

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

	  fetch(url, {
	    method: 'POST',
	    body: getJson(_ItineraryStore2.default.getLists(), _ItineraryStore2.default.getSchedule()),
	    credentials: 'include'
	  }).then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    return console.log(json);
	  }).catch(function (error) {
	    return console.error('Failed to update itinerary: ' + error.message);
	  });
	}

	function get() {
	  var url = arguments.length <= 0 || arguments[0] === undefined ? endpoint : arguments[0];

	  fetch(url, {
	    method: 'GET',
	    credentials: 'include'
	  }).then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    return (0, _ItineraryActions.receiveAll)(json);
	  }).catch(function (error) {
	    return console.error('Failed to update itinerary: ' + error.message);
	  });
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Preview Walk'], ['Preview Walk']),
	    _templateObject2 = _taggedTemplateLiteral(['Publish Walk'], ['Publish Walk']),
	    _templateObject3 = _taggedTemplateLiteral(['Save'], ['Save']),
	    _templateObject4 = _taggedTemplateLiteral(['Hey there, ', '!'], ['Hey there, ', '!']),
	    _templateObject5 = _taggedTemplateLiteral(['Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.'], ['Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.']),
	    _templateObject6 = _taggedTemplateLiteral(['Describe Your Walk'], ['Describe Your Walk']),
	    _templateObject7 = _taggedTemplateLiteral(['Walk Title'], ['Walk Title']),
	    _templateObject8 = _taggedTemplateLiteral(['Something short and memorable.'], ['Something short and memorable.']),
	    _templateObject9 = _taggedTemplateLiteral(['Your Walk in a Nutshell'], ['Your Walk in a Nutshell']),
	    _templateObject10 = _taggedTemplateLiteral(['Build intrigue! This is what people see when browsing our walk listings.'], ['Build intrigue! This is what people see when browsing our walk listings.']),
	    _templateObject11 = _taggedTemplateLiteral(['Walk Description'], ['Walk Description']),
	    _templateObject12 = _taggedTemplateLiteral(['Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.'], ['Help jump start the conversation on your walk by giving readers an idea of the discussions you\\\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.']),
	    _templateObject13 = _taggedTemplateLiteral(['Make it Accessible'], ['Make it Accessible']),
	    _templateObject14 = _taggedTemplateLiteral(['What else do people need to know about the accessibility of this walk?'], ['What else do people need to know about the accessibility of this walk?']),
	    _templateObject15 = _taggedTemplateLiteral(['Optional'], ['Optional']),
	    _templateObject16 = _taggedTemplateLiteral(['How can someone get to the meeting spot by public transit?'], ['How can someone get to the meeting spot by public transit?']),
	    _templateObject17 = _taggedTemplateLiteral(['Nearest subway stop, closest bus or streetcar lines, etc.'], ['Nearest subway stop, closest bus or streetcar lines, etc.']),
	    _templateObject18 = _taggedTemplateLiteral(['Where are the nearest places to park?'], ['Where are the nearest places to park?']),
	    _templateObject19 = _taggedTemplateLiteral(['How will people find you?'], ['How will people find you?']),
	    _templateObject20 = _taggedTemplateLiteral(['Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.'], ['Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.']),
	    _templateObject21 = _taggedTemplateLiteral(['Contact City Organizer for help'], ['Contact City Organizer for help']),
	    _templateObject22 = _taggedTemplateLiteral(['Hi! I\'m ', ', the City Organizer for Jane\'s Walk ', '. I\'m here to help, so if you have any questions, please '], ['Hi! I\'m ', ', the City Organizer for Jane\'s Walk ', '. I\'m here to help, so if you have any questions, please ']),
	    _templateObject23 = _taggedTemplateLiteral(['email me'], ['email me']);

	var _ImageUpload = __webpack_require__(37);

	var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

	var _ThemeSelect = __webpack_require__(38);

	var _ThemeSelect2 = _interopRequireDefault(_ThemeSelect);

	var _MapBuilder = __webpack_require__(41);

	var _MapBuilder2 = _interopRequireDefault(_MapBuilder);

	var _DateSelect = __webpack_require__(48);

	var _DateSelect2 = _interopRequireDefault(_DateSelect);

	var _WardSelect = __webpack_require__(54);

	var _WardSelect2 = _interopRequireDefault(_WardSelect);

	var _AccessibleSelect = __webpack_require__(55);

	var _AccessibleSelect2 = _interopRequireDefault(_AccessibleSelect);

	var _TeamBuilder = __webpack_require__(56);

	var _TeamBuilder2 = _interopRequireDefault(_TeamBuilder);

	var _WalkPublish = __webpack_require__(57);

	var _WalkPublish2 = _interopRequireDefault(_WalkPublish);

	var _TextAreaLimit = __webpack_require__(58);

	var _TextAreaLimit2 = _interopRequireDefault(_TextAreaLimit);

	var _WalkPreview = __webpack_require__(59);

	var _WalkPreview2 = _interopRequireDefault(_WalkPreview);

	var _TabNav = __webpack_require__(60);

	var _TabNav2 = _interopRequireDefault(_TabNav);

	var _Walk = __webpack_require__(61);

	var _I18nStore = __webpack_require__(21);

	var _I18nStore2 = _interopRequireDefault(_I18nStore);

	var _NotifyStore = __webpack_require__(63);

	var _NotifyStore2 = _interopRequireDefault(_NotifyStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Create a Walk
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Form for creating new walks. Includes a map builder, team builder, scheduler
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/* global React $ CCM_THEME_PATH */

	// Load create-a-walk View components


	// Flux


	// TODO: move into store
	var _notifications = [];

	function addNotice(notice) {
	  _notifications.push(notice);
	}

	function removeNotice() {
	  _notifications.shift();
	}

	var CreateWalk = function (_React$Component) {
	  _inherits(CreateWalk, _React$Component);

	  function CreateWalk(props) {
	    _classCallCheck(this, CreateWalk);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CreateWalk).call(this, props));

	    var data = props.data;
	    var user = props.user;
	    var url = props.url;

	    // Instance props

	    Object.assign(_this, {
	      state: Object.assign({}, (0, _Walk.buildWalkObject)({ data: data, user: user, url: url })),

	      // Simple trigger to re-render the components
	      _onChange: function _onChange() {
	        return _this.setState({});
	      },

	      // Persist our walk server-side
	      saveWalk: function saveWalk(options, cb) {
	        /* Send in the updated walk to save, but keep working */

	        var defaultOptions = {
	          messageTimeout: 1200
	        };

	        options = Object.assign({}, defaultOptions, options);

	        addNotice({ type: 'info', name: 'Saving walk' });

	        // Build a simplified map from the Google objects
	        _this.setState({
	          map: _this.refs.mapBuilder.getStateSimple()
	        }, function () {
	          // The state itself is our walk JSON
	          var body = new FormData();
	          body.append('json', JSON.stringify(_this.state));

	          // Fetch walk to persist it. PUT is publish, POST is save
	          fetch('/index.php?cID=' + _this.state.id, {
	            method: options.publish ? 'PUT' : 'POST',
	            credentials: 'include',
	            body: body
	          }).then(function (res) {
	            return res.json();
	          }).then(function (json) {
	            if (json.error) {
	              throw Error(json.error);
	            } else {
	              return json;
	            }
	          }).then(function (_ref) {
	            var walkUrl = _ref.url;

	            addNotice({ type: 'success', name: 'Walk saved' });
	            _this.setState({ url: walkUrl || _this.state.url }, function checkCallback() {
	              if (cb && cb instanceof Function) {
	                // The 'this' in each callback should be the <CreateWalk>
	                cb.call(this);
	              }
	            });
	            setTimeout(removeNotice, 1200);
	          }).catch(function (_ref2) {
	            var message = _ref2.message;

	            addNotice({
	              type: 'danger',
	              name: 'Walk failed to save',
	              message: 'Keep this window open and contact Jane\'s Walk for assistance. Details: ' + message
	            });
	            setTimeout(removeNotice, 6000);
	            console.error(_this.state.url, message);
	          });
	        });
	        setTimeout(removeNotice, 1200);
	      },

	      // Click the 'next' button
	      handleNext: function handleNext() {
	        // Bootstrap's managing the tabs, so trigger a jQuery click on the next
	        var next = $('#progress-panel > .nav > li.active + li > a');
	        window.scrollTo(0, 0);
	        if (next.length) {
	          _this.saveWalk();
	          next.trigger('click');
	        } else {
	          // If no 'next' tab, next step is to publish
	          $(_this.refs.publish).trigger('click');
	        }
	      },

	      // Publish the walk
	      handlePublish: function handlePublish() {
	        return _this.saveWalk({ publish: true }, function () {
	          return console.log('Walk published');
	        });
	      },

	      // Preview the walk
	      handlePreview: function handlePreview() {
	        return _this.saveWalk({}, function () {
	          return _this.setState({ preview: true });
	        });
	      }
	    });
	    return _this;
	  }

	  _createClass(CreateWalk, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _I18nStore2.default.addChangeListener(this._onChange);
	      _NotifyStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _I18nStore2.default.removeChangeListener(this._onChange);
	      _NotifyStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      // Used to let the map pass a callback
	      var linkStateMap = {
	        value: this.state.map,
	        requestChange: function requestChange(newVal, cb) {
	          _this2.setState({ map: newVal }, cb);
	        }
	      };

	      var _props = this.props;
	      var user = _props.user;
	      var valt = _props.valt;
	      var city = _props.city;
	      var team = this.state.team;


	      return React.createElement(
	        'main',
	        { id: 'create-walk' },
	        React.createElement(
	          'section',
	          null,
	          React.createElement(
	            'nav',
	            { id: 'progress-panel' },
	            React.createElement(_TabNav2.default, null),
	            React.createElement(
	              'section',
	              { id: 'button-group' },
	              React.createElement(
	                'button',
	                {
	                  className: 'btn btn-info btn-preview',
	                  id: 'preview-walk',
	                  title: 'Preview what you have so far.',
	                  onClick: this.handlePreview
	                },
	                (0, _I18nStore.translateTag)(_templateObject)
	              ),
	              React.createElement(
	                'button',
	                {
	                  className: 'btn btn-info btn-submit',
	                  id: 'btn-submit',
	                  title: 'Publishing will make your visible to all.',
	                  onClick: function onClick() {
	                    return _this2.setState({ publish: true });
	                  },
	                  ref: 'publish'
	                },
	                (0, _I18nStore.translateTag)(_templateObject2)
	              ),
	              React.createElement(
	                'button',
	                {
	                  className: 'btn btn-info save',
	                  title: 'Save',
	                  id: 'btn-save',
	                  onClick: this.saveWalk
	                },
	                (0, _I18nStore.translateTag)(_templateObject3)
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { id: 'main-panel', role: 'main' },
	            React.createElement(
	              'div',
	              { className: 'tab-content' },
	              React.createElement(
	                'div',
	                { className: 'tab-pane active', id: 'description' },
	                React.createElement(
	                  'div',
	                  { className: 'walk-submit lead clearfix' },
	                  React.createElement(
	                    'div',
	                    { className: 'col-md-4' },
	                    React.createElement('img', { id: 'convo-marker', src: CCM_THEME_PATH + '/img/jw-intro-graphic.svg', alt: 'Jane\'s Walks are walking conversations.' })
	                  ),
	                  React.createElement(
	                    'div',
	                    { className: 'col-md-8' },
	                    React.createElement(
	                      'h1',
	                      null,
	                      (0, _I18nStore.translateTag)(_templateObject4, user.firstName)
	                    ),
	                    React.createElement(
	                      'p',
	                      null,
	                      (0, _I18nStore.translateTag)(_templateObject5)
	                    )
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'page-header', 'data-section': 'description' },
	                  React.createElement(
	                    'h1',
	                    null,
	                    (0, _I18nStore.translateTag)(_templateObject6)
	                  )
	                ),
	                React.createElement(
	                  'form',
	                  null,
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'div',
	                      { className: 'item required' },
	                      React.createElement(
	                        'label',
	                        { htmlFor: 'title' },
	                        (0, _I18nStore.translateTag)(_templateObject7)
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.translateTag)(_templateObject8)
	                      ),
	                      React.createElement('input', { type: 'text', valueLink: this.linkState('title') })
	                    )
	                  )
	                ),
	                React.createElement(_ImageUpload2.default, { valueLink: this.linkState('thumbnails'), valt: valt }),
	                React.createElement(
	                  'form',
	                  null,
	                  React.createElement('hr', null),
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'div',
	                      { className: 'item required' },
	                      React.createElement(
	                        'label',
	                        { htmlFor: 'shortdescription' },
	                        (0, _I18nStore.translateTag)(_templateObject9)
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.translateTag)(_templateObject10)
	                      ),
	                      React.createElement(_TextAreaLimit2.default, { id: 'shortdescription', name: 'shortdescription', rows: '6', maxLength: '140', valueLink: this.linkState('shortDescription'), required: true })
	                    ),
	                    React.createElement('hr', null),
	                    React.createElement(
	                      'div',
	                      { className: 'item required' },
	                      React.createElement(
	                        'label',
	                        { htmlFor: 'longdescription', id: 'longwalkdescription' },
	                        (0, _I18nStore.translateTag)(_templateObject11)
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.translateTag)(_templateObject12)
	                      ),
	                      React.createElement('textarea', { id: 'longdescription', name: 'longdescription', rows: '14', valueLink: this.linkState('longDescription') })
	                    )
	                  ),
	                  React.createElement(_ThemeSelect2.default, { valueLink: this.linkState('checkboxes') }),
	                  (city.wards || []).length > 0 ? React.createElement(_WardSelect2.default, { wards: city.wards, valueLink: this.linkState('wards') }) : null,
	                  React.createElement('hr', null)
	                )
	              ),
	              React.createElement(_MapBuilder2.default, { ref: 'mapBuilder', valueLink: linkStateMap, city: city }),
	              React.createElement(_DateSelect2.default, { valueLink: this.linkState('time') }),
	              React.createElement(
	                'div',
	                { className: 'tab-pane', id: 'accessibility' },
	                React.createElement(
	                  'div',
	                  { className: 'page-header', 'data-section': 'accessibility' },
	                  React.createElement(
	                    'h1',
	                    null,
	                    (0, _I18nStore.translateTag)(_templateObject13)
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'item' },
	                  React.createElement(_AccessibleSelect2.default, { valueLink: this.linkState('checkboxes') })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'item' },
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'legend',
	                      null,
	                      (0, _I18nStore.translateTag)(_templateObject14),
	                      ' (',
	                      (0, _I18nStore.translateTag)(_templateObject15),
	                      ')'
	                    ),
	                    React.createElement(_TextAreaLimit2.default, { name: 'accessible-info', rows: '3', maxLength: '500', valueLink: this.linkState('accessibleInfo') })
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'item' },
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'legend',
	                      { id: 'transit' },
	                      (0, _I18nStore.translateTag)(_templateObject16),
	                      ' (',
	                      (0, _I18nStore.translateTag)(_templateObject15),
	                      ')'
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'alert alert-info' },
	                      (0, _I18nStore.translateTag)(_templateObject17)
	                    ),
	                    React.createElement('textarea', { rows: '3', name: 'accessible-transit', valueLink: this.linkState('accessibleTransit') })
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'item' },
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'legend',
	                      null,
	                      (0, _I18nStore.translateTag)(_templateObject18),
	                      ' (',
	                      (0, _I18nStore.translateTag)(_templateObject15),
	                      ')'
	                    ),
	                    React.createElement('textarea', { rows: '3', name: 'accessible-parking', valueLink: this.linkState('accessibleParking') })
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'item' },
	                  React.createElement(
	                    'fieldset',
	                    null,
	                    React.createElement(
	                      'legend',
	                      { className: 'required-legend' },
	                      (0, _I18nStore.translateTag)(_templateObject19)
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'alert alert-info' },
	                      (0, _I18nStore.translateTag)(_templateObject20)
	                    ),
	                    React.createElement('textarea', { rows: '3', name: 'accessible-find', valueLink: this.linkState('accessibleFind') })
	                  )
	                ),
	                React.createElement('hr', null),
	                React.createElement('br', null)
	              ),
	              React.createElement(_TeamBuilder2.default, { onChange: function onChange(team) {
	                  return _this2.setState({ team: team });
	                }, team: team })
	            ),
	            React.createElement(
	              'button',
	              { type: 'button', onClick: this.handleNext, className: 'btn' },
	              'Next'
	            )
	          ),
	          React.createElement(
	            'aside',
	            { id: 'tips-panel', role: 'complementary' },
	            React.createElement(
	              'div',
	              { className: 'popover right', id: 'city-organizer', style: { display: 'block' } },
	              React.createElement(
	                'h3',
	                { className: 'popover-title', 'data-toggle': 'collapse', 'data-target': '#popover-content' },
	                React.createElement('i', { className: 'fa fa-envelope' }),
	                ' ',
	                (0, _I18nStore.translateTag)(_templateObject21)
	              ),
	              React.createElement(
	                'div',
	                { className: 'popover-content collapse in', id: 'popover-content' },
	                city.cityOrganizer.photo ? React.createElement('div', { className: 'u-avatar', style: { backgroundImage: 'url(' + city.cityOrganizer.photo + ')' } }) : null,
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.translateTag)(_templateObject22, city.cityOrganizer.firstName, city.name),
	                  React.createElement(
	                    'strong',
	                    null,
	                    React.createElement(
	                      'a',
	                      { href: 'mailto:' + city.cityOrganizer.email },
	                      (0, _I18nStore.translateTag)(_templateObject23),
	                      '!'
	                    )
	                  )
	                )
	              )
	            )
	          )
	        ),
	        this.state.publish ? React.createElement(_WalkPublish2.default, {
	          url: this.state.url,
	          saveWalk: this.saveWalk,
	          close: function close() {
	            return _this2.setState({ publish: false });
	          },
	          city: city,
	          mirrors: this.state.mirrors
	        }) : null,
	        this.state.preview ? React.createElement(_WalkPreview2.default, {
	          url: '/index.php?cID=' + this.state.id,
	          close: function close() {
	            return _this2.setState({ preview: false });
	          }
	        }) : null,
	        React.createElement(
	          'aside',
	          { id: 'notifications' },
	          _notifications.map(function (note) {
	            return React.createElement(
	              'div',
	              { key: note.message, className: 'alert alert-' + note.type },
	              React.createElement(
	                'strong',
	                null,
	                note.name || '',
	                ': '
	              ),
	              note.message || ''
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return CreateWalk;
	}(React.Component);
	// Mixins


	exports.default = CreateWalk;
	Object.assign(CreateWalk.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Upload a photo that best represents your walk. Use the \'Preview Walk\' button on the left to see how it will look on your walk page. If you have trouble uploading, reduce the size of your photo before trying again.'], ['Upload a photo that best represents your walk. Use the \'Preview Walk\' button on the left to see how it will look on your walk page. If you have trouble uploading, reduce the size of your photo before trying again.']),
	    _templateObject2 = _taggedTemplateLiteral(['Click to upload an image'], ['Click to upload an image']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React CCM_TOOLS_PATH */

	// Flux


	var ImageUpload = function (_React$Component) {
	  _inherits(ImageUpload, _React$Component);

	  function ImageUpload(props) {
	    _classCallCheck(this, ImageUpload);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageUpload).call(this, props));

	    Object.assign(_this, {
	      removeImage: function removeImage(i) {
	        var thumbnails = _this.props.valueLink.value;
	        thumbnails.splice(i, 1);
	        _this.props.valueLink.requestChange(thumbnails);
	      },

	      handleUpload: function handleUpload(e) {
	        var body = new FormData();

	        if (e.currentTarget.files) {
	          // TODO: Update to support uploading multiple files at once
	          // TODO: display a spinner w/ the local file as the BG until
	          // TODO: Move to flux
	          // Load one file
	          body.append('Filedata', e.currentTarget.files[0]);

	          // Form validation token, generated by concrete5
	          body.append('ccm_token', _this.props.valt);

	          fetch(CCM_TOOLS_PATH + '/files/importers/quick', {
	            method: 'POST',
	            credentials: 'include',
	            body: body
	          }).then(function (res) {
	            return res.json();
	          }).then(function (data) {
	            var thumbnails = _this.props.valueLink.value;
	            thumbnails.push(data);
	            _this.props.valueLink.requestChange(thumbnails);
	          }).catch(function (_ref) {
	            var message = _ref.message;
	            return console.err('Error uploading image: ' + message);
	          });
	        }
	      }
	    });
	    return _this;
	  }

	  _createClass(ImageUpload, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var thumbnails = this.props.valueLink.value;
	      // TODO: include an upload callback that loads the uploaded image locally,
	      // instead of the one off the server
	      // TODO: Implement server-side support for multiple thumbnails, then
	      // remove limit here
	      return React.createElement(
	        'form',
	        { className: 'upload-image' },
	        React.createElement(
	          'label',
	          { htmlFor: 'walkphotos', id: 'photo-tip' },
	          (0, _I18nStore.translateTag)(_templateObject)
	        ),
	        thumbnails.map(function (thumb, i) {
	          // Grab just the name, so local files being uploaded have the same key as the hosted URL
	          var filename = ((thumb.url || '') + 'i').replace(/^.*[\\\/]/, '');
	          var handleRemove = function handleRemove() {
	            return _this2.removeImage(i);
	          };

	          return React.createElement(
	            'div',
	            {
	              key: filename,
	              className: 'thumbnail',
	              style: { backgroundImage: 'url(' + thumb.url + ')' }
	            },
	            React.createElement(
	              'a',
	              { className: 'remove', onClick: handleRemove },
	              React.createElement('i', { className: 'fa fa-times-circle' })
	            )
	          );
	        }),
	        thumbnails.length < 1 ? React.createElement(
	          'div',
	          { className: 'thumbnail fileupload' },
	          React.createElement('input', { className: 'ccm-al-upload-single-file', type: 'file', onChange: this.handleUpload }),
	          React.createElement('i', { className: 'fa fa-camera-retro fa-5x' }),
	          React.createElement(
	            'span',
	            { className: 'fileupload-new' },
	            (0, _I18nStore.translateTag)(_templateObject2)
	          )
	        ) : undefined
	      );
	    }
	  }]);

	  return ImageUpload;
	}(React.Component);

	exports.default = ImageUpload;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Themes'], ['Themes']),
	    _templateObject2 = _taggedTemplateLiteral(['Pick between ', ' and ', ' boxes.'], ['Pick between ', ' and ', ' boxes.']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global React */

	var mixins = __webpack_require__(39);

	// Flux

	var ThemeSelect = function (_React$Component) {
	  _inherits(ThemeSelect, _React$Component);

	  function ThemeSelect() {
	    _classCallCheck(this, ThemeSelect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ThemeSelect).call(this));

	    _this.state = {
	      maxChecked: 3,
	      totalChecked: 0
	    };
	    return _this;
	  }

	  _createClass(ThemeSelect, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var checkboxes = this.props.valueLink.value;
	      var totalChecked = 0;

	      for (var i in checkboxes) {
	        if (checkboxes[i] && i.substring(0, 6) === 'theme-') {
	          totalChecked++;
	        }
	      }

	      // TODO: Don't select themes for NYC
	      return React.createElement(
	        'fieldset',
	        { id: 'theme-select' },
	        React.createElement(
	          'legend',
	          { className: 'required-legend' },
	          (0, _I18nStore.translateTag)(_templateObject)
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert alert-info' },
	          (0, _I18nStore.translateTag)(_templateObject2, 1, this.state.maxChecked)
	        ),
	        this.props.themeCategories.map(function (category) {
	          return React.createElement(
	            'fieldset',
	            { key: category.name },
	            React.createElement(
	              'legend',
	              null,
	              category.name
	            ),
	            category.themes.map(function (theme) {
	              // Don't let a checkbox be checked if it pushes over limit
	              var disabled = totalChecked >= _this2.state.maxChecked && !checkboxes[theme.id];
	              return React.createElement(
	                'label',
	                { key: theme.id, className: 'checkbox' },
	                React.createElement('input', { type: 'checkbox', disabled: disabled, checkedLink: _this2.linkParentState(theme.id) }),
	                theme.name
	              );
	            })
	          );
	        }),
	        ';'
	      );
	    }
	  }]);

	  return ThemeSelect;
	}(React.Component);

	exports.default = ThemeSelect;

	Object.assign(ThemeSelect.prototype, mixins.linkedParentState);
	ThemeSelect.defaultProps = __webpack_require__(40);

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * TODO: replace both of these silly 2-way binding helpers with flux
	 */

	// Link this component's state to the linkState() parent
	var linkedParentState = exports.linkedParentState = {
	  linkParentState: function linkParentState(propname) {
	    var valueLink = this.props.valueLink;
	    var parentState = valueLink.value;

	    return {
	      value: parentState[propname],
	      requestChange: function requestChange(value) {
	        parentState[propname] = value;
	        valueLink.requestChange(parentState);
	      }
	    };
	  }
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = {
		"themeCategories": [
			{
				"name": "Community",
				"themes": [
					{
						"id": "theme-civic-activist",
						"name": "Activism"
					},
					{
						"id": "theme-civic-truecitizen",
						"name": "Citizenry"
					},
					{
						"id": "theme-civic-goodneighbour",
						"name": "Community"
					},
					{
						"id": "theme-culture-writer",
						"name": "Storytelling"
					}
				]
			},
			{
				"name": "City-building",
				"themes": [
					{
						"id": "theme-urban-architecturalenthusiast",
						"name": "Architecture"
					},
					{
						"id": "theme-culture-aesthete",
						"name": "Design"
					},
					{
						"id": "theme-urban-suburbanexplorer",
						"name": "Suburbs"
					},
					{
						"id": "theme-urban-moversandshakers",
						"name": "Transportation"
					}
				]
			},
			{
				"name": "Society",
				"themes": [
					{
						"id": "theme-civic-gender",
						"name": "Gender"
					},
					{
						"id": "theme-civic-health",
						"name": "Health"
					},
					{
						"id": "theme-culture-historybuff",
						"name": "Heritage"
					},
					{
						"id": "theme-civic-nativeissues",
						"name": "Native Issues"
					},
					{
						"id": "theme-civic-religion",
						"name": "Religion"
					}
				]
			},
			{
				"name": "Expression",
				"themes": [
					{
						"id": "theme-culture-artist",
						"name": "Art"
					},
					{
						"id": "theme-urban-film",
						"name": "Film"
					},
					{
						"id": "theme-culture-bookworm",
						"name": "Literature"
					},
					{
						"id": "theme-urban-music",
						"name": "Music"
					},
					{
						"id": "theme-urban-play",
						"name": "Play"
					}
				]
			},
			{
				"name": "The Natural World",
				"themes": [
					{
						"id": "theme-nature-petlover",
						"name": "Animals"
					},
					{
						"id": "theme-nature-greenthumb",
						"name": "Gardening"
					},
					{
						"id": "theme-nature-naturelover",
						"name": "Nature"
					},
					{
						"id": "theme-urban-water",
						"name": "Water"
					}
				]
			},
			{
				"name": "Modernity",
				"themes": [
					{
						"id": "theme-civic-international",
						"name": "International Issues"
					},
					{
						"id": "theme-civic-military",
						"name": "Military"
					},
					{
						"id": "theme-civic-commerce",
						"name": "Commerce"
					},
					{
						"id": "theme-culture-nightowl",
						"name": "Night Life"
					},
					{
						"id": "theme-culture-techie",
						"name": "Technology"
					},
					{
						"id": "theme-urban-sports",
						"name": "Sports"
					},
					{
						"id": "theme-culture-foodie",
						"name": "Food"
					}
				]
			}
		]
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Walk Stops'], ['Walk Stops']),
	    _templateObject2 = _taggedTemplateLiteral(['Share Your Route'], ['Share Your Route']),
	    _templateObject3 = _taggedTemplateLiteral(['Make sure to use \'Add Stop\' at least once to indicate the meeting place. This is how people will find you on the day of your walk.'], ['Make sure to use \'Add Stop\' at least once to indicate the meeting place. This is how people will find you on the day of your walk.']),
	    _templateObject4 = _taggedTemplateLiteral(['Add Stop'], ['Add Stop']),
	    _templateObject5 = _taggedTemplateLiteral(['Add Route'], ['Add Route']),
	    _templateObject6 = _taggedTemplateLiteral(['Clear Route'], ['Clear Route']);

	var _WalkStopTable = __webpack_require__(42);

	var _WalkStopTable2 = _interopRequireDefault(_WalkStopTable);

	var _WalkInfoWindow = __webpack_require__(43);

	var _WalkInfoWindow2 = _interopRequireDefault(_WalkInfoWindow);

	var _InstagramConnect = __webpack_require__(44);

	var _InstagramConnect2 = _interopRequireDefault(_InstagramConnect);

	var _SoundCloudConnect = __webpack_require__(45);

	var _SoundCloudConnect2 = _interopRequireDefault(_SoundCloudConnect);

	var _TwitterConnect = __webpack_require__(46);

	var _TwitterConnect2 = _interopRequireDefault(_TwitterConnect);

	var _ConnectFilters = __webpack_require__(47);

	var _ConnectFilters2 = _interopRequireDefault(_ConnectFilters);

	var _I18nStore = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React ReactDOM google $ CCM_THEME_PATH */

	// Flux


	// Map parameters
	var stopMarker = {
	  url: CCM_THEME_PATH + '/images/marker.png',
	  // This marker is 20 pixels wide by 32 pixels tall.
	  size: new google.maps.Size(30, 46),
	  // The origin for this image is 0,0.
	  origin: new google.maps.Point(0, 0),
	  // The anchor for this image is the base of the flagpole at 0,32.
	  anchor: new google.maps.Point(11, 44)
	};

	var MapBuilder = function (_React$Component) {
	  _inherits(MapBuilder, _React$Component);

	  function MapBuilder(props) {
	    _classCallCheck(this, MapBuilder);

	    // State for this component should only track the map editor

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapBuilder).call(this, props));

	    Object.assign(_this, {
	      state: {
	        // The 'mode' we're in: 'addPoint', 'addRoute'
	        mode: {},
	        map: null,
	        markers: new google.maps.MVCArray(),
	        route: null,
	        infowindow: new google.maps.InfoWindow(),
	        // The collection of search terms boxes
	        filters: []
	      },

	      // Build a google map from our serialized map state
	      refreshGMap: function refreshGMap() {
	        var valueLink = _this.props.valueLink;
	        var markers = new google.maps.MVCArray();
	        var route = null;

	        if (_this.state.route) {
	          _this.state.route.setMap(null);
	        }

	        _this.state.markers.forEach(function (marker) {
	          return marker.setMap(null);
	        });

	        // Draw the route
	        if (valueLink.value) {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = valueLink.value.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var marker = _step.value;

	              var latlng = void 0;
	              // Set to the markers latlng if available, otherwise place at center
	              if (marker.lat && marker.lng) {
	                latlng = new google.maps.LatLng(marker.lat, marker.lng);
	              } else {
	                latlng = _this.state.map.center;
	              }

	              markers.push(_this.buildMarker({
	                latlng: latlng,
	                title: marker.title,
	                description: marker.description,
	                media: marker.media
	              }));
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

	          route = _this.buildRoute(valueLink.value.route);
	        } else {
	          route = _this.buildRoute([]);
	        }

	        // Set marker/route adding
	        google.maps.event.addListener(_this.state.map, 'click', function (ev) {
	          _this.state.infowindow.setMap(null);
	          if (_this.state.mode.addRoute) {
	            route.setPath(route.getPath().push(ev.latLng));
	            _this.setState({ route: route });
	          }
	        });

	        _this.setState({ markers: markers, route: route });
	      },
	      /**
	       * Make the map fit the markers in this walk
	       */
	      boundMapByWalk: function boundMapByWalk() {
	        var _this$state = _this.state;
	        var map = _this$state.map;
	        var markers = _this$state.markers;

	        // Don't include the route - it can be too expensive to compute.

	        var bounds = new google.maps.LatLngBounds();
	        google.maps.event.trigger(map, 'resize');
	        if (_this.state.markers.getLength()) {
	          for (var i = 0, len = markers.getLength(); i < len; i++) {
	            bounds.extend(markers.getAt(i).getPosition());
	          }

	          map.fitBounds(bounds);
	        }
	      },

	      buildRoute: function buildRoute(routeArray) {
	        var poly = new google.maps.Polyline({
	          strokeColor: '#F16725',
	          strokeOpacity: 0.8,
	          strokeWeight: 3,
	          editable: true,
	          map: _this.state.map
	        });

	        // Remove vertices when right-clicked
	        google.maps.event.addListener(poly, 'rightclick', function (ev) {
	          // Check if we clicked a vertex
	          if (ev.vertex !== undefined) {
	            poly.setPath(poly.getPath().removeAt(ev.vertex));
	          }
	        });

	        // Hide the infowindow if we click outside it
	        google.maps.event.addListener(poly, 'mousedown', function () {
	          return _this.state.infowindow.setMap(null);
	        });

	        if (routeArray.length > 0) {
	          poly.setPath(routeArray.map(function (point) {
	            return new google.maps.LatLng(point.lat, point.lng);
	          }));
	        }

	        return poly;
	      },

	      /**
	       * @param google.maps.Marker marker
	       */
	      deleteMarker: function deleteMarker(marker) {
	        var markers = _this.state.markers;

	        // Clear marker from map
	        marker.setMap(null);

	        // Remove reference in state
	        markers.removeAt(markers.indexOf(marker));

	        _this.setState({ markers: markers });
	      },

	      /**
	       * Reorder the marker at index to a new position, pushing up those after
	       * @param int from
	       * @param int to
	       */
	      moveBefore: function moveBefore(from, to) {
	        var markers = _this.state.markers;
	        var fMarker = markers.getAt(from);
	        markers.removeAt(from);
	        markers.insertAt(to, fMarker);

	        _this.setState({ markers: markers }, _this.syncState);
	      },

	      // Button Actions
	      toggleAddPoint: function toggleAddPoint() {
	        var markers = _this.state.markers;
	        var marker = _this.buildMarker();
	        markers.push(marker);

	        _this.setState({ markers: markers, mode: {} }, function () {
	          _this.syncState();
	          _this.showInfoWindow(marker);
	        });

	        _this.state.infowindow.setMap(null);
	      },

	      toggleAddRoute: function toggleAddRoute() {
	        _this.setState({
	          mode: {
	            addRoute: !_this.state.mode.addRoute
	          }
	        }, function () {
	          return _this.state.infowindow.setMap(null);
	        });
	      },

	      clearRoute: function clearRoute() {
	        _this.state.infowindow.setMap(null);
	        _this.state.route.setPath([]);
	        _this.setState({ mode: {} });
	      },

	      // Build a version of state appropriate for persistence
	      getStateSimple: function getStateSimple() {
	        var markers = _this.state.markers.getArray().map(function (marker) {
	          var titleObj = JSON.parse(marker.title);
	          return {
	            lat: marker.position.lat(),
	            lng: marker.position.lng(),
	            title: titleObj.title,
	            description: titleObj.description,
	            media: titleObj.media,
	            style: 'stop'
	          };
	        });
	        var route = [];

	        if (_this.state.route) {
	          route = _this.state.route.getPath().getArray().map(function (point) {
	            return {
	              lat: point.lat(),
	              lng: point.lng()
	            };
	          });
	        }

	        return { markers: markers, route: route };
	      },

	      // Sync what's on the gmap to what's stored in our state
	      syncState: function syncState() {
	        return _this.props.valueLink.requestChange(_this.getStateSimple());
	      },

	      // Manage the filters for loading data from external APIs
	      handleRemoveFilter: function handleRemoveFilter(i) {
	        var filters = _this.state.filters.slice();
	        filters.splice(i, 1);
	        _this.setState({ filters: filters });
	      },

	      // Update the _text_ of a filter
	      handleChangeFilter: function handleChangeFilter(i, val) {
	        var filters = _this.state.filters.slice();
	        filters[i].value = val;
	        _this.setState({ filters: filters });
	      },

	      // Push a new filter to our box, usually done by the buttons
	      handleAddFilter: function handleAddFilter(filter) {
	        var filters = _this.state.filters.slice();
	        filters.push(filter);
	        _this.setState({ filters: filters });
	      },

	      /**
	       * Show the info box for editing this marker
	       *
	       * @param google.maps.Marker marker
	       */
	      showInfoWindow: function showInfoWindow(marker) {
	        var _this$state2 = _this.state;
	        var map = _this$state2.map;
	        var infowindow = _this$state2.infowindow;

	        var infoDOM = document.createElement('div');
	        var handleDelete = function handleDelete() {
	          return _this.deleteMarker(marker);
	        };

	        ReactDOM.render(React.createElement(_WalkInfoWindow2.default, {
	          marker: marker,
	          deleteMarker: handleDelete,
	          refresh: _this.syncState
	        }), infoDOM);

	        // Center the marker and display its info window
	        map.panTo(marker.getPosition());
	        infowindow.setContent(infoDOM);
	        infowindow.open(map, marker);
	      }
	    });
	    return _this;
	  }

	  _createClass(MapBuilder, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.gmap), {
	        center: new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]),
	        zoom: this.props.initialZoom,
	        scrollwheel: false,
	        rotateControl: true,
	        mapTypeControlOptions: {
	          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
	        }
	      });

	      // Map won't size properly on a hidden tab, so refresh on tab shown
	      $('a[href="#route"]').on('shown.bs.tab', this.boundMapByWalk);

	      this.setState({ map: map }, this.refreshGMap);
	    }

	    // Map related functions
	    // Build gmaps Marker object from base data
	    // @param google.maps.LatLng latlng The position to add
	    // @param Object title {title, description}

	  }, {
	    key: 'buildMarker',
	    value: function buildMarker(userOptions) {
	      var _this2 = this;

	      var map = this.state.map;

	      var gMarkerOptions = {
	        animation: google.maps.Animation.DROP,
	        draggable: true,
	        style: 'stop',
	        map: map,
	        icon: stopMarker
	      };
	      var marker = void 0;

	      // Assign default options
	      var options = Object.assign({}, {
	        latlng: null,
	        title: '',
	        description: '',
	        media: null
	      }, userOptions);

	      // If we passed in a position
	      if (options.latlng instanceof google.maps.LatLng) {
	        gMarkerOptions.position = options.latlng;
	      } else {
	        gMarkerOptions.position = this.state.map.center;
	      }

	      // Set to an empty title/description object.
	      // Google maps has a limited amount of marker data
	      gMarkerOptions.title = JSON.stringify({
	        title: options.title,
	        description: options.description,
	        media: options.media
	      });

	      marker = new google.maps.Marker(gMarkerOptions);

	      google.maps.event.addListener(marker, 'click', function () {
	        return _this2.showInfoWindow(marker);
	      });

	      google.maps.event.addListener(marker, 'drag', function () {});

	      return marker;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var walkStops = void 0;

	      // Standard properties the filter buttons need
	      var filterProps = {
	        valueLink: this.props.valueLink,
	        refreshGMap: this.refreshGMap,
	        boundMapByWalk: this.boundMapByWalk,
	        addFilter: this.handleAddFilter,
	        city: this.props.city
	      };

	      if (this.state.markers && this.state.markers.length) {
	        walkStops = [React.createElement(
	          'h3',
	          { key: 'stops' },
	          (0, _I18nStore.translateTag)(_templateObject)
	        ), React.createElement(_WalkStopTable2.default, {
	          ref: 'walkStopTable',
	          key: 1,
	          markers: this.state.markers,
	          deleteMarker: this.deleteMarker,
	          moveBefore: this.moveBefore,
	          showInfoWindow: this.showInfoWindow
	        })];
	      }

	      return React.createElement(
	        'div',
	        { className: 'tab-pane', id: 'route', ref: 'route' },
	        React.createElement(
	          'div',
	          { className: 'page-header', 'data-section': 'route' },
	          React.createElement(
	            'h1',
	            null,
	            (0, _I18nStore.translateTag)(_templateObject2)
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert alert-info' },
	          (0, _I18nStore.translateTag)(_templateObject3)
	        ),
	        React.createElement(
	          'div',
	          { id: 'map-control-bar' },
	          React.createElement(
	            'button',
	            {
	              ref: 'addPoint',
	              className: this.state.mode.addPoint ? 'active' : '',
	              onClick: this.toggleAddPoint
	            },
	            React.createElement('i', { className: 'fa fa-map-marker' }),
	            (0, _I18nStore.translateTag)(_templateObject4)
	          ),
	          React.createElement(
	            'button',
	            {
	              ref: 'addRoute',
	              className: this.state.mode.addRoute ? 'active' : '',
	              onClick: this.toggleAddRoute
	            },
	            React.createElement('i', { className: 'fa fa-arrows' }),
	            (0, _I18nStore.translateTag)(_templateObject5)
	          ),
	          React.createElement(
	            'button',
	            { ref: 'clearroute', onClick: this.clearRoute },
	            React.createElement('i', { className: 'fa fa-eraser' }),
	            (0, _I18nStore.translateTag)(_templateObject6)
	          ),
	          React.createElement(_TwitterConnect2.default, filterProps),
	          React.createElement(_InstagramConnect2.default, filterProps),
	          React.createElement(_SoundCloudConnect2.default, filterProps)
	        ),
	        React.createElement(_ConnectFilters2.default, { filters: this.state.filters, changeFilter: this.handleChangeFilter, remove: this.handleRemoveFilter }),
	        React.createElement('div', { className: 'map-notifications' }),
	        React.createElement('div', { id: 'map-canvas', ref: 'gmap' }),
	        walkStops,
	        React.createElement('hr', null)
	      );
	    }
	  }]);

	  return MapBuilder;
	}(React.Component);

	// Static properties


	exports.default = MapBuilder;
	Object.assign(MapBuilder, {
	  defaultProps: {
	    initialZoom: 15
	  }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Flux


	var _I18nStore = __webpack_require__(21);

	var UpArrow = function UpArrow(props) {
	  return React.createElement(
	    "a",
	    _extends({ className: "move-marker-up" }, props),
	    React.createElement("i", { className: "fa fa-arrow-up" })
	  );
	};

	var DownArrow = function DownArrow(props) {
	  return React.createElement(
	    "a",
	    _extends({ className: "move-marker-down" }, props),
	    React.createElement("i", { className: "fa fa-arrow-down" })
	  );
	};

	var DeleteStop = function DeleteStop(props) {
	  return React.createElement(
	    "a",
	    _extends({ className: "delete-stop" }, props),
	    React.createElement("i", { className: "fa fa-times-circle-o" })
	  );
	};

	var MarkerRow = function MarkerRow(props) {
	  var titleObj = JSON.parse(props.marker.title);
	  var i = props.index;
	  var showInfoWindow = function showInfoWindow() {
	    return props.showInfoWindow(props.marker);
	  };
	  var meetingPlace = void 0;
	  var imageThumb = void 0;
	  var upArrow = void 0,
	      downArrow = void 0;

	  // Up/down arrows
	  if (i > 0) {
	    upArrow = React.createElement(UpArrow, { onClick: function onClick() {
	        return props.moveBefore(i, i - 1);
	      } });
	  } else {
	    meetingPlace = (0, _I18nStore.t)('Meeting Place') + ': ';
	  }

	  if (i < props.length - 1) {
	    downArrow = React.createElement(DownArrow, { onClick: function onClick() {
	        return props.moveBefore(i, i + 1);
	      } });
	  }

	  // The picture of the stop given in media
	  if (titleObj.media) {
	    if (titleObj.media.type === 'instagram') {
	      imageThumb = React.createElement("img", { src: titleObj.media.url + 'media?size=t' });
	    }
	  }
	  return React.createElement(
	    "tr",
	    null,
	    React.createElement(
	      "td",
	      { onClick: showInfoWindow },
	      meetingPlace,
	      imageThumb,
	      titleObj.title
	    ),
	    React.createElement(
	      "td",
	      { onClick: showInfoWindow },
	      titleObj.description
	    ),
	    React.createElement(
	      "td",
	      null,
	      downArrow,
	      upArrow
	    ),
	    React.createElement(
	      "td",
	      null,
	      React.createElement(DeleteStop, { onClick: function onClick() {
	          return props.deleteMarker(marker);
	        } })
	    )
	  );
	};

	/**
	 * The table with all the walk stops on it, in CAW
	 */
	var WalkStopTable = function WalkStopTable(props) {
	  var markersSet = props.markers.getArray();
	  return React.createElement(
	    "table",
	    { className: "table-hover routeStops" },
	    React.createElement(
	      "thead",
	      null,
	      React.createElement(
	        "tr",
	        null,
	        React.createElement(
	          "th",
	          null,
	          (0, _I18nStore.t)('Title')
	        ),
	        React.createElement(
	          "th",
	          null,
	          (0, _I18nStore.t)('Description')
	        ),
	        React.createElement(
	          "th",
	          { className: "controls" },
	          React.createElement("i", { className: "fa fa-arrows" })
	        ),
	        React.createElement(
	          "th",
	          null,
	          React.createElement("i", { className: "fa fa-trash-o" })
	        )
	      )
	    ),
	    React.createElement(
	      "tbody",
	      null,
	      markersSet.map(function (marker, i) {
	        return React.createElement(MarkerRow, _extends({ marker: marker, key: 'marker' + i, index: i, length: markersSet.length }, props));
	      })
	    )
	  );
	};

	exports.default = WalkStopTable;

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

	/* global React */

	/**
	 * The 'info window', aka the input box that pops up over markers in maps
	 */

	var WalkInfoWindow = function (_React$Component) {
	  _inherits(WalkInfoWindow, _React$Component);

	  function WalkInfoWindow(props) {
	    _classCallCheck(this, WalkInfoWindow);

	    // Weird, but needed since it's rendering to a DOM node

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkInfoWindow).call(this, props));

	    Object.assign(_this, {
	      state: { marker: props.marker },

	      // Simple method to set title property
	      handleTitleChange: function handleTitleChange(ev) {
	        _this.setMarkerContent({ title: ev.target.value });
	      },

	      // Simple method to set description property
	      handleDescriptionChange: function handleDescriptionChange(ev) {
	        _this.setMarkerContent({ description: ev.target.value });
	      }
	    });
	    return _this;
	  }

	  /**
	   * Set the content of this marker
	   * @param Object props The properties to set
	   */


	  _createClass(WalkInfoWindow, [{
	    key: 'setMarkerContent',
	    value: function setMarkerContent(props) {
	      var marker = this.state.marker;

	      // Parse, apply new properties, re-encode then assign as new title. Needed
	      // as gmaps doesn't give you multiple fields, so we encode in the title.

	      marker.setTitle(JSON.stringify(Object.assign({}, JSON.parse(marker.getTitle()), props)));
	      this.setState({ marker: marker }, this.props.refresh);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var marker = this.state.marker;
	      if (marker) {
	        var markerContent = JSON.parse(marker.getTitle());
	        var media = void 0;

	        // Load rich media
	        if (markerContent.media) {
	          if (markerContent.media.type === 'instagram') {
	            media = React.createElement('img', { className: 'media', src: markerContent.media.url + 'media?size=t' });
	          } else if (markerContent.media.type === 'soundcloud') {
	            media = React.createElement('iframe', { className: 'media', width: '150', height: '100%', scrolling: 'no', frameBorder: 'no', src: 'https://w.soundcloud.com/player/?url=' + markerContent.media.url + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true' });
	          }
	        }

	        return React.createElement(
	          'div',
	          { className: 'stop-form' },
	          media,
	          React.createElement(
	            'section',
	            { className: 'details' },
	            React.createElement('input', {
	              type: 'text',
	              onChange: this.handleTitleChange,
	              value: markerContent.title,
	              placeholder: 'Title of this stop',
	              className: 'marker-title'
	            }),
	            React.createElement('textarea', {
	              className: 'marker-description box-sizing',
	              onChange: this.handleDescriptionChange,
	              placeholder: 'Description of this stop',
	              value: markerContent.description
	            })
	          ),
	          React.createElement(
	            'a',
	            { onClick: this.props.deleteMarker },
	            React.createElement('i', { className: 'fa fa-trash-o' })
	          )
	        );
	      }
	      return null;
	    }
	  }]);

	  return WalkInfoWindow;
	}(React.Component);

	exports.default = WalkInfoWindow;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global React $ */

	var InstagramConnect = function (_React$Component) {
	  _inherits(InstagramConnect, _React$Component);

	  function InstagramConnect(props) {
	    _classCallCheck(this, InstagramConnect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstagramConnect).call(this, props));

	    Object.assign(_this, {
	      state: { accessToken: null },

	      /**
	       * Add the filter to our sync menu
	       */
	      addFilter: function addFilter() {
	        var filterProps = {
	          type: 'text',
	          icon: 'fa fa-instagram',
	          placeholder: 'Type in the tag you used on the geocoded photos for your walk',
	          value: '',
	          cb: _this.handleLoadFeed
	        };
	        if (_this.state.accessToken) {
	          _this.props.addFilter(filterProps);
	        } else {
	          // Connect, and add the box when done
	          _this.handleConnect(function () {
	            return _this.props.addFilter(filterProps);
	          });
	        }
	      },

	      /**
	       * Callback for once the feed is loaded
	       */
	      handleLoadFeed: function handleLoadFeed(query) {
	        $.ajax({
	          type: 'GET',
	          crossDomain: true,
	          dataType: 'jsonp',
	          url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + _this.state.accessToken,
	          success: function success(data) {
	            var markers = (_this.props.valueLink.value || { markers: [] }).markers.slice();
	            var walkMap = data.data.filter(function (gram) {
	              var tagMatch = true;
	              if (query) {
	                tagMatch = gram.tags.indexOf(query) !== -1;
	              }
	              return !!(gram.location && tagMatch);
	            }).reverse().map(function (gram) {
	              // If the first comment is from the owner, use that as the description
	              var description = '';
	              if (gram.comments && gram.comments.data.length > 0) {
	                if (gram.comments.data[0].from.id === gram.user.id) {
	                  description = gram.comments.data[0].text;
	                }
	              }

	              return {
	                title: gram.caption ? gram.caption.text.replace(/\#\w+/g, '').trim() : '',
	                description: description,
	                media: {
	                  id: gram.id,
	                  url: gram.link,
	                  type: 'instagram'
	                },
	                lat: gram.location.latitude,
	                lng: gram.location.longitude
	              };
	            });

	            _this.props.valueLink.requestChange({
	              markers: markers.concat(walkMap),
	              route: _this.props.valueLink.value.route
	            }, function () {
	              _this.props.refreshGMap();
	              _this.props.boundMapByWalk();
	            });
	          }
	        });
	      }
	    });
	    return _this;
	  }

	  _createClass(InstagramConnect, [{
	    key: 'handleConnect',
	    value: function handleConnect(cb) {
	      var _this2 = this;

	      var clientID = 'af1d04f3e16940f3801ee06461c9e4bb';
	      var redirectURI = 'http://janeswalk.org/connected';

	      // Race-condition prone, but safest way to pull this from a child window
	      window.loadAccessToken = function (accessToken) {
	        return _this2.setState({ accessToken: accessToken }, cb);
	      };

	      var authWindow = window.open('https://instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
	      this.setState({ authWindow: authWindow });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'button',
	        { onClick: this.addFilter },
	        React.createElement('i', { className: 'fa fa-instagram' }),
	        'Instagram'
	      );
	    }
	  }]);

	  return InstagramConnect;
	}(React.Component);

	exports.default = InstagramConnect;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Get some sounds from SoundCloud!
	 */

	var SoundCloudConnect = function (_React$Component) {
	  _inherits(SoundCloudConnect, _React$Component);

	  function SoundCloudConnect() {
	    _classCallCheck(this, SoundCloudConnect);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SoundCloudConnect).call(this));

	    _this2.state = {
	      playlists: []
	    };
	    return _this2;
	  }

	  _createClass(SoundCloudConnect, [{
	    key: 'handleConnect',
	    value: function handleConnect(cb) {
	      var _this3 = this;

	      var clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
	      var redirectURI = 'http://janeswalk.org/connected';

	      // FIXME Race-condition prone if you open multiple services in parallel
	      window.loadAccessToken = function (accessToken) {
	        _this3.setState({ accessToken: accessToken }, _this3.handleLoadPlaylists(accessToken, cb));
	      };

	      var authWindow = window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
	      this.setState({ authWindow: authWindow });
	    }
	  }, {
	    key: 'handleLoadPlaylists',
	    value: function handleLoadPlaylists(accessToken, cb) {
	      accessToken = accessToken || this.state.accessToken;

	      $.ajax({
	        type: 'GET',
	        crossDomain: true,
	        dataType: 'jsonp',
	        url: 'https://api.soundcloud.com/me/playlists.json?oauth_token=' + accessToken,
	        success: function success(data) {
	          _this.setState({ playlists: data });
	          cb();
	        }
	      });
	    }
	  }, {
	    key: 'loadPointsFromPlaylist',
	    value: function loadPointsFromPlaylist(i) {
	      var _this4 = this;

	      var markers = (this.props.valueLink.value || { markers: [] }).markers.slice();

	      var points = this.state.playlists[i].tracks.map(function (track) {
	        var point = {
	          title: track.title || '',
	          description: track.description || '',
	          media: {
	            type: 'soundcloud',
	            id: track.id,
	            url: track.uri
	          }
	        };

	        // Soundcloud puts geotags in the regular tags, as geo:lat=
	        track.tag_list.split(' ').forEach(function (tag) {
	          var idx = void 0;
	          idx = tag.indexOf('geo:lat=');
	          if (idx > -1) {
	            point.lat = tag.substr(idx + 8);
	          }
	          idx = tag.indexOf('geo:lon=');
	          if (idx > -1) {
	            point.lng = tag.substr(idx + 8);
	          }
	        });

	        return point;
	      });

	      this.props.valueLink.requestChange({ markers: markers.concat(points), route: this.props.valueLink.value.route }, function () {
	        _this4.props.refreshGMap();
	        _this4.props.boundMapByWalk();
	      });
	    }
	  }, {
	    key: 'addFilter',
	    value: function addFilter() {
	      var _this5 = this;

	      var filterProps = {
	        type: 'select',
	        icon: 'fa fa-soundcloud',
	        options: this.state.playlists,
	        value: 0,
	        cb: this.loadPointsFromPlaylist
	      };

	      if (this.state.accessToken) {
	        this.props.addFilter(filterProps);
	      } else {
	        // Connect, and add the box when done
	        this.handleConnect(function () {
	          filterProps.options = _this5.state.playlists;
	          _this5.props.addFilter(filterProps);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      return React.createElement(
	        'button',
	        { onClick: function onClick() {
	            return _this6.addFilter();
	          } },
	        React.createElement('i', { className: 'fa fa-soundcloud' }),
	        'SoundCloud'
	      );
	    }
	  }]);

	  return SoundCloudConnect;
	}(React.Component);

	exports.default = SoundCloudConnect;

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Pull all the tweets
	 */

	var TwitterConnect = function (_React$Component) {
	  _inherits(TwitterConnect, _React$Component);

	  function TwitterConnect() {
	    _classCallCheck(this, TwitterConnect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TwitterConnect).call(this));

	    _this.state = {
	      query: '',
	      accessToken: true
	    };
	    return _this;
	  }

	  _createClass(TwitterConnect, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      window.setAccessToken = function (accessToken) {
	        return _this2.setState({ accessToken: accessToken });
	      };
	    }
	  }, {
	    key: 'handleLoadToken',
	    value: function handleLoadToken() {
	      var _this3 = this;

	      // Twitter requires a server-side auth with secret, so clients get token from JW
	      $.ajax({
	        method: 'GET',
	        url: '/api/twitter',
	        dataType: 'json',
	        success: function success(data) {
	          if (data.access_token) {
	            _this3.setState({ accessToken: data.access_token });
	          }
	        }
	      });
	    }
	  }, {
	    key: 'loadFeed',
	    value: function loadFeed(query) {
	      var _this4 = this;

	      query = encodeURIComponent(query);

	      $.ajax({
	        type: 'GET',
	        url: '/api/twitter?q=' + query + '&coords=' + this.props.city.latlng[0] + ',' + this.props.city.latlng[1],
	        success: function success(data) {
	          var markers = (_this4.props.valueLink.value || { markers: [] }).markers.slice();

	          _this4.props.valueLink.requestChange({
	            markers: markers.concat(data.map(function (tweet) {
	              return {
	                // Take first 5 words as the title
	                title: tweet.description.split(' ').slice(0, 5).join(' '),
	                description: tweet.description,
	                lat: tweet.lat,
	                lng: tweet.lng
	              };
	            })),
	            route: _this4.props.valueLink.value.route
	          }, function () {
	            // kludge - need to find if there's a callback we can pass into gmaps for this
	            setTimeout(function () {
	              _this4.props.refreshGMap();
	              _this4.props.boundMapByWalk();
	            }, 100);
	          });
	        }
	      });
	    }
	  }, {
	    key: 'handleQueryChange',
	    value: function handleQueryChange(ev) {
	      this.setState({ query: ev.target.value });
	    }
	  }, {
	    key: 'addFilter',
	    value: function addFilter() {
	      // The filter we set to the 'filter box'
	      this.props.addFilter({
	        type: 'text',
	        icon: 'fa fa-twitter',
	        placeholder: 'Type in a standard twitter search for geocoded tweets, e.g. "#ParkStroll #janeswalk from:MyName"',
	        value: '',
	        cb: this.loadFeed
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      return React.createElement(
	        'button',
	        { onClick: function onClick() {
	            return _this5.addFilter;
	          } },
	        React.createElement('i', { className: 'fa fa-twitter' }),
	        'twitter'
	      );
	    }
	  }]);

	  return TwitterConnect;
	}(React.Component);

	exports.default = TwitterConnect;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	exports.default = function (_ref) {
	  var filters = _ref.filters;
	  var remove = _ref.remove;
	  var changeFilter = _ref.changeFilter;
	  return React.createElement(
	    "div",
	    { className: "filterInputs" },
	    React.createElement(
	      ReactCSSTransitionGroup,
	      { transitionName: "fade" },
	      filters.map(function (filter, i) {
	        var cbAndRemove = function cbAndRemove(ev) {
	          ev.preventDefault();
	          filter.cb(filter.value);
	          remove(i);
	        };
	        var handleChange = function handleChange(ev) {
	          return changeFilter(i, ev.target.value);
	        };
	        var input = null;

	        if (filter.type === 'text') {
	          input = React.createElement("input", { type: "text", placeholder: filter.placeholder, value: filter.text, onChange: handleChange });
	        } else if (filter.type === 'select') {
	          input = React.createElement(
	            "select",
	            { selected: filter.value, onChange: handleChange },
	            filter.options.map(function (option, i) {
	              return React.createElement(
	                "option",
	                { key: 'option' + i, value: i },
	                option.title
	              );
	            })
	          );
	        }

	        // FIXME: these spans are rather silly, but needed to play nice with bootstrap
	        return React.createElement(
	          "form",
	          { className: "filter", onSubmit: cbAndRemove },
	          React.createElement("i", { className: filter.icon }),
	          React.createElement(
	            "span",
	            { className: "input" },
	            input
	          ),
	          React.createElement(
	            "span",
	            { className: "button" },
	            React.createElement("input", { type: "submit", value: 'Go' })
	          ),
	          React.createElement(
	            "span",
	            { className: "button" },
	            React.createElement("input", { type: "button", value: 'Cancel', onClick: function onClick() {
	                return remove(i);
	              } })
	          )
	        );
	      })
	    )
	  );
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Set the Time and Date'], ['Set the Time and Date']),
	    _templateObject2 = _taggedTemplateLiteral(['Pick one of the following:'], ['Pick one of the following:']),
	    _templateObject3 = _taggedTemplateLiteral(['By Request'], ['By Request']),
	    _templateObject4 = _taggedTemplateLiteral(['Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.'], ['Highlight times that you\\\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.']),
	    _templateObject5 = _taggedTemplateLiteral(['Pick Your Date'], ['Pick Your Date']),
	    _templateObject6 = _taggedTemplateLiteral(['Set specific dates and times that this walk is happening.'], ['Set specific dates and times that this walk is happening.']),
	    _templateObject7 = _taggedTemplateLiteral(['Time and Date'], ['Time and Date']),
	    _templateObject8 = _taggedTemplateLiteral(['Select the date and time your walk is happening.'], ['Select the date and time your walk is happening.']),
	    _templateObject9 = _taggedTemplateLiteral(['Remember to click \'Add Date\' after you make your selection.'], ['Remember to click \'Add Date\' after you make your selection.']),
	    _templateObject10 = _taggedTemplateLiteral(['Date selected'], ['Date selected']),
	    _templateObject11 = _taggedTemplateLiteral(['Add Date'], ['Add Date']),
	    _templateObject12 = _taggedTemplateLiteral(['Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.'], ['Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.']),
	    _templateObject13 = _taggedTemplateLiteral(['Leave my availability open. Allow people to contact you to set up a walk.'], ['Leave my availability open. Allow people to contact you to set up a walk.']),
	    _templateObject14 = _taggedTemplateLiteral(['Approximate Duration of Walk'], ['Approximate Duration of Walk']);

	var _DatePicker = __webpack_require__(49);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	var _TimePicker = __webpack_require__(50);

	var _TimePicker2 = _interopRequireDefault(_TimePicker);

	var _TimeSetTable = __webpack_require__(51);

	var _TimeSetTable2 = _interopRequireDefault(_TimeSetTable);

	var _TimeOpenTable = __webpack_require__(53);

	var _TimeOpenTable2 = _interopRequireDefault(_TimeOpenTable);

	var _I18nStore = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React CCM_THEME_PATH */

	// Components


	// Flux


	// Default to a 1-hour walk time
	var ONE_HOUR = 60 * 60 * 1000;

	var DateSelect = function (_React$Component) {
	  _inherits(DateSelect, _React$Component);

	  function DateSelect() {
	    _classCallCheck(this, DateSelect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateSelect).call(this));

	    var today = new Date();

	    // Note: we're only keeping the 'date' on there to use Date's string
	    // parsing. This method is concerned only with the Time
	    // TODO: Support proper time localization - ultimately these times are just
	    // strings, so we're using GMT, but that's bad practice.
	    Object.assign(_this, {
	      state: { start: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 7, 11, 0)), duration: ONE_HOUR },

	      setDay: function setDay(date) {
	        var start = _this.state.start;

	        // Set the Day we're choosing

	        start.setUTCFullYear(date.getUTCFullYear());
	        start.setUTCMonth(date.getUTCMonth());
	        start.setUTCDate(date.getUTCDate());

	        // Update our state
	        _this.setState({ start: start });
	      },

	      /**
	       * Set the time
	       * @param Date time The current time of day
	       */
	      setTime: function setTime(time) {
	        var start = _this.state.start;


	        start.setUTCHours(time.getUTCHours());
	        start.setUTCMinutes(time.getUTCMinutes());

	        _this.setState({ start: start });
	      },

	      /**
	       * Build a valueLink object for updating the time
	       */
	      linkTime: function linkTime() {
	        return {
	          value: _this.state.start.getTime(),
	          requestChange: function requestChange(value) {
	            return _this.setState({ start: new Date(Number(value)) });
	          }
	        };
	      },

	      // Push the date we built here to the linked state
	      addDate: function addDate() {
	        var valueLink = _this.props.valueLink;
	        var value = valueLink.value || {};
	        var slots = (value.slots || []).slice();
	        var start = _this.state.start.getTime();
	        var end = start + _this.state.duration;

	        // Store the timeslot state as seconds, not ms
	        slots.push([start / 1000, end / 1000]);

	        value.slots = slots;
	        valueLink.requestChange(value);
	      }
	    });
	    return _this;
	  }

	  _createClass(DateSelect, [{
	    key: 'render',
	    value: function render() {
	      var valueLink = this.props.valueLink;


	      return React.createElement(
	        'div',
	        { className: 'tab-pane', id: 'time-and-date' },
	        React.createElement(
	          'div',
	          { className: 'tab-content', id: 'walkduration' },
	          React.createElement(
	            'div',
	            { className: 'tab-pane hide', id: 'time-and-date-select' },
	            React.createElement(
	              'div',
	              { className: 'page-header', 'data-section': 'time-and-date' },
	              React.createElement(
	                'h1',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject)
	              )
	            ),
	            React.createElement(
	              'legend',
	              null,
	              (0, _I18nStore.translateTag)(_templateObject2)
	            ),
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'ul',
	                { className: 'thumbnails', id: 'block-select' },
	                React.createElement(
	                  'li',
	                  null,
	                  React.createElement(
	                    'a',
	                    { href: '#time-and-date-all', 'data-toggle': 'tab' },
	                    React.createElement(
	                      'div',
	                      { className: 'thumbnail' },
	                      React.createElement('img', { src: CCM_THEME_PATH + '/img/time-and-date-full.png' }),
	                      React.createElement(
	                        'div',
	                        { className: 'caption' },
	                        React.createElement(
	                          'div',
	                          { className: 'text-center' },
	                          React.createElement(
	                            'h4',
	                            null,
	                            (0, _I18nStore.translateTag)(_templateObject3)
	                          )
	                        ),
	                        React.createElement(
	                          'p',
	                          null,
	                          (0, _I18nStore.translateTag)(_templateObject4)
	                        )
	                      )
	                    )
	                  )
	                ),
	                React.createElement(
	                  'li',
	                  null,
	                  React.createElement(
	                    'a',
	                    { href: '#time-and-date-set', 'data-toggle': 'tab' },
	                    React.createElement(
	                      'div',
	                      { className: 'thumbnail' },
	                      React.createElement('img', { src: CCM_THEME_PATH + '/img/time-and-date-some.png' }),
	                      React.createElement(
	                        'div',
	                        { className: 'caption' },
	                        React.createElement(
	                          'div',
	                          { className: 'text-center' },
	                          React.createElement(
	                            'h4',
	                            null,
	                            (0, _I18nStore.translateTag)(_templateObject5)
	                          )
	                        ),
	                        React.createElement(
	                          'p',
	                          null,
	                          (0, _I18nStore.translateTag)(_templateObject6)
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'tab-pane active', id: 'time-and-date-set' },
	            React.createElement(
	              'div',
	              { className: 'page-header', 'data-section': 'time-and-date' },
	              React.createElement(
	                'h1',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject7)
	              ),
	              React.createElement(
	                'p',
	                { className: 'lead' },
	                (0, _I18nStore.translateTag)(_templateObject8)
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'alert alert-info' },
	              (0, _I18nStore.translateTag)(_templateObject9)
	            ),
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(_DatePicker2.default, { setDay: this.setDay, defaultDate: this.state.start })
	              ),
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'thumbnail' },
	                  React.createElement(
	                    'div',
	                    { className: 'caption' },
	                    React.createElement(
	                      'h4',
	                      { className: 'date-indicate-set' },
	                      React.createElement(
	                        'small',
	                        null,
	                        (0, _I18nStore.translateTag)(_templateObject10),
	                        ':'
	                      ),
	                      this.state.start.toLocaleDateString(undefined, {
	                        weekday: 'long',
	                        month: 'long',
	                        day: 'numeric',
	                        timeZone: 'UTC'
	                      })
	                    ),
	                    React.createElement('hr', null),
	                    React.createElement(_TimePicker2.default, { ref: 'timePicker', valueLinkDuration: this.linkState('duration'), valueLinkStart: this.linkTime() }),
	                    React.createElement('hr', null),
	                    React.createElement(
	                      'button',
	                      { className: 'btn btn-primary', id: 'save-date-set', onClick: this.addDate },
	                      (0, _I18nStore.translateTag)(_templateObject11)
	                    )
	                  )
	                )
	              )
	            ),
	            React.createElement('br', null),
	            React.createElement(_TimeSetTable2.default, { valueLink: valueLink }),
	            React.createElement('hr', null)
	          ),
	          React.createElement(
	            'div',
	            { className: 'tab-pane hide', id: 'time-and-date-all' },
	            React.createElement(
	              'div',
	              { className: 'page-header', 'data-section': 'time-and-date' },
	              React.createElement(
	                'h1',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject7)
	              ),
	              React.createElement(
	                'p',
	                { className: 'lead' },
	                (0, _I18nStore.translateTag)(_templateObject12)
	              )
	            ),
	            React.createElement(
	              'label',
	              { className: 'checkbox' },
	              React.createElement('input', { type: 'checkbox', name: 'open' }),
	              (0, _I18nStore.translateTag)(_templateObject13)
	            ),
	            React.createElement('br', null),
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement('div', { className: 'date-picker' })
	              ),
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'thumbnail' },
	                  React.createElement(
	                    'div',
	                    { className: 'caption' },
	                    React.createElement(
	                      'div',
	                      { className: 'date-select-group' },
	                      React.createElement(
	                        'small',
	                        null,
	                        (0, _I18nStore.translateTag)(_templateObject10),
	                        ':'
	                      ),
	                      React.createElement('h4', { className: 'date-indicate-all' }),
	                      React.createElement('hr', null)
	                    ),
	                    React.createElement(
	                      'label',
	                      { htmlFor: 'walk-duration' },
	                      (0, _I18nStore.translateTag)(_templateObject14),
	                      ':'
	                    ),
	                    React.createElement(
	                      'select',
	                      { name: 'duration', id: 'walk-duration', defaultValue: '1 Hour, 30 Minutes' },
	                      React.createElement(
	                        'option',
	                        { value: '30 Minutes' },
	                        '30 Minutes'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '1 Hour' },
	                        '1 Hour'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '1 Hour, 30 Minutes' },
	                        '1 Hour, 30 Minutes'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '2 Hours' },
	                        '2 Hours'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '2 Hours, 30 Minutes' },
	                        '2 Hours, 30 Minutes'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '3 Hours' },
	                        '3 Hours'
	                      ),
	                      React.createElement(
	                        'option',
	                        { value: '3 Hours, 30 Minutes' },
	                        '3 Hours, 30 Minutes'
	                      )
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'date-select-group' },
	                      React.createElement('hr', null),
	                      React.createElement(
	                        'button',
	                        { className: 'btn btn-primary', id: 'save-date-all', onClick: this.addDate },
	                        (0, _I18nStore.translateTag)(_templateObject11)
	                      )
	                    )
	                  )
	                )
	              )
	            ),
	            React.createElement('br', null),
	            React.createElement(_TimeOpenTable2.default, null),
	            React.createElement('hr', null)
	          )
	        )
	      );
	    }
	  }]);

	  return DateSelect;
	}(React.Component);

	// Load mixins


	exports.default = DateSelect;
	Object.assign(DateSelect.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Basic wrapper around jQuery.datepicker(), so it can be loaded
	 * as a React class
	 */
	/* global React ReactDOM $ */

	var DatePicker = function (_React$Component) {
	  _inherits(DatePicker, _React$Component);

	  function DatePicker() {
	    _classCallCheck(this, DatePicker);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).apply(this, arguments));
	  }

	  _createClass(DatePicker, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _props = this.props;
	      var setDay = _props.setDay;
	      var defaultDate = _props.defaultDate;

	      // Setup sorting on the walk-stops list

	      $(ReactDOM.findDOMNode(this)).datepicker({
	        defaultDate: defaultDate,
	        onSelect: function onSelect(dateText) {
	          // Silly, but needed for inconsistent date formats across libs

	          var _dateText$split = dateText.split('/');

	          var _dateText$split2 = _slicedToArray(_dateText$split, 3);

	          var month = _dateText$split2[0];
	          var day = _dateText$split2[1];
	          var year = _dateText$split2[2];

	          setDay(new Date(Date.UTC(year, month - 1, day)));
	        }
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement("div", { className: "date-picker" });
	    }
	  }]);

	  return DatePicker;
	}(React.Component);

	exports.default = DatePicker;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React */
	// Flux


	// Count walk times in 30 min increments by default
	function buildStartTimes(start) {
	  var step = arguments.length <= 1 || arguments[1] === undefined ? 1800000 : arguments[1];

	  // It's fastest to build our date formatter once upfront
	  var dtfTime = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
	  // All start times begin on the date's 0:00, and by default step every 30 min
	  var yrMoDay = [start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()];
	  var firstTime = Date.UTC.apply(this, yrMoDay);
	  var lastTime = Date.UTC.apply(this, yrMoDay.concat([23, 30]));
	  var startTimes = [];

	  for (var time = firstTime; time <= lastTime; time += step) {
	    startTimes.push({
	      asMs: time,
	      asString: dtfTime.format(time)
	    });
	  }

	  return startTimes;
	}

	/**
	 * Select options to choose your time.
	 * This is an important one, considering how complex timezones and localizing
	 * date formats can be when you're an international organization.
	 */

	var TimePicker = function (_React$Component) {
	  _inherits(TimePicker, _React$Component);

	  function TimePicker(props) {
	    _classCallCheck(this, TimePicker);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this, props));

	    _this.state = { startTimes: buildStartTimes(new Date(props.valueLinkStart.value)) };
	    return _this;
	  }

	  /**
	   * Date management is slow, so it's faster to check if we need to build new dates
	   */


	  _createClass(TimePicker, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var value = _ref.valueLinkStart.value;
	      var oldValue = this.props.valueLinkStart.value;

	      if (oldValue !== value) {
	        this.setState({ startTimes: buildStartTimes(new Date(value)) });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var linkDuration = _props.valueLinkDuration;
	      var requestChange = _props.valueLinkDuration.requestChange;
	      var linkStart = _props.valueLinkStart;

	      // Cast duration as a number

	      linkDuration.requestChange = function (value) {
	        return requestChange(+value);
	      };

	      return React.createElement(
	        'div',
	        { className: 'time-picker' },
	        React.createElement(
	          'label',
	          { htmlFor: 'walk-time' },
	          (0, _I18nStore.t)('Start Time'),
	          ':'
	        ),
	        React.createElement(
	          'select',
	          { name: 'start', id: 'walk-start', valueLink: linkStart },
	          this.state.startTimes.map(function (time, i) {
	            return React.createElement(
	              'option',
	              { key: 'walk-start' + i, value: time.asMs },
	              time.asString
	            );
	          })
	        ),
	        React.createElement(
	          'label',
	          { htmlFor: 'walk-time' },
	          (0, _I18nStore.t)('Approximate Duration of Walk'),
	          ':'
	        ),
	        React.createElement(
	          'select',
	          { name: 'duration', id: 'walk-duration', valueLink: linkDuration },
	          React.createElement(
	            'option',
	            { value: 30 * 60000 },
	            '30 Minutes'
	          ),
	          React.createElement(
	            'option',
	            { value: 60 * 60000 },
	            '1 Hour'
	          ),
	          React.createElement(
	            'option',
	            { value: 90 * 60000 },
	            '1 Hour, 30 Minutes'
	          ),
	          React.createElement(
	            'option',
	            { value: 120 * 60000 },
	            '2 Hours'
	          ),
	          React.createElement(
	            'option',
	            { value: 150 * 60000 },
	            '2 Hours, 30 Minutes'
	          ),
	          React.createElement(
	            'option',
	            { value: 180 * 60000 },
	            '3 Hours'
	          ),
	          React.createElement(
	            'option',
	            { value: 210 * 60000 },
	            '3 Hours, 30 Minutes'
	          )
	        )
	      );
	    }
	  }]);

	  return TimePicker;
	}(React.Component);

	exports.default = TimePicker;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	var _TimeSetRow = __webpack_require__(52);

	var _TimeSetRow2 = _interopRequireDefault(_TimeSetRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * The table with all the times that the walks are scheduled
	 */
	/* global React */

	exports.default = function (_ref) {
	  var _ref$valueLink$value$ = _ref.valueLink.value.slots;
	  var slots = _ref$valueLink$value$ === undefined ? [] : _ref$valueLink$value$;
	  var valueLink = _ref.valueLink;
	  return React.createElement(
	    'table',
	    { className: 'table table-bordered table-hover', id: 'date-list-all' },
	    React.createElement(
	      'thead',
	      null,
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'th',
	          null,
	          (0, _I18nStore.t)('Date')
	        ),
	        React.createElement(
	          'th',
	          null,
	          (0, _I18nStore.t)('Start Time')
	        ),
	        React.createElement(
	          'th',
	          null,
	          (0, _I18nStore.t)('Duration')
	        ),
	        React.createElement('th', null)
	      )
	    ),
	    React.createElement(
	      'tbody',
	      null,
	      slots.map(function (slot, i) {
	        return React.createElement(_TimeSetRow2.default, { key: 'timerow' + i, index: i, slot: slot, valueLink: valueLink });
	      })
	    )
	  );
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* global React */


	var _I18nStore = __webpack_require__(21);

	// TODO: shim
	var dtfDate = void 0;
	var dtfDuration = void 0;
	if ((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object') {
	  dtfDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
	  dtfDuration = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
	}

	// Remove a slot of the time set table
	function removeSlot(i, _ref) {
	  var value = _ref.value;
	  var _ref$value$slots = _ref.value.slots;
	  var slots = _ref$value$slots === undefined ? [] : _ref$value$slots;
	  var requestChange = _ref.requestChange;

	  var removedSlots = slots.slice();
	  removedSlots.splice(i, 1);
	  requestChange(Object.assign({}, value, { slots: removedSlots }));
	}

	exports.default = function (_ref2) {
	  var slot = _ref2.slot;
	  var index = _ref2.index;
	  var valueLink = _ref2.valueLink;

	  var handleClick = function handleClick() {
	    return removeSlot(index, valueLink);
	  };

	  var start = new Date(slot[0] * 1000);
	  var duration = new Date((slot[1] - slot[0]) * 1000);

	  var hours = duration.getUTCHours();
	  var minutes = duration.getUTCMinutes();
	  var durationFmt = [];

	  if (hours) {
	    durationFmt.push((0, _I18nStore.t2)('%d Hour', '%d Hours', hours));
	  }

	  if (minutes) {
	    durationFmt.push((0, _I18nStore.t2)('%d Minute', '%d Minutes', minutes));
	  }

	  return React.createElement(
	    'tr',
	    null,
	    React.createElement(
	      'td',
	      null,
	      dtfDate.format(start)
	    ),
	    React.createElement(
	      'td',
	      null,
	      dtfDuration.format(start)
	    ),
	    React.createElement(
	      'td',
	      null,
	      durationFmt.join(', ')
	    ),
	    React.createElement(
	      'td',
	      null,
	      React.createElement(
	        'a',
	        { onClick: handleClick },
	        React.createElement('i', { className: 'fa fa-times-circle-o' }),
	        ' ',
	        (0, _I18nStore.t)('Remove')
	      )
	    )
	  );
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The table showing open-schedule walks and their times
	 */

	// TODO: Once 'open' walk schedules are implemented on festivals

	var TimeOpenTable = function (_React$Component) {
	  _inherits(TimeOpenTable, _React$Component);

	  function TimeOpenTable() {
	    _classCallCheck(this, TimeOpenTable);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeOpenTable).apply(this, arguments));
	  }

	  _createClass(TimeOpenTable, [{
	    key: "render",
	    value: function render() {
	      return React.createElement("table", null);
	    }
	  }]);

	  return TimeOpenTable;
	}(React.Component);

	exports.default = TimeOpenTable;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Sub-locality'], ['Sub-locality']),
	    _templateObject2 = _taggedTemplateLiteral(['Choose a specific neighbourhood or area where your walk will take place.'], ['Choose a specific neighbourhood or area where your walk will take place.']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global React */

	var mixins = __webpack_require__(39);

	// Flux

	var WardSelect = function (_React$Component) {
	  _inherits(WardSelect, _React$Component);

	  function WardSelect() {
	    _classCallCheck(this, WardSelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(WardSelect).apply(this, arguments));
	  }

	  _createClass(WardSelect, [{
	    key: 'render',
	    value: function render() {
	      var wards = this.props.wards;
	      if (wards && this.props.valueLink) {
	        return React.createElement(
	          'fieldset',
	          { id: 'wards' },
	          React.createElement(
	            'legend',
	            null,
	            (0, _I18nStore.translateTag)(_templateObject)
	          ),
	          React.createElement(
	            'div',
	            { className: 'item' },
	            React.createElement(
	              'div',
	              { className: 'alert alert-info' },
	              (0, _I18nStore.translateTag)(_templateObject2)
	            ),
	            React.createElement(
	              'select',
	              { id: 'ward', name: 'ward', valueLink: this.props.valueLink },
	              React.createElement(
	                'option',
	                { value: '' },
	                'Choose a region'
	              ),
	              wards.map(function (e, i) {
	                return React.createElement(
	                  'option',
	                  { key: i, value: e.value },
	                  e.value
	                );
	              })
	            )
	          )
	        );
	      }
	      return React.createElement('fieldset', { id: 'wards' });
	    }
	  }]);

	  return WardSelect;
	}(React.Component);

	exports.default = WardSelect;

	Object.assign(WardSelect.prototype, mixins.linkedParentState);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Family friendly'], ['Family friendly']),
	    _templateObject2 = _taggedTemplateLiteral(['Wheelchair accessible'], ['Wheelchair accessible']),
	    _templateObject3 = _taggedTemplateLiteral(['Dogs welcome'], ['Dogs welcome']),
	    _templateObject4 = _taggedTemplateLiteral(['Strollers welcome'], ['Strollers welcome']),
	    _templateObject5 = _taggedTemplateLiteral(['Bicycles welcome'], ['Bicycles welcome']),
	    _templateObject6 = _taggedTemplateLiteral(['Steep hills'], ['Steep hills']),
	    _templateObject7 = _taggedTemplateLiteral(['Wear sensible shoes (uneven terrain)'], ['Wear sensible shoes (uneven terrain)']),
	    _templateObject8 = _taggedTemplateLiteral(['Busy sidewalks'], ['Busy sidewalks']),
	    _templateObject9 = _taggedTemplateLiteral(['Bicycles only'], ['Bicycles only']),
	    _templateObject10 = _taggedTemplateLiteral(['Low light or nighttime'], ['Low light or nighttime']),
	    _templateObject11 = _taggedTemplateLiteral(['Senior Friendly'], ['Senior Friendly']),
	    _templateObject12 = _taggedTemplateLiteral(['How accessible is this walk?'], ['How accessible is this walk?']);

	var _mixins = __webpack_require__(39);

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
	                                                                                                                                                   * Menu to select accessibility requirements
	                                                                                                                                                   */
	/* global React */

	// Flux


	var options = [{ id: 'accessible-familyfriendly', name: (0, _I18nStore.translateTag)(_templateObject) }, { id: 'accessible-wheelchair', name: (0, _I18nStore.translateTag)(_templateObject2) }, { id: 'accessible-dogs', name: (0, _I18nStore.translateTag)(_templateObject3) }, { id: 'accessible-strollers', name: (0, _I18nStore.translateTag)(_templateObject4) }, { id: 'accessible-bicycles', name: (0, _I18nStore.translateTag)(_templateObject5) }, { id: 'accessible-steephills', name: (0, _I18nStore.translateTag)(_templateObject6) }, { id: 'accessible-uneven', name: (0, _I18nStore.translateTag)(_templateObject7) }, { id: 'accessible-busy', name: (0, _I18nStore.translateTag)(_templateObject8) }, { id: 'accessible-bicyclesonly', name: (0, _I18nStore.translateTag)(_templateObject9) }, { id: 'accessible-lowlight', name: (0, _I18nStore.translateTag)(_templateObject10) }, { id: 'accessible-seniors', name: (0, _I18nStore.translateTag)(_templateObject11) }];

	var AccessibleSelect = function (_React$Component) {
	  _inherits(AccessibleSelect, _React$Component);

	  function AccessibleSelect() {
	    _classCallCheck(this, AccessibleSelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AccessibleSelect).apply(this, arguments));
	  }

	  _createClass(AccessibleSelect, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return React.createElement(
	        'fieldset',
	        { id: 'accessibilities' },
	        React.createElement(
	          'legend',
	          { className: 'required-legend' },
	          (0, _I18nStore.translateTag)(_templateObject12)
	        ),
	        React.createElement(
	          'fieldset',
	          null,
	          options.map(function (option) {
	            return React.createElement(
	              'label',
	              { className: 'checkbox' },
	              React.createElement('input', { type: 'checkbox', checkedLink: _this2.linkParentState(option.id) }),
	              option.name
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return AccessibleSelect;
	}(React.Component);

	exports.default = AccessibleSelect;


	Object.assign(AccessibleSelect.prototype, _mixins.linkedParentState);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Flux


	// Update a field for a team member
	function linkMember(field, _ref) {
	  var value = _ref.value;
	  var _onChange = _ref.onChange;

	  return {
	    value: value[field],
	    onChange: function onChange(e) {
	      return _onChange(field, e.target.value);
	    }
	  };
	}

	/* Data models
	 * TODO: move to flux stores
	 */
	var memberTypes = {
	  leader: { type: 'leader', 'name-first': '', 'name-last': '', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: '' },
	  organizer: { type: 'organizer', 'name-first': '', 'name-last': '', institution: '', website: '' },
	  community: { type: 'community', 'name-first': '', 'name-last': '', bio: '', twitter: '', facebook: '', website: '' },
	  volunteer: { type: 'volunteer', 'name-first': '', 'name-last': '', role: '', website: '' }
	};

	/**
	 * Not a React component, since we use this to build an array of users
	 * @return array
	 */
	function teamMemberList(_ref2) {
	  var values = _ref2.values;
	  var _onChange2 = _ref2.onChange;

	  return values.map(function (user, i) {
	    var teamMember = void 0;

	    // Use empty strings for unset/false
	    user.phone = user.phone || '';

	    // TODO: make linking function
	    var thisUser = {
	      key: i,
	      id: 'teammember' + i,
	      value: user,
	      onChange: function onChange(prop, value) {
	        // Assign the prop we're updating to this team member
	        var team = values.slice();
	        var member = Object.assign({}, user, _defineProperty({}, prop, value));
	        team[i] = member;
	        _onChange2(team);
	      },
	      onDelete: function onDelete() {
	        return deleteMember(values, i, _onChange2);
	      }
	    };

	    if (user.type === 'you') {
	      teamMember = React.createElement(TeamOwner, thisUser);
	    } else if (user.type === 'leader') {
	      teamMember = React.createElement(TeamLeader, thisUser);
	    } else if (user.type === 'organizer') {
	      teamMember = React.createElement(TeamOrganizer, thisUser);
	    } else if (user.type === 'community') {
	      teamMember = React.createElement(TeamCommunityVoice, thisUser);
	    } else if (user.type === 'volunteer') {
	      teamMember = React.createElement(TeamVolunteer, thisUser);
	    }

	    return teamMember;
	  });
	}

	function memberChange(team, propname, value, id, onChange) {
	  var newTeam = team.slice();
	  newTeam[id][propname] = value;
	  onChange(newTeam);
	}

	function addMember(team, member, onChange) {
	  var newTeam = team.slice();
	  newTeam.push(member);
	  onChange(newTeam);
	}

	function deleteMember(team, i, onChange) {
	  var newTeam = team.slice();
	  newTeam.splice(i, 1);
	  onChange(newTeam);
	}

	// Set the member at that specific index

	var TeamBuilder = function (_React$Component) {
	  _inherits(TeamBuilder, _React$Component);

	  function TeamBuilder() {
	    _classCallCheck(this, TeamBuilder);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TeamBuilder).apply(this, arguments));
	  }

	  _createClass(TeamBuilder, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      // If we've added a new member, scroll it into view
	      if (prevProps.team.length < this.props.team.length) {
	        // Scroll body to this element
	        // FIXME use refs, but array-building the team seems to exclude refs and they come up null, eg. `refs = {member1: null}`
	        document.getElementById('teammember' + (this.props.team.length - 1)).scrollIntoView();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var team = _props.team;
	      var onChange = _props.onChange;


	      return React.createElement(
	        'div',
	        { className: 'tab-pane', id: 'team' },
	        React.createElement(
	          'div',
	          { className: 'page-header', 'data-section': 'team' },
	          React.createElement(
	            'h1',
	            null,
	            (0, _I18nStore.t)('Build Your Team')
	          )
	        ),
	        teamMemberList({ values: team, onChange: onChange }),
	        React.createElement(
	          'div',
	          { id: 'add-member' },
	          React.createElement(
	            'h2',
	            null,
	            (0, _I18nStore.t)('Who else is involved with this walk?')
	          ),
	          React.createElement(
	            'h3',
	            { className: 'lead' },
	            (0, _I18nStore.t)('Click to add team members to your walk'),
	            ' (',
	            (0, _I18nStore.t)('Optional'),
	            ')'
	          ),
	          React.createElement(
	            'div',
	            { className: 'team-set' },
	            React.createElement(
	              'div',
	              { className: 'team-row' },
	              React.createElement(
	                'section',
	                { className: 'new-member', id: 'new-walkleader', title: 'Add New Walk Leader', onClick: function onClick() {
	                    return addMember(team, memberTypes.leader, onChange);
	                  } },
	                React.createElement('div', { className: 'icon' }),
	                React.createElement(
	                  'h4',
	                  { className: 'title text-center' },
	                  (0, _I18nStore.t)('Walk Leader')
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.t)('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.')
	                )
	              ),
	              React.createElement(
	                'section',
	                { className: 'new-member', id: 'new-walkorganizer', title: 'Add New Walk Organizer', onClick: function onClick() {
	                    return addMember(team, memberTypes.organizer, onChange);
	                  } },
	                React.createElement('div', { className: 'icon' }),
	                React.createElement(
	                  'h4',
	                  { className: 'title text-center' },
	                  (0, _I18nStore.t)('Walk Organizer')
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.t)('A person responsible for outreach to new and returning Walk Leaders and Community Voices.')
	                )
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'team-row' },
	              React.createElement(
	                'section',
	                { className: 'new-member', id: 'new-communityvoice', title: 'Add A Community Voice', onClick: function onClick() {
	                    return addMember(team, memberTypes.community, onChange);
	                  } },
	                React.createElement('div', { className: 'icon' }),
	                React.createElement(
	                  'h4',
	                  { className: 'title text-center' },
	                  (0, _I18nStore.t)('Community Voice')
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.t)('A community member with stories and/or personal experiences to share.')
	                )
	              ),
	              React.createElement(
	                'section',
	                { className: 'new-member', id: 'new-othermember', title: 'Add another helper to your walk', onClick: function onClick() {
	                    return addMember(team, memberTypes.volunteer, onChange);
	                  } },
	                React.createElement('div', { className: 'icon' }),
	                React.createElement(
	                  'h4',
	                  { className: 'title text-center' },
	                  (0, _I18nStore.t)('Volunteers')
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.t)('Other people who are helping to make your walk happen.')
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return TeamBuilder;
	}(React.Component);

	exports.default = TeamBuilder;


	var TeamOwner = function TeamOwner(props) {
	  return React.createElement(
	    'fieldset',
	    { className: 'team-member walk-owner' },
	    React.createElement(
	      'span',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        (0, _I18nStore.t)('You')
	      )
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'name item required' },
	      React.createElement(
	        'label',
	        null,
	        (0, _I18nStore.t)('Name')
	      ),
	      React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))),
	      React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'role item required' },
	      React.createElement(
	        'label',
	        null,
	        (0, _I18nStore.t)('Role')
	      ),
	      React.createElement(
	        'select',
	        linkMember('role', props),
	        React.createElement(
	          'option',
	          { defaultValue: 'walk-leader' },
	          (0, _I18nStore.t)('Walk Leader')
	        ),
	        React.createElement(
	          'option',
	          { defaultValue: 'co-walk-leader' },
	          (0, _I18nStore.t)('Co-Walk Leader')
	        ),
	        React.createElement(
	          'option',
	          { defaultValue: 'walk-organizer' },
	          (0, _I18nStore.t)('Walk Organizer')
	        )
	      )
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'item' },
	      React.createElement(
	        'label',
	        { className: 'checkbox' },
	        React.createElement('input', _extends({ type: 'checkbox', className: 'role-check' }, linkMember('primary', props))),
	        (0, _I18nStore.t)('Primary Walk Leader')
	      )
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'item required' },
	      React.createElement(
	        'label',
	        { htmlFor: 'bio' },
	        (0, _I18nStore.t)('Introduce yourself')
	      ),
	      React.createElement(
	        'p',
	        { className: 'alert alert-info' },
	        (0, _I18nStore.t)('We recommend keeping your bio under 60 words')
	      ),
	      React.createElement('textarea', _extends({ rows: '6' }, linkMember('bio', props)))
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'contact' },
	      React.createElement(
	        'fieldset',
	        { className: 'item' },
	        React.createElement(
	          'label',
	          null,
	          React.createElement('i', { className: 'fa fa-envelope' }),
	          ' ',
	          (0, _I18nStore.t)('Email')
	        ),
	        React.createElement('input', _extends({ type: 'email', placeholder: '' }, linkMember('email', props)))
	      ),
	      React.createElement(
	        'fieldset',
	        { className: 'item' },
	        React.createElement(
	          'label',
	          { htmlFor: 'leader-twitter' },
	          React.createElement('i', { className: 'fa fa-twitter' }),
	          ' Twitter'
	        ),
	        React.createElement(
	          'div',
	          { className: 'input-group' },
	          React.createElement(
	            'span',
	            { className: 'input-group-addon' },
	            '@'
	          ),
	          React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))
	        )
	      )
	    ),
	    React.createElement(
	      'fieldset',
	      { className: 'social' },
	      React.createElement(
	        'fieldset',
	        { className: 'item' },
	        React.createElement(
	          'label',
	          { htmlFor: 'facebook' },
	          React.createElement('i', { className: 'fa fa-facebook-square' }),
	          ' Facebook'
	        ),
	        React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))
	      ),
	      React.createElement(
	        'fieldset',
	        { className: 'item' },
	        React.createElement(
	          'label',
	          { htmlFor: 'website' },
	          React.createElement('i', { className: 'fa fa-link' }),
	          ' ',
	          (0, _I18nStore.t)('Website')
	        ),
	        React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('website', props)))
	      )
	    ),
	    React.createElement('hr', null),
	    React.createElement(
	      'section',
	      { className: 'private' },
	      React.createElement(
	        'h4',
	        null,
	        (0, _I18nStore.t)('We\'ll keep this part private')
	      ),
	      React.createElement(
	        'p',
	        { className: 'alert alert-info' },
	        (0, _I18nStore.t)('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')
	      ),
	      React.createElement(
	        'fieldset',
	        { className: 'tel required' },
	        React.createElement(
	          'label',
	          null,
	          React.createElement('i', { className: 'fa fa-phone-square' }),
	          (0, _I18nStore.t)('Phone Number')
	        ),
	        React.createElement('input', _extends({ type: 'tel', maxLength: '18', placeholder: '' }, linkMember('phone', props)))
	      )
	    )
	  );
	};

	var TeamLeader = function TeamLeader(props) {
	  return React.createElement(
	    'fieldset',
	    { className: 'team-member walk-leader clearfix' },
	    React.createElement(
	      'legend',
	      null,
	      (0, _I18nStore.t)('Walk Leader')
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'item required' },
	        React.createElement(
	          'label',
	          { htmlFor: 'name' },
	          (0, _I18nStore.t)('Name')
	        ),
	        React.createElement(
	          'div',
	          { className: 'item' },
	          React.createElement(
	            'form',
	            { className: 'form-inline' },
	            React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))),
	            React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'item' },
	        React.createElement(
	          'label',
	          { className: 'checkbox' },
	          React.createElement('input', _extends({ type: 'checkbox', className: 'role-check' }, linkMember('primary', props))),
	          (0, _I18nStore.t)('Primary Walk Leader')
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'item required' },
	        React.createElement(
	          'label',
	          { htmlFor: 'bio' },
	          (0, _I18nStore.t)('Introduce the walk leader')
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert alert-info' },
	          (0, _I18nStore.t)('We recommend keeping the bio under 60 words')
	        ),
	        React.createElement('textarea', _extends({ className: 'col-md-12', rows: '6' }, linkMember('bio', props)))
	      ),
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-md-6' },
	          React.createElement(
	            'label',
	            { htmlFor: 'prependedInput' },
	            React.createElement('i', { className: 'fa fa-twitter' }),
	            ' Twitter'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-prepend' },
	            React.createElement(
	              'span',
	              { className: 'add-on' },
	              '@'
	            ),
	            React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'col-md-6' },
	          React.createElement(
	            'label',
	            { htmlFor: 'facebook' },
	            React.createElement('i', { className: 'fa fa-facebook-square' }),
	            ' Facebook'
	          ),
	          React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-md-6' },
	          React.createElement(
	            'label',
	            { htmlFor: 'website' },
	            React.createElement('i', { className: 'fa fa-link' }),
	            (0, _I18nStore.t)('Website')
	          ),
	          React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('website', props)))
	        )
	      ),
	      React.createElement('hr', null),
	      React.createElement(
	        'h4',
	        null,
	        (0, _I18nStore.t)('Private')
	      ),
	      React.createElement(
	        'div',
	        { className: 'alert alert-info' },
	        (0, _I18nStore.t)('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')
	      ),
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-md-6 required' },
	          React.createElement(
	            'label',
	            { htmlFor: 'email' },
	            React.createElement('i', { className: 'fa fa-envelope' }),
	            (0, _I18nStore.t)('Email')
	          ),
	          React.createElement('input', _extends({ type: 'email', placeholder: 'Email' }, linkMember('email', props)))
	        ),
	        React.createElement(
	          'div',
	          { className: 'col-md-6 tel' },
	          React.createElement(
	            'label',
	            { htmlFor: 'phone' },
	            React.createElement('i', { className: 'fa fa-phone-square' }),
	            (0, _I18nStore.t)('Phone Number')
	          ),
	          React.createElement('input', _extends({ type: 'tel', maxLength: '16', placeholder: '' }, linkMember('phone', props)))
	        )
	      )
	    ),
	    React.createElement(
	      'footer',
	      null,
	      React.createElement(
	        'button',
	        { className: 'btn remove-team-member', onClick: props.onDelete },
	        (0, _I18nStore.t)('Remove Team Member')
	      )
	    )
	  );
	};

	var TeamOrganizer = function TeamOrganizer(props) {
	  return React.createElement(
	    'fieldset',
	    { className: 'team-member walk-organizer' },
	    React.createElement(
	      'legend',
	      null,
	      (0, _I18nStore.t)('Walk Organizer')
	    ),
	    React.createElement(
	      'div',
	      { className: 'row' },
	      React.createElement(
	        'div',
	        { className: 'col-md-9' },
	        React.createElement(
	          'div',
	          { className: 'item required' },
	          React.createElement(
	            'label',
	            { htmlFor: 'name' },
	            (0, _I18nStore.t)('Name')
	          ),
	          React.createElement(
	            'form',
	            { className: 'form-inline' },
	            React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))),
	            React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))
	          )
	        ),
	        React.createElement(
	          'label',
	          { htmlFor: 'affiliation' },
	          (0, _I18nStore.t)('Affilated Institution'),
	          ' (',
	          (0, _I18nStore.t)('Optional'),
	          ')'
	        ),
	        React.createElement('input', _extends({ type: 'text', placeholder: 'e.g. City of Toronto' }, linkMember('institution', props))),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col-md-6' },
	            React.createElement(
	              'label',
	              { htmlFor: 'website' },
	              React.createElement('i', { className: 'fa fa-link' }),
	              (0, _I18nStore.t)('Website')
	            ),
	            React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))
	          )
	        )
	      )
	    ),
	    React.createElement(
	      'footer',
	      null,
	      React.createElement(
	        'button',
	        { className: 'btn remove-team-member', onClick: props.onDelete },
	        (0, _I18nStore.t)('Remove Team Member')
	      )
	    )
	  );
	};

	var TeamCommunityVoice = function TeamCommunityVoice(props) {
	  return React.createElement(
	    'fieldset',
	    { className: 'team-member community-voice' },
	    React.createElement(
	      'legend',
	      null,
	      (0, _I18nStore.t)('Community Voice')
	    ),
	    React.createElement(
	      'div',
	      { className: 'row' },
	      React.createElement(
	        'div',
	        { className: 'col-md-9' },
	        React.createElement(
	          'div',
	          { className: 'item required' },
	          React.createElement(
	            'label',
	            { htmlFor: 'name' },
	            (0, _I18nStore.t)('Name')
	          ),
	          React.createElement(
	            'form',
	            { className: 'form-inline' },
	            React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))),
	            React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'item' },
	          React.createElement(
	            'label',
	            { htmlFor: 'bio' },
	            (0, _I18nStore.t)('Tell everyone about this person')
	          ),
	          React.createElement(
	            'div',
	            { className: 'alert alert-info' },
	            (0, _I18nStore.t)('We recommend keeping the bio under 60 words')
	          ),
	          React.createElement('textarea', _extends({ className: 'col-md-12', rows: '6' }, linkMember('bio', props)))
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col-md-6' },
	            React.createElement(
	              'label',
	              { htmlFor: 'prependedInput' },
	              React.createElement('i', { className: 'fa fa-twitter' }),
	              ' Twitter'
	            ),
	            React.createElement(
	              'div',
	              { className: 'input-prepend' },
	              React.createElement(
	                'span',
	                { className: 'add-on' },
	                '@'
	              ),
	              React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-6' },
	            React.createElement(
	              'label',
	              { htmlFor: 'facebook' },
	              React.createElement('i', { className: 'fa fa-facebook-square' }),
	              ' Facebook'
	            ),
	            React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col-md-6' },
	            React.createElement(
	              'label',
	              { htmlFor: 'website' },
	              React.createElement('i', { className: 'fa fa-link' }),
	              (0, _I18nStore.t)('Website')
	            ),
	            React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))
	          )
	        )
	      )
	    ),
	    React.createElement(
	      'footer',
	      null,
	      React.createElement(
	        'button',
	        { className: 'btn remove-team-member', onClick: props.onDelete },
	        (0, _I18nStore.t)('Remove Team Member')
	      )
	    )
	  );
	};

	var TeamVolunteer = function TeamVolunteer(props) {
	  return React.createElement(
	    'div',
	    { className: 'thumbnail team-member othermember' },
	    React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        (0, _I18nStore.t)('Volunteers')
	      ),
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-md-9' },
	          React.createElement(
	            'div',
	            { className: 'item required' },
	            React.createElement(
	              'label',
	              { htmlFor: 'name' },
	              (0, _I18nStore.t)('Name')
	            ),
	            React.createElement(
	              'form',
	              { className: 'form-inline' },
	              React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))),
	              React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'item required' },
	            React.createElement(
	              'label',
	              { htmlFor: 'role' },
	              (0, _I18nStore.t)('Role')
	            ),
	            React.createElement('input', _extends({ type: 'text' }, linkMember('role', props)))
	          ),
	          React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement(
	                'label',
	                { htmlFor: 'website' },
	                React.createElement('i', { className: 'fa fa-link' }),
	                (0, _I18nStore.t)('Website')
	              ),
	              React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))
	            )
	          )
	        )
	      )
	    ),
	    React.createElement(
	      'footer',
	      null,
	      React.createElement(
	        'button',
	        { className: 'btn remove-team-member', onClick: props.onDelete },
	        (0, _I18nStore.t)('Remove Team Member')
	      )
	    )
	  );
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Publish walk to EventBrite'], ['Publish walk to EventBrite']),
	    _templateObject2 = _taggedTemplateLiteral(['Okay, You\'re Ready to Publish'], ['Okay, You\'re Ready to Publish']),
	    _templateObject3 = _taggedTemplateLiteral(['Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.'], ['Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.']),
	    _templateObject4 = _taggedTemplateLiteral(['Bring me back to edit'], ['Bring me back to edit']),
	    _templateObject5 = _taggedTemplateLiteral(['Publish'], ['Publish']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React ReactDOM $ */

	// Flux


	var WalkPublish = function (_React$Component) {
	  _inherits(WalkPublish, _React$Component);

	  function WalkPublish(props) {
	    _classCallCheck(this, WalkPublish);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkPublish).call(this, props));

	    Object.assign(_this, {
	      state: {
	        eventbrite: !!(props.mirrors && props.mirrors.eventbrite)
	      },
	      handlePublish: function handlePublish() {
	        // This function's meant for callbacks, so it grabs the URL from the caller's state
	        _this.props.saveWalk({ publish: true }, function () {
	          window.location = _this.props.url;
	        });
	      }
	    });
	    return _this;
	  }

	  _createClass(WalkPublish, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      // Bootstrap Modal
	      $(ReactDOM.findDOMNode(this)).modal();

	      // Close the modal when modal closes
	      $(ReactDOM.findDOMNode(this)).bind('hidden.bs.modal', function () {
	        return _this2.props.close();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var city = _props.city;
	      var closeModal = _props.close;
	      // Check city config for which walk mirroring services to expose

	      var mirrorWalk = void 0;
	      if (city.mirrors.indexOf('eventbrite') > -1) {
	        mirrorWalk = React.createElement(
	          'label',
	          { className: 'checkbox' },
	          React.createElement('input', { type: 'checkbox', checkedLink: this.linkState('eventbrite') }),
	          (0, _I18nStore.translateTag)(_templateObject)
	        );
	      }

	      return React.createElement(
	        'dialog',
	        { id: 'publish-warning' },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'article',
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'button',
	                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true' },
	                '×'
	              ),
	              React.createElement(
	                'h3',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject2)
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'modal-body' },
	              React.createElement(
	                'p',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject3)
	              ),
	              mirrorWalk
	            ),
	            React.createElement(
	              'footer',
	              null,
	              React.createElement(
	                'div',
	                { className: 'pull-left' },
	                React.createElement(
	                  'a',
	                  { className: 'walkthrough close', 'data-dismiss': 'modal', onClick: closeModal },
	                  ' ',
	                  (0, _I18nStore.translateTag)(_templateObject4)
	                )
	              ),
	              React.createElement(
	                'a',
	                null,
	                React.createElement(
	                  'button',
	                  { className: 'btn btn-primary walkthrough', 'data-step': 'publish-confirmation', onClick: this.handlePublish },
	                  (0, _I18nStore.translateTag)(_templateObject5)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return WalkPublish;
	}(React.Component);

	exports.default = WalkPublish;

	Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	/**
	 * Text areas with a 'remaining characters' limit
	 */
	var TextAreaLimit = function TextAreaLimit(props) {
	  return React.createElement(
	    'div',
	    { className: 'text-area-limit' },
	    React.createElement('textarea', props),
	    React.createElement(
	      'span',
	      null,
	      (0, _I18nStore.t2)('%s character remaining', '%s characters remaining', props.maxLength - props.valueLink.value.length)
	    )
	  );
	}; // Flux


	exports.default = TextAreaLimit;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Preview of your Walk'], ['Preview of your Walk']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React ReactDOM $ */


	var WalkPreview = function (_React$Component) {
	  _inherits(WalkPreview, _React$Component);

	  function WalkPreview() {
	    _classCallCheck(this, WalkPreview);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(WalkPreview).apply(this, arguments));
	  }

	  _createClass(WalkPreview, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var el = ReactDOM.findDOMNode(this);
	      // Bootstrap Modal
	      $(el).modal();
	      // Close the modal when modal closes
	      $(el).bind('hidden.bs.modal', function () {
	        return _this2.props.close();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'dialog',
	        { id: 'preview-modal' },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'article',
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'button',
	                { type: 'button', className: 'close', 'aria-hidden': 'true', 'data-dismiss': 'modal' },
	                '×'
	              ),
	              React.createElement(
	                'h3',
	                null,
	                (0, _I18nStore.translateTag)(_templateObject)
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'modal-body' },
	              React.createElement('iframe', { src: this.props.url, frameBorder: '0' })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return WalkPreview;
	}(React.Component);

	exports.default = WalkPreview;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["Describe Your Walk"], ["Describe Your Walk"]),
	    _templateObject2 = _taggedTemplateLiteral(["Share Your Route"], ["Share Your Route"]),
	    _templateObject3 = _taggedTemplateLiteral(["Set the Time & Date"], ["Set the Time & Date"]),
	    _templateObject4 = _taggedTemplateLiteral(["Make it Accessible"], ["Make it Accessible"]),
	    _templateObject5 = _taggedTemplateLiteral(["Build Your Team"], ["Build Your Team"]);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	exports.default = function () {
	  return React.createElement(
	    "ul",
	    { className: "nav nav-tabs" },
	    React.createElement(
	      "li",
	      { className: "active" },
	      React.createElement(
	        "a",
	        { "data-toggle": "tab", className: "description", href: "#description" },
	        React.createElement("i", { className: "fa fa-list-ol" }),
	        (0, _I18nStore.translateTag)(_templateObject)
	      )
	    ),
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { "data-toggle": "tab", className: "route", href: "#route" },
	        React.createElement("i", { className: "fa fa-map-marker" }),
	        (0, _I18nStore.translateTag)(_templateObject2)
	      )
	    ),
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { "data-toggle": "tab", className: "time-and-date", href: "#time-and-date" },
	        React.createElement("i", { className: "fa fa-calendar" }),
	        (0, _I18nStore.translateTag)(_templateObject3)
	      )
	    ),
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { "data-toggle": "tab", className: "accessibility", href: "#accessibility" },
	        React.createElement("i", { className: "fa fa-flag" }),
	        (0, _I18nStore.translateTag)(_templateObject4)
	      )
	    ),
	    React.createElement(
	      "li",
	      null,
	      React.createElement(
	        "a",
	        { "data-toggle": "tab", className: "team", href: "#team" },
	        React.createElement("i", { className: "fa fa-users" }),
	        (0, _I18nStore.translateTag)(_templateObject5)
	      )
	    )
	  );
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * Walk Utils
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Mapping functions to grab remote or global-defined Walks
	                                                                                                                                                                                                                                                                   */
	/* global JanesWalk */

	exports.buildWalkObject = buildWalkObject;
	exports.walkSend = walkSend;
	exports.save = save;
	exports.publish = publish;
	exports.load = load;

	var _WalkActions = __webpack_require__(12);

	var _WalkActions2 = _interopRequireDefault(_WalkActions);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Build a walk object based on input data.
	 * Needed for API updates that modify the datastructure, or for loading default
	 * vals when unspecified.
	 * @param object data
	 * @return object
	 */

	// Convert array-ish objects (e.g. {"0": "foo", "1": "bar"}, but _no_ length) to arrays
	var objectToArray = function objectToArray(obj) {
	  return Array.from(_extends({ length: Object.keys(obj).length }, obj));
	};

	/**
	 * Migrate any walks saved in beta format to the v1 API
	 * @param object walk
	 * @return object
	 */
	function migrateToV1(walk) {
	  var migratedWalk = Object.assign({}, walk);

	  // Convert old {0: marker, 1: marker} indexing to a proper array
	  if (migratedWalk.map) {
	    // Convert markers
	    if (!Array.isArray(migratedWalk.map.markers)) {
	      migratedWalk.map.markers = objectToArray(migratedWalk.map.markers);
	    }
	    // Convert routes
	    if (!Array.isArray(migratedWalk.map.route)) {
	      migratedWalk.map.route = objectToArray(migratedWalk.map.route);
	    }
	  }

	  // Convert time slots
	  if (migratedWalk.time && !Array.isArray(migratedWalk.time.slots)) {
	    migratedWalk.time.slots = objectToArray(migratedWalk.time.slots);
	  }

	  // Turn all 'false' values into empty strings
	  for (var i in migratedWalk) {
	    if (migratedWalk[i] === false) {
	      migratedWalk[i] = '';
	    } else if (migratedWalk[i] === null) {
	      // Clear out 'nulls' so we instead take their state from defaults
	      delete migratedWalk[i];
	    }
	  }

	  return migratedWalk;
	}

	function buildWalkObject(_ref) {
	  var data = _ref.data;
	  var user = _ref.user;
	  var url = _ref.url;

	  // Keep these defaults to type, ie don't pre-seed data here, aside from
	  // data loaded by passing it in
	  var defaultWalk = __webpack_require__(62);
	  var defaultTeam = [{
	    type: 'you',
	    'name-first': user.firstName,
	    'name-last': user.lastName,
	    role: 'walk-leader',
	    primary: 'on',
	    bio: user.bio,
	    twitter: user.twitter,
	    facebook: user.facebook,
	    website: user.website,
	    email: user.email,
	    phone: ''
	  }];
	  var walk = _extends({}, defaultWalk, { team: defaultTeam, url: url }, migrateToV1(data));

	  return walk;
	}

	// GET a walk from a remote request
	function getWalk(url, cb) {
	  fetch(url.replace(/(\/+|)$/, '/json')).then(function (res) {
	    return res.json;
	  }).then(function (data) {
	    return cb(null, migrateToV1(data));
	  }).catch(function (e) {
	    return cb('Failed to load walk ' + url + ': ' + e.message);
	  });
	}

	// Load a walk from the JanesWalk global
	function getWalkGlobal(cb) {
	  // CB for consistency, but should always return right away
	  cb(undefined, JanesWalk.walk, JanesWalk.walk.url);
	}

	// Generic function for sending a walk to the server
	function walkSend(_ref2, cb) {
	  var url = _ref2.url;
	  var walk = _ref2.walk;
	  var _ref2$method = _ref2.method;
	  var method = _ref2$method === undefined ? 'POST' : _ref2$method;

	  fetch(url, {
	    method: method,
	    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	    body: JSON.stringify(walk)
	  }).then(function (res) {
	    return res.json();
	  }).then(function (data) {
	    return cb(null, data, url);
	  }).catch(function (e) {
	    return cb('Error parsing JSON on walk post ' + url + ': ' + e.message);
	  });
	}

	function save(cb) {
	  walkSend(_WalkStore2.default.getUrl(), _WalkStore2.default.getApi(), 'POST', function (err, message) {
	    if (err) {
	      console.log(err);
	    } else {
	      cb();
	      console.log(message);
	    }
	  });
	}

	function publish(cb) {
	  // PUT a walk
	  walkSend(_WalkStore2.default.getUrl(), _WalkStore2.default.getApi(), 'PUT', function (err, message) {
	    if (err) {
	      console.log(err);
	    } else {
	      cb();
	      console.log(message);
	    }
	  });
	}

	function load(url) {
	  var receiver = function receiver(err, walk) {
	    if (err) {
	      console.log(err);
	    } else {
	      _WalkActions2.default.receive(walk);
	    }
	  };

	  if (url) {
	    getWalk(url, receiver);
	  } else {
	    getWalkGlobal(receiver);
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = {
		"name": "",
		"shortDescription": "",
		"longDescription": "",
		"accessibleInfo": "",
		"accessibleTransit": "",
		"accessibleParking": "",
		"accessibleFind": "",
		"map": {
			"markers": [],
			"route": []
		},
		"team": [
			{
				"id": -1,
				"type": "you",
				"name-first": "",
				"name-last": "",
				"role": "walk-leader",
				"primary": "on",
				"bio": "",
				"twitter": "",
				"facebook": "",
				"website": "",
				"email": "",
				"phone": ""
			}
		],
		"time": {
			"type": "",
			"slots": []
		},
		"thumbnails": [],
		"wards": "",
		"checkboxes": {},
		"notifications": [],
		"mirrors": {},
		"url": ""
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _Store = __webpack_require__(18);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * Notify Store
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * The notifications. Essentially a log to emit events.
	                                                                                                                                                                                                                   */

	// Requires


	// The notifications
	var _log = [];

	function receiveLogEntry(message, component, level) {
	  _log.push({
	    time: Date.now(),
	    message: message,
	    level: level
	  });
	}

	var NotifyStore = Object.assign({}, _Store2.default, {
	  getLog: function getLog() {
	    return _log;
	  },
	  getLogFrom: function getLogFrom(from) {
	    return _log.filter(function (entry) {
	      return entry.time >= from;
	    });
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register2)((_register = {}, _defineProperty(_register, _JWConstants.ActionTypes.LOG_INFO, function (_ref) {
	    var message = _ref.message;
	    var _ref$component = _ref.component;
	    var component = _ref$component === undefined ? 'caw' : _ref$component;

	    receiveLogEntry(message, component, 'info');
	  }), _defineProperty(_register, _JWConstants.ActionTypes.LOG_WARN, function (_ref2) {
	    var message = _ref2.message;
	    var component = _ref2.component;

	    receiveLogEntry(message, component || 'caw', 'warn');
	  }), _defineProperty(_register, _JWConstants.ActionTypes.LOG_ERROR, function (_ref3) {
	    var message = _ref3.message;
	    var component = _ref3.component;

	    receiveLogEntry(message, component || 'caw', 'error');
	  }), _defineProperty(_register, _JWConstants.ActionTypes.LOG_EMPTY, function () {
	    return _log.splice(0);
	  }), _register), function () {
	    return NotifyStore.emitChange();
	  })
	});

	exports.default = NotifyStore;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global React $ */

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _I18nStore = __webpack_require__(21);

	var _I18nStore2 = _interopRequireDefault(_I18nStore);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _ItineraryActions = __webpack_require__(14);

	var Action = _interopRequireWildcard(_ItineraryActions);

	var _WalkHeader = __webpack_require__(65);

	var _WalkHeader2 = _interopRequireDefault(_WalkHeader);

	var _WalkDescription = __webpack_require__(66);

	var _WalkDescription2 = _interopRequireDefault(_WalkDescription);

	var _WalkRoute = __webpack_require__(67);

	var _WalkRoute2 = _interopRequireDefault(_WalkRoute);

	var _WalkPublicTransit = __webpack_require__(68);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(69);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _WalkStart = __webpack_require__(70);

	var _WalkStart2 = _interopRequireDefault(_WalkStart);

	var _WalkTeam = __webpack_require__(71);

	var _WalkTeam2 = _interopRequireDefault(_WalkTeam);

	var _WalkMenu = __webpack_require__(74);

	var _WalkMenu2 = _interopRequireDefault(_WalkMenu);

	var _WalkMap = __webpack_require__(76);

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

	  return {
	    walk: walk,
	    page: page,
	    city: city,
	    list: firstList,
	    isFavourite: _ItineraryStore2.default.hasInList(walk),
	    schedule: _ItineraryStore2.default.getSchedule()
	  };
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

	    Object.assign(_this, {
	      state: getWalk(props),
	      _onChange: function _onChange() {
	        _this.setState(getWalk);
	      },
	      handleSchedule: function handleSchedule(time) {
	        if (_UserStore2.default.getCurrent()) {
	          Action.schedule(_this.state.walk, time);
	        } else {
	          $('#login').modal();
	        }
	      },
	      handleUnschedule: function handleUnschedule(time) {
	        return Action.unschedule(_this.state.walk, time);
	      },
	      handleAdd: function handleAdd() {
	        if (_UserStore2.default.getCurrent()) {
	          Action.add(_this.state.list, _this.state.walk);
	        } else {
	          $('#login').modal();
	        }
	      },
	      handleRemove: function handleRemove() {
	        return Action.remove(_this.state.list, _this.state.walk);
	      }
	    });
	    return _this;
	  }

	  _createClass(WalkPage, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _ItineraryStore2.default.addChangeListener(this._onChange);
	      _I18nStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _ItineraryStore2.default.removeChangeListener(this._onChange);
	      _I18nStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var city = _state.city;
	      var walk = _state.walk;
	      var _state$walk$map = _state.walk.map;
	      var map = _state$walk$map === undefined ? { markers: [], route: [] } : _state$walk$map;
	      var isFavourite = _state.isFavourite;
	      var schedule = _state.schedule;

	      var hasMarkers = map.markers.length > 0;
	      var hasRoute = map.route.length > 0;
	      var _props$canEdit = this.props.canEdit;
	      var canEdit = _props$canEdit === undefined ? false : _props$canEdit;


	      return React.createElement(
	        'section',
	        { className: 'walkPage' },
	        React.createElement(_WalkHeader2.default, _extends({ walk: walk, canEdit: canEdit, city: city, isFavourite: isFavourite, schedule: schedule }, {
	          onSchedule: this.handleSchedule,
	          onUnschedule: this.handleUnschedule,
	          onAdd: this.handleAdd,
	          onRemove: this.handleRemove
	        })),
	        React.createElement(_WalkMenu2.default, this.state),
	        React.createElement(_WalkDescription2.default, this.state.walk),
	        hasMarkers || hasRoute ? React.createElement(_WalkMap2.default, { map: map }) : null,
	        hasMarkers ? [React.createElement(_WalkRoute2.default, this.state.walk), React.createElement(_WalkStart2.default, this.state.walk)] : null,
	        React.createElement(_WalkPublicTransit2.default, this.state.walk),
	        React.createElement(_WalkParking2.default, this.state.walk),
	        React.createElement(_WalkTeam2.default, this.state.walk)
	      );
	    }
	  }]);

	  return WalkPage;
	}(React.Component);

	exports.default = WalkPage;


	WalkPage.propsType = {
	  page: React.PropTypes.object.isRequired,
	  walk: React.PropTypes.object.isRequired
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['Edit'], ['Edit']),
	    _templateObject2 = _taggedTemplateLiteral(['Led By ', ' ', ''], ['Led By ', ' ', '']);

	var _I18nStore = __webpack_require__(21);

	var _AddToItinerary = __webpack_require__(25);

	var _AddToItinerary2 = _interopRequireDefault(_AddToItinerary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */

	// TODO: Duplicate of Itinerary <Walk />

	/**
	 * Build a style object for the header
	 * @return object A style object for React
	 */
	function headerBG(_ref, _ref2) {
	  var background = _ref.background;
	  var _ref2$thumbnails = _ref2.thumbnails;
	  var thumbnails = _ref2$thumbnails === undefined ? [] : _ref2$thumbnails;

	  // Load the BG
	  var thumb = thumbnails[0] && thumbnails[0].url || background;
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
	  return '';
	}

	var WalkHeader = function WalkHeader(_ref3) {
	  var _ref3$canEdit = _ref3.canEdit;
	  var canEdit = _ref3$canEdit === undefined ? false : _ref3$canEdit;
	  var city = _ref3.city;
	  var walk = _ref3.walk;
	  var _ref3$walk = _ref3.walk;
	  var id = _ref3$walk.id;
	  var title = _ref3$walk.title;
	  var map = _ref3$walk.map;
	  var time = _ref3$walk.time;
	  var _ref3$walk$team = _ref3$walk.team;
	  var team = _ref3$walk$team === undefined ? [] : _ref3$walk$team;
	  var isFavourite = _ref3.isFavourite;
	  var schedule = _ref3.schedule;
	  var onAdd = _ref3.onAdd;
	  var onRemove = _ref3.onRemove;
	  var onSchedule = _ref3.onSchedule;
	  var onUnschedule = _ref3.onUnschedule;

	  // TODO: This is problematic since there are many different type of roles defined, not a finite list
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
	            { href: city.url },
	            city.name + ' walks'
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
	    canEdit ? React.createElement(
	      'h4',
	      null,
	      React.createElement(
	        'a',
	        { href: '/walk/form/' + id },
	        React.createElement('i', { className: 'fa fa-pencil-square-o' }),
	        ' ',
	        (0, _I18nStore.translateTag)(_templateObject)
	      )
	    ) : null,
	    meetingPlace ? React.createElement(
	      'h4',
	      null,
	      meetingPlace
	    ) : null,
	    walkLeader ? React.createElement(
	      'h4',
	      null,
	      (0, _I18nStore.translateTag)(_templateObject2, walkLeader['name-first'], walkLeader['name-last']),
	      ' -'
	    ) : null,
	    React.createElement(_AddToItinerary2.default, { time: time, walk: walk, schedule: schedule, onSchedule: onSchedule, onUnschedule: onUnschedule })
	  );
	};

	WalkHeader.propTypes = {
	  walk: React.PropTypes.object.isRequired,
	  city: React.PropTypes.object.isRequired,
	  isFavourite: React.PropTypes.bool,
	  onRemove: React.PropTypes.func.isRequired,
	  onAdd: React.PropTypes.func.isRequired,
	  onSchedule: React.PropTypes.func.isRequired,
	  onUnschedule: React.PropTypes.func.isRequired
	};

	exports.default = WalkHeader;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['About This Walk'], ['About This Walk']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var WalkDescription = function WalkDescription(_ref) {
	  var _ref$longDescription = _ref.longDescription;
	  var longDescription = _ref$longDescription === undefined ? '' : _ref$longDescription;
	  return React.createElement(
	    'section',
	    { className: 'walkDescription' },
	    React.createElement('a', { name: 'About This Walk' }),
	    React.createElement(
	      'h2',
	      null,
	      React.createElement(
	        'span',
	        { clasName: 'topRule' },
	        (0, _I18nStore.translateTag)(_templateObject)
	      )
	    ),
	    React.createElement('article', { dangerouslySetInnerHTML: { __html: longDescription } })
	  );
	};

	WalkDescription.propTypes = {
	  longDescription: React.PropTypes.string.isRequired
	};

	exports.default = WalkDescription;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["Walk Route"], ["Walk Route"]);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var WalkRoute = function WalkRoute(_ref) {
	  var map = _ref.map;
	  return React.createElement(
	    "section",
	    { className: "walkRoute" },
	    React.createElement("a", { name: "Walk Route" }),
	    React.createElement(
	      "h2",
	      null,
	      (0, _I18nStore.translateTag)(_templateObject)
	    ),
	    React.createElement(
	      "ol",
	      null,
	      map.markers.map(function (_ref2, i) {
	        var title = _ref2.title;
	        var description = _ref2.description;
	        return React.createElement(
	          "li",
	          { key: "routeentry" + i },
	          React.createElement(
	            "h2",
	            null,
	            title
	          ),
	          React.createElement(
	            "p",
	            null,
	            description
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["Taking Public Transit"], ["Taking Public Transit"]);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var WalkPublicTransit = function WalkPublicTransit(_ref) {
	  var _ref$accessibleTransi = _ref.accessibleTransit;
	  var accessibleTransit = _ref$accessibleTransi === undefined ? [] : _ref$accessibleTransi;

	  if (accessibleTransit.length) {
	    return React.createElement(
	      "section",
	      { className: "walkPublicTransit" },
	      React.createElement("a", { name: "Taking Public Transit" }),
	      React.createElement(
	        "h2",
	        null,
	        (0, _I18nStore.translateTag)(_templateObject)
	      ),
	      accessibleTransit
	    );
	  }
	  return React.createElement("section", null);
	};

	WalkPublicTransit.propTypes = {
	  accessibleTransit: React.PropTypes.string.isRequired
	};

	exports.default = WalkPublicTransit;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['Parking Availability'], ['Parking Availability']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var WalkParking = function WalkParking(_ref) {
	  var _ref$accessibleParkin = _ref.accessibleParking;
	  var accessibleParking = _ref$accessibleParkin === undefined ? [] : _ref$accessibleParkin;
	  var style = _ref.style;

	  if (accessibleParking.length) {
	    return React.createElement(
	      'section',
	      { className: 'walkParking ' + style },
	      style === 'walk-page' ? React.createElement('a', { name: 'Parking Availability' }) : null,
	      React.createElement('a', { name: 'Parking Availability' }),
	      React.createElement(
	        'h2',
	        null,
	        (0, _I18nStore.translateTag)(_templateObject)
	      ),
	      accessibleParking
	    );
	  }
	  return React.createElement('section', null);
	};

	WalkParking.propTypes = {
	  accessibleParking: React.PropTypes.string.isRequired
	};

	exports.default = WalkParking;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["How to Find Us"], ["How to Find Us"]);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var WalkStart = function WalkStart(_ref) {
	  var accessibleFind = _ref.accessibleFind;
	  return React.createElement(
	    "section",
	    { className: "walkStart" },
	    React.createElement("a", { name: "How to find us" }),
	    React.createElement(
	      "h2",
	      null,
	      (0, _I18nStore.translateTag)(_templateObject)
	    ),
	    accessibleFind
	  );
	};

	WalkStart.propTypes = {
	  accessibleFind: React.PropTypes.string.isRequired
	};

	exports.default = WalkStart;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['About the Walk Team'], ['About the Walk Team']);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	var connections = __webpack_require__(72);
	var teamTypes = __webpack_require__(73);

	function ConnectionLinks(_ref) {
	  var member = _ref.member;

	  var availConnects = connections.filter(function (c) {
	    return member[c.name];
	  });

	  return React.createElement(
	    'div',
	    { className: 'btn-toolbar' },
	    availConnects.map(function (_ref2, i) {
	      var prefix = _ref2.prefix;
	      var match = _ref2.match;
	      var name = _ref2.name;
	      var style = _ref2.style;
	      return React.createElement(
	        'a',
	        { key: 'connect' + name + i, className: 'btn', href: '' + (member[name].match(match) ? '' : prefix) + member[name], target: '_blank' },
	        React.createElement('i', { className: style })
	      );
	    })
	  );
	}

	var WalkTeam = function WalkTeam(_ref3) {
	  var _ref3$team = _ref3.team;
	  var team = _ref3$team === undefined ? [] : _ref3$team;

	  var teamMembers = team.map(function (m, i) {
	    return React.createElement(
	      'article',
	      { key: i },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          (m['name-first'] + ' ' + m['name-last']).trim(),
	          ', ',
	          React.createElement(
	            'span',
	            { className: 'walkTeamMemberRole' },
	            teamTypes.roles[m.role] || m.role
	          )
	        ),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(ConnectionLinks, { member: m })
	        )
	      ),
	      React.createElement('summary', { dangerouslySetInnerHTML: { __html: m.bio } })
	    );
	  });

	  return React.createElement(
	    'section',
	    { className: 'walkTeam' },
	    React.createElement('a', { name: 'About the Walk Team' }),
	    React.createElement(
	      'h2',
	      null,
	      (0, _I18nStore.translateTag)(_templateObject)
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
/* 72 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "twitter",
			"prefix": "http://twitter.com/",
			"match": "^https?://(www.)?twitter.com",
			"style": "fa fa-twitter"
		},
		{
			"name": "facebook",
			"prefix": "http://facebook.com/",
			"match": "^https?://(www.)?facebook.com",
			"style": "fa fa-facebook"
		},
		{
			"name": "email",
			"prefix": "mailto:",
			"match": "mailto:",
			"style": "fa fa-envelope-o"
		},
		{
			"name": "website",
			"prefix": "//",
			"match": "^https?://",
			"style": "fa fa-globe"
		}
	];

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {
		"roles": {
			"walk-leader": "Walk Leader"
		}
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['About This Walk'], ['About This Walk']),
	    _templateObject2 = _taggedTemplateLiteral(['Walk Route'], ['Walk Route']),
	    _templateObject3 = _taggedTemplateLiteral(['How to find us'], ['How to find us']),
	    _templateObject4 = _taggedTemplateLiteral(['Taking Public Transit'], ['Taking Public Transit']),
	    _templateObject5 = _taggedTemplateLiteral(['Parking Availability'], ['Parking Availability']),
	    _templateObject6 = _taggedTemplateLiteral(['About the Walk Team'], ['About the Walk Team']),
	    _templateObject7 = _taggedTemplateLiteral(['Led By ', ''], ['Led By ', '']),
	    _templateObject8 = _taggedTemplateLiteral(['Meeting at ', ''], ['Meeting at ', '']);

	var _ItineraryUtils = __webpack_require__(26);

	var _Theme = __webpack_require__(75);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* global React */


	// TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
	// TODO: Make walkMenu sticky - will complete after Dashboard

	var menuItems = [{ display: (0, _I18nStore.translateTag)(_templateObject), exists: true }, { display: (0, _I18nStore.translateTag)(_templateObject2), exists: true }, { display: (0, _I18nStore.translateTag)(_templateObject3), exists: true }, { display: (0, _I18nStore.translateTag)(_templateObject4), exists: false }, { display: (0, _I18nStore.translateTag)(_templateObject5), exists: false }, { display: (0, _I18nStore.translateTag)(_templateObject6), exists: true }];

	var WalkMenu = function WalkMenu(_ref) {
	  var _ref$walk = _ref.walk;
	  var _ref$walk$checkboxes = _ref$walk.checkboxes;
	  var checkboxes = _ref$walk$checkboxes === undefined ? [] : _ref$walk$checkboxes;
	  var _ref$walk$title = _ref$walk.title;
	  var title = _ref$walk$title === undefined ? '' : _ref$walk$title;
	  var _ref$walk$map = _ref$walk.map;
	  var map = _ref$walk$map === undefined ? { markers: [], route: [] } : _ref$walk$map;
	  var _ref$walk$time = _ref$walk.time;
	  var time = _ref$walk$time === undefined ? { slots: [] } : _ref$walk$time;
	  var _ref$walk$team = _ref$walk.team;
	  var team = _ref$walk$team === undefined ? [] : _ref$walk$team;
	  var _ref$walk$accessibleT = _ref$walk.accessibleTransit;
	  var accessibleTransit = _ref$walk$accessibleT === undefined ? [] : _ref$walk$accessibleT;
	  var _ref$walk$accessibleP = _ref$walk.accessibleParking;
	  var accessibleParking = _ref$walk$accessibleP === undefined ? [] : _ref$walk$accessibleP;

	  var walkLeader = team.find(function (member) {
	    return member.role === 'walk-leader';
	  });

	  var leaderHead = void 0;
	  var nextDateHead = void 0;
	  var meetingPlaceHead = void 0;

	  if (walkLeader) {
	    leaderHead = React.createElement(
	      'h6',
	      null,
	      (0, _I18nStore.translateTag)(_templateObject7, [walkLeader['name-first'], walkLeader['name-last']].join(' ')),
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
	      (0, _I18nStore.translateTag)(_templateObject8, map.markers[0].title)
	    );
	  }

	  // TODO Convert below to a Utility to use in multiple places like <Dashboard/> <CityWalksFilter/>
	  // <WalkPublicTransit {...walk} />
	  // <WalkParking {...walk} />
	  var tags = Object.keys(checkboxes).filter(function (item) {
	    return item.includes('theme');
	  });

	  // TODO: <WalkAccessibility {...walk} {...filters} /> temporarily removed (below {meetingPlaceHead})

	  // TODO: Improve functionality to be generic for displaying menuItems, and specific react components
	  if ((accessibleTransit || []).length > 0) menuItems[3].exists = true;
	  if ((accessibleParking || []).length > 0) menuItems[4].exists = true;

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
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global React ReactDOM google CCM_THEME_PATH */

	// TODO: WalkMap.jsx already exists, review and re-use
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
	      var map = this.props.map;

	      var locationLatLng = new google.maps.LatLng(map.markers[0].lat, map.markers[0].lng);
	      var markers = [];
	      var mapStyles = __webpack_require__(77);

	      var mapOptions = {
	        center: locationLatLng,
	        scrollwheel: false,
	        backgroundColor: '#d7f0fa'
	      };

	      var googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
	      googleMap.mapTypes.set('map_style', new google.maps.StyledMapType(mapStyles));
	      googleMap.setMapTypeId('map_style');

	      map.markers.forEach(function (_ref, i) {
	        var lat = _ref.lat;
	        var lng = _ref.lng;

	        var marker = new google.maps.Marker({
	          position: new google.maps.LatLng(lat, lng),
	          style: 'stop',
	          icon: stopMarker,
	          map: googleMap,
	          label: {
	            text: String.fromCharCode(i + 65),
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

	      // Draw the line
	      var poly = new google.maps.Polyline({
	        strokeColor: '#F16725',
	        strokeOpacity: 0.8,
	        strokeWeight: 3,
	        editable: false,
	        map: googleMap
	      });
	      poly.setPath(map.route.map(function (_ref2) {
	        var lat = _ref2.lat;
	        var lng = _ref2.lng;
	        return new google.maps.LatLng(lat, lng);
	      }));

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
/* 77 */
/***/ function(module, exports) {

	module.exports = [
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"saturation": 37
				}
			]
		},
		{
			"featureType": "landscape",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#eaeaea"
				}
			]
		},
		{
			"featureType": "poi",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#cadfaa"
				}
			]
		},
		{
			"featureType": "poi.school",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.school",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#dadada"
				}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#90c2ff"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#ffffff"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		}
	];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Header = __webpack_require__(79);

	var _Header2 = _interopRequireDefault(_Header);

	var _Menu = __webpack_require__(81);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Summary = __webpack_require__(88);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _CityStore = __webpack_require__(34);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React */

	// import Resources from './Dashboard/Resources.jsx';

	function getDashData() {
	  return {
	    walks: _WalkStore2.default.getWalks(),
	    users: _UserStore2.default.getUsers(),
	    currentUser: _UserStore2.default.getCurrent(),
	    city: _CityStore2.default.getCity(),
	    announcements: __webpack_require__(89)
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
	      var _props = this.props;
	      var user = _props.user;
	      var edit = _props.edit;
	      var _state = this.state;
	      var city = _state.city;
	      var walks = _state.walks;
	      var users = _state.users;
	      var announcements = _state.announcements;
	      var currentUser = _state.currentUser;


	      return React.createElement(
	        'section',
	        { className: 'dashboard' },
	        React.createElement(_Header2.default, { user: user, announcements: announcements }),
	        React.createElement(_Menu2.default, { walks: walks, users: users, user: user, city: city, currentUser: currentUser, edit: edit }),
	        React.createElement(_Summary2.default, {
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _WithLinks = __webpack_require__(80);

	var _WithLinks2 = _interopRequireDefault(_WithLinks);

	var _AreaStore = __webpack_require__(29);

	var _AreaStore2 = _interopRequireDefault(_AreaStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React $ */


	var getState = function getState() {
	  return {
	    announcements: _AreaStore2.default.getArea('Announcements COs only')
	  };
	};

	var DashboardHeader = function (_React$Component) {
	  _inherits(DashboardHeader, _React$Component);

	  function DashboardHeader(props) {
	    _classCallCheck(this, DashboardHeader);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DashboardHeader).call(this, props));

	    Object.assign(_this, {
	      state: getState(),
	      _onChange: function _onChange() {
	        return _this.setState(getState());
	      }
	    });
	    return _this;
	  }

	  _createClass(DashboardHeader, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _AreaStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _AreaStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var _props$user = _props.user;
	      var firstName = _props$user.firstName;
	      var groups = _props$user.groups;
	      var announcements = _props.announcements;


	      return React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          firstName.toUpperCase(),
	          ' ',
	          groups.includes('City Organizers') ? 'Organizer' : 'Walk Leader',
	          ' Dashboard'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Hi, ',
	          firstName + '!',
	          ' '
	        ),
	        React.createElement(
	          'section',
	          { className: 'dashboardLatestPost' },
	          announcements.filter(function (_ref) {
	            var group = _ref.group;
	            return groups.includes(group);
	          }).slice(0, 3).map(function (_ref2) {
	            var title = _ref2.title;
	            var time = _ref2.time;
	            var text = _ref2.text;
	            return [React.createElement(
	              'h4',
	              null,
	              title
	            ), React.createElement(
	              'h5',
	              null,
	              $.datepicker.formatDate('M d, yy', new Date(time))
	            ), React.createElement(
	              _WithLinks2.default,
	              null,
	              text
	            )];
	          }),
	          this.state.announcements ? React.createElement('span', { dangerouslySetInnerHTML: { __html: this.state.announcements } }) : null
	        )
	      );
	    }
	  }]);

	  return DashboardHeader;
	}(React.Component);

	DashboardHeader.PropTypes = {
	  user: React.PropTypes.object.isRequired
	};

	exports.default = DashboardHeader;

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global React */

	exports.default = function (_ref) {
	  var children = _ref.children;

	  var formatted = children.split(/ /).map(function (word) {
	    if (word.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)) {
	      var prefix = '';
	      if (!word.includes('http')) {
	        if (word.includes('@')) {
	          prefix = 'mailto:';
	        } else {
	          prefix = 'http://';
	        }
	      }

	      return React.createElement(
	        'a',
	        { href: '' + prefix + word, target: '_blank' },
	        word,
	        ' '
	      );
	    }
	    return word + ' ';
	  });

	  return React.createElement(
	    'p',
	    null,
	    formatted
	  );
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['My Walks'], ['My Walks']),
	    _templateObject2 = _taggedTemplateLiteral(['Walks in My City'], ['Walks in My City']),
	    _templateObject3 = _taggedTemplateLiteral(['Edit Profile'], ['Edit Profile']);

	var _I18nStore = __webpack_require__(21);

	var _Walks = __webpack_require__(82);

	var _Walks2 = _interopRequireDefault(_Walks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React */

	// TODO: ImpactReport is not set-up
	// import ImpactReport from './ImpactReport.jsx';

	var Menu = function (_React$Component) {
	  _inherits(Menu, _React$Component);

	  function Menu(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Menu);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Menu)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    var menuItems = [[_Walks2.default, (0, _I18nStore.translateTag)(_templateObject), false, { show: 'user' }], [_Walks2.default, (0, _I18nStore.translateTag)(_templateObject2), false, { show: 'city' }]];

	    if (props.user.id === props.currentUser.id) {
	      menuItems.unshift(['div', (0, _I18nStore.translateTag)(_templateObject3), false, { url: '/profile/edit' }]);
	    }

	    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?, props] tuples
	    Object.assign(_this, {
	      state: {
	        menuItems: menuItems
	      }
	    });
	    return _this;
	  }

	  _createClass(Menu, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var user = _ref.user;
	      var currentUser = _ref.currentUser;

	      if (user.id === currentUser.id) {
	        var menuItems = this.state.menuItems;


	        this.setState({ menuItems: menuItems });
	      }
	    }
	  }, {
	    key: 'toggleSection',
	    value: function toggleSection(idx) {
	      var newItems = this.state.menuItems.slice();

	      var _newItems$idx = _slicedToArray(newItems[idx], 4);

	      var component = _newItems$idx[0];
	      var title = _newItems$idx[1];
	      var isOpen = _newItems$idx[2];
	      var props = _newItems$idx[3];


	      if (component === 'div') {
	        window.open(props.url);
	      } else {
	        newItems[idx][2] = !newItems[idx][2];
	        this.setState({ menuItems: newItems });
	      }
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
	      var edit = _props.edit;
	      var currentUser = _props.currentUser;


	      var menu = menuItems.map(function (_ref2, i) {
	        var _ref3 = _slicedToArray(_ref2, 4);

	        var Component = _ref3[0];
	        var name = _ref3[1];
	        var open = _ref3[2];
	        var props = _ref3[3];
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
	              }
	            },
	            React.createElement('i', { className: 'icon-caret-right' }),
	            ' ',
	            name
	          ),
	          open ? React.createElement(Component, _extends({ user: user, walks: walks, city: city, edit: edit, currentUser: currentUser }, props)) : null
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

	  return Menu;
	}(React.Component);

	exports.default = Menu;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Without Past Walks'], ['Without Past Walks']),
	    _templateObject2 = _taggedTemplateLiteral(['With Past Walks'], ['With Past Walks']),
	    _templateObject3 = _taggedTemplateLiteral(['Export Spreadsheet'], ['Export Spreadsheet']);

	var _WalkFilters = __webpack_require__(83);

	var _WalkFilters2 = _interopRequireDefault(_WalkFilters);

	var _WalksMap = __webpack_require__(84);

	var _WalksMap2 = _interopRequireDefault(_WalksMap);

	var _I18nStore = __webpack_require__(21);

	var _Walk = __webpack_require__(86);

	var _Walk2 = _interopRequireDefault(_Walk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React */

	// TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin


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
	var _filters = __webpack_require__(87);

	var Walks = function (_React$Component) {
	  _inherits(Walks, _React$Component);

	  function Walks(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Walks);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Walks)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    Object.assign(_this, {
	      state: {
	        currentView: 'list',
	        filters: {}
	      },
	      handleToggleFilterPast: function handleToggleFilterPast() {
	        return _this.setState({ filterPast: !_this.state.filterPast });
	      }
	    });
	    return _this;
	  }

	  _createClass(Walks, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _state = this.state;
	      var currentView = _state.currentView;
	      var filterPast = _state.filterPast;
	      var filters = _state.filters;
	      var _props = this.props;
	      var walks = _props.walks;
	      var city = _props.city;
	      var user = _props.user;
	      var show = _props.show;
	      var currentUser = _props.currentUser;

	      // How we're presenting the walks (map or list)

	      var WalkList = void 0;

	      if (currentView === 'list') {
	        (function () {
	          var now = Date.now();
	          var walkIDs = [];
	          var canEdit = false;
	          if (show === 'city') {
	            walkIDs = city.walks;
	            // If this is a CO, who can edit
	            canEdit = currentUser.groups.includes('City Organizers');
	          } else {
	            walkIDs = user.walks;
	            // Walk owner
	            canEdit = user.id === currentUser.id;
	          }

	          WalkList = walkIDs.filter(function (wID) {
	            var _walks$get = walks.get(wID);

	            var time = _walks$get.time;
	            var title = _walks$get.title;
	            // Don't show empty-titled walks

	            if (!(title && title.trim())) return false;
	            // Always show unset times, or if we're not filtering
	            if (!(filterPast && time && time.slots.length) || time && time.slots[0][0] * 1000 > now) return true;
	            return false;
	          }).map(function (id) {
	            var _walks$get2 = walks.get(id);

	            var title = _walks$get2.title;
	            var team = _walks$get2.team;
	            var url = _walks$get2.url;
	            var published = _walks$get2.published;
	            var _walks$get2$map = _walks$get2.map;
	            _walks$get2$map = _walks$get2$map === undefined ? {} : _walks$get2$map;
	            var _walks$get2$map$marke = _walks$get2$map.markers;
	            _walks$get2$map$marke = _walks$get2$map$marke === undefined ? [] : _walks$get2$map$marke;

	            var _walks$get2$map$marke2 = _slicedToArray(_walks$get2$map$marke, 1);

	            var _walks$get2$map$marke3 = _walks$get2$map$marke2[0];
	            _walks$get2$map$marke3 = _walks$get2$map$marke3 === undefined ? {} : _walks$get2$map$marke3;
	            var meeting = _walks$get2$map$marke3.title;
	            var _walks$get2$time = _walks$get2.time;
	            _walks$get2$time = _walks$get2$time === undefined ? {} : _walks$get2$time;
	            var slots = _walks$get2$time.slots;

	            var start = void 0;
	            if (slots && slots.length) start = slots[0][0];
	            return React.createElement(_Walk2.default, { title: title, id: id, key: id, team: team, url: url, published: published, meeting: meeting, start: start, canEdit: canEdit });
	          });
	        })();
	      } else if (currentView === 'map') {
	        WalkList = React.createElement(_WalksMap2.default, { walks: user.walks.map(function (wID) {
	            return walks.get(wID);
	          }), city: city });
	      }

	      // The toggle for the past walks
	      var DateToggle = React.createElement(
	        'button',
	        {
	          className: filterPast ? 'active' : null,
	          onClick: this.handleToggleFilterPast
	        },
	        filterPast ? (0, _I18nStore.translateTag)(_templateObject) : (0, _I18nStore.translateTag)(_templateObject2)
	      );

	      // TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
	      return React.createElement(
	        'div',
	        { className: 'walks' },
	        React.createElement(
	          'button',
	          {
	            className: 'walksListButton ' + (currentView === 'list' ? 'active' : null),
	            onClick: function onClick() {
	              return _this2.setState({ currentView: 'list' });
	            }
	          },
	          'List'
	        ),
	        React.createElement(
	          'button',
	          {
	            className: 'walksMapButton ' + (currentView === 'map' ? 'active' : null),
	            onClick: function onClick() {
	              return _this2.setState({ currentView: 'map' });
	            }
	          },
	          'Map'
	        ),
	        DateToggle,
	        city ? React.createElement(
	          'a',
	          { target: '_blank', href: '/profile/exportCity/' + city.id },
	          React.createElement(
	            'button',
	            null,
	            (0, _I18nStore.translateTag)(_templateObject3)
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
	        WalkList
	      );
	    }
	  }]);

	  return Walks;
	}(React.Component);

	exports.default = Walks;

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global React */
	// TODO*: Refactoring Components, WalksFilter is not doing much

	var Filter = function Filter(_ref) {
	  var name = _ref.name;
	  var handle = _ref.handle;
	  var toggleFilter = _ref.toggleFilter;
	  var removeFilter = _ref.removeFilter;
	  var options = _ref.options;
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
	      Object.keys(options).map(function (h, i) {
	        return React.createElement(
	          'option',
	          { key: i, value: h },
	          options[h]
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global React ReactDOM google */
	// TODO: (Post-PR) WalkMap.jsx already exists, review and re-use, you have a few usages of the google map that can be combined
	var dashMapStyle = __webpack_require__(85);

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
	    if (walkFound) return walkFound;

	    m.setMap(null);
	    return false;
	  });

	  // Add additional markers
	  walks.forEach(function (_ref2) {
	    var id = _ref2.id;
	    var title = _ref2.title;
	    var shortDescription = _ref2.shortDescription;
	    var url = _ref2.url;
	    var _ref2$map = _ref2.map;
	    _ref2$map = _ref2$map === undefined ? {} : _ref2$map;
	    var _ref2$map$markers = _ref2$map.markers;
	    _ref2$map$markers = _ref2$map$markers === undefined ? [] : _ref2$map$markers;

	    var _ref2$map$markers2 = _slicedToArray(_ref2$map$markers, 1);

	    var _ref2$map$markers2$ = _ref2$map$markers2[0];
	    var lat = _ref2$map$markers2$.lat;
	    var lng = _ref2$map$markers2$.lng;

	    if (lat && lng) {
	      var walkFound = markers.find(function (_ref3) {
	        var walkId = _ref3.walkId;
	        return walkId === id;
	      });

	      if (!walkFound) {
	        (function () {
	          var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(lat, lng),
	            style: 'stop',
	            map: map,
	            walkId: id
	          });

	          markers.push(marker);

	          google.maps.event.addListener(marker, 'click', function () {
	            ReactDOM.render(React.createElement(InfoWindow, { title: title, shortDescription: shortDescription, url: url }), _infoNode);

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

	  _createClass(WalksMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props;
	      var city = _props.city;
	      var walks = _props.walks;
	      var googleMapMarkers = this.state.googleMapMarkers;

	      var _city$latlng = _slicedToArray(city.latlng, 2);

	      var lat = _city$latlng[0];
	      var lng = _city$latlng[1];


	      var mapOptions = {
	        center: new google.maps.LatLng(lat, lng),
	        zoom: 12,
	        scrollwheel: false,
	        backgroundColor: '#d7f0fa'
	      };

	      var googleMap = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

	      googleMap.mapTypes.set('map_style', new google.maps.StyledMapType(dashMapStyle));
	      googleMap.setMapTypeId('map_style');

	      this.setState({
	        googleMap: googleMap,
	        googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks)
	      });
	    }

	    // You cannot use this.setState() in componentWillUpdate

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(updatedProps) {
	      var _state = this.state;
	      var googleMap = _state.googleMap;
	      var googleMapMarkers = _state.googleMapMarkers;
	      var walks = updatedProps.walks;


	      this.setState({ googleMapMarkers: manageMarkers(googleMap, googleMapMarkers, walks), walks: walks });
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
/* 85 */
/***/ function(module, exports) {

	module.exports = [
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"saturation": 37
				}
			]
		},
		{
			"featureType": "landscape",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#eaeaea"
				}
			]
		},
		{
			"featureType": "poi",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#cadfaa"
				}
			]
		},
		{
			"featureType": "poi.school",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.school",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#dadada"
				}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#90c2ff"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#ffffff"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		}
	];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Meeting at ', ''], ['Meeting at ', '']);

	var _ItineraryUtils = __webpack_require__(26);

	var _I18nStore = __webpack_require__(21);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React */

	// TODO: (Post PR) Common component from <Itinerary/> <Walk/>
	// https://github.com/jkoudys/janeswalk-web/blob/react14/models/page_types/Walk.php

	var Walk = function (_React$Component) {
	  _inherits(Walk, _React$Component);

	  function Walk(props) {
	    _classCallCheck(this, Walk);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Walk).call(this, props));

	    Object.assign(_this, {
	      handleUnpublish: function handleUnpublish() {
	        var path = _this.props.url.split('.org')[1];

	        fetch(path, { method: 'delete' }).then(function (res) {
	          return res.json();
	        }).then(function (json) {
	          return console.log(json);
	        }).catch(function (error) {
	          return console.log('Error unpublishing walk: ' + error.message);
	        });
	      }
	    });
	    return _this;
	  }

	  _createClass(Walk, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var _props$title = _props.title;
	      var title = _props$title === undefined ? 'Walk Title' : _props$title;
	      var start = _props.start;
	      var _props$meeting = _props.meeting;
	      var meeting = _props$meeting === undefined ? '{no meeting place}' : _props$meeting;
	      var id = _props.id;
	      var team = _props.team;
	      var url = _props.url;
	      var published = _props.published;
	      var _props$canEdit = _props.canEdit;
	      var canEdit = _props$canEdit === undefined ? false : _props$canEdit;


	      return React.createElement(
	        'li',
	        { key: id },
	        React.createElement(
	          'div',
	          { className: start * 1000 > Date.now() ? 'walk' : 'walk pastWalk' },
	          React.createElement(
	            'h3',
	            null,
	            published ? null : 'DRAFT ',
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
	              { href: 'mailto:' + team[0].email },
	              team[0].email
	            )
	          ) : null,
	          React.createElement(
	            'h4',
	            null,
	            (0, _I18nStore.translateTag)(_templateObject, meeting)
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
	          canEdit ? React.createElement(
	            'a',
	            { className: 'option', href: '/walk/form/' + id },
	            'Edit'
	          ) : null,
	          published && canEdit ? React.createElement(
	            'a',
	            { onClick: this.handleUnpublish, className: 'option' },
	            'Unpublish'
	          ) : null
	        )
	      );
	    }
	  }]);

	  return Walk;
	}(React.Component);

	Walk.propTypes = {
	  title: React.PropTypes.string,
	  start: React.PropTypes.number,
	  meeting: React.PropTypes.string,
	  id: React.PropTypes.string.isRequired
	};

	exports.default = Walk;

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = {
		"theme": {
			"name": "Theme",
			"data": {
				"civic-activist": "Activism",
				"nature-petlover": "Animals",
				"urban-architecturalenthusiast": "Architecture",
				"culture-artist": "Art",
				"civic-truecitizen": "Citizenry",
				"civic-commerce": "Commerce",
				"civic-goodneighbour": "Community",
				"culture-aesthete": "Design",
				"urban-film": "Film",
				"culture-foodie": "Food",
				"nature-greenthumb": "Gardening",
				"civic-gender": "Gender",
				"civic-health": "Health",
				"culture-historybuff": "Heritage",
				"civic-international": "International Issues",
				"culture-bookworm": "Literature",
				"civic-military": "Military",
				"urban-music": "Music",
				"civic-nativeissues": "Native Issues",
				"nature-naturelover": "Nature",
				"culture-nightowl": "Night Life",
				"urban-play": "Play",
				"civic-religion": "Religion",
				"urban-sports": "Sports",
				"culture-writer": "Storytelling",
				"urban-suburbanexplorer": "Suburbs",
				"culture-techie": "Technology",
				"urban-moversandshakers": "Transportation",
				"urban-water": "Water"
			}
		},
		"ward": {
			"name": "Region",
			"data": {
				"Ward 1 Etobicoke North": "Ward 1 Etobicoke North",
				"Ward 2 Etobicoke North": "Ward 2 Etobicoke North",
				"Ward 3 Etobicoke Centre": "Ward 3 Etobicoke Centre",
				"Ward 4 Etobicoke Centre": "Ward 4 Etobicoke Centre",
				"Ward 5 Etobicoke-Lakeshore": "Ward 5 Etobicoke-Lakeshore",
				"Ward 6 Etobicoke-Lakeshore": "Ward 6 Etobicoke-Lakeshore",
				"Ward 7 York West": "Ward 7 York West",
				"Ward 8 York West": "Ward 8 York West",
				"Ward 9 York Centre": "Ward 9 York Centre",
				"Ward 10 York Centre": "Ward 10 York Centre",
				"Ward 11 York South-Weston": "Ward 11 York South-Weston",
				"Ward 12 York South-Weston": "Ward 12 York South-Weston",
				"Ward 13 Parkdale-High Park": "Ward 13 Parkdale-High Park",
				"Ward 14 Parkdale-High Park": "Ward 14 Parkdale-High Park",
				"Ward 15 Eglinton-Lawrence": "Ward 15 Eglinton-Lawrence",
				"Ward 16 Eglinton-Lawrence": "Ward 16 Eglinton-Lawrence",
				"Ward 17 Davenport": "Ward 17 Davenport",
				"Ward 18 Davenport": "Ward 18 Davenport",
				"Ward 19 Trinity-Spadina": "Ward 19 Trinity-Spadina",
				"Ward 20 Trinity-Spadina": "Ward 20 Trinity-Spadina",
				"Ward 21 St. Pauls": "Ward 21 St. Pauls",
				"Ward 22 St. Pauls": "Ward 22 St. Pauls",
				"Ward 23 Willowdale": "Ward 23 Willowdale",
				"Ward 24 Willowdale": "Ward 24 Willowdale",
				"Ward 25 Don Valley West": "Ward 25 Don Valley West",
				"Ward 26 Don Valley West": "Ward 26 Don Valley West",
				"Ward 27 Toronto Centre-Rosedale": "Ward 27 Toronto Centre-Rosedale",
				"Ward 28 Toronto Centre-Rosedale": "Ward 28 Toronto Centre-Rosedale",
				"Ward 29 Toronto-Danforth": "Ward 29 Toronto-Danforth",
				"Ward 30 Toronto-Danforth": "Ward 30 Toronto-Danforth",
				"Ward 31 Beaches-East York": "Ward 31 Beaches-East York",
				"Ward 32 Beaches-East York": "Ward 32 Beaches-East York",
				"Ward 33 Don Valley East": "Ward 33 Don Valley East",
				"Ward 34 Don Valley East": "Ward 34 Don Valley East",
				"Ward 35 Scarborough Southwest": "Ward 35 Scarborough Southwest",
				"Ward 36 Scarborough Southwest": "Ward 36 Scarborough Southwest",
				"Ward 37 Scarborough Centre": "Ward 37 Scarborough Centre",
				"Ward 38 Scarborough Centre": "Ward 38 Scarborough Centre",
				"Ward 39 Scarborough-Agincourt": "Ward 39 Scarborough-Agincourt",
				"Ward 40 Scarborough Agincourt": "Ward 40 Scarborough Agincourt",
				"Ward 41 Scarborough-Rouge River": "Ward 41 Scarborough-Rouge River",
				"Ward 42 Scarborough-Rouge River": "Ward 42 Scarborough-Rouge River",
				"Ward 43 Scarborough East": "Ward 43 Scarborough East",
				"Ward 44 Scarborough East": "Ward 44 Scarborough East"
			}
		},
		"accessibility": {
			"name": "Accessibility",
			"data": {
				"bicyclesonly": "Bicyiccles only",
				"bicycles": "Bicycles welcome",
				"busy": "Busy sidewalks",
				"dogs": "Dogs welcome",
				"familyfriendly": "Family friendly",
				"lowlight": "Low light or nighttime",
				"seniors": "Senior Friendly",
				"steephills": "Steep hills",
				"strollers": "Strollers welcome",
				"uneven": "Uneven terrain",
				"wheelchair": "Wheelchair accessible"
			}
		}
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global React */

	exports.default = DashboardSummary;

	var _I18nStore = __webpack_require__(21);

	function DashboardSummary(_ref) {
	  var _ref$city = _ref.city;
	  var city = _ref$city === undefined ? { name: 'your city' } : _ref$city;
	  var walks = _ref.walks;

	  var leaderCount = 0;
	  var walkCount = 0;
	  var year = 2015;
	  var leaders = {};

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = walks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _slicedToArray(_step.value, 2);

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

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "twitter",
			"href": "http://twitter.com/",
			"style": "fa fa-twitter"
		},
		{
			"name": "facebook",
			"href": "http://facebook.com/",
			"style": "fa fa-facebook"
		},
		{
			"name": "email",
			"href": "mailto:",
			"style": "fa fa-envelope-o"
		},
		{
			"name": "website",
			"href": "",
			"style": "fa fa-globe"
		},
		{
			"name": "phone",
			"href": "",
			"style": "fa fa-phone"
		}
	];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React $ CCM_REL */

	var Message = function Message(_ref) {
	  var success = _ref.success;
	  var msg = _ref.msg;
	  var error = _ref.error;
	  return React.createElement(
	    'div',
	    { className: 'alert alert-' + (success ? 'info' : 'danger') },
	    msg,
	    error
	  );
	};

	/**
	 * The 'login' modal that comes up on standard login, not to be confused
	 * with the login page.
	 */

	var Login = function (_React$Component) {
	  _inherits(Login, _React$Component);

	  function Login() {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this));

	    Object.assign(_this, {
	      state: {
	        email: '',
	        password: '',
	        maintainLogin: false,
	        message: {}
	      },
	      handleReset: function handleReset() {
	        var body = new FormData();
	        body.append('uEmail', _this.state.email);
	        body.append('uName', _this.state.email);
	        body.append('format', 'JSON');

	        // Post a reset request to the c5 endpoint for resets
	        fetch(CCM_REL + '/login/forgot_password', {
	          method: 'POST',
	          credentials: 'include',
	          body: body
	        }).then(function (res) {
	          return res.json();
	        }).then(function (json) {
	          return _this.setState({ message: json });
	        }).catch(function (ex) {
	          return console.error('Error resetting password: ' + ex.message);
	        });
	      },

	      handleChangeEmail: function handleChangeEmail(ev) {
	        _this.setState({ email: ev.target.value });
	      },

	      handleChangePassword: function handleChangePassword(ev) {
	        _this.setState({ password: ev.target.value });
	      },

	      handleChangeMaintainLogin: function handleChangeMaintainLogin(ev) {
	        _this.setState({ maintainLogin: ev.target.value });
	      },

	      handleSubmit: function handleSubmit(ev) {
	        ev.preventDefault();
	        var body = new FormData();
	        body.append('uEmail', _this.state.email);
	        body.append('uName', _this.state.email);
	        body.append('uPassword', _this.state.password);
	        body.append('uMaintainLogin', _this.state.maintainLogin);
	        body.append('format', 'JSON');

	        // Post the login to the c5 endpoint for logins
	        fetch(CCM_REL + '/login/do_login', {
	          method: 'POST',
	          credentials: 'include',
	          body: body
	        }).then(function (res) {
	          return res.json();
	        }).then(function (data) {
	          _this.setState({ message: data }, function () {
	            if (data.success === 1) {
	              if (_this.props.redirectURL) {
	                window.location.replace(_this.props.redirectURL);
	              } else {
	                window.location.reload();
	              }
	            }
	          });
	        }).catch(function (ex) {
	          return console.error('Error logging in: ' + ex.message);
	        });
	      }
	    });
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'render',
	    value: function render() {
	      var socialLogin = this.props.socialLogin;
	      var _state = this.state;
	      var email = _state.email;
	      var password = _state.password;


	      var message = void 0;
	      if (Number.isInteger(this.state.message.success)) {
	        message = React.createElement(Message, this.state.message);
	      }

	      return React.createElement(
	        'dialog',
	        { id: 'login' },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'article',
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h3',
	                { className: 'form-lead' },
	                (0, _I18nStore.t)('Sign in to %s', 'Jane\'s Walk')
	              )
	            ),
	            React.createElement(
	              'form',
	              { rel: 'form', method: 'post', onSubmit: this.handleSubmit },
	              React.createElement('section', { dangerouslySetInnerHTML: { __html: socialLogin } }),
	              React.createElement(
	                'section',
	                null,
	                React.createElement(
	                  'h4',
	                  null,
	                  (0, _I18nStore.t)('or, log-in using your email & password')
	                ),
	                React.createElement(
	                  'label',
	                  { htmlFor: 'uEmail' },
	                  (0, _I18nStore.t)('Email'),
	                  React.createElement('input', { type: 'text', name: 'uEmail', id: 'uEmail', ref: 'uEmail', value: email, onChange: this.handleChangeEmail, className: 'ccm-input-text input-large' })
	                ),
	                React.createElement(
	                  'label',
	                  { htmlFor: 'uPassword' },
	                  (0, _I18nStore.t)('Password'),
	                  React.createElement('input', { type: 'password', name: 'uPassword', id: 'uPassword', value: password, onChange: this.handleChangePassword, className: 'ccm-input-text input-large' })
	                ),
	                React.createElement(
	                  'label',
	                  null,
	                  React.createElement('input', { type: 'checkbox', name: 'uMaintainLogin', checked: this.maintainLogin, onChange: this.handleChangeMaintainLogin }),
	                  ' ',
	                  (0, _I18nStore.t)('Keep me signed in.')
	                ),
	                React.createElement(
	                  'a',
	                  { onClick: this.handleReset },
	                  (0, _I18nStore.t)('Request a new password')
	                )
	              ),
	              React.createElement(
	                'footer',
	                null,
	                message,
	                React.createElement(
	                  'a',
	                  { href: CCM_REL + '/register?uEmail=' + email },
	                  (0, _I18nStore.t)('Register for a new account.')
	                ),
	                React.createElement('input', { type: 'submit', className: 'btn ccm-input-submit', id: 'submit', value: (0, _I18nStore.t)('Go!') })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Login;
	}(React.Component);

	exports.default = Login;

/***/ }
/******/ ]);