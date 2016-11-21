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

	var _WalkFilter = __webpack_require__(2);

	var _WalkFilter2 = _interopRequireDefault(_WalkFilter);

	var _WalkActions = __webpack_require__(24);

	var WalkActions = _interopRequireWildcard(_WalkActions);

	var _CityActions = __webpack_require__(25);

	var CityActions = _interopRequireWildcard(_CityActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Fluxxy
	var _React = React; /**
	                     * A set of walk filters, to filter on properties. Also includes
	                     * the tabs, like 'list' and 'map/
	                     */
	/* global React ReactDOM JanesWalk */

	var ce = _React.createElement;
	var _JanesWalk = JanesWalk;
	var event = _JanesWalk.event;


	var _filters = {};

	event.on('walkfilters.load', function (location) {
	  return ReactDOM.render(ce(_WalkFilter2.default, { filters: _filters, location: location }), document.getElementById('janeswalk-walk-filters'));
	});

	// Listen for updates, add routing
	event.on('filters.receive', function (filters) {
	  _filters = filters;
	});
	event.on('city.receive', function (city) {
	  return CityActions.receive(city);
	});
	event.on('walks.receive', function (walks) {
	  return WalkActions.receiveAll(walks);
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _templateObject = _taggedTemplateLiteral(['Search in Walks below'], ['Search in Walks below']);

	var _I18nStore = __webpack_require__(3);

	var _WalkCards = __webpack_require__(13);

	var _WalkCards2 = _interopRequireDefault(_WalkCards);

	var _WalkList = __webpack_require__(16);

	var _WalkList2 = _interopRequireDefault(_WalkList);

	var _LocationMap = __webpack_require__(18);

	var _LocationMap2 = _interopRequireDefault(_LocationMap);

	var _DateRange = __webpack_require__(20);

	var _DateRange2 = _interopRequireDefault(_DateRange);

	var _Filter = __webpack_require__(21);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _WalkStore = __webpack_require__(22);

	var _WalkStore2 = _interopRequireDefault(_WalkStore);

	var _CityStore = __webpack_require__(23);

	var _CityStore2 = _interopRequireDefault(_CityStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global React ReactDOM */
	/**
	 * Filters, lists, maps, the whole shebang
	 * TODO: this could seriously use some fluxing.
	 */


	// Flux


	var _React = React;
	var Component = _React.Component;
	var ce = _React.createElement;

	// Actually a little before today

	var today = new Date();
	today.setUTCDate(today.getDate());
	today.setUTCHours(0, 0, 0);

	/**
	 * Apply filters and date range to walks
	 */
	var filterWalks = function filterWalks(_ref) {
	  var outings = _ref.outings;
	  var filters = _ref.filters;
	  var dateRange = _ref.dateRange;
	  var city = _ref.city;
	  var _ref$typeahead = _ref.typeahead;
	  var typeahead = _ref$typeahead === undefined ? '' : _ref$typeahead;
	  return outings.filter(function (_ref2) {
	    var walk = _ref2.walk;
	    var slot = _ref2.slot;

	    // Convert PHP second-epoch to JS milliseconds epoch
	    var time = slot[0] * 1000;

	    // TODO: cleanup and perf test
	    // Filter by checking that the filter doesn't match the walk
	    // Note that this would be a lot cleaner using functions, but it's
	    // built with a big set of basic boolean operators to speed it up
	    // along this likely bottleneck
	    if (filters.theme && filters.theme.selected && !walk.checkboxes['theme-' + filters.theme.selected] || filters.ward && filters.ward.selected && walk.wards !== filters.ward.selected || filters.accessibility && filters.accessibility.selected && !walk.checkboxes['accessible-' + filters.accessibility.selected] || filters.initiative && filters.initiative.selected && walk.initiatives.indexOf(filters.initiative.selected) === -1 || city && +walk.cityID !== +city.id || filters.city && filters.city.selected && +walk.cityID !== +filters.city.selected || dateRange[0] && dateRange[0] > time || dateRange[1] && dateRange[1] < time || typeahead.length > 3 && !(walk.title + walk.longDescription + walk.shortDescription + walk.team.map(function (m) {
	      return m['name-first'] + ' ' + m['name-last'];
	    }).join('')).match(new RegExp(typeahead, 'i'))) {
	      return false;
	    }
	    return true;
	  });
	};

	/**
	 * Grab the day the 3rd most recent walk appears on
	 */
	function thirdRecentDate(outings) {
	  if (outings.length) {
	    var lastThree = outings.slice(-3);
	    // Find the day the walk starts
	    if (lastThree[0].slot) {
	      var lastDate = new Date(lastThree[0].slot[0] * 1000);
	      lastDate.setUTCHours(0);
	      lastDate.setUTCMinutes(0);
	      return lastDate;
	    }
	  }
	  return null;
	}

	function thirdRecentDateRange(outings) {
	  var thirdDate = thirdRecentDate(outings);
	  if (thirdDate && thirdDate < today) {
	    return [thirdDate.getTime(), null];
	  }
	  return [today, null];
	}

	var getWalkFilterState = function getWalkFilterState(_ref3) {
	  var _ref3$filters = _ref3.filters;
	  var filters = _ref3$filters === undefined ? {} : _ref3$filters;
	  var typeahead = _ref3.typeahead;
	  var dateRange = _ref3.dateRange;
	  var _ref3$city = _ref3.city;
	  var city = _ref3$city === undefined ? _CityStore2.default.getCity() : _ref3$city;

	  var outings = _WalkStore2.default.getWalkOutings();
	  var usefulRange = dateRange || thirdRecentDateRange(outings);

	  return {
	    outings: outings,
	    filters: filters,
	    city: city,
	    dateRange: usefulRange,
	    filterMatches: filterWalks({ outings: outings, filters: filters, dateRange: usefulRange, city: city, typeahead: typeahead })
	  };
	};

	var WalkFilter = function (_Component) {
	  _inherits(WalkFilter, _Component);

	  function WalkFilter(props) {
	    _classCallCheck(this, WalkFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WalkFilter).call(this, props));

	    Object.assign(_this, {
	      state: getWalkFilterState(props),

	      // Stores are updated
	      _onChange: function _onChange() {
	        _this.setState(getWalkFilterState(_this.state));
	      },

	      // Toggle whether or not the filters were showing
	      handleToggleFilters: function handleToggleFilters() {
	        _this.setState({ displayFilters: !_this.state.displayFilters });
	      },

	      // Send the list of walks to the printer
	      printList: function printList() {
	        var win = window.open();
	        var el = win.document.createElement('div');
	        ReactDOM.render(React.createElement(_WalkList2.default, { outings: _this.state.filterMatches }), el);
	        window.focus();
	        win.document.body.appendChild(el);
	        win.print();
	        win.close();
	      },

	      // Set a filter value
	      setFilter: function setFilter(filter, val) {
	        var _this$state = _this.state;
	        var filters = _this$state.filters;
	        var outings = _this$state.outings;
	        var dateRange = _this$state.dateRange;
	        var typeahead = _this$state.typeahead;
	        var city = _this$state.city;

	        if (!filters[filter]) filters[filter] = {};
	        Object.assign(filters[filter], { selected: val });
	        _this.setState({ filters: filters, filterMatches: filterWalks({ outings: outings, filters: filters, dateRange: dateRange, city: city, typeahead: typeahead }) });
	      },

	      // Set our date range filter
	      setDateRange: function setDateRange(from, to) {
	        var _this$state2 = _this.state;
	        var outings = _this$state2.outings;
	        var filters = _this$state2.filters;
	        var city = _this$state2.city;
	        var typeahead = _this$state2.typeahead;

	        _this.setState({
	          dateRange: [from, to],
	          filterMatches: filterWalks({ outings: outings, filters: filters, dateRange: [from, to], city: city, typeahead: typeahead })
	        });
	      },

	      // Typeahead search in the walks
	      handleTypeahead: function handleTypeahead(_ref4) {
	        var typeahead = _ref4.target.value;
	        var _this$state3 = _this.state;
	        var filters = _this$state3.filters;
	        var outings = _this$state3.outings;
	        var dateRange = _this$state3.dateRange;
	        var city = _this$state3.city;

	        _this.setState({ typeahead: typeahead, filterMatches: filterWalks({ filters: filters, outings: outings, dateRange: dateRange, city: city, typeahead: typeahead }) });
	      }
	    });
	    return _this;
	  }

	  _createClass(WalkFilter, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _WalkStore2.default.addChangeListener(this._onChange);
	      _CityStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _WalkStore2.default.removeChangeListener(this._onChange);
	      _CityStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var locationMapSection = void 0;

	      var _state = this.state;
	      var displayFilters = _state.displayFilters;
	      var city = _state.city;
	      var filterMatches = _state.filterMatches;
	      var dateRange = _state.dateRange;
	      var filters = _state.filters;
	      var typeahead = _state.typeahead;


	      var Filters = Object.keys(filters).map(function (key) {
	        return ce(_Filter2.default, _extends({ key: key, setFilter: function setFilter(v) {
	            return _this2.setFilter(key, v);
	          } }, filters[key]));
	      });

	      // See if this city has a location set
	      if (city && city.latlng.length === 2) {
	        locationMapSection = ce('section', { className: 'tab-pane', id: 'jw-map' }, ce(_LocationMap2.default, { outings: filterMatches, latlng: city.latlng }));
	      }

	      var AllFilters = ce('section', null, ce('ul', { className: 'filters' }, Filters, ce('li', null, ce('label', null, 'Dates'), ce(_DateRange2.default, { value: dateRange, onChange: this.setDateRange }))));

	      return ce('section', { className: 'ccm-block-page-list-walk-filters' }, ce('div', { className: 'walk-filters' }, ce('a', { className: 'filter-header', onClick: this.handleToggleFilters }, ce('i', { className: displayFilters ? 'fa fa-chevron-down' : 'fa fa-chevron-right' }, 'Filters')), ce('a', { className: 'print-button', onClick: this.printList }, ce('i', { className: 'fa fa-print' }, 'Print List')), displayFilters ? AllFilters : null), ce('div', { className: 'walk-typeahead' }, ce('input', {
	        type: 'text',
	        value: typeahead,
	        placeholder: (0, _I18nStore.translateTag)(_templateObject),
	        onChange: this.handleTypeahead
	      })), ce('div', { className: 'walks-area' }, ce(_WalkCards2.default, { outings: filterMatches }), locationMapSection));
	    }
	  }]);

	  return WalkFilter;
	}(Component);

	exports.default = WalkFilter;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tc = exports.translateTag = exports.t2 = exports.t = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * i18n Store
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Store for i18n language translations
	                                                                                                                                                                                                                                                                   */

	// Basic flux setup


	// The library for managing translations


	var _Store = __webpack_require__(4);

	var _Store2 = _interopRequireDefault(_Store);

	var _AppDispatcher = __webpack_require__(6);

	var _JWConstants = __webpack_require__(11);

	var _translate = __webpack_require__(12);

	var _translate2 = _interopRequireDefault(_translate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Local vars
	var _i18n = new _translate2.default();

	var I18nStore = _extends({}, _Store2.default, {
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
	  dispatchToken: (0, _AppDispatcher.register)(_defineProperty({}, _JWConstants.ActionTypes.I18N_RECEIVE, function (_ref) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * The generic 'store', which more complex stores are composed from
	                                                                                                                                                                                                                                                                   */

	// Requires


	var _events = __webpack_require__(5);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CHANGE_EVENT = 'change';

	var Store = _extends({}, _events2.default.prototype, {
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
/* 5 */
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
	      } else {
	          // At least give some kind of context to the user
	          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	          err.context = er;
	          throw err;
	        }
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.waitFor = exports.dispatch = exports.register = undefined;

	var _flux = __webpack_require__(7);

	var AppDispatcher = new _flux.Dispatcher();
	var dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
	var waitFor = AppDispatcher.waitFor.bind(AppDispatcher);

	var register = function register(receivers, onComplete) {
	  return AppDispatcher.register(function (payload) {
	    if (receivers.hasOwnProperty(payload.type)) {
	      receivers[payload.type](payload);
	      if (onComplete) onComplete(payload);
	    }
	  });
	};

	exports.default = AppDispatcher;
	exports.register = register;
	exports.dispatch = dispatch;
	exports.waitFor = waitFor;

/***/ },
/* 7 */
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

	module.exports.Dispatcher = __webpack_require__(8);

/***/ },
/* 8 */
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

	var invariant = __webpack_require__(10);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 10 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 11 */
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

	// Walk Builder
	'WB_RECEIVE_WALK', 'WB_SET_TITLE', 'WB_SET_LONG_DESCRIPTION', 'WB_SET_SHORT_DESCRIPTION',

	// City
	'CITY_RECEIVE',

	// Areas
	'AREA_RECEIVE',

	// Users
	'USER_RECEIVE', 'USER_RECEIVE_ALL',

	// Itineraries
	'ITINERARY_RECEIVE', 'ITINERARY_REMOVE_WALK', 'ITINERARY_ADD_WALK', 'ITINERARY_SCHEDULE_WALK', 'ITINERARY_UNSCHEDULE_WALK', 'ITINERARY_UPDATE_TITLE', 'ITINERARY_UPDATE_DESCRIPTION', 'ITINERARY_CREATE_LIST', 'ITINERARY_RECEIVE_ALL', 'ITINERARY_SYNC_START', 'ITINERARY_SYNC_END'].reduce(function (p, k) {
	  p[k] = Symbol(k);return p;
	}, {});

	var keys = {
	  google: 'AIzaSyA4iGa8LuLYBdttynMXjO9Vy6JaqaiPuVw'
	};

	exports.ActionTypes = ActionTypes;
	exports.keys = keys;

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['Keep looking.'], ['Keep looking.']),
	    _templateObject2 = _taggedTemplateLiteral(['We couldn\'t find any matching walks.'], ['We couldn\\\'t find any matching walks.']);

	var _Card = __webpack_require__(14);

	var _Card2 = _interopRequireDefault(_Card);

	var _I18nStore = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
	                                                                                                                                                   * The cards showing your walk
	                                                                                                                                                   */
	/* global React */

	var _React = React;
	var ce = _React.createElement;


	var WalkCards = function WalkCards(_ref) {
	  var outings = _ref.outings;

	  if (outings.length === 0) {
	    return ce('div', { className: 'empty' }, ce('h4', null, (0, _I18nStore.translateTag)(_templateObject)), ce('p', null, (0, _I18nStore.translateTag)(_templateObject2)));
	  }
	  return ce('div', { className: 'walkCards' }, outings.map(function (_ref2) {
	    var walk = _ref2.walk;
	    var slot = _ref2.slot;
	    return ce(_Card2.default, { key: 'walk' + walk.id + slot[0], walk: walk, slot: slot });
	  }));
	};

	exports.default = WalkCards;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* global React */


	var _templateObject = _taggedTemplateLiteral(['Walk led by ', ''], ['Walk led by ', '']),
	    _templateObject2 = _taggedTemplateLiteral(['Meet at ', ''], ['Meet at ', '']);

	var _Theme = __webpack_require__(15);

	var _I18nStore = __webpack_require__(3);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _React = React;
	var ce = _React.createElement;
	var Component = _React.Component;


	var dtfDate = void 0;
	// Date formatter
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

	var getFullName = function getFullName(v) {
	  return (v['name-first'] + ' ' + v['name-last']).trim();
	};

	var Card = function (_Component) {
	  _inherits(Card, _Component);

	  function Card(props) {
	    _classCallCheck(this, Card);

	    var formatter = void 0;
	    var yesterday = new Date();
	    yesterday.setDate(yesterday.getDate() - 1);


	    // Format the start date upfront, since that's expensive

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Card).call(this, props));

	    if (dtfDate) {
	      formatter = function formatter(slot) {
	        return dtfDate.format(slot[0] * 1000);
	      };
	    } else {
	      formatter = function formatter(slot) {
	        var date = new Date(slot[0] * 1000);
	        var dateString = date.toUTCString();
	        return dateString.slice(0, dateString.indexOf(' GMT'));
	      };
	    }

	    Object.assign(_this, {
	      state: {
	        startTime: formatter(props.slot),
	        past: props.slot[0] * 1000 < yesterday.getTime()
	      }
	    });
	    return _this;
	  }

	  _createClass(Card, [{
	    key: 'render',
	    value: function render() {
	      var Meeting = void 0;
	      var LedBy = void 0;
	      var Thumb = void 0;
	      var Status = void 0;
	      var _props$walk = this.props.walk;
	      var id = _props$walk.id;
	      var title = _props$walk.title;
	      var url = _props$walk.url;
	      var _props$walk$thumbnail = _props$walk.thumbnails;
	      var thumbnails = _props$walk$thumbnail === undefined ? [] : _props$walk$thumbnail;
	      var map = _props$walk.map;
	      var shortDescription = _props$walk.shortDescription;
	      var checkboxes = _props$walk.checkboxes;
	      var team = _props$walk.team;
	      var _state = this.state;
	      var past = _state.past;
	      var startTime = _state.startTime;

	      var placeholder = 'placeholder' + id % 3;
	      var leaders = team.filter(function (member) {
	        return member.role === 'walk-leader' || member.type === 'leader';
	      });
	      var Tags = Object.keys(checkboxes).filter(function (check) {
	        return check.indexOf('theme-') === 0 && checkboxes[check];
	      }).map(function (theme) {
	        return ce('li', { className: 'tag', title: (0, _Theme.getThemeName)(theme) }, ce('i', { className: 'fa ' + (0, _Theme.getThemeIcon)(theme) }));
	      });

	      // Build the optional elements
	      if (thumbnails.length) {
	        Thumb = thumbnails[0].url;
	      }

	      /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
	      if (map && map.markers && map.markers.length) {
	        Meeting = map.markers[0].title || map.markers[0].description;
	      }

	      if (leaders.length) {
	        LedBy = ce('span', null, (0, _I18nStore.translateTag)(_templateObject, leaders.map(getFullName).join(', ')));
	      }

	      if (past) {
	        Status = ce('div', { className: 'statusMessage' }, 'Ended');
	      }

	      return ce('div', { className: 'walk-card' }, ce('a', { href: url }, ce('div', { className: 'thumbnail' }, ce('div', { className: 'walkimage ' + placeholder, style: { backgroundImage: 'url(' + Thumb + ')' } }, Status), ce('div', { className: 'caption' }, ce('h4', null, title || ''), ce('p', null, (shortDescription || '').slice(0, 140))), ce('ul', { className: 'when' }, ce('li', null, startTime), Meeting ? ce('li', null, (0, _I18nStore.translateTag)(_templateObject2, Meeting)) : null, LedBy ? ce('li', null, LedBy) : null), ce('ul', { className: 'list-inline tags' }, Tags))));
	    }
	  }]);

	  return Card;
	}(Component);

	exports.default = Card;

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(['Date'], ['Date']),
	    _templateObject2 = _taggedTemplateLiteral(['Time'], ['Time']),
	    _templateObject3 = _taggedTemplateLiteral(['Title'], ['Title']),
	    _templateObject4 = _taggedTemplateLiteral(['Meeting Place'], ['Meeting Place']);

	var _ListItem = __webpack_require__(17);

	var _ListItem2 = _interopRequireDefault(_ListItem);

	var _I18nStore = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
	                                                                                                                                                   * The list of walks to order
	                                                                                                                                                   */
	/* global React */


	var _React = React;
	var ce = _React.createElement;

	/**
	 * The walk list
	 */

	exports.default = function (_ref) {
	  var outings = _ref.outings;
	  return ce('table', { className: 'walklist table' }, ce('thead', null, ce('tr', null, ce('th', null, (0, _I18nStore.translateTag)(_templateObject)), ce('th', null, (0, _I18nStore.translateTag)(_templateObject2)), ce('th', null, (0, _I18nStore.translateTag)(_templateObject3)), ce('th', null, (0, _I18nStore.translateTag)(_templateObject4)))), ce('tbody', null, outings.map(function (_ref2) {
	    var walk = _ref2.walk;
	    var slot = _ref2.slot;
	    return ce(_ListItem2.default, { key: 'walk' + walk.id + slot[0], walk: walk, slot: slot });
	  })));
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = ListItem;
	/* global React */
	var _React = React;
	var ce = _React.createElement;

	// Date formatter

	var dtfDate = void 0;
	var dtfTime = void 0;
	if ((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object') {
	  dtfDate = new Intl.DateTimeFormat(undefined, {
	    year: 'numeric',
	    month: 'long',
	    day: 'numeric',
	    timeZone: 'UTC'
	  });

	  dtfTime = new Intl.DateTimeFormat(undefined, {
	    hour: 'numeric',
	    minute: '2-digit',
	    timeZone: 'UTC'
	  });
	}

	function ListItem(_ref) {
	  var _ref$walk = _ref.walk;
	  var map = _ref$walk.map;
	  var url = _ref$walk.url;
	  var title = _ref$walk.title;
	  var slot = _ref.slot;

	  var Meeting = void 0;
	  var startDate = void 0;
	  var startTime = void 0;

	  var start = slot[0] * 1000;
	  // TODO: safari?
	  if (dtfDate) {
	    startDate = dtfDate.format(start);
	    startTime = dtfTime.format(start);
	  }

	  /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
	  if (map && map.markers && map.markers.length) {
	    Meeting = map.markers[0].title || map.markers[0].description;
	  }

	  return ce('tr', null, ce('td', null, startDate), ce('td', null, startTime), ce('td', null, ce('a', { href: url, target: '_blank' }, title)), ce('td', null, Meeting));
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The map of upcoming walks for a whole city
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
	/* global React ReactDOM google $ JanesWalk */


	var _InfoWindow = __webpack_require__(19);

	var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _React = React;
	var Component = _React.Component;
	var ce = _React.createElement;

	// Helper to see if a member is a walk leader
	// Check if their role contains leader, or their type does

	var isWalkLeader = function isWalkLeader(_ref) {
	  var role = _ref.role;
	  var type = _ref.type;
	  return role && role.includes('leader') || type && type.includes('leader');
	};

	// Date formatter
	var dtfDate = new Intl.DateTimeFormat(undefined, {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	  hour: 'numeric',
	  minute: '2-digit',
	  timeZone: 'UTC'
	});

	var _infoNode = document.createElement('div');

	var _infoWindow = void 0;
	var _icon = void 0;
	function loadGoogle() {
	  // Simple map marker icon
	  _icon = {
	    path: google.maps.SymbolPath.CIRCLE,
	    scale: 7,
	    strokeWeight: 1,
	    strokeColor: '#f16725',
	    fillOpacity: 0.7,
	    fillColor: '#f16725'
	  };

	  // Basic info window
	  _infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });
	}

	// Google maps loads async, so load these on our event
	JanesWalk.event.on('google.loaded', loadGoogle);

	/**
	 * Create a new google marker and add to map
	 * @param lat float Latitude
	 * @param lng float Longitude
	 * @param team Array The walk team
	 * @param title String The walk title
	 * @param google.maps.Map gmap The google map
	 */
	function buildNewMarker(_ref2) {
	  var lat = _ref2.lat;
	  var lng = _ref2.lng;
	  var _ref2$team = _ref2.team;
	  var team = _ref2$team === undefined ? [] : _ref2$team;
	  var startTime = _ref2.startTime;
	  var title = _ref2.title;
	  var gmap = _ref2.gmap;
	  var url = _ref2.url;
	  var shortDescription = _ref2.shortDescription;

	  // Add the marker
	  var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lng),
	    title: title,
	    icon: _icon,
	    map: gmap
	  });

	  google.maps.event.addListener(marker, 'click', function () {
	    var date = void 0;

	    // Build the team list of walk leaders
	    var leaders = team.filter(function (member) {
	      return isWalkLeader(member);
	    }).map(function (member) {
	      return member['name-first'] + ' ' + member['name-last'];
	    });

	    // Best-effort grab of the time
	    try {
	      // Show all dates joined together
	      date = ce('h6', null, ce('i', { className: 'fa fa-calendar' }), ' ' + dtfDate.format(startTime * 1000));
	    } catch (e) {
	      // Just log this, but don't die
	      console.error('Failed to parse walk time.');
	    }

	    // Setup infowindow
	    ReactDOM.render(ce(_InfoWindow2.default, { key: title + ':' + startTime, title: title, date: date, leaders: leaders, url: url, shortDescription: shortDescription }), _infoNode);

	    // Center the marker and display its info window
	    _infoWindow.setMap(gmap);
	    gmap.panTo(marker.getPosition());
	    _infoWindow.setContent(_infoNode);
	    _infoWindow.open(gmap, marker);
	  });

	  return marker;
	}

	/**
	 * Loop through the first set of markers, and see which in the update need to be
	 * displayed.
	 *
	 * @param Map markers The currently rendered markers
	 * @param array outings The walk outings we want to render markers for
	 * @param google.maps.Map gmap The google map to render to
	 * @return object updated set of markers
	 */
	function addNewMarkersToMap(markers, outings, gmap) {
	  // Clean out the markers before we put them back in
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = markers.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var marker = _step.value;
	      marker.setMap(null);
	    } // Grab starting point of each walk
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

	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = outings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var _step2$value = _step2.value;
	      var _step2$value$walk = _step2$value.walk;
	      var id = _step2$value$walk.id;
	      var _step2$value$walk$map = _step2$value$walk.map;
	      _step2$value$walk$map = _step2$value$walk$map === undefined ? {} : _step2$value$walk$map;
	      var _step2$value$walk$map2 = _step2$value$walk$map.markers;
	      var stops = _step2$value$walk$map2 === undefined ? [] : _step2$value$walk$map2;
	      var _step2$value$walk$map3 = _step2$value$walk$map.route;
	      var route = _step2$value$walk$map3 === undefined ? [] : _step2$value$walk$map3;
	      var _step2$value$walk$tea = _step2$value$walk.team;
	      var team = _step2$value$walk$tea === undefined ? [] : _step2$value$walk$tea;
	      var _step2$value$walk$tit = _step2$value$walk.title;
	      var title = _step2$value$walk$tit === undefined ? '' : _step2$value$walk$tit;
	      var _step2$value$walk$url = _step2$value$walk.url;
	      var url = _step2$value$walk$url === undefined ? '' : _step2$value$walk$url;
	      var _step2$value$walk$sho = _step2$value$walk.shortDescription;
	      var shortDescription = _step2$value$walk$sho === undefined ? '' : _step2$value$walk$sho;
	      var slot = _step2$value.slot;

	      if (markers.has(id)) {
	        // We already have this marker built, so simply add it to the map
	        markers.get(id).setMap(gmap);
	      } else {
	        // Grab either the first stop or route point

	        var _stops$concat = stops.concat(route);

	        var _stops$concat2 = _slicedToArray(_stops$concat, 1);

	        var _stops$concat2$ = _stops$concat2[0];
	        _stops$concat2$ = _stops$concat2$ === undefined ? {} : _stops$concat2$;
	        var lat = _stops$concat2$.lat;
	        var lng = _stops$concat2$.lng;

	        if (lat && lng) {
	          // We must build a marker
	          markers.set(id, buildNewMarker({ lat: lat, lng: lng, team: team, title: title, gmap: gmap, startTime: slot[0], url: url, shortDescription: shortDescription }));
	        }
	      }
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

	  return markers;
	}

	var LocationMap = function (_Component) {
	  _inherits(LocationMap, _Component);

	  function LocationMap() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, LocationMap);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LocationMap)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    Object.assign(_this, {
	      state: { map: null, markers: {} }
	    });
	    return _this;
	  }

	  _createClass(LocationMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props;
	      var zoomlevel = _props.zoomlevel;

	      var _props$latlng = _slicedToArray(_props.latlng, 2);

	      var lat = _props$latlng[0];
	      var lng = _props$latlng[1];

	      loadGoogle();
	      var locationLatLng = new google.maps.LatLng(lat, lng);

	      // Setup map
	      var map = new google.maps.Map(ReactDOM.findDOMNode(this), {
	        center: locationLatLng,
	        zoom: zoomlevel || 10,
	        backgroundColor: '#d7f0fa',
	        scrollwheel: false
	      });

	      // Add our markers to the empty map
	      var newMarkers = addNewMarkersToMap(new Map(), this.props.outings, map);
	      this.setState({ map: map, markers: newMarkers });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      var newMarkers = addNewMarkersToMap(this.state.markers, props.outings, this.state.map);
	      this.setState({ markers: newMarkers });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return ce('div', { className: 'cityMap', style: { width: '100%', height: '70vh' } });
	    }
	  }]);

	  return LocationMap;
	}(Component);

	exports.default = LocationMap;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global React */
	var _React = React;
	var ce = _React.createElement;

	exports.default = function (_ref) {
	  var title = _ref.title;
	  var url = _ref.url;
	  var date = _ref.date;
	  var shortDescription = _ref.shortDescription;
	  var _ref$leaders = _ref.leaders;
	  var leaders = _ref$leaders === undefined ? [] : _ref$leaders;
	  return ce('span', null, ce('h4', { style: { marginBottom: '0.1em' } }, title), date, leaders.length ? ce('h6', null, 'Led by: ' + leaders.join(', ')) : null, ce('p', null, shortDescription + ' ', ce('a', { href: url, target: '_blank' }, 'Read More')));
	};

