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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _I18nStore = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Fold accent-characters into their accentless character
	 * @param     String str
	 * @return    String
	 */
	function convertAccents(str) {
	  return str.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function (str, a, c, e, i, n, o, s, u, y, ae) {
	    if (a) return 'a';else if (c) return 'c';else if (e) return 'e';else if (i) return 'i';else if (n) return 'n';else if (o) return 'o';else if (s) return 's';else if (u) return 'u';else if (y) return 'y';else if (ae) return 'ae';
	  });
	}

	/**
	 * Detect if one string contains another, accent-folded
	 * @param string a haystack
	 * @param string b needle
	 */
	var strContains = function strContains(a, b) {
	  return convertAccents(a.toLowerCase()).indexOf(convertAccents(b.toLowerCase())) > -1;
	};

	// Mobile should stick to standard form elements, so it can style its widget
	// TODO: ReactRouter this
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	var City = function City(_ref) {
	  var id = _ref.id;
	  var name = _ref.name;
	  var url = _ref.url;
	  return React.createElement(
	    'li',
	    { key: 'city' + id },
	    React.createElement(
	      'a',
	      { href: url },
	      name
	    )
	  );
	};

	var Country = function Country(_ref2) {
	  var id = _ref2.id;
	  var name = _ref2.name;
	  var url = _ref2.url;
	  var cities = _ref2.cities;
	  return React.createElement(
	    'li',
	    { key: 'country' + id, className: 'country' },
	    React.createElement(
	      'a',
	      { href: url },
	      name
	    ),
	    React.createElement(
	      'ul',
	      { className: 'cities' },
	      cities.map(function (city) {
	        return React.createElement(City, _extends({ key: 'city' + city.id }, city));
	      })
	    )
	  );
	};

	var PageListTypeahead = (function (_React$Component) {
	  _inherits(PageListTypeahead, _React$Component);

	  function PageListTypeahead(props) {
	    _classCallCheck(this, PageListTypeahead);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PageListTypeahead).call(this, props));

	    _this.state = {
	      q: '',
	      matched: props.countries
	    };
	    return _this;
	  }

	  /**
	   * Called when typing in the input
	   * @param ReactEvent ev
	   */

	  _createClass(PageListTypeahead, [{
	    key: 'handleInput',
	    value: function handleInput(q) {
	      var countries = [];

	      // Loop through all countries and build a list of cities which match
	      this.props.countries.forEach(function (country) {
	        var cities = country.cities.filter(function (city) {
	          return !q || strContains(city.name, q);
	        });
	        // Avoid including countries which have no matching cities
	        if (cities.length) {
	          countries.push(Object.assign({}, country, { cities: cities }));
	        }
	      });

	      this.setState({ q: q, matched: countries });
	    }

	    /**
	     * Form action links the top selected city
	     * @param ReactEvent ev
	     */

	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(ev) {
	      var firstCountry = this.state.matched[0];
	      var firstCity = undefined;

	      // If there's a matching city, that's the URL we go to
	      if (firstCountry) {
	        firstCity = firstCountry.cities[0];
	        if (firstCity) {
	          this.setState({ q: firstCity.name }, function () {
	            return ev.target.action = firstCity.url;
	          });
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _state = this.state;
	      var q = _state.q;
	      var matched = _state.matched;

	      var homeCity = React.createElement('h3', null);

	      if (this.props.user && this.props.user.city) {
	        homeCity = React.createElement(
	          'h3',
	          null,
	          'See walks in ',
	          React.createElement(
	            'a',
	            { href: this.props.user.city.url },
	            this.props.user.city.name
	          )
	        );
	      }

	      return React.createElement(
	        'div',
	        { className: 'ccm-page-list-typeahead' },
	        React.createElement(
	          'form',
	          { onSubmit: function onSubmit(ev) {
	              return _this2.handleSubmit(ev);
	            } },
	          React.createElement(
	            'fieldset',
	            { className: 'search' },
	            React.createElement('input', { type: 'text', name: 'selected_option', className: 'typeahead', placeholder: (0, _I18nStore.t)('Find citizen-led walks in your city'), autoComplete: 'off', value: this.state.q, onChange: function onChange(ev) {
	                return _this2.handleInput(ev.target.value);
	              } }),
	            React.createElement(
	              'button',
	              { type: 'submit' },
	              'Go'
	            ),
	            React.createElement(
	              'ul',
	              null,
	              matched.map(function (country) {
	                return React.createElement(Country, country);
	              }),
	              matched.length === 0 ? React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '/city-organizer-onboarding' },
	                  'Add ' + q + ' to Jane\'s Walk'
	                )
	              ) : null
	            )
	          )
	        ),
	        homeCity
	      );
	    }
	  }]);

	  return PageListTypeahead;
	})(React.Component);

	// Alternate render of these same cities as a select, primarily for mobile

	var CityOption = function CityOption(_ref3) {
	  var id = _ref3.id;
	  var name = _ref3.name;
	  var url = _ref3.url;
	  return React.createElement(
	    'option',
	    { value: url, key: 'city' + id },
	    name
	  );
	};

	var CountryOption = function CountryOption(_ref4) {
	  var id = _ref4.id;
	  var name = _ref4.name;
	  var url = _ref4.url;
	  var cities = _ref4.cities;
	  return React.createElement(
	    'optgroup',
	    { key: 'country' + id, className: 'country', label: name },
	    cities.map(function (city) {
	      return React.createElement(CityOption, city);
	    })
	  );
	};

	var PageListSelect = (function (_React$Component2) {
	  _inherits(PageListSelect, _React$Component2);

	  function PageListSelect(props) {
	    _classCallCheck(this, PageListSelect);

	    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PageListSelect).call(this, props));

	    _this3.state = {
	      selected: null,
	      countries: props.countries.sort(function (a, b) {
	        return a.name.localeCompare(b.name);
	      })
	    };
	    return _this3;
	  }

	  _createClass(PageListSelect, [{
	    key: 'handleChange',
	    value: function handleChange(ev) {
	      var _this4 = this;

	      this.setState({ selected: ev.target.value }, function () {
	        return React.findDOMNode(_this4.refs.form).submit();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var user = this.props.user;
	      var _state2 = this.state;
	      var selected = _state2.selected;
	      var countries = _state2.countries;

	      var homeCity = React.createElement('h3', null);

	      if (user && user.city) {
	        homeCity = React.createElement(
	          'h3',
	          null,
	          'See walks in ',
	          React.createElement(
	            'a',
	            { href: user.city.url },
	            user.city.name
	          ),
	          ', or:'
	        );
	      }

	      return React.createElement(
	        'div',
	        { className: 'ccm-page-list-typeahead' },
	        homeCity,
	        React.createElement(
	          'form',
	          { ref: 'form', onSubmit: this.handleSubmit, action: selected },
	          React.createElement(
	            'fieldset',
	            { className: 'search' },
	            React.createElement(
	              'select',
	              { value: selected, onChange: this.handleChange },
	              React.createElement(
	                'option',
	                { value: '', disabled: true, selected: true },
	                'Choose your city'
	              ),
	              countries.map(this.renderCountry)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return PageListSelect;
	})(React.Component);

	// TODO: get browserify-shim working and `import React from 'react';`

	document.addEventListener('DOMContentLoaded', function () {
	  // TODO: use ReactRouter for loading either, not c5 blocks directly
	  if (isMobile) {
	    React.render(React.createElement(PageListSelect, { countries: JanesWalk.countries, user: JanesWalk.user }), document.getElementById('ccm-jw-page-list-typeahead'));
	  } else {
	    React.render(React.createElement(PageListTypeahead, { countries: JanesWalk.countries, user: JanesWalk.user }), document.getElementById('ccm-jw-page-list-typeahead'));
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.t2 = exports.t = undefined;

	var _events = __webpack_require__(3);

	var _AppDispatcher = __webpack_require__(4);

	var _JWConstants = __webpack_require__(9);

	var _translate = __webpack_require__(10);

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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.waitFor = exports.dispatch = exports.register = undefined;

	var _flux = __webpack_require__(5);

	var AppDispatcher = new _flux.Dispatcher();
	var register = AppDispatcher.register.bind(AppDispatcher);
	var dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
	var waitFor = AppDispatcher.waitFor.bind(AppDispatcher);

	exports.default = AppDispatcher;
	exports.register = register;
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
	'ITINERARY_RECEIVE', 'ITINERARY_REMOVE_WALK', 'ITINERARY_ADD_WALK', 'ITINERARY_SCHEDULE_WALK', 'ITINERARY_UNSCHEDULE_WALK', 'ITINERARY_UPDATE_TITLE', 'ITINERARY_UPDATE_DESCRIPTION', 'ITINERARY_CREATE_LIST', 'ITINERARY_RECEIVE_ALL', 'ITINERARY_SYNC_START', 'ITINERARY_SYNC_END'].reduce(function (p, k) {
	  p[k] = k;return p;
	}, {});

	exports.ActionTypes = ActionTypes;

/***/ },
/* 10 */
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

/***/ }
/******/ ]);