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

	var I18nUtils = _interopRequireWildcard(_I18nUtils);

	var _AreaActions = __webpack_require__(10);

	var AreaActions = _interopRequireWildcard(_AreaActions);

	var _UserActions = __webpack_require__(11);

	var UserActions = _interopRequireWildcard(_UserActions);

	var _WalkActions = __webpack_require__(12);

	var WalkActions = _interopRequireWildcard(_WalkActions);

	var _ItineraryActions = __webpack_require__(13);

	var ItineraryActions = _interopRequireWildcard(_ItineraryActions);

	var _Navbar = __webpack_require__(14);

	var _Navbar2 = _interopRequireDefault(_Navbar);

	var _Itinerary = __webpack_require__(28);

	var ItineraryAPI = _interopRequireWildcard(_Itinerary);

	var _Page = __webpack_require__(31);

	var _Page2 = _interopRequireDefault(_Page);

	var _City = __webpack_require__(33);

	var _City2 = _interopRequireDefault(_City);

	var _Home = __webpack_require__(34);

	var _Home2 = _interopRequireDefault(_Home);

	var _ItineraryStaticData = __webpack_require__(19);

	var _CreateWalk = __webpack_require__(252);

	var _CreateWalk2 = _interopRequireDefault(_CreateWalk);

	var _Walk = __webpack_require__(274);

	var _Walk2 = _interopRequireDefault(_Walk);

	var _Login = __webpack_require__(287);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// Page Views

	var PageViews = {
	  PageView: _Page2.default,
	  CityPageView: _City2.default,
	  HomePageView: _Home2.default
	};

	// React Views

	// import Dashboard from './components/pages/Dashboard.jsx';

	// FIXME XXX: remove stubbed out static data
	/**
	 * Initialization code goes here. This is not to be a dumping ground for
	 * miscellaneous functions, and especially not a place to stick new global
	 * variables.
	 */
	// Translations for i18n L10n

	var ReactViews = {
	  CreateWalkView: _CreateWalk2.default
	};
	// load modals

	// Shims
	// Used for Intl.DateTimeFormat
	if (!window.Intl) {
	  window.Intl = __webpack_require__(288);
	}

	/**
	 * Let hitting 'm' make the menu pop up
	 */
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

	/**
	 * Route the JSX view, for either an old v1 page, or a React component
	 */
	function routePage() {
	  var pageViewName = document.body.getAttribute('data-pageViewName') || 'PageView';
	  var ReactView = ReactViews[pageViewName];

	  // Render our header first
	  var navbar = document.getElementById('navbar');
	  if (navbar) {
	    React.render(React.createElement(_Navbar2.default, null), navbar);
	  }

	  try {
	    // Render modals we need on each page
	    var loginEl = React.createElement(_Login2.default, { socialLogin: (JanesWalk.stacks || { "Social Logins": "" })['Social Logins'] });

	    // FIXME: once site's all-react, move this out of the JanesWalk object. Don't follow this approach
	    // or we'll end up with massive spaghetti.
	    window.JanesWalk.react = { login: loginEl };

	    React.render(loginEl, document.getElementById('modals'));

	    // Load our translations upfront
	    I18nUtils.getTranslations(JanesWalk.locale);

	    // Hybrid-routing. First check if there's a React view (which will render
	    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
	    if (ReactView) {
	      switch (pageViewName) {
	        case 'CreateWalkView':
	          React.render(React.createElement(ReactView, {
	            data: JanesWalk.walk.data,
	            city: JanesWalk.city,
	            user: JanesWalk.user,
	            url: JanesWalk.walk.url,
	            valt: JanesWalk.form.valt
	          }), document.getElementById('createwalk'));
	          break;
	        default:
	          // TODO: use JanesWalk.event to supply these data, not a global obj
	          React.render(React.createElement(ReactView, JanesWalk), document.getElementById('page'));
	          break;
	      }
	    } else {
	      // FIXME: I'm not in-love with such a heavy jQuery reliance
	      // new PageViews[pageViewName]($(document.body));
	    }
	  } catch (e) {
	    console.error('Error instantiating page view ' + pageViewName + ': ' + e.stack);
	  }
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
	  /*  JanesWalk.event.on('profilepage.load', props => {
	    React.render(
	      <Dashboard {...props} />,
	      document.getElementById('page')
	    );
	    }); */
	}

	document.addEventListener('DOMContentLoaded', function () {
	  addFluxListeners();
	  addRenderListeners();

	  // TODO: emit the city without needing to load JanesWalk with static data
	  JanesWalk.event.emit('city.receive', JanesWalk.city);

	  // TODO: this could use a better home
	  ItineraryAPI.startPolling();

	  // Process all deferred events
	  JanesWalk.event.activate();

	  routePage();
	  initKeyEvents();
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

	// Areas
	'AREA_RECEIVE',

	// Users
	'USER_RECEIVE', 'USER_RECEIVE_ALL',

	// Itineraries
	'ITINERARY_RECEIVE', 'ITINERARY_REMOVE_WALK', 'ITINERARY_ADD_WALK', 'ITINERARY_UPDATE_TITLE', 'ITINERARY_UPDATE_DESCRIPTION', 'ITINERARY_CREATE_LIST', 'ITINERARY_RECEIVE_ALL', 'ITINERARY_SYNC_START', 'ITINERARY_SYNC_END',

	// Dashboard
	'FILTER_WALKS', 'TOGGLE_WALK_FILTER', 'REMOVE_WALK_FILTER', 'FILTER_WALKS_BY_DATE', 'FILTER_LEADERS_BY_DATE', 'SORT_LEADERS', 'TOGGLE_MENU'].reduce(function (p, k) {
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
	 * i18n Translations
	 *
	 * Translate text content into our available translations using
	 * the i18n standard.
	 */

	function receive(user, _ref) {
	  var current = _ref.current;
	  var profile = _ref.profile;

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

	function remove(list, walk) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK, list: list, walk: walk });
	}

	function add(list, walk) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.ITINERARY_ADD_WALK, list: list, walk: walk });
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Itinerary = __webpack_require__(15);

	var _Itinerary2 = _interopRequireDefault(_Itinerary);

	var _AreaStore = __webpack_require__(29);

	var _AreaStore2 = _interopRequireDefault(_AreaStore);

	var _UserStore = __webpack_require__(30);

	var _UserStore2 = _interopRequireDefault(_UserStore);

	var _ItineraryStore = __webpack_require__(16);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

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
	    null,
	    React.createElement(
	      'a',
	      { onClick: toggleSearch, className: searching ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-search' })
	    )
	  ), React.createElement(
	    'li',
	    { className: unseenUpdates ? 'notify' : '' },
	    React.createElement(
	      'a',
	      { onClick: toggleProfile, className: profiling ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-calendar' })
	    )
	  ), React.createElement(
	    'li',
	    null,
	    React.createElement(
	      'a',
	      { href: '/profile' },
	      user.firstName || user.name
	    )
	  ), React.createElement(
	    'li',
	    null,
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
	    null,
	    React.createElement(
	      'a',
	      { onClick: toggleSearch, className: searching ? 'selected' : '' },
	      React.createElement('i', { className: 'fa fa-search' })
	    )
	  ), React.createElement(
	    'li',
	    null,
	    React.createElement(
	      'a',
	      { href: '/register' },
	      tc('Register on a website', 'Join')
	    )
	  ), React.createElement(
	    'li',
	    null,
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
	      makeSticky(React.findDOMNode(this), this.refs.header);
	    }

	    /**
	     * Need to check if the HTML has updated, so we don't rebuild the DOM
	     */

	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, _ref3) {
	      var options = _ref3.options;
	      var dropdown = _ref3.dropdown;

	      if (options !== this.state.options) {
	        appendSiblings(options, this.refs.topnav);
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
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(_, _ref4) {
	      var searching = _ref4.searching;

	      // See if we're opening the search
	      if (!this.state.searching && searching) {
	        this.openSearch();
	      }
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
	}(React.Component);

	exports.default = Navbar;

	Navbar.defaultProps = {
	  editMode: CCM_EDIT_MODE
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryStore = __webpack_require__(16);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _WalkStore = __webpack_require__(18);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	var _ItineraryActions = __webpack_require__(13);

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
	    lists: _ItineraryStore2.default.getLists()
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

	      // Lookup the walk data from the walk's ID

	      var ItineraryWalks = [];
	      activeList.walks.forEach(function (walk) {
	        ItineraryWalks.push(React.createElement(_Walk2.default, {
	          key: walk.id,
	          list: activeList,
	          lists: lists,
	          walk: walk,
	          onAdd: function onAdd(list) {
	            return (0, _ItineraryActions.add)(list, walk);
	          },
	          onRemove: function onRemove(list) {
	            return (0, _ItineraryActions.remove)(list, walk);
	          }
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
	}(React.Component);

	exports.default = Itinerary;

	Itinerary.defaultProps = {
	  itinerary: null
	};

	Itinerary.propTypes = {
	  itinerary: React.PropTypes.array.isRequired
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(17);

	var _JWConstants = __webpack_require__(9);

	var _WalkStore = __webpack_require__(18);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CHANGE_EVENT = 'change';

	var _lists = new Set();

	// Has this store been synced, and is it syncing?
	var _lastChange = Date.now();

	//TODO: Currently no remove list, just adding lists

	var _removeWalk = function _removeWalk(list, walk) {
	  return list.walks.delete(walk);
	};

	var _addWalk = function _addWalk(list, walk) {
	  return list.walks.add(walk);
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
	  itineraries.forEach(function (itinerary) {
	    return _lists.add(Object.assign({}, itinerary, {
	      walks: new Set(itinerary.walks.map(function (w) {
	        return _WalkStore2.default.getWalk(+w);
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

	var ItineraryStore = Object.assign(_events.EventEmitter.prototype, {
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

	    switch (payload.type) {
	      case _JWConstants.ActionTypes.ITINERARY_REMOVE_WALK:
	        _lastChange = Date.now();
	        _removeWalk(list, walk);
	        break;
	      case _JWConstants.ActionTypes.ITINERARY_ADD_WALK:
	        _lastChange = Date.now();
	        //TODO: Dialog to open on first add to Itinerary/Favourites
	        _addWalk(list, walk);
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppDispatcher = __webpack_require__(4);

	var _events = __webpack_require__(17);

	var _JWConstants = __webpack_require__(9);

	var defaultWalk = __webpack_require__(20); /**
	                                                             * Walk store
	                                                             *
	                                                             * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
	                                                             * description, and people involved with a walk.
	                                                             */

	var CHANGE_EVENT = 'change';

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

	var WalkStore = Object.assign(_events.EventEmitter.prototype, {
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
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var walks = [{ "id": "2411", "title": "ROMwalks - About the ROM", "url": "http://janeswalk.org/canada/toronto/around-rom-100-years/", "shortDescription": "Experience a ROMwalk around the ROM. Explore the area through architecture, anecdotes and archival photographs.", "longDescription": "Experience a ROMwalk around the ROM. Explore the area through architecture, anecdotes and archival photographs. <br /><br />\nThe May 13th and July 5th walks will also be given in French.", "accessibleInfo": null, "accessibleTransit": "St. George subway station, Bedford Road exit, or Museum subway station", "accessibleParking": null, "accessibleFind": "Look for the Purple umbrella at the meeting point.", "map": { "markers": [{ "lat": 43.6683139552, "lng": -79.395058155082, "title": "The ROM on Bloor Street - meeting point", "description": "The front entrance of the ROM on Bloor Street - look for the purple umbrella.", "media": null, "style": "stop" }, { "lat": 43.66850795613, "lng": -79.394350051902, "title": "Bloor & Queens Park - end of walk", "description": "", "media": null, "style": "stop" }], "route": [] }, "team": [{ "user_id": "147", "type": "you", "name-first": "", "name-last": "", "role": "walk-leader", "primary": "on", "bio": "The walk is led by several trained and qualified ROMwalks guides who belong to the ROM\'s Department of Museum volunteers. ROMwalks have been giving guided walking tours of Toronto\'s historic and architectural neighbourhoods for over 30 years. <br /><br />\nFurther information can be viewed at www.rom.on.ca/romwalks or follow the conversation at #ROMwalks and @ROMtoronto", "twitter": "", "facebook": "", "website": "", "email": "", "phone": "416-694-6436" }], "time": { "open": false, "type": "set", "slots": [["1431540000", "1431545400"], ["1436104800", "1436110200"], ["1439733600", "1439739000"], ["1443362400", "1443367800"]] }, "wards": "Ward 20 Trinity-Spadina", "initiatives": [{ "id": "127", "name": "Open Streets TO" }], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "453", "url": "/files/cache/9b34ecb08eca3d810d2e4f98f33fc937_f453.jpg" }], "thumbnailId": "453", "thumbnailUrl": "/files/cache/9b34ecb08eca3d810d2e4f98f33fc937_f453.jpg", "checkboxes": { "theme-urban-architecturalenthusiast": true, "theme-culture-historybuff": true, "accessible-familyfriendly": true, "accessible-seniors": true } }, { "id": "6210", "title": "ROMwalks - Heart of Toronto", "url": "http://janeswalk.org/canada/toronto/romwalks-heart-toronto/", "shortDescription": "This walk covers an area that has been the center of the judicial system, municipal government and shopping district for over 100 years.", "longDescription": "This walk was the original ROMwalk in 1980. It highlights the block bordered by Dundas & Queen and University & Yonge, an area that has been the center of the judicial system, municipal government and the shopping district for over 100 years. The walk will portray early colonial York, Victorian Toronto and the modern city.", "accessibleInfo": null, "accessibleTransit": "Osgoode or Queen subway stations", "accessibleParking": null, "accessibleFind": "Look for the Purple umbrella at the meeting point", "map": { "markers": [{ "lat": 43.652806815732, "lng": -79.384171352917, "title": "New City Hall main doors - meeting point", "description": "Meet in front of the main doors - look for the purple umbrella", "media": null, "style": "stop" }, { "lat": 43.654484249133, "lng": -79.382143602902, "title": "Church of the Holy Trinity - end of walk", "description": "", "media": null, "style": "stop" }], "route": [] }, "team": [{ "type": "you", "name-first": "", "name-last": "", "role": "walk-leader", "primary": "on", "bio": "The walk is led by several trained and qualified ROMwalks guides who belong to the ROM\'s Department of Museum volunteers. ROMwalks have been giving guided walking tours of Toronto\'s historic and architectural neighbourhoods for over 30 years.<br /><br />\nFurther information can be viewed at www.rom.on.ca/romwalks or follow the conversation at #ROMwalks and @ROMtoronto", "twitter": "", "facebook": "", "website": "", "email": "", "phone": "416-694-6436" }], "time": { "open": false, "type": null, "slots": [["1433685600", "1433692800"], ["1444572000", "1444579200"]] }, "wards": null, "initiatives": [], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "3295", "url": "/files/cache/fe674be5f04e06635d931f100e27b5c1_f3295.jpg" }], "thumbnailId": "3295", "thumbnailUrl": "/files/cache/fe674be5f04e06635d931f100e27b5c1_f3295.jpg", "checkboxes": { "theme-urban-architecturalenthusiast": true, "theme-culture-historybuff": true, "accessible-familyfriendly": true, "accessible-seniors": true } }, { "id": "7543", "title": "Stories of Renewable Energy: a Neighbourhood Walk of St. Clair West", "url": "http://janeswalk.org/canada/toronto/stories-renewable-energy-neighbourhood-walk-st-clair-west/", "shortDescription": "Renewable energy is all around us! Find out how one community is going green. ", "longDescription": "Join us for a walking tour of St. Clair West to find out what everyday Torontonians are doing to lead the renewable energy transition, and how you can get involved! \n\nWe will share what’s happening to green Toronto’s energy mix, and homeowners will share their experiences of switching to renewables.\n\nRegister <a href=\"http://renewable-energy-stories.eventbrite.com/\">here</a>, and we will see you there!", "accessibleInfo": null, "accessibleTransit": null, "accessibleParking": null, "accessibleFind": "We will meet in front of the Humewood Park sign at the southwest corner of the park! ", "map": { "markers": [{ "lat": 43.683415118003, "lng": -79.426743374402, "title": "Humewood Park ", "description": "", "media": null, "style": "stop" }, { "lat": 43.682467853095, "lng": -79.426711187894, "title": "Solar hot water", "description": "", "media": null, "style": "stop" }, { "lat": 43.681086068425, "lng": -79.42819176727, "title": "Councillor Mihevc\'s Community Office", "description": "", "media": null, "style": "stop" }, { "lat": 43.680209290221, "lng": -79.427161799008, "title": "Solar PV, Bullfrog Power, green features", "description": "", "media": null, "style": "stop" }, { "lat": 43.678486041842, "lng": -79.427258358533, "title": "LEED for homes", "description": "", "media": null, "style": "stop" }, { "lat": 43.679773393841, "lng": -79.424415216977, "title": "Wychwood Barns", "description": "", "media": null, "style": "stop" }, { "lat": 43.680370159175, "lng": -79.420123682553, "title": "Solar PV", "description": "", "media": null, "style": "stop" }, { "lat": 43.680866050736, "lng": -79.417677507932, "title": "Toronto Community Housing", "description": "", "media": null, "style": "stop" }, { "lat": 43.679057468928, "lng": -79.416390047604, "title": "Hillcrest Community School", "description": "", "media": null, "style": "stop" }], "route": [] }, "team": [{ "type": "you", "name-first": "Madison", "name-last": "Van West", "role": "walk-leader", "primary": "on", "bio": "", "twitter": "@joinourpower", "facebook": null, "website": "http://www.ourpower.ca", "email": "madison@trec.on.ca", "phone": "" }], "time": { "open": false, "type": null, "slots": [["1443366000", "1443373200"]] }, "wards": "Ward 21 St. Pauls", "initiatives": [], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "4923", "url": "/files/cache/8536b5267140de1b0d7a983702efca86_f4923.jpg" }], "thumbnailId": "4923", "thumbnailUrl": "/files/cache/8536b5267140de1b0d7a983702efca86_f4923.jpg", "checkboxes": { "theme-urban-architecturalenthusiast": true, "theme-culture-techie": true, "theme-civic-goodneighbour": true, "accessible-familyfriendly": true, "accessible-strollers": true, "accessible-busy": true } }, { "id": "7554", "title": "Scarborough Poetry Walk", "url": "http://janeswalk.org/canada/toronto/scarborough-poetry-walk1/", "shortDescription": "Explore Ron Watson Park in Scarborough through poetry. ", "longDescription": "Join us for a walking tour of Ron Watson Park in Scarborough and explore the area\'s sights, histories, and local idiosyncrasies through the lens of Scarborough poets. Guests will also have the option of staying in the Agincourt Library program room where they can learn about the Toronto Public Library\'s Toronto Poetry Map, poetry collections, Young Voices program and the Agincourt Library\'s new poetry club​.\n\nReserve your spot to this walk via Eventbrite:\nhttp://www.eventbrite.ca/e/poetry-came-in-search-of-me-scarborough-poetry-walk-tickets-18579629171\n", "accessibleInfo": null, "accessibleTransit": "The closest major intersection is Sheppard Avenue East and Kennedy Road. The Agincourt Library is located on the south side of Bonis Avenue, one block north of Sheppard Avenue, midway between Birchmount Road and Kennedy Road, directly north of Agincourt Mall. \n\nBy TTC: Take the TTC Birchmount bus #17 - stops at Bonis Avenue / TTC Kennedy bus #43 - stops at Bonis Avenue / TTC Sheppard Ave. E bus #85 - stops at Agincourt Mall", "accessibleParking": "There are 85 free parking spaces (including 3 disabled) at the parking lot adjacent to the Agincourt Library.", "accessibleFind": "There will be signs in the Agincourt Library pointing to the specific meeting place. Our Walk Leader, Anna Nieminen, will be holding a Culture Days poster!", "map": { "markers": [{ "lat": 43.784179869385, "lng": -79.291924820477, "title": "Agincourt Library", "description": "", "media": null, "style": "stop" }, { "lat": 43.785296664031, "lng": -79.295143471295, "title": "Ron Watson Park", "description": "", "media": null, "style": "stop" }], "route": [] }, "team": [{ "type": "you", "name-first": "Scarborough", "name-last": "Arts", "role": "Walk Organizer", "primary": "on", "bio": "Scarborough Arts is the only arts organization of its kind specifically serving the Scarborough community through innovative arts and culture programs for citizens of all ages. We bring artists to the community and community to artists. ", "twitter": "scararts", "facebook": "scarborougharts", "website": "scarborougharts.com", "email": "news@scarborougharts.com", "phone": "416-698-7322" }, { "type": "organizer", "name-first": "Anna ", "name-last": "Nieminen", "institution": "", "website": "", "phone": "" }, { "type": "leader", "name-first": "Anna", "name-last": "Nieminen", "bio": "Anna Nieminen is an emerging poetry curator from Scarborough. She led her first Scarborough Poetry Walk in May 2015 as part of the Jane’s Walk festival. She will be co-facilitating the Scarborough Poetry Club at the Toronto Public Library - Agincourt Branch in October 2015. She plans to publish a collection of her mother Valma Nieminen’s Finnish language poems. She blogs about walking and poetry at http://janeswalk.org/canada/toronto/toronto-blog/", "primary": "", "twitter": "", "facebook": "", "website": "", "email": "am_niemi@live.com", "phone": "" }], "time": { "open": false, "type": null, "slots": [["1443362400", "1443371400"]] }, "wards": "Ward 39 Scarborough-Agincourt", "initiatives": [], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "4927", "url": "/files/cache/24af5962fd1632772c448ea217a7cce8_f4927.jpg" }], "thumbnailId": "4927", "thumbnailUrl": "/files/cache/24af5962fd1632772c448ea217a7cce8_f4927.jpg", "checkboxes": { "theme-culture-bookworm": true, "theme-culture-writer": true, "theme-civic-goodneighbour": true, "accessible-familyfriendly": true, "accessible-wheelchair": true, "accessible-strollers": true, "accessible-bicycles": true, "accessible-seniors": true } }, { "id": "7567", "title": "Riverside Past, Present & Future Walk - October 10th", "url": "http://janeswalk.org/canada/toronto/riverside-past-present-future-walk-october-10th/", "shortDescription": "Learn about the Riverside neighbourhood’s fascinating history, as well as the inside scoop on exciting current and future plans!", "longDescription": "You\'re invited to a FREE Riverside Guided Walk on October 10th led by Megan Sheppard, starting at 11am from 625 Queen Street East (near Queen E/DVP). \n\nBring your family and friends as a great local activity for Thanksgiving Weekend! Learn about the Riverside neighbourhood’s fascinating history dating back to the 1800s, as well as the inside scoop on exciting current and future plans. Explore the stories of the Riverside Bridge, Sunlight Park, Riverside Square, Broadview Hotel, the Royal Antediluvian Order of Buffalo, Degrassi Street and much, much more. To end off our walk, we’ll enjoy refreshments at The County General Riverside.\n", "accessibleInfo": "This walk follows city sidewalks and laneways - we do plan to enter a few buildings.", "accessibleTransit": "Take the Queen or King Streetcar to the Carroll Street stop.  Walk west one block to our starting point at 625 Queen East.", "accessibleParking": "Green P at Broadview and Queen, or along Queen St (metered street parking)", "accessibleFind": "Wearing a grey Riverside t-shirt with bright yellow decal (these shirts will be on sale for $15 by the way!)", "map": { "markers": [{ "lat": 43.658069694855, "lng": -79.353100643689, "title": "The Riverside Bridge", "description": "Meet at 625 Queen Street East at 11AM - we\'ll look at the Queen Street East Bridge, talking about the art, history and recent additions to light it up!", "media": null, "style": "stop" }, { "lat": 43.659941025975, "lng": -79.346105442578, "title": "The County General Riverside", "description": "The tour will end at Degrassi Street, speaking about the history and current culture of that famous street. We will end at 1pm with refreshments at 698 Queen East! ", "media": null, "style": "stop" }], "route": [] }, "team": [{ "type": "you", "name-first": "Riverside BIA", "name-last": "Riverside Business Improvement Area", "role": "Walk Organizer", "primary": "on", "bio": "Just few blocks from downtown Toronto, on the other side of the Don River valley and the busy parkway which bears its name, lies a vibrant neighbourhood with a unique small town in the big city atmosphere that makes it a draw for residents and visitors alike. Best known for heritage buildings, award-winning restaurants, and the street that inspired the internationally renowned Degrassi TV series, Riverside’s attraction also lies in its artisans and community builders of many sorts.  ", "twitter": "@RiversideBIA", "facebook": "RiversideTO", "website": "http://www.riverside-to.com/", "email": "marketing@riverside-to.com", "phone": "416-466-8167" }, { "type": "leader", "name-first": "Megan", "name-last": "Sheppard", "bio": "Our fabulous walk leader is Megan Sheppard – who was born and raised right here in Riverside on the famous Degrassi Street. Megan stems from three generations of realtors serving Riverside, Leslieville, Leadside and the Beach neighbourhoods. She promises a fun-filled walk!", "primary": "", "twitter": "", "facebook": "", "website": "", "email": "marketing@riverside-to.com", "phone": "" }], "time": { "open": false, "type": null, "slots": [["1444474800", "1444482000"]] }, "wards": "Ward 30 Toronto-Danforth", "initiatives": [], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "5017", "url": "/files/cache/37af97e06d875e56ae4fe944185ae1e3_f5017.jpg" }], "thumbnailId": "5017", "thumbnailUrl": "/files/cache/37af97e06d875e56ae4fe944185ae1e3_f5017.jpg", "checkboxes": { "theme-culture-historybuff": true, "theme-culture-writer": true, "theme-civic-goodneighbour": true, "accessible-familyfriendly": true, "accessible-wheelchair": true, "accessible-dogs": true, "accessible-strollers": true, "accessible-bicycles": true, "accessible-uneven": true, "accessible-busy": true, "accessible-seniors": true } }, { "id": "7623", "title": "The History of Muslims in Toronto - A Special December Jane\'s Walk", "url": "http://janeswalk.org/canada/toronto/history-muslims-toronto-december-janes-walk/", "shortDescription": "A Special December Jane\'s Walk will reveal The Forgotten History of Toronto\'s First Muslims & where they Prayed, Played, and Built Community", "longDescription": "Recent current events have highlighted many Torontonians are unaware of The History of Muslims and their original Houses of Worship in Canada\'s Largest City. \n<P>\n<P>\nThis Special Jane\'s Walk in December will visit four locations in The Junction and High Park neighbourhoods to reveal that history.\n<P>\nWalk stop locations:\n<P>\n<ul><li>The Dundas Street Mosque - The City\'s First masjid</li>\n<li>The little known history of The Albanian Muslim Society of Toronto - The pivotal role of its founder, Reggie Assim</li>\n<li>Toronto\'s FIRST Halal Butcher Shop - Roncesvalles Village</li>\n<li>Jami Mosque - Toronto\'s Second Islamic Centre and its national significance</li></ul>\n<P>\nThrough this special Jane\'s Walk, Torontonians will gain an understanding and will come to appreciate the work of Third, Fourth, and Fifth Generation Muslim-Torontonians in building our city.", "accessibleInfo": "Dress appropriate for the day, as it is December! \n<P>\nMuch of the walk will be on regular sidewalks. \n<P>\nIn The Junction at our second walk stop location, expect the sidewalk to be busy with Christmas Shoppers.", "accessibleTransit": "Runnymede TTC Subway Station - Main Entrance.", "accessibleParking": "Green P Parking near Runnymede Station.", "accessibleFind": "Walk Leader will be wearing a Green Jacket holding a Jane\'s Walk sign.", "map": { "markers": [{ "lat": 43.651567876422, "lng": -79.476332054014, "title": "Runnymede Station - Front Entrance", "description": "The Meeting and Starting Point for this Jane\'s Walk will be in front of Runnymede TTC Subway Station - Main Entrance.", "media": null, "style": "stop" }, { "lat": 43.659913083999, "lng": -79.480859622668, "title": "Albanian Muslim Society of Toronto", "description": "The Albanian Muslim Society of Toronto - Our Second Walk Stop, we will see a Historic Plaque built into the outside wall of the building, dedicated to the Founder of the original Muslim Society of Toronto.", "media": null, "style": "stop" }, { "lat": 43.665396555336, "lng": -79.471035584734, "title": "3047 Dundas Street East ", "description": "The Forgotten \"Dundas Street Mosque\", 3047 Dundas Street East in The Junction neighbourhood, was Toronto\'s First Islamic Centre.", "media": null, "style": "stop" }, { "lat": 43.653373279207, "lng": -79.451948984238, "title": "Site of Toronto\'s FIRST Halal Butcher Shop", "description": "The unique three- and half-way-intersection where Dundas Street West meets Roncesvalles, steps away from Jami Mosque, was home the first Muslim Halal Food Shops in the city.", "media": null, "style": "stop" }, { "lat": 43.653279092389, "lng": -79.454495295427, "title": "Jami Mosque - The Islamic Centre of Toronto", "description": "Toronto\'s second official House of Worship for Muslims. Still in operation today, it belongs as a Heritage for All Torontonians to appreciate and learn from.", "media": null, "style": "stop" }], "route": [] }, "team": [{ "type": "you", "name-first": "HiMY", "name-last": "SYeD", "role": "walk-leader", "primary": "on", "bio": "A Walk Leader in Toronto since Jane\'s Walk inaugural year, HiMY has organized and lead at least 50 different walks since 2007 in three different cities.\n<P>\nSince 2011, during Ramadan, HiMY has been blogging about visits to different Masjids, Islamic Centres or public gatherings where Muslims break their daily fasts.\n<P>\nHis blog, <a href=\"http://30Masjids.ca\">30Masjids.ca</a>, has become a unique guidepost and archive of The Story of Muslims in Toronto and Southern Ontario.\n<P>\nHis Special December 20 2015 Jane\'s Walk will share the best of that researched archive from the past five years.", "twitter": "30Masjids", "facebook": "", "website": "http://30Masjids.ca", "email": "HiMY.org@gmail.com", "phone": "" }], "time": { "open": false, "type": null, "slots": [["1450609200", "1450618200"]] }, "wards": "Ward 13 Parkdale-High Park", "initiatives": [], "mirrors": { "eventbrite": null }, "thumbnails": [{ "id": "5049", "url": "/files/cache/dd4a4c169a98f83771645a3480b4e541_f5049.jpg" }], "thumbnailId": "5049", "thumbnailUrl": "/files/cache/dd4a4c169a98f83771645a3480b4e541_f5049.jpg", "checkboxes": { "theme-civic-goodneighbour": true, "theme-civic-international": true, "theme-civic-religion": true, "accessible-familyfriendly": true, "accessible-busy": true, "accessible-seniors": true } }];

	var lists = [{
	  id: 1,
	  title: "My Itinerary",
	  shareUrl: "janeswalk.org/Harold/itinerary",
	  description: "Each year, I take some time to read about all of the walks happening in my city in order to curate a list for myself and my friends, family, and colleagues. And this year, I’m sharing the list with you! Here are my Top 10 choices for the 2015 walk weekend in Toronto. Hope to see you out there, and maybe even having a walking conversation with YOU!",
	  walks: ['2411', '6210', '7543', '7554', '7623']
	}, {
	  id: 2,
	  title: 'Favourites',
	  shareUrl: "janeswalk.org/Harold/favourites",
	  description: "View my Jane's Walk Itinerary!",
	  walks: ['7554', '7567', '7623']
	}, {
	  id: 3,
	  title: 'Skateboard',
	  shareUrl: "janeswalk.org/Harold/skateboard",
	  description: "View my Jane's Walk Itinerary!",
	  walks: ['2411', '6210']
	}, {
	  id: 4,
	  title: 'Walk led by Friends',
	  shareUrl: "janeswalk.org/Harold/walk-led-by-friends",
	  description: "View my Jane's Walk Itinerary!",
	  walks: ['2411', '7567', '7623']
	}];
	exports.lists = lists;
	exports.walks = walks;

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.t2 = exports.t = undefined;

	var _events = __webpack_require__(17);

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(24);

	var _AddWalkToList = __webpack_require__(25);

	var _AddWalkToList2 = _interopRequireDefault(_AddWalkToList);

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

	      if (time && time.slots) {
	        start = time.slots[0][0];
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
	            (0, _ItineraryUtils.dateFormatted)(start)
	          ),
	          React.createElement(
	            'h4',
	            null,
	            meeting
	          )
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dateFormatted = dateFormatted;
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
	  if (fromCache) {
	    return fromCache;
	  } else {
	    fromFormat = formatDate(dateInSeconds * 1000);
	    _dateCache[dateInSeconds] = fromFormat;
	    return fromFormat;
	  }
	}

/***/ },
/* 25 */
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

	var _ItineraryActions = __webpack_require__(13);

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

	var _ItineraryStore = __webpack_require__(16);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(13);

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
	    var _list$walks = _toArray(list.walks);

	    var walks = _list$walks;

	    return Object.assign({}, list, {
	      walks: walks.map(function (w) {
	        return +w.id;
	      })
	    });
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

	var _events = __webpack_require__(17);

	var _JWConstants = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	var _areas = {};

	var AreaStore = Object.assign(_events.EventEmitter.prototype, {
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

	var _events = __webpack_require__(17);

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
	    return receiveUser(u);
	  });
	}

	var UserStore = Object.assign(_events.EventEmitter.prototype, {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _View2 = __webpack_require__(32);

	var _View3 = _interopRequireDefault(_View2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Basic View info for a regular ol' page
	 * 
	 * @param  jQuery element
	 * @return void
	 */

	var PageView = function (_View) {
	  _inherits(PageView, _View);

	  function PageView(element) {
	    _classCallCheck(this, PageView);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PageView).call(this, element));

	    _this2._addOverlayCloseEvent();
	    return _this2;
	  }

	  /**
	   * _addOverlayCloseEvent
	   * 
	   * @protected
	   * @return    void
	   */

	  _createClass(PageView, [{
	    key: '_addOverlayCloseEvent',
	    value: function _addOverlayCloseEvent() {
	      var _this = this;
	      this._element.find('.o-background').click(function (event) {
	        _this._element.find('.overlay').hide();
	      });
	      this._element.find('a.closeModalCta').click(function (event) {
	        event.preventDefault();
	        _this._element.find('.overlay').hide();
	      });
	    }

	    /**
	     * _makeGaCall
	     * 
	     * @protected
	     * @param     Array call
	     * @return    void
	     */

	  }, {
	    key: '_makeGaCall',
	    value: function _makeGaCall(call) {
	      _gaq.push(call);
	    }

	    /**
	     * trackCustomVar
	     * 
	     * @see    http://www.sitepoint.com/google-analytics-custom-variables/
	     * @see    http://online-behavior.com/analytics/custom-variables-segmentation
	     * @public
	     * @param  String index
	     * @param  String name
	     * @param  String value
	     * @param  String scope (optional)
	     * @return void
	     */

	  }, {
	    key: 'trackCustomVar',
	    value: function trackCustomVar(index, name, value, scope) {
	      this._makeGaCall(['_setCustomVar', index, name, value, scope]);
	    }

	    /**
	     * trackEvent
	     * 
	     * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
	     * @public
	     * @param  String category The name you supply for the group of objects you want to track.
	     * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
	     * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
	     * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
	     * @param  Boolean override (optional)
	     * @return void
	     */

	  }, {
	    key: 'trackEvent',
	    value: function trackEvent(category, action, optLabel, optValue, override) {
	      var call = ['_trackEvent'];
	      if (category !== undefined) {
	        call.push(category);
	      }
	      if (action !== undefined) {
	        call.push(action);
	      }
	      if (optLabel !== undefined) {
	        call.push(optLabel);
	      }
	      if (optValue !== undefined) {
	        call.push(optValue);
	      }
	      this._makeGaCall(call, override);
	    }

	    /**
	     * trackView
	     * 
	     * @public
	     * @param  String path
	     * @return void
	     */

	  }, {
	    key: 'trackView',
	    value: function trackView(path) {
	      this._makeGaCall(['_trackPageview', path]);
	    }
	  }]);

	  return PageView;
	}(_View3.default);

	exports.default = PageView;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* View constructor
	* 
	* @public
	* @param  jQuery element
	* @return void
	*/

	var View = function () {
	  function View(element) {
	    _classCallCheck(this, View);

	    this._element = element;
	  }

	  /**
	   * getElement
	   * 
	   * @public
	   * @return HTMLFormElement
	   */

	  _createClass(View, [{
	    key: "getElement",
	    value: function getElement() {
	      return this._element;
	    }
	  }]);

	  return View;
	}();

	exports.default = View;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Page = __webpack_require__(31);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * _isMobile
	 *
	 * @static
	 * @var bool
	 */
	var _isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	var facebookDialogDonate = {
	  link: 'http://janeswalk.org',
	  // picture: 'http://janeswalk.org',
	  name: 'Jane\'s Walk'
	};

	function shareOnTwitter(event) {
	  var url = encodeURIComponent('http://janeswalk.org/');
	  var text = encodeURIComponent($(this).closest('.option').find('.copy').text().trim());
	  var link = 'https://twitter.com/intent/tweet' + '?url=' + url + '&via=janeswalk' + '&text=' + text;

	  window.open(link, 'Twitter Share', 'width=640, height=320');

	  event.preventDefault();
	}

	function shareOnFacebook(event) {
	  var shareObj = Object.assign({}, facebookDialogDonate, {
	    description: $(this).closest('.option').find('.copy').text().trim()
	  });
	  new FacebookShareDialog(shareObj).show();
	  event.preventDefault();
	}

	/**
	 * CityPageView
	 * 
	 * @extends PageView
	 * 
	 * @public
	 * @param  jQuery element
	 * @return void
	 */

	var CityPageView = function (_PageView) {
	  _inherits(CityPageView, _PageView);

	  function CityPageView(element) {
	    _classCallCheck(this, CityPageView);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CityPageView).call(this, element));

	    _this._addCreateWalkEvent();
	    return _this;
	  }

	  /**
	   * _addCreateWalkEvent
	   *
	   * @protected
	   * @return    void
	   */

	  _createClass(CityPageView, [{
	    key: '_addCreateWalkEvent',
	    value: function _addCreateWalkEvent() {
	      var $btn = $('.create-walk');
	      $btn.click(function (event) {
	        if (!JanesWalk.user) {
	          event.preventDefault();
	          // Redirect to the CAW you were attempting
	          // FIXME: bad approach - should be dispatcher based
	          JanesWalk.react.login.props.redirectURL = this.href;
	          $('#login').modal();
	        }
	      });
	    }
	  }]);

	  return CityPageView;
	}(_Page2.default);

	exports.default = CityPageView;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Page = __webpack_require__(31);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * HomePageView
	 * 
	 * @extends PageView
	 * 
	 * @public
	 * @param  jQuery element
	 * @return void
	 */

	var HomePageView = function (_PageView) {
	  _inherits(HomePageView, _PageView);

	  function HomePageView(element) {
	    _classCallCheck(this, HomePageView);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(HomePageView).call(this, element));

	    _this2._addMapToggleEvents();
	    _this2._addBgImage();
	    _this2._addCityDropdownEvent();
	    _this2._addCreateWalkEvent();
	    return _this2;
	  }

	  /**
	   * _addCreateWalkEvent
	   * 
	   * @protected
	   * @return    void
	   */

	  _createClass(HomePageView, [{
	    key: '_addCreateWalkEvent',
	    value: function _addCreateWalkEvent() {
	      var _this = this,
	          $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
	      $btn.click(function (event) {
	        event.preventDefault();
	        if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
	          location.href = $(this).attr('href');
	        } else {
	          _this._element.find('.overlay').show();
	        }
	      });
	    }

	    /**
	     * _addCityDropdownEvent
	     * 
	     * @protected
	     * @return    void
	     */

	  }, {
	    key: '_addCityDropdownEvent',
	    value: function _addCityDropdownEvent() {
	      var $select = this._element.find('select.pageListSelect');
	      $select.change(function (event) {
	        location.href = $select.val();
	      });
	    }

	    /**
	     * _addBgImage
	     * 
	     * @protected
	     * @return    void
	     */

	  }, {
	    key: '_addBgImage',
	    value: function _addBgImage() {
	      var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
	          $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
	          image = document.createElement("img");
	      image.onload = function () {
	        $backgroundImageBanner.css({
	          backgroundImage: 'url(' + backgroundImageUrl + ')'
	        });
	        $backgroundImageBanner.removeClass('faded');
	      };
	      image.src = backgroundImageUrl;
	    }

	    /**
	     * _addCityButtonCta
	     * 
	     * @protected
	     * @param     String cityName
	     * @param     String cityPath
	     * @return    void
	     */

	  }, {
	    key: '_addCityButtonCta',
	    value: function _addCityButtonCta(cityName, cityPath) {
	      React.render(this._element.find('.calltoaction ul').first(), React.createElement(
	        'li',
	        { className: 'cityButtonCta' },
	        React.createElement(
	          'a',
	          { href: cityPath, className: 'btn btn-primary' },
	          'View walks in ',
	          cityName
	        )
	      ));
	    }

	    /**
	     * _addMapToggleEvents
	     * 
	     * @protected
	     * @return    void
	     */

	  }, {
	    key: '_addMapToggleEvents',
	    value: function _addMapToggleEvents() {
	      var $showButton = this._element.find('.overlap .controls a.showButton'),
	          $closeButton = this._element.find('.overlap .controls a.closeButton');
	      $showButton.click(function () {
	        $('.overlap').addClass('fullmap');
	        $(this).fadeOut(400, function () {
	          $closeButton.fadeIn();
	        });
	        $('html, body').animate({
	          scrollTop: $(this).offset().top - 100
	        }, 800);
	      });
	      $closeButton.click(function () {
	        $('.overlap').removeClass('fullmap');
	        $(this).fadeOut(400, function () {
	          $showButton.fadeIn();
	        });
	      });
	    }
	  }]);

	  return HomePageView;
	}(_Page2.default);

	exports.default = HomePageView;

/***/ },
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ImageUpload = __webpack_require__(253);

	var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

	var _ThemeSelect = __webpack_require__(254);

	var _ThemeSelect2 = _interopRequireDefault(_ThemeSelect);

	var _MapBuilder = __webpack_require__(256);

	var _MapBuilder2 = _interopRequireDefault(_MapBuilder);

	var _DateSelect = __webpack_require__(264);

	var _DateSelect2 = _interopRequireDefault(_DateSelect);

	var _WardSelect = __webpack_require__(269);

	var _WardSelect2 = _interopRequireDefault(_WardSelect);

	var _AccessibleSelect = __webpack_require__(270);

	var _AccessibleSelect2 = _interopRequireDefault(_AccessibleSelect);

	var _TeamBuilder = __webpack_require__(271);

	var _TeamBuilder2 = _interopRequireDefault(_TeamBuilder);

	var _WalkPublish = __webpack_require__(272);

	var _WalkPublish2 = _interopRequireDefault(_WalkPublish);

	var _TextAreaLimit = __webpack_require__(273);

	var _TextAreaLimit2 = _interopRequireDefault(_TextAreaLimit);

	var _I18nActions = __webpack_require__(3);

	var _I18nActions2 = _interopRequireDefault(_I18nActions);

	var _I18nStore = __webpack_require__(21);

	var _I18nStore2 = _interopRequireDefault(_I18nStore);

	var _helpers = __webpack_require__(263);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Create a Walk
	//
	// Form for creating new walks. Includes a map builder, team builder, scheduler
	//

	// Load create-a-walk View components

	var defaultWalk = __webpack_require__(20);

	// Flux

	// Helpers

	var CreateWalk = function (_React$Component) {
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
	          success: function (data) {
	            var notifications = this.state.notifications.slice();
	            notifications.push({ type: 'success', name: 'Walk saved' });
	            this.setState({ notifications: notifications, url: data.url || this.state.url }, function () {
	              if (cb && cb instanceof Function) {
	                // The 'this' in each callback should be the <CreateWalk>
	                cb.call(this);
	              }
	            });
	            setTimeout(removeNotice, 1200);
	          }.bind(_this2),
	          error: function (xhr, status, err) {
	            var notifications = this.state.notifications.slice();
	            notifications.push({ type: 'danger', name: 'Walk failed to save', message: 'Keep this window open and contact Jane\'s Walk for assistance' });
	            this.setState({ notifications: notifications });
	            setTimeout(removeNotice, 6000);
	            console.error(this.url, status, err.toString());
	          }.bind(_this2)
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
	                { className: 'btn btn-info btn-submit', id: 'btn-submit', title: 'Publishing will make your visible to all.', onClick: function () {
	                    this.setState({ publish: true });
	                  }.bind(this), ref: 'publish' },
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
	}(React.Component);
	// Mixins

	exports.default = CreateWalk;
	Object.assign(CreateWalk.prototype, React.addons.LinkedStateMixin), function (_React$Component2) {
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
	}(React.Component);

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	var ImageUpload = function (_React$Component) {
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
	}(React.Component);

	exports.default = ImageUpload;

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mixins = __webpack_require__(255);

	// Flux

	var ThemeSelect = function (_React$Component) {
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
	}(React.Component);

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
/* 255 */
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
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WalkStopTable = __webpack_require__(257);

	var _WalkStopTable2 = _interopRequireDefault(_WalkStopTable);

	var _WalkInfoWindow = __webpack_require__(258);

	var _WalkInfoWindow2 = _interopRequireDefault(_WalkInfoWindow);

	var _InstagramConnect = __webpack_require__(259);

	var _InstagramConnect2 = _interopRequireDefault(_InstagramConnect);

	var _SoundCloudConnect = __webpack_require__(260);

	var _SoundCloudConnect2 = _interopRequireDefault(_SoundCloudConnect);

	var _TwitterConnect = __webpack_require__(261);

	var _TwitterConnect2 = _interopRequireDefault(_TwitterConnect);

	var _ConnectFilters = __webpack_require__(262);

	var _ConnectFilters2 = _interopRequireDefault(_ConnectFilters);

	var _I18nStore = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Helper = __webpack_require__(263);

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
	}(React.Component);

	// Static properties

	exports.default = MapBuilder;
	Object.assign(MapBuilder, {
	  defaultProps: {
	    initialZoom: 15
	  }
	});

/***/ },
/* 257 */
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
/* 258 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The 'info window', aka the input box that pops up over markers in maps
	 */

	var WalkInfoWindow = function (_React$Component) {
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
	}(React.Component);

	exports.default = WalkInfoWindow;

/***/ },
/* 259 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InstagramConnect = function (_React$Component) {
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
	}(React.Component);

	exports.default = InstagramConnect;

/***/ },
/* 260 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
	}(React.Component);

	exports.default = SoundCloudConnect;

/***/ },
/* 261 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
/* 262 */
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
/* 263 */
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Components
	var DatePicker = __webpack_require__(265);
	var TimePicker = __webpack_require__(266);
	var TimeSetTable = __webpack_require__(267);
	var TimeOpenTable = __webpack_require__(268);

	// Flux

	// Default to a 1-hour walk time
	var ONE_HOUR = 60 * 60 * 1000;

	// TODO: Make 'intiatives' build as separate selectors

	var DateSelect = function (_React$Component) {
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
	}(React.Component);

	// Load mixins

	exports.default = DateSelect;
	Object.assign(DateSelect.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 265 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	var DatePicker = function (_React$Component) {
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
	        onSelect: function (dateText) {
	          // Silly, but needed for inconsistent date formats across libs
	          var dateMDY = dateText.split('/');
	          this.props.setDay(new Date(Date.UTC(dateMDY[2], dateMDY[0] - 1, dateMDY[1])));
	        }.bind(this)
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
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	var TimePicker = function (_React$Component) {
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
	}(React.Component);

	exports.default = TimePicker;

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	var TimeSetTable = function (_React$Component) {
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
	}(React.Component);

	exports.default = TimeSetTable;

/***/ },
/* 268 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mixins = __webpack_require__(255);

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
	}(React.Component);

	exports.default = WardSelect;

	Object.assign(WardSelect.prototype, mixins.linkedParentState);

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixins = __webpack_require__(255);

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Menu to select accessibility requirements
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	// Flux

	var options = [{ id: 'accessible-familyfriendly', name: (0, _I18nStore.t)('Family friendly') }, { id: 'accessible-wheelchair', name: (0, _I18nStore.t)('Wheelchair accessible') }, { id: 'accessible-dogs', name: (0, _I18nStore.t)('Dogs welcome') }, { id: 'accessible-strollers', name: (0, _I18nStore.t)('Strollers welcome') }, { id: 'accessible-bicycles', name: (0, _I18nStore.t)('Bicycles welcome') }, { id: 'accessible-steephills', name: (0, _I18nStore.t)('Steep hills') }, { id: 'accessible-uneven', name: (0, _I18nStore.t)('Wear sensible shoes (uneven terrain)') }, { id: 'accessible-busy', name: (0, _I18nStore.t)('Busy sidewalks') }, { id: 'accessible-bicyclesonly', name: (0, _I18nStore.t)('Bicycles only') }, { id: 'accessible-lowlight', name: (0, _I18nStore.t)('Low light or nighttime') }, { id: 'accessible-seniors', name: (0, _I18nStore.t)('Senior Friendly') }];

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
	}(React.Component);

	exports.default = AccessibleSelect;

	Object.assign(AccessibleSelect.prototype, _mixins.linkedParentState);

/***/ },
/* 271 */
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
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _I18nStore = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Flux

	var WalkPublish = function (_React$Component) {
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
	}(React.Component);

	exports.default = WalkPublish;

	Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);

