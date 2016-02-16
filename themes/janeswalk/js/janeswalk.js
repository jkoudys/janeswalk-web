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

	var _CityStore = __webpack_require__(80);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _Itinerary = __webpack_require__(28);

	var ItineraryAPI = _interopRequireWildcard(_Itinerary);

	var _CreateWalk = __webpack_require__(32);

	var _CreateWalk2 = _interopRequireDefault(_CreateWalk);

	var _Walk = __webpack_require__(55);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _Dashboard = __webpack_require__(68);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _Login = __webpack_require__(81);

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
	      if (city && city.background && document.body.style.backgroundImage !== city.background) {
	        document.body.style.backgroundImage = city.background;
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
	exports.dispatch = exports.register = undefined;

	var _flux = __webpack_require__(5);

	var AppDispatcher = new _flux.Dispatcher();
	var register = AppDispatcher.register.bind(AppDispatcher);
	var dispatch = AppDispatcher.dispatch.bind(AppDispatcher);

	exports.default = AppDispatcher;
	exports.register = register;
	exports.dispatch = dispatch;

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

	var Dispatcher = (function () {
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
	})();

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

	"use strict"

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

	;
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
	'ITINERARY_RECEIVE', 'ITINERARY_REMOVE_WALK', 'ITINERARY_ADD_WALK', 'ITINERARY_UPDATE_TITLE', 'ITINERARY_UPDATE_DESCRIPTION', 'ITINERARY_CREATE_LIST', 'ITINERARY_RECEIVE_ALL', 'ITINERARY_SYNC_START', 'ITINERARY_SYNC_END'].reduce(function (p, k) {
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
	exports.updateTitle = updateTitle;
	exports.updateDescription = updateDescription;
	exports.createList = createList;
	exports.receiveAll = receiveAll;
	exports.syncEnd = syncEnd;

	var _JWConstants = __webpack_require__(9);

	var _AppDispatcher = __webpack_require__(4);

	//TODO: API call before dispatch

	function remove(list, walk, time) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK, list: list, walk: walk, time: time });
	}

	function add(list, walk, time) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_ADD_WALK, list: list, walk: walk, time: time });
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Itinerary = __webpack_require__(16);

	var _Itinerary2 = _interopRequireDefault(_Itinerary);

	var _AreaStore = __webpack_require__(29);

	var _AreaStore2 = _interopRequireDefault(_AreaStore);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _dom = __webpack_require__(31);

	var _I18nStore = __webpack_require__(21);

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

	var Navbar = (function (_React$Component) {
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

	      var userOptions = undefined;
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
	})(React.Component);

	exports.default = Navbar;

	Navbar.defaultProps = {
	  editMode: CCM_EDIT_MODE
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	var _ItineraryActions = __webpack_require__(14);

	var _I18nStore = __webpack_require__(21);

	var _Walk = __webpack_require__(23);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _ItineraryHeader = __webpack_require__(26);

	var _ItineraryHeader2 = _interopRequireDefault(_ItineraryHeader);

	var _ItinerarySelect = __webpack_require__(27);

	var _ItinerarySelect2 = _interopRequireDefault(_ItinerarySelect);

	var _Itinerary = __webpack_require__(28);

	var API = _interopRequireWildcard(_Itinerary);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getItinerary = function getItinerary() {
	  var list = arguments.length <= 0 || arguments[0] === undefined ? _ItineraryStore2.default.getItineraryList() : arguments[0];
	  return {
	    activeList: list,
	    lists: _ItineraryStore2.default.getLists(),
	    itinerary: _ItineraryStore2.default.getItineraryList()
	  };
	};

	var Itinerary = (function (_React$Component) {
	  _inherits(Itinerary, _React$Component);

	  function Itinerary(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, Itinerary);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Itinerary)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = Object.assign({}, getItinerary(), props.itinerary);
	    _this._onChange = _this._onChange.bind(_this);
	    return _this;
	  }

	  _createClass(Itinerary, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _ItineraryStore2.default.addChangeListener(this._onChange);
	      _WalkStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _ItineraryStore2.default.removeChangeListener(this._onChange);
	      _WalkStore2.default.removeChangeListener(this._onChange);
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
	    key: '_onChange',
	    value: function _onChange() {
	      var _this3 = this;

	      this.setState(function () {
	        return getItinerary(_this3.state.activeList);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _state = this.state;
	      var activeList = _state.activeList;
	      var lists = _state.lists;
	      var $el = _state.$el;
	      var itinerary = _state.itinerary;

	      // Lookup the walk data from the walk's ID

	      var ItineraryWalks = [];
	      activeList.walks.forEach(function (startTimes, walk) {
	        //TODO: why walk[0], wrong format? Could be how the walk is set ([walk,startTime of null]) for favourite
	        walk = walk[0] || walk;
	        ItineraryWalks.push(React.createElement(_Walk2.default, {
	          key: walk.id,
	          list: activeList,
	          lists: lists,
	          walk: walk,
	          onAdd: function onAdd(list, time) {
	            return (0, _ItineraryActions.add)(list, walk, time);
	          },
	          onRemove: function onRemove(list, time) {
	            return (0, _ItineraryActions.remove)(list, walk, time);
	          },
	          itinerary: itinerary
	        }));
	      });

	      return React.createElement(
	        'dialog',
	        { open: true },
	        React.createElement(
	          'section',
	          { id: 'itinerary' },
	          React.createElement('i', { className: 'close fa fa-times', onClick: function onClick() {
	              return $el.modal('hide');
	            } }),
	          React.createElement(_ItinerarySelect2.default, {
	            lists: lists,
	            activeList: activeList,
	            onChoose: function onChoose(list) {
	              return _this4.setState({ activeList: list });
	            },
	            onCreate: function onCreate() {
	              return (0, _ItineraryActions.createList)((0, _I18nStore.t)('New Itinerary'));
	            }
	          }),
	          React.createElement(
	            'div',
	            { className: 'itinerary' },
	            React.createElement(
	              'section',
	              null,
	              React.createElement(_ItineraryHeader2.default, {
	                onChangeDescription: function onChangeDescription(v) {
	                  return (0, _ItineraryActions.updateDescription)(activeList, v);
	                },
	                onChangeTitle: function onChangeTitle(v) {
	                  return (0, _ItineraryActions.updateTitle)(activeList, v);
	                },
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
	})(React.Component);

	exports.default = Itinerary;

	Itinerary.defaultProps = {
	  itinerary: null
	};

	Itinerary.propTypes = {
	  itinerary: React.PropTypes.array.isRequired
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var _ItineraryUtils = __webpack_require__(19);

	var _WalkStore = __webpack_require__(20);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CHANGE_EVENT = 'change';

	var _lists = new Set();

	// Has this store been synced, and is it syncing?
	var _lastChange = Date.now();

	//TODO: Currently no remove list, just adding lists
	//TODO: How to handle cancelled walks and removing from itinerary when no sign-ups

	var _removeWalk = function _removeWalk(list, walk) {
	  var time = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  if (time) {
	    var startTimes = list.walks.get(walk);
	    var startIndex = (0, _ItineraryUtils.startTimeIndex)(startTimes, time);
	    if (startIndex >= 0) {
	      startTimes.splice(startIndex, 1);
	      list.walks.set(walk, startTimes);
	    }
	  } else {
	    list.walks.delete(walk);
	  }
	};

	var _addWalk = function _addWalk(list, walk) {
	  var time = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  if (time) {
	    var startTimes = list.walks.get(walk);
	    var startIndex = (0, _ItineraryUtils.startTimeIndex)(startTimes, time);
	    if (startIndex === -1) {
	      startTimes.push(time);
	      list.walks.set(walk, startTimes);
	    }
	  } else {
	    list.walks.set(walk);
	  }
	};

	var _createList = function _createList() {
	  var title = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var description = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var list = {
	    title: title,
	    walks: new Set(),
	    description: description,
	    shareUrl: ''
	  };

	  _lists.add(list);

	  // Returning list, since after _createList, _addWalk is called, so passing around the list
	  return list;
	};

	/**
	 * Load all the basic itineraries
	 *
	 * @param itineraries array List of itineraries in serlizable-friendly state
	 */
	var _receiveAll = function _receiveAll(itineraries) {
	  // Itinerary has a list of walk IDs, so load the actual walks from there.
	  //itineraries.forEach(itinerary => _lists.add(Object.assign({}, itinerary, {
	  //  walks: new Set(itinerary.walks.map(w => WalkStore.getWalk(+w)))
	  //})));

	  // TODO: Assume first list in itineraries is user itinerary
	  itineraries.forEach(function (itinerary, index) {
	    var times = itinerary.times || [];

	    _lists.add(Object.assign({}, itinerary, {
	      walks: new Map(itinerary.walks.map(function (wID, i) {
	        return [_WalkStore2.default.getWalk(+wID), times[i] || []];
	      }))
	    }));
	  });
	};

	//walks received from API used to update _itinerary
	var _updateWalks = function _updateWalks(list, walks) {
	  walks.forEach(function (walk) {
	    return list.add(walk);
	  });
	};

	var _updateTitle = function _updateTitle(list, title) {
	  list.title = title;
	};

	var _updateDescription = function _updateDescription(list, description) {
	  list.description = description;
	};

	var ItineraryStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getLists: function getLists() {
	    return _lists;
	  },
	  getItineraryList: function getItineraryList() {
	    var _lists2 = _slicedToArray(_lists, 1);

	    var list = _lists2[0];

	    return list;
	  },
	  getFavouriteList: function getFavouriteList() {
	    var _lists3 = _slicedToArray(_lists, 2);

	    var itinerary = _lists3[0];
	    var favourites = _lists3[1];

	    return favourites;
	  },
	  getWalks: function getWalks(list) {
	    return list.walks;
	  },
	  getLastChange: function getLastChange() {
	    return _lastChange;
	  },
	  totalWalks: function totalWalks() {
	    var count = 0;
	    _lists.forEach(function (list) {
	      return count += list.walks.size;
	    });
	    return count;
	  },

	  //TODO: use _updateWalks to receive walks from server via API call
	  dispatcherIndex: (0, _AppDispatcher.register)(function (payload) {
	    var list = payload.list;
	    var walk = payload.walk;
	    var time = payload.time;

	    switch (payload.type) {
	      case _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK:
	        _lastChange = Date.now();
	        _removeWalk(list, walk, time);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_ADD_WALK:
	        _lastChange = Date.now();
	        //TODO: Dialog to open on first add to Itinerary/Favourites
	        _addWalk(list, walk, time);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_UPDATE_TITLE:
	        _lastChange = Date.now();
	        _updateTitle(list, payload.title);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_UPDATE_DESCRIPTION:
	        _lastChange = Date.now();
	        _updateDescription(list, payload.description);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_CREATE_LIST:
	        _lastChange = Date.now();
	        _createList(payload.title, payload.description);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_RECEIVE_ALL:
	        _receiveAll(payload.itineraries);
	        break;
	    }

	    ItineraryStore.emitChange();
	  })

	});

	exports.default = ItineraryStore;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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
	exports.dateFormatted = dateFormatted;
	exports.startTimeIndex = startTimeIndex;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	// Default formatter
	var dtfDate = undefined;
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
	  var fromFormat = undefined;
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

	function startTimeIndex() {
	  var startTimes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var time = arguments[1];
	  return startTimes.findIndex(function (st) {
	    return st[0] === time[0] && st[1] === time[1];
	  });
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	// Store singletons
	// The Walk objects, keyed by walk ID (ie collection ID)
	/**
	 * Walk store
	 *
	 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
	 * description, and people involved with a walk.
	 */

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

	var WalkStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getWalks: function getWalks() {
	    return _walks;
	  },
	  getWalk: function getWalk(id) {
	    return _walks.get(+id);
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register)(function (payload) {
	    // Go through the various actions
	    switch (payload.type) {
	      // Route actions
	      case _JWConstants.ActionTypes.WALK_RECEIVE:
	        receiveWalk(payload.walk);
	        break;
	      case _JWConstants.ActionTypes.WALK_RECEIVE_ALL:
	        receiveWalks(payload.walks);
	        break;
	    }
	    WalkStore.emitChange();
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
	exports.t2 = exports.t = undefined;

	var _events = __webpack_require__(18);

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _translate = __webpack_require__(22);

	var _translate2 = _interopRequireDefault(_translate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Simple 'something has changed' event
	/**
	 * i18n Store
	 *
	 * Store for i18n language translations
	 */

	// Basic flux setup
	var CHANGE_EVENT = 'change';

	// Local vars

	// The library for managing translations
	var _i18n = new _translate2.default();

	var I18nStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },

	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  getTranslate: function getTranslate() {
	    return _i18n.translate.bind(_i18n);
	  },
	  getTranslatePlural: function getTranslatePlural() {
	    return _i18n.translatePlural.bind(_i18n);
	  }
	});

	// Register our dispatch token as a static method
	I18nStore.dispatchToken = (0, _AppDispatcher.register)(function (payload) {
	  // Go through the various actions
	  switch (payload.type) {
	    // POI actions
	    case _JWConstants.ActionTypes.I18N_RECEIVE:
	      _i18n.constructor(payload.translations);
	      I18nStore.emitChange();
	      break;
	    default:
	    // do nothing
	  }
	});

	exports.default = I18nStore;
	var t = exports.t = _i18n.translate.bind(_i18n);
	var t2 = exports.t2 = _i18n.translatePlural.bind(_i18n);

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AddWalkToList = __webpack_require__(24);

	var _AddWalkToList2 = _interopRequireDefault(_AddWalkToList);

	var _AddToItinerary = __webpack_require__(25);

	var _AddToItinerary2 = _interopRequireDefault(_AddToItinerary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Walk = (function (_React$Component) {
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
	      var itinerary = _props.itinerary;
	      var dialogOpen = this.state.dialogOpen;
	      var title = walk.title;
	      var url = walk.url;
	      var map = walk.map;
	      var time = walk.time;

	      var meeting = undefined,
	          start = undefined;

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
	          React.createElement(_AddToItinerary2.default, { itinerary: itinerary, time: time, walk: walk, onAdd: onAdd, onRemove: onRemove })
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
	})(React.Component);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

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
	        var action = undefined;

	        if (walkFound) {
	          action = function () {
	            return onRemove(otherList);
	          };
	        } else {
	          action = function () {
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(19);

	var AddToItinerary = function AddToItinerary(_ref) {
	  var itinerary = _ref.itinerary;
	  var time = _ref.time;
	  var walk = _ref.walk;
	  var onAdd = _ref.onAdd;
	  var onRemove = _ref.onRemove;

	  var addButtons = [];

	  if (itinerary && time && time.slots) {
	    if (itinerary.walks.has(walk)) {
	      (function () {
	        //retrieve start times for walk
	        var startTimes = itinerary.walks.get(walk);

	        addButtons = time.slots.map(function (t) {
	          if ((0, _ItineraryUtils.startTimeIndex)(startTimes, t) == -1) {
	            return React.createElement(
	              "h4",
	              null,
	              (0, _ItineraryUtils.dateFormatted)(t[0]),
	              React.createElement("button", { className: "addItinerary", onClick: function onClick() {
	                  return onAdd(itinerary, t);
	                } })
	            );
	          } else {
	            return React.createElement(
	              "h4",
	              null,
	              (0, _ItineraryUtils.dateFormatted)(t[0]),
	              React.createElement("button", { className: "removeItinerary", onClick: function onClick() {
	                  return onRemove(itinerary, t);
	                } })
	            );
	          }
	        });
	      })();
	    } else {
	      if (time && time.slots[0]) {
	        addButtons = time.slots.map(function (t) {
	          return React.createElement(
	            "h4",
	            null,
	            (0, _ItineraryUtils.dateFormatted)(t[0]),
	            React.createElement("button", { className: "addItinerary", onClick: function onClick() {
	                return onAdd(itinerary, t);
	              } })
	          );
	        });
	      }
	    }
	  }
	  return React.createElement(
	    "section",
	    null,
	    addButtons
	  );
	};

	exports.default = AddToItinerary;

/***/ },
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.post = post;
	exports.get = get;
	exports.startPolling = startPolling;

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	function getJson(_ref) {
	  var _ref2 = _toArray(_ref);

	  var lists = _ref2;

	  return JSON.stringify(lists.map(function (list) {
	    var walks = [],
	        times = [];
	    var denormal = {};

	    // Denormalize for serializing
	    list.walks.forEach(function (timeArr, walk) {
	      walks.push(+walk.id);
	      if (timeArr) {
	        times.push(timeArr);
	      }
	    });

	    if (times.length) {
	      denormal.times = times;
	    }
	    denormal.walks = walks;

	    return Object.assign({}, list, denormal);
	  }));
	}

	function post(cb) {
	  var url = arguments.length <= 1 || arguments[1] === undefined ? endpoint : arguments[1];

	  var xhr = new XMLHttpRequest();
	  xhr.open('POST', url);
	  xhr.onload = function () {
	    var data = undefined;
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
	  xhr.send(getJson(_ItineraryStore2.default.getLists()));
	}

	function get() {
	  var url = arguments.length <= 0 || arguments[0] === undefined ? endpoint : arguments[0];

	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url);
	  xhr.onload = function () {
	    var data = undefined;
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	var _areas = {};

	var AreaStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getAreas: function getAreas() {
	    return _areas;
	  },
	  getArea: function getArea(name) {
	    return _areas[name];
	  },

	  dispatcherIndex: (0, _AppDispatcher.register)(function (action) {
	    switch (action.type) {
	      case _JWConstants.ActionTypes.AREA_RECEIVE:
	        _areas[action.name] = action.content;
	        break;
	    }

	    AreaStore.emitChange();
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

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	// Store singletons
	// The users, keyed on uID
	/**
	 * User store
	 *
	 * Users on Jane's Walk.
	 */

	var _users = new Map();

	// Is this the actively logged in user
	var _current = undefined;

	// Receive a single walk
	function receiveUser(user, _ref) {
	  var current = _ref.current;

	  _users.set(+user.id, user);

	  if (current) {
	    _current = user;
	  }
	}

	// Receive an array of walks
	function receiveUsers(users) {
	  users.forEach(function (u) {
	    return receiveUser(u, {});
	  });
	}

	var UserStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getUsers: function getUsers() {
	    return _users;
	  },
	  getCurrent: function getCurrent() {
	    return _current;
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register)(function (payload) {
	    // Go through the various actions
	    switch (payload.type) {
	      // Route actions
	      case _JWConstants.ActionTypes.USER_RECEIVE:
	        receiveUser(payload.user, { current: payload.current, profile: payload.profile });
	        break;
	      case _JWConstants.ActionTypes.USER_RECEIVE_ALL:
	        receiveUsers(payload.users);
	        break;
	    }
	    UserStore.emitChange();
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ImageUpload = __webpack_require__(33);

	var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

	var _ThemeSelect = __webpack_require__(34);

	var _ThemeSelect2 = _interopRequireDefault(_ThemeSelect);

	var _MapBuilder = __webpack_require__(36);

	var _MapBuilder2 = _interopRequireDefault(_MapBuilder);

	var _DateSelect = __webpack_require__(44);

	var _DateSelect2 = _interopRequireDefault(_DateSelect);

	var _WardSelect = __webpack_require__(49);

	var _WardSelect2 = _interopRequireDefault(_WardSelect);

	var _AccessibleSelect = __webpack_require__(50);

	var _AccessibleSelect2 = _interopRequireDefault(_AccessibleSelect);

	var _TeamBuilder = __webpack_require__(51);

	var _TeamBuilder2 = _interopRequireDefault(_TeamBuilder);

	var _WalkPublish = __webpack_require__(52);

	var _WalkPublish2 = _interopRequireDefault(_WalkPublish);

	var _TextAreaLimit = __webpack_require__(53);

	var _TextAreaLimit2 = _interopRequireDefault(_TextAreaLimit);

	var _I18nActions = __webpack_require__(3);

	var _I18nActions2 = _interopRequireDefault(_I18nActions);

	var _I18nStore = __webpack_require__(21);

	var _I18nStore2 = _interopRequireDefault(_I18nStore);

	var _helpers = __webpack_require__(43);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Create a Walk
	//
	// Form for creating new walks. Includes a map builder, team builder, scheduler
	//

	// Load create-a-walk View components

	var defaultWalk = __webpack_require__(54);

	// Flux

	// Helpers

	var CreateWalk = (function (_React$Component) {
	  _inherits(CreateWalk, _React$Component);

	  function CreateWalk(props) {
	    _classCallCheck(this, CreateWalk);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CreateWalk).call(this, props));

	    var data = props.data;
	    // TODO: move this into its own model js
	    // Keep these defaults to type, ie don't pre-seed data here, aside from
	    // data loaded by passing it in
	    var walk = Object.assign({}, defaultWalk, { url: props.url });

	    // Convert old {0: marker, 1: marker} indexing to a proper array
	    if (data) {
	      // Convert markers
	      if (data.map && !Array.isArray(data.map.markers)) {
	        data.map.markers = _helpers2.default.objectToArray(data.map.markers);
	      }
	      // Convert routes
	      if (data.map && !Array.isArray(data.map.route)) {
	        data.map.route = _helpers2.default.objectToArray(data.map.route);
	      }
	      // Convert time slots
	      if (data.time && !Array.isArray(data.time.slots)) {
	        data.time.slots = _helpers2.default.objectToArray(data.time.slots);
	      }
	      // Turn all 'false' values into empty strings
	      for (var i in data) {
	        if (data[i] === false) {
	          data[i] = '';
	        } else if (data[i] === null) {
	          // Clear out 'nulls' so we instead take their state from defaults
	          delete data[i];
	        }
	      }

	      // Init the leader as creator, if none set
	      data.team = data.team || [];
	      if (data.team.length === 0) {
	        var user = props.user;
	        data.team = [{
	          type: 'you',
	          "name-first": user.firstName,
	          "name-last": user.lastName,
	          role: 'walk-leader',
	          primary: 'on',
	          bio: user.bio,
	          twitter: user.twitter,
	          facebook: user.facebook,
	          website: user.website,
	          email: user.email,
	          phone: ''
	        }];
	      }
	      Object.assign(walk, data);
	    }

	    _this.state = walk;
	    return _this;
	  }

	  _createClass(CreateWalk, [{
	    key: 'saveWalk',
	    value: function saveWalk(options, cb) {
	      var _this2 = this;

	      // TODO: separate the notifications logic
	      /* Send in the updated walk to save, but keep working */
	      var notifications = this.state.notifications.slice();
	      var removeNotice = function removeNotice() {
	        var notifications = _this2.state.notifications.slice();
	        _this2.setState({ notifications: notifications.slice(1) });
	      };

	      var defaultOptions = {
	        messageTimeout: 1200
	      };
	      options = Object.assign({}, defaultOptions, options);

	      notifications.push({ type: 'info', name: 'Saving walk' });

	      // Build a simplified map from the Google objects
	      this.setState({
	        map: this.refs.mapBuilder.getStateSimple(),
	        notifications: notifications
	      }, function () {
	        $.ajax({
	          url: _this2.state.url,
	          type: options.publish ? 'PUT' : 'POST',
	          data: { json: JSON.stringify(_this2.state) },
	          dataType: 'json',
	          success: (function (data) {
	            var notifications = this.state.notifications.slice();
	            notifications.push({ type: 'success', name: 'Walk saved' });
	            this.setState({ notifications: notifications, url: data.url || this.state.url }, function () {
	              if (cb && cb instanceof Function) {
	                // The 'this' in each callback should be the <CreateWalk>
	                cb.call(this);
	              }
	            });
	            setTimeout(removeNotice, 1200);
	          }).bind(_this2),
	          error: (function (xhr, status, err) {
	            var notifications = this.state.notifications.slice();
	            notifications.push({ type: 'danger', name: 'Walk failed to save', message: 'Keep this window open and contact Jane\'s Walk for assistance' });
	            this.setState({ notifications: notifications });
	            setTimeout(removeNotice, 6000);
	            console.error(this.url, status, err.toString());
	          }).bind(_this2)
	        });
	      });
	      setTimeout(removeNotice, 1200);
	    }
	  }, {
	    key: 'handleNext',
	    value: function handleNext() {
	      // Bootstrap's managing the tabs, so trigger a jQuery click on the next
	      var next = $('#progress-panel > .nav > li.active + li > a');
	      window.scrollTo(0, 0);
	      if (next.length) {
	        this.saveWalk();
	        next.trigger('click');
	      } else {
	        // If no 'next' tab, next step is to publish
	        $(React.findDOMNode(this.refs.publish)).trigger('click');
	      }
	    }
	  }, {
	    key: 'handleSave',
	    value: function handleSave() {
	      this.saveWalk();
	    }
	  }, {
	    key: 'handlePublish',
	    value: function handlePublish() {
	      this.saveWalk({ publish: true }, function () {
	        return console.log('Walk published');
	      });
	    }
	  }, {
	    key: 'handlePreview',
	    value: function handlePreview(e) {
	      var _this3 = this;

	      this.saveWalk({}, function () {
	        return _this3.setState({ preview: true });
	      });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _I18nStore2.default.addChangeListener(this._onChange.bind(this));
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _I18nStore2.default.removeChangeListener(this._onChange.bind(this));
	    }

	    // Simple trigger to re-render the components

	  }, {
	    key: '_onChange',
	    value: function _onChange() {
	      this.setState({});
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      // Used to let the map pass a callback
	      var linkStateMap = {
	        value: this.state.map,
	        requestChange: function requestChange(newVal, cb) {
	          _this4.setState({ map: newVal }, cb);
	        }
	      };

	      var _props = this.props;
	      var user = _props.user;
	      var valt = _props.valt;
	      var city = _props.city;

	      return React.createElement(
	        'main',
	        { id: 'create-walk' },
	        React.createElement(
	          'section',
	          null,
	          React.createElement(
	            'nav',
	            { id: 'progress-panel' },
	            React.createElement(
	              'ul',
	              { className: 'nav nav-tabs' },
	              React.createElement(
	                'li',
	                { className: 'active' },
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'tab', className: 'description', href: '#description' },
	                  React.createElement('i', { className: 'fa fa-list-ol' }),
	                  (0, _I18nStore.t)('Describe Your Walk')
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'tab', className: 'route', href: '#route' },
	                  React.createElement('i', { className: 'fa fa-map-marker' }),
	                  (0, _I18nStore.t)('Share Your Route')
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'tab', className: 'time-and-date', href: '#time-and-date' },
	                  React.createElement('i', { className: 'fa fa-calendar' }),
	                  (0, _I18nStore.t)('Set the Time & Date')
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'tab', className: 'accessibility', href: '#accessibility' },
	                  React.createElement('i', { className: 'fa fa-flag' }),
	                  (0, _I18nStore.t)('Make it Accessible')
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'tab', className: 'team', href: '#team' },
	                  React.createElement('i', { className: 'fa fa-users' }),
	                  (0, _I18nStore.t)('Build Your Team')
	                )
	              )
	            ),
	            React.createElement(
	              'section',
	              { id: 'button-group' },
	              React.createElement(
	                'button',
	                { className: 'btn btn-info btn-preview', id: 'preview-walk', title: 'Preview what you have so far.', onClick: this.handlePreview },
	                (0, _I18nStore.t)('Preview Walk')
	              ),
	              React.createElement(
	                'button',
	                { className: 'btn btn-info btn-submit', id: 'btn-submit', title: 'Publishing will make your visible to all.', onClick: (function () {
	                    this.setState({ publish: true });
	                  }).bind(this), ref: 'publish' },
	                (0, _I18nStore.t)('Publish Walk')
	              ),
	              React.createElement(
	                'button',
	                { className: 'btn btn-info save', title: 'Save', id: 'btn-save', onClick: this.handleSave },
	                (0, _I18nStore.t)('Save')
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
	                      (0, _I18nStore.t)('Hey there, %s!', user.firstName)
	                    ),
	                    React.createElement(
	                      'p',
	                      null,
	                      (0, _I18nStore.t)('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.')
	                    )
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'page-header', 'data-section': 'description' },
	                  React.createElement(
	                    'h1',
	                    null,
	                    (0, _I18nStore.t)('Describe Your Walk')
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
	                        (0, _I18nStore.t)('Walk Title')
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.t)('Something short and memorable.')
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
	                        (0, _I18nStore.t)('Your Walk in a Nutshell')
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.t)('Build intrigue! This is what people see when browsing our walk listings.')
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
	                        (0, _I18nStore.t)('Walk Description')
	                      ),
	                      React.createElement(
	                        'div',
	                        { className: 'alert alert-info' },
	                        (0, _I18nStore.t)('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')
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
	                    (0, _I18nStore.t)('Make it Accessible')
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
	                      (0, _I18nStore.t)('What else do people need to know about the accessibility of this walk?'),
	                      ' (',
	                      (0, _I18nStore.t)('Optional'),
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
	                      (0, _I18nStore.t)('How can someone get to the meeting spot by public transit?'),
	                      ' (',
	                      (0, _I18nStore.t)('Optional'),
	                      ')'
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'alert alert-info' },
	                      (0, _I18nStore.t)('Nearest subway stop, closest bus or streetcar lines, etc.')
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
	                      (0, _I18nStore.t)('Where are the nearest places to park?'),
	                      ' (',
	                      (0, _I18nStore.t)('Optional'),
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
	                      (0, _I18nStore.t)('How will people find you?')
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'alert alert-info' },
	                      (0, _I18nStore.t)('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')
	                    ),
	                    React.createElement('textarea', { rows: '3', name: 'accessible-find', valueLink: this.linkState('accessibleFind') })
	                  )
	                ),
	                React.createElement('hr', null),
	                React.createElement('br', null)
	              ),
	              React.createElement(_TeamBuilder2.default, { onChange: function onChange(v) {
	                  return _this4.setState({ team: v });
	                }, team: this.state.team })
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
	                (0, _I18nStore.t)('Contact City Organizer for help')
	              ),
	              React.createElement(
	                'div',
	                { className: 'popover-content collapse in', id: 'popover-content' },
	                city.cityOrganizer.photo ? React.createElement('div', { className: 'u-avatar', style: { backgroundImage: 'url(' + city.cityOrganizer.photo + ')' } }) : null,
	                React.createElement(
	                  'p',
	                  null,
	                  (0, _I18nStore.t)('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', city.cityOrganizer.firstName, city.name),
	                  ' ',
	                  React.createElement(
	                    'strong',
	                    null,
	                    React.createElement(
	                      'a',
	                      { href: 'mailto:' + city.cityOrganizer.email },
	                      (0, _I18nStore.t)('email me'),
	                      '!'
	                    )
	                  )
	                )
	              )
	            )
	          )
	        ),
	        this.state.publish ? React.createElement(_WalkPublish2.default, { url: this.state.url, saveWalk: this.saveWalk.bind(this), close: this.setState.bind(this, { publish: false }), city: city, mirrors: this.state.mirrors }) : null,
	        this.state.preview ? React.createElement(WalkPreview, { url: this.state.url, close: this.setState.bind(this, { preview: false }) }) : null,
	        React.createElement(
	          'aside',
	          { id: 'notifications' },
	          this.state.notifications.map(function (note) {
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
	})(React.Component);
	// Mixins

	exports.default = CreateWalk;
	Object.assign(CreateWalk.prototype, React.addons.LinkedStateMixin), (function (_React$Component2) {
	  _inherits(WalkPreview, _React$Component2);

	  function WalkPreview() {
	    _classCallCheck(this, WalkPreview);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(WalkPreview).apply(this, arguments));
	  }

	  _createClass(WalkPreview, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this6 = this;

	      var el = React.findDOMNode(this);
	      // Bootstrap Modal
	      $(el).modal();
	      // Close the modal when modal closes
	      $(el).bind('hidden.bs.modal', function () {
	        return _this6.props.close();
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
	                (0, _I18nStore.t)('Preview of your Walk')
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
	})(React.Component);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	var ImageUpload = (function (_React$Component) {
	  _inherits(ImageUpload, _React$Component);

	  function ImageUpload() {
	    _classCallCheck(this, ImageUpload);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageUpload).call(this));

	    _this2.handleUpload = _this2.handleUpload.bind(_this2);
	    return _this2;
	  }

	  _createClass(ImageUpload, [{
	    key: 'removeImage',
	    value: function removeImage(i) {
	      var thumbnails = this.props.valueLink.value;
	      thumbnails.splice(i, 1);
	      this.props.valueLink.requestChange(thumbnails);
	    }
	  }, {
	    key: 'handleUpload',
	    value: function handleUpload(e) {
	      var fd = new FormData();
	      var xhr = new XMLHttpRequest();
	      var _this = this;

	      if (e.currentTarget.files) {
	        // TODO: Update to support uploading multiple files at once
	        // TODO: display a spinner w/ the local file as the BG until
	        // TODO: Move to flux
	        // it's fully uploaded
	        // Load one file
	        fd.append('Filedata', e.currentTarget.files[0]);

	        // Form validation token, generated by concrete5
	        fd.append('ccm_token', this.props.valt);

	        xhr.open('POST', CCM_TOOLS_PATH + '/files/importers/quick');
	        xhr.onload = function () {
	          try {
	            var thumbnails = _this.props.valueLink.value;
	            var data = JSON.parse(this.responseText);
	            thumbnails.push(data);
	            _this.props.valueLink.requestChange(thumbnails);
	          } catch (e) {}
	        };
	        xhr.send(fd);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

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
	          (0, _I18nStore.t)('Upload a photo that best represents your walk.')
	        ),
	        thumbnails.map(function (thumb, i) {
	          // Grab just the name, so local files being uploaded have the same key as the hosted URL
	          var filename = (thumb.url || '' + i).replace(/^.*[\\\/]/, '');
	          return React.createElement(
	            'div',
	            {
	              key: filename,
	              className: 'thumbnail',
	              style: { backgroundImage: 'url(' + thumb.url + ')' } },
	            React.createElement(
	              'a',
	              { className: 'remove', onClick: _this3.removeImage.bind(_this3, i) },
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
	            (0, _I18nStore.t)('Click to upload an image')
	          )
	        ) : undefined
	      );
	    }
	  }]);

	  return ImageUpload;
	})(React.Component);

	exports.default = ImageUpload;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mixins = __webpack_require__(35);

	// Flux

	var ThemeSelect = (function (_React$Component) {
	  _inherits(ThemeSelect, _React$Component);

	  function ThemeSelect() {
	    _classCallCheck(this, ThemeSelect);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ThemeSelect).call(this));

	    _this2.state = {
	      maxChecked: 3,
	      totalChecked: 0
	    };
	    return _this2;
	  }

	  _createClass(ThemeSelect, [{
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _this = this;
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
	          (0, _I18nStore.t)('Themes')
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert alert-info' },
	          (0, _I18nStore.t)('Pick between %d and %d boxes.', 1, this.state.maxChecked)
	        ),
	        this.props.themeCategories.map(function (category) {
	          return React.createElement(
	            'fieldset',
	            { key: category.name },
	            React.createElement(
	              'legend',
	              null,
	              (0, _I18nStore.t)(category.name)
	            ),
	            category.themes.map(function (theme) {
	              // Don't let a checkbox be checked if it pushes over limit
	              var disabled = totalChecked >= _this.state.maxChecked && !checkboxes[theme.id];
	              return React.createElement(
	                'label',
	                { key: theme.id, className: 'checkbox' },
	                React.createElement('input', { type: 'checkbox', disabled: disabled, checkedLink: _this3.linkParentState(theme.id) }),
	                (0, _I18nStore.t)(theme.name)
	              );
	            })
	          );
	        }),
	        ';'
	      );
	    }
	  }]);

	  return ThemeSelect;
	})(React.Component);

	exports.default = ThemeSelect;

	Object.assign(ThemeSelect.prototype, mixins.linkedParentState);
	ThemeSelect.defaultProps = {
	  // Using array for themes to enforce order
	  themeCategories: [{
	    name: 'Community',
	    themes: [{
	      id: 'theme-civic-activist',
	      name: 'Activism'
	    }, {
	      id: 'theme-civic-truecitizen',
	      name: 'Citizenry'
	    }, {
	      id: 'theme-civic-goodneighbour',
	      name: 'Community'
	    }, {
	      id: 'theme-culture-writer',
	      name: 'Storytelling'
	    }]
	  }, {
	    name: 'City-building',
	    themes: [{
	      id: 'theme-urban-architecturalenthusiast',
	      name: 'Architecture'
	    }, {
	      id: 'theme-culture-aesthete',
	      name: 'Design'
	    }, {
	      id: 'theme-urban-suburbanexplorer',
	      name: 'Suburbs'
	    }, {
	      id: 'theme-urban-moversandshakers',
	      name: 'Transportation'
	    }]
	  }, {
	    name: 'Society',
	    themes: [{
	      id: 'theme-civic-gender',
	      name: 'Gender'
	    }, {
	      id: 'theme-civic-health',
	      name: 'Health'
	    }, {
	      id: 'theme-culture-historybuff',
	      name: 'Heritage'
	    }, {
	      id: 'theme-civic-nativeissues',
	      name: 'Native Issues'
	    }, {
	      id: 'theme-civic-religion',
	      name: 'Religion'
	    }]
	  }, {
	    name: 'Expression',
	    themes: [{
	      id: 'theme-culture-artist',
	      name: 'Art'
	    }, {
	      id: 'theme-urban-film',
	      name: 'Film'
	    }, {
	      id: 'theme-culture-bookworm',
	      name: 'Literature'
	    }, {
	      id: 'theme-urban-music',
	      name: 'Music'
	    }, {
	      id: 'theme-urban-play',
	      name: 'Play'
	    }]
	  }, {
	    name: 'The Natural World',
	    themes: [{
	      id: 'theme-nature-petlover',
	      name: 'Animals'
	    }, {
	      id: 'theme-nature-greenthumb',
	      name: 'Gardening'
	    }, {
	      id: 'theme-nature-naturelover',
	      name: 'Nature'
	    }, {
	      id: 'theme-urban-water',
	      name: 'Water'
	    }]
	  }, {
	    name: 'Modernity',
	    themes: [{
	      id: 'theme-civic-international',
	      name: 'International Issues'
	    }, {
	      id: 'theme-civic-military',
	      name: 'Military'
	    }, {
	      id: 'theme-civic-commerce',
	      name: 'Commerce'
	    }, {
	      id: 'theme-culture-nightowl',
	      name: 'Night Life'
	    }, {
	      id: 'theme-culture-techie',
	      name: 'Technology'
	    }, {
	      id: 'theme-urban-sports',
	      name: 'Sports'
	    }, {
	      id: 'theme-culture-foodie',
	      name: 'Food'
	    }]
	  }]
	};

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WalkStopTable = __webpack_require__(37);

	var _WalkStopTable2 = _interopRequireDefault(_WalkStopTable);

	var _WalkInfoWindow = __webpack_require__(38);

	var _WalkInfoWindow2 = _interopRequireDefault(_WalkInfoWindow);

	var _InstagramConnect = __webpack_require__(39);

	var _InstagramConnect2 = _interopRequireDefault(_InstagramConnect);

	var _SoundCloudConnect = __webpack_require__(40);

	var _SoundCloudConnect2 = _interopRequireDefault(_SoundCloudConnect);

	var _TwitterConnect = __webpack_require__(41);

	var _TwitterConnect2 = _interopRequireDefault(_TwitterConnect);

	var _ConnectFilters = __webpack_require__(42);

	var _ConnectFilters2 = _interopRequireDefault(_ConnectFilters);

	var _I18nStore = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Helper = __webpack_require__(43);

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

	var MapBuilder = (function (_React$Component) {
	  _inherits(MapBuilder, _React$Component);

	  function MapBuilder() {
	    _classCallCheck(this, MapBuilder);

	    // State for this component should only track the map editor

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapBuilder).call(this));

	    _this.state = {
	      // The 'mode' we're in: 'addPoint', 'addRoute'
	      mode: {},
	      map: null,
	      markers: new google.maps.MVCArray(),
	      route: null,
	      infowindow: new google.maps.InfoWindow(),
	      // The collection of search terms boxes
	      filters: []
	    };
	    return _this;
	  }

	  _createClass(MapBuilder, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var map = new google.maps.Map(React.findDOMNode(this.refs.gmap), {
	        center: new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]),
	        zoom: this.props.initialZoom,
	        scrollwheel: false,
	        rotateControl: true,
	        mapTypeControlOptions: {
	          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
	        }
	      });

	      // Map won't size properly on a hidden tab, so refresh on tab shown
	      $('a[href="#route"]').on('shown.bs.tab', function (e) {
	        return _this2.boundMapByWalk();
	      });

	      this.setState({ map: map }, this.refreshGMap);
	    }

	    // Build a google map from our serialized map state

	  }, {
	    key: 'refreshGMap',
	    value: function refreshGMap() {
	      var _this3 = this;

	      var valueLink = this.props.valueLink;
	      var markers = new google.maps.MVCArray();
	      var route = null;

	      if (this.state.route) {
	        this.state.route.setMap(null);
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.state.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var marker = _step.value;
	          marker.setMap(null);
	        } // Draw the route
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

	      if (valueLink.value) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = valueLink.value.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var marker = _step2.value;

	            var latlng = undefined;
	            // Set to the markers latlng if available, otherwise place at center
	            if (marker.lat && marker.lng) {
	              latlng = new google.maps.LatLng(marker.lat, marker.lng);
	            } else {
	              latlng = this.state.map.center;
	            }

	            markers.push(this.buildMarker({
	              latlng: latlng,
	              title: marker.title,
	              description: marker.description,
	              media: marker.media
	            }));
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

	        route = this.buildRoute(valueLink.value.route);
	      } else {
	        route = this.buildRoute([]);
	      }

	      // Set marker/route adding
	      google.maps.event.addListener(this.state.map, 'click', function (ev) {
	        _this3.state.infowindow.setMap(null);
	        if (_this3.state.mode.addRoute) {
	          route.setPath(route.getPath().push(ev.latLng));
	          _this3.setState({ route: route });
	        }
	      });

	      this.setState({ markers: markers, route: route });
	    }

	    /**
	     * Make the map fit the markers in this walk
	     */

	  }, {
	    key: 'boundMapByWalk',
	    value: function boundMapByWalk() {
	      // Don't include the route - it can be too expensive to compute.
	      var bounds = new google.maps.LatLngBounds();
	      google.maps.event.trigger(this.state.map, 'resize');
	      if (this.state.markers.getLength()) {
	        for (var i = 0, len = this.state.markers.getLength(); i < len; i++) {
	          bounds.extend(this.state.markers.getAt(i).getPosition());
	        }

	        this.state.map.fitBounds(bounds);
	      }
	    }

	    // Map related functions
	    // Build gmaps Marker object from base data
	    // @param google.maps.LatLng latlng The position to add
	    // @param Object title {title, description}

	  }, {
	    key: 'buildMarker',
	    value: function buildMarker(options) {
	      var _this4 = this;

	      var map = this.state.map;
	      var gMarkerOptions = {
	        animation: google.maps.Animation.DROP,
	        draggable: true,
	        style: 'stop',
	        map: map,
	        icon: stopMarker
	      };
	      var marker = undefined;

	      // Assign default options
	      options = Object.assign({}, {
	        latlng: null,
	        title: '',
	        description: '',
	        media: null
	      }, options);

	      // If we passed in a position
	      if (options.latlng instanceof google.maps.LatLng) {
	        gMarkerOptions.position = options.latlng;
	      } else {
	        gMarkerOptions.position = this.state.map.center;
	      }

	      // Set to an empty title/description object.
	      // Google maps has a limited amount of marker data we
	      gMarkerOptions.title = JSON.stringify({
	        title: options.title,
	        description: options.description,
	        media: options.media
	      });

	      marker = new google.maps.Marker(gMarkerOptions);

	      google.maps.event.addListener(marker, 'click', function (ev) {
	        return _this4.showInfoWindow(marker);
	      });

	      google.maps.event.addListener(marker, 'drag', function (ev) {});

	      return marker;
	    }

	    /**
	     * Show the info box for editing this marker
	     *
	     * @param google.maps.Marker marker
	     */

	  }, {
	    key: 'showInfoWindow',
	    value: function showInfoWindow(marker) {
	      var infoDOM = document.createElement('div');

	      React.render(React.createElement(_WalkInfoWindow2.default, {
	        marker: marker,
	        deleteMarker: this.deleteMarker.bind(this, marker),
	        refresh: this.syncState.bind(this)
	      }), infoDOM);

	      // Center the marker and display its info window
	      this.state.map.panTo(marker.getPosition());
	      this.state.infowindow.setContent(infoDOM);
	      this.state.infowindow.open(this.state.map, marker);
	    }
	  }, {
	    key: 'buildRoute',
	    value: function buildRoute(routeArray) {
	      var _this5 = this;

	      var poly = new google.maps.Polyline({
	        strokeColor: '#F16725',
	        strokeOpacity: 0.8,
	        strokeWeight: 3,
	        editable: true,
	        map: this.state.map
	      });

	      // Remove vertices when right-clicked
	      google.maps.event.addListener(poly, 'rightclick', function (ev) {
	        // Check if we clicked a vertex
	        if (ev.vertex !== undefined) {
	          poly.setPath(poly.getPath().removeAt(ev.vertex));
	        }
	      });

	      // Hide the infowindow if we click outside it
	      google.maps.event.addListener(poly, 'mousedown', function (ev) {
	        return _this5.state.infowindow.setMap(null);
	      });

	      if (routeArray.length > 0) {
	        poly.setPath(routeArray.map(function (point) {
	          return new google.maps.LatLng(point.lat, point.lng);
	        }));
	      }

	      return poly;
	    }

	    /**
	     * @param google.maps.Marker marker
	     */

	  }, {
	    key: 'deleteMarker',
	    value: function deleteMarker(marker) {
	      var markers = this.state.markers;

	      // Clear marker from map
	      marker.setMap(null);

	      // Remove reference in state
	      markers.removeAt(markers.indexOf(marker));

	      this.setState({ markers: markers });
	    }

	    /**
	     * Reorder the marker at index to a new position, pushing up those after
	     * @param int from
	     * @param int to
	     */

	  }, {
	    key: 'moveBefore',
	    value: function moveBefore(from, to) {
	      var markers = this.state.markers;
	      var fMarker = markers.getAt(from);
	      markers.removeAt(from);
	      markers.insertAt(to, fMarker);

	      this.setState({ markers: markers }, this.syncState);
	    }

	    // Button Actions

	  }, {
	    key: 'toggleAddPoint',
	    value: function toggleAddPoint() {
	      var _this6 = this;

	      var markers = this.state.markers;
	      var marker = this.buildMarker();
	      markers.push(marker);

	      this.setState({ markers: markers, mode: {} }, function () {
	        _this6.syncState();
	        _this6.showInfoWindow(marker);
	      });

	      this.state.infowindow.setMap(null);
	    }
	  }, {
	    key: 'toggleAddRoute',
	    value: function toggleAddRoute() {
	      var _this7 = this;

	      this.setState({
	        mode: {
	          addRoute: !this.state.mode.addRoute
	        }
	      });
	      (function () {
	        return _this7.state.infowindow.setMap(null);
	      });
	    }
	  }, {
	    key: 'clearRoute',
	    value: function clearRoute() {
	      this.state.infowindow.setMap(null);
	      this.state.route.setPath([]);
	      this.setState({ mode: {} });
	    }

	    // Build a version of state appropriate for persistence

	  }, {
	    key: 'getStateSimple',
	    value: function getStateSimple() {
	      var markers = this.state.markers.getArray().map(function (marker) {
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

	      if (this.state.route) {
	        route = this.state.route.getPath().getArray().map(function (point) {
	          return {
	            lat: point.lat(),
	            lng: point.lng()
	          };
	        });
	      }

	      return {
	        markers: markers,
	        route: route
	      };
	    }

	    // Sync what's on the gmap to what's stored in our state

	  }, {
	    key: 'syncState',
	    value: function syncState() {
	      this.props.valueLink.requestChange(this.getStateSimple());
	    }

	    // Manage the filters for loading data from external APIs

	  }, {
	    key: 'handleRemoveFilter',
	    value: function handleRemoveFilter(i) {
	      var filters = this.state.filters.slice();
	      filters.splice(i, 1);
	      this.setState({ filters: filters });
	    }

	    // Update the _text_ of a filter

	  }, {
	    key: 'handleChangeFilter',
	    value: function handleChangeFilter(i, val) {
	      var filters = this.state.filters.slice();
	      filters[i].value = val;
	      this.setState({ filters: filters });
	    }

	    // Push a new filter to our box, usually done by the buttons

	  }, {
	    key: 'handleAddFilter',
	    value: function handleAddFilter(filter) {
	      var filters = this.state.filters.slice();
	      filters.push(filter);
	      this.setState({ filters: filters });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var walkStops = undefined;

	      // Standard properties the filter buttons need
	      var filterProps = {
	        valueLink: this.props.valueLink,
	        refreshGMap: this.refreshGMap.bind(this),
	        boundMapByWalk: this.boundMapByWalk.bind(this),
	        addFilter: this.handleAddFilter.bind(this),
	        city: this.props.city
	      };

	      if (this.state.markers && this.state.markers.length) {
	        walkStops = [React.createElement(
	          'h3',
	          { key: 'stops' },
	          (0, _I18nStore.t)('Walk Stops')
	        ), React.createElement(_WalkStopTable2.default, {
	          ref: 'walkStopTable',
	          key: 1,
	          markers: this.state.markers,
	          deleteMarker: this.deleteMarker.bind(this),
	          moveBefore: this.moveBefore.bind(this),
	          showInfoWindow: this.showInfoWindow.bind(this)
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
	            (0, _I18nStore.t)('Share Your Route')
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert alert-info' },
	          (0, _I18nStore.t)('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.')
	        ),
	        React.createElement(
	          'div',
	          { id: 'map-control-bar' },
	          React.createElement(
	            'button',
	            {
	              ref: 'addPoint',
	              className: this.state.mode.addPoint ? 'active' : '',
	              onClick: this.toggleAddPoint.bind(this) },
	            React.createElement('i', { className: 'fa fa-map-marker' }),
	            (0, _I18nStore.t)('Add Stop')
	          ),
	          React.createElement(
	            'button',
	            {
	              ref: 'addRoute',
	              className: this.state.mode.addRoute ? 'active' : '',
	              onClick: this.toggleAddRoute.bind(this) },
	            React.createElement('i', { className: 'fa fa-arrows' }),
	            (0, _I18nStore.t)('Add Route')
	          ),
	          React.createElement(
	            'button',
	            { ref: 'clearroute', onClick: this.clearRoute.bind(this) },
	            React.createElement('i', { className: 'fa fa-eraser' }),
	            (0, _I18nStore.t)('Clear Route')
	          ),
	          React.createElement(_TwitterConnect2.default, filterProps),
	          React.createElement(_InstagramConnect2.default, filterProps),
	          React.createElement(_SoundCloudConnect2.default, filterProps)
	        ),
	        React.createElement(_ConnectFilters2.default, { filters: this.state.filters, changeFilter: this.handleChangeFilter.bind(this), remove: this.handleRemoveFilter.bind(this) }),
	        React.createElement('div', { className: 'map-notifications' }),
	        React.createElement('div', { id: 'map-canvas', ref: 'gmap' }),
	        walkStops,
	        React.createElement('hr', null)
	      );
	    }
	  }]);

	  return MapBuilder;
	})(React.Component);

	// Static properties

	exports.default = MapBuilder;
	Object.assign(MapBuilder, {
	  defaultProps: {
	    initialZoom: 15
	  }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Flux

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
	  var meetingPlace = undefined;
	  var imageThumb = undefined;
	  var upArrow = undefined,
	      downArrow = undefined;

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
/* 38 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The 'info window', aka the input box that pops up over markers in maps
	 */

	var WalkInfoWindow = (function (_React$Component) {
	  _inherits(WalkInfoWindow, _React$Component);

	  function WalkInfoWindow(props) {
	    _classCallCheck(this, WalkInfoWindow);

	    // Weird, but needed since it's rendering to a DOM node

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkInfoWindow).call(this));

	    _this.state = { marker: props.marker };

	    // Bind methods
	    _this.handleTitleChange = _this.handleTitleChange.bind(_this);
	    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);
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

	    // Simple method to set title property

	  }, {
	    key: 'handleTitleChange',
	    value: function handleTitleChange(ev) {
	      this.setMarkerContent({ title: ev.target.value });
	    }

	    // Simple method to set description property

	  }, {
	    key: 'handleDescriptionChange',
	    value: function handleDescriptionChange(ev) {
	      this.setMarkerContent({ description: ev.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var marker = this.state.marker;
	      if (marker) {
	        var markerContent = JSON.parse(marker.getTitle());
	        var media = undefined;

	        // Load rich media
	        if (markerContent.media) {
	          if (markerContent.media.type === 'instagram') {
	            media = React.createElement('img', { className: 'media', src: markerContent.media.url + 'media?size=t' });
	          } else if (markerContent.media.type === 'soundcloud') {
	            media = React.createElement('iframe', { className: 'media', width: '150', height: '100%', scrolling: 'no', frameborder: 'no', src: 'https://w.soundcloud.com/player/?url=' + markerContent.media.url + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true' });
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
	    }
	  }]);

	  return WalkInfoWindow;
	})(React.Component);

	exports.default = WalkInfoWindow;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InstagramConnect = (function (_React$Component) {
	  _inherits(InstagramConnect, _React$Component);

	  function InstagramConnect() {
	    _classCallCheck(this, InstagramConnect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstagramConnect).call(this));

	    _this.state = { accessToken: null };
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
	    key: 'handleLoadFeed',
	    value: function handleLoadFeed(query) {
	      var _this3 = this;

	      $.ajax({
	        type: 'GET',
	        crossDomain: true,
	        dataType: 'jsonp',
	        url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
	        success: function success(data) {
	          var markers = (_this3.props.valueLink.value || { markers: [] }).markers.slice();
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

	          _this3.props.valueLink.requestChange({
	            markers: markers.concat(walkMap),
	            route: _this3.props.valueLink.value.route
	          }, function () {
	            _this3.props.refreshGMap();
	            _this3.props.boundMapByWalk();
	          });
	        }
	      });
	    }
	  }, {
	    key: 'addFilter',
	    value: function addFilter() {
	      var _this4 = this;

	      var filterProps = {
	        type: 'text',
	        icon: 'fa fa-instagram',
	        placeholder: 'Type in the tag you used on the geocoded photos for your walk',
	        value: '',
	        cb: this.handleLoadFeed.bind(this)
	      };
	      if (this.state.accessToken) {
	        this.props.addFilter(filterProps);
	      } else {
	        // Connect, and add the box when done
	        this.handleConnect(function () {
	          return _this4.props.addFilter(filterProps);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      return React.createElement(
	        'button',
	        { onClick: function onClick() {
	            return _this5.addFilter();
	          } },
	        React.createElement('i', { className: 'fa fa-instagram' }),
	        'Instagram'
	      );
	    }
	  }]);

	  return InstagramConnect;
	})(React.Component);

	exports.default = InstagramConnect;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Get some sounds from SoundCloud!
	 */

	var SoundCloudConnect = (function (_React$Component) {
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
	          var idx = undefined;
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
	})(React.Component);

	exports.default = SoundCloudConnect;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Pull all the tweets
	 */

	var TwitterConnect = (function (_React$Component) {
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
	})(React.Component);

	exports.default = TwitterConnect;

/***/ },
/* 42 */
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
/* 43 */
/***/ function(module, exports) {

	'use strict';

	/*
	 * Helpers for building React pages with
	 *
	 * Try to only put things in here after exhausting all possible other options,
	 * and review this file periodically to see what can be removed as new features
	 * are added to React.
	 */

	// Render a JSX fragment into a <span> wrapper. Helpful when an API takes a Node
	// as the input, e.g. Google Maps
	exports.renderAsNode = function (reactElement) {
	  var returnEl = document.createElement('span');
	  React.render(returnEl, reactElement);
	  return returnEl;
	};

	// Not a generalized Object => Array, rather a convertor to change
	// {0: 'a', 1: 'b', 2: 'c'} into ['a','b','c']. Use only to convert
	// obsolete encodings of walks into proper arrays
	exports.objectToArray = function (obj) {
	  var destination = [];

	  // Assign numeric index in object as array index
	  for (var i in obj) {
	    destination[i] = obj[i];
	  }

	  // Needed to remove any empty elements, e.g. if input obj counts from 1 not 0
	  return destination.filter(function (n) {
	    return n !== undefined;
	  });
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Components
	var DatePicker = __webpack_require__(45);
	var TimePicker = __webpack_require__(46);
	var TimeSetTable = __webpack_require__(47);
	var TimeOpenTable = __webpack_require__(48);

	// Flux

	// Default to a 1-hour walk time
	var ONE_HOUR = 60 * 60 * 1000;

	// TODO: Make 'intiatives' build as separate selectors

	var DateSelect = (function (_React$Component) {
	  _inherits(DateSelect, _React$Component);

	  function DateSelect() {
	    _classCallCheck(this, DateSelect);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateSelect).call(this));

	    var today = new Date();
	    var start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 7, 11, 0));

	    // Bind class methods
	    _this.setDay = _this._setDay.bind(_this);
	    _this.addDate = _this._addDate.bind(_this);

	    // Note: we're only keeping the 'date' on there to use Date's string
	    // parsing. This method is concerned only with the Time
	    // TODO: Support proper time localization - ultimately these times are just
	    // strings, so we're using GMT, but that's bad practice.
	    _this.state = { start: start, duration: ONE_HOUR };
	    return _this;
	  }

	  _createClass(DateSelect, [{
	    key: '_setDay',
	    value: function _setDay(date) {
	      var startDate = this.state.start;

	      // Set the Day we're choosing
	      startDate.setUTCFullYear(date.getUTCFullYear());
	      startDate.setUTCMonth(date.getUTCMonth());
	      startDate.setUTCDate(date.getUTCDate());

	      // Refresh the timepicker
	      this.refs.timePicker.setStartTimes(startDate);

	      // Update our state
	      // FIXME: This is an overly-complex pattern, but done to avoid frequent
	      // date rebuilding, which is very slow. See if it can be done through
	      // state updates instead.
	      this.setState({ start: startDate });
	    }

	    /**
	     * Set the time
	     * @param Date time The current time of day
	     * @param Int duration Number of minutes the walk lasts
	     */

	  }, {
	    key: 'setTime',
	    value: function setTime(time, duration) {
	      var startDate = this.state.start;

	      startDate.setUTCHours(time.getUTCHours());
	      startDate.setUTCMinutes(time.getUTCMinutes());

	      this.setState({ start: startDate });
	    }

	    /**
	     * Build a valueLink object for updating the time
	     */

	  }, {
	    key: 'linkTime',
	    value: function linkTime() {
	      var _this2 = this;

	      return {
	        value: this.state.start.getTime(),
	        requestChange: function requestChange(value) {
	          return _this2.setState({ start: new Date(Number(value)) });
	        }
	      };
	    }

	    // Push the date we built here to the linked state

	  }, {
	    key: '_addDate',
	    value: function _addDate() {
	      var valueLink = this.props.valueLink;
	      var value = valueLink.value || {};
	      var slots = (value.slots || []).slice();
	      var start = this.state.start.getTime();
	      var end = start + this.state.duration;

	      // Store the timeslot state as seconds, not ms
	      slots.push([start / 1000, end / 1000]);

	      value.slots = slots;
	      valueLink.requestChange(value);
	    }
	  }, {
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
	                (0, _I18nStore.t)('Set the Time and Date')
	              )
	            ),
	            React.createElement(
	              'legend',
	              null,
	              (0, _I18nStore.t)('Pick one of the following:')
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
	                            (0, _I18nStore.t)('By Request')
	                          )
	                        ),
	                        React.createElement(
	                          'p',
	                          null,
	                          (0, _I18nStore.t)('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.')
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
	                            (0, _I18nStore.t)('Pick Your Date')
	                          )
	                        ),
	                        React.createElement(
	                          'p',
	                          null,
	                          (0, _I18nStore.t)('Set specific dates and times that this walk is happening.')
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
	                (0, _I18nStore.t)('Time and Date')
	              ),
	              React.createElement(
	                'p',
	                { className: 'lead' },
	                (0, _I18nStore.t)('Select the date and time your walk is happening.')
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(DatePicker, { setDay: this.setDay, defaultDate: this.state.start })
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
	                        (0, _I18nStore.t)('Date selected'),
	                        ':'
	                      ),
	                      this.state.start.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })
	                    ),
	                    React.createElement('hr', null),
	                    React.createElement(TimePicker, { ref: 'timePicker', i18n: this.props.i18n, valueLinkDuration: this.linkState('duration'), valueLinkStart: this.linkTime() }),
	                    React.createElement('hr', null),
	                    React.createElement(
	                      'button',
	                      { className: 'btn btn-primary', id: 'save-date-set', onClick: this.addDate },
	                      (0, _I18nStore.t)('Add Date')
	                    )
	                  )
	                )
	              )
	            ),
	            React.createElement('br', null),
	            React.createElement(TimeSetTable, { i18n: this.props.i18n, valueLink: valueLink }),
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
	                (0, _I18nStore.t)('Time and Date')
	              ),
	              React.createElement(
	                'p',
	                { className: 'lead' },
	                (0, _I18nStore.t)('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.')
	              )
	            ),
	            React.createElement(
	              'label',
	              { className: 'checkbox' },
	              React.createElement('input', { type: 'checkbox', name: 'open' }),
	              (0, _I18nStore.t)('Leave my availability open. Allow people to contact you to set up a walk.')
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
	                        (0, _I18nStore.t)('Date selected'),
	                        ':'
	                      ),
	                      React.createElement('h4', { className: 'date-indicate-all' }),
	                      React.createElement('hr', null)
	                    ),
	                    React.createElement(
	                      'label',
	                      { htmlFor: 'walk-duration' },
	                      (0, _I18nStore.t)('Approximate Duration of Walk'),
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
	                        (0, _I18nStore.t)('Add Date')
	                      )
	                    )
	                  )
	                )
	              )
	            ),
	            React.createElement('br', null),
	            React.createElement(TimeOpenTable, null),
	            React.createElement('hr', null)
	          )
	        )
	      );
	    }
	  }]);

	  return DateSelect;
	})(React.Component);

	// Load mixins

	exports.default = DateSelect;
	Object.assign(DateSelect.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Basic wrapper around jQuery.datepicker(), so it can be loaded
	 * as a React class
	 */

	var DatePicker = (function (_React$Component) {
	  _inherits(DatePicker, _React$Component);

	  function DatePicker() {
	    _classCallCheck(this, DatePicker);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).apply(this, arguments));
	  }

	  _createClass(DatePicker, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      // Setup sorting on the walk-stops list
	      $(React.findDOMNode(this)).datepicker({
	        defaultDate: this.props.defaultDate,
	        onSelect: (function (dateText) {
	          // Silly, but needed for inconsistent date formats across libs
	          var dateMDY = dateText.split('/');
	          this.props.setDay(new Date(Date.UTC(dateMDY[2], dateMDY[0] - 1, dateMDY[1])));
	        }).bind(this)
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement("div", { className: "date-picker" });
	    }
	  }]);

	  return DatePicker;
	})(React.Component);

	exports.default = DatePicker;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	/**
	 * Select options to choose your time.
	 * This is an important one, considering how complex timezones and localizing
	 * date formats can be when you're an international organization.
	 */

	var TimePicker = (function (_React$Component) {
	  _inherits(TimePicker, _React$Component);

	  function TimePicker() {
	    _classCallCheck(this, TimePicker);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this));

	    _this.state = { startTimes: [] };
	    return _this;
	  }

	  // Date management is slow, so avoid rebuilding unless needed

	  _createClass(TimePicker, [{
	    key: 'setStartTimes',
	    value: function setStartTimes(start, step) {
	      if (this.state.start !== start) {
	        // It's fastest to build our date formatter once upfront
	        var dtfTime = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
	        // All start times begin on the date's 0:00, and by default step every 30 min
	        var yrMoDay = [start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()];
	        var firstTime = Date.UTC.apply(this, yrMoDay);
	        var lastTime = Date.UTC.apply(this, yrMoDay.concat([23, 30]));
	        var startTimes = [];
	        step = step || 1800000;

	        for (var i = 0, time = firstTime; time <= lastTime; time += step) {
	          startTimes.push({
	            asMs: time,
	            asString: dtfTime.format(time)
	          });
	        }

	        this.setState({
	          start: start,
	          startTimes: startTimes
	        });
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setStartTimes(new Date(this.props.valueLinkStart.value));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // Count walk times in 30 min increments
	      var linkDuration = this.props.valueLinkDuration;
	      var requestChange = linkDuration.requestChange;
	      var linkStart = this.props.valueLinkStart;

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
	})(React.Component);

	exports.default = TimePicker;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	/**
	 * The table with all the times that the walks are scheduled
	 */

	var TimeSetTable = (function (_React$Component) {
	  _inherits(TimeSetTable, _React$Component);

	  function TimeSetTable() {
	    _classCallCheck(this, TimeSetTable);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeSetTable).apply(this, arguments));
	  }

	  _createClass(TimeSetTable, [{
	    key: 'removeSlot',

	    // Remove a scheduled time
	    value: function removeSlot(i) {
	      var valueLink = this.props.valueLink;
	      var value = valueLink.value;
	      var slots = (value.slots || []).slice();

	      slots.splice(i, 1);
	      value.slots = slots;

	      valueLink.requestChange(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var slots = this.props.valueLink.value.slots || [];

	      var dtfDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
	      var dtfDuration = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });

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
	              { key: i },
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
	                  { onClick: _this2.removeSlot.bind(_this2, i) },
	                  React.createElement('i', { className: 'fa fa-times-circle-o' }),
	                  ' ',
	                  (0, _I18nStore.t)('Remove')
	                )
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return TimeSetTable;
	})(React.Component);

	exports.default = TimeSetTable;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The table showing open-schedule walks and their times
	 */

	// TODO: Once 'open' walk schedules are implemented on festivals

	var TimeOpenTable = (function (_React$Component) {
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
	})(React.Component);

	exports.default = TimeOpenTable;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mixins = __webpack_require__(35);

	// Flux

	var WardSelect = (function (_React$Component) {
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
	            (0, _I18nStore.t)('Sub-locality')
	          ),
	          React.createElement(
	            'div',
	            { className: 'item' },
	            React.createElement(
	              'div',
	              { className: 'alert alert-info' },
	              (0, _I18nStore.t)('Choose a specific neighbourhood or area where your walk will take place.')
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
	      } else {
	        return React.createElement('fieldset', { id: 'wards' });
	      }
	    }
	  }]);

	  return WardSelect;
	})(React.Component);

	exports.default = WardSelect;

	Object.assign(WardSelect.prototype, mixins.linkedParentState);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixins = __webpack_require__(35);

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Menu to select accessibility requirements
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	// Flux

	var options = [{ id: 'accessible-familyfriendly', name: (0, _I18nStore.t)('Family friendly') }, { id: 'accessible-wheelchair', name: (0, _I18nStore.t)('Wheelchair accessible') }, { id: 'accessible-dogs', name: (0, _I18nStore.t)('Dogs welcome') }, { id: 'accessible-strollers', name: (0, _I18nStore.t)('Strollers welcome') }, { id: 'accessible-bicycles', name: (0, _I18nStore.t)('Bicycles welcome') }, { id: 'accessible-steephills', name: (0, _I18nStore.t)('Steep hills') }, { id: 'accessible-uneven', name: (0, _I18nStore.t)('Wear sensible shoes (uneven terrain)') }, { id: 'accessible-busy', name: (0, _I18nStore.t)('Busy sidewalks') }, { id: 'accessible-bicyclesonly', name: (0, _I18nStore.t)('Bicycles only') }, { id: 'accessible-lowlight', name: (0, _I18nStore.t)('Low light or nighttime') }, { id: 'accessible-seniors', name: (0, _I18nStore.t)('Senior Friendly') }];

	var AccessibleSelect = (function (_React$Component) {
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
	          (0, _I18nStore.t)('How accessible is this walk?')
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
	})(React.Component);

	exports.default = AccessibleSelect;

	Object.assign(AccessibleSelect.prototype, _mixins.linkedParentState);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Flux

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	// Update a field for a team member
	function linkMember(field, _ref) {
	  var value = _ref.value;
	  var _onChange = _ref.onChange;
	  var index = _ref.index;

	  return {
	    value: value[field],
	    onChange: function onChange(e) {
	      return _onChange(field, e.target.value, index);
	    }
	  };
	}

	/* Data models
	 * TODO: move to flux stores
	 */
	var memberTypes = {
	  'leader': { "name-first": '', "name-last": '', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: '' },
	  'organizer': { "name-first": '', "name-last": '', institution: '', website: '' },
	  'community': { "name-first": '', "name-last": '', bio: '', twitter: '', facebook: '', website: '' },
	  'volunteer': { "name-first": '', "name-last": '', role: '', website: '' }
	};

	/**
	 * Not a React component, since we use this to build an array of users
	 * @return array
	 */
	function teamMemberList(_ref2) {
	  var values = _ref2.values;
	  var _onChange2 = _ref2.onChange;

	  return values.map(function (user, i) {
	    var teamMember = undefined;

	    // Use empty strings for unset/false
	    user.phone = user.phone || '';

	    // TODO: make linking function
	    var thisUser = {
	      key: i,
	      index: i,
	      value: user,
	      onChange: function onChange() {
	        return _onChange2;
	      },
	      onDelete: function onDelete() {
	        return deleteMember(i, _onChange2);
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

	exports.default = function (_ref3) {
	  var team = _ref3.team;
	  var onChange = _ref3.onChange;
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
	};

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	var WalkPublish = (function (_React$Component) {
	  _inherits(WalkPublish, _React$Component);

	  function WalkPublish(props) {
	    _classCallCheck(this, WalkPublish);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkPublish).call(this, props));

	    _this.state = {
	      eventbrite: !!(props.mirrors && props.mirrors.eventbrite)
	    };
	    return _this;
	  }

	  _createClass(WalkPublish, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      // Bootstrap Modal
	      $(React.findDOMNode(this)).modal();

	      // Close the modal when modal closes
	      $(React.findDOMNode(this)).bind('hidden.bs.modal', function () {
	        return _this2.props.close();
	      });
	    }
	  }, {
	    key: 'handlePublish',
	    value: function handlePublish() {
	      var _this3 = this;

	      // This function's meant for callbacks, so it grabs the URL from the caller's state
	      this.props.saveWalk({ publish: true }, function () {
	        return window.location = _this3.props.url;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      // Check city config for which walk mirroring services to expose
	      var mirrorWalk = undefined;
	      if (this.props.city.mirrors.indexOf('eventbrite') > -1) {
	        mirrorWalk = React.createElement(
	          'label',
	          { className: 'checkbox' },
	          React.createElement('input', { type: 'checkbox', checkedLink: this.linkState('eventbrite') }),
	          (0, _I18nStore.t)('Publish walk to EventBrite')
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
	                (0, _I18nStore.t)('Okay, You\'re Ready to Publish')
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'modal-body' },
	              React.createElement(
	                'p',
	                null,
	                (0, _I18nStore.t)('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.')
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
	                  { className: 'walkthrough close', 'data-dismiss': 'modal', onClick: this.props.close.bind(this) },
	                  ' ',
	                  (0, _I18nStore.t)('Bring me back to edit')
	                )
	              ),
	              React.createElement(
	                'a',
	                null,
	                React.createElement(
	                  'button',
	                  { className: 'btn btn-primary walkthrough', 'data-step': 'publish-confirmation', onClick: function onClick() {
	                      return _this4.handlePublish();
	                    } },
	                  (0, _I18nStore.t)('Publish')
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return WalkPublish;
	})(React.Component);

	exports.default = WalkPublish;

	Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(14);

	var _WalkHeader = __webpack_require__(56);

	var _WalkHeader2 = _interopRequireDefault(_WalkHeader);

	var _WalkDescription = __webpack_require__(57);

	var _WalkDescription2 = _interopRequireDefault(_WalkDescription);

	var _WalkRoute = __webpack_require__(58);

	var _WalkRoute2 = _interopRequireDefault(_WalkRoute);

	var _WalkAccessibility = __webpack_require__(59);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(61);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(62);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _WalkStart = __webpack_require__(63);

	var _WalkStart2 = _interopRequireDefault(_WalkStart);

	var _WalkTeam = __webpack_require__(64);

	var _WalkTeam2 = _interopRequireDefault(_WalkTeam);

	var _WalkMenu = __webpack_require__(65);

	var _WalkMenu2 = _interopRequireDefault(_WalkMenu);

	var _WalkMap = __webpack_require__(67);

	var _WalkMap2 = _interopRequireDefault(_WalkMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getWalk = function getWalk(_ref) {
	  var walk = _ref.walk;
	  var page = _ref.page;
	  var city = _ref.city;

	  var itinerary = _ItineraryStore2.default.getItineraryList();
	  var favourites = _ItineraryStore2.default.getFavouriteList();
	  return { walk: walk, page: page, city: city, itinerary: itinerary, favourites: favourites };
	};

	var WalkPage = (function (_React$Component) {
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
	      var itinerary = _state.itinerary;
	      var favourites = _state.favourites;

	      var hasMarkers = false,
	          hasRoute = false;
	      if (walk && walk['map']) {
	        hasMarkers = walk['map']['markers'].length > 0;
	        hasRoute = walk['map']['route'].length > 0;
	      }

	      return React.createElement(
	        'section',
	        { className: 'walkPage' },
	        React.createElement(_WalkHeader2.default, {
	          walk: walk,
	          city: city,
	          itinerary: itinerary,
	          favourites: favourites,
	          onAdd: function onAdd(list, time) {
	            return (0, _ItineraryActions.add)(list, walk, time);
	          },
	          onRemove: function onRemove(list, time) {
	            return (0, _ItineraryActions.remove)(list, walk, time);
	          }
	        }),
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
	})(React.Component);

	exports.default = WalkPage;
	;

	WalkPage.propsType = {
	  page: React.PropTypes.object.isRequired,
	  walk: React.PropTypes.object.isRequired
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AddToItinerary = __webpack_require__(25);

	var _AddToItinerary2 = _interopRequireDefault(_AddToItinerary);

	var _WalkStore = __webpack_require__(20);

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
	  var bg = undefined;
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
	  var favourites = _ref.favourites;
	  var itinerary = _ref.itinerary;
	  var onAdd = _ref.onAdd;
	  var onRemove = _ref.onRemove;
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

	  var favButton = undefined;

	  if (favourites && favourites.walks.has(walk)) {
	    favButton = React.createElement('button', { className: 'removeFavourite', onClick: function onClick() {
	        return onRemove(favourites);
	      } });
	  } else {
	    favButton = React.createElement('button', { className: 'addFavourite', onClick: function onClick() {
	        return onAdd(favourites);
	      } });
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
	      'meetingPlace'
	    ) : null,
	    React.createElement(
	      'h4',
	      null,
	      walkLeader ? 'Led By ' + walkLeader['name-first'] + ' ' + walkLeader['name-last'] + ' - ' : null
	    ),
	    React.createElement(_AddToItinerary2.default, {
	      itinerary: itinerary,
	      time: time,
	      walk: walk,
	      onAdd: onAdd,
	      onRemove: onRemove })
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
/* 57 */
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
/* 58 */
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Accessible = __webpack_require__(60);

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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(19);

	var _WalkAccessibility = __webpack_require__(59);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(61);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(62);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _Theme = __webpack_require__(66);

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
	  var leaderHead = undefined,
	      nextDateHead = undefined,
	      meetingPlaceHead = undefined;
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
/* 66 */
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
/* 67 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	var WalkMap = (function (_React$Component) {
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
	})(React.Component);

	exports.default = WalkMap;

	WalkMap.PropTypes = {
	  map: React.PropTypes.object.isRequired
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DashboardHeader = __webpack_require__(69);

	var _DashboardHeader2 = _interopRequireDefault(_DashboardHeader);

	var _DashboardMenu = __webpack_require__(70);

	var _DashboardMenu2 = _interopRequireDefault(_DashboardMenu);

	var _DashboardSummary = __webpack_require__(71);

	var _DashboardSummary2 = _interopRequireDefault(_DashboardSummary);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _CityStore = __webpack_require__(80);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	var _ItineraryStore = __webpack_require__(17);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(20);

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

	var Dashboard = (function (_React$Component) {
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
	        React.createElement(_DashboardMenu2.default, {
	          walks: walks,
	          users: users,
	          city: city
	        }),
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
	})(React.Component);

	exports.default = Dashboard;

/***/ },
/* 69 */
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DashboardSummary = __webpack_require__(71);

	var _DashboardSummary2 = _interopRequireDefault(_DashboardSummary);

	var _DashboardResources = __webpack_require__(72);

	var _DashboardResources2 = _interopRequireDefault(_DashboardResources);

	var _MyBlogPosts = __webpack_require__(73);

	var _MyBlogPosts2 = _interopRequireDefault(_MyBlogPosts);

	var _Walks = __webpack_require__(74);

	var _Walks2 = _interopRequireDefault(_Walks);

	var _WalkLeaders = __webpack_require__(78);

	var _WalkLeaders2 = _interopRequireDefault(_WalkLeaders);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: ImpactReport is not set-up
	// import ImpactReport from './ImpactReport.jsx';

	var DashboardMenu = (function (_React$Component) {
	  _inherits(DashboardMenu, _React$Component);

	  function DashboardMenu(props) {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, DashboardMenu);

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    // Since the menu is toggleable/arrangeable, manage as array of [component, name, open?] tuples

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DashboardMenu)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

	    _this.state = {
	      menuItems: [
	      // [DashboardResources, 'Dashboard Resources', true],
	      //        [MyBlogPosts, 'My Blog Posts', false],
	      [_Walks2.default, 'Walks', false]]
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

	      var menu = menuItems.map(function (_ref, i) {
	        var _ref2 = _slicedToArray(_ref, 3);

	        var Component = _ref2[0];
	        var name = _ref2[1];
	        var open = _ref2[2];
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
	          React.createElement(Component, { walks: walks, city: city })
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
	})(React.Component);

	exports.default = DashboardMenu;
	;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

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
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WalkFilters = __webpack_require__(75);

	var _WalkFilters2 = _interopRequireDefault(_WalkFilters);

	var _WalksMap = __webpack_require__(76);

	var _WalksMap2 = _interopRequireDefault(_WalksMap);

	var _Walk = __webpack_require__(77);

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

	var Walks = (function (_React$Component) {
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

	      // How we're presenting the walks (map or list)

	      var Walks = [];
	      if (currentView === 'list') {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = walks.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _step.value;
	            var map = _step$value.map;
	            var id = _step$value.id;
	            var title = _step$value.title;
	            var time = _step$value.time;
	            var team = _step$value.team;
	            var url = _step$value.url;

	            var props = { title: title, id: id, key: id, team: team, url: url };
	            if (map && map.markers.length) {
	              props.meeting = map.markers[0].title;
	            }
	            if (time && time.slots.length) {
	              props.start = time.slots[0][0];
	            }
	            Walks.push(React.createElement(_Walk2.default, props));
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
	      } else if (currentView === 'map') {
	        Walks = React.createElement(_WalksMap2.default, { walks: walks, city: city });
	      }

	      // The toggle for the past walks
	      var DateToggle = undefined;
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
	})(React.Component);

	exports.default = Walks;

/***/ },
/* 75 */
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

	  var ActiveFilters = undefined;

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
/* 76 */
/***/ function(module, exports) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	var WalksMap = (function (_React$Component) {
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
	  //You cannot use this.setState() in componentWillUpdate

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
	})(React.Component);

	exports.default = WalksMap;

	WalksMap.PropTypes = {
	  walks: React.PropTypes.array.isRequired
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(19);

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
	          title
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
	        meeting
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WalkLeader = __webpack_require__(79);

	var _WalkLeader2 = _interopRequireDefault(_WalkLeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WalkLeaders = (function (_React$Component) {
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
	})(React.Component);

	exports.default = WalkLeaders;
	exports.default = WalkLeaders;

/***/ },
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(18);

	var _JWConstants = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	// Store singletons
	/**
	 * City store
	 *
	 * Single-city storage. May be refactored for multiple cities later, but
	 * currently no requirement exists for this.
	 */

	var _city = undefined;

	// Receive a single walk
	function receiveCity(city) {
	  _city = city;
	}

	var CityStore = Object.assign({}, _events.EventEmitter.prototype, {
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getCity: function getCity() {
	    return _city;
	  },

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register)(function (payload) {
	    // Go through the various actions
	    switch (payload.type) {
	      // Route actions
	      case _JWConstants.ActionTypes.CITY_RECEIVE:
	        receiveCity(payload.city);
	        break;
	    }
	    CityStore.emitChange();
	  })
	});

	exports.default = CityStore;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	var Login = (function (_React$Component) {
	  _inherits(Login, _React$Component);

	  function Login() {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this));

	    _this.state = {
	      email: '',
	      password: '',
	      maintainLogin: false,
	      message: {}
	    };
	    _this.handleReset = _this.handleReset.bind(_this);
	    _this.handleChangeEmail = _this.handleChangeEmail.bind(_this);
	    _this.handleChangePassword = _this.handleChangePassword.bind(_this);
	    _this.handleChangeMaintainLogin = _this.handleChangeMaintainLogin.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'handleReset',
	    value: function handleReset(ev) {
	      var _this2 = this;

	      // Post a reset request to the c5 endpoint for resets
	      $.ajax({
	        type: 'POST',
	        url: CCM_REL + '/login/forgot_password',
	        data: {
	          uEmail: this.state.email,
	          uName: this.state.email,
	          format: 'JSON'
	        },
	        dataType: 'json',
	        success: function success(data) {
	          return _this2.setState({ message: data });
	        }
	      });
	    }
	  }, {
	    key: 'handleChangeEmail',
	    value: function handleChangeEmail(ev) {
	      this.setState({ email: ev.target.value });
	    }
	  }, {
	    key: 'handleChangePassword',
	    value: function handleChangePassword(ev) {
	      this.setState({ password: ev.target.value });
	    }
	  }, {
	    key: 'handleChangeMaintainLogin',
	    value: function handleChangeMaintainLogin(ev) {
	      this.setState({ maintainLogin: ev.target.value });
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(ev) {
	      var _this3 = this;

	      ev.preventDefault();
	      // Post the login to the c5 endpoint for logins
	      $.ajax({
	        type: 'POST',
	        url: CCM_REL + '/login/do_login',
	        data: {
	          uEmail: this.state.email,
	          uName: this.state.email,
	          uPassword: this.state.password,
	          uMaintainLogin: this.state.maintainLogin,
	          format: 'JSON'
	        },
	        dataType: 'json',
	        success: function success(data) {
	          _this3.setState({ message: data }, function () {
	            if (data.success === 1) {
	              if (_this3.props.redirectURL) {
	                window.location.replace(_this3.props.redirectURL);
	              } else {
	                window.location.reload();
	              }
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var socialLogin = this.props.socialLogin;
	      var _state = this.state;
	      var email = _state.email;
	      var password = _state.password;

	      var message = undefined;
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
	})(React.Component);

	exports.default = Login;

/***/ }
/******/ ]);