/***/ },
/* 20 */
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

	/**
	 * Date Range
	 * a jQueryUI based React component for picking a to/from date range
	 */
	/* global React $ */
	var _React = React;
	var ce = _React.createElement;
	var Component = _React.Component;


	var dateFormat = 'yy-mm-dd';
	var offset = new Date().getTimezoneOffset() * 60000;
	var DAY = 24 * 60 * 60 * 1000 - 10;

	var DateRange = function (_Component) {
	  _inherits(DateRange, _Component);

	  function DateRange(props) {
	    _classCallCheck(this, DateRange);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateRange).call(this, props));

	    var _props$value = props.value;
	    _props$value = _props$value === undefined ? ['', ''] : _props$value;

	    var _props$value2 = _slicedToArray(_props$value, 2);

	    var from = _props$value2[0];
	    var to = _props$value2[1];


	    _this.state = {
	      from: from ? $.datepicker.formatDate(dateFormat, new Date(from + offset)) : '',
	      to: to ? $.datepicker.formatDate(dateFormat, new Date(to + offset)) : '',
	      fromInt: from || '',
	      toInt: to || ''
	    };
	    return _this;
	  }

	  _createClass(DateRange, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var $to = $(this.refs.to);
	      var $from = $(this.refs.from);

	      var toTime = this.state.toInt;
	      var fromTime = this.state.fromInt;

	      $from.datepicker({
	        defaultDate: '+1w',
	        changeMonth: true,
	        changeYear: true,
	        dateFormat: dateFormat,
	        onSelect: function onSelect(selectedDate) {
	          fromTime = $.datepicker.parseDate(dateFormat, selectedDate) - offset;
	          $to.datepicker('option', 'minDate', selectedDate);
	          _this2.setState({ from: selectedDate });
	          _this2.props.onChange(fromTime, toTime);
	        }
	      });

	      $to.datepicker({
	        defaultDate: '+5w',
	        changeMonth: true,
	        changeYear: true,
	        dateFormat: dateFormat,
	        onSelect: function onSelect(selectedDate) {
	          toTime = $.datepicker.parseDate(dateFormat, selectedDate) - offset + DAY;
	          $from.datepicker('option', 'maxDate', selectedDate);
	          _this2.setState({ to: selectedDate });
	          _this2.props.onChange(fromTime, toTime);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return ce('fieldset', { className: 'daterange' }, ce('input', { type: 'text', ref: 'from', placeholder: 'From', defaultValue: this.state.from }), ce('input', { type: 'text', ref: 'to', placeholder: 'To', defaultValue: this.state.to }));
	    }
	  }]);

	  return DateRange;
	}(Component);

	exports.default = DateRange;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global React */
	var _React = React;
	var ce = _React.createElement;


	var Filter = function Filter(_ref) {
	  var name = _ref.name;
	  var selected = _ref.selected;
	  var setFilter = _ref.setFilter;
	  var data = _ref.data;
	  return ce('li', null, ce('label', null, name), ce('select', { value: selected, onChange: function onChange(e) {
	      return setFilter(e.target.value);
	    } }, ce('option', { value: '' }, 'All'), Object.keys(data).map(function (k) {
	    return ce('option', { value: k }, data[k]);
	  })));
	};

	exports.default = Filter;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _register;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _AppDispatcher = __webpack_require__(6);

	var _JWConstants = __webpack_require__(11);

	var _Store = __webpack_require__(4);

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

	var WalkStore = _extends({}, _Store2.default, {
	  getWalks: function getWalks() {
	    return _walks;
	  },
	  getWalk: function getWalk(id) {
	    return _walks.get(+id);
	  },
	  getWalkOutings: getWalkOutings,

	  // Register our dispatch token as a static method
	  dispatchToken: (0, _AppDispatcher.register)((_register = {}, _defineProperty(_register, _JWConstants.ActionTypes.WALK_RECEIVE, function (_ref) {
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * City store
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Single-city storage. May be refactored for multiple cities later, but
	                                                                                                                                                                                                                                                                   * currently no requirement exists for this.
	                                                                                                                                                                                                                                                                   */

	var _AppDispatcher = __webpack_require__(6);

	var _JWConstants = __webpack_require__(11);

	var _Store = __webpack_require__(4);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Store singletons
	var _city = void 0;

	var CityStore = _extends({}, _Store2.default, {
	  getCity: function getCity() {
	    return _city;
	  },
	  getLocation: function getLocation() {
	    return _city && _city.latlng;
	  },

	  dispatchToken: (0, _AppDispatcher.register)(_defineProperty({}, _JWConstants.ActionTypes.CITY_RECEIVE, function (_ref) {
	    var city = _ref.city;
	    _city = city;
	  }), function () {
	    return CityStore.emitChange();
	  })
	});
	exports.default = CityStore;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;
	exports.receiveAll = receiveAll;

	var _AppDispatcher = __webpack_require__(6);

	var _JWConstants = __webpack_require__(11);

	// Load the walk
	function receive(walk) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.WALK_RECEIVE, walk: walk });
	}

	function receiveAll(walks) {
	  (0, _AppDispatcher.dispatch)({ type: _JWConstants.ActionTypes.WALK_RECEIVE_ALL, walks: walks });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receive = receive;

	var _AppDispatcher = __webpack_require__(6);

	var _JWConstants = __webpack_require__(11);

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

/***/ }
/******/ ]);