/***/ },
/* 273 */
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
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryStore = __webpack_require__(16);

	var _ItineraryStore2 = _interopRequireDefault(_ItineraryStore);

	var _ItineraryActions = __webpack_require__(13);

	var _ItineraryActions2 = _interopRequireDefault(_ItineraryActions);

	var _WalkHeader = __webpack_require__(275);

	var _WalkHeader2 = _interopRequireDefault(_WalkHeader);

	var _WalkDescription = __webpack_require__(276);

	var _WalkDescription2 = _interopRequireDefault(_WalkDescription);

	var _WalkRoute = __webpack_require__(277);

	var _WalkRoute2 = _interopRequireDefault(_WalkRoute);

	var _WalkAccessibility = __webpack_require__(278);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(280);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(281);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _WalkStart = __webpack_require__(282);

	var _WalkStart2 = _interopRequireDefault(_WalkStart);

	var _WalkTeam = __webpack_require__(283);

	var _WalkTeam2 = _interopRequireDefault(_WalkTeam);

	var _WalkMenu = __webpack_require__(284);

	var _WalkMenu2 = _interopRequireDefault(_WalkMenu);

	var _WalkMap = __webpack_require__(286);

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
	      var itinerary = _state.itinerary;
	      var favourites = _state.favourites;

	      return React.createElement(
	        'section',
	        { className: 'walkPage' },
	        React.createElement(_WalkHeader2.default, { walk: walk, city: city, itinerary: itinerary, favourites: favourites }),
	        React.createElement(_WalkMenu2.default, this.state),
	        React.createElement(_WalkDescription2.default, this.state.walk),
	        React.createElement(_WalkMap2.default, this.state.walk),
	        React.createElement(_WalkRoute2.default, this.state.walk),
	        React.createElement(_WalkStart2.default, this.state.walk),
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
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(24);

	var _ItineraryActions = __webpack_require__(13);

	//TODO: Duplicate of Itinerary <Walk/>
	//TODO: Issue with Favourite being removed on first attempt (works fine for Itinerary)

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

	var WalkHeader = function WalkHeader(_ref) {
	  var city = _ref.city;
	  var walk = _ref.walk;
	  var favourites = _ref.favourites;
	  var itinerary = _ref.itinerary;

	  var favButton = undefined,
	      addButton = undefined;
	  if (favourites) {
	    if (favourites.walks.has(walk)) {
	      favButton = React.createElement('button', { className: 'removeFavourite', onClick: function onClick() {
	          return (0, _ItineraryActions.remove)(favourites, walk);
	        } });
	    } else {
	      favButton = React.createElement('button', { className: 'addFavourite', onClick: function onClick() {
	          return (0, _ItineraryActions.add)(favourites, walk);
	        } });
	    }
	  }

	  if (itinerary) {
	    if (itinerary.walks.has(walk)) {
	      addButton = React.createElement('button', { className: 'removeItinerary', onClick: function onClick() {
	          return (0, _ItineraryActions.remove)(itinerary, walk);
	        } });
	    } else {
	      addButton = React.createElement('button', { className: 'addItinerary', onClick: function onClick() {
	          return (0, _ItineraryActions.add)(itinerary, walk);
	        } });
	    }
	  }

	  var title = walk.title;
	  var map = walk.map;
	  var time = walk.time;
	  var team = walk.team;
	  var thumbnails = walk.thumbnails;
	  var url = city.url;
	  var name = city.name;

	  var walkLeader = team.find(function (member) {
	    return member.role === 'walk-leader';
	  });

	  // Only show the add to itinerary if you can
	  var addToItineraryButton = undefined;
	  if (time.slots[0]) {
	    addToItineraryButton = React.createElement(
	      'h4',
	      null,
	      walkLeader ? 'Led By ' + walkLeader['name-first'] + ' ' + walkLeader['name-last'] + ' - ' : null,
	      (0, _ItineraryUtils.dateFormatted)(time.slots[0][0]),
	      addButton
	    );
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
	    addToItineraryButton,
	    React.createElement(
	      'h4',
	      null,
	      'Meeting at ',
	      map.markers[0].title
	    )
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
/* 276 */
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
/* 277 */
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
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Accessible = __webpack_require__(279);

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
/* 279 */
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
/* 280 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkPublicTransit = function WalkPublicTransit(_ref) {
	  var accessibleTransit = _ref.accessibleTransit;
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
	};

	WalkPublicTransit.propTypes = {
	  accessibleTransit: React.PropTypes.string.isRequired
	};

	exports.default = WalkPublicTransit;

/***/ },
/* 281 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WalkParking = function WalkParking(_ref) {
	  var accessibleParking = _ref.accessibleParking;
	  var style = _ref.style;
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
	};

	WalkParking.propTypes = {
	  accessibleParking: React.PropTypes.string.isRequired
	};

	exports.default = WalkParking;

/***/ },
/* 282 */
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
/* 283 */
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
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ItineraryUtils = __webpack_require__(24);

	var _WalkAccessibility = __webpack_require__(278);

	var _WalkAccessibility2 = _interopRequireDefault(_WalkAccessibility);

	var _WalkPublicTransit = __webpack_require__(280);

	var _WalkPublicTransit2 = _interopRequireDefault(_WalkPublicTransit);

	var _WalkParking = __webpack_require__(281);

	var _WalkParking2 = _interopRequireDefault(_WalkParking);

	var _Theme = __webpack_require__(285);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TODO: Duplicate of Itinerary <Walk/> and WalkPage <WalkHeader/>, refactor/combine components into factory
	//TODO: Make walkMenu sticky - will complete after Dashboard

	var menuItems = ['About This Walk', 'Walk Route', 'How to find us', 'Taking Public Transit', 'Parking Availability', 'About the Walk Team'];

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
	      meetingPlaceHead,
	      React.createElement(_WalkAccessibility2.default, _extends({}, walk, filters))
	    ),
	    React.createElement(
	      'section',
	      { className: 'menu' },
	      React.createElement(
	        'ul',
	        null,
	        menuItems.map(function (item, i) {
	          return React.createElement(
	            'li',
	            { key: i },
	            React.createElement(
	              'a',
	              { href: '#' + item },
	              item
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
/* 285 */
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
/* 286 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
/* 287 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// TODO: link to the i18n
	function t(str) {
	  var args = Array.from(arguments);
	  return args.shift().replace(/%(s|d)/g, function () {
	    return args.shift();
	  });
	}

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
	                t('Sign in to %s', 'Jane\'s Walk')
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
	                  t('or, log-in using your email & password')
	                ),
	                React.createElement(
	                  'label',
	                  { htmlFor: 'uEmail' },
	                  t('Email'),
	                  React.createElement('input', { type: 'text', name: 'uEmail', id: 'uEmail', ref: 'uEmail', value: email, onChange: this.handleChangeEmail, className: 'ccm-input-text input-large' })
	                ),
	                React.createElement(
	                  'label',
	                  { htmlFor: 'uPassword' },
	                  t('Password'),
	                  React.createElement('input', { type: 'password', name: 'uPassword', id: 'uPassword', value: password, onChange: this.handleChangePassword, className: 'ccm-input-text input-large' })
	                ),
	                React.createElement(
	                  'label',
	                  null,
	                  React.createElement('input', { type: 'checkbox', name: 'uMaintainLogin', checked: this.maintainLogin, onChange: this.handleChangeMaintainLogin }),
	                  ' ',
	                  t('Keep me signed in.')
	                ),
	                React.createElement(
	                  'a',
	                  { onClick: this.handleReset },
	                  t('Request a new password')
	                )
	              ),
	              React.createElement(
	                'footer',
	                null,
	                message,
	                React.createElement(
	                  'a',
	                  { href: CCM_REL + '/register?uEmail=' + email },
	                  t('Register for a new account.')
	                ),
	                React.createElement('input', { type: 'submit', className: 'btn ccm-input-submit', id: 'submit', value: t('Go!') })
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

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (global, factory) {
	  var IntlPolyfill = factory();if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (IntlPolyfill), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }if (( false ? "undefined" : _typeof(exports)) === "object") {
	    module.exports = IntlPolyfill;
	  }if (global) {
	    global.IntlPolyfill = IntlPolyfill;
	  }
	})(typeof global !== "undefined" ? global : undefined, function () {
	  "use strict";
	  var Intl = {},
	      realDefineProp = function () {
	    try {
	      return !!Object.defineProperty({}, "a", {});
	    } catch (e) {
	      return false;
	    }
	  }(),
	      es3 = !realDefineProp && !Object.prototype.__defineGetter__,
	      hop = Object.prototype.hasOwnProperty,
	      tls = 1.23.toLocaleString(undefined, { style: "currency", currency: "ZZZ" }).indexOf("ZZZ") > -1,
	      defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
	    if ("get" in desc && obj.__defineGetter__) obj.__defineGetter__(name, desc.get);else if (!hop.call(obj, name) || "value" in desc) obj[name] = desc.value;
	  },
	      arrIndexOf = Array.prototype.indexOf || function (search) {
	    var t = this;if (!t.length) return -1;for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
	      if (t[i] === search) return i;
	    }return -1;
	  },
	      objCreate = Object.create || function (proto, props) {
	    var obj;function F() {}F.prototype = proto;obj = new F();for (var k in props) {
	      if (hop.call(props, k)) defineProperty(obj, k, props[k]);
	    }return obj;
	  },
	      arrSlice = Array.prototype.slice,
	      arrConcat = Array.prototype.concat,
	      arrPush = Array.prototype.push,
	      arrJoin = Array.prototype.join,
	      arrShift = Array.prototype.shift,
	      arrUnshift = Array.prototype.unshift,
	      fnBind = Function.prototype.bind || function (thisObj) {
	    var fn = this,
	        args = arrSlice.call(arguments, 1);if (fn.length === 1) {
	      return function (a) {
	        return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	      };
	    } else {
	      return function () {
	        return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	      };
	    }
	  },
	      defaultLocale,
	      internals = objCreate(null),
	      secret = Math.random(),
	      dateWidths = objCreate(null, { narrow: {}, "short": {}, "long": {} }),
	      numberFormatProtoInitialised = false,
	      dateTimeFormatProtoInitialised = false,
	      expCurrencyCode = /^[A-Z]{3}$/,
	      expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi,
	      expBCP47Syntax,
	      expExtSequences,
	      expVariantDupes,
	      expSingletonDupes,
	      redundantTags = { tags: { "art-lojban": "jbo", "i-ami": "ami", "i-bnn": "bnn", "i-hak": "hak", "i-klingon": "tlh", "i-lux": "lb", "i-navajo": "nv", "i-pwn": "pwn", "i-tao": "tao", "i-tay": "tay", "i-tsu": "tsu", "no-bok": "nb", "no-nyn": "nn", "sgn-BE-FR": "sfb", "sgn-BE-NL": "vgt", "sgn-CH-DE": "sgg", "zh-guoyu": "cmn", "zh-hakka": "hak", "zh-min-nan": "nan", "zh-xiang": "hsn", "sgn-BR": "bzs", "sgn-CO": "csn", "sgn-DE": "gsg", "sgn-DK": "dsl", "sgn-ES": "ssp", "sgn-FR": "fsl", "sgn-GB": "bfi", "sgn-GR": "gss", "sgn-IE": "isg", "sgn-IT": "ise", "sgn-JP": "jsl", "sgn-MX": "mfs", "sgn-NI": "ncs", "sgn-NL": "dse", "sgn-NO": "nsl", "sgn-PT": "psr", "sgn-SE": "swl", "sgn-US": "ase", "sgn-ZA": "sfs", "zh-cmn": "cmn", "zh-cmn-Hans": "cmn-Hans", "zh-cmn-Hant": "cmn-Hant", "zh-gan": "gan", "zh-wuu": "wuu", "zh-yue": "yue" }, subtags: { BU: "MM", DD: "DE", FX: "FR", TP: "TL", YD: "YE", ZR: "CD", heploc: "alalc97", "in": "id", iw: "he", ji: "yi", jw: "jv", mo: "ro", ayx: "nun", bjd: "drl", ccq: "rki", cjr: "mom", cka: "cmr", cmk: "xch", drh: "khk", drw: "prs", gav: "dev", hrr: "jal", ibi: "opa", kgh: "kml", lcq: "ppr", mst: "mry", myt: "mry", sca: "hle", tie: "ras", tkk: "twm", tlw: "weo", tnf: "prs", ybd: "rki", yma: "lrr" }, extLang: { aao: ["aao", "ar"], abh: ["abh", "ar"], abv: ["abv", "ar"], acm: ["acm", "ar"], acq: ["acq", "ar"], acw: ["acw", "ar"], acx: ["acx", "ar"], acy: ["acy", "ar"], adf: ["adf", "ar"], ads: ["ads", "sgn"], aeb: ["aeb", "ar"], aec: ["aec", "ar"], aed: ["aed", "sgn"], aen: ["aen", "sgn"], afb: ["afb", "ar"], afg: ["afg", "sgn"], ajp: ["ajp", "ar"], apc: ["apc", "ar"], apd: ["apd", "ar"], arb: ["arb", "ar"], arq: ["arq", "ar"], ars: ["ars", "ar"], ary: ["ary", "ar"], arz: ["arz", "ar"], ase: ["ase", "sgn"], asf: ["asf", "sgn"], asp: ["asp", "sgn"], asq: ["asq", "sgn"], asw: ["asw", "sgn"], auz: ["auz", "ar"], avl: ["avl", "ar"], ayh: ["ayh", "ar"], ayl: ["ayl", "ar"], ayn: ["ayn", "ar"], ayp: ["ayp", "ar"], bbz: ["bbz", "ar"], bfi: ["bfi", "sgn"], bfk: ["bfk", "sgn"], bjn: ["bjn", "ms"], bog: ["bog", "sgn"], bqn: ["bqn", "sgn"], bqy: ["bqy", "sgn"], btj: ["btj", "ms"], bve: ["bve", "ms"], bvl: ["bvl", "sgn"], bvu: ["bvu", "ms"], bzs: ["bzs", "sgn"], cdo: ["cdo", "zh"], cds: ["cds", "sgn"], cjy: ["cjy", "zh"], cmn: ["cmn", "zh"], coa: ["coa", "ms"], cpx: ["cpx", "zh"], csc: ["csc", "sgn"], csd: ["csd", "sgn"], cse: ["cse", "sgn"], csf: ["csf", "sgn"], csg: ["csg", "sgn"], csl: ["csl", "sgn"], csn: ["csn", "sgn"], csq: ["csq", "sgn"], csr: ["csr", "sgn"], czh: ["czh", "zh"], czo: ["czo", "zh"], doq: ["doq", "sgn"], dse: ["dse", "sgn"], dsl: ["dsl", "sgn"], dup: ["dup", "ms"], ecs: ["ecs", "sgn"], esl: ["esl", "sgn"], esn: ["esn", "sgn"], eso: ["eso", "sgn"], eth: ["eth", "sgn"], fcs: ["fcs", "sgn"], fse: ["fse", "sgn"], fsl: ["fsl", "sgn"], fss: ["fss", "sgn"], gan: ["gan", "zh"], gds: ["gds", "sgn"], gom: ["gom", "kok"], gse: ["gse", "sgn"], gsg: ["gsg", "sgn"], gsm: ["gsm", "sgn"], gss: ["gss", "sgn"], gus: ["gus", "sgn"], hab: ["hab", "sgn"], haf: ["haf", "sgn"], hak: ["hak", "zh"], hds: ["hds", "sgn"], hji: ["hji", "ms"], hks: ["hks", "sgn"], hos: ["hos", "sgn"], hps: ["hps", "sgn"], hsh: ["hsh", "sgn"], hsl: ["hsl", "sgn"], hsn: ["hsn", "zh"], icl: ["icl", "sgn"], ils: ["ils", "sgn"], inl: ["inl", "sgn"], ins: ["ins", "sgn"], ise: ["ise", "sgn"], isg: ["isg", "sgn"], isr: ["isr", "sgn"], jak: ["jak", "ms"], jax: ["jax", "ms"], jcs: ["jcs", "sgn"], jhs: ["jhs", "sgn"], jls: ["jls", "sgn"], jos: ["jos", "sgn"], jsl: ["jsl", "sgn"], jus: ["jus", "sgn"], kgi: ["kgi", "sgn"], knn: ["knn", "kok"], kvb: ["kvb", "ms"], kvk: ["kvk", "sgn"], kvr: ["kvr", "ms"], kxd: ["kxd", "ms"], lbs: ["lbs", "sgn"], lce: ["lce", "ms"], lcf: ["lcf", "ms"], liw: ["liw", "ms"], lls: ["lls", "sgn"], lsg: ["lsg", "sgn"], lsl: ["lsl", "sgn"], lso: ["lso", "sgn"], lsp: ["lsp", "sgn"], lst: ["lst", "sgn"], lsy: ["lsy", "sgn"], ltg: ["ltg", "lv"], lvs: ["lvs", "lv"], lzh: ["lzh", "zh"], max: ["max", "ms"], mdl: ["mdl", "sgn"], meo: ["meo", "ms"], mfa: ["mfa", "ms"], mfb: ["mfb", "ms"], mfs: ["mfs", "sgn"], min: ["min", "ms"], mnp: ["mnp", "zh"], mqg: ["mqg", "ms"], mre: ["mre", "sgn"], msd: ["msd", "sgn"], msi: ["msi", "ms"], msr: ["msr", "sgn"], mui: ["mui", "ms"], mzc: ["mzc", "sgn"], mzg: ["mzg", "sgn"], mzy: ["mzy", "sgn"], nan: ["nan", "zh"], nbs: ["nbs", "sgn"], ncs: ["ncs", "sgn"], nsi: ["nsi", "sgn"], nsl: ["nsl", "sgn"], nsp: ["nsp", "sgn"], nsr: ["nsr", "sgn"], nzs: ["nzs", "sgn"], okl: ["okl", "sgn"], orn: ["orn", "ms"], ors: ["ors", "ms"], pel: ["pel", "ms"], pga: ["pga", "ar"], pks: ["pks", "sgn"], prl: ["prl", "sgn"], prz: ["prz", "sgn"], psc: ["psc", "sgn"], psd: ["psd", "sgn"], pse: ["pse", "ms"], psg: ["psg", "sgn"], psl: ["psl", "sgn"], pso: ["pso", "sgn"], psp: ["psp", "sgn"], psr: ["psr", "sgn"], pys: ["pys", "sgn"], rms: ["rms", "sgn"], rsi: ["rsi", "sgn"], rsl: ["rsl", "sgn"], sdl: ["sdl", "sgn"], sfb: ["sfb", "sgn"], sfs: ["sfs", "sgn"], sgg: ["sgg", "sgn"], sgx: ["sgx", "sgn"], shu: ["shu", "ar"], slf: ["slf", "sgn"], sls: ["sls", "sgn"], sqk: ["sqk", "sgn"], sqs: ["sqs", "sgn"], ssh: ["ssh", "ar"], ssp: ["ssp", "sgn"], ssr: ["ssr", "sgn"], svk: ["svk", "sgn"], swc: ["swc", "sw"], swh: ["swh", "sw"], swl: ["swl", "sgn"], syy: ["syy", "sgn"], tmw: ["tmw", "ms"], tse: ["tse", "sgn"], tsm: ["tsm", "sgn"], tsq: ["tsq", "sgn"], tss: ["tss", "sgn"], tsy: ["tsy", "sgn"], tza: ["tza", "sgn"], ugn: ["ugn", "sgn"], ugy: ["ugy", "sgn"], ukl: ["ukl", "sgn"], uks: ["uks", "sgn"], urk: ["urk", "ms"], uzn: ["uzn", "uz"], uzs: ["uzs", "uz"], vgt: ["vgt", "sgn"], vkk: ["vkk", "ms"], vkt: ["vkt", "ms"], vsi: ["vsi", "sgn"], vsl: ["vsl", "sgn"], vsv: ["vsv", "sgn"], wuu: ["wuu", "zh"], xki: ["xki", "sgn"], xml: ["xml", "sgn"], xmm: ["xmm", "ms"], xms: ["xms", "sgn"], yds: ["yds", "sgn"], ysl: ["ysl", "sgn"], yue: ["yue", "zh"], zib: ["zib", "sgn"], zlm: ["zlm", "ms"], zmi: ["zmi", "ms"], zsl: ["zsl", "sgn"], zsm: ["zsm", "ms"] } },
	      currencyMinorUnits = { BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 0, CLP: 0, KMF: 0, DJF: 0, XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3, OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0 };(function () {
	    var extlang = "[a-z]{3}(?:-[a-z]{3}){0,2}",
	        language = "(?:[a-z]{2,3}(?:-" + extlang + ")?|[a-z]{4}|[a-z]{5,8})",
	        script = "[a-z]{4}",
	        region = "(?:[a-z]{2}|\\d{3})",
	        variant = "(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})",
	        singleton = "[0-9a-wy-z]",
	        extension = singleton + "(?:-[a-z0-9]{2,8})+",
	        privateuse = "x(?:-[a-z0-9]{1,8})+",
	        irregular = "(?:en-GB-oed" + "|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)" + "|sgn-(?:BE-FR|BE-NL|CH-DE))",
	        regular = "(?:art-lojban|cel-gaulish|no-bok|no-nyn" + "|zh-(?:guoyu|hakka|min|min-nan|xiang))",
	        grandfathered = "(?:" + irregular + "|" + regular + ")",
	        langtag = language + "(?:-" + script + ")?(?:-" + region + ")?(?:-" + variant + ")*(?:-" + extension + ")*(?:-" + privateuse + ")?";expBCP47Syntax = RegExp("^(?:" + langtag + "|" + privateuse + "|" + grandfathered + ")$", "i");expVariantDupes = RegExp("^(?!x).*?-(" + variant + ")-(?:\\w{4,8}-(?!x-))*\\1\\b", "i");expSingletonDupes = RegExp("^(?!x).*?-(" + singleton + ")-(?:\\w+-(?!x-))*\\1\\b", "i");expExtSequences = RegExp("-" + extension, "ig");
	  })();function IsStructurallyValidLanguageTag(locale) {
	    if (!expBCP47Syntax.test(locale)) return false;if (expVariantDupes.test(locale)) return false;if (expSingletonDupes.test(locale)) return false;return true;
	  }function CanonicalizeLanguageTag(locale) {
	    var match, parts;locale = locale.toLowerCase();parts = locale.split("-");for (var i = 1, max = parts.length; i < max; i++) {
	      if (parts[i].length === 2) parts[i] = parts[i].toUpperCase();else if (parts[i].length === 4) parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);else if (parts[i].length === 1 && parts[i] != "x") break;
	    }locale = arrJoin.call(parts, "-");if ((match = locale.match(expExtSequences)) && match.length > 1) {
	      match.sort();locale = locale.replace(RegExp("(?:" + expExtSequences.source + ")+", "i"), arrJoin.call(match, ""));
	    }if (hop.call(redundantTags.tags, locale)) locale = redundantTags.tags[locale];parts = locale.split("-");for (var i = 1, max = parts.length; i < max; i++) {
	      if (hop.call(redundantTags.subtags, parts[i])) parts[i] = redundantTags.subtags[parts[i]];else if (hop.call(redundantTags.extLang, parts[i])) {
	        parts[i] = redundantTags.extLang[parts[i]][0];if (i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
	          parts = arrSlice.call(parts, i++);max -= 1;
	        }
	      }
	    }return arrJoin.call(parts, "-");
	  }function DefaultLocale() {
	    return defaultLocale;
	  }function IsWellFormedCurrencyCode(currency) {
	    var c = String(currency),
	        normalized = toLatinUpperCase(c);if (expCurrencyCode.test(normalized) === false) return false;return true;
	  }function CanonicalizeLocaleList(locales) {
	    if (locales === undefined) return new List();var seen = new List(),
	        locales = typeof locales === "string" ? [locales] : locales,
	        O = toObject(locales),
	        len = O.length,
	        k = 0;while (k < len) {
	      var Pk = String(k),
	          kPresent = Pk in O;if (kPresent) {
	        var kValue = O[Pk];if (kValue == null || typeof kValue !== "string" && (typeof kValue === "undefined" ? "undefined" : _typeof(kValue)) !== "object") throw new TypeError("String or Object type expected");var tag = String(kValue);if (!IsStructurallyValidLanguageTag(tag)) throw new RangeError("'" + tag + "' is not a structurally valid language tag");tag = CanonicalizeLanguageTag(tag);if (arrIndexOf.call(seen, tag) === -1) arrPush.call(seen, tag);
	      }k++;
	    }return seen;
	  }function BestAvailableLocale(availableLocales, locale) {
	    var candidate = locale;while (true) {
	      if (arrIndexOf.call(availableLocales, candidate) > -1) return candidate;var pos = candidate.lastIndexOf("-");if (pos < 0) return;if (pos >= 2 && candidate.charAt(pos - 2) == "-") pos -= 2;candidate = candidate.substring(0, pos);
	    }
	  }function LookupMatcher(availableLocales, requestedLocales) {
	    var i = 0,
	        len = requestedLocales.length,
	        availableLocale;while (i < len && !availableLocale) {
	      var locale = requestedLocales[i],
	          noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ""),
	          availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);i++;
	    }var result = new Record();if (availableLocale !== undefined) {
	      result["[[locale]]"] = availableLocale;if (String(locale) !== String(noExtensionsLocale)) {
	        var extension = locale.match(expUnicodeExSeq)[0],
	            extensionIndex = locale.indexOf("-u-");result["[[extension]]"] = extension;result["[[extensionIndex]]"] = extensionIndex;
	      }
	    } else result["[[locale]]"] = DefaultLocale();return result;
	  }function BestFitMatcher(availableLocales, requestedLocales) {
	    return LookupMatcher(availableLocales, requestedLocales);
	  }function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
	    if (availableLocales.length === 0) {
	      throw new ReferenceError("No locale data has been provided for this object yet.");
	    }var matcher = options["[[localeMatcher]]"];if (matcher === "lookup") var r = LookupMatcher(availableLocales, requestedLocales);else var r = BestFitMatcher(availableLocales, requestedLocales);var foundLocale = r["[[locale]]"];if (hop.call(r, "[[extension]]")) var extension = r["[[extension]]"],
	        extensionIndex = r["[[extensionIndex]]"],
	        split = String.prototype.split,
	        extensionSubtags = split.call(extension, "-"),
	        extensionSubtagsLength = extensionSubtags.length;var result = new Record();result["[[dataLocale]]"] = foundLocale;var supportedExtension = "-u",
	        i = 0,
	        len = relevantExtensionKeys.length;while (i < len) {
	      var key = relevantExtensionKeys[i],
	          foundLocaleData = localeData[foundLocale],
	          keyLocaleData = foundLocaleData[key],
	          value = keyLocaleData["0"],
	          supportedExtensionAddition = "",
	          indexOf = arrIndexOf;if (extensionSubtags !== undefined) {
	        var keyPos = indexOf.call(extensionSubtags, key);if (keyPos !== -1) {
	          if (keyPos + 1 < extensionSubtagsLength && extensionSubtags[keyPos + 1].length > 2) {
	            var requestedValue = extensionSubtags[keyPos + 1],
	                valuePos = indexOf.call(keyLocaleData, requestedValue);if (valuePos !== -1) var value = requestedValue,
	                supportedExtensionAddition = "-" + key + "-" + value;
	          } else {
	            var valuePos = indexOf(keyLocaleData, "true");if (valuePos !== -1) var value = "true";
	          }
	        }
	      }if (hop.call(options, "[[" + key + "]]")) {
	        var optionsValue = options["[[" + key + "]]"];if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
	          if (optionsValue !== value) {
	            value = optionsValue;supportedExtensionAddition = "";
	          }
	        }
	      }result["[[" + key + "]]"] = value;supportedExtension += supportedExtensionAddition;i++;
	    }if (supportedExtension.length > 2) {
	      var preExtension = foundLocale.substring(0, extensionIndex),
	          postExtension = foundLocale.substring(extensionIndex),
	          foundLocale = preExtension + supportedExtension + postExtension;
	    }result["[[locale]]"] = foundLocale;return result;
	  }function LookupSupportedLocales(availableLocales, requestedLocales) {
	    var len = requestedLocales.length,
	        subset = new List(),
	        k = 0;while (k < len) {
	      var locale = requestedLocales[k],
	          noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ""),
	          availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);if (availableLocale !== undefined) arrPush.call(subset, locale);k++;
	    }var subsetArray = arrSlice.call(subset);return subsetArray;
	  }function BestFitSupportedLocales(availableLocales, requestedLocales) {
	    return LookupSupportedLocales(availableLocales, requestedLocales);
	  }function SupportedLocales(availableLocales, requestedLocales, options) {
	    if (options !== undefined) {
	      var options = new Record(toObject(options)),
	          matcher = options.localeMatcher;if (matcher !== undefined) {
	        matcher = String(matcher);if (matcher !== "lookup" && matcher !== "best fit") throw new RangeError('matcher should be "lookup" or "best fit"');
	      }
	    }if (matcher === undefined || matcher === "best fit") var subset = BestFitSupportedLocales(availableLocales, requestedLocales);else var subset = LookupSupportedLocales(availableLocales, requestedLocales);for (var P in subset) {
	      if (!hop.call(subset, P)) continue;defineProperty(subset, P, { writable: false, configurable: false, value: subset[P] });
	    }defineProperty(subset, "length", { writable: false });return subset;
	  }function GetOption(options, property, type, values, fallback) {
	    var value = options[property];if (value !== undefined) {
	      value = type === "boolean" ? Boolean(value) : type === "string" ? String(value) : value;if (values !== undefined) {
	        if (arrIndexOf.call(values, value) === -1) throw new RangeError("'" + value + "' is not an allowed value for `" + property + "`");
	      }return value;
	    }return fallback;
	  }function GetNumberOption(options, property, minimum, maximum, fallback) {
	    var value = options[property];if (value !== undefined) {
	      value = Number(value);if (isNaN(value) || value < minimum || value > maximum) throw new RangeError("Value is not a number or outside accepted range");return Math.floor(value);
	    }return fallback;
	  }function NumberFormatConstructor() {
	    var locales = arguments[0];var options = arguments[1];if (!this || this === Intl) {
	      return new Intl.NumberFormat(locales, options);
	    }return InitializeNumberFormat(toObject(this), locales, options);
	  }defineProperty(Intl, "NumberFormat", { configurable: true, writable: true, value: NumberFormatConstructor });defineProperty(Intl.NumberFormat, "prototype", { writable: false });function InitializeNumberFormat(numberFormat, locales, options) {
	    var internal = getInternalProperties(numberFormat),
	        regexpState = createRegExpRestore();if (internal["[[initializedIntlObject]]"] === true) throw new TypeError("`this` object has already been initialized as an Intl object");defineProperty(numberFormat, "__getInternalProperties", { value: function value() {
	        if (arguments[0] === secret) return internal;
	      } });internal["[[initializedIntlObject]]"] = true;var requestedLocales = CanonicalizeLocaleList(locales);if (options === undefined) options = {};else options = toObject(options);var opt = new Record(),
	        matcher = GetOption(options, "localeMatcher", "string", new List("lookup", "best fit"), "best fit");opt["[[localeMatcher]]"] = matcher;var localeData = internals.NumberFormat["[[localeData]]"],
	        r = ResolveLocale(internals.NumberFormat["[[availableLocales]]"], requestedLocales, opt, internals.NumberFormat["[[relevantExtensionKeys]]"], localeData);internal["[[locale]]"] = r["[[locale]]"];internal["[[numberingSystem]]"] = r["[[nu]]"];internal["[[dataLocale]]"] = r["[[dataLocale]]"];var dataLocale = r["[[dataLocale]]"],
	        s = GetOption(options, "style", "string", new List("decimal", "percent", "currency"), "decimal");internal["[[style]]"] = s;var c = GetOption(options, "currency", "string");if (c !== undefined && !IsWellFormedCurrencyCode(c)) throw new RangeError("'" + c + "' is not a valid currency code");if (s === "currency" && c === undefined) throw new TypeError("Currency code is required when style is currency");if (s === "currency") {
	      c = c.toUpperCase();internal["[[currency]]"] = c;var cDigits = CurrencyDigits(c);
	    }var cd = GetOption(options, "currencyDisplay", "string", new List("code", "symbol", "name"), "symbol");if (s === "currency") internal["[[currencyDisplay]]"] = cd;var mnid = GetNumberOption(options, "minimumIntegerDigits", 1, 21, 1);internal["[[minimumIntegerDigits]]"] = mnid;var mnfdDefault = s === "currency" ? cDigits : 0,
	        mnfd = GetNumberOption(options, "minimumFractionDigits", 0, 20, mnfdDefault);internal["[[minimumFractionDigits]]"] = mnfd;var mxfdDefault = s === "currency" ? Math.max(mnfd, cDigits) : s === "percent" ? Math.max(mnfd, 0) : Math.max(mnfd, 3),
	        mxfd = GetNumberOption(options, "maximumFractionDigits", mnfd, 20, mxfdDefault);internal["[[maximumFractionDigits]]"] = mxfd;var mnsd = options.minimumSignificantDigits,
	        mxsd = options.maximumSignificantDigits;if (mnsd !== undefined || mxsd !== undefined) {
	      mnsd = GetNumberOption(options, "minimumSignificantDigits", 1, 21, 1);mxsd = GetNumberOption(options, "maximumSignificantDigits", mnsd, 21, 21);internal["[[minimumSignificantDigits]]"] = mnsd;internal["[[maximumSignificantDigits]]"] = mxsd;
	    }var g = GetOption(options, "useGrouping", "boolean", undefined, true);internal["[[useGrouping]]"] = g;var dataLocaleData = localeData[dataLocale],
	        patterns = dataLocaleData.patterns;var stylePatterns = patterns[s];internal["[[positivePattern]]"] = stylePatterns.positivePattern;internal["[[negativePattern]]"] = stylePatterns.negativePattern;internal["[[boundFormat]]"] = undefined;internal["[[initializedNumberFormat]]"] = true;if (es3) numberFormat.format = GetFormatNumber.call(numberFormat);regexpState.exp.test(regexpState.input);return numberFormat;
	  }function CurrencyDigits(currency) {
	    return currencyMinorUnits[currency] !== undefined ? currencyMinorUnits[currency] : 2;
	  }internals.NumberFormat = { "[[availableLocales]]": [], "[[relevantExtensionKeys]]": ["nu"], "[[localeData]]": {} };defineProperty(Intl.NumberFormat, "supportedLocalesOf", { configurable: true, writable: true, value: fnBind.call(supportedLocalesOf, internals.NumberFormat) });defineProperty(Intl.NumberFormat.prototype, "format", { configurable: true, get: GetFormatNumber });function GetFormatNumber() {
	    var internal = this != null && _typeof(this) === "object" && getInternalProperties(this);if (!internal || !internal["[[initializedNumberFormat]]"]) throw new TypeError("`this` value for format() is not an initialized Intl.NumberFormat object.");if (internal["[[boundFormat]]"] === undefined) {
	      var F = function F(value) {
	        return FormatNumber(this, Number(value));
	      },
	          bf = fnBind.call(F, this);internal["[[boundFormat]]"] = bf;
	    }return internal["[[boundFormat]]"];
	  }function FormatNumber(numberFormat, x) {
	    var n,
	        regexpState = createRegExpRestore(),
	        internal = getInternalProperties(numberFormat),
	        locale = internal["[[dataLocale]]"],
	        nums = internal["[[numberingSystem]]"],
	        data = internals.NumberFormat["[[localeData]]"][locale],
	        ild = data.symbols[nums] || data.symbols.latn,
	        negative = false;if (isFinite(x) === false) {
	      if (isNaN(x)) n = ild.nan;else {
	        n = ild.infinity;if (x < 0) negative = true;
	      }
	    } else {
	      if (x < 0) {
	        negative = true;x = -x;
	      }if (internal["[[style]]"] === "percent") x *= 100;if (hop.call(internal, "[[minimumSignificantDigits]]") && hop.call(internal, "[[maximumSignificantDigits]]")) n = ToRawPrecision(x, internal["[[minimumSignificantDigits]]"], internal["[[maximumSignificantDigits]]"]);else n = ToRawFixed(x, internal["[[minimumIntegerDigits]]"], internal["[[minimumFractionDigits]]"], internal["[[maximumFractionDigits]]"]);if (numSys[nums]) {
	        var digits = numSys[internal["[[numberingSystem]]"]];n = String(n).replace(/\d/g, function (digit) {
	          return digits[digit];
	        });
	      } else n = String(n);n = n.replace(/\./g, ild.decimal);if (internal["[[useGrouping]]"] === true) {
	        var parts = n.split(ild.decimal),
	            igr = parts[0],
	            pgSize = data.patterns.primaryGroupSize || 3,
	            sgSize = data.patterns.secondaryGroupSize || pgSize;if (igr.length > pgSize) {
	          var groups = new List(),
	              end = igr.length - pgSize,
	              idx = end % sgSize,
	              start = igr.slice(0, idx);if (start.length) arrPush.call(groups, start);while (idx < end) {
	            arrPush.call(groups, igr.slice(idx, idx + sgSize));idx += sgSize;
	          }arrPush.call(groups, igr.slice(end));parts[0] = arrJoin.call(groups, ild.group);
	        }n = arrJoin.call(parts, ild.decimal);
	      }
	    }var result = internal[negative === true ? "[[negativePattern]]" : "[[positivePattern]]"];result = result.replace("{number}", n);if (internal["[[style]]"] === "currency") {
	      var cd,
	          currency = internal["[[currency]]"],
	          cData = data.currencies[currency];switch (internal["[[currencyDisplay]]"]) {case "symbol":
	          cd = cData || currency;break;default:case "code":case "name":
	          cd = currency;}result = result.replace("{currency}", cd);
	    }regexpState.exp.test(regexpState.input);return result;
	  }function ToRawPrecision(x, minPrecision, maxPrecision) {
	    var p = maxPrecision;if (x === 0) {
	      var m = arrJoin.call(Array(p + 1), "0"),
	          e = 0;
	    } else {
	      var e = Math.floor(Math.log(Math.abs(x)) / Math.LN10),
	          f = Math.round(Math.exp(Math.abs(e - p + 1) * Math.LN10)),
	          m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
	    }if (e >= p) return m + arrJoin.call(Array(e - p + 1 + 1), "0");else if (e === p - 1) return m;else if (e >= 0) m = m.slice(0, e + 1) + "." + m.slice(e + 1);else if (e < 0) m = "0." + arrJoin.call(Array(-(e + 1) + 1), "0") + m;if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
	      var cut = maxPrecision - minPrecision;while (cut > 0 && m.charAt(m.length - 1) === "0") {
	        m = m.slice(0, -1);cut--;
	      }if (m.charAt(m.length - 1) === ".") m = m.slice(0, -1);
	    }return m;
	  }function ToRawFixed(x, minInteger, minFraction, maxFraction) {
	    var idx,
	        m = Number.prototype.toFixed.call(x, maxFraction),
	        igr = m.split(".")[0].length,
	        cut = maxFraction - minFraction,
	        exp = (idx = m.indexOf("e")) > -1 ? m.slice(idx + 1) : 0;if (exp) {
	      m = m.slice(0, idx).replace(".", "");m += arrJoin.call(Array(exp - (m.length - 1) + 1), "0") + "." + arrJoin.call(Array(maxFraction + 1), "0");igr = m.length;
	    }while (cut > 0 && m.slice(-1) === "0") {
	      m = m.slice(0, -1);cut--;
	    }if (m.slice(-1) === ".") m = m.slice(0, -1);if (igr < minInteger) var z = arrJoin.call(Array(minInteger - igr + 1), "0");return (z ? z : "") + m;
	  }var numSys = { arab: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], arabext: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], bali: ["᭐", "᭑", "᭒", "᭓", "᭔", "᭕", "᭖", "᭗", "᭘", "᭙"], beng: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"], deva: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], fullwide: ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"], gujr: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"], guru: ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯"], hanidec: ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"], khmr: ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"], knda: ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"], laoo: ["໐", "໑", "໒", "໓", "໔", "໕", "໖", "໗", "໘", "໙"], latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], limb: ["᥆", "᥇", "᥈", "᥉", "᥊", "᥋", "᥌", "᥍", "᥎", "᥏"], mlym: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"], mong: ["᠐", "᠑", "᠒", "᠓", "᠔", "᠕", "᠖", "᠗", "᠘", "᠙"], mymr: ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"], orya: ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"], tamldec: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"], telu: ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯"], thai: ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"], tibt: ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"] };defineProperty(Intl.NumberFormat.prototype, "resolvedOptions", { configurable: true, writable: true, value: function value() {
	      var prop,
	          descs = new Record(),
	          props = ["locale", "numberingSystem", "style", "currency", "currencyDisplay", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "useGrouping"],
	          internal = this != null && _typeof(this) === "object" && getInternalProperties(this);if (!internal || !internal["[[initializedNumberFormat]]"]) throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.");for (var i = 0, max = props.length; i < max; i++) {
	        if (hop.call(internal, prop = "[[" + props[i] + "]]")) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	      }return objCreate({}, descs);
	    } });function DateTimeFormatConstructor() {
	    var locales = arguments[0];var options = arguments[1];if (!this || this === Intl) {
	      return new Intl.DateTimeFormat(locales, options);
	    }return InitializeDateTimeFormat(toObject(this), locales, options);
	  }defineProperty(Intl, "DateTimeFormat", { configurable: true, writable: true, value: DateTimeFormatConstructor });defineProperty(DateTimeFormatConstructor, "prototype", { writable: false });function InitializeDateTimeFormat(dateTimeFormat, locales, options) {
	    var internal = getInternalProperties(dateTimeFormat),
	        regexpState = createRegExpRestore();if (internal["[[initializedIntlObject]]"] === true) throw new TypeError("`this` object has already been initialized as an Intl object");defineProperty(dateTimeFormat, "__getInternalProperties", { value: function value() {
	        if (arguments[0] === secret) return internal;
	      } });internal["[[initializedIntlObject]]"] = true;var requestedLocales = CanonicalizeLocaleList(locales),
	        options = ToDateTimeOptions(options, "any", "date"),
	        opt = new Record();matcher = GetOption(options, "localeMatcher", "string", new List("lookup", "best fit"), "best fit");opt["[[localeMatcher]]"] = matcher;var DateTimeFormat = internals.DateTimeFormat,
	        localeData = DateTimeFormat["[[localeData]]"],
	        r = ResolveLocale(DateTimeFormat["[[availableLocales]]"], requestedLocales, opt, DateTimeFormat["[[relevantExtensionKeys]]"], localeData);internal["[[locale]]"] = r["[[locale]]"];internal["[[calendar]]"] = r["[[ca]]"];internal["[[numberingSystem]]"] = r["[[nu]]"];internal["[[dataLocale]]"] = r["[[dataLocale]]"];var dataLocale = r["[[dataLocale]]"],
	        tz = options.timeZone;if (tz !== undefined) {
	      tz = toLatinUpperCase(tz);if (tz !== "UTC") throw new RangeError("timeZone is not supported.");
	    }internal["[[timeZone]]"] = tz;opt = new Record();for (var prop in dateTimeComponents) {
	      if (!hop.call(dateTimeComponents, prop)) continue;var value = GetOption(options, prop, "string", dateTimeComponents[prop]);opt["[[" + prop + "]]"] = value;
	    }var bestFormat,
	        dataLocaleData = localeData[dataLocale],
	        formats = dataLocaleData.formats,
	        matcher = GetOption(options, "formatMatcher", "string", new List("basic", "best fit"), "best fit");if (matcher === "basic") bestFormat = BasicFormatMatcher(opt, formats);else bestFormat = BestFitFormatMatcher(opt, formats);for (var prop in dateTimeComponents) {
	      if (!hop.call(dateTimeComponents, prop)) continue;if (hop.call(bestFormat, prop)) {
	        var p = bestFormat[prop];internal["[[" + prop + "]]"] = p;
	      }
	    }var pattern,
	        hr12 = GetOption(options, "hour12", "boolean");if (internal["[[hour]]"]) {
	      hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;internal["[[hour12]]"] = hr12;if (hr12 === true) {
	        var hourNo0 = dataLocaleData.hourNo0;internal["[[hourNo0]]"] = hourNo0;pattern = bestFormat.pattern12;
	      } else pattern = bestFormat.pattern;
	    } else pattern = bestFormat.pattern;internal["[[pattern]]"] = pattern;internal["[[boundFormat]]"] = undefined;internal["[[initializedDateTimeFormat]]"] = true;if (es3) dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);regexpState.exp.test(regexpState.input);return dateTimeFormat;
	  }var dateTimeComponents = { weekday: ["narrow", "short", "long"], era: ["narrow", "short", "long"], year: ["2-digit", "numeric"], month: ["2-digit", "numeric", "narrow", "short", "long"], day: ["2-digit", "numeric"], hour: ["2-digit", "numeric"], minute: ["2-digit", "numeric"], second: ["2-digit", "numeric"], timeZoneName: ["short", "long"] };function ToDateTimeOptions(options, required, defaults) {
	    if (options === undefined) options = null;else {
	      var opt2 = toObject(options);options = new Record();for (var k in opt2) {
	        options[k] = opt2[k];
	      }
	    }var create = objCreate,
	        options = create(options),
	        needDefaults = true;if (required === "date" || required === "any") {
	      if (options.weekday !== undefined || options.year !== undefined || options.month !== undefined || options.day !== undefined) needDefaults = false;
	    }if (required === "time" || required === "any") {
	      if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined) needDefaults = false;
	    }if (needDefaults && (defaults === "date" || defaults === "all")) options.year = options.month = options.day = "numeric";if (needDefaults && (defaults === "time" || defaults === "all")) options.hour = options.minute = options.second = "numeric";return options;
	  }function BasicFormatMatcher(options, formats) {
	    var removalPenalty = 120,
	        additionPenalty = 20,
	        longLessPenalty = 8,
	        longMorePenalty = 6,
	        shortLessPenalty = 6,
	        shortMorePenalty = 3,
	        bestScore = -Infinity,
	        bestFormat,
	        i = 0,
	        len = formats.length;while (i < len) {
	      var format = formats[i],
	          score = 0;for (var property in dateTimeComponents) {
	        if (!hop.call(dateTimeComponents, property)) continue;var optionsProp = options["[[" + property + "]]"],
	            formatProp = hop.call(format, property) ? format[property] : undefined;if (optionsProp === undefined && formatProp !== undefined) score -= additionPenalty;else if (optionsProp !== undefined && formatProp === undefined) score -= removalPenalty;else {
	          var values = ["2-digit", "numeric", "narrow", "short", "long"],
	              optionsPropIndex = arrIndexOf.call(values, optionsProp),
	              formatPropIndex = arrIndexOf.call(values, formatProp),
	              delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);if (delta === 2) score -= longMorePenalty;else if (delta === 1) score -= shortMorePenalty;else if (delta === -1) score -= shortLessPenalty;else if (delta === -2) score -= longLessPenalty;
	        }
	      }if (score > bestScore) {
	        bestScore = score;bestFormat = format;
	      }i++;
	    }return bestFormat;
	  }function BestFitFormatMatcher(options, formats) {
	    return BasicFormatMatcher(options, formats);
	  }internals.DateTimeFormat = { "[[availableLocales]]": [], "[[relevantExtensionKeys]]": ["ca", "nu"], "[[localeData]]": {} };defineProperty(Intl.DateTimeFormat, "supportedLocalesOf", { configurable: true, writable: true, value: fnBind.call(supportedLocalesOf, internals.DateTimeFormat) });defineProperty(Intl.DateTimeFormat.prototype, "format", { configurable: true, get: GetFormatDateTime });function GetFormatDateTime() {
	    var internal = this != null && _typeof(this) === "object" && getInternalProperties(this);if (!internal || !internal["[[initializedDateTimeFormat]]"]) throw new TypeError("`this` value for format() is not an initialized Intl.DateTimeFormat object.");if (internal["[[boundFormat]]"] === undefined) {
	      var F = function F() {
	        var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);return FormatDateTime(this, x);
	      },
	          bf = fnBind.call(F, this);internal["[[boundFormat]]"] = bf;
	    }return internal["[[boundFormat]]"];
	  }function FormatDateTime(dateTimeFormat, x) {
	    if (!isFinite(x)) throw new RangeError("Invalid valid date passed to format");var internal = dateTimeFormat.__getInternalProperties(secret),
	        regexpState = createRegExpRestore(),
	        locale = internal["[[locale]]"],
	        nf = new Intl.NumberFormat([locale], { useGrouping: false }),
	        nf2 = new Intl.NumberFormat([locale], { minimumIntegerDigits: 2, useGrouping: false }),
	        tm = ToLocalTime(x, internal["[[calendar]]"], internal["[[timeZone]]"]),
	        result = internal["[[pattern]]"],
	        dataLocale = internal["[[dataLocale]]"],
	        localeData = internals.DateTimeFormat["[[localeData]]"][dataLocale].calendars,
	        ca = internal["[[calendar]]"];for (var p in dateTimeComponents) {
	      if (hop.call(internal, "[[" + p + "]]")) {
	        var pm,
	            fv,
	            f = internal["[[" + p + "]]"],
	            v = tm["[[" + p + "]]"];if (p === "year" && v <= 0) v = 1 - v;else if (p === "month") v++;else if (p === "hour" && internal["[[hour12]]"] === true) {
	          v = v % 12;pm = v !== tm["[[" + p + "]]"];if (v === 0 && internal["[[hourNo0]]"] === true) v = 12;
	        }if (f === "numeric") fv = FormatNumber(nf, v);else if (f === "2-digit") {
	          fv = FormatNumber(nf2, v);if (fv.length > 2) fv = fv.slice(-2);
	        } else if (f in dateWidths) {
	          switch (p) {case "month":
	              fv = resolveDateString(localeData, ca, "months", f, tm["[[" + p + "]]"]);break;case "weekday":
	              try {
	                fv = resolveDateString(localeData, ca, "days", f, tm["[[" + p + "]]"]);
	              } catch (e) {
	                throw new Error("Could not find weekday data for locale " + locale);
	              }break;case "timeZoneName":
	              fv = "";break;default:
	              fv = tm["[[" + p + "]]"];}
	        }result = result.replace("{" + p + "}", fv);
	      }
	    }if (internal["[[hour12]]"] === true) {
	      fv = resolveDateString(localeData, ca, "dayPeriods", pm ? "pm" : "am");result = result.replace("{ampm}", fv);
	    }regexpState.exp.test(regexpState.input);return result;
	  }function ToLocalTime(date, calendar, timeZone) {
	    var d = new Date(date),
	        m = "get" + (timeZone || "");
	    return new Record({ "[[weekday]]": d[m + "Day"](), "[[era]]": +(d[m + "FullYear"]() >= 0), "[[year]]": d[m + "FullYear"](), "[[month]]": d[m + "Month"](), "[[day]]": d[m + "Date"](), "[[hour]]": d[m + "Hours"](), "[[minute]]": d[m + "Minutes"](), "[[second]]": d[m + "Seconds"](), "[[inDST]]": false });
	  }defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", { writable: true, configurable: true, value: function value() {
	      var prop,
	          descs = new Record(),
	          props = ["locale", "calendar", "numberingSystem", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"],
	          internal = this != null && _typeof(this) === "object" && getInternalProperties(this);if (!internal || !internal["[[initializedDateTimeFormat]]"]) throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.");for (var i = 0, max = props.length; i < max; i++) {
	        if (hop.call(internal, prop = "[[" + props[i] + "]]")) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	      }return objCreate({}, descs);
	    } });if (tls) {
	    defineProperty(Number.prototype, "toLocaleString", { writable: true, configurable: true, value: function value() {
	        if (Object.prototype.toString.call(this) !== "[object Number]") throw new TypeError("`this` value must be a number for Number.prototype.toLocaleString()");return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
	      } });defineProperty(Date.prototype, "toLocaleString", { writable: true, configurable: true, value: function value() {
	        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleString()");var x = +this;if (isNaN(x)) return "Invalid Date";var locales = arguments[0],
	            options = arguments[1],
	            options = ToDateTimeOptions(options, "any", "all"),
	            dateTimeFormat = new DateTimeFormatConstructor(locales, options);return FormatDateTime(dateTimeFormat, x);
	      } });defineProperty(Date.prototype, "toLocaleDateString", { writable: true, configurable: true, value: function value() {
	        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleDateString()");var x = +this;if (isNaN(x)) return "Invalid Date";var locales = arguments[0],
	            options = arguments[1],
	            options = ToDateTimeOptions(options, "date", "date"),
	            dateTimeFormat = new DateTimeFormatConstructor(locales, options);return FormatDateTime(dateTimeFormat, x);
	      } });defineProperty(Date.prototype, "toLocaleTimeString", { writable: true, configurable: true, value: function value() {
	        if (Object.prototype.toString.call(this) !== "[object Date]") throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleTimeString()");var x = +this;if (isNaN(x)) return "Invalid Date";var locales = arguments[0],
	            options = arguments[1],
	            options = ToDateTimeOptions(options, "time", "time"),
	            dateTimeFormat = new DateTimeFormatConstructor(locales, options);return FormatDateTime(dateTimeFormat, x);
	      } });
	  }defineProperty(Intl, "__addLocaleData", { value: function value(data) {
	      if (!IsStructurallyValidLanguageTag(data.locale)) throw new Error("Object passed doesn't identify itself with a valid language tag");addLocaleData(data, data.locale);
	    } });function addLocaleData(data, tag) {
	    if (!data.number) throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");var locale,
	        locales = [tag],
	        parts = tag.split("-");if (parts.length > 2 && parts[1].length == 4) arrPush.call(locales, parts[0] + "-" + parts[2]);while (locale = arrShift.call(locales)) {
	      arrPush.call(internals.NumberFormat["[[availableLocales]]"], locale);internals.NumberFormat["[[localeData]]"][locale] = data.number;if (data.date) {
	        data.date.nu = data.number.nu;arrPush.call(internals.DateTimeFormat["[[availableLocales]]"], locale);internals.DateTimeFormat["[[localeData]]"][locale] = data.date;
	      }
	    }if (defaultLocale === undefined) defaultLocale = tag;if (!numberFormatProtoInitialised) {
	      InitializeNumberFormat(Intl.NumberFormat.prototype);numberFormatProtoInitialised = true;
	    }if (data.date && !dateTimeFormatProtoInitialised) {
	      InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);dateTimeFormatProtoInitialised = true;
	    }
	  }function supportedLocalesOf(locales) {
	    if (!hop.call(this, "[[availableLocales]]")) throw new TypeError("supportedLocalesOf() is not a constructor");var regexpState = createRegExpRestore(),
	        options = arguments[1],
	        availableLocales = this["[[availableLocales]]"],
	        requestedLocales = CanonicalizeLocaleList(locales);regexpState.exp.test(regexpState.input);return SupportedLocales(availableLocales, requestedLocales, options);
	  }function resolveDateString(data, ca, component, width, key) {
	    var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component],
	        alts = { narrow: ["short", "long"], "short": ["long", "narrow"], "long": ["short", "narrow"] },
	        resolved = hop.call(obj, width) ? obj[width] : hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];return key != null ? resolved[key] : resolved;
	  }Record.prototype = objCreate(null);function Record(obj) {
	    for (var k in obj) {
	      if (obj instanceof Record || hop.call(obj, k)) defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
	    }
	  }List.prototype = objCreate(null);function List() {
	    defineProperty(this, "length", { writable: true, value: 0 });if (arguments.length) arrPush.apply(this, arrSlice.call(arguments));
	  }function createRegExpRestore() {
	    var esc = /[.?*+^$[\]\\(){}|-]/g,
	        lm = RegExp.lastMatch,
	        ml = RegExp.multiline ? "m" : "",
	        ret = { input: RegExp.input },
	        reg = new List(),
	        has = false,
	        cap = {};for (var i = 1; i <= 9; i++) {
	      has = (cap["$" + i] = RegExp["$" + i]) || has;
	    }lm = lm.replace(esc, "\\$&");if (has) {
	      for (var i = 1; i <= 9; i++) {
	        var m = cap["$" + i];if (!m) lm = "()" + lm;else {
	          m = m.replace(esc, "\\$&");lm = lm.replace(m, "(" + m + ")");
	        }arrPush.call(reg, lm.slice(0, lm.indexOf("(") + 1));lm = lm.slice(lm.indexOf("(") + 1);
	      }
	    }ret.exp = new RegExp(arrJoin.call(reg, "") + lm, ml);return ret;
	  }function toLatinUpperCase(str) {
	    var i = str.length;while (i--) {
	      var ch = str.charAt(i);if (ch >= "a" && ch <= "z") str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
	    }return str;
	  }function toObject(arg) {
	    if (arg == null) throw new TypeError("Cannot convert null or undefined to object");return Object(arg);
	  }function getInternalProperties(obj) {
	    if (hop.call(obj, "__getInternalProperties")) return obj.__getInternalProperties(secret);else return objCreate(null);
	  }(function () {
	    var a = ["gregory", "buddhist", "chinese", "coptic", "ethioaa", "ethiopic", "generic", "hebrew", "indian", "islamic", "japanese", "persian", "roc", "short", "numeric", "2-digit", "{weekday}, {month} {day}, {year}, {hour}:{minute}:{second}", "{weekday}, {month} {day}, {year}, {hour}:{minute}:{second} {ampm}", "{weekday}, {month} {day}, {year}", "{month} {day}, {year}", "{month}/{day}/{year}", "{month}/{year}", "{month} {year}", "{month} {day}", "{month}/{day}", "{hour}:{minute}:{second}", "{hour}:{minute}:{second} {ampm}", "{hour}:{minute}", "{hour}:{minute} {ampm}", "BE", "Mo1", "Mo2", "Mo3", "Mo4", "Mo5", "Mo6", "Mo7", "Mo8", "Mo9", "Mo10", "Mo11", "Mo12", "Month1", "Month2", "Month3", "Month4", "Month5", "Month6", "Month7", "Month8", "Month9", "Month10", "Month11", "Month12", "Tout", "Baba", "Hator", "Kiahk", "Toba", "Amshir", "Baramhat", "Baramouda", "Bashans", "Paona", "Epep", "Mesra", "Nasie", "ERA0", "ERA1", "Meskerem", "Tekemt", "Hedar", "Tahsas", "Ter", "Yekatit", "Megabit", "Miazia", "Genbot", "Sene", "Hamle", "Nehasse", "Pagumen", "M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "B", "A", "BC", "AD", "BCE", "CE", "Before Christ", "Anno Domini", "Before Common Era", "Common Era", "AM", "PM", "Tishri", "Heshvan", "Kislev", "Tevet", "Shevat", "Adar I", "Adar", "Nisan", "Iyar", "Sivan", "Tamuz", "Av", "Elul", "Adar II", "Chaitra", "Vaisakha", "Jyaistha", "Asadha", "Sravana", "Bhadra", "Asvina", "Kartika", "Agrahayana", "Pausa", "Magha", "Phalguna", "SAKA", "Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H.", "Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah", "AH", "Taika (645-650)", "Hakuchi (650-671)", "Hakuhō (672-686)", "Shuchō (686-701)", "Taihō (701-704)", "Keiun (704-708)", "Wadō (708-715)", "Reiki (715-717)", "Yōrō (717-724)", "Jinki (724-729)", "Tempyō (729-749)", "Tempyō-kampō (749-749)", "Tempyō-shōhō (749-757)", "Tempyō-hōji (757-765)", "Temphō-jingo (765-767)", "Jingo-keiun (767-770)", "Hōki (770-780)", "Ten-ō (781-782)", "Enryaku (782-806)", "Daidō (806-810)", "Kōnin (810-824)", "Tenchō (824-834)", "Jōwa (834-848)", "Kajō (848-851)", "Ninju (851-854)", "Saiko (854-857)", "Tennan (857-859)", "Jōgan (859-877)", "Genkei (877-885)", "Ninna (885-889)", "Kampyō (889-898)", "Shōtai (898-901)", "Engi (901-923)", "Enchō (923-931)", "Shōhei (931-938)", "Tengyō (938-947)", "Tenryaku (947-957)", "Tentoku (957-961)", "Ōwa (961-964)", "Kōhō (964-968)", "Anna (968-970)", "Tenroku (970-973)", "Ten-en (973-976)", "Jōgen (976-978)", "Tengen (978-983)", "Eikan (983-985)", "Kanna (985-987)", "Ei-en (987-989)", "Eiso (989-990)", "Shōryaku (990-995)", "Chōtoku (995-999)", "Chōhō (999-1004)", "Kankō (1004-1012)", "Chōwa (1012-1017)", "Kannin (1017-1021)", "Jian (1021-1024)", "Manju (1024-1028)", "Chōgen (1028-1037)", "Chōryaku (1037-1040)", "Chōkyū (1040-1044)", "Kantoku (1044-1046)", "Eishō (1046-1053)", "Tengi (1053-1058)", "Kōhei (1058-1065)", "Jiryaku (1065-1069)", "Enkyū (1069-1074)", "Shōho (1074-1077)", "Shōryaku (1077-1081)", "Eiho (1081-1084)", "Ōtoku (1084-1087)", "Kanji (1087-1094)", "Kaho (1094-1096)", "Eichō (1096-1097)", "Shōtoku (1097-1099)", "Kōwa (1099-1104)", "Chōji (1104-1106)", "Kashō (1106-1108)", "Tennin (1108-1110)", "Ten-ei (1110-1113)", "Eikyū (1113-1118)", "Gen-ei (1118-1120)", "Hoan (1120-1124)", "Tenji (1124-1126)", "Daiji (1126-1131)", "Tenshō (1131-1132)", "Chōshō (1132-1135)", "Hoen (1135-1141)", "Eiji (1141-1142)", "Kōji (1142-1144)", "Tenyō (1144-1145)", "Kyūan (1145-1151)", "Ninpei (1151-1154)", "Kyūju (1154-1156)", "Hogen (1156-1159)", "Heiji (1159-1160)", "Eiryaku (1160-1161)", "Ōho (1161-1163)", "Chōkan (1163-1165)", "Eiman (1165-1166)", "Nin-an (1166-1169)", "Kaō (1169-1171)", "Shōan (1171-1175)", "Angen (1175-1177)", "Jishō (1177-1181)", "Yōwa (1181-1182)", "Juei (1182-1184)", "Genryuku (1184-1185)", "Bunji (1185-1190)", "Kenkyū (1190-1199)", "Shōji (1199-1201)", "Kennin (1201-1204)", "Genkyū (1204-1206)", "Ken-ei (1206-1207)", "Shōgen (1207-1211)", "Kenryaku (1211-1213)", "Kenpō (1213-1219)", "Shōkyū (1219-1222)", "Jōō (1222-1224)", "Gennin (1224-1225)", "Karoku (1225-1227)", "Antei (1227-1229)", "Kanki (1229-1232)", "Jōei (1232-1233)", "Tempuku (1233-1234)", "Bunryaku (1234-1235)", "Katei (1235-1238)", "Ryakunin (1238-1239)", "En-ō (1239-1240)", "Ninji (1240-1243)", "Kangen (1243-1247)", "Hōji (1247-1249)", "Kenchō (1249-1256)", "Kōgen (1256-1257)", "Shōka (1257-1259)", "Shōgen (1259-1260)", "Bun-ō (1260-1261)", "Kōchō (1261-1264)", "Bun-ei (1264-1275)", "Kenji (1275-1278)", "Kōan (1278-1288)", "Shōō (1288-1293)", "Einin (1293-1299)", "Shōan (1299-1302)", "Kengen (1302-1303)", "Kagen (1303-1306)", "Tokuji (1306-1308)", "Enkei (1308-1311)", "Ōchō (1311-1312)", "Shōwa (1312-1317)", "Bunpō (1317-1319)", "Genō (1319-1321)", "Genkyō (1321-1324)", "Shōchū (1324-1326)", "Kareki (1326-1329)", "Gentoku (1329-1331)", "Genkō (1331-1334)", "Kemmu (1334-1336)", "Engen (1336-1340)", "Kōkoku (1340-1346)", "Shōhei (1346-1370)", "Kentoku (1370-1372)", "Bunchũ (1372-1375)", "Tenju (1375-1379)", "Kōryaku (1379-1381)", "Kōwa (1381-1384)", "Genchũ (1384-1392)", "Meitoku (1384-1387)", "Kakei (1387-1389)", "Kōō (1389-1390)", "Meitoku (1390-1394)", "Ōei (1394-1428)", "Shōchō (1428-1429)", "Eikyō (1429-1441)", "Kakitsu (1441-1444)", "Bun-an (1444-1449)", "Hōtoku (1449-1452)", "Kyōtoku (1452-1455)", "Kōshō (1455-1457)", "Chōroku (1457-1460)", "Kanshō (1460-1466)", "Bunshō (1466-1467)", "Ōnin (1467-1469)", "Bunmei (1469-1487)", "Chōkyō (1487-1489)", "Entoku (1489-1492)", "Meiō (1492-1501)", "Bunki (1501-1504)", "Eishō (1504-1521)", "Taiei (1521-1528)", "Kyōroku (1528-1532)", "Tenmon (1532-1555)", "Kōji (1555-1558)", "Eiroku (1558-1570)", "Genki (1570-1573)", "Tenshō (1573-1592)", "Bunroku (1592-1596)", "Keichō (1596-1615)", "Genwa (1615-1624)", "Kan-ei (1624-1644)", "Shōho (1644-1648)", "Keian (1648-1652)", "Shōō (1652-1655)", "Meiryaku (1655-1658)", "Manji (1658-1661)", "Kanbun (1661-1673)", "Enpō (1673-1681)", "Tenwa (1681-1684)", "Jōkyō (1684-1688)", "Genroku (1688-1704)", "Hōei (1704-1711)", "Shōtoku (1711-1716)", "Kyōhō (1716-1736)", "Genbun (1736-1741)", "Kanpō (1741-1744)", "Enkyō (1744-1748)", "Kan-en (1748-1751)", "Hōryaku (1751-1764)", "Meiwa (1764-1772)", "An-ei (1772-1781)", "Tenmei (1781-1789)", "Kansei (1789-1801)", "Kyōwa (1801-1804)", "Bunka (1804-1818)", "Bunsei (1818-1830)", "Tenpō (1830-1844)", "Kōka (1844-1848)", "Kaei (1848-1854)", "Ansei (1854-1860)", "Man-en (1860-1861)", "Bunkyū (1861-1864)", "Genji (1864-1865)", "Keiō (1865-1868)", "M", "T", "S", "H", "Bunchū (1372-1375)", "Genchū (1384-1392)", "Meiji", "Taishō", "Shōwa", "Heisei", "Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand", "AP", "Before R.O.C.", "Minguo", "latn", "{number}", "-{number}", "{currency}{number}", "-{currency}{number}", "{number}%", "-{number}%", ".", ",", "NaN", "%", "∞", "US$", "¥", "A$", "R$", "CA$", "CN¥", "€", "£", "HK$", "₪", "₹", "₩", "MX$", "NZ$", "฿", "NT$", "₫", "FCFA", "EC$", "CFA", "CFPF", "{weekday} {day} {month} {year}, {hour}:{minute}:{second}", "{weekday} {day} {month} {year}, {hour}:{minute}:{second} {ampm}", "{weekday} {day} {month} {year}", "{day}/{month}/{year}", "{day}/{month}", "{number} {currency}", "-{number} {currency}", "$", "{day} {month} {year}", "{day} {month}", "P", "𐐖", "𐐙", "𐐣", "𐐁", "𐐂", "𐐝", "𐐉", "𐐤", "𐐔", "𐐖𐐰𐑌", "𐐙𐐯𐐺", "𐐣𐐪𐑉", "𐐁𐐹𐑉", "𐐣𐐩", "𐐖𐐭𐑌", "𐐖𐐭𐑊", "𐐂𐑀", "𐐝𐐯𐐹", "𐐉𐐿𐐻", "𐐤𐐬𐑂", "𐐔𐐨𐑅", "𐐖𐐰𐑌𐐷𐐭𐐯𐑉𐐨", "𐐙𐐯𐐺𐑉𐐭𐐯𐑉𐐨", "𐐣𐐪𐑉𐐽", "𐐁𐐹𐑉𐐮𐑊", "𐐖𐐭𐑊𐐴", "𐐂𐑀𐐲𐑅𐐻", "𐐝𐐯𐐹𐐻𐐯𐑋𐐺𐐲𐑉", "𐐉𐐿𐐻𐐬𐐺𐐲𐑉", "𐐤𐐬𐑂𐐯𐑋𐐺𐐲𐑉", "𐐔𐐨𐑅𐐯𐑋𐐺𐐲𐑉", "𐐝𐐲𐑌", "𐐣𐐲𐑌", "𐐓𐐭𐑆", "𐐎𐐯𐑌", "𐐛𐐲𐑉", "𐐙𐑉𐐴", "𐐝𐐰𐐻", "𐐝𐐲𐑌𐐼𐐩", "𐐣𐐲𐑌𐐼𐐩", "𐐓𐐭𐑆𐐼𐐩", "𐐎𐐯𐑌𐑆𐐼𐐩", "𐐛𐐲𐑉𐑆𐐼𐐩", "𐐙𐑉𐐴𐐼𐐩", "𐐝𐐰𐐻𐐲𐑉𐐼𐐩", "𐐒", "𐐈", "𐐒𐐗", "𐐈𐐔", "𐐒𐐲𐑁𐐬𐑉 𐐗𐑉𐐴𐑅𐐻", "𐐈𐑌𐐬 𐐔𐐱𐑋𐐮𐑌𐐨", "𐐈𐐣", "𐐑𐐣", "Nfk", "GB£", "{weekday}, {day} {month} {year} {hour}:{minute}:{second}", "{weekday}, {day} {month} {year} {hour}:{minute}:{second} {ampm}", "{weekday}, {day} {month} {year}", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "am", "pm", "AU$", "GH₵", "D", "{weekday}, {day} {month}, {year}, {hour}:{minute}:{second}", "{weekday}, {day} {month}, {year}, {hour}:{minute}:{second} {ampm}", "{weekday}, {day} {month}, {year}", "{day} {month}, {year}", "Bunchū", "Genchū", "a.m.", "p.m.", "{weekday} {day} {month}, {year}, {hour}:{minute}:{second}", "{weekday} {day} {month}, {year}, {hour}:{minute}:{second} {ampm}", "{weekday} {day} {month}, {year}", "{currency} {number}", "-{currency} {number}", "Ksh", "R", "Ar", "MOP$", "{weekday}, {day} {month} {year}, {hour}:{minute}:{second}", "{weekday}, {day} {month} {year}, {hour}:{minute}:{second} {ampm}", "Rs", "MK", "₦", "K", "₱", "RF", "SR", "Le", "NAf.", "E", "T$", "TSh", "USh", "VT", "WS$", "{year}/{month}/{day}", " "],
	        b = [];b[0] = [[a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]], { weekday: a[13], month: a[13], day: a[14], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[16], pattern12: a[17] }, { weekday: a[13], month: a[13], day: a[14], year: a[14], pattern: a[18] }, { month: a[13], day: a[14], year: a[14], pattern: a[19] }, { month: a[14], day: a[14], year: a[14], pattern: a[20] }, { month: a[14], year: a[14], pattern: a[21] }, { month: a[13], year: a[14], pattern: a[22] }, { month: a[13], day: a[14], pattern: a[23] }, { month: a[14], day: a[14], pattern: a[24] }, { hour: a[14], minute: a[15], second: a[15], pattern: a[25], pattern12: a[26] }, { hour: a[14], minute: a[15], pattern: a[27], pattern12: a[28] }, [a[29]], [a[30], a[31], a[32], a[33], a[34], a[35], a[36], a[37], a[38], a[39], a[40], a[41]], [a[42], a[43], a[44], a[45], a[46], a[47], a[48], a[49], a[50], a[51], a[52], a[53]], [a[54], a[55], a[56], a[57], a[58], a[59], a[60], a[61], a[62], a[63], a[64], a[65], a[66]], [a[67], a[68]], [a[69], a[70], a[71], a[72], a[73], a[74], a[75], a[76], a[77], a[78], a[79], a[80], a[81]], [a[67]], [a[82], a[83], a[84], a[85], a[86], a[87], a[88], a[89], a[90], a[91], a[92], a[93]], [a[94], a[95], a[96], a[97], a[98], a[99], a[100], a[101], a[102], a[103], a[104], a[105]], [a[106], a[107], a[108], a[109], a[98], a[110], a[111], a[112], a[113], a[114], a[115], a[116]], [a[117], a[118], a[119], a[120], a[121], a[122], a[123]], [a[124], a[125], a[126], a[127], a[128], a[129], a[130]], [a[131], a[132], a[133], a[134], a[135], a[136], a[137]], [a[138], a[139]], [a[140], a[141], a[142], a[143]], [a[144], a[145], a[146], a[147]], { am: a[148], pm: a[149] }, [a[150], a[151], a[152], a[153], a[154], a[155], a[156], a[157], a[158], a[159], a[160], a[161], a[162], a[163]], [a[148]], [a[164], a[165], a[166], a[167], a[168], a[169], a[170], a[171], a[172], a[173], a[174], a[175]], [a[176]], [a[177], a[178], a[179], a[180], a[181], a[182], a[183], a[184], a[185], a[186], a[187], a[188]], [a[189], a[190], a[191], a[192], a[193], a[194], a[195], a[196], a[197], a[198], a[199], a[200]], [a[201]], [a[202], a[203], a[204], a[205], a[206], a[207], a[208], a[209], a[210], a[211], a[212], a[213], a[214], a[215], a[216], a[217], a[218], a[219], a[220], a[221], a[222], a[223], a[224], a[225], a[226], a[227], a[228], a[229], a[230], a[231], a[232], a[233], a[234], a[235], a[236], a[237], a[238], a[239], a[240], a[241], a[242], a[243], a[244], a[245], a[246], a[247], a[248], a[249], a[250], a[251], a[252], a[253], a[254], a[255], a[256], a[257], a[258], a[259], a[260], a[261], a[262], a[263], a[264], a[265], a[266], a[267], a[268], a[269], a[270], a[271], a[272], a[273], a[274], a[275], a[276], a[277], a[278], a[279], a[280], a[281], a[282], a[283], a[284], a[285], a[286], a[287], a[288], a[289], a[290], a[291], a[292], a[293], a[294], a[295], a[296], a[297], a[298], a[299], a[300], a[301], a[302], a[303], a[304], a[305], a[306], a[307], a[308], a[309], a[310], a[311], a[312], a[313], a[314], a[315], a[316], a[317], a[318], a[319], a[320], a[321], a[322], a[323], a[324], a[325], a[326], a[327], a[328], a[329], a[330], a[331], a[332], a[333], a[334], a[335], a[336], a[337], a[338], a[339], a[340], a[341], a[342], a[343], a[344], a[345], a[346], a[347], a[348], a[349], a[350], a[351], a[352], a[353], a[354], a[355], a[356], a[357], a[358], a[359], a[360], a[361], a[362], a[363], a[364], a[365], a[366], a[367], a[368], a[369], a[370], a[371], a[372], a[373], a[374], a[375], a[376], a[377], a[378], a[379], a[380], a[381], a[382], a[383], a[384], a[385], a[386], a[387], a[388], a[389], a[390], a[391], a[392], a[393], a[394], a[395], a[396], a[397], a[398], a[399], a[400], a[401], a[402], a[403], a[404], a[405], a[406], a[407], a[408], a[409], a[410], a[411], a[412], a[413], a[414], a[415], a[416], a[417], a[418], a[419], a[420], a[421], a[422], a[423], a[424], a[425], a[426], a[427], a[428], a[429], a[430], a[431], a[432], a[433], a[434], a[435], a[436], a[437]], [a[202], a[203], a[204], a[205], a[206], a[207], a[208], a[209], a[210], a[211], a[212], a[213], a[214], a[215], a[216], a[217], a[218], a[219], a[220], a[221], a[222], a[223], a[224], a[225], a[226], a[227], a[228], a[229], a[230], a[231], a[232], a[233], a[234], a[235], a[236], a[237], a[238], a[239], a[240], a[241], a[242], a[243], a[244], a[245], a[246], a[247], a[248], a[249], a[250], a[251], a[252], a[253], a[254], a[255], a[256], a[257], a[258], a[259], a[260], a[261], a[262], a[263], a[264], a[265], a[266], a[267], a[268], a[269], a[270], a[271], a[272], a[273], a[274], a[275], a[276], a[277], a[278], a[279], a[280], a[281], a[282], a[283], a[284], a[285], a[286], a[287], a[288], a[289], a[290], a[291], a[292], a[293], a[294], a[295], a[296], a[297], a[298], a[299], a[300], a[301], a[302], a[303], a[304], a[305], a[306], a[307], a[308], a[309], a[310], a[311], a[312], a[313], a[314], a[315], a[316], a[317], a[318], a[319], a[320], a[321], a[322], a[323], a[324], a[325], a[326], a[327], a[328], a[329], a[330], a[331], a[332], a[333], a[334], a[335], a[336], a[337], a[338], a[339], a[340], a[341], a[342], a[343], a[344], a[345], a[346], a[347], a[348], a[349], a[350], a[351], a[352], a[353], a[354], a[355], a[356], a[357], a[358], a[359], a[360], a[361], a[362], a[438], a[364], a[365], a[366], a[439], a[368], a[369], a[370], a[371], a[372], a[373], a[374], a[375], a[376], a[377], a[378], a[379], a[380], a[381], a[382], a[383], a[384], a[385], a[386], a[387], a[388], a[389], a[390], a[391], a[392], a[393], a[394], a[395], a[396], a[397], a[398], a[399], a[400], a[401], a[402], a[403], a[404], a[405], a[406], a[407], a[408], a[409], a[410], a[411], a[412], a[413], a[414], a[415], a[416], a[417], a[418], a[419], a[420], a[421], a[422], a[423], a[424], a[425], a[426], a[427], a[428], a[429], a[430], a[431], a[432], a[433], a[440], a[441], a[442], a[443]], [a[444], a[445], a[446], a[447], a[448], a[449], a[450], a[451], a[452], a[453], a[454], a[455]], [a[456]], [a[457], a[458]], [a[459]], { positivePattern: a[460], negativePattern: a[461] }, { positivePattern: a[462], negativePattern: a[463] }, { positivePattern: a[464], negativePattern: a[465] }, { decimal: a[466], group: a[467], nan: a[468], percent: a[469], infinity: a[470] }, { USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[492], pattern12: a[493] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], pattern: a[494] }, { day: a[14], month: a[14], year: a[14], pattern: a[495] }, { day: a[14], month: a[14], pattern: a[496] }, { positivePattern: a[497], negativePattern: a[498] }, { decimal: a[467], group: a[466], nan: a[468], percent: a[469], infinity: a[470] }, { JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { AUD: a[499], USD: a[471], JPY: a[472], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { BBD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { BMD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { BSD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[492], pattern12: a[493] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], pattern: a[494] }, { day: a[15], month: a[13], year: a[14], pattern: a[500] }, { day: a[15], month: a[15], year: a[14], pattern: a[495] }, { month: a[15], year: a[14], pattern: a[21] }, { day: a[15], month: a[13], pattern: a[501] }, { day: a[15], month: a[15], pattern: a[496] }, { BWP: a[502], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { BZD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { CAD: a[499], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { AUD: a[499], JPY: a[472], USD: a[499], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { NZD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, [a[503], a[504], a[505], a[506], a[505], a[503], a[503], a[507], a[508], a[509], a[510], a[511]], [a[512], a[513], a[514], a[515], a[516], a[517], a[518], a[519], a[520], a[521], a[522], a[523]], [a[524], a[525], a[526], a[527], a[516], a[517], a[528], a[529], a[530], a[531], a[532], a[533]], [a[534], a[535], a[536], a[537], a[538], a[539], a[540]], [a[541], a[542], a[543], a[544], a[545], a[546], a[547]], [a[548], a[549]], [a[550], a[551], a[142], a[143]], [a[552], a[553], a[146], a[147]], { am: a[554], pm: a[555] }, { USD: a[499], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { ERN: a[556], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { FJD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { FKP: a[478], GBP: a[557], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[558], pattern12: a[559] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], pattern: a[560] }, { day: a[14], month: a[13], year: a[14], pattern: a[500] }, { day: a[14], month: a[13], pattern: a[501] }, [a[561], a[562], a[563], a[564], a[565], a[566], a[567], a[568], a[569], a[570], a[571], a[572]], { am: a[573], pm: a[574] }, { AUD: a[575], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], USD: a[499], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491], JPY: a[472] }, { GHS: a[576], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { GBP: a[557], GIP: a[478], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { GMD: a[577], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { GYD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[578], pattern12: a[579] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], pattern: a[580] }, { day: a[14], month: a[13], year: a[14], pattern: a[581] }, [a[202], a[203], a[204], a[205], a[206], a[207], a[208], a[209], a[210], a[211], a[212], a[213], a[214], a[215], a[216], a[217], a[218], a[219], a[220], a[221], a[222], a[223], a[224], a[225], a[226], a[227], a[228], a[229], a[230], a[231], a[232], a[233], a[234], a[235], a[236], a[237], a[238], a[239], a[240], a[241], a[242], a[243], a[244], a[245], a[246], a[247], a[248], a[249], a[250], a[251], a[252], a[253], a[254], a[255], a[256], a[257], a[258], a[259], a[260], a[261], a[262], a[263], a[264], a[265], a[266], a[267], a[268], a[269], a[270], a[271], a[272], a[273], a[274], a[275], a[276], a[277], a[278], a[279], a[280], a[281], a[282], a[283], a[284], a[285], a[286], a[287], a[288], a[289], a[290], a[291], a[292], a[293], a[294], a[295], a[296], a[297], a[298], a[299], a[300], a[301], a[302], a[303], a[304], a[305], a[306], a[307], a[308], a[309], a[310], a[311], a[312], a[313], a[314], a[315], a[316], a[317], a[318], a[319], a[320], a[321], a[322], a[323], a[324], a[325], a[326], a[327], a[328], a[329], a[330], a[331], a[332], a[333], a[334], a[335], a[336], a[337], a[338], a[339], a[340], a[341], a[342], a[343], a[344], a[345], a[346], a[347], a[348], a[349], a[350], a[351], a[352], a[353], a[354], a[355], a[356], a[357], a[358], a[359], a[360], a[361], a[362], a[582], a[364], a[365], a[366], a[583], a[368], a[369], a[370], a[371], a[372], a[373], a[374], a[375], a[376], a[377], a[378], a[379], a[380], a[381], a[382], a[383], a[384], a[385], a[386], a[387], a[388], a[389], a[390], a[391], a[392], a[393], a[394], a[395], a[396], a[397], a[398], a[399], a[400], a[401], a[402], a[403], a[404], a[405], a[406], a[407], a[408], a[409], a[410], a[411], a[412], a[413], a[414], a[415], a[416], a[417], a[418], a[419], a[420], a[421], a[422], a[423], a[424], a[425], a[426], a[427], a[428], a[429], a[430], a[431], a[432], a[433], a[440], a[441], a[442], a[443]], { HKD: a[499], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { am: a[584], pm: a[585] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[586], pattern12: a[587] }, { weekday: a[13], day: a[14], month: a[13], year: a[14], pattern: a[588] }, { positivePattern: a[589], negativePattern: a[590] }, { JMD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { KES: a[591], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { KYD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { LRD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { ZAR: a[592], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { MGA: a[593], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { MOP: a[594], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[595], pattern12: a[596] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], pattern: a[560] }, { GBP: a[557], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { MUR: a[597], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { MWK: a[598], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { NAD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { NGN: a[599], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { day: a[14], month: a[15], year: a[14], pattern: a[495] }, { NZD: a[499], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { PGK: a[600], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { PHP: a[601], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { PKR: a[597], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { RWF: a[602], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { SBD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { SCR: a[603], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { SGD: a[499], USD: a[471], JPY: a[472], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { GBP: a[557], SHP: a[478], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { SLL: a[604], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { GBP: a[557], SSP: a[478], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { ANG: a[605], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { SZL: a[606], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { TOP: a[607], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { TTD: a[499], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { TZS: a[608], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { UGX: a[609], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { VUV: a[610], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { WST: a[611], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { year: a[14], month: a[15], day: a[15], pattern: a[612] }, { month: a[15], day: a[15], pattern: a[24] }, { decimal: a[467], group: a[613], nan: a[468], percent: a[469], infinity: a[470] }, { ZMW: a[600], JPY: a[472], USD: a[499], AUD: a[473], BRL: a[474], CAD: a[475], CNY: a[476], EUR: a[477], GBP: a[478], HKD: a[479], ILS: a[480], INR: a[481], KRW: a[482], MXN: a[483], NZD: a[484], THB: a[485], TWD: a[486], VND: a[487], XAF: a[488], XCD: a[489], XOF: a[490], XPF: a[491] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], hour: a[14], minute: a[15], second: a[15], pattern: a[578], pattern12: a[579] }, { weekday: a[13], day: a[15], month: a[13], year: a[14], pattern: a[580] }, { day: a[15], month: a[13], year: a[14], pattern: a[581] }];
	    b[1] = [[b[0][1], b[0][2], b[0][3], b[0][4], b[0][5], b[0][6], b[0][7], b[0][8], b[0][9], b[0][10]], { "short": b[0][11] }, { "short": b[0][12], "long": b[0][13] }, { "long": b[0][14] }, { "short": b[0][15] }, { "long": b[0][16] }, { "short": b[0][17] }, { "long": b[0][18] }, { "short": b[0][19], "long": b[0][20] }, { narrow: b[0][21], "short": b[0][22], "long": b[0][23] }, { narrow: b[0][24], "short": b[0][25], "long": b[0][26] }, { "long": b[0][28] }, { "short": b[0][29] }, { "long": b[0][30] }, { "short": b[0][31] }, { "short": b[0][32], "long": b[0][33] }, { "short": b[0][34] }, { narrow: b[0][35], "short": b[0][36] }, { "long": b[0][37] }, { "short": b[0][38] }, { "short": b[0][39] }, { decimal: b[0][41], currency: b[0][42], percent: b[0][43] }, { latn: b[0][44] }, [b[0][46], b[0][47], b[0][3], b[0][48], b[0][5], b[0][6], b[0][7], b[0][49], b[0][9], b[0][10]], { decimal: b[0][41], currency: b[0][50], percent: b[0][43] }, { latn: b[0][51] }, [b[0][1], b[0][2], b[0][3], b[0][48], b[0][5], b[0][6], b[0][7], b[0][8], b[0][9], b[0][10]], [b[0][57], b[0][58], b[0][59], b[0][60], b[0][61], b[0][6], b[0][62], b[0][63], b[0][9], b[0][10]], { narrow: b[0][69], "short": b[0][70], "long": b[0][71] }, { narrow: b[0][21], "short": b[0][72], "long": b[0][73] }, { narrow: b[0][74], "short": b[0][75], "long": b[0][76] }, [b[0][82], b[0][83], b[0][84], b[0][60], b[0][61], b[0][6], b[0][85], b[0][63], b[0][9], b[0][10]], { narrow: b[0][86], "short": b[0][86], "long": b[0][86] }, { narrow: b[0][86], "short": b[0][30], "long": b[0][30] }, { narrow: b[0][86], "short": b[0][32], "long": b[0][33] }, [b[0][93], b[0][94], b[0][95], b[0][48], b[0][5], b[0][6], b[0][7], b[0][8], b[0][9], b[0][10]], { narrow: b[0][35], "short": b[0][96] }, [b[0][99], b[0][100], b[0][3], b[0][48], b[0][5], b[0][6], b[0][7], b[0][8], b[0][9], b[0][10]], { decimal: b[0][41], currency: b[0][101], percent: b[0][43], secondaryGroupSize: 2 }, [b[0][1], b[0][2], b[0][3], b[0][4], b[0][5], b[0][6], b[0][7], b[0][49], b[0][9], b[0][10]], [b[0][109], b[0][110], b[0][59], b[0][4], b[0][5], b[0][6], b[0][62], b[0][8], b[0][9], b[0][10]], [b[0][1], b[0][2], b[0][3], b[0][116], b[0][5], b[0][6], b[0][7], b[0][49], b[0][9], b[0][10]], [b[0][109], b[0][110], b[0][59], b[0][136], b[0][5], b[0][6], b[0][62], b[0][137], b[0][9], b[0][10]], { latn: b[0][138] }, [b[0][140], b[0][141], b[0][142], b[0][48], b[0][5], b[0][6], b[0][62], b[0][49], b[0][9], b[0][10]]];b[2] = [{ eras: b[1][1] }, { months: b[1][2] }, { months: b[1][3], eras: b[1][4] }, { months: b[1][5], eras: b[1][4] }, { eras: b[1][6] }, { months: b[1][7], eras: b[1][4] }, { months: b[1][8], days: b[1][9], eras: b[1][10], dayPeriods: b[0][27] }, { months: b[1][11], eras: b[1][12] }, { months: b[1][13], eras: b[1][14] }, { months: b[1][15], eras: b[1][16] }, { eras: b[1][17] }, { months: b[1][18], eras: b[1][19] }, { eras: b[1][20] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][45] }, { nu: b[0][40], patterns: b[1][24], symbols: b[1][25], currencies: b[0][52] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][52] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][53] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][54] }, { nu: b[0][40], patterns: b[1][24], symbols: b[1][25], currencies: b[0][45] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][55] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][56] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][64] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][65] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][66] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][67] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][68] }, { months: b[1][28], days: b[1][29], eras: b[1][30], dayPeriods: b[0][77] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][78] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][79] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][80] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][81] }, { months: b[1][32] }, { months: b[1][8], days: b[1][9], eras: b[1][10], dayPeriods: b[0][87] }, { months: b[1][33], eras: b[1][14] }, { months: b[1][34], eras: b[1][16] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][88] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][89] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][90] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][91] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][92] }, { eras: b[1][36] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][97] }, { months: b[1][8], days: b[1][9], eras: b[1][10], dayPeriods: b[0][98] }, { nu: b[0][40], patterns: b[1][38], symbols: b[1][22], currencies: b[0][45] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][102] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][103] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][104] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][105] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][106] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][107] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][108] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][111] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][112] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][113] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][114] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][115] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][117] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][118] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][119] }, { nu: b[0][40], patterns: b[1][38], symbols: b[1][22], currencies: b[0][120] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][121] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][122] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][123] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][124] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][125] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][126] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][127] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][128] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][129] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][130] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][131] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][132] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][133] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][134] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][135] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][43], currencies: b[0][106] }, { nu: b[0][40], patterns: b[1][21], symbols: b[1][22], currencies: b[0][139] }];b[3] = [{ buddhist: b[2][0], chinese: b[2][1], coptic: b[2][2], ethiopic: b[2][3], ethioaa: b[2][4], generic: b[2][5], gregory: b[2][6], hebrew: b[2][7], indian: b[2][8], islamic: b[2][9], japanese: b[2][10], persian: b[2][11], roc: b[2][12] }, { buddhist: b[2][0], chinese: b[2][1], coptic: b[2][2], ethiopic: b[2][3], ethioaa: b[2][4], generic: b[2][5], gregory: b[2][26], hebrew: b[2][7], indian: b[2][8], islamic: b[2][9], japanese: b[2][10], persian: b[2][11], roc: b[2][12] }, { buddhist: b[2][0], chinese: b[2][31], coptic: b[2][2], ethiopic: b[2][3], ethioaa: b[2][4], generic: b[2][5], gregory: b[2][32], hebrew: b[2][7], indian: b[2][33], islamic: b[2][34], japanese: b[2][10], persian: b[2][11], roc: b[2][12] }, { buddhist: b[2][0], chinese: b[2][1], coptic: b[2][2], ethiopic: b[2][3], ethioaa: b[2][4], generic: b[2][5], gregory: b[2][6], hebrew: b[2][7], indian: b[2][8], islamic: b[2][9], japanese: b[2][40], persian: b[2][11], roc: b[2][12] }, { buddhist: b[2][0], chinese: b[2][1], coptic: b[2][2], ethiopic: b[2][3], ethioaa: b[2][4], generic: b[2][5], gregory: b[2][42], hebrew: b[2][7], indian: b[2][8], islamic: b[2][9], japanese: b[2][10], persian: b[2][11], roc: b[2][12] }];b[4] = [{ ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][0], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: false, formats: b[1][23], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][26], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][27], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: false, formats: b[1][27], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][0], calendars: b[3][1] }, { ca: b[0][0], hourNo0: true, hour12: false, formats: b[1][31], calendars: b[3][2] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][35], calendars: b[3][3] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][23], calendars: b[3][4] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][37], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][39], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][40], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][41], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][42], calendars: b[3][0] }, { ca: b[0][0], hourNo0: true, hour12: true, formats: b[1][44], calendars: b[3][0] }];b[5] = [{ date: b[4][0], number: b[2][13] }, { date: b[4][1], number: b[2][14] }, { date: b[4][0], number: b[2][15] }, { date: b[4][2], number: b[2][16] }, { date: b[4][0], number: b[2][17] }, { date: b[4][1], number: b[2][18] }, { date: b[4][0], number: b[2][19] }, { date: b[4][0], number: b[2][20] }, { date: b[4][3], number: b[2][21] }, { date: b[4][4], number: b[2][22] }, { date: b[4][0], number: b[2][23] }, { date: b[4][0], number: b[2][24] }, { date: b[4][0], number: b[2][25] }, { date: b[4][5], number: b[2][27] }, { date: b[4][0], number: b[2][28] }, { date: b[4][0], number: b[2][29] }, { date: b[4][0], number: b[2][30] }, { date: b[4][6], number: b[2][35] }, { date: b[4][0], number: b[2][36] }, { date: b[4][0], number: b[2][37] }, { date: b[4][0], number: b[2][38] }, { date: b[4][0], number: b[2][39] }, { date: b[4][7], number: b[2][41] }, { date: b[4][8], number: b[2][15] }, { date: b[4][9], number: b[2][43] }, { date: b[4][10], number: b[2][44] }, { date: b[4][0], number: b[2][45] }, { date: b[4][0], number: b[2][46] }, { date: b[4][0], number: b[2][47] }, { date: b[4][0], number: b[2][48] }, { date: b[4][0], number: b[2][49] }, { date: b[4][0], number: b[2][50] }, { date: b[4][11], number: b[2][51] }, { date: b[4][0], number: b[2][52] }, { date: b[4][0], number: b[2][53] }, { date: b[4][0], number: b[2][54] }, { date: b[4][0], number: b[2][55] }, { date: b[4][12], number: b[2][56] }, { date: b[4][0], number: b[2][57] }, { date: b[4][0], number: b[2][58] }, { date: b[4][0], number: b[2][59] }, { date: b[4][0], number: b[2][60] }, { date: b[4][0], number: b[2][61] }, { date: b[4][0], number: b[2][62] }, { date: b[4][0], number: b[2][63] }, { date: b[4][0], number: b[2][64] }, { date: b[4][0], number: b[2][65] }, { date: b[4][0], number: b[2][66] }, { date: b[4][0], number: b[2][67] }, { date: b[4][0], number: b[2][68] }, { date: b[4][0], number: b[2][69] }, { date: b[4][0], number: b[2][70] }, { date: b[4][0], number: b[2][71] }, { date: b[4][0], number: b[2][72] }, { date: b[4][0], number: b[2][73] }, { date: b[4][0], number: b[2][74] }, { date: b[4][13], number: b[2][75] }, { date: b[4][0], number: b[2][76] }, { date: b[4][14], number: b[2][15] }];addLocaleData(b[5][0], "en-001");addLocaleData(b[5][1], "en-150");addLocaleData(b[5][2], "en-AG");addLocaleData(b[5][2], "en-AI");addLocaleData(b[5][2], "en-AS");addLocaleData(b[5][3], "en-AU");addLocaleData(b[5][4], "en-BB");addLocaleData(b[5][5], "en-BE");addLocaleData(b[5][6], "en-BM");addLocaleData(b[5][7], "en-BS");addLocaleData(b[5][8], "en-BW");addLocaleData(b[5][9], "en-BZ");addLocaleData(b[5][10], "en-CA");addLocaleData(b[5][11], "en-CC");addLocaleData(b[5][12], "en-CK");addLocaleData(b[5][2], "en-CM");addLocaleData(b[5][11], "en-CX");addLocaleData(b[5][2], "en-DG");addLocaleData(b[5][2], "en-DM");addLocaleData(b[5][2], "en-Dsrt-US");addLocaleData(b[5][13], "en-Dsrt");addLocaleData(b[5][14], "en-ER");addLocaleData(b[5][15], "en-FJ");addLocaleData(b[5][16], "en-FK");addLocaleData(b[5][2], "en-FM");addLocaleData(b[5][17], "en-GB");addLocaleData(b[5][2], "en-GD");addLocaleData(b[5][2], "en-GG");addLocaleData(b[5][18], "en-GH");addLocaleData(b[5][19], "en-GI");addLocaleData(b[5][20], "en-GM");addLocaleData(b[5][2], "en-GU");addLocaleData(b[5][21], "en-GY");addLocaleData(b[5][22], "en-HK");addLocaleData(b[5][23], "en-IE");addLocaleData(b[5][2], "en-IM");addLocaleData(b[5][24], "en-IN");addLocaleData(b[5][2], "en-IO");addLocaleData(b[5][2], "en-JE");addLocaleData(b[5][25], "en-JM");addLocaleData(b[5][26], "en-KE");addLocaleData(b[5][11], "en-KI");addLocaleData(b[5][2], "en-KN");addLocaleData(b[5][27], "en-KY");addLocaleData(b[5][2], "en-LC");addLocaleData(b[5][28], "en-LR");addLocaleData(b[5][29], "en-LS");addLocaleData(b[5][30], "en-MG");addLocaleData(b[5][2], "en-MH");addLocaleData(b[5][31], "en-MO");addLocaleData(b[5][2], "en-MP");addLocaleData(b[5][2], "en-MS");addLocaleData(b[5][32], "en-MT");addLocaleData(b[5][33], "en-MU");addLocaleData(b[5][34], "en-MW");addLocaleData(b[5][35], "en-NA");addLocaleData(b[5][11], "en-NF");addLocaleData(b[5][36], "en-NG");addLocaleData(b[5][11], "en-NR");addLocaleData(b[5][12], "en-NU");addLocaleData(b[5][37], "en-NZ");addLocaleData(b[5][38], "en-PG");addLocaleData(b[5][39], "en-PH");addLocaleData(b[5][40], "en-PK");addLocaleData(b[5][12], "en-PN");addLocaleData(b[5][2], "en-PR");addLocaleData(b[5][2], "en-PW");addLocaleData(b[5][41], "en-RW");addLocaleData(b[5][42], "en-SB");addLocaleData(b[5][43], "en-SC");addLocaleData(b[5][2], "en-SD");addLocaleData(b[5][44], "en-SG");addLocaleData(b[5][45], "en-SH");addLocaleData(b[5][46], "en-SL");addLocaleData(b[5][47], "en-SS");addLocaleData(b[5][48], "en-SX");addLocaleData(b[5][49], "en-SZ");addLocaleData(b[5][2], "en-TC");addLocaleData(b[5][12], "en-TK");addLocaleData(b[5][50], "en-TO");addLocaleData(b[5][51], "en-TT");addLocaleData(b[5][11], "en-TV");addLocaleData(b[5][52], "en-TZ");addLocaleData(b[5][53], "en-UG");addLocaleData(b[5][2], "en-UM");addLocaleData(b[5][2], "en-US");addLocaleData(b[5][2], "en-VC");addLocaleData(b[5][2], "en-VG");addLocaleData(b[5][2], "en-VI");addLocaleData(b[5][54], "en-VU");addLocaleData(b[5][55], "en-WS");addLocaleData(b[5][56], "en-ZA");addLocaleData(b[5][57], "en-ZM");addLocaleData(b[5][58], "en-ZW");addLocaleData(b[5][2], "en");
	  })();return Intl;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);